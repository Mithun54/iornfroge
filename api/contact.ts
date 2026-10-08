import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Simple in-memory rate limiting map for basic spam protection
// Tracks timestamps per IP address
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Clean up timestamps older than the window
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, recentTimestamps);
    return true;
  }
  
  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return false;
}

// Clean up stale rate limit entries periodically (max 500 entries)
if (rateLimitMap.size > 500) {
  const now = Date.now();
  for (const [key, timestamps] of rateLimitMap.entries()) {
    const valid = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      rateLimitMap.delete(key);
    } else {
      rateLimitMap.set(key, valid);
    }
  }
}

interface ContactRequestBody {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  timeSlot?: string;
  website?: string; // Honeypot field for bot detection
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting check using client IP
  const clientIp = 
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    (req.headers['x-real-ip'] as string) ||
    req.socket.remoteAddress ||
    'unknown';

  if (clientIp !== 'unknown' && isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const body = (req.body || {}) as ContactRequestBody;
  const { name, email, phone, message, timeSlot, website } = body;

  // Honeypot spam check: if the hidden website field is populated, silently accept without sending
  if (website && website.trim() !== '') {
    return res.status(200).json({ 
      success: true, 
      message: "Thank you! Your request has been received. We'll contact you shortly." 
    });
  }

  // 1. Validate Name
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required' });
  }
  const trimmedName = name.trim();
  if (trimmedName.length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters long' });
  }
  if (trimmedName.length > 100) {
    return res.status(400).json({ error: 'Name must not exceed 100 characters' });
  }

  // 2. Validate Email
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }
  const trimmedEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 254) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  // 3. Validate Phone
  if (!phone || typeof phone !== 'string') {
    return res.status(400).json({ error: 'Phone number is required' });
  }
  const trimmedPhone = phone.trim();
  // Strip spaces, dashes, and parentheses
  const sanitizedPhone = trimmedPhone.replace(/[\s\-()]/g, '');
  // Validate Indian phone number (10 digits starting with 6-9, optional +91, 91, or 0)
  // or international format with leading + and 10-15 digits
  const indianPhoneRegex = /^(?:(?:\+|0{0,2})91)?[6-9]\d{9}$/;
  const intlPhoneRegex = /^\+[1-9]\d{9,14}$/;
  if (!indianPhoneRegex.test(sanitizedPhone) && !intlPhoneRegex.test(sanitizedPhone)) {
    return res.status(400).json({ error: 'Please enter a valid phone number (10-digit Indian mobile number)' });
  }

  // 4. Validate Message
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }
  const trimmedMessage = message.trim();
  if (trimmedMessage.length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters long' });
  }
  if (trimmedMessage.length > 3000) {
    return res.status(400).json({ error: 'Message must not exceed 3000 characters' });
  }

  // Check Resend API Key
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[API/Contact] Missing RESEND_API_KEY environment variable.');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Determine recipient and sender
  // In Resend test mode without a verified custom domain:
  // - Sender must be 'onboarding@resend.dev'
  // - Recipient must be the email address of the Resend account owner
  // Once a custom domain is verified in Resend:
  // - Set RESEND_FROM_EMAIL to e.g. 'IRONFORGE Concierge <contact@yourdomain.com>'
  // - Set ADMIN_EMAIL to your preferred gym administration inbox
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'IRONFORGE Concierge <onboarding@resend.dev>';
  const toEmail = 'mithunmessi39@gmail.com';

  const slotInfo = timeSlot && typeof timeSlot === 'string' ? timeSlot.trim() : 'Not specified';

  // Plain-text email fallback
  const plainTextContent = `
New Gym Website Enquiry
=========================================

Name: ${trimmedName}
Email: ${trimmedEmail}
Phone: ${trimmedPhone}
Preferred Window: ${slotInfo}

Message:
${trimmedMessage}

=========================================
Submitted via IRONFORGE Website Contact Form
Date: ${new Date().toISOString()}
IP: ${clientIp}
`.trim();

  // Clean, professional HTML email with dark luxury accents
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0c10; color: #f3f4f6; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #12141a; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #181a22 0%, #0c0d11 100%); padding: 24px 32px; border-bottom: 2px solid #D4AF37; }
    .logo { font-size: 20px; font-weight: 800; letter-spacing: 2px; color: #ffffff; text-transform: uppercase; margin: 0; }
    .logo span { color: #D4AF37; }
    .subtitle { font-size: 11px; letter-spacing: 1.5px; color: #9ca3af; text-transform: uppercase; margin-top: 4px; }
    .content { padding: 32px; }
    .badge { display: inline-block; padding: 4px 10px; background-color: rgba(212, 175, 55, 0.15); border: 1px solid rgba(212, 175, 55, 0.4); color: #F5E5B8; font-size: 11px; font-weight: 700; letter-spacing: 1px; border-radius: 4px; text-transform: uppercase; margin-bottom: 20px; }
    .field-row { margin-bottom: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); padding-bottom: 12px; }
    .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; font-weight: 600; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #ffffff; font-weight: 500; }
    .field-value a { color: #D4AF37; text-decoration: none; }
    .message-box { background-color: #0c0d11; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 16px; margin-top: 8px; font-size: 14px; line-height: 1.6; color: #e5e7eb; white-space: pre-wrap; }
    .footer { padding: 20px 32px; background-color: #0c0d11; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 11px; color: #6b7280; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">IRON<span>FORGE</span></div>
      <div class="subtitle">Performance Club Concierge Desk</div>
    </div>
    <div class="content">
      <div class="badge">New Gym Website Enquiry</div>
      
      <div class="field-row">
        <div class="field-label">Name:</div>
        <div class="field-value">${escapeHtml(trimmedName)}</div>
      </div>

      <div class="field-row">
        <div class="field-label">Email:</div>
        <div class="field-value"><a href="mailto:${escapeHtml(trimmedEmail)}">${escapeHtml(trimmedEmail)}</a></div>
      </div>

      <div class="field-row">
        <div class="field-label">Phone:</div>
        <div class="field-value"><a href="tel:${escapeHtml(trimmedPhone)}">${escapeHtml(trimmedPhone)}</a></div>
      </div>

      <div class="field-row">
        <div class="field-label">Preferred Tour Window:</div>
        <div class="field-value">${escapeHtml(slotInfo)}</div>
      </div>

      <div class="field-row" style="border-bottom: none; margin-bottom: 0;">
        <div class="field-label">Message:</div>
        <div class="message-box">${escapeHtml(trimmedMessage)}</div>
      </div>
    </div>
    <div class="footer">
      This message was sent from the IRONFORGE website contact form.<br>
      You can reply directly to this email to respond to ${escapeHtml(trimmedName)}.
    </div>
  </div>
</body>
</html>
`.trim();

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: trimmedEmail,
      subject: 'New Gym Website Enquiry',
      text: plainTextContent,
      html: htmlContent,
    });

    if (error) {
      console.error('[API/Contact] Resend service returned an error:', error);
      return res.status(500).json({ error: 'Failed to send message via email service' });
    }

    return res.status(200).json({
      success: true,
      message: "Thank you! Your request has been received. We'll contact you shortly.",
      id: data?.id,
    });
  } catch (err: unknown) {
    console.error('[API/Contact] Unexpected error while sending email:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
