/**
 * Tabiri — LinkedIn Token Refresh
 * Exchanges refresh token for new access token before 60-day expiry
 * Run via: node server/refresh-token.js
 * Scheduled via: .github/workflows/daily-digest.yml (monthly cron)
 *
 * Required env vars:
 *   LINKEDIN_CLIENT_ID      — from linkedin.com/developers
 *   LINKEDIN_CLIENT_SECRET  — from linkedin.com/developers
 *   LINKEDIN_REFRESH_TOKEN  — from initial OAuth flow
 */

async function refreshLinkedInToken() {
  const clientId     = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const refreshToken = process.env.LINKEDIN_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    console.error("❌ Missing LinkedIn OAuth env vars. Check LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, LINKEDIN_REFRESH_TOKEN");
    process.exit(1);
  }

  try {
    const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type:    "refresh_token",
        refresh_token: refreshToken,
        client_id:     clientId,
        client_secret: clientSecret,
      }),
    });

    const data = await res.json();

    if (data.access_token) {
      console.log("✅ LinkedIn token refreshed successfully");
      console.log(`   New token preview: ${data.access_token.slice(0, 12)}...`);
      console.log(`   Expires in: ${data.expires_in}s (~${Math.round(data.expires_in / 86400)} days)`);
      console.log("");
      console.log("⚠️  ACTION REQUIRED: Update LINKEDIN_TOKEN in GitHub Secrets with the new token below:");
      console.log(`   ${data.access_token}`);
      if (data.refresh_token) {
        console.log("");
        console.log("⚠️  Also update LINKEDIN_REFRESH_TOKEN in GitHub Secrets:");
        console.log(`   ${data.refresh_token}`);
      }
    } else {
      console.error("❌ Token refresh failed:", JSON.stringify(data, null, 2));
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ Network error:", err.message);
    process.exit(1);
  }
}

refreshLinkedInToken();
