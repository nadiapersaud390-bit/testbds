/* ── Rebuttal Insights Tab ──
   Analytics, fraud detection, coaching signals, search.
*/

function riSetView(view){
  riCurrentView = view;
  ['reps','rebuttals','signals'].forEach(v=>{
    const btn = document.getElementById('ri-view-'+v);
    if(!btn) return;
    if(v===view){
      btn.style.borderColor='var(--accent)';btn.style.background='#0b1a38';btn.style.color='var(--accent)';
    } else {
      btn.style.borderColor='var(--border)';btn.style.background='transparent';btn.style.color='var(--muted)';
    }
  });
  riRender();
}

async function loadRebuttalIntel(){
  const content = document.getElementById('ri-content');
  if(!content) return;
  content.innerHTML='<div style="text-align:center;color:var(--muted);padding:40px;font-size:0.85rem;">⏳ Loading rebuttal data...</div>';

  const teamFilter = document.getElementById('ri-team-filter')?.value || 'all';
  const dateRange  = document.getElementById('ri-date-range')?.value || 'today';

  try {
    let query = db.collection('rebuttal_clicks');
    if(dateRange === 'today'){
      const today = getTodayGY();
      query = query.where('date','==',today);
    } else if(dateRange !== 'all'){
      const days = parseInt(dateRange);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate()-days);
      const cutoffStr = cutoff.toISOString().split('T')[0];
      query = query.where('date','>=',cutoffStr);
    }
    const snap = await query.get();
    riAllData = [];
    snap.forEach(doc=>{ riAllData.push(doc.data()); });

    // Filter by team
    if(teamFilter !== 'all'){
      riAllData = riAllData.filter(d=>d.team===teamFilter);
    }

    riRenderSummary();
    riRender();
  } catch(e){
    content.innerHTML='<div style="color:var(--red);padding:20px;font-size:0.82rem;">Error loading data: '+e.message+'</div>';
  }
}

function riRenderSummary(){
  const banner = document.getElementById('ri-summary-banner');
  if(!banner) return;

  // Aggregate totals
  const repMap = {};
  riAllData.forEach(d=>{
    const repKey = d.id||d.name;
    if(!repMap[repKey]) repMap[repKey]={name:d.name,id:d.id,team:d.team,totalClicks:0,uniqueRebuttals:new Set()};
    Object.entries(d.clicks||{}).forEach(([k,v])=>{
      repMap[repKey].totalClicks+=v;
      repMap[repKey].uniqueRebuttals.add(k);
    });
  });

  const reps = Object.values(repMap);
  const totalReps = reps.length;
  const totalClicks = reps.reduce((s,r)=>s+r.totalClicks,0);
  const avgClicks = totalReps > 0 ? Math.round(totalClicks/totalReps) : 0;
  const neverOpened = reps.filter(r=>r.totalClicks===0).length;
  const criticalMissing = reps.filter(r=>CRITICAL_REBUTTALS.some(c=>!r.uniqueRebuttals.has(c))).length;

  banner.innerHTML = [
    {label:'REPS TRACKED', val:totalReps, color:'var(--accent)'},
    {label:'TOTAL OPENS', val:totalClicks, color:'var(--green)'},
    {label:'AVG PER REP', val:avgClicks, color:'var(--gold)'},
    {label:'MISSING CRITICAL', val:criticalMissing, color:'var(--red)'},
  ].map(s=>`
    <div style="background:#0a1020;border:1px solid var(--border);border-radius:10px;padding:12px 16px;text-align:center;">
      <div style="font-size:0.5rem;font-weight:800;letter-spacing:2px;color:var(--muted);text-transform:uppercase;margin-bottom:4px;">${s.label}</div>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:${s.color};line-height:1;">${s.val}</div>
    </div>`).join('');
}

function riRender(){
  if(riCurrentView==='reps') riRenderByRep();
  else if(riCurrentView==='rebuttals') riRenderByRebuttal();
  else riRenderSignals();
}

function riRenderByRep(){
  const content = document.getElementById('ri-content');
  if(!content) return;
  if(!riAllData.length){ content.innerHTML='<div style="color:var(--muted);padding:30px;text-align:center;font-size:0.82rem;">No data for selected filters.</div>'; return; }

  // Aggregate by rep
  const repMap = {};
  riAllData.forEach(d=>{
    const repKey = d.id||d.name;
    if(!repMap[repKey]) repMap[repKey]={name:d.name,id:d.id,team:d.team,clicks:{}};
    Object.entries(d.clicks||{}).forEach(([k,v])=>{
      repMap[repKey].clicks[k]=(repMap[repKey].clicks[k]||0)+v;
    });
  });

  const allKeys = Object.keys(REBUTTAL_LABELS);
  const reps = Object.values(repMap).sort((a,b)=>{
    const ta=Object.values(a.clicks).reduce((s,v)=>s+v,0);
    const tb=Object.values(b.clicks).reduce((s,v)=>s+v,0);
    return tb-ta;
  });

  let html = '';
  reps.forEach(rep=>{
    const total = Object.values(rep.clicks).reduce((s,v)=>s+v,0);
    const used = Object.keys(rep.clicks).length;
    const neverUsed = allKeys.filter(k=>!rep.clicks[k]);
    const critMissing = CRITICAL_REBUTTALS.filter(k=>!rep.clicks[k]);
    const topEntries = Object.entries(rep.clicks).sort((a,b)=>b[1]-a[1]).slice(0,5);

    const engagementPct = Math.round((used/allKeys.length)*100);
    const engColor = engagementPct>=60?'var(--green)':engagementPct>=30?'var(--gold)':'var(--red)';

    html += `<div style="background:#090f1e;border:1px solid ${critMissing.length>0?'rgba(248,113,113,0.3)':'var(--border)'};border-radius:12px;padding:16px;margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <div>
          <div style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:1.1rem;color:var(--text);">${rep.name}</div>
          <div style="font-size:0.62rem;color:var(--muted);margin-top:2px;">${rep.team||''} · ID ${rep.id||''}</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <span style="background:#0d1a2e;border:1px solid #2a3a5a;border-radius:6px;padding:4px 10px;font-size:0.7rem;font-weight:700;color:var(--accent);">📖 ${total} opens</span>
          <span style="background:#0d1a2e;border:1px solid #2a3a5a;border-radius:6px;padding:4px 10px;font-size:0.7rem;font-weight:700;color:${engColor};">🎯 ${engagementPct}% coverage</span>
          ${critMissing.length>0?`<span style="background:var(--red-light);border:1px solid var(--red);border-radius:6px;padding:4px 10px;font-size:0.7rem;font-weight:700;color:var(--red);">⚠️ ${critMissing.length} critical missing</span>`:'<span style="background:var(--green-light);border:1px solid var(--green);border-radius:6px;padding:4px 10px;font-size:0.7rem;font-weight:700;color:var(--green);">✅ All critical covered</span>'}
        </div>
      </div>

      ${topEntries.length>0?`
      <div style="margin-bottom:10px;">
        <div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;color:var(--gold);text-transform:uppercase;margin-bottom:6px;">🔥 MOST USED</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;">
          ${topEntries.map(([k,v])=>`<span style="background:#111c30;border:1px solid #2a3a5a;border-radius:6px;padding:3px 8px;font-size:0.68rem;color:var(--text);">${REBUTTAL_LABELS[k]||k} <strong style="color:var(--gold);">×${v}</strong></span>`).join('')}
        </div>
      </div>`:''}

      ${critMissing.length>0?`
      <div style="margin-bottom:8px;">
        <div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;color:var(--red);text-transform:uppercase;margin-bottom:6px;">🚨 CRITICAL — NEVER OPENED</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;">
          ${critMissing.map(k=>`<span style="background:var(--red-light);border:1px solid rgba(248,113,113,0.4);border-radius:6px;padding:3px 8px;font-size:0.68rem;color:var(--red);">${REBUTTAL_LABELS[k]||k}</span>`).join('')}
        </div>
      </div>`:''}

      ${neverUsed.length>0?`
      <div>
        <div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;color:var(--muted);text-transform:uppercase;margin-bottom:6px;">💤 NEVER TOUCHED (${neverUsed.length})</div>
        <div style="display:flex;flex-wrap:wrap;gap:4px;">
          ${neverUsed.map(k=>`<span style="background:#0a1020;border:1px solid #1a2540;border-radius:6px;padding:2px 7px;font-size:0.63rem;color:var(--muted);">${REBUTTAL_LABELS[k]||k}</span>`).join('')}
        </div>
      </div>`:''}
    </div>`;
  });

  content.innerHTML = html || '<div style="color:var(--muted);padding:30px;text-align:center;">No rep data found.</div>';
}

function riRenderByRebuttal(){
  const content = document.getElementById('ri-content');
  if(!content) return;
  if(!riAllData.length){ content.innerHTML='<div style="color:var(--muted);padding:30px;text-align:center;font-size:0.82rem;">No data for selected filters.</div>'; return; }

  // Aggregate totals per rebuttal key across all reps
  const keyTotals = {};
  const keyReps = {};
  const allKeys = Object.keys(REBUTTAL_LABELS);

  // Build rep map first
  const repMap = {};
  riAllData.forEach(d=>{
    const repKey = d.id||d.name;
    if(!repMap[repKey]) repMap[repKey]={name:d.name,clicks:{}};
    Object.entries(d.clicks||{}).forEach(([k,v])=>{
      repMap[repKey].clicks[k]=(repMap[repKey].clicks[k]||0)+v;
    });
  });

  const repCount = Object.keys(repMap).length;

  allKeys.forEach(k=>{
    keyTotals[k]=0; keyReps[k]=[];
    Object.values(repMap).forEach(rep=>{
      if(rep.clicks[k]){ keyTotals[k]+=rep.clicks[k]; keyReps[k].push({name:rep.name,count:rep.clicks[k]}); }
    });
  });

  const sorted = allKeys.sort((a,b)=>keyTotals[b]-keyTotals[a]);
  const maxVal = Math.max(...sorted.map(k=>keyTotals[k]),1);

  let html = '<div style="display:flex;flex-direction:column;gap:8px;">';
  sorted.forEach(k=>{
    const total=keyTotals[k];
    const usedByReps=keyReps[k].length;
    const pct=Math.round((usedByReps/repCount)*100)||0;
    const barW=Math.round((total/maxVal)*100);
    const isCritical=CRITICAL_REBUTTALS.includes(k);
    const barColor=total===0?'#1a2540':pct<30?'#7f1d1d':pct<60?'#713f12':'#064e3b';
    const textColor=total===0?'var(--muted)':pct<30?'var(--red)':pct<60?'var(--gold)':'var(--green)';

    html+=`<div style="background:#090f1e;border:1px solid ${isCritical&&total===0?'rgba(248,113,113,0.4)':'var(--border)'};border-radius:10px;padding:12px 14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <div style="font-size:0.82rem;font-weight:700;color:var(--text);">${isCritical?'⭐ ':''} ${REBUTTAL_LABELS[k]||k}</div>
        <div style="display:flex;gap:6px;align-items:center;">
          <span style="font-size:0.68rem;color:var(--muted);">${usedByReps}/${repCount} reps</span>
          <span style="font-family:'Bebas Neue',sans-serif;font-size:1.1rem;color:${textColor};">${total}</span>
        </div>
      </div>
      <div style="background:#0a1020;border-radius:4px;height:6px;overflow:hidden;margin-bottom:6px;">
        <div style="width:${barW}%;height:100%;background:${textColor};border-radius:4px;transition:width 0.4s;"></div>
      </div>
      ${keyReps[k].length>0?`<div style="display:flex;flex-wrap:wrap;gap:4px;">${keyReps[k].sort((a,b)=>b.count-a.count).slice(0,6).map(r=>`<span style="font-size:0.62rem;background:#111c30;border-radius:5px;padding:2px 7px;color:var(--muted);">${r.name} <strong style="color:var(--text);">×${r.count}</strong></span>`).join('')}</div>`:`<div style="font-size:0.65rem;color:var(--red);">Nobody has opened this rebuttal</div>`}
    </div>`;
  });
  html+='</div>';
  content.innerHTML=html;
}

// ══════════════════════════════════════════════
//  REBUTTAL FRAUD DETECTION
//  Analyzes the events[] timestamp array to find
//  suspicious clicking patterns
// ══════════════════════════════════════════════
function analyzeRebuttalFraud(events){
  if(!events || events.length < 3) return [];
  const flags = [];

  // Sort events by timestamp
  const sorted = [...events].sort((a,b)=>a.ts-b.ts);

  // ── RULE 1: Rapid burst — 4+ different rebuttals clicked within 15 seconds ──
  // On a live call you physically can't be on 4 different objections in 15s
  for(let i=0; i<sorted.length; i++){
    const window15 = sorted.filter(e=>e.ts>=sorted[i].ts && e.ts<=sorted[i].ts+15000);
    const uniqueKeys = new Set(window15.map(e=>e.key));
    if(uniqueKeys.size>=4){
      const keys = [...uniqueKeys].slice(0,5).map(k=>REBUTTAL_LABELS[k]||k).join(', ');
      flags.push({
        level:'critical',
        icon:'🤖',
        title:'Rapid Browse — '+uniqueKeys.size+' rebuttals in 15 seconds',
        detail:`Clicked: ${keys}${uniqueKeys.size>5?' + more':''} — looks like browsing, not live use`
      });
      break; // one flag per burst window is enough
    }
  }

  // ── RULE 2: Same rebuttal clicked 3+ times within 30 seconds ──
  // Genuine use means they read it once and apply it — clicking the same one
  // 3 times in a row quickly suggests they're not actually on a call
  const keyGroups = {};
  sorted.forEach(e=>{ if(!keyGroups[e.key]) keyGroups[e.key]=[]; keyGroups[e.key].push(e.ts); });
  for(const [key, timestamps] of Object.entries(keyGroups)){
    for(let i=0; i<=timestamps.length-3; i++){
      if(timestamps[i+2]-timestamps[i] <= 30000){
        flags.push({
          level:'suspicious',
          icon:'👆',
          title:'Rapid repeats — "'+( REBUTTAL_LABELS[key]||key)+'" clicked 3x in 30 seconds',
          detail:'Clicking the same rebuttal repeatedly in quick succession — not consistent with live call use'
        });
        break;
      }
    }
  }

  // ── RULE 3: Mass session — 10+ clicks within any 2-minute window ──
  // Even the busiest rep can't get 10 objections in 2 minutes on one call
  for(let i=0; i<sorted.length; i++){
    const window2m = sorted.filter(e=>e.ts>=sorted[i].ts && e.ts<=sorted[i].ts+120000);
    if(window2m.length>=10){
      flags.push({
        level:'suspicious',
        icon:'⚡',
        title:window2m.length+' clicks in a 2-minute window',
        detail:'Very high activity burst — could indicate browsing the tool during downtime rather than on live calls'
      });
      break;
    }
  }

  // ── RULE 4: Click velocity — avg time between clicks < 8 seconds over 10+ clicks ──
  if(sorted.length>=10){
    const gaps = [];
    for(let i=1; i<sorted.length; i++) gaps.push(sorted[i].ts - sorted[i-1].ts);
    const avgGap = gaps.reduce((s,v)=>s+v,0)/gaps.length;
    if(avgGap < 8000){
      flags.push({
        level:'suspicious',
        icon:'⏱',
        title:'Average '+Math.round(avgGap/1000)+'s between clicks',
        detail:'Very fast average click pace across the day — real calls need time between objections to actually work through them'
      });
    }
  }

  // ── RULE 5: All clicks within first/last 5 minutes of shift — padding stats ──
  if(sorted.length>=8){
    const span = sorted[sorted.length-1].ts - sorted[0].ts;
    if(span < 5*60*1000){
      flags.push({
        level:'critical',
        icon:'🎯',
        title:sorted.length+' clicks all within a '+Math.round(span/60000)+'-minute window',
        detail:'All rebuttal activity happened in one concentrated burst — looks like padding the count at start or end of shift'
      });
    }
  }

  return flags;
}

function fraudLevelColor(level){
  if(level==='critical') return {bg:'rgba(239,68,68,0.12)',border:'rgba(239,68,68,0.5)',text:'#ef4444'};
  return {bg:'rgba(251,191,36,0.1)',border:'rgba(251,191,36,0.35)',text:'var(--gold)'};
}

function riRenderSignals(){
  const content = document.getElementById('ri-content');
  if(!content) return;
  if(!riAllData.length){ content.innerHTML='<div style="color:var(--muted);padding:30px;text-align:center;font-size:0.82rem;">No data for selected filters.</div>'; return; }

  const repMap = {};
  riAllData.forEach(d=>{
    const repKey = d.id||d.name;
    if(!repMap[repKey]) repMap[repKey]={name:d.name,id:d.id,team:d.team,clicks:{},events:[]};
    Object.entries(d.clicks||{}).forEach(([k,v])=>{
      repMap[repKey].clicks[k]=(repMap[repKey].clicks[k]||0)+v;
    });
    // Merge events from all docs for this rep
    if(d.events && Array.isArray(d.events)){
      repMap[repKey].events.push(...d.events);
    }
  });

  const allKeys = Object.keys(REBUTTAL_LABELS);
  const signals = [];
  const fraudSignals = []; // separate bucket — always shown first

  Object.values(repMap).forEach(rep=>{
    const total=Object.values(rep.clicks).reduce((s,v)=>s+v,0);
    const used=Object.keys(rep.clicks).filter(k=>rep.clicks[k]>0).length;

    // ── FRAUD DETECTION ──
    const fraudFlags = analyzeRebuttalFraud(rep.events);
    fraudFlags.forEach(flag=>{
      fraudSignals.push({
        rep:rep.name, team:rep.team,
        level:flag.level, icon:flag.icon,
        title:flag.title, detail:flag.detail
      });
    });

    // Signal: never opened SSN rebuttal
    if(!rep.clicks['no_ssn'] && !rep.clicks['ssn_concerns']){
      signals.push({type:'danger',rep:rep.name,team:rep.team,msg:'Never opens SSN rebuttal — may be losing leads at SSN ask',icon:'🚨'});
    }
    // Signal: opens Not Interested excessively
    if((rep.clicks['not_interested']||0)>=15){
      signals.push({type:'warning',rep:rep.name,team:rep.team,msg:`Opens "Not Interested" ${rep.clicks['not_interested']} times — prospect might be hanging up frequently`,icon:'🔥'});
    }
    // Signal: never uses confidence technique
    if(!rep.clicks['confidence_mindset']){
      signals.push({type:'info',rep:rep.name,team:rep.team,msg:'Never opened Confidence Technique — may be projecting uncertainty on calls',icon:'💡'});
    }
    // Signal: very low rebuttal usage overall
    if(total<=2 && total>0){
      signals.push({type:'warning',rep:rep.name,team:rep.team,msg:`Only ${total} total rebuttal opens — likely not using rebuttals on live calls`,icon:'⚠️'});
    }
    if(total===0){
      signals.push({type:'danger',rep:rep.name,team:rep.team,msg:'Zero rebuttal opens today — not using the tool at all',icon:'🚫'});
    }
    // Signal: good engagement
    if(total>=20 && used>=8){
      signals.push({type:'good',rep:rep.name,team:rep.team,msg:`High engagement — ${total} opens across ${used} rebuttals. Strong coaching sign.`,icon:'⭐'});
    }
    // Signal: wants_to_hangup many times
    if((rep.clicks['wants_to_hangup']||0)>=8){
      signals.push({type:'warning',rep:rep.name,team:rep.team,msg:`Opens "Taking Over Technique" ${rep.clicks['wants_to_hangup']} times — prospects frequently trying to end calls`,icon:'📞'});
    }
    // Signal: no pitch boost
    if(!rep.clicks['pitch_benefit'] && !rep.clicks['pitch_urgency'] && !rep.clicks['pitch_softpull']){
      signals.push({type:'info',rep:rep.name,team:rep.team,msg:'Never opened any Pitch Boost rebuttals — may not be enhancing the pitch',icon:'💬'});
    }
  });

  if(!signals.length && !fraudSignals.length){
    content.innerHTML='<div style="color:var(--green);padding:30px;text-align:center;font-size:0.85rem;">✅ No signals detected for current filters.</div>';
    return;
  }

  const colorMap={danger:{bg:'var(--red-light)',border:'rgba(248,113,113,0.4)',text:'var(--red)'},warning:{bg:'var(--gold-light)',border:'rgba(251,191,36,0.3)',text:'var(--gold)'},info:{bg:'var(--purple-light)',border:'rgba(167,139,250,0.3)',text:'var(--purple)'},good:{bg:'var(--green-light)',border:'rgba(52,211,153,0.3)',text:'var(--green)'}};

  let html='';

  // ── FRAUD FLAGS — always first, most prominent ──
  if(fraudSignals.length){
    html+=`<div style="background:rgba(239,68,68,0.06);border:2px solid rgba(239,68,68,0.4);border-radius:12px;padding:14px;margin-bottom:18px;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
        <span style="font-size:1.3rem;">🕵️</span>
        <div>
          <div style="font-size:0.62rem;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:#ef4444;">SUSPICIOUS ACTIVITY DETECTED</div>
          <div style="font-size:0.68rem;color:var(--muted);margin-top:1px;">Clicking patterns that don't match genuine live-call usage</div>
        </div>
        <span style="margin-left:auto;background:rgba(239,68,68,0.2);border:1px solid rgba(239,68,68,0.5);border-radius:20px;padding:3px 10px;font-family:'Bebas Neue',sans-serif;font-size:1rem;color:#ef4444;">${fraudSignals.length} FLAG${fraudSignals.length!==1?'S':''}</span>
      </div>
      ${fraudSignals.map(f=>{
        const c=fraudLevelColor(f.level);
        return`<div style="background:${c.bg};border:1px solid ${c.border};border-radius:9px;padding:10px 12px;margin-bottom:6px;display:flex;gap:10px;align-items:flex-start;">
          <span style="font-size:1.1rem;flex-shrink:0;">${f.icon}</span>
          <div style="flex:1;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;flex-wrap:wrap;">
              <div style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:0.92rem;color:${c.text};">${f.rep} <span style="font-size:0.65rem;color:var(--muted);font-weight:600;">${f.team||''}</span></div>
              <span style="font-size:0.6rem;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:${c.text};background:${c.bg};border:1px solid ${c.border};border-radius:4px;padding:2px 6px;white-space:nowrap;">${f.level.toUpperCase()}</span>
            </div>
            <div style="font-size:0.8rem;font-weight:700;color:var(--text);margin-top:3px;">${f.title}</div>
            <div style="font-size:0.72rem;color:var(--muted);margin-top:2px;">${f.detail}</div>
          </div>
        </div>`;
      }).join('')}
    </div>`;
  }

  const grouped={danger:[],warning:[],info:[],good:[]};
  signals.forEach(s=>grouped[s.type].push(s));

  const order=['danger','warning','info','good'];
  const headings={danger:'🚨 CRITICAL COACHING SIGNALS',warning:'⚠️ WARNING SIGNALS',info:'💡 IMPROVEMENT OPPORTUNITIES',good:'⭐ POSITIVE SIGNALS'};
  order.forEach(type=>{
    if(!grouped[type].length) return;
    const c=colorMap[type];
    html+=`<div style="margin-bottom:14px;">
      <div style="font-size:0.58rem;font-weight:800;letter-spacing:2.5px;color:${c.text};text-transform:uppercase;margin-bottom:8px;">${headings[type]}</div>
      ${grouped[type].map(s=>`
        <div style="background:${c.bg};border:1px solid ${c.border};border-radius:10px;padding:12px 14px;margin-bottom:6px;display:flex;gap:10px;align-items:flex-start;">
          <div style="font-size:1.2rem;flex-shrink:0;">${s.icon}</div>
          <div>
            <div style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:0.95rem;color:${c.text};">${s.rep} <span style="font-size:0.7rem;color:var(--muted);font-weight:600;">${s.team||''}</span></div>
            <div style="font-size:0.77rem;color:var(--text);margin-top:2px;">${s.msg}</div>
          </div>
        </div>`).join('')}
    </div>`;
  });

  content.innerHTML=html;
}

function searchRebuttals(val){
  const resultsEl=document.getElementById('search-results');
  if(!val||val.trim().length<2){resultsEl.style.display='none';return;}
  const q=val.toLowerCase();
  const keywords={
    'not interested':['not interested','dont want','not looking','no thanks','i pass','not right now','no interest'],
    'no_info':['why do you have','how do you have','where did you get','no info','dont have my info','shouldnt have'],
    'bad_credit':['bad credit','low credit','poor credit','credit score','my credit','credit is bad','credit sucks'],
    'rate_question':['interest rate','what rate','how much interest','apr','percent','rate is','rates'],
    'how_info':['how did you get','where did you get my','who gave you','how do you know','privacy','my information'],
    'no_loan':['dont need a loan','dont need money','not looking for a loan','dont want a loan','no loan'],
    'website':['website','web site','give me your site','where is your site','your url','located','where are you','address','location'],
    'spouse':['ask my husband','ask my wife','ask my spouse','ask my partner','check with my','run it by my'],
    'no_ssn':['social security','ssn','social number','my social','wont give my','not giving my ssn','dont want to give'],
    'company_name':['what company','what business','who are you','which company','company name','name of the company','who is this'],
    'who_are_we':['who are you','where are you located','where are you from','what company is this','who is calling','nationwide','which location','your location','what state are you in'],
    'diff_numbers':['different numbers','calling from different','phone number','why different number','same number','your number'],
    'lower_rate':['lower rate','my bank','bank rate','better rate','fixed rate','collateral'],
    'voicemail_approved':['voicemail','already approved','said i was approved','pre approved message','got a voicemail'],
    'dnc_file':['dnc','do not call','enrolled','bad lead','cancellation','potential cancellation'],
    'llc_question':['llc','llp','limited liability','type of company','registered'],
    'debt_consolidation':['debt consolidation','consolidate','consolidation','pay off debt','combine debt'],
    'soft_pull':['soft pull','soft credit','affect my credit','hurt my credit','credit check','hard pull','hard inquiry'],
    'private_lender':['what bank','which bank','broker','just connecting','private lender','lender name','bank name'],
    'confidence_mindset':['confidence','mindset','believe in','unsure','feel confident','projecting','tone','uncertain','insecure about'],
    'wants_to_hangup':['hang up','want to hang','going to hang','about to hang','dont want to talk','taking over','let me go','hanging up'],
    'follow_up_pivot':['pivot','follow up','need your social','next step','how to ask','move forward','back to script'],
    'ssn_concerns':['concerns about social','providing ssn','why social','lender match','why do you need','extended ssn','full ssn explanation'],
    'pitch_benefit':['benefit pitch','sales pitch','pitch boost','how to pitch','what to say','value pitch','empathy pitch'],
    'pitch_urgency':['urgency','no commitment','zero obligation','free consultation','window shopping','nothing to lose','qualify for'],
    'pitch_softpull':['soft pull pitch','no website pitch','data privacy','bank level','privacy pitch','encryption pitch']
  };
  const matches=[];
  for(const[key,phrases]of Object.entries(keywords)){
    if(phrases.some(p=>p.includes(q)||q.includes(p.split(' ')[0]))){
      const o=OBJ[key];if(o)matches.push({key,label:o.phase.replace('REBUTTAL \u2014 ','')});
    }
  }
  if(matches.length===0){
    resultsEl.style.display='block';
    resultsEl.innerHTML='<div style="padding:10px 14px;font-size:0.8rem;color:var(--muted);">No match found — try different words or pick from the list below.</div>';
  }else{
    resultsEl.style.display='block';
    resultsEl.innerHTML='<div style="padding:6px 10px 3px;font-size:0.55rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--gold);">POSSIBLE REBUTTALS:</div>'+
    matches.map(m=>`<div onclick="loadObjection('${m.key}');document.getElementById('rebuttal-search').value='';document.getElementById('search-results').style.display='none';" style="padding:10px 14px;font-size:0.88rem;color:var(--text);cursor:pointer;border-top:1px solid var(--border);font-weight:600;transition:background 0.1s;" onmouseover="this.style.background='#141e34'" onmouseout="this.style.background=''">${m.label}</div>`).join('');
  }
}
</script>
