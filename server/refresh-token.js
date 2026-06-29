/**
 * Tabiri — LinkedIn Token Refresh
 * Refreshes OAuth 2.0 token monthly
 * Run via: node server/refresh-token.js
 */

async function refreshToken() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const refreshToken = process.env.LINKEDIN_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    console.error("❌ Missing LinkedIn OAuth credentials");
    process.exit(1);
  }

  try {
    const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }).toString(),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(`✅ Token refreshed at ${new Date().toISOString()}`);
      console.log(`   Expires in: ${data.expires_in} seconds`);
    } else {
      const err = await res.json();
      console.error("❌ OAuth refresh failed:", JSON.stringify(err, null, 2));
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ Network error:", err.message);
    process.exit(1);
  }
}

refreshToken();
