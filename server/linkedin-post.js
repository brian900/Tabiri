/**
 * Tabiri — LinkedIn Daily Post
 * Posts today's top 5 picks + link to article
 * Run via: node server/linkedin-post.js
 * Scheduled via: .github/workflows/daily-digest.yml (runs after digest)
 *
 * Required env vars:
 *   LINKEDIN_TOKEN        — OAuth 2.0 access token
 *   LINKEDIN_PERSON_URN   — urn:li:person:YOUR_ID (from Postman Step 1)
 *   LINKEDIN_ARTICLE_URL  — published LinkedIn article URL
 */

const SPORT_ICONS = { Football:"⚽", Basketball:"🏀", Tennis:"🎾", Baseball:"⚾", Hockey:"🏒", MMA:"🥊" };
const fmtP = p => (p * 100).toFixed(1) + "%";
const confLbl = c => c >= 0.8 ? "HIGH CONF" : c >= 0.6 ? "MED CONF" : "LOW CONF";

// ── Build post text ───────────────────────────────────────────────────────────
function buildPostText(top5) {
  const today = new Date().toDateString();
  const lines = top5.map((e, i) =>
    `${SPORT_ICONS[e.sport]||"🏟"} #${i+1}  ${e.home} vs ${e.away}\n   → ${e.bestOutcome}  ${fmtP(e.bestProb)}  [${confLbl(e.confidence)}]${e.valueRating!=="FAIR"?`  ★ ${e.valueRating}`:""}`
  ).join("\n\n");

  return [
    `🔮 TABIRI Daily Intelligence — ${today}`,
    ``,
    `Today's top picks from 20 bookmakers + 9 context factors:`,
    ``,
    lines,
    ``,
    `Factors: Home advantage · Weather · Travel · Form · H2H · Injuries · Cards · Referee · Style`,
    ``,
    `Full Top 20 + methodology in article 👇`,
    ``,
    `#SportsTech #DataScience #React #JavaScript #BuildInPublic #Tabiri #SportsBetting`,
  ].join("\n");
}

// ── Post to LinkedIn ──────────────────────────────────────────────────────────
async function postToLinkedIn() {
  const token       = process.env.LINKEDIN_TOKEN;
  const personUrn   = process.env.LINKEDIN_PERSON_URN;
  const articleUrl  = process.env.LINKEDIN_ARTICLE_URL;

  if (!token || !personUrn) {
    console.error("❌ Missing LINKEDIN_TOKEN or LINKEDIN_PERSON_URN env vars");
    process.exit(1);
  }

  // Placeholder top 5 — wire up to same compute logic as digest.js in production
  const top5 = [
    { home:"Man City",  away:"Arsenal",   bestOutcome:"Man City",   bestProb:0.562, confidence:0.88, valueRating:"HIGH VALUE", sport:"Football"   },
    { home:"Bayern",    away:"Dortmund",  bestOutcome:"Bayern",     bestProb:0.713, confidence:0.85, valueRating:"HIGH VALUE", sport:"Football"   },
    { home:"PSG",       away:"Lyon",      bestOutcome:"PSG",        bestProb:0.742, confidence:0.84, valueRating:"VALUE",      sport:"Football"   },
    { home:"Celtics",   away:"Warriors",  bestOutcome:"Celtics",    bestProb:0.621, confidence:0.81, valueRating:"VALUE",      sport:"Basketball" },
    { home:"Panthers",  away:"Avalanche", bestOutcome:"Panthers",   bestProb:0.581, confidence:0.77, valueRating:"VALUE",      sport:"Hockey"     },
  ];

  const postText = buildPostText(top5);

  const body = {
    author: personUrn,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text: postText },
        shareMediaCategory: articleUrl ? "ARTICLE" : "NONE",
        ...(articleUrl && {
          media: [{
            status: "READY",
            originalUrl: articleUrl,
            title:       { text: "Tabiri — Sports Intelligence Engine" },
            description: { text: "20 bookmakers · 9 context factors · Daily email digest · Weighted consensus probability" },
          }]
        })
      }
    },
    visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" }
  };

  try {
    const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        "Authorization":                `Bearer ${token}`,
        "Content-Type":                 "application/json",
        "X-Restli-Protocol-Version":    "2.0.0",
        "LinkedIn-Version":             "202501",
      },
      body: JSON.stringify(body),
    });

    if (res.status === 201) {
      const postId = res.headers.get("x-restli-id");
      console.log(`✅ LinkedIn post published at ${new Date().toISOString()}`);
      console.log(`   Post ID: ${postId}`);
      console.log(`   View: https://www.linkedin.com/feed/update/${postId}`);
    } else {
      const err = await res.json();
      console.error("❌ LinkedIn API error:", JSON.stringify(err, null, 2));
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ Network error:", err.message);
    process.exit(1);
  }
}

postToLinkedIn();
