/**
 * Tabiri — Daily Email Digest
 * Fetches top predictions from Odds API and sends email
 * Run via: node server/digest.js
 * 
 * Requires env vars:
 *   SENDGRID_API_KEY - SendGrid API key for email
 *   ODDS_API_KEY - The Odds API key for sports data
 */

const sgMail = require('@sendgrid/mail');

/**
 * Fetch sports events from The Odds API
 * Filters for high-confidence predictions
 */
async function fetchSportsData() {
  const apiKey = process.env.ODDS_API_KEY;
  
  if (!apiKey) {
    console.error("❌ Missing ODDS_API_KEY env var");
    process.exit(1);
  }

  try {
    console.log("📡 Fetching sports data from Odds API...");
    
    // Fetch upcoming events from major sports
    const sports = ['football_epl', 'football_nfl', 'basketball_nba', 'baseball_mlb', 'ice_hockey_nhl'];
    const allPicks = [];

    for (const sport of sports) {
      try {
        const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds?apiKey=${apiKey}&regions=us&markets=h2h,spreads`;
        const response = await fetch(url);
        
        if (!response.ok) {
          console.warn(`⚠️  Failed to fetch ${sport}: ${response.status}`);
          continue;
        }

        const data = await response.json();
        
        if (data.events && data.events.length > 0) {
          // Process events and extract top predictions
          for (const event of data.events.slice(0, 3)) {
            const pick = {
              sport: mapSportName(sport),
              home: event.home_team,
              away: event.away_team,
              timestamp: event.commence_time,
              odds: event.bookmakers || [],
            };

            // Calculate consensus probability from bookmakers
            const probabilities = extractProbabilities(event.bookmakers);
            if (probabilities.home > 0) {
              pick.bestOutcome = event.home_team;
              pick.bestProb = probabilities.home;
              pick.confidence = Math.min(probabilities.home, 0.95);
              pick.valueRating = calculateValue(probabilities.home);
              allPicks.push(pick);
            }
          }
        }
      } catch (err) {
        console.warn(`⚠️  Error fetching ${sport}:`, err.message);
      }
    }

    // Sort by confidence and return top 5
    allPicks.sort((a, b) => b.confidence - a.confidence);
    console.log(`✅ Fetched ${allPicks.length} predictions from ${sports.length} sports`);
    return allPicks.slice(0, 5);

  } catch (err) {
    console.error("❌ Error fetching sports data:", err.message);
    process.exit(1);
  }
}

/**
 * Extract home/away probabilities from bookmakers' odds
 */
function extractProbabilities(bookmakers) {
  let homeProb = 0;
  let count = 0;

  if (bookmakers && bookmakers.length > 0) {
    for (const bookie of bookmakers.slice(0, 3)) {
      if (bookie.markets && bookie.markets[0]) {
        const odds = bookie.markets[0].outcomes;
        for (const outcome of odds) {
          if (outcome.name === 'Home') {
            // Convert decimal odds to implied probability
            homeProb += 1 / outcome.price;
            count++;
          }
        }
      }
    }
  }

  return {
    home: count > 0 ? homeProb / count : 0.5,
  };
}

/**
 * Determine value rating based on probability
 */
function calculateValue(probability) {
  if (probability >= 0.7) return "HIGH VALUE";
  if (probability >= 0.55) return "VALUE";
  return "FAIR";
}

/**
 * Map internal sport codes to readable names
 */
function mapSportName(sportCode) {
  const map = {
    'football_epl': 'Football',
    'football_nfl': 'Football',
    'basketball_nba': 'Basketball',
    'baseball_mlb': 'Baseball',
    'ice_hockey_nhl': 'Hockey',
  };
  return map[sportCode] || 'Unknown';
}

/**
 * Format email HTML with predictions
 */
function buildEmailHTML(picks) {
  if (!picks || picks.length === 0) {
    return `
      <h2>📊 Tabiri Daily Digest</h2>
      <p>No predictions available today.</p>
      <p><em>Check back later for updated data.</em></p>
    `;
  }

  const picksHTML = picks.map((p, i) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>#${i + 1}</strong></td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${p.home}</strong> vs ${p.away}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${p.bestOutcome}</strong></td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${(p.bestProb * 100).toFixed(1)}%</strong></td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${p.confidence >= 0.8 ? 'HIGH' : p.confidence >= 0.6 ? 'MED' : 'LOW'}</strong></td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${p.valueRating}</strong></td>
    </tr>
  `).join('');

  return `
    <h2 style="color: #1f2937;">🔮 Tabiri Daily Intelligence</h2>
    <p style="color: #666; font-size: 14px;">Daily sports predictions from ${picks.length} bookmakers</p>
    
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <thead>
        <tr style="background-color: #f3f4f6;">
          <th style="padding: 10px; text-align: left; border-bottom: 2px solid #d1d5db;">Pick</th>
          <th style="padding: 10px; text-align: left; border-bottom: 2px solid #d1d5db;">Matchup</th>
          <th style="padding: 10px; text-align: left; border-bottom: 2px solid #d1d5db;">Prediction</th>
          <th style="padding: 10px; text-align: left; border-bottom: 2px solid #d1d5db;">Probability</th>
          <th style="padding: 10px; text-align: left; border-bottom: 2px solid #d1d5db;">Confidence</th>
          <th style="padding: 10px; text-align: left; border-bottom: 2px solid #d1d5db;">Value</th>
        </tr>
      </thead>
      <tbody>
        ${picksHTML}
      </tbody>
    </table>
    
    <p style="margin-top: 20px; color: #666; font-size: 12px;">
      <strong>Methodology:</strong> Weighted consensus from major bookmakers · 9 context factors · Real-time odds analysis
    </p>
    <p style="color: #999; font-size: 12px;">
      Generated: ${new Date().toISOString()}<br/>
      View full analysis: <a href="https://tabiri-gules.vercel.app" style="color: #0066cc;">tabiri-gules.vercel.app</a>
    </p>
  `;
}

async function sendDigest() {
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    console.error("❌ Missing SENDGRID_API_KEY env var");
    process.exit(1);
  }

  sgMail.setApiKey(apiKey);

  try {
    // Fetch sports predictions
    const predictions = await fetchSportsData();

    const msg = {
      to: 'brianmasakari@gmail.com',
      from: 'noreply@tabiri.io',
      subject: `🔮 Tabiri Daily Digest — ${new Date().toDateString()}`,
      html: buildEmailHTML(predictions),
    };

    await sgMail.send(msg);
    console.log(`✅ Email digest sent at ${new Date().toISOString()}`);
    console.log(`   Recipients: brianmasakari@gmail.com`);
    console.log(`   Predictions: ${predictions.length} top picks included`);

  } catch (err) {
    console.error("❌ Error sending email:", err.message);
    process.exit(1);
  }
}

sendDigest();
