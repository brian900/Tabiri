/**
 * Tabiri — Daily Email Digest
 * Sends Top 20 picks to brianmasakari@gmail.com every day at 07:00 UTC
 * Run via: node server/digest.js
 * Scheduled via: .github/workflows/daily-digest.yml
 */

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ── Mock top 20 picks (replace with live API call in production) ─────────────
function getTop20Picks() {
  // In production: fetch from The-Odds-API, run computeEvent(), sort by confidence
  // For now returns a placeholder — wire up the same compute logic from src/App.js
  return [
    { home:"Man City",   away:"Arsenal",    league:"Premier League", bestOutcome:"Man City",   bestProb:0.562, confidence:0.88, valueRating:"HIGH VALUE", bestDecimal:1.82, sport:"Football" },
    { home:"Bayern",     away:"Dortmund",   league:"Bundesliga",     bestOutcome:"Bayern",     bestProb:0.713, confidence:0.85, valueRating:"HIGH VALUE", bestDecimal:1.55, sport:"Football" },
    { home:"PSG",        away:"Lyon",       league:"Ligue 1",        bestOutcome:"PSG",        bestProb:0.742, confidence:0.84, valueRating:"VALUE",      bestDecimal:1.45, sport:"Football" },
    { home:"Celtics",    away:"Warriors",   league:"NBA Playoffs",   bestOutcome:"Celtics",    bestProb:0.621, confidence:0.81, valueRating:"VALUE",      bestDecimal:1.65, sport:"Basketball" },
    { home:"Real Madrid",away:"Barcelona",  league:"La Liga",        bestOutcome:"Real Madrid",bestProb:0.538, confidence:0.79, valueRating:"FAIR",       bestDecimal:2.10, sport:"Football" },
    { home:"Panthers",   away:"Avalanche",  league:"NHL Playoffs",   bestOutcome:"Panthers",   bestProb:0.581, confidence:0.77, valueRating:"VALUE",      bestDecimal:1.75, sport:"Hockey"   },
    { home:"Inter Milan",away:"AC Milan",   league:"Serie A",        bestOutcome:"Inter Milan",bestProb:0.512, confidence:0.74, valueRating:"FAIR",       bestDecimal:1.90, sport:"Football" },
    { home:"Yankees",    away:"Dodgers",    league:"MLB",            bestOutcome:"Dodgers",    bestProb:0.503, confidence:0.71, valueRating:"FAIR",       bestDecimal:1.95, sport:"Baseball" },
    { home:"Sinner",     away:"Alcaraz",    league:"French Open",    bestOutcome:"Alcaraz",    bestProb:0.538, confidence:0.70, valueRating:"FAIR",       bestDecimal:1.88, sport:"Tennis"   },
    { home:"Makhachev",  away:"Oliveira",   league:"UFC 312",        bestOutcome:"Makhachev",  bestProb:0.689, confidence:0.68, valueRating:"FAIR",       bestDecimal:1.45, sport:"MMA"      },
  ];
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const fmtP    = p  => (p * 100).toFixed(1) + "%";
const confClr = c  => c >= 0.8 ? "#3fb950" : c >= 0.6 ? "#e3b341" : "#f85149";
const confLbl = c  => c >= 0.8 ? "HIGH" : c >= 0.6 ? "MED" : "LOW";
const sportIc = s  => ({ Football:"⚽", Basketball:"🏀", Tennis:"🎾", Baseball:"⚾", Hockey:"🏒", MMA:"🥊" }[s] || "🏟");

// ── Build HTML email ──────────────────────────────────────────────────────────
function buildEmailHTML(picks) {
  const today = new Date().toDateString();
  const rows = picks.map((ev, i) => `
    <tr style="border-bottom:1px solid #21262d;${i%2===0?"":"background:#0d1117"}">
      <td style="padding:10px 12px;color:#8b949e;font-family:monospace;font-size:12px;">#${i+1}</td>
      <td style="padding:10px 12px;font-size:13px;">${sportIc(ev.sport)}</td>
      <td style="padding:10px 12px;color:#e6edf3;font-family:sans-serif;font-size:13px;font-weight:600;">${ev.home} vs ${ev.away}</td>
      <td style="padding:10px 12px;color:#8b949e;font-family:sans-serif;font-size:12px;">${ev.league}</td>
      <td style="padding:10px 12px;color:#3fb950;font-family:sans-serif;font-size:13px;font-weight:700;">${ev.bestOutcome}</td>
      <td style="padding:10px 12px;color:#3fb950;font-family:monospace;font-size:13px;font-weight:700;">${fmtP(ev.bestProb)}</td>
      <td style="padding:10px 12px;color:${confClr(ev.confidence)};font-family:sans-serif;font-size:12px;font-weight:600;">${confLbl(ev.confidence)}</td>
      <td style="padding:10px 12px;color:#e3b341;font-family:sans-serif;font-size:12px;">${ev.valueRating}</td>
      <td style="padding:10px 12px;color:#58a6ff;font-family:monospace;font-size:12px;">${ev.bestDecimal.toFixed(2)}</td>
    </tr>`).join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="background:#0d1117;margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:900px;margin:0 auto;padding:32px 24px;">

    <!-- Header -->
    <div style="border-bottom:2px solid #238636;padding-bottom:20px;margin-bottom:28px;">
      <h1 style="color:#3fb950;font-size:32px;font-weight:800;letter-spacing:0.2em;margin:0 0 6px;">🔮 TABIRI</h1>
      <p style="color:#8b949e;font-size:13px;margin:0;">Sports Intelligence Engine · Daily Top 20 Report</p>
      <p style="color:#8b949e;font-size:12px;margin:4px 0 0;">${today} · 20 books aggregated · 9 context factors applied</p>
    </div>

    <!-- Table -->
    <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
      <thead>
        <tr style="border-bottom:2px solid #30363d;">
          <th style="padding:8px 12px;text-align:left;color:#8b949e;font-size:11px;font-weight:600;letter-spacing:0.1em;">#</th>
          <th style="padding:8px 12px;text-align:left;color:#8b949e;font-size:11px;font-weight:600;letter-spacing:0.1em;"></th>
          <th style="padding:8px 12px;text-align:left;color:#8b949e;font-size:11px;font-weight:600;letter-spacing:0.1em;">MATCH</th>
          <th style="padding:8px 12px;text-align:left;color:#8b949e;font-size:11px;font-weight:600;letter-spacing:0.1em;">LEAGUE</th>
          <th style="padding:8px 12px;text-align:left;color:#8b949e;font-size:11px;font-weight:600;letter-spacing:0.1em;">PICK</th>
          <th style="padding:8px 12px;text-align:left;color:#8b949e;font-size:11px;font-weight:600;letter-spacing:0.1em;">PROB</th>
          <th style="padding:8px 12px;text-align:left;color:#8b949e;font-size:11px;font-weight:600;letter-spacing:0.1em;">CONF</th>
          <th style="padding:8px 12px;text-align:left;color:#8b949e;font-size:11px;font-weight:600;letter-spacing:0.1em;">VALUE</th>
          <th style="padding:8px 12px;text-align:left;color:#8b949e;font-size:11px;font-weight:600;letter-spacing:0.1em;">ODDS</th>
        </tr>
      </thead>
      <tbody style="color:#c9d1d9;">${rows}</tbody>
    </table>

    <!-- Footer -->
    <div style="border-top:1px solid #21262d;padding-top:20px;">
      <p style="color:#484f58;font-size:11px;line-height:1.8;margin:0;">
        <strong style="color:#8b949e;">Factors applied:</strong> Home advantage · Weather · Travel distance · Team form · H2H record · Injuries · Suspensions · Referee profile · Playing style<br/>
        <strong style="color:#8b949e;">Books aggregated:</strong> Pinnacle · Betfair · Bet365 · 1xBet · William Hill · Unibet · Betway · DraftKings · FanDuel · BetMGM · 888sport · Ladbrokes · Paddy Power · SkyBet · Coral · Betsson · Bwin · Sbobet · Marathonbet · PointsBet<br/><br/>
        This report is for research purposes only and does not constitute financial or wagering advice.<br/>
        <a href="https://github.com/brian900/Tabiri" style="color:#58a6ff;">github.com/brian900/Tabiri</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}

// ── Send ──────────────────────────────────────────────────────────────────────
async function sendDailyDigest() {
  const picks = getTop20Picks();
  const html  = buildEmailHTML(picks);

  const msg = {
    to:      "brianmasakari@gmail.com",
    from:    { email: "tabiri@yourdomain.com", name: "Tabiri Intelligence" },
    subject: `🔮 Tabiri Daily Top ${picks.length} — ${new Date().toDateString()}`,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Digest sent to brianmasakari@gmail.com at ${new Date().toISOString()}`);
  } catch (err) {
    console.error("❌ SendGrid error:", err.response?.body?.errors || err.message);
    process.exit(1);
  }
}

sendDailyDigest();
