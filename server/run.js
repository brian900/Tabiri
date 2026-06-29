const POSTS=[{day:1,phase:"THE IDEA",cron:"0 21 24 6 *",body:"💡 I asked Claude AI one question.\n\nIt handed me a full sports predictor website.\n\nHere's the exact conversation. 🧵\n\n(1/5 — How I built Tabiri using Claude AI)\n\nZero web dev experience. No team. No budget.\nJust one prompt.\n\nMY EXACT PROMPT:\n\"Design a system that scrapes the top 20\nsports betting websites, aggregates outcome\nprobabilities, and outputs the best likely outcome\"\n\nClaude gave me:\n✅ A 4-layer system architecture\n✅ 20 target websites by traffic rank\n✅ The maths explained\n✅ Full system design document\n✅ Tech stack recommendation\n\nAll from one sentence.\n\nLESSON 1: Quality of AI output = quality of your prompt.\nBe specific. Claude rewards clarity.\n\n🛠 Tool: Claude AI — claude.ai (free)\n\n🔮 https://tabiri.vercel.app\n📂 https://github.com/brian900/Tabiri\n\nTomorrow: How Claude built the full dashboard in 3 minutes.\n\n#ClaudeAI #VibeCoding #BuildInPublic #SportsTech #Tabiri #Kenya"},{day:2,phase:"THE DASHBOARD",cron:"0 21 25 6 *",body:"🎨 I told Claude: \"Build me a dark sports dashboard.\"\n\n3 minutes later — 800 lines of React. Zero errors.\n\n(2/5 — How I built Tabiri using Claude AI)\n\nMY EXACT PROMPT:\n\"Create a React 18 dashboard with:\n- Space Grotesk font for UI\n- Space Mono for numbers\n- Dark theme #0d1117\n- Sport colour coding:\n  Football=blue, Basketball=orange\n  Tennis=green, MMA=red\n- Expandable event cards\n- Probability bars\n- HIGH/MED/LOW confidence badges\"\n\nClaude wrote it. I copied it. It ran perfectly.\n\nLESSON 2: You don't need to know React to build in React.\nYou need to know WHAT you want.\nClaude handles the HOW.\n\n🛠 Tools: Claude AI + React 18 + Google Fonts\n\n🔮 https://tabiri.vercel.app\n📂 https://github.com/brian900/Tabiri\n\nTomorrow: The probability maths — 5 lines of code.\n\n#ClaudeAI #React #VibeCoding #BuildInPublic #Tabiri #Kenya"},{day:3,phase:"THE ENGINE",cron:"0 21 26 6 *",body:"📐 I failed maths in school.\n\nClaude helped me build a probability engine processing 20 bookmakers.\n\n(3/5 — How I built Tabiri using Claude AI)\n\nEvery bookmaker adds hidden margin to odds.\nTabiri removes it:\n\nconst devig = (probs) => {\n  const sum = probs.reduce((a,b) => a+b, 0);\n  return probs.map(p => p / sum);\n};\n\n5 lines. That IS the engine.\n\nPlus 9 real-world factors:\n1 Home advantage\n2 Weather\n3 Travel distance\n4 Team form\n5 Playing style\n6 Head-to-head\n7 Injuries\n8 Cards/suspensions\n9 Referee profile\n\nLESSON 3: Ask Claude to EXPLAIN first, then CODE.\n\n🛠 Tool: Claude AI\n\n🔮 https://tabiri.vercel.app\n📂 https://github.com/brian900/Tabiri\n\nTomorrow: Free deployment. KES 0. 4 minutes.\n\n#ClaudeAI #DataScience #VibeCoding #BuildInPublic #Tabiri #Kenya"},{day:4,phase:"FREE DEPLOYMENT",cron:"0 21 27 6 *",body:"🚀 I deployed Tabiri live on the internet.\n\nCost: KES 0. Time: 4 minutes.\n\n(4/5 — How I built Tabiri using Claude AI)\n\nSTEP 1 — GitHub\n→ github.com/brian900/Tabiri\n\nSTEP 2 — Vercel\n→ vercel.com/new\n→ Import repo → Deploy\n→ Live in 60 seconds\n\nSTEP 3 — Auto-deploy forever\n→ Every push = rebuild\n\nFREE STACK:\nReact + GitHub + Vercel + Claude AI\nTotal cost: KES 0 🇰🇪\n\nLESSON 4: You don't need money to ship.\nYou need clarity and the right tools.\n\n🛠 GitHub + Vercel + Claude AI\n\n🔮 https://tabiri.vercel.app\n📂 https://github.com/brian900/Tabiri\n\nTomorrow: FINAL recap + your turn.\n\n#ClaudeAI #Vercel #GitHub #VibeCoding #Tabiri #Kenya"},{day:5,phase:"FULL RECAP",cron:"0 21 28 6 *",body:"🏆 5 days ago I had an idea.\n\nToday Tabiri is:\n✅ Live on the internet\n✅ Emailing predictions daily\n✅ Posting to LinkedIn automatically\n✅ Open source for anyone\n\nCost: KES 0.\n\n(5/5 — FINAL — How I built Tabiri with Claude AI)\n\nDay 1 — The Idea — Claude AI\nDay 2 — The Dashboard — React\nDay 3 — The Engine — Devigging\nDay 4 — Deployment — Vercel\nDay 5 — This post (automated) 😄\n\nYOUR TURN:\n→ claude.ai (free)\n→ github.com (free)\n→ vercel.com (free)\n\nIf I built this — so can you. 🇰🇪\n\n🔮 https://tabiri.vercel.app\n📂 https://github.com/brian900/Tabiri\n\nComment PLAYBOOK for the full PDF guide.\nTag someone who needs to see this. 🙏\n\n#ClaudeAI #VibeCoding #BuildInPublic #SportsTech #OpenSource #Tabiri #Kenya #AfricaTech"}];

const MAP={"0 21 24 6 *":1,"0 21 25 6 *":2,"0 21 26 6 *":3,"0 21 27 6 *":4,"0 21 28 6 *":5};

async function post(token,urn,p,name){
  if(!token||!urn){console.warn("Skipping "+name+" - no token/urn");return;}
  const r=await fetch("https://api.linkedin.com/v2/ugcPosts",{
    method:"POST",
    headers:{"Authorization":"Bearer "+token,"Content-Type":"application/json","X-Restli-Protocol-Version":"2.0.0","LinkedIn-Version":"202501"},
    body:JSON.stringify({author:urn,lifecycleState:"PUBLISHED",specificContent:{"com.linkedin.ugc.ShareContent":{shareCommentary:{text:p.body},shareMediaCategory:"ARTICLE",media:[{status:"READY",originalUrl:"https://tabiri.vercel.app",title:{text:"Tabiri Day "+p.day+": "+p.phase},description:{text:"How I built a sports predictor with Claude AI"}}]}},visibility:{"com.linkedin.ugc.MemberNetworkVisibility":"PUBLIC"}})
  });
  if(r.status===201){console.log("✅ "+name+" — Day "+p.day+" posted");}
  else{const t=await r.text();console.error("❌ "+name+" failed ("+r.status+"): "+t);}
}

async function main(){
  const cron=process.env.CAMPAIGN_DAY;
  const manual=process.env.MANUAL_DAY?parseInt(process.env.MANUAL_DAY):null;
  let day=manual||MAP[cron];
  if(!day){
    const eat=new Date(Date.now()+3*60*60*1000);
    const d=eat.getUTCDate(),m=eat.getUTCMonth()+1;
    if(m===6&&d>=25&&d<=29)day=d-24;
  }
  if(!day||day<1||day>5){console.log("No post today. cron="+cron+" manual="+manual);process.exit(0);}
  const p=POSTS[day-1];
  console.log("Tabiri Campaign Day "+day+" of 5 — "+p.phase);
  await post(process.env.LINKEDIN_TOKEN_TABIRI,process.env.LINKEDIN_URN_TABIRI,p,"Tabiri.io");
  await new Promise(r=>setTimeout(r,2000));
  await post(process.env.LINKEDIN_TOKEN_BRIAN,process.env.LINKEDIN_URN_BRIAN,p,"Brian Masakari");
  console.log("Done.");
}

main().catch(e=>{console.error("Fatal:",e.message);process.exit(1);});
