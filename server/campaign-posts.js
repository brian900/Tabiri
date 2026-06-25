const CAMPAIGN_POSTS = [
  {
    day: 1, eatDate: "25 June 2026", phase: "THE IDEA", tool: "Claude AI",
    body: `💡 I asked Claude AI one question.

It handed me a full sports predictor website.

Here's the exact conversation that started it all. 🧵

(1/5 — How I built Tabiri using Claude AI)

─────────────────────────────
I had zero web development experience.
No team. No budget. Just one prompt.

💬 MY EXACT PROMPT:
"Design a system that scrapes the top 20
sports betting websites by Alexa rank,
aggregates outcome probabilities, and
outputs the best likely outcome"

Claude gave me:
✅ A 4-layer system architecture
✅ 20 target websites by traffic rank
✅ The devigging mathematics explained
✅ A complete system design document
✅ A full tech stack recommendation

All from one sentence.

─────────────────────────────
📌 LESSON 1:
The quality of what AI builds =
the quality of your prompt.
Be specific. Claude rewards clarity.
─────────────────────────────

🛠 Tool: Claude AI → claude.ai (free)

🔮 See what we built:
https://tabiri.vercel.app

📂 Full source code:
https://github.com/brian900/Tabiri

Tomorrow → Day 2: How Claude built
the full dashboard in 3 minutes.

#ClaudeAI #VibeCoding #BuildInPublic
#SportsTech #AITutorial #Tabiri #Kenya`
  },
  {
    day: 2, eatDate: "26 June 2026", phase: "THE DASHBOARD", tool: "Claude AI + React 18",
    body: `🎨 I told Claude: "Build me a dark sports dashboard."

3 minutes later — 800 lines of React appeared.
Zero errors. First run.

(2/5 — How I built Tabiri using Claude AI)

─────────────────────────────
💬 MY EXACT PROMPT:
"Create a React 18 dashboard with:
- Space Grotesk font for UI
- Space Mono for numbers/data
- Dark theme (#0d1117 background)
- Sport-coded colours:
  ⚽ Football = blue
  🏀 Basketball = orange
  🎾 Tennis = green
  🥊 MMA = red
- Expandable event cards
- Probability bars per outcome
- HIGH/MED/LOW confidence badges"

Claude wrote it. I copied it. It ran.

─────────────────────────────
📌 LESSON 2:
You don't need to know React to build in React.
You need to know WHAT you want.
Claude handles the HOW.
─────────────────────────────

🛠 Tools: Claude AI + React 18 + Google Fonts

🔮 Live app:
https://tabiri.vercel.app

📂 Source code:
https://github.com/brian900/Tabiri

Tomorrow → Day 3: The probability maths.

#ClaudeAI #React #VibeCoding
#BuildInPublic #SportsTech #Tabiri #Kenya`
  },
  {
    day: 3, eatDate: "27 June 2026", phase: "THE ENGINE", tool: "Claude AI + JavaScript",
    body: `📐 I failed maths in school.

Claude still helped me build a probability
engine processing 20 bookmakers at once.

5 lines of code. Here they are. 🧵

(3/5 — How I built Tabiri using Claude AI)

─────────────────────────────
Every bookmaker adds hidden margin to odds.
Sum all implied probabilities = over 100%.
That excess = their profit.

Example — Man City vs Arsenal:
  Home Win:  1.82 → 54.9%
  Draw:      3.60 → 27.8%
  Away Win:  4.50 → 22.2%
  TOTAL:    → 104.9% ❌

Tabiri removes the margin (devigging):

const devig = (probs) => {
  const sum = probs.reduce(
    (a, b) => a + b, 0
  );
  return probs.map(p => p / sum);
};

After devigging:
  Home Win: 51.2% ✅
  Draw:     25.9% ✅
  Away Win: 20.7% ✅
  TOTAL:   100.0% ✅

─────────────────────────────
Then Tabiri adds 9 real-world factors:
Home advantage · Weather · Distance
Form · H2H · Injuries · Cards
Referee · Playing style

─────────────────────────────
📌 LESSON 3:
Ask Claude to EXPLAIN first, then CODE.
Understanding makes you a better
prompt engineer.
─────────────────────────────

🛠 Tool: Claude AI

🔮 https://tabiri.vercel.app
📂 https://github.com/brian900/Tabiri

Tomorrow → Day 4: Free deployment.
Live on the internet. KES 0. 4 minutes.

#ClaudeAI #DataScience #VibeCoding
#BuildInPublic #Tabiri #Kenya`
  },
  {
    day: 4, eatDate: "28 June 2026", phase: "FREE DEPLOYMENT", tool: "GitHub + Vercel",
    body: `🚀 I deployed Tabiri live on the internet.

Cost: KES 0
Time: 4 minutes
Experience needed: None

(4/5 — How I built Tabiri using Claude AI)

─────────────────────────────
STEP 1 — Push to GitHub
→ Create free account at github.com
→ New repository → upload files
→ github.com/brian900/Tabiri ✅

STEP 2 — Deploy on Vercel
→ Go to vercel.com/new
→ Import GitHub repo
→ Click Deploy
→ Live in 60 seconds ✅

STEP 3 — Auto-deploy forever
→ Every code push = automatic rebuild
→ Zero configuration ever again ✅

─────────────────────────────
COMPLETE FREE STACK:

React 18       → framework (free)
GitHub         → code storage (free)
Vercel         → hosting + HTTPS (free)
Claude AI      → the builder (free tier)
SendGrid       → email 100/day (free)
GitHub Actions → automation (free)

Total monthly cost: KES 0 🇰🇪
─────────────────────────────

📌 LESSON 4:
The biggest lie in tech is that you
need money to ship a product.
You need clarity and the right tools.
─────────────────────────────

🛠 Tools: GitHub + Vercel + Claude AI

🔮 Tabiri is live RIGHT NOW:
https://tabiri.vercel.app

📂 Source code:
https://github.com/brian900/Tabiri

Tomorrow → Day 5: FINAL. The complete
blueprint + your turn to build.

#ClaudeAI #Vercel #GitHub #VibeCoding
#BuildInPublic #FreeTech #Tabiri #Kenya`
  },
  {
    day: 5, eatDate: "29 June 2026", phase: "FULL RECAP", tool: "All tools combined",
    body: `🏆 5 days ago I had an idea.

Today Tabiri is:
✅ Live on the internet
✅ Emailing daily predictions automatically
✅ Posting to LinkedIn automatically
✅ Open source for anyone to use

Cost: KES 0. Here's the full blueprint. 🧵

(5/5 — FINAL — How I built Tabiri with Claude AI)

─────────────────────────────
THE 5-DAY BUILD:

Day 1 → The Idea
  Claude AI → full architecture from 1 prompt

Day 2 → The Dashboard
  Claude AI + React → 800 lines, zero errors

Day 3 → The Engine
  Claude AI → devigging + 9 context factors

Day 4 → Free Deployment
  GitHub + Vercel → live in 4 minutes, KES 0

Day 5 → This recap (automated 😄)
  All tools combined

─────────────────────────────
WHAT I'D DO DIFFERENTLY:

1. Connect real odds API from Day 1
2. Ship on Day 2 — even imperfect
3. Build mobile-first from the start

─────────────────────────────
YOUR TURN:

Everything is open source.
Clone it, break it, build on it.

All you need:
→ claude.ai  (free)
→ github.com  (free)
→ vercel.com  (free)

If I built this — so can you. 🇰🇪
─────────────────────────────

🔮 Try Tabiri live:
https://tabiri.vercel.app

📂 Full source code:
https://github.com/brian900/Tabiri

📋 Comment "PLAYBOOK" below
and I'll send you the full PDF guide.
─────────────────────────────

Thank you for following this series.
Tag someone who needs to see this. 🙏

#ClaudeAI #VibeCoding #BuildInPublic
#SportsTech #OpenSource #AITutorial
#Tabiri #WebDev #ZeroCost #Kenya
#React #GitHub #Vercel #AfricaTech`
  },
];

module.exports = CAMPAIGN_POSTS;
