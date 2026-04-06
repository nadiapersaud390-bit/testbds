// FILE: js/script-tab.js
// All JS logic specific to the SCRIPT tab and REBUTTALS tab

// ── SCRIPT DATA ──
const S = {
intro:{phase:'STEP 1 \u2014 INTRODUCTION',color:'var(--green)',next:'verify',content:`
<div id="script-company-name-display" style="font-family:'Bebas Neue',sans-serif;font-size:clamp(1.8rem,5vw,3rem);letter-spacing:5px;color:#ffffff;text-align:center;margin-bottom:16px;filter:drop-shadow(0 2px 14px rgba(255,255,255,0.2));border-radius:10px;transition:filter 0.2s;">Company Name: Lending Resource Center</div>
<div class="phase-tag">📞 Opening</div>
<div class="sline">"Hi, <span class='kw'>–A– [First Name] –B–</span>, how's your day going so far?"</div>
<div class="tip"><strong>⏸️ WAIT.</strong> Let them respond before moving forward.</div>
<div class="sline">"Great. My name is <span class='kw'>–A– [Full Name] –B–</span>, and I'm reaching out regarding a recent <span class='emp'>personal lending notice</span> connected to our network of loan and financial service providers. I just wanted to confirm whether you've had a chance to review the letter we mailed recently."</div>
<div class="tip"><strong>💡 Either answer works</strong> — just move forward: "No problem if you haven't…"</div>
<div class="sline">"That's okay. The notice was regarding a <span class='kw'>fixed-rate personal loan option</span>, currently starting at <span class='emp'>5.49% APR</span> <span class='act'>(five-point-four-nine percent)</span>. The reason for my call today is that this option is only available for a <span class='kw'>limited review window</span>, and I wanted to make sure you didn't miss the opportunity to have it evaluated."</div>
<div class="sline">"The process is very straightforward. I'll quickly confirm a few basic details to determine if you qualify to speak directly with a <span class='kw'>lending specialist</span>. This usually takes just a couple of minutes. If everything checks out, I'll connect you with a specialist who can walk you through <span class='emp'>loan amounts</span>, estimated <span class='emp'>payments</span>, and available terms."</div>
`},
verify:{phase:'STEP 2 \u2014 VERIFICATION',color:'var(--green)',next:'transfer',content:`
<div class="phase-tag" style="background:rgba(52,211,153,0.15);color:var(--green);border-color:#6ee7b7;">✅ Confirming Details</div>
<div class="sline">"Let me start by confirming your name. I have your first name spelled <span class='emp'>J-O-H-N</span> and your last name <span class='emp'>S-M-I-T-H</span>. Is that correct?"</div>
<div class="tip"><strong>✅ "Perfect."</strong> — say this after they confirm.</div>
<div class="sline">"And the best phone number we have for you is <span class='kw'>(123) 456-7890</span>, right?"</div>
<div class="sline">"Great. What's the best <span class='kw'>email address</span> for you?"</div>
<div class="sline">"Next, can you confirm your current <span class='kw'>home address</span> for me?"</div>
<div class="tip"><strong>🔄 Every 2 questions say:</strong> "Perfect, thank you." / "Got it, that helps."</div>
<div class="sline">"Before I bring the specialist on the line, I just need to complete a quick <span class='kw'>pre-qualification review</span>. This includes a <span class='emp'>soft credit check</span> that will <strong>not affect your credit score</strong>. To move forward, I'll just need to verify your <span class='kw'>date of birth</span>."</div>
<div class="tip"><strong>⚠️ Then casually:</strong> "Okay, and your social security number." — say it matter-of-fact. Then <strong>WAIT.</strong></div>
<div class="sline"><span class='act'>(Submit and check partner eligibility status)</span></div>
<div class="sline">"Thank you for your patience. I'm submitting this now to check eligibility within our <span class='kw'>lending partner network</span>. It should only take a moment."</div>
`},
transfer:{phase:'STEP 3 \u2014 WARM TRANSFER',color:'var(--accent)',next:null,content:`
<div class="phase-tag">🔄 Handing Off</div>
<div class="tip" style="margin-bottom:14px;"><strong>🧘 SLOW DOWN.</strong> Sound relaxed — you're connecting them to a specialist, not passing a problem.</div>
<div style="border:1px solid var(--green);border-radius:12px;padding:18px;background:var(--green-light);margin-bottom:14px;">
  <div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;color:var(--green);margin-bottom:10px;text-transform:uppercase;">📋 Loan CR Agent — Warm Transfer Script</div>
  <div class="sline">"Hi <span class='kw'>[Loan Specialist Name]</span>, I have <span class='kw'>[Client Name]</span> on the line with reference number <span class='emp'>[Logixx file number]</span>. I've completed the initial review and confirmed they meet the <span class='kw'>preliminary criteria</span>. Can you take it from here and review the available <span class='emp'>lending options</span> with them?"</div>
</div>
<div style="border:1px solid var(--accent);border-radius:12px;padding:16px;background:rgba(96,165,250,0.08);margin-bottom:14px;">
  <div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;color:var(--accent);margin-bottom:10px;text-transform:uppercase;">🎙️ Loan Specialist — Will Say</div>
  <div class="sline">"Hi, this is <span class='kw'>John</span>, agent ID <span class='emp'>1234</span> with <span class='kw'>Lendvia</span>. This call may be recorded."</div>
</div>
<div class="tip" style="background:var(--green-light);border-color:var(--green);color:#6ee7b7;margin-top:8px;"><strong style="color:var(--green);">✅ YOUR JOB IS DONE.</strong> Confirm handoff, then exit professionally.</div>
`},
dnc:{phase:'EXIT \u2014 DO NOT CALL',color:'var(--red)',next:null,content:`
<div class="phase-tag" style="background:var(--red-light);color:var(--red);border-color:#fca5a5;">📵 "Put me on your Do Not Call list"</div>
<div style="background:var(--red-light);border:1px solid var(--red);border-radius:12px;padding:18px;margin-bottom:14px;">
  <div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;color:var(--red);margin-bottom:8px;text-transform:uppercase;">⚠️ EXIT SCRIPT</div>
  <div class="sline" style="color:var(--text);">"I apologize for the call. I'll put you on our <span class='kw'>internal Do Not Call list</span> right now — you won't be called again. Have a great day."</div>
  <div style="margin-top:10px;font-size:0.72rem;color:var(--muted);"><strong style="color:var(--gold);">⚠️ NOTE:</strong> Do not argue. Apologize, confirm DNC, end call. Move on immediately.</div>
</div>
<div style="display:flex;gap:10px;">
  <button class="btn btn-d btn-f" onclick="location.reload()">LOG DNC — END CALL</button>
  <button class="btn btn-f" onclick="loadScript('intro')">RESET</button>
</div>
`}};

// ── LOAD SCRIPT STEP ──
function loadScript(key){
  const s=S[key];if(!s)return;
  document.querySelectorAll('#page-script .sub-tab').forEach(el=>el.classList.toggle('active',el.id==='stab-'+key));
  const d=document.getElementById('sdisplay');
  const nb=document.getElementById('nav-btns');
  if(!d||!nb)return;
  d.innerHTML=`<div style="font-family:'Barlow Condensed',sans-serif;font-size:0.65rem;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:${s.color};margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid var(--border);">${s.phase}</div>${s.content}`;
  d.scrollTop=0;nb.innerHTML='';
  if(s.next){const b=document.createElement('button');b.className='btn btn-p btn-f';b.innerText='\u2192 NEXT STEP';b.onclick=()=>loadScript(s.next);nb.appendChild(b);}
  const r=document.createElement('button');r.className='btn';r.innerText='\u21BA RESET';r.onclick=()=>loadScript('intro');nb.appendChild(r);
  // Re-apply company name after content render
  if(typeof loadCompanyName === 'function') loadCompanyName();
}

window.S          = S;
window.loadScript = loadScript;
