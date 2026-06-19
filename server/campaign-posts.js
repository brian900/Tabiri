/**
 * TABIRI LinkedIn Campaign — Post Content
 * Rescheduled: 15 June 2026 → 22 June 2026
 * Time: 12:00 AM EAT = 21:00 UTC previous day
 *
 * Publishers:
 *   1. Tabiri.io LinkedIn Company Page
 *   2. Brian Wekesa Masakari Personal Profile
 */

const CAMPAIGN_POSTS = [
  {
    day: 1,
    eatDate:   "15 June 2026",
    utcCron:   "0 21 14 6 *",   // 21:00 UTC 14 Jun = 00:00 EAT 15 Jun
    phase:     "THE IDEA",
    tool:      "Claude AI",
    appLink:   "https://tabiri.vercel.app",
    body: `💡 I asked Claude AI one question.

It handed me a full sports predictor website.

Here's the exact conversation that started it all. 🧵

(1/8 — How I built Tabiri using Claude AI)

─────────────────────────────

I had zero web development experience.
No team. No budget.

Just one idea and one prompt.

Here's what I typed into Claude AI 👇

💬 MY EXACT PROMPT:
─────────────────
"Design a system that scrapes the top 20
sports betting websites by Alexa rank,
aggregates outcome probabilities, and
outputs the best likely outcome"

Claude didn't just answer the question.

It gave me:
✅ A 4-layer system architecture
✅ 20 target websites by traffic rank
✅ The devigging mathematics explained
✅ A complete system design document
✅ A full tech stack recommendation

All from one sentence.

─────────────────────────────
📌 LESSON 1:
The quality of what Claude builds =
the quality of your prompt.

Be specific. Claude rewards clarity.
─────────────────────────────

🛠 Tool used today: Claude AI
→ Free at claude.ai

🔮 See what we built:
https://tabiri.vercel.app

📂 Full source code:
https://github.com/brian900/Tabiri

Tomorrow → Day 2: How Claude built
the full React dashboard in 3 minutes.

Follow to catch the full series 👇

#ClaudeAI #VibeCoding #BuildInPublic
#SportsTech #AITutorial #WebDev #Tabiri
#AI #LLM #NoCode #Kenya`,
  },
  {
    day: 2,
    eatDate:   "16 June 2026",
    utcCron:   "0 21 15 6 *",   // 21:00 UTC 15 Jun = 00:00 EAT 16 Jun
    phase:     "THE DASHBOARD",
    tool:      "Claude AI + React 18",
    appLink:   "https://tabiri.vercel.app",
    body: `🎨 I told Claude: "Build me a dark sports dashboard."

3 minutes later — 800 lines of React appeared.
Zero errors. First run.

Here's how. 🧵

(2/8 — How I built Tabiri using Claude AI)

─────────────────────────────

💬 MY EXACT PROMPT:
─────────────────
"Create a React 18 dashboard. Use:
- Space Grotesk font for all UI text
- Space Mono for all numbers and data
- Dark background: #0d1117
- Each sport gets its own colour:
  ⚽ Football = blue
  🏀 Basketball = orange  
  🎾 Tennis = green
  ⚾ Baseball = purple
  🏒 Hockey = cyan
  🥊 MMA = red
- Expandable event cards
- Probability bars per outcome
- Confidence badges: HIGH / MED / LOW"

Claude wrote the entire component.
I copied it. It ran perfectly.

─────────────────────────────
What appeared on screen:

• 20 bookmakers aggregated live
• Sport-coded colour badges per event
• W/D/L form tiles (colour-coded)
• Expected goals (xG) per match
• Value edge detection per bet
• Live scrolling ticker at the top
─────────────────────────────

📌 LESSON 2:
You don't need to know React to build in React.

You need to know WHAT you want.
Claude handles the HOW.

─────────────────────────────
🛠 Tools used today:
→ Claude AI — wrote every line of code
→ React 18 — the framework
→ Space Grotesk + Mono — Google Fonts

🔮 See it live:
https://tabiri.vercel.app

📂 Source code:
https://github.com/brian900/Tabiri

Tomorrow → Day 3: The maths.
How Claude explained probability
theory and wrote the engine for it.

#ClaudeAI #React #VibeCoding
#BuildInPublic #SportsTech #WebDev
#AITutorial #Tabiri #JavaScript #Kenya`,
  },
  {
    day: 3,
    eatDate:   "17 June 2026",
    utcCron:   "0 21 16 6 *",   // 21:00 UTC 16 Jun = 00:00 EAT 17 Jun
    phase:     "THE MATHS",
    tool:      "Claude AI — Probability Engine",
    appLink:   "https://tabiri.vercel.app",
    body: `📐 I failed maths in school.

Claude still helped me build a probability
engine that processes 20 bookmakers.

Here's the 5-line formula at its core. 🧵

(3/8 — How I built Tabiri using Claude AI)

─────────────────────────────

Every bookmaker adds hidden margin to their
odds (called "vig" or "juice").

If you add up the implied probabilities of
all outcomes — they exceed 100%.

That excess is their profit cut.

Example — Man City vs Arsenal:

  Home Win:  1.82 → 54.9% implied
  Draw:      3.60 → 27.8% implied
  Away Win:  4.50 → 22.2% implied
  ─────────────────────────────
  TOTAL:         → 104.9% ❌

4.9% is the bookmaker's margin.
Tabiri removes it before aggregating.

─────────────────────────────
💬 PROMPT TO CLAUDE:
─────────────────
"Explain devigging in plain English,
then write the JavaScript function."

Claude's code:
─────────────────────────────
const devig = (probs) => {
  const sum = probs.reduce(
    (a, b) => a + b, 0
  );
  return probs.map(p => p / sum);
};
─────────────────────────────

5 lines. That IS the engine.

After devigging Man City vs Arsenal:
  Home Win:  51.2% ✅ (true probability)
  Draw:      25.9% ✅
  Away Win:  20.7% ✅
  TOTAL:    100.0% ✅

─────────────────────────────
📌 LESSON 3:
Use Claude as a TEACHER first.
Then a BUILDER.

Ask it to explain the concept,
THEN ask it to code it.

Understanding makes you a
better prompt engineer.
─────────────────────────────

🛠 Tool used today:
→ Claude AI — teacher + coder

🔮 Live app:
https://tabiri.vercel.app

📂 Source code:
https://github.com/brian900/Tabiri

Tomorrow → Day 4: The 9 real-world
factors that make Tabiri smarter
than raw odds alone.

#ClaudeAI #ProbabilityTheory
#DataScience #VibeCoding
#BuildInPublic #SportsTech
#AITutorial #Tabiri #Kenya`,
  },
  {
    day: 4,
    eatDate:   "18 June 2026",
    utcCron:   "0 21 17 6 *",   // 21:00 UTC 17 Jun = 00:00 EAT 18 Jun
    phase:     "THE 9 FACTORS",
    tool:      "Claude AI — Context Engine",
    appLink:   "https://tabiri.vercel.app",
    body: `🔬 Raw odds are dumb.

They don't know:
❌ It's raining in Manchester
❌ The away team flew 5,000km yesterday
❌ Their star striker is injured

Claude helped me fix that. 🧵

(4/8 — How I built Tabiri using Claude AI)

─────────────────────────────

💬 PROMPT TO CLAUDE:
─────────────────
"Add 9 real-world factors that adjust
the consensus probability. Include home
advantage, weather, travel distance, form,
style, H2H, injuries, cards, referee."

─────────────────────────────
The 9 factors Claude modelled:

1️⃣ HOME ADVANTAGE
   Football: +8% to home team
   Basketball: +6%  |  MMA: +3%

2️⃣ WEATHER CONDITIONS
   Snow:  +4% home  /  -5% away
   Rain:  +2% home  /  -3% away

3️⃣ AWAY TRAVEL DISTANCE
   Under 300km  →  0 penalty
   Over 5,000km →  -7% probability

4️⃣ TEAM FORM (last 5 games)
   Most recent result = 35% weight
   Oldest result = 8% weight

5️⃣ PLAYING STYLE
   Attack vs Attack = +0.4 xG
   Defensive derby = -0.3 xG

6️⃣ HEAD-TO-HEAD RECORD
   Historical win rate shifts ±6%

7️⃣ PLAYER INJURIES
   Key player out:    -4%
   Rotation player:   -2%
   Minor knock:       -0.5%

8️⃣ CARDS & SUSPENSIONS
   Same model — calculated separately

9️⃣ REFEREE PROFILE
   Strict ref:     -0.2 xG
   Lenient ref:   +0.25 xG
   Card-happy:    -0.15 xG

─────────────────────────────
📌 LESSON 4:
Claude can model domain knowledge
you don't have.

Describe the LOGIC in plain English.
Claude translates it into code.

You think like an expert.
Claude codes like one.
─────────────────────────────

🛠 Tool used today:
→ Claude AI — domain modelling

🔮 Live app:
https://tabiri.vercel.app

📂 Source code:
https://github.com/brian900/Tabiri

Tomorrow → Day 5: How I deployed
Tabiri live for KES 0 in 4 minutes.

#ClaudeAI #MachineLearning
#DataScience #VibeCoding
#BuildInPublic #SportsTech
#AITutorial #Tabiri #Kenya`,
  },
  {
    day: 5,
    eatDate:   "19 June 2026",
    utcCron:   "0 21 18 6 *",   // 21:00 UTC 18 Jun = 00:00 EAT 19 Jun
    phase:     "FREE DEPLOYMENT",
    tool:      "GitHub + Vercel",
    appLink:   "https://tabiri.vercel.app",
    body: `🚀 I deployed Tabiri live on the internet.

Cost: KES 0
Time: 4 minutes
Experience needed: None

Here's the exact 3-step process. 🧵

(5/8 — How I built Tabiri using Claude AI)

─────────────────────────────

💬 PROMPT TO CLAUDE:
─────────────────
"How do I deploy this React app
for free with a live URL I can share?"

Claude's answer — 3 steps:

─────────────────────────────
STEP 1 — Push to GitHub
─────────────────────────────
1. Create free account → github.com
2. New repository → name it "tabiri"
3. Upload all project files
4. Your code is now version-controlled

→ github.com/brian900/Tabiri ✅

─────────────────────────────
STEP 2 — Deploy on Vercel
─────────────────────────────
1. Go to vercel.com/new
2. "Continue with GitHub"
3. Select the tabiri repository
4. Click Deploy

→ Live in 60 seconds ✅

─────────────────────────────
STEP 3 — Auto-deploy forever
─────────────────────────────
Every time you push new code:
→ Vercel detects the change
→ Rebuilds automatically
→ Live URL updates instantly

→ Zero configuration ever again ✅

─────────────────────────────
COMPLETE FREE STACK:

React 18      → framework (free)
GitHub        → code storage (free)
Vercel        → hosting + HTTPS (free)
Claude AI     → the builder (free tier)
SendGrid      → email 100/day (free)
GitHub Actions→ automation (free)

Total monthly cost: KES 0 🇰🇪
─────────────────────────────

📌 LESSON 5:
The biggest lie in tech is that you
need money to ship a product.

You need clarity and the right tools.
Claude + GitHub + Vercel = zero cost.
─────────────────────────────

🛠 Tools used today:
→ GitHub — github.com
→ Vercel — vercel.com
→ Claude AI — deployment guidance

🔮 Tabiri is live RIGHT NOW:
https://tabiri.vercel.app

📂 Source code:
https://github.com/brian900/Tabiri

Tomorrow → Day 6: How I automated
a daily email with GitHub Actions
and SendGrid. Runs itself. Forever.

#ClaudeAI #Vercel #GitHub
#VibeCoding #BuildInPublic
#FreeTech #Tabiri #SportsTech
#Deployment #Kenya`,
  },
  {
    day: 6,
    eatDate:   "20 June 2026",
    utcCron:   "0 21 19 6 *",   // 21:00 UTC 19 Jun = 00:00 EAT 20 Jun
    phase:     "EMAIL AUTOMATION",
    tool:      "SendGrid + GitHub Actions",
    appLink:   "https://tabiri.vercel.app",
    body: `✉️ Every morning at 7am, my inbox receives
the top 20 sports predictions.

Automatically.
Without me doing anything.
Forever.

Claude built the whole pipeline. 🧵

(6/8 — How I built Tabiri using Claude AI)

─────────────────────────────

💬 PROMPT TO CLAUDE:
─────────────────
"Set up a daily email that sends the
top 20 picks at 07:00 UTC every morning.
Use SendGrid. Schedule via GitHub Actions."

─────────────────────────────
What Claude built in 2 files:

FILE 1: server/digest.js
→ Fetches today's top 20 picks
→ Builds a full dark-themed HTML email
→ Sends via SendGrid API

FILE 2: .github/workflows/daily-digest.yml
→ Runs on schedule every day at 07:00 UTC
→ Installs packages automatically
→ Fires digest.js
→ Also posts to LinkedIn simultaneously

─────────────────────────────
The single line that powers it all:

  schedule:
    - cron: "0 7 * * *"

That ONE line = automation. Forever.
GitHub runs it for free every day.

─────────────────────────────
FREE TOOLS USED:

SendGrid      → 100 emails/day FREE
GitHub Actions→ 2,000 min/month FREE
The-Odds-API  → 500 requests/month FREE
Supabase      → database 500MB FREE

─────────────────────────────
📌 LESSON 6:
Automation is just scheduled code.

You describe WHEN you want it to run.
Claude writes the code that runs.

One cron line = one task.
Running itself. Every day. Free.
─────────────────────────────

🛠 Tools used today:
→ SendGrid — sendgrid.com (free)
→ GitHub Actions — github.com (free)
→ Claude AI — wrote both files

🔮 Live app:
https://tabiri.vercel.app

📂 Source code:
https://github.com/brian900/Tabiri

Tomorrow → Day 7: How I wired LinkedIn
to post automatically using Postman +
the LinkedIn API. This post was scheduled
the same way. 😄

#ClaudeAI #Automation #GitHubActions
#SendGrid #VibeCoding #BuildInPublic
#Tabiri #SportsTech #AITutorial #Kenya`,
  },
  {
    day: 7,
    eatDate:   "21 June 2026",
    utcCron:   "0 21 20 6 *",   // 21:00 UTC 20 Jun = 00:00 EAT 21 Jun
    phase:     "LINKEDIN API",
    tool:      "Postman + LinkedIn API",
    appLink:   "https://tabiri.vercel.app",
    body: `🔗 This post was written by Claude.
Scheduled by Tabiri.
Posted automatically at midnight.

I was asleep. 😄

Here's how I wired it. 🧵

(7/8 — How I built Tabiri using Claude AI)

─────────────────────────────

💬 PROMPT TO CLAUDE:
─────────────────
"Build a Postman collection that posts
daily Tabiri updates to LinkedIn.
Include token refresh so it never breaks."

─────────────────────────────
What Claude + Postman built:

COLLECTION:
"Tabiri — LinkedIn API Automation"

4 requests, all pre-loaded:

STEP 1 → GET /v2/userinfo
  → Fetches your LinkedIn profile
  → Auto-saves your Person URN ✅

STEP 2 → POST /v2/ugcPosts
  → Posts daily top 5 picks to feed
  → Includes app link in every post ✅

STEP 3 → POST /v2/ugcPosts
  → Publishes the full article ✅

STEP 4 → POST /oauth/v2/accessToken
  → Refreshes token monthly (auto) ✅

─────────────────────────────
Why Postman first?

→ Test all API calls visually
→ See exact responses before automating
→ Environment variables store all secrets
→ One click to run the entire collection

Then: export to GitHub Actions.
Automation goes live permanently.

─────────────────────────────
📌 LESSON 7:
Always test APIs in Postman FIRST.

It saves hours of production debugging.

Claude writes the collection.
Postman lets you verify it visually.
Then GitHub Actions runs it forever.

Claude + Postman + GitHub = the
perfect developer workflow.
─────────────────────────────

🛠 Tools used today:
→ Postman — postman.com (free)
→ LinkedIn API — developer.linkedin.com
→ Claude AI — collection builder

🔮 Live app:
https://tabiri.vercel.app

📂 Source code:
https://github.com/brian900/Tabiri

Tomorrow → Day 8 (FINAL):
The complete blueprint. What I learned.
What I'd do differently. And your turn.

#ClaudeAI #Postman #LinkedInAPI
#VibeCoding #BuildInPublic
#APIDesign #Tabiri #SportsTech
#Automation #Kenya`,
  },
  {
    day: 8,
    eatDate:   "22 June 2026",
    utcCron:   "0 21 21 6 *",   // 21:00 UTC 21 Jun = 00:00 EAT 22 Jun
    phase:     "FULL RECAP",
    tool:      "All tools combined",
    appLink:   "https://tabiri.vercel.app",
    body: `🏆 8 days ago I had an idea.

Today Tabiri is:
✅ Live on the internet
✅ Emailing me daily predictions
✅ Posting to LinkedIn automatically
✅ Open source for anyone to use

Cost: KES 0. Here's the full blueprint. 🧵

(8/8 — FINAL — How I built Tabiri with Claude AI)

─────────────────────────────
THE COMPLETE 8-DAY BUILD:

Day 1 → The Idea
  Tool: Claude AI
  Prompt → Full system architecture

Day 2 → The Dashboard
  Tool: Claude AI + React 18
  Prompt → 800 lines of React, no errors

Day 3 → The Probability Engine
  Tool: Claude AI + JavaScript
  Prompt → Devigging maths in 5 lines

Day 4 → The 9 Context Factors
  Tool: Claude AI
  Prompt → Home advantage, weather,
           distance, form, H2H,
           injuries, cards, referee,
           playing style

Day 5 → Free Deployment
  Tool: GitHub + Vercel
  Result → Live at tabiri.vercel.app

Day 6 → Email Automation
  Tool: SendGrid + GitHub Actions
  Result → Daily digest to inbox

Day 7 → LinkedIn Automation
  Tool: Postman + LinkedIn API
  Result → This post. Right now. 😄

Day 8 → This recap (automated)
  Tool: All of the above

─────────────────────────────
WHAT I'D DO DIFFERENTLY:

1. Connect real odds API from Day 1
2. Use Postman earlier in the process
3. Ship on Day 3 — even imperfect
4. Build mobile-first from the start

─────────────────────────────
YOUR TURN:

Everything is open source.
Clone it, break it, build on it.

All you need to start:
→ claude.ai  (free)
→ github.com  (free)
→ vercel.com  (free)

If I built this — so can you. 🇰🇪

─────────────────────────────
🔮 TABIRI — Try it live:
https://tabiri.vercel.app

📂 Full source code:
https://github.com/brian900/Tabiri

📋 Comment "PLAYBOOK" below
and I'll send you the full PDF guide.
─────────────────────────────

Thank you for following this series.
Share with someone building something. 🙏

#ClaudeAI #VibeCoding #BuildInPublic
#SportsTech #OpenSource #AITutorial
#Tabiri #WebDev #ZeroCost #Kenya
#React #GitHub #Vercel #Postman
#AI #Automation #AfricaTech`,
  },
];

module.exports = CAMPAIGN_POSTS;
