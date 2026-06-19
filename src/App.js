import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  TABIRI v3 — High-Visibility Theme
// ─────────────────────────────────────────────────────────────────────────────

const T = {
  bg:        "#0d1117",
  surface:   "#161b22",
  surfaceHi: "#1c2333",
  border:    "#30363d",
  borderHi:  "#58a6ff",

  // Text — much brighter than before
  textPrimary:   "#ffffff",
  textSecondary: "#c9d1d9",
  textMuted:     "#8b949e",
  textDim:       "#484f58",

  // Vivid accents
  green:   "#3fb950",   // bright github green
  greenBg: "#0d2a16",
  yellow:  "#e3b341",
  yellowBg:"#2a1f06",
  red:     "#f85149",
  redBg:   "#2a0d0d",
  blue:    "#58a6ff",
  blueBg:  "#0d1f3a",
  purple:  "#bc8cff",
  purpleBg:"#1e1030",
  pink:    "#ff7eb3",
  pinkBg:  "#2a1020",
  teal:    "#39d353",

  // Sport pill tokens — vivid distinct colours
  sports: {
    Football:   { bg:"#0d2137", border:"#1f6feb", text:"#79c0ff", icon:"⚽" },
    Basketball: { bg:"#2d1200", border:"#db6d28", text:"#ffa657", icon:"🏀" },
    Tennis:     { bg:"#0d2600", border:"#238636", text:"#56d364", icon:"🎾" },
    Baseball:   { bg:"#1e0d36", border:"#8957e5", text:"#d2a8ff", icon:"⚾" },
    Hockey:     { bg:"#001f2e", border:"#1283a8", text:"#39d5f0", icon:"🏒" },
    MMA:        { bg:"#2d0d0d", border:"#da3633", text:"#ff7b72", icon:"🥊" },
    All:        { bg:"#161b22", border:"#30363d", text:"#c9d1d9", icon:"🏟" },
  }
};

const BOOKS = [
  {id:"pinnacle",   name:"Pinnacle",   weight:2.0},{id:"betfair",    name:"Betfair",    weight:2.0},
  {id:"bet365",     name:"Bet365",     weight:1.5},{id:"1xbet",      name:"1xBet",      weight:1.5},
  {id:"williamhill",name:"W.Hill",     weight:1.4},{id:"unibet",     name:"Unibet",     weight:1.3},
  {id:"betway",     name:"Betway",     weight:1.3},{id:"draftkings", name:"DraftKings", weight:1.0},
  {id:"fanduel",    name:"FanDuel",    weight:1.0},{id:"betmgm",     name:"BetMGM",     weight:1.0},
  {id:"888sport",   name:"888sport",   weight:1.2},{id:"ladbrokes",  name:"Ladbrokes",  weight:1.2},
  {id:"paddypower", name:"P.Power",    weight:1.1},{id:"skybet",     name:"SkyBet",     weight:1.1},
  {id:"coral",      name:"Coral",      weight:1.1},{id:"betsson",    name:"Betsson",    weight:1.2},
  {id:"bwin",       name:"Bwin",       weight:1.2},{id:"sbobet",     name:"Sbobet",     weight:1.3},
  {id:"marathonbet",name:"Marathon",   weight:1.2},{id:"pointsbet",  name:"PointsBet",  weight:1.0},
];

const HOME_ADV={Football:.08,Basketball:.06,Tennis:.04,Baseball:.05,Hockey:.06,MMA:.03};
const WEATHER_IMPACT={
  Clear:{home:0,away:0,draw:0},Rain:{home:.02,away:-.03,draw:.015},
  Wind:{home:.015,away:-.02,draw:.01},Snow:{home:.04,away:-.05,draw:.02},
  Extreme:{home:.03,away:-.04,draw:.02},Hot:{home:-.01,away:-.02,draw:.01},Indoor:{home:0,away:0,draw:0},
};
const distancePenalty=km=>km<300?0:km<800?.015:km<2000?.03:km<5000?.05:.07;
const formScore=r=>r.reduce((s,v,i)=>s+(v==="W"?1:v==="D"?.4:0)*[.35,.25,.2,.12,.08][i],0);
const styleGoalMod=(h,a)=>{
  const b=[h,a];
  if(b.includes("Attacking")&&b.includes("Attacking"))return{goals:.4,home:.01,away:.01};
  if(b.includes("Defensive")&&b.includes("Defensive"))return{goals:-.3,home:0,away:0};
  if(b.includes("Pressing")&&b.includes("Counter"))return{goals:.2,home:.015,away:0};
  return{goals:0,home:0,away:0};
};
const h2hMod=(hw,aw,d)=>{const t=hw+aw+d||1;return{home:(hw/t)*.06,away:(aw/t)*.06};};
const injuryImpact=inj=>{let h=0,a=0;inj.forEach(({team,severity})=>{const v=severity==="key"?.04:severity==="rotation"?.02:.005;if(team==="home")h+=v;else a+=v;});return{home:-h,away:-a};};
const cardImpact=s=>injuryImpact(s);
const REF_IMPACT={Lenient:{goals:.25,fouls:-.1},Average:{goals:0,fouls:0},Strict:{goals:-.2,fouls:.2},"Card-Happy":{goals:-.15,fouls:.3}};

const MOCK_EVENTS=[
  {id:1,sport:"Football",league:"Premier League",home:"Man City",away:"Arsenal",kickoff:"2026-05-25T15:00:00Z",
   baseOdds:[1.82,3.6,4.5],weather:"Rain",awayDistanceKm:320,
   homeForm:["W","W","D","W","L"],awayForm:["W","W","W","D","W"],homeStyle:"Pressing",awayStyle:"Counter",
   h2h:{homeWins:6,awayWins:3,draws:3},injuries:[{team:"away",severity:"key"}],suspensions:[],
   referee:{name:"M. Oliver",style:"Strict"},avgGoals:{home:2.1,away:1.4}},
  {id:2,sport:"Football",league:"La Liga",home:"Real Madrid",away:"Barcelona",kickoff:"2026-05-25T20:00:00Z",
   baseOdds:[2.1,3.4,3.2],weather:"Clear",awayDistanceKm:620,
   homeForm:["W","D","W","W","W"],awayForm:["W","W","L","W","D"],homeStyle:"Counter",awayStyle:"Possession",
   h2h:{homeWins:5,awayWins:5,draws:4},injuries:[],suspensions:[{team:"home",severity:"rotation"}],
   referee:{name:"A. Mateu",style:"Card-Happy"},avgGoals:{home:1.9,away:1.8}},
  {id:3,sport:"Basketball",league:"NBA Playoffs",home:"Celtics",away:"Warriors",kickoff:"2026-05-21T23:30:00Z",
   baseOdds:[1.65,null,2.25],weather:"Indoor",awayDistanceKm:4800,
   homeForm:["W","W","W","L","W"],awayForm:["W","L","W","W","L"],homeStyle:"Offensive",awayStyle:"Offensive",
   h2h:{homeWins:3,awayWins:4,draws:0},injuries:[{team:"away",severity:"rotation"}],suspensions:[],
   referee:{name:"S. Foster",style:"Lenient"},avgGoals:{home:118,away:112}},
  {id:4,sport:"Tennis",league:"French Open",home:"Sinner",away:"Alcaraz",kickoff:"2026-05-22T13:00:00Z",
   baseOdds:[1.95,null,1.88],weather:"Wind",awayDistanceKm:1200,
   homeForm:["W","W","W","W","L"],awayForm:["W","W","W","D","W"],homeStyle:"Baseline",awayStyle:"Aggressive",
   h2h:{homeWins:3,awayWins:5,draws:0},injuries:[],suspensions:[],
   referee:{name:"C. Ramos",style:"Average"},avgGoals:{home:3.2,away:3.4}},
  {id:5,sport:"Football",league:"Bundesliga",home:"Bayern",away:"Dortmund",kickoff:"2026-05-23T17:30:00Z",
   baseOdds:[1.55,4.0,5.5],weather:"Clear",awayDistanceKm:530,
   homeForm:["W","W","W","W","D"],awayForm:["L","W","D","L","W"],homeStyle:"Attacking",awayStyle:"Counter",
   h2h:{homeWins:8,awayWins:2,draws:2},injuries:[{team:"away",severity:"key"},{team:"away",severity:"rotation"}],
   suspensions:[{team:"away",severity:"key"}],referee:{name:"F. Brych",style:"Strict"},avgGoals:{home:2.8,away:1.2}},
  {id:6,sport:"Football",league:"Serie A",home:"Inter Milan",away:"AC Milan",kickoff:"2026-05-23T19:45:00Z",
   baseOdds:[1.9,3.3,3.9],weather:"Clear",awayDistanceKm:5,
   homeForm:["W","D","W","W","L"],awayForm:["W","W","D","W","W"],homeStyle:"Pressing",awayStyle:"Defensive",
   h2h:{homeWins:4,awayWins:4,draws:5},injuries:[],suspensions:[],
   referee:{name:"D. Orsato",style:"Average"},avgGoals:{home:1.7,away:1.1}},
  {id:7,sport:"Baseball",league:"MLB",home:"Yankees",away:"Dodgers",kickoff:"2026-05-21T22:00:00Z",
   baseOdds:[1.9,null,1.95],weather:"Wind",awayDistanceKm:4100,
   homeForm:["W","L","W","W","D"],awayForm:["W","W","W","L","W"],homeStyle:"Power",awayStyle:"Balanced",
   h2h:{homeWins:5,awayWins:4,draws:0},injuries:[{team:"home",severity:"rotation"}],suspensions:[],
   referee:{name:"A. Porter",style:"Average"},avgGoals:{home:4.8,away:5.1}},
  {id:8,sport:"Hockey",league:"NHL Playoffs",home:"Panthers",away:"Avalanche",kickoff:"2026-05-22T01:00:00Z",
   baseOdds:[1.75,null,2.1],weather:"Indoor",awayDistanceKm:3200,
   homeForm:["W","W","L","W","W"],awayForm:["W","L","W","D","W"],homeStyle:"Physical",awayStyle:"Skilful",
   h2h:{homeWins:3,awayWins:2,draws:1},injuries:[],suspensions:[{team:"away",severity:"rotation"}],
   referee:{name:"T. Stadlander",style:"Lenient"},avgGoals:{home:3.1,away:2.8}},
  {id:9,sport:"Football",league:"Ligue 1",home:"PSG",away:"Lyon",kickoff:"2026-05-24T20:00:00Z",
   baseOdds:[1.45,4.2,7.0],weather:"Rain",awayDistanceKm:465,
   homeForm:["W","W","W","W","W"],awayForm:["D","L","W","D","L"],homeStyle:"Attacking",awayStyle:"Defensive",
   h2h:{homeWins:9,awayWins:1,draws:2},injuries:[],suspensions:[],
   referee:{name:"C. Turpin",style:"Average"},avgGoals:{home:3.2,away:0.9}},
  {id:10,sport:"MMA",league:"UFC 312",home:"Oliveira",away:"Makhachev",kickoff:"2026-05-24T03:00:00Z",
   baseOdds:[2.8,null,1.45],weather:"Indoor",awayDistanceKm:11000,
   homeForm:["W","W","L","W","W"],awayForm:["W","W","W","W","D"],homeStyle:"Submission",awayStyle:"Grappling",
   h2h:{homeWins:0,awayWins:1,draws:0},injuries:[],suspensions:[],
   referee:{name:"H. McCarthy",style:"Average"},avgGoals:{home:null,away:null}},
];

// ── Compute ─────────────────────────────────────────────────────────────────
const rnd=(b,sp=.12)=>parseFloat((b+(Math.random()-.5)*sp).toFixed(3));
const decToProb=d=>1/d;
const devig=probs=>{const s=probs.reduce((a,b)=>a+b,0);return probs.map(p=>p/s);};
const wtdAvg=items=>{const n=items[0].probs.length,res=Array(n).fill(0);let tw=0;items.forEach(({w,probs})=>{probs.forEach((p,i)=>(res[i]+=p*w));tw+=w;});return res.map(r=>r/tw);};
const stdDev=arr=>{const m=arr.reduce((a,b)=>a+b,0)/arr.length;return Math.sqrt(arr.map(x=>(x-m)**2).reduce((a,b)=>a+b,0)/arr.length);};

function computeEvent(ev){
  const threeWay=ev.baseOdds[1]!==null;
  const bookData=BOOKS.map(b=>{
    const odds=threeWay?[rnd(ev.baseOdds[0]),rnd(ev.baseOdds[1]),rnd(ev.baseOdds[2])]:[rnd(ev.baseOdds[0]),rnd(ev.baseOdds[2])];
    const probs=devig(odds.map(decToProb));
    return{bookId:b.id,w:b.weight,probs,odds};
  });
  let [ph,pd,pa]=wtdAvg(bookData.map(({w,probs})=>({w,probs})));
  if(!threeWay){pa=pd;pd=0;}
  const hadv=HOME_ADV[ev.sport]||.06;
  ph=Math.min(ph+hadv*.5,.97);pa=Math.max(pa-hadv*.3,.02);
  const wI=WEATHER_IMPACT[ev.weather]||WEATHER_IMPACT.Clear;
  ph+=wI.home;pa+=wI.away;if(threeWay)pd+=wI.draw;
  const dp=distancePenalty(ev.awayDistanceKm);
  pa=Math.max(pa-dp,.02);ph=Math.min(ph+dp*.5,.97);
  const hF=formScore(ev.homeForm),aF=formScore(ev.awayForm),fd=(hF-aF)*.08;
  ph=Math.min(ph+fd,.97);pa=Math.max(pa-fd,.02);
  const sm=styleGoalMod(ev.homeStyle,ev.awayStyle);
  ph+=sm.home;pa+=sm.away;
  const hh=h2hMod(ev.h2h.homeWins,ev.h2h.awayWins,ev.h2h.draws);
  ph=Math.min(ph+hh.home*.4,.97);pa=Math.max(pa+hh.away*.4,.02);
  const inj=injuryImpact(ev.injuries);
  ph=Math.min(ph+inj.home,.97);pa=Math.max(pa+inj.away,.02);
  const susp=cardImpact(ev.suspensions);
  ph=Math.min(ph+susp.home,.97);pa=Math.max(pa+susp.away,.02);
  const refMod=REF_IMPACT[ev.referee.style]||{goals:0};
  const tot=ph+(threeWay?pd:0)+pa;
  if(threeWay){ph/=tot;pd/=tot;pa/=tot;}else{const t2=ph+pa;ph/=t2;pa/=t2;}
  let expGoals=null;
  if(ev.avgGoals.home!==null)expGoals=parseFloat(((ev.avgGoals.home+ev.avgGoals.away)+sm.goals+refMod.goals).toFixed(1));
  const outcomes=threeWay?[ev.home,"Draw",ev.away]:[ev.home,ev.away];
  const finalProbs=threeWay?[ph,pd,pa]:[ph,pa];
  const bestIdx=finalProbs.indexOf(Math.max(...finalProbs));
  const spread=stdDev(bookData.map(b=>b.probs[bestIdx]));
  const confidence=Math.min(.99,(1-spread*7)*.92+.07);
  const contextFactors=[
    {label:"Home Advantage",score:hadv*100,positive:true},
    {label:"Weather",score:Math.abs(wI.home)*100,positive:wI.home>=0},
    {label:"Away Distance",score:dp*100,positive:false},
    {label:"Form Diff",score:Math.abs(fd)*100,positive:fd>0},
    {label:"H2H Record",score:hh.home*40,positive:hh.home>=hh.away},
    {label:"Injuries",score:Math.abs(inj.home+inj.away)*100,positive:false},
    {label:"Suspensions",score:Math.abs(susp.home+susp.away)*100,positive:false},
    {label:"Referee",score:Math.abs(refMod.goals||0)*10,positive:(refMod.goals||0)>=0},
    {label:"Style Clash",score:Math.abs(sm.home+sm.away)*100,positive:sm.home>=0},
  ].filter(f=>f.score>.01);
  const bestOdds=bookData.map(b=>threeWay?b.odds[bestIdx]:(bestIdx===0?b.odds[0]:b.odds[1]));
  const bestDecimal=Math.max(...bestOdds);
  const edge=finalProbs[bestIdx]-1/bestDecimal;
  const valueRating=edge>.04?"HIGH VALUE":edge>.01?"VALUE":"FAIR";
  return{...ev,finalProbs,outcomes,bestIdx,bestOutcome:outcomes[bestIdx],bestProb:finalProbs[bestIdx],
    confidence,spread,bookData,expGoals,contextFactors,hForm:hF,aForm:aF,valueRating,edge,bestDecimal};
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const fmtP=p=>(p*100).toFixed(1)+"%";
const fmtTime=iso=>new Date(iso).toLocaleString("en-GB",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
const cc=c=>c>=.8?T.green:c>=.6?T.yellow:T.red;
const cl=c=>c>=.8?"HIGH":c>=.6?"MED":"LOW";
const sp=s=>T.sports[s]||T.sports.All;

function FormDots({results}){
  return(
    <span style={{display:"inline-flex",gap:3,alignItems:"center"}}>
      {results.map((r,i)=>(
        <span key={i} style={{
          display:"inline-flex",alignItems:"center",justifyContent:"center",
          width:18,height:18,borderRadius:4,fontSize:9,fontWeight:700,
          background:r==="W"?T.greenBg:r==="D"?T.yellowBg:T.redBg,
          color:r==="W"?T.green:r==="D"?T.yellow:T.red,
          border:`1px solid ${r==="W"?T.green+"50":r==="D"?T.yellow+"50":T.red+"50"}`,
        }}>{r}</span>
      ))}
    </span>
  );
}

// ── Ticker ─────────────────────────────────────────────────────────────────
function Ticker({events}){
  const text=events.map(e=>`${sp(e.sport).icon} ${e.home} vs ${e.away}  ▶  ${e.bestOutcome}  ${fmtP(e.bestProb)}  [${e.valueRating}]`).join("    ·    ");
  return(
    <div style={{background:"#0a0e13",borderBottom:`1px solid ${T.border}`,overflow:"hidden",height:32,display:"flex",alignItems:"center"}}>
      <div style={{color:T.green,fontFamily:"'Space Mono',monospace",fontSize:11,whiteSpace:"nowrap",
        animation:"ticker 55s linear infinite",letterSpacing:"0.04em",fontWeight:400}}>
        {text+"    ·    "+text}
      </div>
    </div>
  );
}

// ── Sport Badge ─────────────────────────────────────────────────────────────
function SportBadge({sport,size="sm"}){
  const s=sp(sport);
  const big=size==="lg";
  return(
    <span style={{
      display:"inline-flex",alignItems:"center",gap:big?6:4,
      background:s.bg,border:`1px solid ${s.border}`,
      borderRadius:6,padding:big?"5px 12px":"3px 9px",
      color:s.text,
      fontSize:big?13:11,
      fontFamily:"'Space Grotesk',sans-serif",
      fontWeight:700,letterSpacing:"0.05em",
    }}>
      {s.icon} {sport.toUpperCase()}
    </span>
  );
}

// ── Prob Bar ─────────────────────────────────────────────────────────────────
function ProbBar({probs,outcomes,bestIdx}){
  return(
    <div style={{display:"flex",gap:3,height:8,borderRadius:4,overflow:"hidden",marginTop:10}}>
      {probs.map((p,i)=>(
        <div key={i} style={{flex:p,transition:"flex .7s ease",
          background:i===bestIdx?"linear-gradient(90deg,#238636,#3fb950)":i===1&&outcomes.length===3?"#21262d":"#161b22",
          borderRadius:2}}
          title={`${outcomes[i]}: ${fmtP(p)}`}/>
      ))}
    </div>
  );
}

// ── Book Table ───────────────────────────────────────────────────────────────
function BookTable({bookData,outcomes}){
  return(
    <div style={{maxHeight:220,overflowY:"auto",marginTop:12,borderRadius:6,border:`1px solid ${T.border}`,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,fontFamily:"'Space Mono',monospace"}}>
        <thead>
          <tr style={{background:"#0d1117",color:T.textMuted,borderBottom:`1px solid ${T.border}`}}>
            <th style={{textAlign:"left",padding:"6px 10px",fontWeight:600,fontSize:11}}>BOOK</th>
            {outcomes.filter(Boolean).map((o,i)=>(
              <th key={i} style={{textAlign:"right",padding:"6px 10px",fontWeight:600,fontSize:11}}>{o.slice(0,9).toUpperCase()}</th>
            ))}
            <th style={{textAlign:"right",padding:"6px 10px",fontWeight:600,fontSize:11}}>VIG</th>
          </tr>
        </thead>
        <tbody>
          {bookData.map((bd,i)=>{
            const book=BOOKS.find(b=>b.id===bd.bookId);
            const rawSum=bd.odds.map(decToProb).reduce((a,b)=>a+b,0);
            const vig=((rawSum-1)*100).toFixed(1);
            return(
              <tr key={i} style={{borderBottom:`1px solid #21262d`,background:i%2===0?"transparent":"#0d1117"}}>
                <td style={{padding:"5px 10px",color:T.textSecondary,fontWeight:500}}>{book?.name}</td>
                {bd.odds.map((o,j)=>(
                  <td key={j} style={{textAlign:"right",padding:"5px 10px",color:T.textPrimary,fontWeight:600}}>{o.toFixed(2)}</td>
                ))}
                <td style={{textAlign:"right",padding:"5px 10px",color:T.textMuted}}>{vig}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Context Factors ──────────────────────────────────────────────────────────
function ContextFactors({factors}){
  return(
    <div style={{display:"flex",flexWrap:"wrap",gap:7,marginTop:12}}>
      {factors.map((f,i)=>(
        <div key={i} style={{
          background:f.positive?T.greenBg:T.redBg,
          border:`1px solid ${f.positive?T.green+"40":T.red+"40"}`,
          borderRadius:6,padding:"5px 12px",
          color:f.positive?T.green:T.red,
          fontSize:12,fontFamily:"'Space Mono',monospace",fontWeight:600,
        }}>
          {f.label}: {f.score.toFixed(1)}pt {f.positive?"▲":"▼"}
        </div>
      ))}
    </div>
  );
}

// ── Confidence Badge ─────────────────────────────────────────────────────────
function ConfBadge({confidence}){
  const color=cc(confidence);
  const label=cl(confidence);
  const bgMap={HIGH:T.greenBg,MED:T.yellowBg,LOW:T.redBg};
  return(
    <span style={{
      display:"inline-flex",alignItems:"center",gap:5,
      background:bgMap[label],border:`1px solid ${color}60`,
      borderRadius:6,padding:"4px 10px",
      color,fontSize:11,fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,letterSpacing:"0.06em",
    }}>
      <span style={{width:7,height:7,borderRadius:"50%",background:color,display:"inline-block"}}/>
      {label} CONF · {(confidence*100).toFixed(0)}%
    </span>
  );
}

// ── Value Badge ──────────────────────────────────────────────────────────────
function ValueBadge({rating}){
  if(rating==="FAIR")return null;
  const hi=rating==="HIGH VALUE";
  return(
    <span style={{
      display:"inline-flex",alignItems:"center",gap:4,
      background:hi?"#2a1f06":"#161b22",
      border:`1px solid ${hi?T.yellow+"60":T.blue+"40"}`,
      borderRadius:6,padding:"3px 9px",
      color:hi?T.yellow:T.blue,
      fontSize:11,fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,
    }}>★ {rating}</span>
  );
}

// ── Event Card ───────────────────────────────────────────────────────────────
function EventCard({ev,expanded,onClick,rank}){
  const [tab,setTab]=useState("overview");
  const s=sp(ev.sport);

  return(
    <div onClick={onClick} style={{
      background:expanded?T.surfaceHi:T.surface,
      border:`1px solid ${expanded?s.border:T.border}`,
      borderRadius:10,padding:"18px 20px",cursor:"pointer",
      transition:"all .2s",marginBottom:10,position:"relative",overflow:"hidden",
      animation:`fadeIn .3s ease ${Math.min(rank*.04,.35)}s both`,
      boxShadow:expanded?`0 0 0 1px ${s.border}30, 0 8px 32px #00000060`:"none",
    }}>
      {/* Left sport-colour strip */}
      <div style={{position:"absolute",top:0,left:0,width:4,height:"100%",
        background:`linear-gradient(180deg,${s.border},${s.border}80)`,borderRadius:"10px 0 0 10px"}}/>

      {/* Rank badge */}
      <div style={{
        position:"absolute",top:14,left:0,
        background:rank<=3?T.green:rank<=10?T.blueBg:T.surface,
        color:rank<=3?"#0d1117":rank<=10?T.blue:T.textMuted,
        width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:11,fontFamily:"'Space Mono',monospace",fontWeight:700,borderRadius:"0 6px 6px 0",
        border:rank<=3?"none":`1px solid ${T.border}`,borderLeft:"none",
      }}>#{rank}</div>

      <div style={{paddingLeft:36,display:"flex",justifyContent:"space-between",gap:14,alignItems:"flex-start"}}>

        {/* LEFT */}
        <div style={{flex:1,minWidth:0}}>
          {/* Tags row */}
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap"}}>
            <SportBadge sport={ev.sport}/>
            <span style={{
              background:"#21262d",border:`1px solid ${T.border}`,borderRadius:5,padding:"3px 9px",
              color:T.textSecondary,fontSize:11,fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,
            }}>{ev.league}</span>
            <span style={{color:T.textMuted,fontSize:11,fontFamily:"'Space Mono',monospace"}}>{fmtTime(ev.kickoff)}</span>
            <span style={{
              background:"#161b22",border:`1px solid ${T.border}`,borderRadius:5,padding:"3px 8px",
              color:T.textMuted,fontSize:11,fontFamily:"'Space Mono',monospace",
            }}>{ev.weather} · {ev.awayDistanceKm>=1000?(ev.awayDistanceKm/1000).toFixed(1)+"k":ev.awayDistanceKm}km</span>
            <ValueBadge rating={ev.valueRating}/>
          </div>

          {/* Match title */}
          <div style={{
            color:T.textPrimary,
            fontSize:20,fontWeight:800,
            fontFamily:"'Space Grotesk',sans-serif",
            marginBottom:10,lineHeight:1.2,letterSpacing:"-0.01em",
          }}>
            {ev.home}
            <span style={{color:T.textDim,fontSize:15,margin:"0 10px",fontWeight:400}}>vs</span>
            {ev.away}
          </div>

          {/* Form + meta */}
          <div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{display:"flex",alignItems:"center",gap:6,color:T.textMuted,fontSize:12,fontFamily:"'Space Grotesk',sans-serif",fontWeight:500}}>
              H: <FormDots results={ev.homeForm}/>
            </span>
            <span style={{display:"flex",alignItems:"center",gap:6,color:T.textMuted,fontSize:12,fontFamily:"'Space Grotesk',sans-serif",fontWeight:500}}>
              A: <FormDots results={ev.awayForm}/>
            </span>
            {ev.expGoals&&(
              <span style={{background:"#1c2333",border:`1px solid ${T.border}`,borderRadius:5,padding:"2px 8px",
                color:T.blue,fontSize:11,fontFamily:"'Space Mono',monospace",fontWeight:600}}>
                xG {ev.expGoals}
              </span>
            )}
            <span style={{color:T.textMuted,fontSize:11,fontFamily:"'Space Grotesk',sans-serif"}}>
              🎯 {ev.referee.name} · <span style={{color:T.textSecondary,fontWeight:600}}>{ev.referee.style}</span>
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{textAlign:"right",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
          <ConfBadge confidence={ev.confidence}/>
          <div style={{
            color:T.green,fontSize:32,fontWeight:800,
            fontFamily:"'Space Grotesk',sans-serif",lineHeight:1,letterSpacing:"-0.02em",
          }}>{fmtP(ev.bestProb)}</div>
          <div style={{
            display:"flex",alignItems:"center",gap:6,
            background:T.greenBg,border:`1px solid ${T.green}40`,
            borderRadius:6,padding:"4px 12px",
          }}>
            <span style={{color:T.green,fontSize:13,fontFamily:"'Space Grotesk',sans-serif",fontWeight:700}}>
              ▶ {ev.bestOutcome}
            </span>
          </div>
          <div style={{color:T.textMuted,fontSize:11,fontFamily:"'Space Mono',monospace"}}>
            {ev.bestDecimal.toFixed(2)} odds · +{(ev.edge*100).toFixed(1)}% edge
          </div>
        </div>
      </div>

      {/* Prob bar */}
      <div style={{paddingLeft:36}}>
        <ProbBar probs={ev.finalProbs} outcomes={ev.outcomes} bestIdx={ev.bestIdx}/>
        <div style={{display:"flex",gap:14,marginTop:7,flexWrap:"wrap",alignItems:"center"}}>
          {ev.outcomes.map((o,i)=>(
            <span key={i} style={{
              color:i===ev.bestIdx?T.green:T.textMuted,
              fontSize:12,fontFamily:"'Space Grotesk',sans-serif",fontWeight:i===ev.bestIdx?700:400,
            }}>{o}: <span style={{fontWeight:700}}>{fmtP(ev.finalProbs[i])}</span></span>
          ))}
          <span style={{marginLeft:"auto",color:T.textDim,fontSize:11,fontFamily:"'Space Mono',monospace"}}>
            σ={ev.spread.toFixed(4)} {expanded?"▲":"▼"}
          </span>
        </div>
      </div>

      {/* Expanded panel */}
      {expanded&&(
        <div style={{paddingLeft:36,marginTop:16,borderTop:`1px solid ${T.border}`,paddingTop:16}}
          onClick={e=>e.stopPropagation()}>
          {/* Tabs */}
          <div style={{display:"flex",gap:6,marginBottom:14}}>
            {["overview","books","context"].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{
                background:tab===t?"#21262d":"transparent",
                border:`1px solid ${tab===t?T.borderHi:T.border}`,
                color:tab===t?T.textPrimary:T.textMuted,
                borderRadius:6,padding:"5px 14px",cursor:"pointer",
                fontSize:12,fontFamily:"'Space Grotesk',sans-serif",fontWeight:tab===t?600:400,
                letterSpacing:"0.04em",
              }}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
            ))}
          </div>

          {tab==="overview"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {[{label:ev.home,isHome:true},{label:ev.away,isHome:false}].map(({label,isHome})=>(
                <div key={label} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,padding:14}}>
                  <div style={{color:T.textSecondary,fontSize:11,fontFamily:"'Space Grotesk',sans-serif",
                    fontWeight:700,letterSpacing:"0.08em",marginBottom:10,
                    textTransform:"uppercase"}}>{isHome?"🏠 Home":"✈️ Away"} — {label}</div>
                  <div style={{display:"flex",flexDirection:"column",gap:6,fontSize:12,fontFamily:"'Space Grotesk',sans-serif",color:T.textSecondary}}>
                    <div>Form: <FormDots results={isHome?ev.homeForm:ev.awayForm}/></div>
                    <div>Style: <span style={{color:T.textPrimary,fontWeight:600}}>{isHome?ev.homeStyle:ev.awayStyle}</span></div>
                    <div>Avg Goals: <span style={{color:T.textPrimary,fontWeight:600}}>{isHome?ev.avgGoals.home:ev.avgGoals.away}</span></div>
                    <div>Injuries: <span style={{color:ev.injuries.filter(i=>i.team===(isHome?"home":"away")).length>0?T.red:T.green,fontWeight:600}}>
                      {ev.injuries.filter(i=>i.team===(isHome?"home":"away")).length} player(s)
                    </span></div>
                    <div>Suspensions: <span style={{color:ev.suspensions.filter(i=>i.team===(isHome?"home":"away")).length>0?T.yellow:T.green,fontWeight:600}}>
                      {ev.suspensions.filter(i=>i.team===(isHome?"home":"away")).length} player(s)
                    </span></div>
                    {!isHome&&<div>Travel: <span style={{color:T.blue,fontWeight:600}}>{ev.awayDistanceKm.toLocaleString()} km</span></div>}
                  </div>
                </div>
              ))}
              <div style={{gridColumn:"span 2",background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,padding:14}}>
                <div style={{color:T.textSecondary,fontSize:11,fontFamily:"'Space Grotesk',sans-serif",
                  fontWeight:700,letterSpacing:"0.08em",marginBottom:10,textTransform:"uppercase"}}>⚔️ Head to Head</div>
                <div style={{display:"flex",gap:24,fontSize:15,fontWeight:700,fontFamily:"'Space Grotesk',sans-serif"}}>
                  <span style={{color:T.green}}>{ev.home}: {ev.h2h.homeWins}W</span>
                  <span style={{color:T.yellow}}>Draws: {ev.h2h.draws}</span>
                  <span style={{color:T.red}}>{ev.away}: {ev.h2h.awayWins}W</span>
                </div>
              </div>
            </div>
          )}
          {tab==="books"&&<BookTable bookData={ev.bookData} outcomes={ev.outcomes}/>}
          {tab==="context"&&<ContextFactors factors={ev.contextFactors}/>}
        </div>
      )}
    </div>
  );
}

// ── Stat Box ──────────────────────────────────────────────────────────────────
function StatBox({label,value,sub,color=T.green}){
  return(
    <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,
      padding:"14px 18px",flex:1,minWidth:110,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:color,opacity:.6}}/>
      <div style={{color:T.textMuted,fontSize:10,fontFamily:"'Space Grotesk',sans-serif",
        fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:6}}>{label}</div>
      <div style={{color,fontSize:26,fontWeight:800,fontFamily:"'Space Grotesk',sans-serif",lineHeight:1}}>{value}</div>
      {sub&&<div style={{color:T.textDim,fontSize:11,fontFamily:"'Space Grotesk',sans-serif",marginTop:4}}>{sub}</div>}
    </div>
  );
}

// ── Scrape Status ─────────────────────────────────────────────────────────────
function ScrapeStatus({scanning}){
  const [tick,setTick]=useState(0);
  useEffect(()=>{
    if(!scanning){setTick(0);return;}
    const t=setInterval(()=>setTick(x=>(x+1)%BOOKS.length),200);
    return()=>clearInterval(t);
  },[scanning]);
  return(
    <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px 18px",marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
        <span style={{color:T.textSecondary,fontSize:11,fontFamily:"'Space Grotesk',sans-serif",
          fontWeight:700,letterSpacing:"0.12em"}}>SCRAPER — 20 SOURCES</span>
        {scanning
          ?<span style={{color:T.green,fontSize:11,fontFamily:"'Space Mono',monospace",animation:"pulse .7s infinite",fontWeight:600}}>● LIVE</span>
          :<span style={{color:T.textMuted,fontSize:11,fontFamily:"'Space Mono',monospace"}}>● IDLE</span>
        }
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
        {BOOKS.map((b,i)=>(
          <div key={b.id} style={{
            padding:"3px 8px",borderRadius:5,fontSize:11,
            fontFamily:"'Space Grotesk',sans-serif",fontWeight:scanning&&i<=tick?600:400,
            background:scanning&&i<=tick?T.greenBg:T.bg,
            border:`1px solid ${scanning&&i===tick?T.green:scanning&&i<tick?T.green+"40":T.border}`,
            color:scanning&&i<=tick?T.green:T.textDim,
            transition:"all .15s",
          }}>{b.name}</div>
        ))}
      </div>
    </div>
  );
}

// ── Email Toast ───────────────────────────────────────────────────────────────
function EmailToast({show}){
  if(!show)return null;
  return(
    <div style={{
      position:"fixed",bottom:20,right:20,zIndex:9999,
      background:T.surface,border:`1px solid ${T.green}50`,
      borderRadius:10,padding:"14px 20px",
      boxShadow:`0 8px 32px #00000080, 0 0 0 1px ${T.green}20`,
      animation:"fadeIn .3s ease",
    }}>
      <div style={{color:T.green,fontFamily:"'Space Grotesk',sans-serif",fontSize:14,fontWeight:700,marginBottom:3}}>
        ✉ Digest dispatched
      </div>
      <div style={{color:T.textSecondary,fontFamily:"'Space Grotesk',sans-serif",fontSize:12}}>
        Top 20 → brianmasakari@gmail.com
      </div>
      <div style={{color:T.textMuted,fontFamily:"'Space Mono',monospace",fontSize:11,marginTop:3}}>
        Next: tomorrow 07:00 UTC
      </div>
    </div>
  );
}

// ── Deploy Guide ──────────────────────────────────────────────────────────────
function DeployGuide({onClose}){
  const steps=[
    {num:"①",color:T.green,title:"PUBLISH (FREE)",lines:["▸ Vercel  →  vercel.com","  npm i -g vercel","  vercel --prod","","▸ Netlify drop","▸ GitHub Pages"]},
    {num:"②",color:T.blue,title:"DAILY EMAIL",lines:["SendGrid (free 100/day)","","sg.send({","  to:'brianmasakari@gmail.com',","  subject:'Tabiri Top 20',","  html: buildEmailHTML(top20)","});"]},
    {num:"③",color:T.purple,title:"CRON SCHEDULE",lines:["# .github/workflows/digest.yml","on:","  schedule:","    - cron: '0 7 * * *'","jobs:","  send-digest:","    - run: node digest.js"]},
    {num:"④",color:T.pink,title:"LIVE ODDS APIs",lines:["▸ The-Odds-API (500/mo free)","▸ API-Football (fixtures)","▸ OpenWeatherMap (weather)","▸ Playwright scraper fallback"]},
    {num:"⑤",color:T.yellow,title:"FULL STACK",lines:["Frontend  → Vercel","API       → Railway.app","Scraper   → Railway worker","DB        → Supabase (free)","Email     → SendGrid","Cron      → GitHub Actions","Cost      → $0/month"]},
    {num:"⑥",color:T.teal,title:"QUICK START",lines:["□ Deploy app to Vercel","□ Get SendGrid API key","□ Get The-Odds-API key","□ Add GitHub Secrets","□ Push workflow YAML","→ Digest arrives daily ✓","  brianmasakari@gmail.com"]},
  ];
  return(
    <div style={{background:T.surface,border:`1px solid ${T.border}`,margin:"14px 22px",
      borderRadius:10,padding:"20px 24px",animation:"fadeIn .3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <span style={{color:T.textPrimary,fontFamily:"'Space Grotesk',sans-serif",fontSize:18,fontWeight:800}}>
          🚀 Automate & Deploy Tabiri
        </span>
        <button onClick={onClose} style={{background:"transparent",border:`1px solid ${T.border}`,
          color:T.textMuted,cursor:"pointer",borderRadius:6,width:30,height:30,fontSize:16}}>✕</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}}>
        {steps.map(({num,color,title,lines})=>(
          <div key={num} style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,padding:14}}>
            <div style={{color,fontFamily:"'Space Grotesk',sans-serif",fontSize:13,fontWeight:700,
              letterSpacing:"0.08em",marginBottom:10}}>{num} {title}</div>
            {lines.map((l,i)=>(
              <div key={i} style={{
                color:l.startsWith("▸")||l.startsWith("□")?T.textSecondary:l.startsWith("→")?color:T.textMuted,
                fontSize:11,fontFamily:"'Space Mono',monospace",lineHeight:1.85,
              }}>{l||" "}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Email builder ─────────────────────────────────────────────────────────────
function buildEmailHTML(top20){
  const rows=top20.map((ev,i)=>`
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 10px;color:#8b949e;font-family:monospace;font-size:12px;">#${i+1}</td>
      <td style="padding:8px 10px;color:#f0f6fc;font-family:sans-serif;font-size:12px;font-weight:600;">${ev.home} vs ${ev.away}</td>
      <td style="padding:8px 10px;color:#c9d1d9;font-family:sans-serif;font-size:12px;">${ev.league}</td>
      <td style="padding:8px 10px;color:#3fb950;font-family:sans-serif;font-size:12px;font-weight:700;">${ev.bestOutcome}</td>
      <td style="padding:8px 10px;color:#3fb950;font-family:monospace;font-size:12px;font-weight:700;">${fmtP(ev.bestProb)}</td>
      <td style="padding:8px 10px;color:${cc(ev.confidence)};font-family:sans-serif;font-size:12px;font-weight:600;">${cl(ev.confidence)}</td>
      <td style="padding:8px 10px;color:#e3b341;font-family:sans-serif;font-size:12px;">${ev.valueRating}</td>
      <td style="padding:8px 10px;color:#58a6ff;font-family:monospace;font-size:12px;">${ev.bestDecimal.toFixed(2)}</td>
    </tr>`).join("");
  return`<!DOCTYPE html><html><body style="background:#0d1117;margin:0;padding:24px;font-family:sans-serif;">
<h1 style="color:#3fb950;letter-spacing:0.2em;font-size:24px;margin-bottom:4px;">TABIRI</h1>
<p style="color:#8b949e;font-size:12px;margin-bottom:20px;">Daily Top 20 — ${new Date().toDateString()} · 9 factors · 20 books</p>
<table style="width:100%;border-collapse:collapse;">
  <thead><tr style="border-bottom:2px solid #30363d;color:#8b949e;font-size:11px;letter-spacing:0.08em;">
    <th style="padding:6px 10px;text-align:left;">#</th>
    <th style="padding:6px 10px;text-align:left;">MATCH</th>
    <th style="padding:6px 10px;text-align:left;">LEAGUE</th>
    <th style="padding:6px 10px;text-align:left;">PICK</th>
    <th style="padding:6px 10px;text-align:left;">PROB</th>
    <th style="padding:6px 10px;text-align:left;">CONF</th>
    <th style="padding:6px 10px;text-align:left;">VALUE</th>
    <th style="padding:6px 10px;text-align:left;">ODDS</th>
  </tr></thead>
  <tbody>${rows}</tbody>
</table>
<p style="color:#484f58;font-size:10px;margin-top:24px;line-height:1.8;">
Research only. Not wagering advice.<br/>
Factors: Home advantage · Weather · Distance · Form · H2H · Injuries · Cards · Referee · Style
</p></body></html>`;
}

// ── Main App ──────────────────────────────────────────────────────────────────
const SPORTS_FILTER=["All","Football","Basketball","Tennis","Baseball","Hockey","MMA"];
const SORTS=[["confidence","CONFIDENCE"],["probability","PROBABILITY"],["value","VALUE"],["time","KICK-OFF"]];

export default function App(){
  const [events,setEvents]=useState([]);
  const [expanded,setExpanded]=useState(null);
  const [sport,setSport]=useState("All");
  const [sort,setSort]=useState("confidence");
  const [scanning,setScanning]=useState(false);
  const [lastUpdate,setLastUpdate]=useState(null);
  const [showToast,setShowToast]=useState(false);
  const [emailLog,setEmailLog]=useState([]);
  const [showDeploy,setShowDeploy]=useState(false);
  const intervalRef=useRef(null);

  const runScrape=()=>{
    setScanning(true);
    setTimeout(()=>{
      setEvents(MOCK_EVENTS.map(computeEvent).sort((a,b)=>b.confidence-a.confidence));
      setLastUpdate(new Date());
      setScanning(false);
    },2000);
  };

  useEffect(()=>{
    runScrape();
    intervalRef.current=setInterval(runScrape,30000);
    return()=>clearInterval(intervalRef.current);
  },[]);

  const sendDigest=()=>{
    const top20=[...events].sort((a,b)=>b.confidence-a.confidence).slice(0,20);
    console.log("📧 Email HTML ready:",buildEmailHTML(top20).slice(0,300));
    setEmailLog(prev=>[...prev,new Date().toLocaleTimeString()]);
    setShowToast(true);
    setTimeout(()=>setShowToast(false),4000);
  };

  const filtered=events
    .filter(e=>sport==="All"||e.sport===sport)
    .sort((a,b)=>
      sort==="confidence"?b.confidence-a.confidence:
      sort==="probability"?b.bestProb-a.bestProb:
      sort==="value"?b.edge-a.edge:
      new Date(a.kickoff)-new Date(b.kickoff)
    );

  const highConf=events.filter(e=>e.confidence>=.8).length;
  const highVal=events.filter(e=>e.valueRating==="HIGH VALUE").length;
  const avgP=events.length?(events.reduce((s,e)=>s+e.bestProb,0)/events.length*100).toFixed(1):"—";

  return(
    <div style={{minHeight:"100vh",background:T.bg,color:T.textPrimary}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Space Grotesk',sans-serif; }
        ::-webkit-scrollbar { width:4px }
        ::-webkit-scrollbar-track { background:${T.bg} }
        ::-webkit-scrollbar-thumb { background:${T.border};border-radius:2px }
        button { cursor:pointer; transition:opacity .15s,border-color .15s; font-family:'Space Grotesk',sans-serif; }
        button:hover { opacity:.82; }
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom:`1px solid ${T.border}`,
        background:"#0a0e13",
        padding:"0 24px",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        height:60,
      }}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{
            width:40,height:40,borderRadius:10,
            background:"linear-gradient(135deg,#0d2a16,#1a4a2a)",
            border:`1px solid ${T.green}50`,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,
          }}>🔮</div>
          <div>
            <div style={{color:T.textPrimary,fontSize:24,fontWeight:800,
              letterSpacing:"0.25em",fontFamily:"'Space Grotesk',sans-serif"}}>TABIRI</div>
            <div style={{color:T.textMuted,fontSize:9,letterSpacing:"0.4em",
              fontFamily:"'Space Mono',monospace"}}>SPORTS INTELLIGENCE ENGINE</div>
          </div>
        </div>

        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {scanning&&(
            <span style={{color:T.green,fontSize:12,animation:"pulse .7s infinite",
              fontFamily:"'Space Grotesk',sans-serif",fontWeight:600}}>● SCANNING</span>
          )}
          {lastUpdate&&!scanning&&(
            <span style={{color:T.textMuted,fontSize:11,fontFamily:"'Space Mono',monospace"}}>
              ↻ {lastUpdate.toLocaleTimeString()}
            </span>
          )}
          {[
            {label:"✉ SEND DIGEST",action:sendDigest,color:T.green},
            {label:"🚀 DEPLOY",action:()=>setShowDeploy(!showDeploy),color:T.yellow},
          ].map(({label,action,color})=>(
            <button key={label} onClick={action} style={{
              background:`${color}15`,border:`1px solid ${color}50`,color,
              borderRadius:7,padding:"7px 15px",fontSize:12,fontWeight:700,letterSpacing:"0.05em",
            }}>{label}</button>
          ))}
          <button onClick={runScrape} disabled={scanning} style={{
            background:T.surface,border:`1px solid ${T.border}`,color:T.textSecondary,
            borderRadius:7,padding:"7px 13px",fontSize:15,fontWeight:700,
          }}>{scanning?"···":"↻"}</button>
        </div>
      </div>

      {events.length>0&&<Ticker events={events}/>}
      {showDeploy&&<DeployGuide onClose={()=>setShowDeploy(false)}/>}

      <div style={{padding:"18px 24px",maxWidth:1140,margin:"0 auto"}}>

        {/* Stats */}
        <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap",animation:"fadeIn .4s ease"}}>
          <StatBox label="Events Today" value={events.length} sub="5 sports covered" color={T.textSecondary}/>
          <StatBox label="High Confidence" value={highConf} sub="≥ 80% consensus" color={T.green}/>
          <StatBox label="High Value" value={highVal} sub="positive edge" color={T.yellow}/>
          <StatBox label="Avg Probability" value={avgP+"%"} sub="best outcome" color={T.blue}/>
          <StatBox label="Books" value="20" sub="aggregated" color={T.purple}/>
          <StatBox label="Factors" value="9" sub="context signals" color={T.pink}/>
        </div>

        <ScrapeStatus scanning={scanning}/>

        {/* Sport filters + sort */}
        <div style={{display:"flex",gap:7,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
          {SPORTS_FILTER.map(s=>{
            const info=sp(s);
            const active=sport===s;
            return(
              <button key={s} onClick={()=>setSport(s)} style={{
                background:active?info.bg:"transparent",
                border:`2px solid ${active?info.border:T.border}`,
                color:active?info.text:T.textMuted,
                borderRadius:8,padding:"7px 16px",
                fontSize:12,fontWeight:700,letterSpacing:"0.05em",
                display:"flex",alignItems:"center",gap:6,
                transition:"all .15s",
              }}>
                {s!=="All"&&<span>{info.icon}</span>}
                {s==="All"?"ALL SPORTS":s.toUpperCase()}
              </button>
            );
          })}
          <div style={{marginLeft:"auto",display:"flex",gap:5,alignItems:"center"}}>
            <span style={{color:T.textMuted,fontSize:11,fontFamily:"'Space Mono',monospace",marginRight:2}}>SORT:</span>
            {SORTS.map(([val,label])=>(
              <button key={val} onClick={()=>setSort(val)} style={{
                background:sort===val?T.surfaceHi:"transparent",
                border:`1px solid ${sort===val?T.borderHi:T.border}`,
                color:sort===val?T.textPrimary:T.textMuted,
                borderRadius:6,padding:"5px 11px",
                fontSize:11,fontWeight:sort===val?700:400,
              }}>{label}</button>
            ))}
          </div>
        </div>

        {/* Events */}
        <div>
          {scanning&&events.length===0&&(
            <div style={{textAlign:"center",padding:"80px 0",color:T.textMuted,
              fontSize:13,letterSpacing:"0.2em",fontFamily:"'Space Mono',monospace"}}>
              SCRAPING 20 SOURCES · COMPUTING PROBABILITIES...
            </div>
          )}
          {filtered.map((ev,i)=>(
            <EventCard key={ev.id} ev={ev} rank={i+1}
              expanded={expanded===ev.id}
              onClick={()=>setExpanded(expanded===ev.id?null:ev.id)}/>
          ))}
        </div>

        {/* Email log */}
        {emailLog.length>0&&(
          <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,
            padding:"14px 18px",marginTop:14}}>
            <div style={{color:T.textMuted,fontSize:11,fontFamily:"'Space Grotesk',sans-serif",
              fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:8}}>
              Email Dispatch Log
            </div>
            {emailLog.map((t,i)=>(
              <div key={i} style={{color:T.textSecondary,fontSize:12,fontFamily:"'Space Grotesk',sans-serif",
                lineHeight:2,display:"flex",alignItems:"center",gap:8}}>
                <span style={{color:T.green}}>✉</span>
                {t} → brianmasakari@gmail.com — Top {Math.min(events.length,20)} picks dispatched
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{borderTop:`1px solid ${T.border}`,marginTop:28,paddingTop:16,
          color:T.textDim,fontSize:11,fontFamily:"'Space Mono',monospace",
          display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
          <span>TABIRI v3.0 — RESEARCH USE ONLY. NOT WAGERING ADVICE.</span>
          <span>9 FACTORS · 20 BOOKS · WEIGHTED DEVIGGED CONSENSUS</span>
        </div>
      </div>

      <EmailToast show={showToast}/>
    </div>
  );
}
