import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation, Loader2, AlertCircle } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  timeSlot: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    timeSlot: 'Morning (6 AM - 11 AM)',
    message: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Frontend validation
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Name validation
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = 'Full name is required';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // 2. Email validation
    const trimmedEmail = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // 3. Phone validation (Indian phone number where appropriate or international E.164)
    const trimmedPhone = formData.phone.trim();
    const sanitizedPhone = trimmedPhone.replace(/[\s\-()]/g, '');
    const indianPhoneRegex = /^(?:(?:\+|0{0,2})91)?[6-9]\d{9}$/;
    const intlPhoneRegex = /^\+[1-9]\d{9,14}$/;

    if (!trimmedPhone) {
      newErrors.phone = 'Phone number is required';
    } else if (!indianPhoneRegex.test(sanitizedPhone) && !intlPhoneRegex.test(sanitizedPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
    }

    // 4. Message validation
    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage) {
      newErrors.message = 'Message is required';
    } else if (trimmedMessage.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field-level error as user types
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // 1. Validate the form
    if (!validate()) {
      return;
    }

    // 2. Disable submit button & set loading state
    setLoading(true);

    try {
      // 4. Send request to /api/contact
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          timeSlot: formData.timeSlot,
          message: formData.message.trim(),
          website: honeypot, // Spam honeypot
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success !== false) {
        // 5. Successful: show confirmation message & 6. Clear form
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          timeSlot: 'Morning (6 AM - 11 AM)',
          message: '',
        });
        setHoneypot('');
        setErrors({});
      } else {
        // 7. Unsuccessful: show user-friendly message without technical details
        setSubmitError('Something went wrong. Please try again.');
      }
    } catch {
      // 7. Unsuccessful on network/connection failure
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 bg-dark-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
              LOCATION & CONCIERGE
            </span>
          </div>

          <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.12] mb-3 sm:mb-4">
            VISIT THE FORGE.
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed px-2">
            Schedule a personalized walkthrough of the club, test our calibrated equipment, and speak with our performance director.
          </p>
        </div>

        {/* 1 col on mobile & tablet, 12 cols on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Left Column: Contact Details & Luxury Dark Map Placeholder (Columns 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-dark-950 p-5 sm:p-7 md:p-8 border border-white/10 shadow-xl space-y-5 sm:space-y-6">
              <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                Club Concierge
              </h3>

              <div className="space-y-4 sm:space-y-5">
                {/* Address */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-gold-400">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">Headquarters</h4>
                    <p className="text-xs sm:text-sm text-white font-medium mt-0.5">
                      402 Apex Boulevard, Tower 4, Prime District
                    </p>
                    <p className="text-[11px] sm:text-xs text-zinc-400">Metro City, Pin 400051</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-gold-400">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">Phone & WhatsApp</h4>
                    <p className="text-xs sm:text-sm text-white font-medium mt-0.5">
                      +91 98765 43210 / (022) 8945-2100
                    </p>
                    <p className="text-[11px] sm:text-xs text-zinc-400">Direct concierge hotline</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-gold-400">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">Email Inquiries</h4>
                    <p className="text-xs sm:text-sm text-white font-medium mt-0.5 break-all sm:break-normal">
                      concierge@ironforgefitness.com
                    </p>
                    <p className="text-[11px] sm:text-xs text-zinc-400">Response within 2 business hours</p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-gold-400">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="w-full">
                    <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">Operating Hours</h4>
                    <div className="text-[11px] sm:text-xs text-zinc-200 mt-1 space-y-1 font-mono">
                      <div className="flex flex-col xs:flex-row xs:justify-between xs:gap-4">
                        <span className="text-zinc-400">Monday – Friday:</span>
                        <span className="text-gold-300 font-semibold">5:00 AM – 11:00 PM</span>
                      </div>
                      <div className="flex flex-col xs:flex-row xs:justify-between xs:gap-4">
                        <span className="text-zinc-400">Saturday – Sunday:</span>
                        <span className="text-gold-300 font-semibold">6:00 AM – 10:00 PM</span>
                      </div>
                      <div className="flex flex-col xs:flex-row xs:justify-between xs:gap-4 text-zinc-400 pt-0.5">
                        <span>Elite 24/7 Access:</span>
                        <span className="text-zinc-300">Biometric Keycard</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized Dark Mode Interactive Map Placeholder */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-dark-950 h-48 sm:h-52 group">
              <div className="absolute inset-0 bg-[#0d1117] bg-subtle-grid flex items-center justify-center">
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-dark-950/80" />
                
                <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 100 Q 150 50 300 120 T 600 80" stroke="#FFFFFF" strokeWidth="2" fill="none" />
                  <path d="M 120 0 Q 200 120 220 250" stroke="#FFFFFF" strokeWidth="3" fill="none" />
                  <path d="M 350 0 L 320 250" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                  <circle cx="220" cy="115" r="40" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,3" />
                </svg>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gold-400 opacity-50" />
                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 flex items-center justify-center shadow-gold-sm border-2 border-dark-950">
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-dark-950 transform rotate-45" />
                    </div>
                  </div>
                  <span className="mt-2 px-2.5 sm:px-3 py-1 rounded bg-dark-950/90 border border-gold-400/30 text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md">
                    IRONFORGE CLUBHOUSE
                  </span>
                </div>
              </div>

              <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between text-[10px] sm:text-[11px] text-zinc-400 bg-dark-950/85 px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-sm">
                <span className="truncate mr-2">Valet Parking Available</span>
                <span className="text-gold-400 font-semibold cursor-pointer hover:underline whitespace-nowrap">Directions ↗</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Booking Form (Columns 6-12) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-dark-950 p-5 sm:p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/5 blur-3xl pointer-events-none" />

              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white uppercase tracking-wide mb-1.5 sm:mb-2">
                BOOK A COMPLIMENTARY TOUR
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 sm:mb-8">
                Tour our biomechanics floor, test the recovery suite, and receive a free InBody body composition scan.
              </p>

              {submitted ? (
                <div className="py-10 sm:py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold-400/10 border border-gold-400/40 flex items-center justify-center text-gold-400 shadow-gold-sm">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h4 className="font-display font-bold text-xl sm:text-2xl text-white">
                    TOUR RESERVATION RECEIVED
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md px-2">
                    Thank you! Your request has been received. We'll contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSubmitError(null);
                    }}
                    className="mt-4 px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                  {/* Spam honeypot (invisible to real visitors) */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Submission Error Banner */}
                  {submitError && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5 animate-fadeIn">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 sm:mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full min-h-[46px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-dark-900 border text-xs sm:text-sm text-white placeholder-zinc-600 transition-colors focus:outline-none ${
                          errors.name 
                            ? 'border-red-500/70 focus:border-red-400 focus:ring-1 focus:ring-red-400' 
                            : 'border-white/10 focus:border-gold-400 focus:ring-1 focus:ring-gold-400'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-red-400 mt-1 font-medium">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 sm:mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+91 98765 00000"
                        className={`w-full min-h-[46px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-dark-900 border text-xs sm:text-sm text-white placeholder-zinc-600 transition-colors focus:outline-none ${
                          errors.phone 
                            ? 'border-red-500/70 focus:border-red-400 focus:ring-1 focus:ring-red-400' 
                            : 'border-white/10 focus:border-gold-400 focus:ring-1 focus:ring-gold-400'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-400 mt-1 font-medium">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Email */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 sm:mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="you@example.com"
                        className={`w-full min-h-[46px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-dark-900 border text-xs sm:text-sm text-white placeholder-zinc-600 transition-colors focus:outline-none ${
                          errors.email 
                            ? 'border-red-500/70 focus:border-red-400 focus:ring-1 focus:ring-red-400' 
                            : 'border-white/10 focus:border-gold-400 focus:ring-1 focus:ring-gold-400'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-400 mt-1 font-medium">{errors.email}</p>
                      )}
                    </div>

                    {/* Preferred Time Window */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 sm:mb-2">
                        Preferred Window
                      </label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => handleChange('timeSlot', e.target.value)}
                        className="w-full min-h-[46px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-dark-900 border border-white/10 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 text-xs sm:text-sm text-white transition-colors"
                      >
                        <option>Morning (6 AM - 11 AM)</option>
                        <option>Afternoon (11 AM - 4 PM)</option>
                        <option>Evening (4 PM - 9 PM)</option>
                        <option>Weekend VIP Slot</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 sm:mb-2">
                      Training Goals or Questions *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="e.g. Interested in Olympic lifting platforms and recovery membership..."
                      className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-dark-900 border text-xs sm:text-sm text-white placeholder-zinc-600 transition-colors resize-none focus:outline-none ${
                        errors.message 
                          ? 'border-red-500/70 focus:border-red-400 focus:ring-1 focus:ring-red-400' 
                          : 'border-white/10 focus:border-gold-400 focus:ring-1 focus:ring-gold-400'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-400 mt-1 font-medium">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full min-h-[50px] py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-dark-950 font-display font-extrabold text-xs uppercase tracking-[0.2em] shadow-gold-sm hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-dark-950" />
                        <span>Sending...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>BOOK A FREE TOUR</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] sm:text-[11px] text-zinc-500 text-center">
                    By booking, you agree to our guest policies. We respect your privacy and never spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
