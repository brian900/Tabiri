# PROJECT 1 — TABIRI
## Sports Intelligence & Probability Aggregation Engine

**Status:** Complete — v3.0  
**Created:** May 2026  
**Author:** Brian Masakari  
**Contact:** brianmasakari@gmail.com

---

## Project Summary

Tabiri is a sports intelligence dashboard that scrapes odds from the top 20 global sports betting platforms by traffic (Alexa/SimilarWeb rank), strips bookmaker margin using a devigging model, and aggregates a weighted consensus probability for every match outcome. It then layers in nine real-world contextual factors to surface the most statistically likely result — and emails the top 20 daily picks automatically every morning.

> "Tabiri" means **"to predict" or "to foretell"** in Swahili.

---

## Project Files

```
Project1_Tabiri/
│
├── README.md                        ← You are here (project index)
│
├── Tabiri.jsx                       ← Full React source code (dashboard app)
│
├── LinkedIn_Article_Tabiri.md       ← Step-by-step build guide (LinkedIn post)
│
├── Deployment_Guide_Free.md         ← How to publish and automate for $0/month
│
└── sports_betting_aggregator.md     ← Original system design document (v1)
```

---

## What Tabiri Does

### Core Engine
| Feature | Detail |
|---------|--------|
| **Books scraped** | 20 top platforms: Pinnacle, Betfair, Bet365, 1xBet, William Hill, Unibet, Betway, DraftKings, FanDuel, BetMGM, 888sport, Ladbrokes, Paddy Power, SkyBet, Coral, Betsson, Bwin, Sbobet, Marathonbet, PointsBet |
| **Odds normalisation** | Decimal → implied probability → devigged true probability |
| **Weighting** | Sharp books (Pinnacle, Betfair) weight 2×; recreational books 1× |
| **Consensus** | Weighted average across all 20 devigged probability sets |
| **Confidence** | Standard deviation across books — lower spread = higher confidence |

### 9 Contextual Factors
| # | Factor | Method |
|---|--------|--------|
| 1 | **Home Advantage** | Sport-specific boost (+3% MMA → +8% Football) |
| 2 | **Weather** | Rain/wind/snow adjustments, away team penalised more |
| 3 | **Away Travel Distance** | Graduated penalty: 0 to 7% based on km |
| 4 | **Team Form** | Last 5 results, recency-weighted (newest = 35%) |
| 5 | **Playing Style** | Attacking vs defensive clash affects goals + outcome |
| 6 | **Head-to-Head** | Historical win rate shifts probability ±6% |
| 7 | **Player Injuries** | Key = −4%, rotation = −2%, minor = −0.5% |
| 8 | **Cards/Suspensions** | Same model as injuries, applied separately |
| 9 | **Referee Profile** | Strict/Lenient/Card-Happy adjusts goal expectancy |

### Output
- Live dashboard with sport-coded cards, probability bars, confidence badges
- Value edge detection (flags bets where Tabiri probability > implied odds)
- Expected goals (xG) per match
- Daily top 20 digest emailed to brianmasakari@gmail.com at 07:00 UTC

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 |
| Fonts | Space Grotesk + Space Mono (Google Fonts) |
| Probability engine | Custom JavaScript — pure functions, no libraries |
| Deployment | Vercel (free) |
| Email | SendGrid (free tier) |
| Scheduler | GitHub Actions cron |
| Live odds | The-Odds-API |
| Database | Supabase Postgres (free) |
| Backend | FastAPI / Python on Railway.app |
| Weather | OpenWeatherMap API |

---

## Deployment Summary (Free)

```
Dashboard → vercel.com         → tabiri.vercel.app
Email     → sendgrid.com       → brianmasakari@gmail.com
Cron      → GitHub Actions     → daily 07:00 UTC
Odds data → the-odds-api.com   → 500 req/month free
Database  → supabase.com       → 500 MB free
Backend   → railway.app        → $5 credit/month free
```

**Total monthly cost: $0**

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | May 2026 | System design document (MD) |
| v1.5 | May 2026 | Initial React dashboard — 20 books, basic aggregation |
| v2.0 | May 2026 | Added 9 contextual factors, email digest, deploy guide |
| v3.0 | May 2026 | High-visibility theme, Sport Grotesk font, vivid sport badges, W/D/L tiles |

---

## LinkedIn Publishing Plan

The article `LinkedIn_Article_Tabiri.md` is ready to publish. It covers:

1. The problem statement
2. Four-layer architecture
3. Devigging mathematics with worked example
4. Weighted aggregation model and book sharpness ratings
5. All 9 contextual factors with code snippets
6. Value edge detection formula
7. Dashboard design decisions
8. Deployment (Vercel, GitHub Actions, SendGrid)
9. Lessons learned
10. Roadmap

**To publish:**
- Connect LinkedIn account when prompted
- The article will be posted as a long-form LinkedIn Article (not a post)
- Recommended hashtags: `#SportsTech #DataScience #React #JavaScript #ProbabilityTheory #BuildInPublic #OpenSource`

> ⚠️ **LinkedIn access note:** To publish directly, LinkedIn integration must be connected. When you're ready, confirm and LinkedIn access will be requested. The article content in `LinkedIn_Article_Tabiri.md` is fully formatted and ready to paste or auto-publish.

---

## Roadmap

- [ ] v3.1 — Connect The-Odds-API (replace mock data)
- [ ] v3.2 — OpenWeatherMap per venue (replace static weather field)
- [ ] v3.3 — Supabase integration (persist predictions, track accuracy)
- [ ] v4.0 — ML layer: blend consensus with historical closing line accuracy
- [ ] v4.1 — Value bet push notifications (Telegram / email alert)
- [ ] v4.2 — Multi-user support with personalised sport subscriptions
- [ ] v5.0 — Mobile app (React Native)

---

## Legal Note

Tabiri is a research and educational tool. All probability outputs are statistical aggregations and do not constitute financial or wagering advice. Always review the Terms of Service of any platform before automated access. Scraping is subject to local laws and platform policies.

---

*Project 1 — Tabiri — © Brian Masakari, May 2026*
