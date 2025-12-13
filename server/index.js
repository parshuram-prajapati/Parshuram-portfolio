require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'change-me';
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'parshuram8792@gmail.com';
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || '';

// Nodemailer transporter (SMTP)
let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

app.post('/api/contact', async (req, res) => {
  try {
    const { name = '', email = '', service = '', message = '' } = req.body;
    const timestamp = new Date().toISOString();

    // Insert into SQLite
    db.run(
      `INSERT INTO contacts (timestamp, name, email, services, message) VALUES (?, ?, ?, ?, ?)`,
      [timestamp, name, email, service, message],
      async function (err) {
        if (err) {
          console.error('DB insert error:', err);
          return res.status(500).json({ ok: false, error: 'DB error' });
        }

        // If APPS_SCRIPT_URL configured, proxy the submission there as urlencoded form
        if (APPS_SCRIPT_URL) {
          try {
            const params = new URLSearchParams();
            params.append('name', name);
            params.append('email', email);
            params.append('service', service);
            params.append('message', message);

            const proxyResp = await fetch(APPS_SCRIPT_URL, {
              method: 'POST',
              body: params,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });

            const txt = await proxyResp.text().catch(() => '');
            console.log('Proxied to Apps Script:', proxyResp.status, txt);
          } catch (proxyErr) {
            console.error('Apps Script proxy error:', proxyErr);
          }
        }

        // Send notification email if transporter configured
        if (transporter) {
          const mailOptions = {
            from: process.env.FROM_EMAIL || process.env.SMTP_USER,
            to: RECIPIENT_EMAIL,
            subject: `New Portfolio Inquiry from ${name || 'Unknown'}`,
            text: `New submission received:\n\nName: ${name}\nEmail: ${email}\nServices: ${service}\nMessage: ${message}\n\nTime: ${timestamp}`,
          };

          transporter.sendMail(mailOptions).catch((err) => {
            console.error('Send mail error:', err);
          });

          // Auto-reply
          if (email) {
            const replyOptions = {
              from: process.env.FROM_EMAIL || process.env.SMTP_USER,
              to: email,
              subject: 'Thank You - Parshuram Prajapati',
              text: `Hi ${name || ''},\n\nThank you for reaching out!\n\nService Requested:\n${service}\n\nYour Message:\n${message}\n\nI'll get back to you soon.\n\nBest regards,\nParshuram Prajapati`,
            };
            transporter.sendMail(replyOptions).catch((err) => {
              console.error('Auto-reply error:', err);
            });
          }
        }

        return res.json({ ok: true, id: this.lastID });
      }
    );
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// Simple admin listing (protected by ADMIN_TOKEN header)
app.get('/api/admin/contacts', (req, res) => {
  const auth = req.headers.authorization || '';
  if (auth !== `Bearer ${ADMIN_TOKEN}`) return res.status(401).json({ ok: false });

  db.all('SELECT * FROM contacts ORDER BY id DESC LIMIT 100', (err, rows) => {
    if (err) return res.status(500).json({ ok: false });
    res.json({ ok: true, rows });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
