const CAMPAIGN_POSTS = require('./campaign-posts.json');

const POST_TO_LINKEDIN = (process.env.POST_TO_LINKEDIN || 'false').toLowerCase() === 'true';

const CRON_TO_DAY = {
  "0 21 24 6 *": 1,   // 25 Jun
  "0 21 25 6 *": 2,   // 26 Jun
  "0 21 26 6 *": 3,   // 27 Jun
  "0 21 27 6 *": 4,   // 28 Jun
  "0 21 28 6 *": 5,   // 29 Jun
};

async function postToLinkedIn(token, personUrn, post, accountName) {
  if (!token || !personUrn) {
    console.warn(`Skipping ${accountName} — token or URN not set`);
    return false;
  }

  if (!POST_TO_LINKEDIN) {
    console.log(`(DRY RUN) [${accountName}] Would post Day ${post.day}: ${post.body}`);
    return true;
  }

  const body = {
    author: personUrn,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text: post.body },
        shareMediaCategory: "ARTICLE",
        media: [{
          status: "READY",
          originalUrl: "https://tabiri.vercel.app",
          title: { text: `Tabiri — Day ${post.day}: ${post.phase}` },
          description: { text: `How I built a sports predictor with Claude AI. Day ${post.day} of 5.` },
        }],
      },
    },
    visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
  };

  try {
    const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
        "LinkedIn-Version": "202501",
      },
      body: JSON.stringify(body),
    });
    if (res.status === 201) {
      const postId = res.headers.get("x-restli-id");
      console.log(`✅ [${accountName}] Day ${post.day} posted. ID: ${postId}`);
      return true;
    } else {
      const err = await res.text();
      console.error(`❌ [${accountName}] Failed (${res.status}):`, err);
      return false;
    }
  } catch (err) {
    console.error(`❌ [${accountName}] Error:`, err.message);
    return false;
  }
}

async function main() {
  const cronSchedule = process.env.CAMPAIGN_DAY;
  const manualDay = process.env.MANUAL_DAY ? parseInt(process.env.MANUAL_DAY) : null;
  let dayNumber = manualDay || CRON_TO_DAY[cronSchedule];

  if (!dayNumber) {
    const now = new Date();
    const eat = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    const date = eat.getUTCDate();
    const month = eat.getUTCMonth() + 1;
    if (month === 6 && date >= 25 && date <= 29) {
      dayNumber = date - 24;
    }
  }

  if (!dayNumber || dayNumber < 1 || dayNumber > 5) {
    console.log("No campaign post scheduled for this run.");
    console.log(`CAMPAIGN_DAY=${cronSchedule} | MANUAL_DAY=${manualDay}`);
    process.exit(0);
  }

  const post = CAMPAIGN_POSTS[dayNumber - 1];
  console.log(`\n${"=".repeat(50)}`);
  console.log(`TABIRI LinkedIn Campaign — Day ${dayNumber} of 5`);
  console.log(`Phase: ${post.phase}`);
  console.log(`Date:  ${post.eatDate}`);
  console.log(`${"=".repeat(50)}\n`);

  // Post for company
  await postToLinkedIn(
    process.env.LINKEDIN_TOKEN_TABIRI,
    process.env.LINKEDIN_URN_TABIRI,
    post, "Tabiri.io"
  );

  await new Promise(r => setTimeout(r, 2000));

  // Post for personal
  await postToLinkedIn(
    process.env.LINKEDIN_TOKEN_BRIAN,
    process.env.LINKEDIN_URN_BRIAN,
    post, "Brian Wekesa Masakari"
  );

  console.log(`\nDay ${dayNumber} complete.`);
}

main().catch(err => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
