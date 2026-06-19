/**
 * Tabiri LinkedIn Campaign Publisher
 * Posts daily educational content to:
 *   1. Tabiri.io LinkedIn Company Page
 *   2. Brian Wekesa Masakari Personal Profile
 *
 * Schedule: 15 June – 22 June 2026
 * Time: 12:00 AM EAT (21:00 UTC previous day)
 *
 * Run via: node server/campaign-post.js
 * Triggered by: .github/workflows/linkedin-campaign.yml
 */

const CAMPAIGN_POSTS = require("./campaign-posts");

// ── Map GitHub Actions cron → campaign day ────────────────────────────────────
const CRON_TO_DAY = {
  "0 21 14 6 *": 1,   // 12:00 AM EAT 15 Jun
  "0 21 15 6 *": 2,   // 12:00 AM EAT 16 Jun
  "0 21 16 6 *": 3,   // 12:00 AM EAT 17 Jun
  "0 21 17 6 *": 4,   // 12:00 AM EAT 18 Jun
  "0 21 18 6 *": 5,   // 12:00 AM EAT 19 Jun
  "0 21 19 6 *": 6,   // 12:00 AM EAT 20 Jun
  "0 21 20 6 *": 7,   // 12:00 AM EAT 21 Jun
  "0 21 21 6 *": 8,   // 12:00 AM EAT 22 Jun
};

// ── Post to one LinkedIn account ──────────────────────────────────────────────
async function postToLinkedIn(token, personUrn, post, accountName) {
  if (!token || !personUrn) {
    console.warn(`⚠️  Skipping ${accountName} — token or URN not set`);
    return false;
  }

  const body = {
    author: personUrn,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: post.body,
        },
        shareMediaCategory: "ARTICLE",
        media: [
          {
            status: "READY",
            originalUrl: post.appLink,
            title: {
              text: `Tabiri — Day ${post.day}: ${post.phase} | Sports Intelligence Engine`,
            },
            description: {
              text: `How I built a sports predictor website using Claude AI. Day ${post.day} of 8 — ${post.phase}. Free to try at tabiri.vercel.app`,
            },
          },
        ],
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  try {
    const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization:                `Bearer ${token}`,
        "Content-Type":               "application/json",
        "X-Restli-Protocol-Version":  "2.0.0",
        "LinkedIn-Version":           "202501",
      },
      body: JSON.stringify(body),
    });

    if (res.status === 201) {
      const postId = res.headers.get("x-restli-id");
      console.log(`✅  [${accountName}] Day ${post.day} posted successfully`);
      console.log(`    EAT Date: ${post.eatDate}`);
      console.log(`    Phase: ${post.phase}`);
      console.log(`    Post ID: ${postId}`);
      console.log(`    View: https://www.linkedin.com/feed/update/${postId}`);
      return true;
    } else {
      const err = await res.json();
      console.error(`❌  [${accountName}] Post failed (${res.status}):`, JSON.stringify(err, null, 2));
      return false;
    }
  } catch (err) {
    console.error(`❌  [${accountName}] Network error:`, err.message);
    return false;
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const cronSchedule = process.env.CAMPAIGN_DAY;
  const manualDay    = process.env.MANUAL_DAY ? parseInt(process.env.MANUAL_DAY) : null;

  // Determine which day to post
  let dayNumber = manualDay || CRON_TO_DAY[cronSchedule];

  if (!dayNumber) {
    // Fallback: calculate from current date (EAT)
    const now     = new Date();
    const eatTime = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    const month   = eatTime.getUTCMonth() + 1; // 6 = June
    const date    = eatTime.getUTCDate();

    if (month === 6 && date >= 15 && date <= 22) {
      dayNumber = date - 14; // 15 Jun = Day 1, 22 Jun = Day 8
    }
  }

  if (!dayNumber || dayNumber < 1 || dayNumber > 8) {
    console.log("ℹ️  No campaign post scheduled for this run.");
    console.log(`   CAMPAIGN_DAY env: ${cronSchedule || "not set"}`);
    console.log(`   MANUAL_DAY env:   ${manualDay || "not set"}`);
    process.exit(0);
  }

  const post = CAMPAIGN_POSTS[dayNumber - 1];

  console.log("\n" + "─".repeat(56));
  console.log(`🔮  TABIRI LinkedIn Campaign — Day ${dayNumber} of 8`);
  console.log(`    Phase: ${post.phase}`);
  console.log(`    Scheduled for: ${post.eatDate} at 12:00 AM EAT`);
  console.log(`    Tool featured: ${post.tool}`);
  console.log("─".repeat(56) + "\n");

  // Post to Tabiri.io company page
  await postToLinkedIn(
    process.env.LINKEDIN_TOKEN_TABIRI,
    process.env.LINKEDIN_URN_TABIRI,
    post,
    "Tabiri.io"
  );

  // Small delay between posts
  await new Promise(r => setTimeout(r, 3000));

  // Post to Brian Wekesa Masakari personal profile
  await postToLinkedIn(
    process.env.LINKEDIN_TOKEN_BRIAN,
    process.env.LINKEDIN_URN_BRIAN,
    post,
    "Brian Wekesa Masakari"
  );

  console.log("\n" + "─".repeat(56));
  console.log(`✅  Day ${post.day} campaign posts complete`);
  if (dayNumber < 8) {
    const next = CAMPAIGN_POSTS[dayNumber];
    console.log(`    Next: Day ${next.day} — ${next.phase} — ${next.eatDate}`);
  } else {
    console.log("    🏆  Campaign complete! All 8 days posted.");
  }
  console.log("─".repeat(56) + "\n");
}

main().catch(err => {
  console.error("❌  Fatal error:", err.message);
  process.exit(1);
});
