// Tabiri LinkedIn Campaign — self-contained, no external dependencies

const POSTS = [
  {
    day: 1,
    phase: "THE IDEA",
    cron: "0 21 24 6 *",
    body: "💡 I asked Claude AI one question.\n\nIt handed me a full sports predictor website.\n\nHere's the exact conversation. 🧵\n\n(1/5 — How I built Tabiri using Claude AI)\n\nZero web dev experience. No team. No budget.\nJust one prompt.\n\nMY EXACT PROMPT:\n\"Design a system that scrapes the top 20 sports betting websites, aggregates outcome probabilities, and outputs the best likely outcome\"\n\nClaude gave me:\n✅ A 4-layer system architecture\n✅ 20 target websites by traffic rank\n✅ The maths explained\n✅ Full system design document\n✅ Tech stack recommendation\n\nAll from one sentence.\n\nLESSON 1: Quality of AI output = quality of your prompt.\nBe specific. Claude rewards clarity.\n\n🛠 Tool: Claude AI — claude.ai (free)\n\n🔮 See what we built:\nhttps://tabiri.vercel.app\n\n📂 Source code:\nhttps://github.com/brian900/Tabiri\n\nTomorrow: How Claude built the full dashboard in 3 minutes.\n\n#ClaudeAI #VibeCoding #BuildInPublic #SportsTech #Tabiri #Kenya"
  },
  {
    day: 2,
    phase: "THE DASHBOARD",
    cron: "0 21 25 6 *",
    body: "🎨 I told Claude: \"Build me a dark sports dashboard.\"\n\n3 minutes later — 800 lines of React. Zero errors.\n\n(2/5 — How I built Tabiri using Claude AI)\n\nMY EXACT PROMPT:\n\"Create a React 18 dashboard with:\n- Space Grotesk font for UI\n- Space Mono for numbers\n- Dark theme #0d1117\n- Sport colour coding:\n  Football=blue, Basketball=orange\n  Tennis=green, MMA=red\n- Expandable event cards\n- Probability bars\n- HIGH/MED/LOW confidence badges\"\n\nClaude wrote it. I copied it. It ran perfectly.\n\nLESSON 2: You don't need to know React to build in React.\nYou need to know WHAT you want.\nClaude handles the HOW.\n\n🛠 Tools: Claude AI + React 18 + Google Fonts\n\n🔮 https://tabiri.vercel.app\n📂 https://github.com/brian900/Tabiri\n\nTomorrow: The probability maths — 5 lines of code.\n\n#ClaudeAI #React #VibeCoding #BuildInPublic #Tabiri #Kenya"
  },
  {
    day: 3,
    phase: "THE ENGINE",
    cron: "0 21 26 6 *",
    body: "📐 I failed maths in school.\n\nClaude helped me build a probability engine processing 20 bookmakers.\n\n(3/5 — How I built Tabiri using Claude AI)\n\nEvery bookmaker adds hidden margin to odds.\nTabiri removes it (devigging):\n\nconst devig = (probs) => {\n  const sum = probs.reduce((a,b) => a+b, 0);\n  return probs.map(p => p / sum);\n};\n\n5 lines. That IS the engine.\n\nThen Tabiri adds 9 real-world factors:\n1️⃣ Home advantage (+8% Football)\n2️⃣ Weather (Snow: -5% away)\n3️⃣ Travel distance (5000km = -7%)\n4️⃣ Team form (last 5 games)\n5️⃣ Playing style clash\n6️⃣ Head-to-head record\n7️⃣ Injuries (-4% per key player)\n8️⃣ Cards/suspensions\n9️⃣ Referee profile\n\nLESSON 3: Ask Claude to EXPLAIN first, then CODE.\nUnderstanding makes you a better prompt engineer.\n\n🛠 Tool: Claude AI\n\n🔮 https://tabiri.vercel.app\n📂 https://github.com/brian900/Tabiri\n\nTomorrow: Free deployment. Live in 4 minutes. KES 0.\n\n#ClaudeAI #DataScience #VibeCoding #BuildInPublic #Tabiri #Kenya"
  },
  {
    day: 4,
    phase: "FREE DEPLOYMENT",
    cron: "0 21 27 6 *",
    body: "🚀 I deployed Tabiri live on the internet.\n\nCost: KES 0\nTime: 4 minutes\nExperience needed: None\n\n(4/5 — How I built Tabiri using Claude AI)\n\nSTEP 1 — Push to GitHub\n→ github.com (free)\n→ New repo, upload files\n→ github.com/brian900/Tabiri ✅\n\nSTEP 2 — Deploy on Vercel\n→ vercel.com/new\n→ Import GitHub repo\n→ Click Deploy\n→ Live in 60 seconds ✅\n\nSTEP 3 — Auto-deploy forever\n→ Every code push = automatic rebuild\n→ Zero configuration ✅\n\nCOMPLETE FREE STACK:\nReact 18 + GitHub + Vercel + Claude AI\nSendGrid + GitHub Actions\n\nTotal monthly cost: KES 0 🇰🇪\n\nLESSON 4: You don't need money to ship a product.\nYou need clarity and the right tools.\n\n🛠 Tools: GitHub + Vercel + Claude AI\n\n🔮 https://tabiri.vercel.app\n📂 https://github.com/brian900/Tabiri\n\nTomorrow: FINAL. The complete blueprint + your turn.\n\n#ClaudeAI #Vercel #GitHub #VibeCoding #BuildInPublic #Tabiri #Kenya"
  },
  {
    day: 5,
    phase: "FULL RECAP",
    cron: "0 21 28 6 *",
    body: "🏆 5 days ago I had an idea.\n\nToday Tabiri is:\n✅ Live on the internet\n✅ Emailing daily predictions automatically\n✅ Posting to LinkedIn automatically\n✅ Open source for anyone to use\n\nCost: KES 0.\n\n(5/5 — FINAL — How I built Tabiri with Claude AI)\n\nTHE 5-DAY BUILD:\n\nDay 1 — The Idea\nClaude AI — full architecture from 1 prompt\n\nDay 2 — The Dashboard\nClaude AI + React — 800 lines, zero errors\n\nDay 3 — The Engine\nClaude AI — devigging + 9 context factors\n\nDay 4 — Free Deployment\nGitHub + Vercel — live in 4 minutes, KES 0\n\nDay 5 — This recap (automated) 😄\n\nWHAT I'D DO DIFFERENTLY:\n1. Connect real odds API from Day 1\n2. Ship on Day 2 — even imperfect\n3. Build mobile-first\n\nYOUR TURN:\nEverything is open source.\n→ claude.ai (free)\n→ github.com (free)\n→ vercel.com (free)\n\nIf I built this — so can you. 🇰🇪\n\n🔮 Try Tabiri: https://tabiri.vercel.app\n📂 Code: https://github.com/brian900/Tabiri\n\nComment PLAYBOOK for the full PDF guide.\n\nTag someone who needs to see this. 🙏\n\n#ClaudeAI #VibeCoding #BuildInPublic #SportsTech #OpenSource #Tabiri #Kenya #AfricaTech"
  }
];

const CRON_TO_DAY = {
  "0 21 24 6 *": 1,
  "0 21 25 6 *": 2,
  "0 21 26 6 *": 3,
  "0 21 27 6 *": 4,
  "0 21 28 6 *": 5,
};

async function postToLinkedIn(token, urn, post, name) {
  if (!token || !urn) {
    console.warn(`⚠ Skipping ${name} — token or URN not set`);
    return false;
  }
  try {
    const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
        "LinkedIn-Version": "202501",
      },
      body: JSON.stringify({
        author: urn,
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
      }),
    });
    if (res.status === 201) {
      console.log(`✅ [${name}] Day ${post.day} posted successfully`);
      return true;
    }
    const err = await res.text();
    console.error(`❌ [${name}] Failed (${res.status}):`, err);
    return false;
  } catch (e) {
    console.error(`❌ [${name}] Error:`, e.message);
    return false;
  }
}

async function main() {
  const cron = process.env.CAMPAIGN_DAY;
  const manual = process.env.MANUAL_DAY ? parseInt(process.env.MANUAL_DAY) : null;
  let day = manual || CRON_TO_DAY[cron];

  if (!day) {
    const eat = new Date(Date.now() + 3 * 60 * 60 * 1000);
    const d = eat.getUTCDate(), m = eat.getUTCMonth() + 1;
    if (m === 6 && d >= 25 && d <= 29) day = d - 24;
  }

  if (!day || day < 1 || day > 5) {
    console.log(`No post scheduled. CAMPAIGN_DAY=${cron} MANUAL_DAY=${manual}`);
    process.exit(0);
  }

  const post = POSTS[day - 1];
  console.log(`\nTabiri Campaign — Day ${day} of 5 — ${post.phase}\n`);

  await postToLinkedIn(
    process.env.LINKEDIN_TOKEN_TABIRI,
    process.env.LINKEDIN_URN_TABIRI,
    post, "Tabiri.io"
  );

  await new Promise(r => setTimeout(r, 2000));

  await postToLinkedIn(
    process.env.LINKEDIN_TOKEN_BRIAN,
    process.env.LINKEDIN_URN_BRIAN,
    post, "Brian Wekesa Masakari"
  );

  console.log(`\nDay ${day} complete.`);
}

main().catch(e => { console.error("Fatal:", e.message); process.exit(1); });
