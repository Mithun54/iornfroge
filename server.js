import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import contactHandler from './api/contact.ts';

// Load .env file in local development if present
if (fs.existsSync('.env') && typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile();
  } catch (err) {
    console.warn('[Server] Note: Could not load .env file:', err.message);
  }
}

const app = express();
const port = Number(process.env.PORT) || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, 'dist');

// Enable trust proxy for reverse proxies / load balancers (e.g. AWS ALB, Nginx, EC2)
app.set('trust proxy', true);

// Parse JSON request bodies
app.use(express.json());

// API route: reuse the existing handler to preserve all validation, rate-limiting, and email sending
app.all('/api/contact', async (req, res, next) => {
  try {
    await contactHandler(req, res);
  } catch (err) {
    next(err);
  }
});

// Serve compiled static assets from the Vite build directory
app.use(express.static(DIST_DIR));

// SPA fallback for GET requests to client-side routes
app.use((req, res, next) => {
  if (req.method === 'GET') {
    const indexPath = path.join(DIST_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
    return res.status(500).send('dist/index.html not found. Please build the client first with "npm run build".');
  }
  next();
});

// Centralized error handling
app.use((err, req, res, _next) => {
  console.error('[Server Error]:', err);
  if (!res.headersSent) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start listening
const server = app.listen(port, () => {
  console.log(`[Server] Production server running at http://localhost:${port}`);
});

export default app;
export { server };
