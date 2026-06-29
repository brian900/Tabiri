/**
 * Tabiri — Daily Email Digest
 * Fetches top predictions and sends email
 * Run via: node server/digest.js
 */

const sgMail = require('@sendgrid/mail');

async function sendDigest() {
  const apiKey = process.env.SENDGRID_API_KEY;
  const oddsKey = process.env.ODDS_API_KEY;

  if (!apiKey) {
    console.error("❌ Missing SENDGRID_API_KEY env var");
    process.exit(1);
  }

  sgMail.setApiKey(apiKey);

  const msg = {
    to: 'brianmasakari@gmail.com',
    from: 'noreply@tabiri.io',
    subject: `Tabiri Daily Digest — ${new Date().toDateString()}`,
    html: `
      <h2>📊 Tabiri Daily Digest</h2>
      <p>Your daily sports intelligence digest</p>
      <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Email digest sent at ${new Date().toISOString()}`);
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
    process.exit(1);
  }
}

sendDigest();
