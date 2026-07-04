// ─────────────────────────────────────────────────────────────────
// Tabiri LinkedIn Campaign — run.js
// Self-contained. No require(). No dependencies.
// ─────────────────────────────────────────────────────────────────

const POSTS = [
  {
    day: 1,
    cron: "0 21 24 6 *",
    phase: "THE IDEA",
    body: "I asked Claude AI one question.\n\nIt handed me a full sports predictor website.\n\nHere is the exact conversation that started it all.\n\n(1/5 - How I built Tabiri using Claude AI)\n\nZero web dev experience. No team. No budget.\nJust one prompt.\n\nMY EXACT PROMPT:\n\"Design a system that scrapes the top 20 sports betting websites by Alexa rank, aggregates outcome probabilities, and outputs the best likely outcome\"\n\nClaude gave me:\n- A 4-layer system architecture\n- 20 target websites by traffic rank\n- The maths explained\n- Full system design document\n- Tech stack recommendation\n\nAll from one sentence.\n\nLESSON 1: Quality of AI output = quality of your prompt.\nBe specific. Claude rewards clarity.\n\nTool: Claude AI - claude.ai (free)\n\nSee what we built:\nhttps://tabiri.vercel.app\n\nSource code:\nhttps://github.com/brian900/Tabiri\n\nTomorrow: How Claude built the full dashboard in 3 minutes.\n\n#ClaudeAI #VibeCoding #BuildInPublic #SportsTech #Tabiri #Kenya"
  },
  {
    day: 2,
    cron: "0 21 25 6 *",
    phase: "THE DASHBOARD",
    body: "I told Claude: Build me a dark sports dashboard.\n\n3 minutes later - 800 lines of React. Zero errors. First run.\n\n(2/5 - How I built Tabiri using Claude AI)\n\nMY EXACT PROMPT:\nCreate a React 18 dashboard with:\n- Space Grotesk font for UI text\n- Space Mono for numbers\n- Dark theme #0d1117\n- Sport colour coding: Football=blue, Basketball=orange, Tennis=green, MMA=red\n- Expandable event cards\n- Probability bars\n- HIGH/MED/LOW confidence badges\n\nClaude wrote it. I copied it. It ran perfectly.\n\nLESSON 2: You do not need to know React to build in React.\nYou need to know WHAT you want.\nClaude handles the HOW.\n\nTools: Claude AI + React 18 + Google Fonts\n\nhttps://tabiri.vercel.app\nhttps://github.com/brian900/Tabiri\n\nTomorrow: The probability maths - 5 lines of code.\n\n#ClaudeAI #React #VibeCoding #BuildInPublic #Tabiri #Kenya"
  },
  {
    day: 3,
    cron: "0 21 26 6 *",
    phase: "THE ENGINE",
    body: "I failed maths in school.\n\nClaude helped me build a probability engine processing 20 bookmakers simultaneously.\n\n(3/5 - How I built Tabiri using Claude AI)\n\nEvery bookmaker adds hidden margin to odds. Tabiri removes it.\n\nThe 5-line formula:\n\nconst devig = (probs) => {\n  const sum = probs.reduce((a,b) => a+b, 0);\n  return probs.map(p => p / sum);\n};\n\nThat IS the engine.\n\nThen Tabiri adds 9 real-world factors:\n1. Home advantage (+8% Football)\n2. Weather (Snow: -5% away)\n3. Travel distance (5000km = -7%)\n4. Team form (last 5 games)\n5. Playing style clash\n6. Head-to-head record\n7. Injuries (-4% per key player)\n8. Cards and suspensions\n9. Referee profile\n\nLESSON 3: Ask Claude to EXPLAIN first, then CODE.\nUnderstanding makes you a better prompt engineer.\n\nTool: Claude AI\n\nhttps://tabiri.vercel.app\nhttps://github.com/brian900/Tabiri\n\nTomorrow: Free deployment. Live in 4 minutes. Zero cost.\n\n#ClaudeAI #DataScience #VibeCoding #BuildInPublic #Tabiri #Kenya"
  },
  {
    day: 4,
    cron: "0 21 27 6 *",
    phase: "FREE DEPLOYMENT",
    body: "I deployed Tabiri live on the internet.\n\nCost: KES 0\nTime: 4 minutes\nExperience needed: None\n\n(4/5 - How I built Tabiri using Claude AI)\n\nSTEP 1 - Push to GitHub\n- github.com (free)\n- New repo, upload files\n- github.com/brian900/Tabiri\n\nSTEP 2 - Deploy on Vercel\n- vercel.com/new\n- Import GitHub repo\n- Click Deploy\n- Live in 60 seconds\n\nSTEP 3 - Auto-deploy forever\n- Every code push = automatic rebuild\n- Zero configuration\n\nFREE STACK:\nReact + GitHub + Vercel + Claude AI + SendGrid + GitHub Actions\n\nTotal monthly cost: KES 0\n\nLESSON 4: You do not need money to ship a product.\nYou need clarity and the right tools.\n\nTools: GitHub + Vercel + Claude AI\n\nhttps://tabiri.vercel.app\nhttps://github.com/brian900/Tabiri\n\nTomorrow: FINAL recap and your turn to build.\n\n#ClaudeAI #Vercel #GitHub #VibeCoding #BuildInPublic #Tabiri #Kenya"
  },
  {
    day: 5,
    cron: "0 21 28 6 *",
    phase: "FULL RECAP",
    body: "5 days ago I had an idea.\n\nToday Tabiri is:\n- Live on the internet\n- Emailing predictions daily\n- Posting to LinkedIn automatically\n- Open source for anyone\n\nCost: KES 0.\n\n(5/5 - FINAL - How I built Tabiri with Claude AI)\n\nTHE 5-DAY BUILD:\n\nDay 1 - The Idea - Claude AI - full architecture from 1 prompt\nDay 2 - The Dashboard - Claude AI + React - 800 lines, zero errors\nDay 3 - The Engine - Claude AI - devigging + 9 context factors\nDay 4 - Deployment - GitHub + Vercel - live in 4 minutes, KES 0\nDay 5 - This recap (automated)\n\nWHAT I WOULD DO DIFFERENTLY:\n1. Connect real odds API from Day 1\n2. Ship on Day 2 - even imperfect\n3. Build mobile-first from the start\n\nYOUR TURN:\nEverything is open source.\n- claude.ai (free)\n- github.com (free)\n- vercel.com (free)\n\nIf I built this - so can you.\n\nTry Tabiri: https://tabiri.vercel.app\nCode: https://github.com/brian900/Tabiri\n\nComment PLAYBOOK for the full PDF guide.\nTag someone who needs to see this.\n\n#ClaudeAI #VibeCoding #BuildInPublic #SportsTech #OpenSource #AITutorial #Tabiri #Kenya #AfricaTech"
  }
];

const CRON_MAP = {
  "0 21 24 6 *": 1,
  "0 21 25 6 *": 2,
  "0 21 26 6 *": 3,
  "0 21 27 6 *": 4,
  "0 21 28 6 *": 5
};

async function postToLinkedIn(token, urn, post, accountName) {
  if (!token) {
    console.log("[" + accountName + "] SKIP - no token");
    return false;
  }
  if (!urn) {
    console.log("[" + accountName + "] SKIP - no URN");
    return false;
  }

  // Determine if this is a company page or personal profile URN
  // Company pages use urn:li:organization: personal use urn:li:person:
  const authorUrn = urn.trim();
  console.log("[" + accountName + "] Posting with URN: " + authorUrn);

  const payload = {
    author: authorUrn,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: post.body
        },
        shareMediaCategory: "NONE"
      }
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
  };

  console.log("[" + accountName + "] Sending request to LinkedIn API...");

  try {
    const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token.trim(),
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0"
      },
      body: JSON.stringify(payload)
    });

    const responseBody = await response.text();
    console.log("[" + accountName + "] Response status: " + response.status);
    console.log("[" + accountName + "] Response body: " + responseBody.slice(0, 500));

    if (response.status === 201) {
      const postId = response.headers.get("x-restli-id") || "unknown";
      console.log("[" + accountName + "] SUCCESS - Post ID: " + postId);
      return true;
    }

    // Detailed error handling
    if (response.status === 401) {
      console.error("[" + accountName + "] FAILED - 401 Unauthorized");
      console.error("Your LinkedIn token has expired or is invalid.");
      console.error("Get a new token: go to Postman > Tabiri LinkedIn API > Run Step 4 (Refresh Token)");
    } else if (response.status === 403) {
      console.error("[" + accountName + "] FAILED - 403 Forbidden");
      console.error("Your LinkedIn app does not have w_member_social permission.");
      console.error("Go to linkedin.com/developers > your app > Products > Share on LinkedIn > Request access");
    } else if (response.status === 422) {
      console.error("[" + accountName + "] FAILED - 422 Unprocessable");
      console.error("The URN or payload is invalid. Check URN format: urn:li:person:XXXXX");
      console.error("Your URN was: " + authorUrn);
    } else if (response.status === 429) {
      console.error("[" + accountName + "] FAILED - 429 Rate Limited");
      console.error("Too many requests. Wait 10 minutes and try again.");
    } else {
      console.error("[" + accountName + "] FAILED - Status " + response.status);
    }

    return false;
  } catch (error) {
    console.error("[" + accountName + "] NETWORK ERROR: " + error.message);
    return false;
  }
}

async function main() {
  console.log("=".repeat(55));
  console.log("TABIRI LinkedIn Campaign - run.js");
  console.log("=".repeat(55));

  // Read environment variables
  const cronSchedule  = (process.env.CAMPAIGN_DAY || "").trim();
  const manualDayStr  = (process.env.MANUAL_DAY   || "").trim();
  const tokenTabiri   = (process.env.LINKEDIN_TOKEN_TABIRI || "").trim();
  const urnTabiri     = (process.env.LINKEDIN_URN_TABIRI   || "").trim();
  const tokenBrian    = (process.env.LINKEDIN_TOKEN_BRIAN  || "").trim();
  const urnBrian      = (process.env.LINKEDIN_URN_BRIAN    || "").trim();

  // Log environment (mask tokens for security)
  console.log("CAMPAIGN_DAY:          [" + cronSchedule + "]");
  console.log("MANUAL_DAY:            [" + manualDayStr + "]");
  console.log("LINKEDIN_TOKEN_TABIRI: " + (tokenTabiri ? "SET (" + tokenTabiri.length + " chars)" : "NOT SET"));
  console.log("LINKEDIN_URN_TABIRI:   " + (urnTabiri   ? urnTabiri : "NOT SET"));
  console.log("LINKEDIN_TOKEN_BRIAN:  " + (tokenBrian  ? "SET (" + tokenBrian.length + " chars)" : "NOT SET"));
  console.log("LINKEDIN_URN_BRIAN:    " + (urnBrian    ? urnBrian  : "NOT SET"));
  console.log("");

  // Determine day number
  let dayNumber = 0;
  if (manualDayStr) {
    dayNumber = parseInt(manualDayStr);
    console.log("Using MANUAL_DAY: " + dayNumber);
  } else if (cronSchedule && CRON_MAP[cronSchedule]) {
    dayNumber = CRON_MAP[cronSchedule];
    console.log("Using CRON_MAP[" + cronSchedule + "]: " + dayNumber);
  } else {
    // Fallback: detect from EAT date
    const nowUtc = new Date();
    const eatMs = nowUtc.getTime() + (3 * 60 * 60 * 1000);
    const eatDate = new Date(eatMs);
    const d = eatDate.getUTCDate();
    const m = eatDate.getUTCMonth() + 1;
    console.log("Fallback date: " + eatDate.toISOString() + " (EAT) day=" + d + " month=" + m);
    if (m === 6 && d >= 25 && d <= 29) {
      dayNumber = d - 24;
      console.log("Fallback resolved day: " + dayNumber);
    }
  }

  if (!dayNumber || dayNumber < 1 || dayNumber > 5) {
    console.log("No campaign post scheduled for this run. Exiting.");
    process.exit(0);
  }

  const post = POSTS[dayNumber - 1];
  console.log("");
  console.log("Posting Day " + dayNumber + " of 5: " + post.phase);
  console.log("Post length: " + post.body.length + " chars");
  console.log("");

  // Post to Tabiri.io
  console.log("--- Posting to Tabiri.io ---");
  await postToLinkedIn(tokenTabiri, urnTabiri, post, "Tabiri.io");

  // Wait 3 seconds between posts
  await new Promise(function(resolve) { setTimeout(resolve, 3000); });

  // Post to Brian Wekesa Masakari
  console.log("--- Posting to Brian Wekesa Masakari ---");
  await postToLinkedIn(tokenBrian, urnBrian, post, "Brian Masakari");

  console.log("");
  console.log("=".repeat(55));
  console.log("Day " + dayNumber + " run complete.");
  console.log("=".repeat(55));
}

main().catch(function(error) {
  console.error("FATAL: " + error.message);
  console.error(error.stack);
  process.exit(1);
});
