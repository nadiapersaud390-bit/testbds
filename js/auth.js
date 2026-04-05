const S={
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

const OBJ={
not_interested:{phase:"REBUTTAL \u2014 I'M NOT INTERESTED / DON'T WANT / DON'T NEED A LOAN",color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F6AB} "I'm not interested" / "I don't want a loan" / "I don't need a loan"</div><div class="rb"><div class="rblabel">RESPONSE 1</div><div class="rbtext">Are you sure? We have a promotional interest rate starting at <span class='emp'>5.49% APR</span> and personal loans don't require collateral. <span class='kw'>How much are you looking to borrow?</span></div></div><div class="rb"><div class="rblabel">RESPONSE 2</div><div class="rbtext">Before I go ahead and put you on the DNC list, would you like to hear about our <span class='emp'>5.49% APR promotion?</span></div></div>`},
no_info:{phase:'REBUTTAL \u2014 "WHY NO INFO?"',color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u2753 "Why don't you have my information?"</div><div class="rb"><div class="rblabel">RESPONSE</div><div class="rbtext">"Great question. We pull from <span class='kw'>multiple sources</span> but need to <span class='emp'>confirm everything directly with you</span> for accuracy. This is also a <span class='kw'>limited-time offer</span> \u2014 I don't want you to miss the best terms."</div><div class="pivot">\u2192 Immediately: "So let me start by confirming your name\u2026"</div></div><div class="tip"><strong>\u{1F3AF} TONE:</strong> Matter-of-fact \u2014 not defensive. You're explaining a process, not justifying yourself.</div>`},
bad_credit:{phase:'REBUTTAL \u2014 BAD CREDIT',color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F4C9} "My credit score is really bad"</div><div class="rb"><div class="rblabel">OPTION 1 \u2014 Reassure</div><div class="rbtext">"Thank you for sharing that \u2014 it doesn't have to be a barrier. <span class='emp'>You may still qualify.</span> We look at more than just your score \u2014 the goal is to find something that <span class='kw'>fits your situation</span>."</div><div class="pivot">\u2192 "Let me submit your details \u2014 our system will tell us exactly what you qualify for."</div></div><div class="rb"><div class="rblabel">OPTION 2 \u2014 Quick &amp; Direct</div><div class="rbtext">"More common than you'd think \u2014 our network works with <span class='kw'>all credit profiles</span>. We check first, then show options. <span class='emp'>No commitment.</span>"</div><div class="pivot">\u2192 "Let's run it \u2014 can I confirm your date of birth?"</div></div>`},
rate_question:{phase:'REBUTTAL \u2014 INTEREST RATE?',color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F4B0} "What's the interest rate?"</div><div class="rb"><div class="rblabel">OPTION 1 \u2014 Full Answer</div><div class="rbtext">"We work with <span class='kw'>25+ lenders</span> \u2014 SoFi, Avant, Upstart, OneMain \u2014 rates as low as <span class='emp'>5.49% APR</span>. To get your <span class='kw'>exact rate</span>, I need a bit more info. That's what this process does."</div><div class="pivot">\u2192 "Let me confirm your details and connect you with a specialist for exact numbers."</div></div><div class="rb"><div class="rblabel">OPTION 2 \u2014 Quick Deflect</div><div class="rbtext">"The specialist covers all exact figures once you're <span class='kw'>pre-qualified</span>."</div><div class="pivot">\u2192 "Speaking of which \u2014 can I confirm your DOB?"</div></div><div class="tip"><strong>\u26A0\uFE0F Don't get stuck on rates.</strong> That's the specialist's job. Your job: confirm, qualify, transfer.</div>`},
how_info:{phase:'REBUTTAL \u2014 HOW DID YOU GET MY INFORMATION?',color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F50D} "How did you get my information?"</div><div class="rb"><div class="rblabel">RESPONSE</div><div class="rbtext">As a <span class='kw'>licensed lender</span> we have access to credit data to identify individuals who may qualify and benefit from our services.</div></div>`},
no_loan:{phase:"REBUTTAL \u2014 I DON'T NEED / DON'T WANT A LOAN",color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F6AB} "I don't want a loan" / "I don't need a loan"</div><div class="rb"><div class="rblabel">RESPONSE 1</div><div class="rbtext">Are you sure? We have a promotional interest rate starting at <span class='emp'>5.49% APR</span> and personal loans don't require collateral. <span class='kw'>How much are you looking to borrow?</span></div></div><div class="rb"><div class="rblabel">RESPONSE 2</div><div class="rbtext">Before I go ahead and put you on the DNC list, would you like to hear about our <span class='emp'>5.49% APR promotion?</span></div></div>`},
website:{phase:'REBUTTAL \u2014 WHAT IS YOUR WEBSITE?',color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F310} "What is your website?" / "Why can't you give your website?"</div><div class="rb"><div class="rblabel">RESPONSE</div><div class="rbtext">For <span class='kw'>security and compliance reasons</span>, the website and the full office address are shared once your eligibility is verified and you are connected with a loan specialist. Since we work with more than <span class='emp'>25 financial partners</span>, we first need to determine which one is the best fit before connecting you.</div></div>`},
spouse:{phase:'REBUTTAL \u2014 NEED TO ASK SPOUSE',color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F46B} "I need to ask my husband/wife first"</div><div class="rb"><div class="rblabel">RESPONSE</div><div class="rbtext">"Of course \u2014 and we wouldn't expect you to decide without them. We're just getting you <span class='kw'>pre-qualified</span> so you and your spouse have the <span class='emp'>exact numbers in front of you</span> before making any decision."</div><div class="pivot">\u2192 "Would you prefer a callback when you're both free \u2014 or pre-qualify now so you have the numbers ready when you talk to them?"</div></div><div class="tip"><strong>\u{1F4A1} TWO OPTIONS \u2014 both move forward.</strong> Never leave it open-ended \u2014 that's a dead end.</div>`},
no_ssn:{phase:"REBUTTAL \u2014 WON'T GIVE SSN / LAST FOUR ONLY",color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F512} "I don't want to give you my social" / "I don't like to give my information over the phone" / "Why do you need the full Social, it's always the last four!"</div><div class="rb"><div class="rblabel">RESPONSE 1</div><div class="rbtext">No worries, sir/ma'am, this is just to verify that we're talking to the right person. Once I submit your application, your information will be encrypted. And we use a <span class='kw'>bank level encryption</span>, so you and your information will be fully protected.</div></div><div class="rb"><div class="rblabel">RESPONSE 2</div><div class="rbtext">I totally understand, this is just to verify that we're speaking with the right person, once that your information is submitted, it will be <span class='kw'>erased from our system</span>. Even if you decide to accept the options that we have for you.</div></div><div class="rb"><div class="rblabel">RESPONSE 3</div><div class="rbtext">I only have <span class='emp'>30 seconds to process it</span>, so once we submit it, we'll no longer have access to it.</div></div><div class="rb"><div class="rblabel">RESPONSE 4</div><div class="rbtext">This is for me to adapt my financial services to find a way to work with you. Once we have the numbers in the table for you, you will have <span class='emp'>30 days to make a decision</span>.</div></div><div class="rb"><div class="rblabel">RESPONSE 5</div><div class="rbtext">We have been in business a long time, we haven't got this far if we were misusing people's sensitive information! And we are not about to put our <span class='kw'>reputation on the line</span> for your social, but it's necessary to provide you with an accurate quote! <span class='emp'>What's your social?</span></div></div><div class="rb"><div class="rblabel">RESPONSE 6</div><div class="rbtext">I completely understand your concern — safeguarding your personal information is our top priority. Our reputation relies on maintaining the highest standards of security and confidentiality. Providing your social is essential for <span class='kw'>verifying your identity</span> and ensuring the security of your application. Your information becomes encrypted after it gets submitted and we get the results <span class='emp'>immediately!</span></div></div><div class="rb"><div class="rblabel">RESPONSE 7 \u2014 (Last Four Only)</div><div class="rbtext">We understand your concern. However, we will need <span class='emp'>all nine digits</span> to accurately process your application. This also helps us verify your identity and ensures we can match you with the best available offers.</div></div><div class="rb"><div class="rblabel">RESPONSE 8 \u2014 (Last Four Only)</div><div class="rbtext">You don't have to worry about providing sensitive information, we only do this to verify that we're talking to the right person. After submitting your application, it will be <span class='kw'>encrypted</span>.</div></div><div class="rb"><div class="rblabel">RESPONSE 9 \u2014 (Last Four Only)</div><div class="rbtext">Unfortunately I would be unable to submit the application with only the last four. We need the full social for the <span class='kw'>soft credit check</span>. No worries ma'am/sir, your information is encrypted and there's <span class='emp'>no possible way for it to be lost</span>.</div></div><div class="tip"><strong>\u{1F910} SILENCE IS KEY.</strong> After asking for the social — stop talking. First person to speak loses. Wait it out.</div>`},
company_name:{phase:'REBUTTAL \u2014 "WHAT COMPANY IS THIS?"',color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F3E2} "What company is this?"</div><div class="rb"><div class="rblabel">OPTION 1 \u2014 Direct</div><div class="rbtext">"This is the <span class='kw'>Personal Loan Intake Department</span> \u2014 we match you with a lender based on your area and financial situation. All partners are <span class='emp'>A-rated with the BBB</span>. Once you're qualified, we match you with the right company."</div></div><div class="rb"><div class="rblabel">OPTION 2 \u2014 If They Push</div><div class="rbtext">"We're a <span class='kw'>loan intake and matching service</span> working with <span class='emp'>25+ licensed lenders</span>. The specific lender introduces themselves fully during the transfer."</div><div class="pivot">\u2192 "For now \u2014 can I get your date of birth?"</div></div>`},
who_are_we:{phase:'REBUTTAL \u2014 "WHO ARE YOU / WHERE ARE YOU LOCATED?"',color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F30D} "Who are you?" / "Where are you located?" / "What company is calling me?"</div><div class="rb"><div class="rblabel">RESPONSE \u2014 USE THIS</div><div class="rbtext">"We work with a <span class='kw'>nationwide network of lenders</span> and operate across <span class='emp'>multiple locations and branches</span> throughout the United States. Based on your application, once you meet the minimum requirements, you will be connected with a <span class='kw'>designated loan specialist</span> who can review your options and assist you with the loan process. They will also provide you with their <span class='emp'>direct email</span> and any information you may need moving forward."</div><div class="pivot">\u2192 "Please provide your email address and I will make sure you are connected with the appropriate specialist as soon as possible."</div></div><div class="tip"><strong>\u{1F4A1} PURPOSE:</strong> This gives them just enough to feel comfortable without going off-script. Email collection keeps the process moving forward.</div>`},
diff_numbers:{phase:'REBUTTAL \u2014 DIFFERENT NUMBERS / ADDRESS',color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F4F1} "Why are you calling me from different numbers?" / "What is your phone number?" / "Where are you located?" / "Give me your address!"</div><div class="rb"><div class="rblabel">RESPONSE 1 \u2014 (Different Numbers)</div><div class="rbtext">We use an automatic system that connects our dialer to different states in order to provide a <span class='kw'>better connection and audio quality</span>. Since we work with <span class='emp'>45 states in the US</span>, that's why our phone number is never the same.</div></div><div class="rb"><div class="rblabel">RESPONSE 2 \u2014 (Different Numbers)</div><div class="rbtext">Since we work with 45 states here in the US, we use an <span class='kw'>automatic dialer</span> that connects us with the best server in order to provide a better connection.</div></div><div class="rb"><div class="rblabel">RESPONSE 3 \u2014 (Different Numbers)</div><div class="rbtext">We secured lines to ensure we have the <span class='kw'>best connection</span> with our clients. In case we get disconnected, your information stays protected.</div></div><div class="rb"><div class="rblabel">RESPONSE 4 \u2014 (Different Numbers)</div><div class="rbtext">We have <span class='emp'>thousands of numbers</span> throughout the US and it calls from the best number available.</div></div><div class="rb"><div class="rblabel">RESPONSE 5 \u2014 (Different Numbers)</div><div class="rbtext">We work with a <span class='kw'>nationwide network of lenders</span> and operate across multiple locations and branches throughout the United States. Based on your application, once you meet the minimum requirements, you will be connected with a designated loan specialist who can review your options and assist you with the loan process. They will also provide you with their <span class='emp'>direct email</span> and any information you may need moving forward.</div></div><div class="rb"><div class="rblabel">RESPONSE 6 \u2014 (Address / Location)</div><div class="rbtext">Since we work from different points and with different lenders in the US, we don't have a specific address. But my loan specialist is going to provide you with the <span class='kw'>address for the private lender</span> that will be working with you.</div></div><div class="rb"><div class="rblabel">RESPONSE 7 \u2014 (Address / Location)</div><div class="rbtext">Well, we are the people that are going to connect you with your best private lender option. Our department does not have a specific address, but our loan specialist is going to provide you with your <span class='emp'>best option's address</span>.</div></div><div class="rb"><div class="rblabel">RESPONSE 8 \u2014 (Address / Location)</div><div class="rbtext">We don't accept in-person applications. The initial process is completed by phone, and for <span class='kw'>security and compliance reasons</span>, the full office address is shared only after your eligibility has been verified and you are connected with a loan specialist.</div></div><div class="rb"><div class="rblabel">RESPONSE 9 \u2014 (Address / Location)</div><div class="rbtext">We work with a <span class='kw'>nationwide network of lenders</span> and operate across multiple locations and branches throughout the United States. Based on your application, once you meet the minimum requirements, you will be connected with a designated loan specialist who can review your options and assist you with the loan process. They will also provide you with their <span class='emp'>direct email</span> and any information you may need moving forward.</div></div>`},
lower_rate:{phase:'REBUTTAL \u2014 MY BANK OFFERS A LOWER INTEREST RATE',color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F3E6} "My bank offers a lower interest rate"</div><div class="rb"><div class="rblabel">RESPONSE</div><div class="rbtext">Will that be a <span class='kw'>fixed rate</span>? We can guarantee that whatever the final rate you receive, it will <span class='emp'>not change throughout the life of the loan</span>, meaning you will always pay the same amount. You would normally need collateral for that, right? With us, <span class='emp'>there's no collateral required at all</span>.</div></div>`},
voicemail_approved:{phase:'REBUTTAL \u2014 BUT THE VOICEMAIL SAID I WAS ALREADY APPROVED!',color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F4AC} "But the voicemail said that I was already approved!"</div><div class="rb"><div class="rblabel">RESPONSE 1</div><div class="rbtext">Absolutely! I just need to verify a few details to see if we're talking to the right person.</div></div><div class="rb"><div class="rblabel">RESPONSE 2</div><div class="rbtext">That is correct, we only need to verify your identity with a couple questions and you'll be more than ready. <span class='kw'>Do you want the full amount of the offer</span> or are you looking for a little bit less?</div></div><div class="rb"><div class="rblabel">RESPONSE 3 \u2014 Full De-escalation Script</div><div class="rbtext"><div style="margin-bottom:10px;"><span style="color:var(--accent2);font-weight:800;font-size:0.78rem;letter-spacing:1px;text-transform:uppercase;">Opener (de-escalate):</span><br>"I completely understand why that message would make it sound like you already have something approved."</div><div style="margin-bottom:10px;"><span style="color:var(--accent2);font-weight:800;font-size:0.78rem;letter-spacing:1px;text-transform:uppercase;">Reality pivot:</span><br>"But here's what's actually going on..."</div><div style="margin-bottom:10px;"><span style="color:var(--accent2);font-weight:800;font-size:0.78rem;letter-spacing:1px;text-transform:uppercase;">Clarification:</span><br>"There's no application submitted on your behalf. What happened is our system flagged that you may qualify for a personal loan offer starting at around <span class='emp'>5.49% APR</span> based on prior financial activity or inquiries."</div><div style="margin-bottom:10px;"><span style="color:var(--accent2);font-weight:800;font-size:0.78rem;letter-spacing:1px;text-transform:uppercase;">Authority frame:</span><br>"We work with lenders like <span class='kw'>SoFi, Avant, Upstart, and OneMain Financial</span>, so what we can do is generate a commitment-free quote to see what you actually qualify for."</div><div style="margin-bottom:10px;"><span style="color:var(--accent2);font-weight:800;font-size:0.78rem;letter-spacing:1px;text-transform:uppercase;">Reassurance:</span><br>"So nothing's been processed, nothing's been accepted — this is simply to see what options are available to you."</div><div><span style="color:var(--accent2);font-weight:800;font-size:0.78rem;letter-spacing:1px;text-transform:uppercase;">If they're still skeptical:</span><br>"Let me ask you — would it hurt just to see what you qualify for if there's <span class='emp'>no obligation attached?</span>"</div></div></div><div class="rb"><div class="rblabel">RESPONSE 4</div><div class="rbtext">A pre-approved offer is only an offer. If you're interested we can give you a quote for the amount of the offer — we just need to <span class='kw'>verify some information</span>. Is this ok with you?</div></div>`},
dnc_file:{phase:'SITUATION \u2014 DNC / CLIENT ENROLLED / POTENTIAL CANCELLATION / BAD LEAD',color:'var(--red)',content:`<div class="phase-tag" style="background:var(--red-light);color:var(--red);border-color:#fca5a5;">\u26A0\uFE0F When you look for a phone number/file it shows as: DNC / CLIENT ENROLLED / POTENTIAL CANCELLATION / BAD LEAD</div><div class="tip"><strong>\u26A0\uFE0F ALWAYS GATHER:</strong> <span style='color:var(--red);font-weight:800;'>FULL NAME and PHONE NUMBER</span> before releasing the call.</div><div class="rb"><div class="rblabel">SCRIPT 1</div><div class="rbtext">(Gather FULL NAME and PHONE NUMBER) Okay ma'am/Sir, now that I have your information, one of my coworkers is going to <span class='kw'>call you back</span> to proceed with this application. Thank you for your time, have a nice day.</div></div><div class="rb"><div class="rblabel">SCRIPT 2</div><div class="rbtext">(Gather FULL NAME and PHONE NUMBER) Okay ma'am/sir, thank you for providing your information. I can see that one of my colleagues is currently <span class='kw'>working on your file</span>. I will ensure that they return your call at their <span class='emp'>earliest convenience</span>. Thank you again for contacting us today, and we hope you have an excellent day.</div></div><div class="rb"><div class="rblabel">SCRIPT 3</div><div class="rbtext">Hey, is this the best number to contact you? The <span class='kw'>loan specialist</span> will be in contact with you soon. Thank you for calling!</div></div>`},
llc_question:{phase:'REBUTTAL \u2014 IS YOUR COMPANY AN LLC OR LLP?',color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F3E2} "Is your company an LLC or LLP?"</div><div class="rb"><div class="rblabel">RESPONSE 1</div><div class="rbtext">We work with several <span class='kw'>LLC private lending institutions</span> that protect your information and integrity.</div></div><div class="rb"><div class="rblabel">RESPONSE 2</div><div class="rbtext"><span class='emp'>90% of the companies</span> that we work with work as an LLC. Which means that your information and assets will be <span class='kw'>protected by them</span>.</div></div>`},
debt_consolidation:{phase:'REBUTTAL \u2014 IS THIS DEBT CONSOLIDATION?',color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F4B3} "Is this debt consolidation?"</div><div class="rb"><div class="rblabel">RESPONSE 1</div><div class="rbtext">This is a <span class='kw'>personal loan company</span> ma'am/sir, our main goal is to give you the money so you can use it as you please. However, if you're looking for a debt consolidation, my loan specialist can provide you with the <span class='emp'>best option</span>.</div></div><div class="rb"><div class="rblabel">RESPONSE 2</div><div class="rbtext">This is a personal loan. So we <span class='kw'>deposit the funds directly into your bank account</span>. Once you're in possession of the funds, you can distribute the money for whatever you need.</div></div><div class="rb"><div class="rblabel">RESPONSE 3</div><div class="rbtext">We are a <span class='kw'>Private Financial Institution</span>, we can deposit the funds in your bank account or if preferred, we can send you a <span class='emp'>check in the mail</span> if it's your preferred way of payment.</div></div>`},
soft_pull:{phase:"REBUTTAL \u2014 THERE'S NO SUCH THING AS A SOFT CREDIT PULL",color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F4CA} "There's no such thing as a Soft Credit Pull" / "How do I know that this won't affect my credit?"</div><div class="rb"><div class="rblabel">RESPONSE 1</div><div class="rbtext">A soft credit check uses credit scoring models to review your credit, but <span class='kw'>simply checking it does not affect your credit score</span>. For example, when a bank offers you a pre-approved credit card, it has usually already performed a soft credit check to see if you qualify for that offer, and <span class='emp'>you don't even notice that they did it</span>. It is the same situation here.</div></div><div class="rb"><div class="rblabel">RESPONSE 2</div><div class="rbtext">A soft credit pull is similar to when you check your own credit score — it does not affect your score simply by being checked. That's the type of check we perform here to ensure your credit score remains <span class='emp'>unaffected</span>.</div></div><div class="rb"><div class="rblabel">RESPONSE 3</div><div class="rbtext">A soft credit check allows my company to <span class='kw'>view your credit report without affecting your credit score</span>. It does not indicate a formal loan application.</div></div>`},
private_lender:{phase:'REBUTTAL \u2014 FOR WHAT BANK DO YOU WORK?',color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F3E6} "For what bank do you work?" / "What is the name of your bank?" / "So, you're a broker? You're just going to connect me with someone?"</div><div class="rb"><div class="rblabel">RESPONSE 1</div><div class="rbtext">We are <span class='kw'>private lenders</span>, sir/ma'am. That means that we work with several lending institutions such as <span class='emp'>SoFi, One Main, Lightstream</span>, just to mention a few.<br><span style="color:var(--muted);font-size:0.85rem;">(Additional: The difference between a bank and us is that we have lower interest rates)</span></div></div><div class="rb"><div class="rblabel">RESPONSE 2</div><div class="rbtext">Ma'am/Sir, we are not a bank institution, we are <span class='kw'>private lenders</span>. Which is better, because we work with <span class='emp'>lower interest rates</span> than a traditional bank.</div></div><div class="rb"><div class="rblabel">RESPONSE 3</div><div class="rbtext"><span class='emp'>WE ARE NOT A BANK — WE ARE A FINANCIAL INSTITUTION.</span> WE ARE ___(NAME OF COMPANY) (PROVIDE CITY AND STATE OF CHOICE).</div></div>`},
confidence_mindset:{phase:'CONFIDENCE TECHNIQUE',color:'var(--green)',content:`<div class="phase-tag" style="background:var(--green-light);color:var(--green);border-color:#6ee7b7;">\u{1F4AA} Confidence Technique \u2014 Say This To Yourself</div><div class="rb" style="border-left:4px solid var(--green);"><div class="rblabel" style="color:var(--green);">\u{1F9E0} INNER SCRIPT \u2014 MINDSET SHIFT</div><div class="rbtext" style="font-size:1.05rem;font-style:italic;color:var(--text);line-height:1.9;">"I'm helping this person access <span class='kw'>real options they may not even know are available</span>. I believe in this service \u2014 now I just need to <span class='emp'>help them see the value</span>."</div></div><div class="tip" style="background:rgba(52,211,153,0.08);border-color:rgba(52,211,153,0.4);"><strong style="color:var(--green);">\u26A1 WHY IT WORKS:</strong> This mindset shift changes your <span style="color:var(--text);font-weight:700;">tone</span> \u2014 which can define a significant change in how you sound to the customer. When you feel unsure, the customer feels it. When you feel certain, they feel that too.</div>`},
wants_to_hangup:{phase:'TAKING OVER TECHNIQUE',color:'var(--red)',content:`<div class="phase-tag" style="background:var(--red-light);color:var(--red);border-color:#fca5a5;">\u{1F4F5} Customer Wants to Hang Up \u2014 Taking Over Technique</div><div class="rb"><div class="rblabel">RESPONSE 1</div><div class="rbtext">"Before you hang up \u2014 why don't you let us <span class='kw'>finish the process</span> and let the loan specialist take over so he can give you all the <span class='emp'>credentials and information</span> from our company."</div></div><div class="rb"><div class="rblabel">RESPONSE 2</div><div class="rbtext">"I understand your concern, and believe me, I would be <span class='kw'>skeptical at first</span> with such a great offer. Helping customers is our highest priority as well as <span class='emp'>maintaining all your information secure and private</span>. This is just a necessary step to make sure we are talking to the correct person."</div></div><div class="rb"><div class="rblabel">RESPONSE 3</div><div class="rbtext">"We don't want you to feel insecure in any way. The reason why our <span class='kw'>Loan Specialist</span> would be the one to give you all the website information and credentials is because they are the ones who would be <span class='emp'>directly offering you the loan</span>. At this moment, we have not confirmed which of all the lenders would be the most suitable option for you."</div></div>`},
follow_up_pivot:{phase:'FOLLOW UP ( PIVOT POSITIVELY )',color:'var(--accent)',content:`<div class="phase-tag" style="background:rgba(96,165,250,0.15);color:var(--accent);border-color:rgba(96,165,250,0.5);">\u{1F504} Follow Up / Pivot Positively \u2014 Getting the SSN</div><div class="rb"><div class="rblabel">RESPONSE 1 \u2014 SOFT CHECK PIVOT</div><div class="rbtext">"To move forward, we'll need your social to perform a <span class='kw'>soft credit check</span>. This won't affect your credit score in any way \u2014 it's just a safe way for us to understand your financial profile and <span class='emp'>match you with the loan option that fits best</span>."</div></div><div class="rb"><div class="rblabel">RESPONSE 2 \u2014 SECURITY PIVOT</div><div class="rbtext">"To ensure funds are sent to the right person, we need your social for <span class='kw'>secure verification</span>. Our system is encrypted and designed to immediately <span class='emp'>lock your information after it's submitted</span> \u2014 meaning I won't have access to it after that point."</div></div><div class="rb"><div class="rblabel">RESPONSE 3 \u2014 ZERO OBLIGATION PIVOT</div><div class="rbtext">"By sharing your social, we can verify your identity and present <span class='kw'>tailored loan options</span>. You're not committing to anything today \u2014 this is just to <span class='emp'>explore what's available to you with zero obligation</span>."</div></div>`},
ssn_concerns:{phase:'CONCERNS ABOUT PROVIDING SSN',color:'var(--gold)',content:`<div class="phase-tag" style="background:var(--gold-light);color:var(--gold);border-color:#fcd34d;">\u{1F510} Concerns About Providing SSN \u2014 Full Script Bank</div><div class="rb"><div class="rblabel">RESPONSE 1 \u2014 LENDER MATCH EXPLANATION</div><div class="rbtext">"(Customer's Name), I completely understand your concern. Just to clarify, the reason we don't provide lender credentials or website details upfront is because we <span class='kw'>haven't yet identified which lending partner will be the best fit</span> for you. That's exactly why we need to perform a soft credit check \u2014 to confirm your identity and evaluate your financial profile. This allows our Loan Specialist to connect you with the most appropriate lender and provide all the <span class='emp'>specific details once the best match is determined</span>. Rest assured, this soft check has <span class='kw'>no impact on your credit score</span>."</div></div><div class="rb"><div class="rblabel">RESPONSE 2 \u2014 FINANCIAL PROFILE</div><div class="rbtext">"(Customer's Name), providing your social is essential for us to conduct the soft credit check which, as mentioned earlier, will have <span class='kw'>no negative impact on your credit report</span>. We just want to understand your financial situation to the fullest in order to connect you with the <span class='emp'>best loan option for you</span>."</div></div><div class="rb"><div class="rblabel">RESPONSE 3 \u2014 ENCRYPTION &amp; SECURITY</div><div class="rbtext">"(Customer's Name), providing your social is essential for us to confirm the funds go to the correct person. We do have a <span class='kw'>high security encryption system</span> that only allows me to input your social in my system \u2014 after that, it <span class='emp'>automatically locks itself and submits to underwriting</span>. Once this happens, I will no longer have access to your information."</div></div><div class="rb"><div class="rblabel">RESPONSE 4 \u2014 TAILORED OPTIONS + NO COMMITMENT</div><div class="rbtext">"(Customer's Name), by providing your social, not only do we get to verify your identity, but we can also <span class='kw'>tailor several loan options</span> that will suit your financial needs the best. You are <span class='emp'>not obligated to make any decisions at this time</span> \u2014 the best part is that you can simply explore your options, and if they are not suitable for you, you are not committed to taking advantage of them."</div></div>`},
pitch_benefit:{phase:'SALES PITCH BOOSTING',color:'var(--green)',content:`<div class="phase-tag" style="background:var(--green-light);color:var(--green);border-color:#6ee7b7;">\u{1F3AF} Sales Pitch Boosting \u2014 Benefit-Oriented &amp; Empathetic</div><div class="rb" style="border-left:4px solid var(--accent2);"><div class="rblabel" style="color:var(--accent2);">BENEFIT-ORIENTED PITCH</div><div class="rbtext">"We specialize in finding <span class='kw'>personal loan offers that work with your specific situation</span> \u2014 not just general numbers. By understanding your financial profile, we can <span class='emp'>tailor an offer that actually makes sense for you</span>."</div></div><div class="rb" style="border-left:4px solid var(--green);"><div class="rblabel" style="color:var(--green);">EMPATHETIC + SOLUTION-FOCUSED</div><div class="rbtext">"A lot of people feel uncertain at this point, and that's totally normal. But once we verify your profile, we can potentially help you <span class='kw'>reduce monthly payments, consolidate debt, or access emergency funds</span> \u2014 with <span class='emp'>no upfront cost</span>."</div></div><div class="tip" style="background:rgba(52,211,153,0.08);border-color:rgba(52,211,153,0.4);"><strong style="color:var(--green);">\u{1F4A1} DELIVERY TIP:</strong> Lead with what they gain. Empathy first, solution second \u2014 always makes the pitch land softer and stick harder.</div>`},
pitch_urgency:{phase:'SALES PITCH BOOSTING \u2014 URGENCY &amp; NO COMMITMENT',color:'var(--cyan)',content:`<div class="phase-tag" style="background:rgba(34,211,238,0.1);color:var(--cyan);border-color:rgba(34,211,238,0.4);">\u26A1 Urgency Without Pressure &amp; Zero Obligation Scripts</div><div class="rb" style="border-left:4px solid var(--cyan);"><div class="rblabel" style="color:var(--cyan);">URGENCY WITHOUT PRESSURE</div><div class="rbtext">"These offers <span class='kw'>change daily</span> based on lender availability and interest rates. Getting pre-qualified now just gives you access to the <span class='emp'>best current options</span> \u2014 again, no pressure to move forward unless it's the right fit."</div></div><div class="rb" style="border-left:4px solid var(--green);"><div class="rblabel" style="color:var(--green);">ZERO OBLIGATION REASSURANCE</div><div class="rbtext">"You're not signing up for anything today. This is just to see what loan options you could be eligible for \u2014 and if you don't like any of them, <span class='kw'>you're free to walk away</span>. It's a <span class='emp'>100% free consultation</span>."</div></div><div class="rb" style="border-left:4px solid var(--accent);"><div class="rblabel" style="color:var(--accent);">EXPLORE WITHOUT PRESSURE</div><div class="rbtext">"Think of it like <span class='kw'>window shopping for a loan</span>. You get to see what's available, how much you qualify for, and what the terms are \u2014 and if it doesn't fit your needs, <span class='emp'>you're not locked into anything</span>."</div></div><div class="rb" style="border-left:4px solid var(--purple);"><div class="rblabel" style="color:var(--purple);">WHY NOT SEE WHAT YOU QUALIFY FOR?</div><div class="rbtext">"You've got nothing to lose by checking. There's <span class='kw'>no cost, no commitment, and no impact on your credit score</span>. But you could walk away with a loan offer that <span class='emp'>saves you money or helps you reach your goals</span>."</div></div>`},
pitch_softpull:{phase:'SALES PITCH BOOSTING \u2014 SOFT PULL / NO WEBSITE / DATA PRIVACY',color:'var(--purple)',content:`<div class="phase-tag" style="background:var(--purple-light);color:var(--purple);border-color:#c4b5fd;">\u{1F4CA} Soft Pull / No Website / Data Privacy Scripts</div><div class="rb" style="border-left:4px solid var(--accent2);"><div class="rblabel" style="color:var(--accent2);">SOFT PULL CLARIFICATION</div><div class="rbtext">"I completely understand, (Customer's Name). Just to reassure you \u2014 this is only a <span class='kw'>soft credit check</span>. It's not a hard pull and <span class='emp'>won't affect your credit score at all</span>. It's simply used to verify your identity and show you what loan options you could qualify for \u2014 no impact, no commitment."</div></div><div class="rb" style="border-left:4px solid var(--gold);"><div class="rblabel" style="color:var(--gold);">NO WEBSITE / CREDENTIALS CONCERN</div><div class="rbtext">"The reason we don't provide specific lender websites right away is because we <span class='kw'>haven't confirmed which lender will offer you the best deal</span>. Once your profile is reviewed through the soft check, our Loan Specialist will <span class='emp'>guide you through the lender's information step-by-step</span>."</div></div><div class="rb" style="border-left:4px solid var(--green);"><div class="rblabel" style="color:var(--green);">DATA PRIVACY &amp; ENCRYPTION</div><div class="rbtext">"Your information is <span class='kw'>completely protected</span>. Once I input your SSN, it's locked and securely sent to underwriting \u2014 I can't access it again. We use <span class='emp'>bank-level encryption</span> to keep everything safe and confidential."</div></div>`},
};

// ── APPS SCRIPT BRIDGE URL ──
const BRIDGE_URL = 'https://script.google.com/macros/s/AKfycbynAn0uYQcOO_6_4feNU2RY-886eKTV_BBoCYYASwVB2jpYk60w1S8PY2IqbUphDJDl4A/exec';

// ── JSONP helper — bypasses CORS for Google Apps Script ──
function callBridge(params) {
  return new Promise((resolve, reject) => {
    const cbName = 'cb_' + Date.now() + '_' + Math.floor(Math.random()*10000);
    const timeout = setTimeout(() => {
      delete window[cbName];
      if(tag && tag.parentNode) tag.parentNode.removeChild(tag);
      reject(new Error('Timed out'));
    }, 15000);
    window[cbName] = (data) => {
      clearTimeout(timeout);
      delete window[cbName];
      if(tag && tag.parentNode) tag.parentNode.removeChild(tag);
      resolve(data);
    };
    const qs = Object.entries({...params, callback: cbName})
      .map(([k,v]) => encodeURIComponent(k)+'='+encodeURIComponent(v))
      .join('&');
    const tag = document.createElement('script');
    tag.src = BRIDGE_URL + '?' + qs;
    tag.onerror = () => { clearTimeout(timeout); delete window[cbName]; reject(new Error('Load error')); };
    document.head.appendChild(tag);
  });
}

// ── INACTIVE AGENTS ──
// Agents are automatically blocked if their Status column in the Google Sheet
// is NOT "Agent" or "Trainee" — the Apps Script sends inactive:true for those.
// To remove an agent from the dashboard: change their Status to "Inactive" in the sheet.
// This hardcoded list is a fallback for agents with no status set.
const INACTIVE_AGENTS = [
  'Esha Singh','Keisha Graig','Angelica Alert'
];

// ── ROSTER (loaded live from Google Sheet) ──
let ROSTER = {};
let rosterLoaded = false;

// Normalize any team/branch string to canonical 'PR' (Providence) or 'BB' (Berbice)
// Handles values like: GUYP, GUYB, PR, BB, Providence, Berbice, and combos
function normalizeTeam(val) {
  if (!val) return 'BB';
  const v = val.toUpperCase().replace(/[\s\-_]/g, '');
  if (v.startsWith('GUYP') || v.includes('GUYP') || v === 'PR' || v.includes('PROVIDENCE')) return 'PR';
  if (v.startsWith('GUYB') || v.includes('GUYB') || v === 'BB' || v.includes('BERBICE')) return 'BB';
  return val; // unknown value — pass through unchanged
}

async function loadRoster() {
  try {
    const data = await callBridge({action: 'getRoster'});
    if (data.success && data.agents) {
      // DEBUG: Log first agent to see exact field names from Apps Script
      if (data.agents.length > 0) {
        console.log('🔍 RAW AGENT FROM APPS SCRIPT:', JSON.stringify(data.agents[0]));
        console.log('🔍 ALL FIELD NAMES:', Object.keys(data.agents[0]).join(', '));
        // Log the ytelName specifically so we can see what key it's stored under
        const firstA = data.agents[0];
        const ytelKey = Object.keys(firstA).find(k => k.toLowerCase().replace(/[\s_]/g,'') === 'ytelname');
        console.log('🔍 ytelName key in sheet:', ytelKey, '→', ytelKey ? firstA[ytelKey] : 'NOT FOUND');
      } else {
        console.warn('⚠️ Apps Script returned 0 agents — sheet may be offline or misconfigured');
      }
      ROSTER = {};
      data.agents.forEach(rawA => {
        // Normalize field names — Apps Script may return different casing
        const a = {
          userId:   rawA.userId   || rawA.userid   || rawA.UserId   || rawA.user_id   || '',
          name:     rawA.name     || rawA.Name      || rawA.agentName || rawA.agentname || '',
          ytelName: rawA.ytelName || rawA.ytelname  || rawA.YtelName  || rawA['Ytel Name'] || rawA['ytel name'] || rawA['ytel_name'] || '',
          team:     rawA.team     || rawA.Team      || '',
          shift:    rawA.shift    || rawA.Shift     || '',
          lunch:    rawA.lunch    || rawA.Lunch     || '',
          status:   rawA.status   || rawA.Status    || '',
          inactive: rawA.inactive || false,
        };
        if (a.userId) {
          // Skip inactive agents — either hardcoded or flagged by Apps Script
          // NOTE: blank status is treated as active (Agent) — only skip when
          // Apps Script explicitly sets inactive:true OR status is 'inactive'
          const statusLow = (a.status||'').toLowerCase().trim();
          const isInactive = INACTIVE_AGENTS.some(n=>n.toLowerCase()===a.name.toLowerCase())
            || a.inactive === true
            || (statusLow === 'inactive');
          if(isInactive) return;
          // Determine team from ytelName prefix — GUYP = Providence (PR), GUYB = Berbice (BB)
          // ytelName is the authoritative source; sheet team field is a fallback only
          // normalizeTeam() converts GUYP/Providence/PR → 'PR', GUYB/Berbice/BB → 'BB'
          let team = 'BB'; // safe default
          if (a.ytelName) {
            const yn = a.ytelName.toUpperCase().replace(/[\s\-_]/g,'');
            if (yn.startsWith('GUYP') || yn.includes('GUYP')) team = 'PR';
            else if (yn.startsWith('GUYB') || yn.includes('GUYB')) team = 'BB';
            else if (a.team) team = normalizeTeam(a.team); // ytelName has no prefix clue — normalize sheet field
          } else if (a.team) {
            team = normalizeTeam(a.team); // no ytelName at all — normalize sheet field
          }
          const uid = String(a.userId).trim();
          // If we already have this agent in ROSTER (e.g. just added via Firebase),
          // and the Sheet came back without a ytelName prefix, trust the existing team
          const existingTeam = ROSTER[uid] ? ROSTER[uid].team : null;
          if (!a.ytelName && existingTeam) team = existingTeam;

          ROSTER[uid] = {
            userId: uid,
            name: a.name,
            ytelName: a.ytelName || (ROSTER[uid] ? ROSTER[uid].ytelName : ''),
            shift: a.shift || '',
            lunch: a.lunch || '',
            brk: '',
            team,
            status: a.status || 'Agent'
          };
        }
      });
      rosterLoaded = true;
      console.log('Roster loaded from sheet:', Object.keys(ROSTER).length, 'agents');
      // DEBUG: Show first 3 roster entries
      Object.values(ROSTER).slice(0,3).forEach(a => {
        console.log('🟢 ROSTER ENTRY:', JSON.stringify(a));
      });
    }
  } catch(e) {
    console.error('Roster load failed:', e);
  }

  // ── Merge Firebase roster — catches new reps added via Admin Panel
  // before the Google Sheet has been updated ──
  try {
    const fbSnap = await db.collection('roster').get();
    let mergeCount = 0;
    // DEBUG: Log first Firebase doc to see what fields exist
    let fbDebugDone = false;
    fbSnap.forEach(doc => {
      const a = doc.data();
      if (!fbDebugDone) {
        console.log('🔥 FIREBASE ROSTER DOC (first):', JSON.stringify(a));
        console.log('🔥 FIREBASE FIELD NAMES:', Object.keys(a).join(', '));
        fbDebugDone = true;
      }
      const uid = String(a.userId || doc.id).trim();
      if (!uid) return;

      // If Sheet already loaded this agent, check if Firebase has a better team determination
      // (Sheet may have saved without ytelName, causing wrong BB default)
      if (ROSTER[uid]) {
        // Firebase may only UPGRADE a BB assignment to PR — it must NEVER downgrade PR→BB.
        // The Google Sheet's ytelName (GUYP prefix) is the authoritative team source.
        if (ROSTER[uid].team !== 'PR' && a.ytelName) {
          const yn = a.ytelName.toUpperCase().replace(/[\s\-_]/g,'');
          const fbTeam = (yn.startsWith('GUYP') || yn.includes('GUYP')) ? 'PR' : null;
          if (fbTeam) {
            console.log(`🔥 Firebase upgrading team for ${a.name}: BB → PR (ytelName: ${a.ytelName})`);
            ROSTER[uid].team = 'PR';
            if (!ROSTER[uid].ytelName) ROSTER[uid].ytelName = a.ytelName;
          }
        }
        return; // already in roster — Sheet data wins for everything else
      }
      // ── Dedup by name: if Sheet already has an agent with this name, don't add a
      // second Firebase entry with a different userId (would cause them to appear in both branches).
      const sameNameEntry = Object.values(ROSTER).find(r => r.name && a.name &&
        r.name.toLowerCase().trim() === (a.name||'').toLowerCase().trim());
      if (sameNameEntry) {
        // Merge: keep Sheet userId but apply Firebase upgrade only (BB→PR)
        if (sameNameEntry.team !== 'PR' && a.ytelName) {
          const yn = a.ytelName.toUpperCase().replace(/[\s\-_]/g,'');
          if (yn.startsWith('GUYP') || yn.includes('GUYP')) {
            console.log(`🔥 Firebase upgrading team for ${a.name} (name-match): BB → PR`);
            sameNameEntry.team = 'PR';
          }
        }
        return; // don't create a second ROSTER entry for the same person
      }
      // Skip if explicitly inactive — blank status treated as active (Agent)
      const fbStatusLow = (a.status||'').toLowerCase().trim();
      const isInactive = INACTIVE_AGENTS.some(n => n.toLowerCase() === (a.name||'').toLowerCase())
        || fbStatusLow === 'inactive'
        || a.inactive === true;
      if (isInactive) return;
      // Determine team from ytelName prefix — GUYP = Providence (PR), GUYB = Berbice (BB)
      // ytelName is authoritative; a.team is fallback only (always normalized via normalizeTeam)
      let team = 'BB';
      if (a.ytelName) {
        const yn = a.ytelName.toUpperCase().replace(/[\s\-_]/g,'');
        if (yn.startsWith('GUYP') || yn.includes('GUYP')) team = 'PR';
        else if (yn.startsWith('GUYB') || yn.includes('GUYB')) team = 'BB';
        else if (a.team) team = normalizeTeam(a.team);
      } else if (a.team) {
        team = normalizeTeam(a.team);
      }
      ROSTER[uid] = {
        userId: uid,
        name: a.name || '',
        ytelName: a.ytelName || '',
        shift: a.shift || '',
        lunch: a.lunch || '',
        brk: '',
        team,
        status: a.status || 'Agent'
      };
      mergeCount++;
    });
    if (mergeCount > 0) {
      console.log('Roster merged', mergeCount, 'agent(s) from Firebase not yet in Sheet');
      rosterLoaded = true;
    }
  } catch(e) {
    console.warn('Firebase roster merge failed (non-fatal):', e);
  }
}

const ADMIN_ID = '0000';
const ADMIN_PW = 'admin';
let currentUser = null;
let midnightTimer = null;

// ── GREETINGS ──
function getGreeting(name){
  const h = new Date().toLocaleString('en-US',{timeZone:'America/Guyana',hour:'numeric',hour12:false});
  const hr = parseInt(h);
  if(hr < 12) return `Good morning, ${name}! Let's make today count. 🔥`;
  if(hr < 17) return `Good afternoon, ${name}! Stay focused, close strong. 💪`;
  return `Good evening, ${name}! Finish the shift strong. ⚡`;
}

// ── ID INPUT — show password for admin ──
function onIdInput(val){
  document.getElementById('pw-wrap').style.display = val === ADMIN_ID ? 'block' : 'none';
  document.getElementById('login-err').textContent = '';
}

// ── LOGIN ──
async function doLogin(){
  const id = document.getElementById('login-id').value.trim();
  const pw = document.getElementById('login-pw') ? document.getElementById('login-pw').value.trim() : '';
  const errEl = document.getElementById('login-err');
  errEl.textContent = '';

  if(!id){ errEl.textContent = '⚠ Please enter your Ytel ID.'; return; }

  const btn = document.querySelector('.login-btn');
  btn.innerHTML = '<span class="spinner"></span>CONNECTING...';
  btn.disabled = true;

  // ── ADMIN LOGIN ──
  if(id === ADMIN_ID){
    if(pw !== ADMIN_PW){
      errEl.textContent = '⚠ Incorrect password.';
      btn.innerHTML = 'ENTER DASHBOARD';
      btn.disabled = false;
      return;
    }
    try{
      await auth.signInAnonymously();
      currentUser = {id:'0000', name:'Admin', isAdmin:true, team:'ADMIN'};
      sessionStorage.setItem('bds_user_'+getTodayGY(), JSON.stringify(currentUser));
      btn.innerHTML = 'ENTER DASHBOARD';
      btn.disabled = false;
      showDashboard();
    }catch(e){
      errEl.textContent = '⚠ Firebase error: ' + e.message;
      btn.innerHTML = 'ENTER DASHBOARD';
      btn.disabled = false;
    }
    return;
  }

  // ── AGENT LOGIN ──
  try{
    // Step 1 — Load roster
    errEl.textContent = '';
    if(!rosterLoaded){
      btn.innerHTML = '<span class="spinner"></span>LOADING ROSTER...';
      await loadRoster();
    }

    // Step 2 — Find agent
    const agentData = ROSTER[id];
    if(!agentData){
      // Show helpful message with ID count loaded
      const count = Object.keys(ROSTER).length;
      errEl.textContent = count > 0
        ? '⚠ Ytel ID ' + id + ' not found. (' + count + ' agents loaded)'
        : '⚠ Could not load roster. Check your connection and try again.';
      btn.innerHTML = 'ENTER DASHBOARD';
      btn.disabled = false;
      return;
    }

    // Step 3 — Firebase sign in
    btn.innerHTML = '<span class="spinner"></span>SIGNING IN...';
    await auth.signInAnonymously();
    currentUser = {id, ...agentData, isAdmin:false};

    // Step 4 — Mark attendance (non-blocking — don't fail login if this errors)
    btn.innerHTML = '<span class="spinner"></span>MARKING ATTENDANCE...';
    try{ await markAttendanceSheet(agentData); }catch(e){ console.warn('Attendance mark failed:', e); }

    // Step 5 — Save session
    const today = getTodayGY();
    try{
      await db.collection('sessions').doc(id+'_'+today).set({
        id, name:agentData.name, team:agentData.team,
        loginTime: firebase.firestore.FieldValue.serverTimestamp(),
        date: today
      },{merge:true});
    }catch(e){ console.warn('Session save failed:', e); }

    sessionStorage.setItem('bds_user_'+today, JSON.stringify(currentUser));

    btn.innerHTML = 'ENTER DASHBOARD';
    btn.disabled = false;
    showDashboard();

  }catch(e){
    console.error('Login error:', e);
    errEl.textContent = '⚠ ' + (e.message || 'Login failed. Please try again.');
    btn.innerHTML = 'ENTER DASHBOARD';
    btn.disabled = false;
  }
}

// ── MARK ATTENDANCE IN GOOGLE SHEET ──
async function markAttendanceSheet(agent) {
  try {
    const today  = getTodayGY();
    const docRef = db.collection('attendance').doc(agent.userId+'_'+today);

    // Check Firebase first — if already logged there, no need to do anything
    const fbSnap = await docRef.get();
    if(fbSnap.exists){
      // Already in Firebase — rep is already showing online, nothing to do
      return;
    }

    // Calculate status (Present / Late) based on shift time
    const status = getAttendanceStatus(agent.shift) || 'P';

    // Always write to Firebase immediately so the admin sees them online NOW
    await docRef.set({
      id:        agent.userId,
      name:      agent.name,
      team:      agent.team,
      date:      today,
      status,
      shift:     agent.shift || '',
      loginTime: firebase.firestore.FieldValue.serverTimestamp()
    },{merge:true});

    // Then try to mark the Google Sheet (non-blocking — sheet may already have them)
    try{
      const checkData = await callBridge({action:'checkAttendance', name:agent.name, team:agent.team});
      if(!checkData.marked){
        await callBridge({action:'markAttendance', name:agent.name, team:agent.team, status});
      }
    }catch(e){ console.warn('Sheet attendance mark failed (non-fatal):', e); }

  } catch(e) {
    console.error('Attendance mark failed:', e);
  }
}

// ── CALCULATE PRESENT OR LATE ──
function getAttendanceStatus(shift) {
  try {
    const nowGY  = new Date(new Date().toLocaleString('en-US',{timeZone:'America/Guyana'}));
    const isSun  = nowGY.getDay() === 0;

    // On Sunday everyone has the same 11:45am shift regardless of their roster shift
    const shiftStr = isSun ? '11:45am' : (shift || '');
    if(!shiftStr) return 'P';

    const match = shiftStr.match(/(\d+):(\d+)\s*(am|pm)/i);
    if(!match) return 'P';
    let h = parseInt(match[1]), m = parseInt(match[2]);
    const ampm = match[3].toLowerCase();
    if(ampm==='pm' && h!==12) h+=12;
    if(ampm==='am' && h===12) h=0;

    const shiftStart = new Date(nowGY.getFullYear(),nowGY.getMonth(),nowGY.getDate(),h,m,0);
    const diffMins   = (nowGY - shiftStart) / 60000;
    if(diffMins > 15) return 'L';
    return 'P';
  } catch(e){ return 'P'; }
}

function getTodayGY(){
  return new Date().toLocaleDateString('en-CA',{timeZone:'America/Guyana'});
}

// ── SHOW DASHBOARD ──
function showDashboard(){
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('rep-bar').classList.add('show');

  const u = currentUser;
  const firstName = u.name.split(' ')[0];

  document.getElementById('rep-greeting').innerHTML = u.isAdmin
    ? '⚡ <span>Admin Panel</span> — Full Access'
    : getGreeting(firstName).replace(firstName, `<span>${firstName}</span>`);

  const details = document.getElementById('rep-details');
  details.innerHTML = '';

  if(!u.isAdmin){
    details.innerHTML += `<div class="rep-chip ext">ID: <b>${u.id}</b></div>`;
    if(u.shift) details.innerHTML += `<div class="rep-chip shift">⏰ <b>${u.shift}</b></div>`;
    if(u.lunch) details.innerHTML += `<div class="rep-chip lunch">🍽 Lunch: <b>${u.lunch}</b></div>`;
    if(u.brk)   details.innerHTML += `<div class="rep-chip brk">☕ Break: <b>${u.brk}</b></div>`;
    const teamName = u.team==='BB' ? 'Berbice' : u.team==='PR' ? 'Providence' : u.team;
    details.innerHTML += `<div class="rep-chip" style="border-color:rgba(167,139,250,0.3);color:var(--purple);">Team: <b>${teamName}</b></div>`;
    // Streak chip placeholder — filled after async load
    details.innerHTML += `<div id="streak-chip-wrap" style="display:flex;gap:6px;align-items:center;"></div>`;
    // Load & update streak asynchronously
    updateStreak(u.id, u.name);
  } else {
    document.getElementById('admin-badge-wrap').innerHTML = '<div class="admin-badge">⚡ ADMIN</div>';
    showAdminUI();
  }

  scheduleMidnightLogout();
  init();
  loadCompanyName(); // always load latest name on dashboard show
}

// ══════════════════════════════════════════════
//  COMPANY NAME — admin editable, stored in Firestore
//  Displayed in the Script tab (Step 1 - Introduction)
// ══════════════════════════════════════════════
async function loadCompanyName(){
  try{
    const snap = await db.collection('settings').doc('companyName').get();
    if(snap.exists && snap.data().name){
      applyCompanyName(snap.data().name);
    }
  }catch(e){ /* silently fall back to default */ }
  // Enable double-click edit only for admin
  if(currentUser && currentUser.isAdmin){
    const el = document.getElementById('script-company-name-display');
    if(el){
      el.classList.add('company-name-admin-editable');
      el.title = 'Double-click to rename';
      el.ondblclick = openCompanyNameModal;
    }
  }
}

function applyCompanyName(name){
  // Update the script tab display
  const el = document.getElementById('script-company-name-display');
  if(el) el.textContent = 'Company Name: ' + name;
}

function openCompanyNameModal(){
  if(!currentUser || !currentUser.isAdmin) return;
  // Extract just the name part (strip "Company Name: " prefix)
  const el = document.getElementById('script-company-name-display');
  const full = el ? el.textContent : '';
  const current = full.replace(/^Company Name:\s*/i, '');
  document.getElementById('company-name-input').value = current.toUpperCase();
  document.getElementById('company-name-modal').classList.add('open');
  setTimeout(()=>document.getElementById('company-name-input').select(), 50);
}

function closeCompanyNameModal(){
  document.getElementById('company-name-modal').classList.remove('open');
}

async function saveCompanyName(){
  const val = document.getElementById('company-name-input').value.trim().toUpperCase();
  if(!val){ return; }
  const btn = document.getElementById('company-name-save');
  btn.textContent = '⏳ SAVING...';
  btn.disabled = true;
  try{
    await db.collection('settings').doc('companyName').set({name: val, updatedBy:'admin', updatedAt: firebase.firestore.FieldValue.serverTimestamp()});
    applyCompanyName(val);
    closeCompanyNameModal();
  }catch(e){
    alert('Failed to save: ' + e.message);
  }
  btn.textContent = '💾 SAVE NAME';
  btn.disabled = false;
}

// ══════════════════════════════════════════════
//  STREAK COUNTER
//  Stored in Firebase: streaks/{userId}
//  { streak, lastDate, bestStreak }
//  Rules:
//    - Login on time (P) = streak + 1
//    - Login late (L)    = streak resets to 0
//    - Miss a day        = streak resets to 0
//    - Already logged today = no change
// ══════════════════════════════════════════════
async function updateStreak(userId, name){
  if(!userId) return;
  const today  = getTodayGY();
  const idStr  = String(userId);
  const ref    = db.collection('streaks').doc(idStr);

  try{
    // Today's attendance status
    const attSnap   = await db.collection('attendance').doc(idStr+'_'+today).get();
    const attStatus = attSnap.exists ? normalizeStatus(attSnap.data().status) : 'P';
    const isOnTime  = attStatus === 'P';
    const isLate    = attStatus === 'L';

    // Load existing streak doc
    const snap = await ref.get();
    let data   = snap.exists ? snap.data() : {};

    // ── Pull current values ──
    let daily       = data.daily       || 0;
    let dailyBest   = data.dailyBest   || 0;
    let dailyLast   = data.dailyLast   || '';
    let weekly      = data.weekly      || 0;
    let weeklyBest  = data.weeklyBest  || 0;
    let weeklyLast  = data.weeklyLast  || '';
    let monthly     = data.monthly     || 0;
    let monthlyBest = data.monthlyBest || 0;
    let monthlyLast = data.monthlyLast || '';

    // Already updated today — just render with current data
    if(dailyLast === today){
      renderStreakChips({daily, dailyBest, weekly, weeklyBest, monthly, monthlyBest, attStatus});
      return;
    }

    const yesterday   = getYesterdayGY();
    const nowGY       = new Date(new Date().toLocaleString('en-US',{timeZone:'America/Guyana'}));
    const weekStart   = getWeekStartGY(nowGY);   // Monday of current week  YYYY-MM-DD
    const monthStart  = today.substring(0,7)+'-01'; // 1st of current month

    // ── DAILY STREAK ──
    // On time & consecutive → +1. Late or gap → 0
    if(isLate){
      daily = 0;
    } else if(isOnTime){
      daily = (dailyLast === yesterday) ? daily + 1 : 1;
    }
    if(daily > dailyBest) dailyBest = daily;
    dailyLast = today;

    // ── WEEKLY STREAK ──
    // Counts on-time days this week (Mon–Sun). Resets to 0 every Monday.
    // If weeklyLast is from a previous week → reset first
    const weeklyLastInThisWeek = weeklyLast >= weekStart;
    if(!weeklyLastInThisWeek){
      weekly = 0; // new week starts fresh
    }
    if(isLate){
      weekly = 0;
    } else if(isOnTime){
      // Only increment once per day
      if(weeklyLast !== today){
        weekly = weeklyLastInThisWeek ? weekly + 1 : 1;
      }
    }
    if(weekly > weeklyBest) weeklyBest = weekly;
    weeklyLast = today;

    // ── MONTHLY STREAK ──
    // Counts on-time days this month. Resets to 0 on the 1st of each month.
    const monthlyLastInThisMonth = monthlyLast >= monthStart;
    if(!monthlyLastInThisMonth){
      monthly = 0; // new month starts fresh
    }
    if(isLate){
      monthly = 0;
    } else if(isOnTime){
      if(monthlyLast !== today){
        monthly = monthlyLastInThisMonth ? monthly + 1 : 1;
      }
    }
    if(monthly > monthlyBest) monthlyBest = monthly;
    monthlyLast = today;

    // Save all to Firebase
    await ref.set({
      daily, dailyBest, dailyLast,
      weekly, weeklyBest, weeklyLast,
      monthly, monthlyBest, monthlyLast,
      name, updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge:true});

    renderStreakChips({daily, dailyBest, weekly, weeklyBest, monthly, monthlyBest, attStatus});

  }catch(e){
    console.warn('Streak update failed:', e);
    renderStreakChips({daily:0, dailyBest:0, weekly:0, weeklyBest:0, monthly:0, monthlyBest:0, attStatus:'P'});
  }
}

function getYesterdayGY(){
  const now = new Date(new Date().toLocaleString('en-US',{timeZone:'America/Guyana'}));
  now.setDate(now.getDate()-1);
  return now.toLocaleDateString('en-CA',{timeZone:'America/Guyana'});
}

function getWeekStartGY(dateObj){
  // Returns YYYY-MM-DD of the most recent Monday
  const d   = new Date(dateObj);
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? 6 : day - 1; // days since Monday
  d.setDate(d.getDate() - diff);
  return d.toLocaleDateString('en-CA',{timeZone:'America/Guyana'});
}

function renderStreakChips({daily, dailyBest, weekly, weeklyBest, monthly, monthlyBest, attStatus}){
  const wrap = document.getElementById('streak-chip-wrap');
  if(!wrap) return;

  const isLate = attStatus === 'L';

  function chipHtml(count, best, type, icon, resetLabel){
    const isZero = count === 0;
    const cls    = isZero ? 'zero' : count >= 5 ? 'on-fire' : 'building';
    const emoji  = isZero ? '💤' : count >= 5 ? '🔥' : icon;
    const bestTxt = best > 0 ? ` <span style="opacity:0.45;font-size:0.5rem;">best:${best}</span>` : '';
    return isZero
      ? `<div class="streak-chip zero" title="Log in on time to build your ${type} streak">${emoji} <span>${type.toUpperCase()} 0${bestTxt}</span></div>`
      : `<div class="streak-chip ${cls}" title="${type} streak · best: ${best}">${emoji} <span class="streak-num">${count}</span> <span>${type.toUpperCase()}${bestTxt}</span></div>`;
  }

  wrap.innerHTML =
    chipHtml(weekly,  weeklyBest,  'weekly',  '📅', '') +
    chipHtml(monthly, monthlyBest, 'monthly', '🏆', '');
}

// Update streak display in admin's agent profile view
async function loadAgentStreakForProfile(idStr, name){
  try{
    const snap = await db.collection('streaks').doc(idStr).get();
    const el   = document.getElementById('rp-streak-display');
    if(!el) return;
    if(snap.exists){
      const d = snap.data();
      const daily   = d.daily   ||0, dailyBest   = d.dailyBest   ||0;
      const weekly  = d.weekly  ||0, weeklyBest  = d.weeklyBest  ||0;
      const monthly = d.monthly ||0, monthlyBest = d.monthlyBest ||0;
      el.innerHTML =
        `<span style="color:#fb923c;">🔥 ${daily}d</span> <span style="opacity:0.4;font-size:0.6rem;">best ${dailyBest}</span>&nbsp;&nbsp;` +
        `<span style="color:#fbbf24;">📅 ${weekly}w</span> <span style="opacity:0.4;font-size:0.6rem;">best ${weeklyBest}</span>&nbsp;&nbsp;` +
        `<span style="color:#34d399;">🏆 ${monthly}m</span> <span style="opacity:0.4;font-size:0.6rem;">best ${monthlyBest}</span>`;
      el.style.color = '#e2e8f0';
    } else {
      el.textContent = '💤 No streak data yet';
      el.style.color = '#64748b';
    }
  }catch(e){ console.warn('Streak load failed',e); }
}

// ── MIDNIGHT AUTO-LOGOUT ──
function scheduleMidnightLogout(){
  const nowGY = new Date(new Date().toLocaleString('en-US',{timeZone:'America/Guyana'}));
  const midnight = new Date(nowGY.getFullYear(),nowGY.getMonth(),nowGY.getDate()+1,0,0,0);
  const ms = midnight - nowGY;
  clearTimeout(midnightTimer);
  midnightTimer = setTimeout(()=>{ doLogout(true); }, ms);
}

// ── LOGOUT ──
function doLogout(auto=false){
  clearTimeout(midnightTimer);
  stopRosterPolling(); // stop background sync on logout
  sessionStorage.removeItem('bds_user_'+getTodayGY());
  currentUser = null;
  auth.signOut();
  // Remove admin mode — CSS handles hiding everything
  document.body.classList.remove('is-admin');
  const adminPage = document.getElementById('page-admin');
  if(adminPage) adminPage.classList.remove('admin-page-active');
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('rep-bar').classList.remove('show');
  document.getElementById('admin-badge-wrap').innerHTML='';
  document.getElementById('rep-details').innerHTML='';
  document.getElementById('login-id').value='';
  if(document.getElementById('login-pw')) document.getElementById('login-pw').value='';
  document.getElementById('pw-wrap').style.display='none';
  document.getElementById('login-err').textContent = auto ? '🔒 Session expired — please log in again.' : '';
  // Pre-load roster in background for next login
  loadRoster();
}

// ── CHECK EXISTING SESSION ──
async function checkSession(){
  // Pre-load roster in background
  loadRoster();
  const today = getTodayGY();
  const saved = sessionStorage.getItem('bds_user_'+today);
  if(saved){
    try{
      currentUser = JSON.parse(saved);
      // Reload Firebase overrides for shift/lunch/break
      if(!currentUser.isAdmin && currentUser.id){
        try{
          const snap = await db.collection('roster').doc(currentUser.id).get();
          if(snap.exists){
            const d=snap.data();
            if(d.shift) currentUser.shift=d.shift;
            if(d.lunch) currentUser.lunch=d.lunch;
            if(d.brk)   currentUser.brk=d.brk;
          }
        }catch(e){}
      }
      showDashboard();
      return;
    }catch(e){}
  }
  document.getElementById('login-screen').classList.remove('hidden');
}

// ============================================================
//  ROSTER AUTO-SYNC — polls Google Sheet every 2 minutes
//  and silently re-renders all views if anything changed.
// ============================================================
let rosterPollHash    = '';   // fingerprint of last known roster
let rosterPollTimer   = null;
const ROSTER_POLL_MS  = 2 * 60 * 1000; // 2 minutes

// Lightweight string hash (djb2) — no crypto needed
function hashString(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
    h = h >>> 0; // keep unsigned 32-bit
  }
  return h.toString(36);
}

function getRosterFingerprint() {
  // Sort by userId so order changes don't trigger false positives
  return hashString(JSON.stringify(
    Object.values(ROSTER)
      .sort((a,b) => String(a.userId).localeCompare(String(b.userId)))
      .map(a => ({ id:a.userId, name:a.name, team:a.team, shift:a.shift, lunch:a.lunch, status:a.status }))
  ));
}

function showRosterToast(msg) {
  // Remove any existing toast first
  const old = document.getElementById('roster-sync-toast');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.id = 'roster-sync-toast';
  toast.textContent = msg;
  Object.assign(toast.style, {
    position:       'fixed',
    bottom:         '24px',
    left:           '50%',
    transform:      'translateX(-50%)',
    background:     '#0d2a1a',
    border:         '1px solid #34d399',
    color:          '#34d399',
    padding:        '10px 22px',
    borderRadius:   '10px',
    fontSize:       '0.78rem',
    fontFamily:     "'Barlow Condensed', sans-serif",
    fontWeight:     '800',
    letterSpacing:  '1.5px',
    textTransform:  'uppercase',
    zIndex:         '99999',
    boxShadow:      '0 4px 20px rgba(52,211,153,0.25)',
    opacity:        '0',
    transition:     'opacity 0.3s ease',
    pointerEvents:  'none',
    whiteSpace:     'nowrap'
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; });
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

async function pollRoster() {
  try {
    // Silent reload — don't touch rosterLoaded flag so UI stays usable
    const data = await callBridge({ action: 'getRoster' });
    if (!data || !data.success || !data.agents) return;

    // Rebuild a temporary roster map from fresh data
    const fresh = {};
    data.agents.forEach(rawA => {
      const a = {
        userId:   rawA.userId   || rawA.userid   || rawA.UserId   || rawA.user_id   || '',
        name:     rawA.name     || rawA.Name      || rawA.agentName || rawA.agentname || '',
        ytelName: rawA.ytelName || rawA.ytelname  || rawA.YtelName  || rawA['Ytel Name'] || rawA['ytel name'] || rawA['ytel_name'] || '',
        team:     rawA.team     || rawA.Team      || '',
        shift:    rawA.shift    || rawA.Shift     || '',
        lunch:    rawA.lunch    || rawA.Lunch     || '',
        status:   rawA.status   || rawA.Status    || '',
        inactive: rawA.inactive || false,
      };
      if (!a.userId) return;
      const statusLow = (a.status || '').toLowerCase().trim();
      if (statusLow === 'inactive') return;
      if (INACTIVE_AGENTS.some(n => n.toLowerCase() === a.name.toLowerCase())) return;

      let team = 'BB';
      if (a.ytelName) {
        const yn = a.ytelName.toUpperCase().replace(/[\s\-_]/g, '');
        if (yn.startsWith('GUYP') || yn.includes('GUYP')) team = 'PR';
        else if (yn.startsWith('GUYB') || yn.includes('GUYB')) team = 'BB';
        else if (a.team) team = normalizeTeam(a.team);
      } else if (a.team) {
        team = normalizeTeam(a.team);
      }
      fresh[String(a.userId).trim()] = {
        userId:   String(a.userId).trim(),
        name:     a.name,
        ytelName: a.ytelName,
        shift:    a.shift  || '',
        lunch:    a.lunch  || '',
        brk:      '',
        team,
        status:   a.status || 'Agent'
      };
    });

    // Compute fingerprint of new data
    const newHash = hashString(JSON.stringify(
      Object.values(fresh)
        .sort((a,b) => String(a.userId).localeCompare(String(b.userId)))
        .map(a => ({ id:a.userId, name:a.name, team:a.team, shift:a.shift, lunch:a.lunch, status:a.status }))
    ));

    if (newHash === rosterPollHash) return; // nothing changed — do nothing

    // ── Something changed — figure out what and notify ──
    const oldCount   = Object.keys(ROSTER).length;
    const newCount   = Object.keys(fresh).length;
    const diff       = newCount - oldCount;

    // Check for field changes (shift, lunch, team, name) on existing agents
    let fieldChanges = 0;
    Object.values(fresh).forEach(a => {
      const old = ROSTER[a.userId];
      if (old && (old.shift !== a.shift || old.lunch !== a.lunch || old.team !== a.team || old.name !== a.name || old.status !== a.status)) {
        fieldChanges++;
      }
    });

    // Apply the fresh roster
    // Preserve Firebase-only entries (not returned by Sheet) that are still valid
    // but skip entries that are duplicates of a Sheet agent (same name, different userId)
    const freshNames = new Set(Object.values(fresh).map(a => (a.name||'').toLowerCase().trim()));
    Object.keys(ROSTER).forEach(uid => {
      if (!fresh[uid]) {
        const entryName = (ROSTER[uid].name||'').toLowerCase().trim();
        if (freshNames.has(entryName)) {
          // Same person is already in fresh from the Sheet — don't add the stale Firebase duplicate
          console.log('pollRoster: skipping Firebase duplicate for', ROSTER[uid].name);
          return;
        }
        // Keep Firebase-only agents unless they're now in the Sheet as inactive
        fresh[uid] = ROSTER[uid];
      }
    });
    ROSTER        = fresh;
    rosterLoaded  = true;
    rosterPollHash = newHash;

    // Build toast message
    let toastMsg = '🔄 Roster synced';
    if (diff > 0)          toastMsg = `✅ Roster updated — ${diff} agent${diff>1?'s':''} added`;
    else if (diff < 0)     toastMsg = `🗑 Roster updated — ${Math.abs(diff)} agent${Math.abs(diff)>1?'s':''} removed`;
    else if (fieldChanges) toastMsg = `✏️ Roster updated — ${fieldChanges} agent${fieldChanges>1?'s':''} changed`;
    showRosterToast(toastMsg);

    // Re-render all active views silently
    if (typeof renderAttTable    === 'function') renderAttTable();
    if (typeof renderProfileList === 'function') renderProfileList();
    if (typeof renderStatsTable  === 'function' && statsData.length) renderStatsTable();
    if (typeof reRenderMonthly   === 'function') reRenderMonthly();
    // Reload overview board if it is currently visible
    const ovEl2 = document.getElementById('admin-overview');
    if (ovEl2 && ovEl2.style.display !== 'none' && typeof loadAdminOverview === 'function') loadAdminOverview();
    // Reload weekly attendance only if that tab is currently visible
    const wkEl = document.getElementById('admin-weekly');
    if (wkEl && wkEl.style.display !== 'none' && typeof loadWeeklyAttendance === 'function') {
      loadWeeklyAttendance(weeklyTeam || 'BB');
    }

    console.log('🔄 Roster auto-synced:', newCount, 'agents | diff:', diff, '| field changes:', fieldChanges);
  } catch(e) {
    // Silent fail — polling is non-critical, never show errors to user
    console.warn('Roster poll failed (non-fatal):', e);
  }
}

function startRosterPolling() {
  // Take initial fingerprint from whatever loadRoster() already loaded
  rosterPollHash = getRosterFingerprint();
  // Clear any existing timer (safety measure against double-init)
  if (rosterPollTimer) clearInterval(rosterPollTimer);
  rosterPollTimer = setInterval(pollRoster, ROSTER_POLL_MS);
  console.log('🕐 Roster polling started — every', ROSTER_POLL_MS / 60000, 'minutes');
}

function stopRosterPolling() {
  if (rosterPollTimer) { clearInterval(rosterPollTimer); rosterPollTimer = null; }
}

// ── END ROSTER AUTO-SYNC ──

window.addEventListener('load',()=>{ checkSession(); });

function init(){
  loadScript('intro');
  loadObjection('not_interested');
  startClocks();
  const pw=['FIXED-RATE','5.49% APR','SOFT CREDIT CHECK','LENDING SPECIALIST','LIMITED TIME','LOAN AMOUNTS','MONTHLY PAYMENTS','ELIGIBILITY','LENDING PARTNER NETWORK','PRE-QUALIFICATION'];
  const el=document.getElementById('punch-words');
  if(el) el.innerHTML=pw.map(w=>`<div style="background:var(--purple-light);border:1.5px solid #c4b5fd;border-radius:7px;padding:7px;text-align:center;font-size:0.58rem;font-weight:800;color:var(--purple);">${w}</div>`).join('');
}

function startClocks(){
  const zones=[
    {id:'clock-et',tz:'America/New_York'},
    {id:'clock-ct',tz:'America/Chicago'},
    {id:'clock-mt',tz:'America/Denver'},
    {id:'clock-pt',tz:'America/Los_Angeles'},
    {id:'clock-ak',tz:'America/Anchorage'},
    {id:'clock-hi',tz:'Pacific/Honolulu'}
  ];
  function tick(){
    zones.forEach(z=>{
      const el=document.getElementById(z.id);
      if(!el)return;
      el.textContent=new Date().toLocaleTimeString('en-US',{timeZone:z.tz,hour:'2-digit',minute:'2-digit',hour12:true});
    });
  }
  tick();setInterval(tick,1000);
}

// ── COACHING & MONITORING ──
let allCoachingNotes   = [];
let allMonitoringNotes = [];

// Populate rep name datalists
function populateRepDatalist(id){
  const dl = document.getElementById(id);
  if(!dl) return;
  dl.innerHTML = Object.values(ROSTER).sort((a,b)=>a.name.localeCompare(b.name))
    .map(a=>`<option value="${a.name}">`).join('');
}

// ── COACHING ──
function openCoachingForm(){
  populateRepDatalist('cn-rep-list');
  document.getElementById('coaching-form').style.display='';
  document.getElementById('cn-rep').focus();
  document.getElementById('cn-save-status').textContent='';
}
function closeCoachingForm(){
  document.getElementById('coaching-form').style.display='none';
  ['cn-rep','cn-admin','cn-discussion','cn-goal','cn-keypoints','cn-advice','cn-outcome']
    .forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
}

async function saveCoachingNote(){
  const repName    = document.getElementById('cn-rep').value.trim();
  const adminName  = document.getElementById('cn-admin').value.trim();
  const discussion = document.getElementById('cn-discussion').value.trim();
  const goal       = document.getElementById('cn-goal').value.trim();
  const keypoints  = document.getElementById('cn-keypoints').value.trim();
  const advice     = document.getElementById('cn-advice').value.trim();
  const outcome    = document.getElementById('cn-outcome').value.trim();
  const statusEl   = document.getElementById('cn-save-status');

  if(!repName||!adminName){ statusEl.textContent='⚠ Rep name and admin name are required.'; statusEl.style.color='var(--red)'; return; }
  if(!discussion&&!goal&&!keypoints){ statusEl.textContent='⚠ Fill in at least Discussion, Goal or Key Points.'; statusEl.style.color='var(--red)'; return; }

  statusEl.textContent='Saving...'; statusEl.style.color='var(--muted)';

  // Fuzzy match roster — exact first, then partial
  const rAll = Object.values(ROSTER);
  const rAgent = rAll.find(r=>r.name.toLowerCase()===repName.toLowerCase())
              || rAll.find(r=>r.name.toLowerCase().includes(repName.toLowerCase()))
              || rAll.find(r=>repName.toLowerCase().includes(r.name.toLowerCase().split(' ')[0]));

  try{
    await db.collection('coaching_sessions').add({
      type:      'coaching',
      repName:   rAgent ? rAgent.name : repName,
      repId:     rAgent ? String(rAgent.userId) : 'unknown',
      repTeam:   rAgent ? rAgent.team : '',
      adminName, discussion, goal, keypoints, advice, outcome,
      date:      getTodayGY(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    statusEl.textContent='✅ Coaching note saved!'; statusEl.style.color='var(--green)';
    setTimeout(()=>{ closeCoachingForm(); loadCoachingNotes(); }, 800);
  }catch(e){ statusEl.textContent='❌ Error: '+e.message; statusEl.style.color='var(--red)'; }
}

async function loadCoachingNotes(){
  try{
    const snap = await db.collection('coaching_sessions')
      .where('type','==','coaching')
      .orderBy('createdAt','desc')
      .limit(50)
      .get();
    allCoachingNotes=[];
    snap.forEach(doc=>allCoachingNotes.push({id:doc.id,...doc.data()}));
    renderCoachingNotes(allCoachingNotes);
  }catch(e){ console.error('Load coaching:',e); }
}

function filterCoachingNotes(){
  const q    = (document.getElementById('coach-search')||{value:''}).value.toLowerCase();
  const team = (document.getElementById('coach-team-filter')||{value:'all'}).value;
  const filtered = allCoachingNotes.filter(n=>
    (!q || n.repName.toLowerCase().includes(q)) &&
    (team==='all' || n.repTeam===team)
  );
  renderCoachingNotes(filtered);
}

function renderCoachingNotes(notes){
  const feed = document.getElementById('coaching-notes-feed');
  if(!feed) return;
  if(!notes.length){ feed.innerHTML='<div style="text-align:center;color:var(--muted);padding:24px;">No coaching notes yet. Click + Add Note to create one.</div>'; return; }
  feed.innerHTML = notes.map(n=>renderNoteCard(n,'coaching')).join('');
}

// ── MONITORING ──
function openMonitoringForm(){
  populateRepDatalist('mn-rep-list');
  document.getElementById('monitoring-form').style.display='';
  document.getElementById('mn-rep').focus();
  document.getElementById('mn-save-status').textContent='';
}
function closeMonitoringForm(){
  document.getElementById('monitoring-form').style.display='none';
  ['mn-rep','mn-admin','mn-dial','mn-voice','mn-script','mn-objection','mn-points']
    .forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
}

async function saveMonitoringNote(){
  const repName  = document.getElementById('mn-rep').value.trim();
  const adminName= document.getElementById('mn-admin').value.trim();
  const dial     = document.getElementById('mn-dial').value.trim();
  const voice    = document.getElementById('mn-voice').value.trim();
  const script   = document.getElementById('mn-script').value.trim();
  const objection= document.getElementById('mn-objection').value.trim();
  const points   = document.getElementById('mn-points').value.trim();
  const statusEl = document.getElementById('mn-save-status');

  if(!repName||!adminName){ statusEl.textContent='⚠ Rep name and admin name are required.'; statusEl.style.color='var(--red)'; return; }
  statusEl.textContent='Saving...'; statusEl.style.color='var(--muted)';

  // Fuzzy match roster
  const rAll = Object.values(ROSTER);
  const rAgent = rAll.find(r=>r.name.toLowerCase()===repName.toLowerCase())
              || rAll.find(r=>r.name.toLowerCase().includes(repName.toLowerCase()))
              || rAll.find(r=>repName.toLowerCase().includes(r.name.toLowerCase().split(' ')[0]));

  try{
    await db.collection('coaching_sessions').add({
      type:      'monitoring',
      repName:   rAgent ? rAgent.name : repName,
      repId:     rAgent ? String(rAgent.userId) : 'unknown',
      repTeam:   rAgent ? rAgent.team : '',
      adminName,
      dial, voice, script, objection, points,
      date:      getTodayGY(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    statusEl.textContent='✅ Monitoring session saved!'; statusEl.style.color='var(--green)';
    setTimeout(()=>{ closeMonitoringForm(); loadMonitoringNotes(); }, 800);
  }catch(e){
    statusEl.textContent='❌ Error: '+e.message; statusEl.style.color='var(--red)';
  }
}

async function loadMonitoringNotes(){
  try{
    const snap = await db.collection('coaching_sessions')
      .where('type','==','monitoring')
      .orderBy('createdAt','desc')
      .limit(50)
      .get();
    allMonitoringNotes=[];
    snap.forEach(doc=>allMonitoringNotes.push({id:doc.id,...doc.data()}));
    renderMonitoringNotes(allMonitoringNotes);
  }catch(e){ console.error('Load monitoring:',e); }
}

function filterMonitoringNotes(){
  const q    = (document.getElementById('monitor-search')||{value:''}).value.toLowerCase();
  const team = (document.getElementById('monitor-team-filter')||{value:'all'}).value;
  const filtered = allMonitoringNotes.filter(n=>
    (!q || n.repName.toLowerCase().includes(q)) &&
    (team==='all' || n.repTeam===team)
  );
  renderMonitoringNotes(filtered);
}

function renderMonitoringNotes(notes){
  const feed = document.getElementById('monitoring-notes-feed');
  if(!feed) return;
  if(!notes.length){ feed.innerHTML='<div style="text-align:center;color:var(--muted);padding:24px;">No monitoring sessions yet. Click + Add Session to create one.</div>'; return; }
  feed.innerHTML = notes.map(n=>renderNoteCard(n,'monitoring')).join('');
}

// ── SHARED NOTE CARD RENDERER — with Edit & Delete ──
function renderNoteCard(n, type){
  const isMonitor   = type==='monitoring';
  const accentColor = isMonitor ? 'var(--purple)' : 'var(--accent)';
  const typeLabel   = isMonitor ? '🎧 LIVE MONITORING' : '📝 COACHING';
  const date = n.date || '—';
  const time = n.createdAt ? new Date(n.createdAt.seconds*1000).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',timeZone:'America/Guyana'}) : '';
  const team = n.repTeam==='BB'
    ? `<span style="color:var(--accent);font-size:0.62rem;font-weight:800;background:rgba(96,165,250,0.1);padding:2px 7px;border-radius:4px;">BB</span>`
    : n.repTeam==='PR'
    ? `<span style="color:var(--purple);font-size:0.62rem;font-weight:800;background:rgba(167,139,250,0.1);padding:2px 7px;border-radius:4px;">PR</span>`
    : '';

  const field = (label, val, full) => !val ? '' : `
    <div style="background:#060b18;border:1px solid #111c30;border-radius:8px;padding:10px;${full?'grid-column:1/-1':''}">
      <div style="font-size:0.55rem;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:${accentColor};margin-bottom:5px;opacity:0.8;">${label}</div>
      <div style="font-size:0.8rem;color:#cbd5e1;line-height:1.7;white-space:pre-wrap;">${val}</div>
    </div>`;

  // Determine fields based on type
  const fieldsHtml = isMonitor
    ? field('📞 Dial Behavior',n.dial,false)+field('🎙 Voice & Tone',n.voice,false)+field('📋 Script & Engagement',n.script,false)+field('🛡 Objection Handling',n.objection,false)+field('⭐ Coaching Points',n.points,true)
    : field('💬 Discussion',n.discussion,false)+field('🎯 Goal',n.goal,false)+field('🔑 Key Points',n.keypoints,true)+field('💡 My Advice',n.advice,false)+field('✅ Outcome',n.outcome,false);

  const docId = n.id||'';

  return `<div id="note-card-${docId}" style="background:#070e1c;border:1px solid #1a2a45;border-left:3px solid ${accentColor};border-radius:10px;padding:14px 16px;margin-bottom:12px;">

    <!-- Header -->
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap;gap:6px;">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <span style="font-family:'Barlow Condensed',sans-serif;font-size:1.15rem;font-weight:800;color:var(--text);cursor:pointer;" onclick="openRepProfileByName('${n.repName}')">${n.repName}</span>
        ${team}
        <span style="font-size:0.6rem;color:${accentColor};font-weight:800;letter-spacing:1px;">${typeLabel}</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <div style="text-align:right;">
          <div style="font-size:0.68rem;color:var(--text);font-weight:700;">${date} ${time}</div>
          <div style="font-size:0.62rem;color:var(--muted);">By: <strong style="color:var(--text);">${n.adminName||'—'}</strong></div>
        </div>
        <button onclick="editNoteCard('${docId}','${type}')" title="Edit" style="padding:5px 10px;border-radius:7px;border:1px solid rgba(251,191,36,0.3);background:rgba(251,191,36,0.08);color:#fbbf24;font-size:0.7rem;font-weight:800;cursor:pointer;font-family:'Barlow Condensed',sans-serif;letter-spacing:1px;">✏️ EDIT</button>
        <button onclick="deleteNoteCard('${docId}','${type}')" title="Delete" style="padding:5px 10px;border-radius:7px;border:1px solid rgba(248,113,113,0.3);background:rgba(248,113,113,0.08);color:#f87171;font-size:0.7rem;font-weight:800;cursor:pointer;font-family:'Barlow Condensed',sans-serif;letter-spacing:1px;">🗑 DEL</button>
      </div>
    </div>

    <!-- Fields -->
    <div id="note-fields-${docId}" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      ${fieldsHtml}
    </div>

    <!-- Inline edit form (hidden by default) -->
    <div id="note-edit-${docId}" style="display:none;margin-top:12px;background:#060b18;border:1px solid #1e3050;border-radius:10px;padding:14px;">
      <div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${accentColor};margin-bottom:12px;">✏️ EDITING SESSION</div>
      ${isMonitor ? `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
          ${editField('Dial Behavior','ne-dial-'+docId, n.dial||'')}
          ${editField('Voice & Tone','ne-voice-'+docId, n.voice||'')}
          ${editField('Script & Engagement','ne-script-'+docId, n.script||'')}
          ${editField('Objection Handling','ne-objection-'+docId, n.objection||'')}
        </div>
        ${editFieldFull('Coaching Points','ne-points-'+docId, n.points||'')}
      ` : `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
          ${editField('Discussion','ne-discussion-'+docId, n.discussion||'')}
          ${editField('Goal','ne-goal-'+docId, n.goal||'')}
          ${editField('My Advice','ne-advice-'+docId, n.advice||'')}
          ${editField('Outcome','ne-outcome-'+docId, n.outcome||'')}
        </div>
        ${editFieldFull('Key Points','ne-keypoints-'+docId, n.keypoints||'')}
      `}
      <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;">
        <button onclick="saveNoteEdit('${docId}','${type}')" style="padding:8px 18px;border-radius:8px;border:none;background:var(--green);color:#000;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:0.85rem;cursor:pointer;letter-spacing:1px;">💾 SAVE CHANGES</button>
        <button onclick="cancelNoteEdit('${docId}')" style="padding:8px 14px;border-radius:8px;border:1px solid #2a3a5a;background:transparent;color:var(--muted);font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:0.85rem;cursor:pointer;">Cancel</button>
        <span id="note-edit-status-${docId}" style="font-size:0.7rem;padding:8px 0;"></span>
      </div>
    </div>
  </div>`;
}

function editField(label, id, val){
  return `<div>
    <div style="font-size:0.5rem;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;margin-bottom:4px;">${label}</div>
    <textarea id="${id}" rows="3" style="width:100%;padding:8px;background:#0a1020;border:1px solid #2a3a5a;border-radius:7px;color:#e2e8f0;font-size:0.78rem;font-family:'Nunito',sans-serif;resize:vertical;outline:none;box-sizing:border-box;">${val}</textarea>
  </div>`;
}
function editFieldFull(label, id, val){
  return `<div>
    <div style="font-size:0.5rem;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;margin-bottom:4px;">${label}</div>
    <textarea id="${id}" rows="4" style="width:100%;padding:8px;background:#0a1020;border:1px solid #2a3a5a;border-radius:7px;color:#e2e8f0;font-size:0.78rem;font-family:'Nunito',sans-serif;resize:vertical;outline:none;box-sizing:border-box;">${val}</textarea>
  </div>`;
}

function editNoteCard(docId, type){
  document.getElementById('note-fields-'+docId).style.display='none';
  document.getElementById('note-edit-'+docId).style.display='';
}

function cancelNoteEdit(docId){
  document.getElementById('note-fields-'+docId).style.display='';
  document.getElementById('note-edit-'+docId).style.display='none';
}

async function saveNoteEdit(docId, type){
  const statusEl = document.getElementById('note-edit-status-'+docId);
  if(statusEl){ statusEl.textContent='Saving...'; statusEl.style.color='var(--muted)'; }
  const isMonitor = type==='monitoring';

  const g = id => { const el=document.getElementById(id); return el?el.value.trim():''; };

  const updates = isMonitor ? {
    dial:      g('ne-dial-'+docId),
    voice:     g('ne-voice-'+docId),
    script:    g('ne-script-'+docId),
    objection: g('ne-objection-'+docId),
    points:    g('ne-points-'+docId),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  } : {
    discussion: g('ne-discussion-'+docId),
    goal:       g('ne-goal-'+docId),
    advice:     g('ne-advice-'+docId),
    outcome:    g('ne-outcome-'+docId),
    keypoints:  g('ne-keypoints-'+docId),
    updatedAt:  firebase.firestore.FieldValue.serverTimestamp()
  };

  try{
    await db.collection('coaching_sessions').doc(docId).update(updates);
    if(statusEl){ statusEl.textContent='✅ Saved!'; statusEl.style.color='var(--green)'; }
    setTimeout(()=>{
      if(type==='monitoring') loadMonitoringNotes();
      else loadCoachingNotes();
      // Reload agent profile sessions if open
      if(currentRepProfile){ apLoadSessions(currentRepProfile.id, type); }
    }, 600);
  }catch(e){
    if(statusEl){ statusEl.textContent='❌ '+e.message; statusEl.style.color='var(--red)'; }
  }
}

async function deleteNoteCard(docId, type){
  if(!confirm('Delete this session permanently? This cannot be undone.')) return;
  try{
    await db.collection('coaching_sessions').doc(docId).delete();
    const card = document.getElementById('note-card-'+docId);
    if(card){ card.style.opacity='0'; card.style.transition='opacity 0.3s'; setTimeout(()=>card.remove(),300); }
    // Reload counts if agent profile is open
    if(currentRepProfile){ apLoadOverview(currentRepProfile.id, currentRepProfile.name); }
  }catch(e){ alert('Could not delete: '+e.message); }
}

// Open rep profile from coaching/monitoring card
function openRepProfileByName(name){
  const agent = Object.values(ROSTER).find(r=>r.name.toLowerCase()===name.toLowerCase());
  if(agent) openRepProfile(agent.userId, agent.name, agent.team, agent.shift);
}

// Load coaching & monitoring notes in rep profile coach tab
async function loadRepCoach(id){
  const list = document.getElementById('coach-notes-list');
  if(!list) return;
  list.innerHTML='<div style="color:var(--muted);font-size:0.78rem;">Loading...</div>';
  const renderNotes = docs => {
    if(!docs.length){ list.innerHTML='<div style="color:var(--muted);font-size:0.78rem;">No coaching or monitoring notes yet.</div>'; return; }
    list.innerHTML = docs.map(d=>{
      const isMonitor = d.type==='monitoring';
      const color = isMonitor?'var(--purple)':'var(--accent)';
      const label = isMonitor?'🎧 Live Monitoring':'📝 Coaching';
      const date  = d.createdAt ? new Date(d.createdAt.seconds*1000).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'America/Guyana'}) : d.date||'—';
      const fields = [
        ['💬 Discussion',          d.discussion],
        ['🎯 Goal',                d.goal],
        ['🔑 Key Discussion Points', d.keypoints],
        ['💡 My Advice',           d.advice],
        ['✅ Outcome',             d.outcome],
        // Legacy fields fallback
        ['📞 Dial Behavior',       d.dial],
        ['🎙 Voice & Tone',        d.voice],
        ['📋 Script',              d.script],
        ['🛡 Objection Handling',  d.objection],
        ['⭐ Coaching Points',     d.points],
      ].filter(f=>f[1]);
      return `<div class="note-item" style="border-left:2px solid ${color};margin-bottom:10px;">
        <div class="note-date" style="display:flex;justify-content:space-between;margin-bottom:5px;">
          <span style="color:${color};font-weight:800;">${label}</span>
          <span>${date} · Admin: <strong style="color:var(--text);">${d.adminName||'—'}</strong></span>
        </div>
        ${fields.map(f=>`<div style="margin-top:5px;"><span style="font-size:0.58rem;font-weight:800;color:var(--muted);text-transform:uppercase;">${f[0]}: </span><span style="color:#cbd5e1;">${f[1]}</span></div>`).join('')}
      </div>`;
    }).join('');
  };
  try{
    const snap = await db.collection('coaching_sessions')
      .where('repId','==',String(id))
      .orderBy('createdAt','desc').limit(20).get();
    const docs=[]; snap.forEach(doc=>docs.push(doc.data()));
    renderNotes(docs);
  }catch(e){
    // Fallback without ordering (index may not exist yet)
    try{
      const snap2 = await db.collection('coaching_sessions').where('repId','==',String(id)).get();
      const docs=[]; snap2.forEach(doc=>docs.push(doc.data()));
      docs.sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));
      renderNotes(docs);
    }catch(e2){ list.innerHTML='<div style="color:var(--muted);">Could not load notes.</div>'; }
  }
}
let selectedProfileId = null;

function autoFillYtel(){
  const nameVal = document.getElementById('nr-name').value.trim();
  const team    = document.getElementById('nr-team').value;
  const ytelEl  = document.getElementById('nr-ytel');
  if(!nameVal) return;
  // Format: "GUYB First Last" (BB) or "GUYP First Last" (PR)
  // e.g. "Kleon Williams" + BB → "GUYB Kleon Williams"
  // e.g. "Priya Sookram"  + PR → "GUYP Priya Sookram"
  const prefix = team === 'PR' ? 'GUYP ' : 'GUYB ';
  // Only auto-fill if empty or was previously auto-filled (starts with GUY)
  if(!ytelEl.value || ytelEl.value.startsWith('GUY')){
    ytelEl.value = prefix + nameVal;
  }
}

function toggleAddRepForm(){
  const form = document.getElementById('add-rep-form');
  const btn  = document.getElementById('add-rep-toggle-btn');
  const open = form.style.display === 'none';
  form.style.display = open ? '' : 'none';
  btn.textContent = open ? '✕ CANCEL' : '＋ ADD NEW REP';
  btn.style.background = open ? 'transparent' : 'linear-gradient(90deg,var(--green),var(--cyan))';
  btn.style.border = open ? '1px solid var(--border)' : 'none';
  btn.style.color = open ? 'var(--muted)' : '#000';
  if(open){
    document.getElementById('nr-name').value='';
    document.getElementById('nr-id').value='';
    document.getElementById('nr-ytel').value='';
    document.getElementById('nr-lunch').value='';
    document.getElementById('nr-status-msg').textContent='';
  }
}

async function saveNewRep(){
  const msgEl = document.getElementById('nr-status-msg');
  const name   = document.getElementById('nr-name').value.trim();
  const idVal  = document.getElementById('nr-id').value.trim();
  const team   = document.getElementById('nr-team').value;
  const ytel   = document.getElementById('nr-ytel').value.trim();
  const shift  = document.getElementById('nr-shift').value;
  const lunch  = document.getElementById('nr-lunch').value.trim();
  const status = document.getElementById('nr-status').value;

  // Validate required fields
  if(!name){ msgEl.style.color='var(--red)'; msgEl.textContent='⚠️ Full name is required.'; return; }
  if(!idVal){ msgEl.style.color='var(--red)'; msgEl.textContent='⚠️ User ID is required.'; return; }
  if(isNaN(idVal)||idVal===''){ msgEl.style.color='var(--red)'; msgEl.textContent='⚠️ User ID must be a number.'; return; }
  if(!ytel){ msgEl.style.color='var(--red)'; msgEl.textContent='⚠️ Ytel Name is required (e.g. GUYB John Smith or GUYP John Smith).'; return; }

  // Check for duplicate ID
  if(ROSTER[String(idVal)]){ msgEl.style.color='var(--red)'; msgEl.textContent='⚠️ A rep with ID '+idVal+' already exists: '+ROSTER[String(idVal)].name; return; }

  msgEl.style.color='var(--gold)'; msgEl.textContent='⏳ Saving to Google Sheet...';

  let sheetOk = false;
  let fireOk  = false;
  const errors = [];

  // 1. Write to Google Sheet via bridge
  try{
    const r = await callBridge({
      action:    'addAgent',
      ytelName:  ytel,
      agentName: name,
      userId:    idVal,
      team,
      shift,
      lunch,
      status
    });
    if(r && r.success){ sheetOk = true; }
    else { errors.push('Sheet: '+(r&&r.error?r.error:'Unknown error')); }
  }catch(e){ errors.push('Sheet bridge failed — rep added to Firebase only'); }

  // 2. Write to Firebase roster so they can log in immediately
  try{
    await db.collection('roster').doc(String(idVal)).set({
      userId: String(idVal),
      name,
      team,
      ytelName: ytel||'',
      shift:  shift||'',
      lunch:  lunch||'',
      brk:    '',
      status,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    fireOk = true;
  }catch(e){ errors.push('Firebase: '+e.message); }

  if(!fireOk && !sheetOk){
    msgEl.style.color='var(--red)'; msgEl.textContent='❌ Failed to save. '+errors.join(' | ');
    return;
  }

  // Update local ROSTER so the rep appears immediately without a full reload
  ROSTER[String(idVal)] = { userId:String(idVal), name, team, ytelName:ytel||'', shift:shift||'', lunch:lunch||'', brk:'', status };

  const note = errors.length ? ' (⚠️ '+errors.join('; ')+')' : '';
  msgEl.style.color='var(--green)';
  msgEl.textContent='✅ '+name+' (ID: '+idVal+') added successfully!'+note;

  // Refresh ALL views that display the roster so the new agent appears immediately
  // in the correct alphabetical position across every tab
  setTimeout(async ()=>{
    toggleAddRepForm();

    // Force a fresh roster pull from the Sheet — this picks up the alphabetical
    // insert that addAgent just performed, ensuring ROSTER is perfectly in sync
    rosterLoaded = false;
    await loadRoster();

    // Re-render every view that uses the roster
    renderProfileList();      // Profiles tab agent list
    renderAttTable();         // Attendance tab
    if(typeof renderStatsTable === 'function') renderStatsTable(); // Agent Stats tab

    // Refresh the live overview board (online/absent chips + glance counts)
    const ovEl = document.getElementById('admin-overview');
    if(ovEl && ovEl.style.display !== 'none') loadAdminOverview();

    // Refresh weekly attendance if it's currently open
    if(weeklyTeam){ loadWeeklyAttendance(weeklyTeam); }

    // Refresh monthly overview if open
    if(typeof reRenderMonthly === 'function') reRenderMonthly();
  }, 1800);
}

function loadAgentProfiles(){
  if(!rosterLoaded){ loadRoster().then(()=>renderProfileList()); return; }
  renderProfileList();
}

function renderProfileList(){
  const search     = (document.getElementById('profile-search')||{value:''}).value.toLowerCase();
  const teamFilter = (document.getElementById('profile-team-filter')||{value:'all'}).value;
  const container  = document.getElementById('profile-list');
  if(!container) return;

  const agents = Object.values(ROSTER)
    .filter(a => (teamFilter==='all'||a.team===teamFilter)
              && (!search || a.name.toLowerCase().includes(search)))
    .sort((a,b)=>a.name.localeCompare(b.name));

  if(!agents.length){
    container.innerHTML='<div style="text-align:center;color:var(--muted);padding:20px;font-size:0.82rem;">No agents found.</div>';
    return;
  }

  container.innerHTML = agents.map(a=>{
    const uid = a.userId || Object.keys(ROSTER).find(k=>ROSTER[k]===a) || '';
    const teamColor = a.team==='BB'?'var(--accent)':'var(--purple)';
    const isSelected = uid === selectedProfileId;
    return `<div
      style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #0f1e35;cursor:pointer;background:${isSelected?'#0d1a30':'transparent'};transition:background 0.12s;"
      onmouseover="this.style.background='#0a1424'" onmouseout="this.style.background='${isSelected?'#0d1a30':'transparent'}'">
      <div style="display:flex;align-items:center;gap:10px;flex:1;" onclick="openRepProfile('${uid}','${a.name.replace(/'/g,"\\'")}','${a.team}','${(a.shift||'').replace(/'/g,"\\'")}')">
        <span style="font-size:0.65rem;font-weight:800;color:${teamColor};min-width:24px;">${a.team}</span>
        <div>
          <div style="font-weight:700;font-size:0.85rem;color:var(--text);">${a.name}</div>
          <div style="font-size:0.65rem;color:var(--muted);">${a.shift||'No shift set'} ${a.lunch?'· '+a.lunch:''}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:0.65rem;color:var(--muted);">ID: ${uid}</span>
        <button onclick="event.stopPropagation();selectProfile('${uid}')"
          style="padding:3px 10px;border-radius:6px;border:1px solid #2a3a5a;background:#0d1424;color:#64748b;font-size:0.6rem;font-family:'Barlow Condensed',sans-serif;font-weight:800;cursor:pointer;letter-spacing:1px;">
          ✏️ EDIT
        </button>
      </div>
    </div>`;
  }).join('');
}

function selectProfile(userId){
  selectedProfileId = String(userId);
  renderProfileList();

  const agent = ROSTER[userId] || ROSTER[String(userId)];
  if(!agent){ console.warn('Agent not found:', userId); return; }

  const uid = agent.userId || userId;
  document.getElementById('pe-name').textContent  = agent.name;
  document.getElementById('pe-meta').textContent  = (agent.team==='BB'?'Berbice (BB)':'Providence (PR)')+' · ID: '+uid;

  // Shift — fuzzy match to dropdown option
  const shiftSel = document.getElementById('pe-shift');
  const shiftVal = (agent.shift||'').toLowerCase().replace(/\s+/g,'');
  let shiftMatched = '';
  Array.from(shiftSel.options).forEach(opt=>{
    if(opt.value && opt.value.toLowerCase().replace(/\s+/g,'') === shiftVal) shiftMatched = opt.value;
  });
  shiftSel.value = shiftMatched || agent.shift || '';

  document.getElementById('pe-lunch').value       = agent.lunch  || '';
  document.getElementById('pe-status').value      = agent.status || 'Agent';
  document.getElementById('pe-save-status').textContent = '';

  document.getElementById('pe-break').value = agent.brk || '';
  db.collection('roster').doc(String(uid)).get().then(snap=>{
    if(snap.exists && snap.data().brk)
      document.getElementById('pe-break').value = snap.data().brk;
  }).catch(()=>{});

  document.getElementById('profile-edit-panel').style.display='';
  document.getElementById('profile-edit-panel').scrollIntoView({behavior:'smooth',block:'nearest'});
}

function filterProfileList(){
  renderProfileList();
  closeProfileEdit();
}

function closeProfileEdit(){
  selectedProfileId = null;
  document.getElementById('profile-edit-panel').style.display='none';
  renderProfileList();
}

async function saveProfileEdits(){
  if(!selectedProfileId) return;
  const agent = ROSTER[selectedProfileId];
  if(!agent){ document.getElementById('pe-save-status').textContent='❌ Agent not found'; return; }

  const uid = agent.userId || selectedProfileId;

  const newShift  = document.getElementById('pe-shift').value.trim();
  const newLunch  = document.getElementById('pe-lunch').value.trim();
  const newBreak  = document.getElementById('pe-break').value.trim();
  const newStatus = document.getElementById('pe-status').value.trim();
  const statusEl  = document.getElementById('pe-save-status');
  const saveBtn   = document.querySelector('#profile-edit-panel button[onclick="saveProfileEdits()"]');

  // Show loading state on button
  if(saveBtn){ saveBtn.disabled=true; saveBtn.textContent='⏳ SAVING...'; saveBtn.style.opacity='0.7'; }
  statusEl.textContent = 'Saving to Google Sheet...';
  statusEl.style.color = '#64748b';

  const errors  = [];
  const updates = [];

  if(newShift !== (agent.shift||'')){
    try{
      const r = await callBridge({action:'updateRosterField', userId:uid, field:'shift', value:newShift});
      if(r && r.success){ ROSTER[selectedProfileId].shift=newShift; updates.push('Shift'); }
      else errors.push('Shift: '+(r?.error||'failed'));
    }catch(e){ errors.push('Shift error'); }
  }

  if(newLunch !== (agent.lunch||'')){
    try{
      const r = await callBridge({action:'updateRosterField', userId:uid, field:'lunch', value:newLunch});
      if(r && r.success){ ROSTER[selectedProfileId].lunch=newLunch; updates.push('Lunch'); }
      else errors.push('Lunch: '+(r?.error||'failed'));
    }catch(e){ errors.push('Lunch error'); }
  }

  if(newStatus !== (agent.status||'')){
    try{
      const r = await callBridge({action:'updateRosterField', userId:uid, field:'status', value:newStatus});
      if(r && r.success){
        ROSTER[selectedProfileId].status = newStatus;
        if(newStatus.toLowerCase()==='inactive'){ delete ROSTER[selectedProfileId]; closeProfileEdit(); }
        updates.push('Status');
      } else errors.push('Status: '+(r?.error||'failed'));
    }catch(e){ errors.push('Status error'); }
  }

  if(newBreak !== (agent.brk||'')){
    try{
      await db.collection('roster').doc(String(uid)).set({brk:newBreak},{merge:true});
      ROSTER[selectedProfileId].brk = newBreak;
      updates.push('Break');
    }catch(e){ errors.push('Break error'); }
  }

  // Push shift+lunch to Firebase so agent sees on next login
  try{
    const fbUp = {};
    if(newShift) fbUp.shift = newShift;
    if(newLunch) fbUp.lunch = newLunch;
    if(Object.keys(fbUp).length) await db.collection('roster').doc(String(uid)).set(fbUp,{merge:true});
  }catch(e){}

  // Restore button
  if(saveBtn){
    saveBtn.disabled=false;
    saveBtn.style.opacity='1';
    if(errors.length){ saveBtn.textContent='⚠️ RETRY SAVE'; }
    else { saveBtn.innerHTML='✅ DONE — SAVED TO GOOGLE SHEET'; }
    setTimeout(()=>{ if(saveBtn) saveBtn.innerHTML='💾 SAVE ALL CHANGES TO GOOGLE SHEET'; },3500);
  }

  if(errors.length){
    statusEl.textContent = '⚠ Errors: '+errors.join(' · ');
    statusEl.style.color = '#fbbf24';
  } else if(updates.length){
    statusEl.textContent = '✅ '+updates.join(', ')+' saved successfully';
    statusEl.style.color = '#34d399';
    renderProfileList();
    setTimeout(()=>{ statusEl.textContent=''; },4000);
  } else {
    statusEl.textContent = 'No changes detected.';
    statusEl.style.color = '#64748b';
    setTimeout(()=>{ statusEl.textContent=''; },2000);
  }
}

function switchTab(tab){
  document.querySelectorAll('.tab-page').forEach(p=>{
    p.classList.remove('active');
    p.classList.remove('admin-page-active');
  });
  document.querySelectorAll('.tab-btn,.admin-tab-btn').forEach(b=>b.classList.remove('active'));
  const page=document.getElementById('page-'+tab);
  const btn=document.getElementById('tab-'+tab);
  if(page) page.classList.add('active');
  if(btn) btn.classList.add('active');
}

function loadScript(key){
  const s=S[key];if(!s)return;
  const d=document.getElementById('sdisplay');
  const nb=document.getElementById('nav-btns');
  if(!d || !nb) {
    // Wait for the lazy-fetch to finish injecting the tab HTML into the DOM
    setTimeout(() => loadScript(key), 100);
    return;
  }
  document.querySelectorAll('#page-script .sub-tab').forEach(el=>el.classList.toggle('active',el.id==='stab-'+key));
  d.innerHTML=`<div style="font-family:'Barlow Condensed',sans-serif;font-size:0.65rem;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:${s.color};margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid var(--border);">${s.phase}</div>${s.content}`;
  d.scrollTop=0;nb.innerHTML='';
  if(s.next){const b=document.createElement('button');b.className='btn btn-p btn-f';b.innerText='\u2192 NEXT STEP';b.onclick=()=>loadScript(s.next);nb.appendChild(b);}
  const r=document.createElement('button');r.className='btn';r.innerText='\u21BA RESET';r.onclick=()=>loadScript('intro');nb.appendChild(r);
}

function loadObjection(key){
  const o=OBJ[key];if(!o)return;
  document.querySelectorAll('#page-objections .sub-tab').forEach(el=>el.classList.toggle('active',el.id==='stab-'+key));
  const d=document.getElementById('obj-display');
  d.innerHTML=`<div style="font-family:'Barlow Condensed',sans-serif;font-size:0.65rem;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:${o.color};margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid var(--border);">${o.phase}</div>${o.content}`;
  d.scrollTop=0;
  // ── REBUTTAL TRACKING ──
  if(currentUser && !currentUser.isAdmin){
    const today = getTodayGY();
    const docId = currentUser.id+'_'+today;
    const ref   = db.collection('rebuttal_clicks').doc(docId);
    const tsNow = Date.now(); // client timestamp in ms

    ref.get().then(snap=>{
      const dat    = snap.exists ? snap.data() : {};
      const clicks = dat.clicks  || {};
      const events = dat.events  || []; // array of {key, ts} for burst detection

      clicks[key] = (clicks[key]||0)+1;

      // Keep last 200 events max to avoid doc bloat
      events.push({key, ts: tsNow});
      if(events.length > 200) events.splice(0, events.length - 200);

      ref.set({
        id:   String(currentUser.id),
        name: currentUser.name||'',
        team: currentUser.team||'',
        date: today,
        clicks,
        events,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
      },{merge:true});
    }).catch(()=>{});
  }
}

// ── ADMIN PANEL JS ──
let currentRepProfile = null;
let statsData     = [];
let statsDataDate = ''; // tracks which date the loaded statsData is for
let statsSortCol = 3;
let statsSortDir = -1;
let adminStatsTapCount = 0;
let adminStatsTapTimer = null;
let pendingCSVData = null;
let selectedExpiryDays = 7;
let dailyGoal = 300;
let attFilter     = 'all';
let attTeamFilter = 'all'; // 'all', 'BB', 'PR'

function switchAttTeam(team, btn){
  attTeamFilter = team;
  document.querySelectorAll('[id^="att-bb"],[id^="att-pr"]').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  renderAttTable();
}
let allAttRecords = [];

let _todayReportListener = null; // holds the Firestore unsubscribe fn

function showAdminUI(){
  document.body.classList.add('is-admin');
  // Force fresh roster load immediately so all admin views have correct data
  rosterLoaded = false;
  loadRoster().then(() => {
    // Start auto-polling AFTER initial load so first fingerprint is accurate
    startRosterPolling();
  });
  // Load saved goal
  db.collection('config').doc('settings').get().then(snap=>{
    if(snap.exists && snap.data().goal){
      dailyGoal = snap.data().goal;
      const el = document.getElementById('goal-val-display');
      if(el) el.textContent = dailyGoal;
    }
  }).catch(()=>{});

  // ── REAL-TIME LISTENER: today's stats report ──
  // When any admin uploads a CSV, this fires on ALL open admin sessions
  // so the Daily Overview goal bars update automatically without a page reload.
  if(_todayReportListener) _todayReportListener(); // detach previous listener if any
  const todayStr = getTodayGY();
  _todayReportListener = db.collection('reports').doc(todayStr)
    .onSnapshot(snap=>{
      if(!snap.exists || !snap.data().statsJSON) return;
      try{
        const d = snap.data();
        // Only apply if this is newer than what we have (avoid no-op re-renders)
        if(d.statsJSON && d.date === todayStr){
          statsData = JSON.parse(d.statsJSON);
          // Team was already resolved correctly at upload time — do NOT re-resolve here.
          // Re-running resolveAgentTeam on reload causes BB/PR to swap when the ROSTER
          // is stale or an agent isn't found, because it falls back to 'BB' for everyone.
          statsDataDate = todayStr;
          updateGoalBars();
          // If the Daily Overview tab is currently open, refresh the overview too
          const ovEl = document.getElementById('admin-overview');
          if(ovEl && ovEl.style.display !== 'none') loadAdminOverview();
          // If Agent Stats tab is open, refresh its table
          const stEl = document.getElementById('admin-stats');
          if(stEl && stEl.style.display !== 'none'){
            renderStatsTable();
            renderReportHistory();
          }
        }
      }catch(e){ console.warn('Live report listener parse error:', e); }
    }, e=>{ console.warn('Live report listener error:', e); });
}

// ── SWITCH ADMIN SUBTAB ──
function switchAdminTab(tab, btn){
  // Hide all regular tab pages
  document.querySelectorAll('.tab-page').forEach(p=>{
    p.classList.remove('active');
    p.classList.remove('admin-page-active');
  });
  // Show admin page — CSS body.is-admin + .admin-page-active makes it visible
  const adminPage = document.getElementById('page-admin');
  if(adminPage) adminPage.classList.add('admin-page-active');
  // Update tab button highlight
  document.querySelectorAll('.tab-btn,.admin-tab-btn').forEach(b=>b.classList.remove('active'));
  const adminBtn = document.getElementById('tab-admin');
  if(adminBtn) adminBtn.classList.add('active');
  // Show correct sub-section
  ['overview','attendance','weekly','monthly','stats','profiles','coaching','monitoring','rebuttal','weekperf'].forEach(t=>{
    const el=document.getElementById('admin-'+t);
    if(el) el.style.display = t===tab?'':'none';
    const b=document.getElementById('atab-'+t);
    if(b) b.classList.toggle('active',t===tab);
  });
  if(tab==='profiles')    loadAgentProfiles();
  if(tab==='overview')    loadAdminOverview();
  if(tab==='attendance')  loadAdminAttendance();
  if(tab==='weekly')      loadWeeklyAttendance('BB');
  if(tab==='monthly')     loadMonthlyAttendance();
  if(tab==='coaching')    loadCoachingNotes();
  if(tab==='monitoring')  loadMonitoringNotes();
  if(tab==='rebuttal')    loadRebuttalIntel();
  if(tab==='weekperf')   loadWeeklyPerformance();
  if(tab==='stats'){
    rosterLoaded = false;
    loadRoster().then(()=>{
      // Only auto-render if statsData is already loaded AND it's from today
      if(statsData.length && statsDataDate === getTodayGY()) renderStatsTable();
      // Only auto-load a previous report if it's from TODAY
      if(!statsData.length && reportHistory.length){
        const todayReport = reportHistory.find(r=>r.date===getTodayGY());
        if(todayReport){
          const idx = reportHistory.indexOf(todayReport);
          loadReportByIndex(idx);
        }
        // If no today report exists — show empty state, don't load stale data
      }
    });
    loadReportHistory();
    adminStatsTapCount++;
    clearTimeout(adminStatsTapTimer);
    adminStatsTapTimer = setTimeout(()=>{adminStatsTapCount=0;},1800);
    if(adminStatsTapCount>=5){
      adminStatsTapCount=0;
      clearTimeout(adminStatsTapTimer);
      const tabBtn=document.getElementById('tab-admin');
      if(tabBtn){tabBtn.style.borderColor='#34d399';tabBtn.style.color='#34d399';setTimeout(()=>{tabBtn.style.borderColor='';tabBtn.style.color='';},600);}
      document.getElementById('stats-csv-upload').click();
    }
  }
}

// ── EDIT GOAL ──
async function editGoal(){
  const val = prompt('Set daily transfer goal (current: '+dailyGoal+'):',dailyGoal);
  if(!val||isNaN(val)) return;
  dailyGoal = parseInt(val);
  document.getElementById('goal-val-display').textContent = dailyGoal;
  try{ await db.collection('config').doc('settings').set({goal:dailyGoal},{merge:true}); }catch(e){}
  updateGoalBars();
}

// ── UPDATE GOAL BARS ──
function updateGoalBars(){
  const today      = getTodayGY();
  const hasToday   = statsDataDate === today && statsData.length > 0;

  const bbXfer  = hasToday ? statsData.filter(r=>r.team==='BB').reduce((s,r)=>s+r.xfer,0) : 0;
  const prXfer  = hasToday ? statsData.filter(r=>r.team==='PR').reduce((s,r)=>s+r.xfer,0) : 0;
  const combined = bbXfer + prXfer;
  const combPct  = dailyGoal > 0 ? Math.min(Math.round((combined/dailyGoal)*100),100) : 0;

  // Combined bar
  const combEl    = document.getElementById('combined-xfer');
  const combBar   = document.getElementById('combined-bar');
  const combPctEl = document.getElementById('combined-pct');
  if(combEl)    combEl.textContent    = hasToday ? combined+' / '+dailyGoal : '— / '+dailyGoal;
  if(combBar)   combBar.style.width   = combPct+'%';
  if(combPctEl) combPctEl.textContent = hasToday ? combPct+'% of goal' : 'Upload today\'s CSV to see progress';

  // BB bar
  const bbPct   = dailyGoal > 0 ? Math.min(Math.round((bbXfer/dailyGoal)*100),100) : 0;
  const bbVal   = document.getElementById('bb-xfer-val');
  const bbBar   = document.getElementById('bb-xfer-bar');
  const bbPctEl = document.getElementById('bb-xfer-pct');
  if(bbVal)   bbVal.textContent   = hasToday ? bbXfer : '—';
  if(bbBar)   bbBar.style.width   = bbPct+'%';
  if(bbPctEl) bbPctEl.textContent = hasToday ? bbXfer+' transfers' : 'No data yet';

  // PR bar
  const prPct   = dailyGoal > 0 ? Math.min(Math.round((prXfer/dailyGoal)*100),100) : 0;
  const prVal   = document.getElementById('pr-xfer-val');
  const prBar   = document.getElementById('pr-xfer-bar');
  const prPctEl = document.getElementById('pr-xfer-pct');
  if(prVal)   prVal.textContent   = hasToday ? prXfer : '—';
  if(prBar)   prBar.style.width   = prPct+'%';
  if(prPctEl) prPctEl.textContent = hasToday ? prXfer+' transfers' : 'No data yet';
}

function openTeamBreakdown(team){
  if(!statsData.length){
    alert('No CSV data loaded yet. Upload the daily CSV first in Agent Stats tab.');
    return;
  }
  const overlay = document.getElementById('team-breakdown-overlay');
  const title   = document.getElementById('tbm-title');
  const sub     = document.getElementById('tbm-subtitle');
  const totalEl = document.getElementById('tbm-total');
  const tbody   = document.getElementById('tbm-tbody');

  if(team==='BB'){
    title.textContent   = '🏠 Berbice (BB) — Rep Breakdown';
    title.style.color   = 'var(--accent)';
    totalEl.style.color = 'var(--accent)';
  } else {
    title.textContent   = '🌴 Providence (PR) — Rep Breakdown';
    title.style.color   = 'var(--purple)';
    totalEl.style.color = 'var(--purple)';
  }

  // Filter and sort by transfers desc
  const agents = statsData.filter(r=>r.team===team).sort((a,b)=>b.xfer-a.xfer);
  const teamTotal = agents.reduce((s,r)=>s+r.xfer,0);
  sub.textContent   = agents.length + ' agents · ' + getTodayGY();
  totalEl.textContent = teamTotal + ' transfers';

  if(!agents.length){
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:20px;">No data for this team yet.</td></tr>`;
  } else {
    tbody.innerHTML = agents.map((r,i)=>{
      const cc = r.conv>=5?'var(--green)':r.conv>=2?'var(--gold)':'var(--red)';
      return `<tr>
        <td style="color:var(--muted);font-size:0.7rem;">${i+1}</td>
        <td style="font-weight:700;">${r.name}</td>
        <td style="text-align:center;"><span class="att-badge att-p">${r.xfer}</span></td>
        <td style="text-align:center;color:var(--muted);">${r.calls.toLocaleString()}</td>
        <td style="text-align:center;color:${cc};font-weight:800;">${r.conv}%</td>
      </tr>`;
    }).join('');
  }

  overlay.style.display = 'flex';
}

function closeTeamBreakdown(){
  document.getElementById('team-breakdown-overlay').style.display='none';
}


// ── LOAD OVERVIEW ──
async function loadAdminOverview(){
  const today = getTodayGY();

  // Always ensure roster is loaded first
  if(!rosterLoaded) await loadRoster();

  try{
    // Primary source: attendance collection
    const snap = await db.collection('attendance').where('date','==',today).get();
    allAttRecords=[];
    snap.forEach(doc=>allAttRecords.push(doc.data()));

    // Fallback: also check sessions collection — catches reps whose attendance
    // write failed but session write succeeded (they ARE logged in)
    try{
      const sessSnap = await db.collection('sessions').where('date','==',today).get();
      const attIds = new Set(allAttRecords.map(r=>String(r.id||'').trim()));
      sessSnap.forEach(doc=>{
        const d = doc.data();
        const sid = String(d.id||'').trim();
        if(sid && !attIds.has(sid)){
          // Rep has a session but no attendance record
          // Look up their shift from ROSTER to correctly determine Present vs Late
          const rosterAgent = ROSTER[sid] || Object.values(ROSTER).find(r=>r.name===d.name);
          const shift = rosterAgent ? (rosterAgent.shift||'') : '';
          const status = getAttendanceStatus(shift) || 'P';
          allAttRecords.push({
            id: sid, name: d.name||'', team: d.team||'',
            date: today, status, shift
          });
          // Also backfill Firebase so next refresh doesn't need the fallback
          db.collection('attendance').doc(sid+'_'+today).set({
            id: sid, name: d.name||'', team: d.team||'',
            date: today, status, shift,
            loginTime: firebase.firestore.FieldValue.serverTimestamp()
          },{merge:true}).catch(()=>{});
          attIds.add(sid);
        }
      });
    }catch(e){ /* non-fatal */ }

    // ── Reconcile team field in attendance records against current ROSTER ──
    // Firestore records may have been written with the wrong team before a roster fix.
    // Always trust ROSTER (built from the authoritative Google Sheet) over stored Firestore data.
    allAttRecords.forEach(r => {
      const rosterAgent = ROSTER[String(r.id||'').trim()]
                       || Object.values(ROSTER).find(a => a.name && r.name &&
                            a.name.toLowerCase().trim() === (r.name||'').toLowerCase().trim());
      if (rosterAgent && rosterAgent.team && r.team !== rosterAgent.team) {
        r.team = rosterAgent.team;
      }
    });

    const online = allAttRecords.filter(r=>r.status==='Present'||r.status==='P');
    const late   = allAttRecords.filter(r=>r.status==='Late'||r.status==='L');
    const allAgents = Object.values(ROSTER);

    // Build sets of logged-in IDs AND names for matching
    const loggedIds   = new Set(allAttRecords.map(r=>String(r.id||'').trim()));
    const loggedNames = new Set(allAttRecords.map(r=>(r.name||'').toLowerCase().trim()));

    // Agent is "logged in" if their ID OR name appears in attendance records
    const notLogged = allAgents.filter(a=>{
      const byId   = loggedIds.has(String(a.userId||'').trim());
      const byName = loggedNames.has((a.name||'').toLowerCase().trim());
      return !byId && !byName;
    }).sort((a,b)=>a.name.localeCompare(b.name));

    document.getElementById('glance-total').textContent  = allAgents.length||'—';
    document.getElementById('glance-online').textContent = online.length;
    document.getElementById('glance-late').textContent   = late.length;
    document.getElementById('glance-absent').textContent = notLogged.length;

    const og=document.getElementById('online-grid');
    og.innerHTML = online.length
      ? online.map(r=>`<div class="status-chip online" onclick="openRepProfile('${r.id}','${r.name}','${r.team||''}','${r.shift||''}')"><span class="pulse green"></span>${r.name.split(' ').slice(0,2).join(' ')}</div>`).join('')
      : '<div style="font-size:0.72rem;color:var(--muted);">No one online yet</div>';

    const lg=document.getElementById('late-grid');
    lg.innerHTML = late.length
      ? late.map(r=>`<div class="status-chip late-chip" onclick="openRepProfile('${r.id}','${r.name}','${r.team||''}','${r.shift||''}')"><span class="pulse amber"></span>${r.name.split(' ').slice(0,2).join(' ')}</div>`).join('')
      : '<div style="font-size:0.72rem;color:var(--muted);">None</div>';

    const ag2=document.getElementById('absent-grid');
    ag2.innerHTML = notLogged.length
      ? notLogged.map(a=>`<div class="status-chip absent-chip" onclick="openRepProfile('${a.userId||''}','${a.name}','${a.team||''}','${a.shift||''}')"><span class="pulse red-p"></span>${a.name.split(' ').slice(0,2).join(' ')}</div>`).join('')
      : '<div style="font-size:0.72rem;color:var(--green);">Everyone is logged in! ✅</div>';

  }catch(e){ console.error('Overview error:',e); }

  // ── AUTO-LOAD TODAY'S STATS REPORT ──
  // If today's report is not already in memory, fetch it from Firebase automatically
  // so the goal bars and transfer counts are always visible when this tab opens.
  const todayStr = getTodayGY();
  if(!(statsData.length && statsDataDate === todayStr)){
    try{
      const rSnap = await db.collection('reports').doc(todayStr).get();
      if(rSnap.exists){
        const rData = rSnap.data();
        if(rData.statsJSON){
          statsData = JSON.parse(rData.statsJSON);
          // Team already correctly resolved at upload — do NOT re-resolve (causes BB/PR swap)
          statsDataDate = todayStr;
          // Update goal label in case it changed
          const goalSnap = await db.collection('config').doc('settings').get().catch(()=>null);
          if(goalSnap && goalSnap.exists && goalSnap.data().goal) dailyGoal = goalSnap.data().goal;
          const goalEl = document.getElementById('goal-val-display');
          if(goalEl) goalEl.textContent = dailyGoal;
          updateGoalBars();
        }
      }
    }catch(e){ console.warn('Overview: could not auto-load today report', e); }
  } else {
    // Data already in memory for today — just refresh goal bars
    updateGoalBars();
  }
}

// ── LOAD DAILY ATTENDANCE ──
async function loadAdminAttendance(){
  const today = getTodayGY();
  const dateEl = document.getElementById('att-date');
  if(dateEl) dateEl.textContent = new Date().toLocaleDateString('en-US',{timeZone:'America/Guyana',weekday:'long',month:'long',day:'numeric'});

  // Make sure roster is loaded first
  if(!rosterLoaded) await loadRoster();

  try{
    const snap = await db.collection('attendance').where('date','==',today).get();
    allAttRecords=[];
    snap.forEach(doc=>allAttRecords.push(doc.data()));
    renderAttTable();
  }catch(e){
    console.error('Attendance load error:',e);
    // Still render with roster even if Firebase fails
    renderAttTable();
  }
}

function filterAtt(f,btn){
  attFilter=f;
  document.querySelectorAll('[id^="att-filter-"]').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  renderAttTable();
}

function renderAttTable(){
  const tbody=document.getElementById('att-tbody');
  if(!tbody) return;

  // Get ALL agents from roster sorted alphabetically — apply team filter
  const allAgents = Object.values(ROSTER)
    .filter(a => attTeamFilter === 'all' || a.team === attTeamFilter)
    .sort((a,b)=>a.name.localeCompare(b.name));

  if(!allAgents.length){
    tbody.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:20px;">Loading roster... please wait a moment and try again.</td></tr>';
    return;
  }

  // Build a lookup map from attendance records — match by name AND by id
  const attByName = {};
  const attById   = {};
  allAttRecords.forEach(r=>{
    if(r.name) attByName[r.name.toLowerCase().trim()] = r;
    if(r.id)   attById[String(r.id).trim()] = r;
  });

  // Build rows — one per agent from roster
  let rows = allAgents.map(agent=>{
    // Try to find their attendance record by ID first, then by name
    const rec = attById[String(agent.userId||'').trim()]
             || attByName[agent.name.toLowerCase().trim()]
             || null;
    return {
      id:     agent.userId,
      name:   agent.name,
      team:   agent.team,
      shift:  agent.shift,
      status: rec ? rec.status : 'none',
      loginTime: rec ? rec.loginTime : null,
      hasRecord: !!rec
    };
  });

  // Apply filter
  if(attFilter !== 'all'){
    if(attFilter === 'none'){
      rows = rows.filter(r => !r.hasRecord);
    } else if(attFilter === 'P'){
      rows = rows.filter(r => r.status==='P' || r.status==='Present');
    } else if(attFilter === 'L'){
      rows = rows.filter(r => r.status==='L' || r.status==='Late');
    } else if(attFilter === 'A'){
      rows = rows.filter(r => r.status==='A' || r.status==='Absent' || r.status==='S' || r.status==='PO');
    }
  }

  if(!rows.length){
    tbody.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:16px;">No records match this filter.</td></tr>';
    return;
  }

  tbody.innerHTML = rows.map((r,i)=>{
    const s = r.status;
    const badge =
        s==='Present'||s==='P'  ? `<span class="att-badge att-p">Present</span>`
      : s==='Late'   ||s==='L'  ? `<span class="att-badge att-l">Late</span>`
      : s==='Absent' ||s==='A'  ? `<span class="att-badge att-a">Absent</span>`
      : s==='S'                  ? `<span class="att-badge att-a">Sick</span>`
      : s==='PO'                 ? `<span class="att-badge att-a">Personal Out</span>`
      : s==='V'                  ? `<span class="att-badge att-l">Vacation</span>`
      :                            `<span class="att-badge att-pending">Not In</span>`;

    const loginTime = r.loginTime
      ? new Date(r.loginTime.seconds*1000).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',timeZone:'America/Guyana'})
      : '—';

    const team = r.team==='BB'
      ? '<span style="color:var(--accent);font-weight:800;font-size:0.78rem;">BB</span>'
      : '<span style="color:var(--purple);font-weight:800;font-size:0.78rem;">PR</span>';

    return `<tr onclick="openRepProfile('${r.id||''}','${r.name}','${r.team||''}','${r.shift||''}')">
      <td style="color:var(--muted);font-size:0.72rem;">${i+1}</td>
      <td style="font-weight:700;color:var(--text);">${r.name||'—'}</td>
      <td>${team}</td>
      <td style="color:var(--muted);font-size:0.72rem;">${r.shift||'—'}</td>
      <td>${badge}</td>
      <td style="color:var(--muted);">${loginTime}</td>
      <td><button class="mark-absent-btn" onclick="event.stopPropagation();markAgentAbsentDirect('${r.id||''}','${r.name}','${r.team||''}')">Edit</button></td>
    </tr>`;
  }).join('');
}

// ── WEEKLY ATTENDANCE — merges Google Sheet + Firebase ──
let weeklyTeam      = 'BB';
let weeklySheetData = null;
let weeklyFirebase  = {}; // date -> {agentName -> status} from Firebase
let weekRanges      = [];
let monthlyCache    = {};

async function loadWeeklyAttendance(team){
  weeklyTeam = team;
  document.getElementById('wk-bb-btn').classList.toggle('active', team==='BB');
  document.getElementById('wk-pr-btn').classList.toggle('active', team==='PR');
  document.getElementById('weekly-table-wrap').innerHTML='<div style="text-align:center;color:var(--muted);padding:20px;">Loading...</div>';
  document.getElementById('week-chips').innerHTML='';

  const today      = getTodayGY();
  const monthStart = today.substring(0,7);

  // ── Fetch both sources in parallel ──
  const [sheetResult, firebaseResult] = await Promise.allSettled([
    callBridge({action:'getWeeklyAttendance', team}),
    db.collection('attendance')
      .where('date','>=',monthStart+'-01')
      .where('date','<=',monthStart+'-31')
      .get()
  ]);

  // ── Process Firebase ──
  weeklyFirebase = {};
  if(firebaseResult.status==='fulfilled'){
    firebaseResult.value.forEach(doc=>{
      const d = doc.data();
      if(d.team !== team) return;
      if(!weeklyFirebase[d.date]) weeklyFirebase[d.date]={};
      if(d.name){
        weeklyFirebase[d.date][d.name]                      = d.status;
        weeklyFirebase[d.date][d.name.toLowerCase().trim()] = d.status;
      }
    });
  }

  // ── Process Sheet ──
  if(sheetResult.status==='fulfilled' && sheetResult.value.success){
    weeklySheetData = sheetResult.value.weeks || [];
  } else {
    console.warn('Sheet weekly load failed — using Firebase only');
    weeklySheetData = [];
  }

  // Build week chips
  const container = document.getElementById('week-chips');
  if(weeklySheetData.length){
    container.innerHTML = weeklySheetData.map((w,i)=>
      `<button class="week-chip${i===weeklySheetData.length-1?' active':''}" onclick="selectSheetWeek(${i},this)">${w.label}</button>`
    ).join('');
    renderSheetWeeklyTable(weeklySheetData[weeklySheetData.length-1]);
  } else {
    // No sheet data — build weeks from Firebase dates
    const dates = Object.keys(weeklyFirebase).sort();
    if(dates.length){
      buildWeekRangesFromDates(dates, monthStart);
      container.innerHTML = weekRanges.map((w,i)=>
        `<button class="week-chip${i===weekRanges.length-1?' active':''}" onclick="selectFirebaseWeek(${i},this)">${w.label}</button>`
      ).join('');
      if(weekRanges.length) renderFirebaseWeeklyTable(weekRanges[weekRanges.length-1]);
    } else {
      document.getElementById('weekly-table-wrap').innerHTML='<div style="text-align:center;color:var(--muted);padding:20px;">No attendance data found yet for this month.</div>';
    }
  }
}

function switchWeeklyTeam(team){
  loadWeeklyAttendance(team);
}

function selectSheetWeek(idx, btn){
  document.querySelectorAll('.week-chip').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  if(weeklySheetData && weeklySheetData[idx]) renderSheetWeeklyTable(weeklySheetData[idx]);
}

function selectFirebaseWeek(idx, btn){
  document.querySelectorAll('.week-chip').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  if(weekRanges[idx]) renderFirebaseWeeklyTable(weekRanges[idx]);
}

// ── Normalize any status value to a short code ──
function normalizeStatus(raw){
  if(!raw) return '';
  const s = String(raw).toLowerCase().trim();
  if(s==='p'||s==='present')        return 'P';
  if(s==='l'||s==='late')           return 'L';
  if(s==='a'||s==='absent')         return 'A';
  if(s==='s'||s==='sick')           return 'S';
  if(s==='po'||s==='personal out')  return 'PO';
  if(s==='v'||s==='vacation')       return 'V';
  if(s==='off')                     return 'OFF';
  return String(raw).toUpperCase().trim();
}

function statusClass(code){
  return code==='P'?'wk-p':code==='L'?'wk-l':code==='A'?'wk-a'
    :code==='S'?'wk-s':code==='PO'?'wk-po':(code==='V'||code==='OFF')?'wk-off'
    :code?'wk-off':'wk-blank';
}

// ── Render from Sheet data (merged with Firebase) ──
function renderSheetWeeklyTable(week){
  if(!week) return;
  document.getElementById('weekly-range-lbl').textContent = week.label;

  const cols         = week.columns || [];
  const sheetAgents  = [...week.agents].sort((a,b)=>a.name.localeCompare(b.name));

  let html = '<table class="wk-table"><thead><tr>';
  html += '<th style="text-align:left;min-width:140px;">Agent Name</th><th>Shift</th>';
  cols.forEach(col=>{ html += `<th>${col.header}</th>`; });
  html += '<th style="color:var(--green);">P</th><th style="color:var(--gold);">L</th><th style="color:var(--red);">A</th><th>Comments</th>';
  html += '</tr></thead><tbody>';

  sheetAgents.forEach((agent,i)=>{
    const rAgent = Object.values(ROSTER).find(r=>
      r.name.toLowerCase()===agent.name.toLowerCase() ||
      r.name.toLowerCase().includes(agent.name.toLowerCase().split(' ')[0])
    );
    const shift = agent.shift || (rAgent ? rAgent.shift : '—');
    const rId   = rAgent ? rAgent.userId : '';
    const rTeam = rAgent ? rAgent.team : weeklyTeam;

    let p=0,l=0,a=0, dayCells='';

    cols.forEach(col=>{
      // ── MERGE: Sheet value wins; Firebase fills blank cells ──
      let sheetVal = normalizeStatus(agent.days[col.header]||'');

      // Try to get Firebase value for this day if sheet is blank
      if(!sheetVal){
        // Find the date for this column header (Mon/Tue etc.)
        // We match by looking at weeklyFirebase for any date that matches
        const dayKey = col.header.toLowerCase().substring(0,3);
        const dayMap = {mon:1,tue:2,wed:3,thu:4,fri:5,sat:6,sun:0};
        const targetDow = dayMap[dayKey];
        if(targetDow !== undefined){
          const fbDates = Object.keys(weeklyFirebase);
          const matchDate = fbDates.find(d=>{
            const dow = new Date(d).getDay();
            return dow === targetDow;
          });
          if(matchDate){
            const fbDay = weeklyFirebase[matchDate];
            const fbStatus = fbDay[agent.name] || fbDay[agent.name.toLowerCase().trim()] || '';
            sheetVal = normalizeStatus(fbStatus);
          }
        }
      }

      const code = sheetVal;
      const cls  = statusClass(code);
      if(code==='P') p++;
      else if(code==='L') l++;
      else if(code==='A'||code==='S'||code==='PO') a++;
      dayCells += `<td><span class="wk-cell ${cls}">${code}</span></td>`;
    });

    html += `<tr>
      <td onclick="openRepProfile('${rId}','${agent.name}','${rTeam}','${shift}')" style="cursor:pointer;font-weight:700;">${agent.name}</td>
      <td style="font-size:0.65rem;color:var(--muted);">${shift}</td>
      ${dayCells}
      <td style="color:var(--green);font-weight:800;">${p}</td>
      <td style="color:var(--gold);font-weight:800;">${l}</td>
      <td style="color:var(--red);font-weight:800;">${a}</td>
      <td style="color:var(--muted);font-size:0.7rem;">${agent.comments||'—'}</td>
    </tr>`;
  });

  html += '</tbody></table>';
  document.getElementById('weekly-table-wrap').innerHTML = html;
}

// ── Render from Firebase only (fallback when sheet unavailable) ──
function buildWeekRangesFromDates(dates, monthStart){
  const year  = parseInt(monthStart.split('-')[0]);
  const month = parseInt(monthStart.split('-')[1])-1;
  const daysInMonth = new Date(year, month+1, 0).getDate();
  weekRanges = [];
  let d = 1;
  while(d <= daysInMonth){
    const start = d;
    let dt = new Date(year, month, d);
    while(dt.getDay()!==6 && d<=daysInMonth){ d++; dt=new Date(year,month,d); }
    const end = Math.min(d, daysInMonth);
    const wkDates = [];
    for(let x=start;x<=end;x++){
      const ds = monthStart+'-'+(x<10?'0':'')+x;
      wkDates.push({date:ds, day:x, dow:new Date(year,month,x).getDay()});
    }
    if(wkDates.length){
      const mn = new Date(year,month,1).toLocaleDateString('en-US',{month:'long'});
      weekRanges.push({label:mn+' '+start+' – '+end, dates:wkDates});
    }
    d++;
  }
}

function renderFirebaseWeeklyTable(week){
  if(!week) return;
  document.getElementById('weekly-range-lbl').textContent = week.label;
  const agents = Object.values(ROSTER).filter(a=>a.team===weeklyTeam).sort((a,b)=>a.name.localeCompare(b.name));
  const dowMap = {1:'Mon',2:'Tue',3:'Wed',4:'Thu',5:'Fri',6:'Sat',0:'Sun'};

  let html = '<table class="wk-table"><thead><tr>';
  html += '<th style="text-align:left;min-width:140px;">Agent Name</th><th>Shift</th>';
  week.dates.forEach(d=>{ html+=`<th>${dowMap[d.dow]||''}<br><span style="font-size:0.5rem;color:#4a6080;">${d.day}</span></th>`; });
  html += '<th style="color:var(--green);">P</th><th style="color:var(--gold);">L</th><th style="color:var(--red);">A</th></tr></thead><tbody>';

  agents.forEach(agent=>{
    let p=0,l=0,a=0,cells='';
    week.dates.forEach(d=>{
      const dayData = weeklyFirebase[d.date]||{};
      const raw = dayData[agent.name]||dayData[agent.name.toLowerCase().trim()]||'';
      const code = normalizeStatus(raw);
      const cls  = statusClass(code);
      if(code==='P') p++;
      else if(code==='L') l++;
      else if(code==='A'||code==='S'||code==='PO') a++;
      cells += `<td><span class="wk-cell ${cls}">${code}</span></td>`;
    });
    html+=`<tr>
      <td onclick="openRepProfile('${agent.userId}','${agent.name}','${agent.team}','${agent.shift}')" style="cursor:pointer;font-weight:700;">${agent.name}</td>
      <td style="font-size:0.65rem;color:var(--muted);">${agent.shift||'—'}</td>
      ${cells}
      <td style="color:var(--green);font-weight:800;">${p}</td>
      <td style="color:var(--gold);font-weight:800;">${l}</td>
      <td style="color:var(--red);font-weight:800;">${a}</td>
    </tr>`;
  });
  html += '</tbody></table>';
  document.getElementById('weekly-table-wrap').innerHTML = html;
}

function renderSheetWeeklyTable(week){
  if(!week) return;
  document.getElementById('weekly-range-lbl').textContent = week.label;

  if(!week.agents || !week.agents.length){
    document.getElementById('weekly-table-wrap').innerHTML='<div style="text-align:center;color:var(--muted);padding:20px;">No agents in this week.</div>';
    return;
  }

  // Get column headers from sheet (Mon, Tue, Wed, Thu, Fri, Sat, Sun etc.)
  const cols = week.columns || [];

  // Get all agent names sorted alphabetically — use roster order for team
  const sheetAgents = [...week.agents].sort((a,b)=>a.name.localeCompare(b.name));

  let html = '<table class="wk-table"><thead><tr>';
  html += '<th style="text-align:left;min-width:140px;">Agent Name</th>';
  html += '<th>Shift</th>';
  cols.forEach(col=>{
    html += `<th>${col.header}</th>`;
  });
  html += '<th style="color:var(--green);">P</th>';
  html += '<th style="color:var(--gold);">L</th>';
  html += '<th style="color:var(--red);">A</th>';
  html += '<th>Comments</th>';
  html += '</tr></thead><tbody>';

  sheetAgents.forEach((agent,i)=>{
    // Find matching roster agent for shift info
    const rosterAgent = Object.values(ROSTER).find(r=>
      r.name.toLowerCase()===agent.name.toLowerCase() ||
      r.name.toLowerCase().includes(agent.name.toLowerCase()) ||
      agent.name.toLowerCase().includes(r.name.toLowerCase().split(' ')[0].toLowerCase())
    );
    const shift = agent.shift || (rosterAgent ? rosterAgent.shift : '—');

    let p=0, l=0, a=0;
    let dayCells = '';
    cols.forEach(col=>{
      const rawStatus = agent.days[col.header] || '';
      const s = rawStatus.toLowerCase().trim();
      let code = rawStatus.toUpperCase().trim();

      // Normalize
      if(s==='present') code='P';
      else if(s==='late') code='L';
      else if(s==='absent') code='A';
      else if(s==='sick') code='S';
      else if(s==='personal out') code='PO';
      else if(s==='vacation') code='V';

      const cls = code==='P'?'wk-p'
        :code==='L'?'wk-l'
        :code==='A'?'wk-a'
        :code==='S'?'wk-s'
        :code==='PO'?'wk-po'
        :code==='V'?'wk-l'
        :code==='OFF'?'wk-off'
        :code?'wk-off':'wk-blank';

      if(code==='P') p++;
      else if(code==='L') l++;
      else if(code==='A'||code==='S'||code==='PO') a++;

      dayCells += `<td><span class="wk-cell ${cls}">${code}</span></td>`;
    });

    const rId = rosterAgent ? rosterAgent.userId : '';
    const rTeam = rosterAgent ? rosterAgent.team : weeklyTeam;
    html += `<tr>
      <td onclick="openRepProfile('${rId}','${agent.name}','${rTeam}','${shift}')" style="cursor:pointer;font-weight:700;">${agent.name}</td>
      <td style="font-size:0.65rem;color:var(--muted);">${shift}</td>
      ${dayCells}
      <td style="color:var(--green);font-weight:800;">${p}</td>
      <td style="color:var(--gold);font-weight:800;">${l}</td>
      <td style="color:var(--red);font-weight:800;">${a}</td>
      <td style="color:var(--muted);font-size:0.7rem;">${agent.comments||'—'}</td>
    </tr>`;
  });

  html += '</tbody></table>';
  document.getElementById('weekly-table-wrap').innerHTML = html;
}

// ── LOAD MONTHLY ATTENDANCE ──
async function loadMonthlyAttendance(){
  const today      = getTodayGY();
  const monthStart = today.substring(0,7);
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const monthIdx   = parseInt(monthStart.split('-')[1])-1;
  const year       = monthStart.split('-')[0];
  document.getElementById('monthly-month-lbl').textContent = monthNames[monthIdx]+' '+year;
  document.getElementById('monthly-table-wrap').innerHTML='<div style="text-align:center;color:var(--muted);padding:20px;">Loading from Google Sheet...</div>';

  // monthlyCache: keyed by lowercase agent name → { 'YYYY-MM-DD': 'P'/'L'/'A'/... }
  monthlyCache = {};

  try{
    const data = await callBridge({action:'getMonthlyAttendance'});
    if(!data.success || !Array.isArray(data.agents) || data.agents.length === 0){
      throw new Error(data.error || 'No agents returned');
    }

    data.agents.forEach(agent=>{
      const nameKey = (agent.name||'').toLowerCase().trim();
      if(!nameKey) return;
      const dayData = {};
      // days = { "2": "Present", "3": "Late", ... } — keys are day numbers as strings
      Object.entries(agent.days||{}).forEach(([dayStr, status])=>{
        const d = parseInt(dayStr);
        const code = normalizeStatus(status);
        if(code && d >= 1 && d <= 31){
          const dateStr = monthStart+'-'+(d<10?'0':'')+d;
          dayData[dateStr] = code;
        }
      });
      monthlyCache[nameKey] = dayData;
    });

    console.log('[Monthly] Loaded', Object.keys(monthlyCache).length, 'agents from sheet');

  }catch(e){
    console.error('[Monthly] Load failed:', e.message);
    document.getElementById('monthly-table-wrap').innerHTML=
      `<div style="color:var(--red);text-align:center;padding:20px;">Could not load monthly data: ${e.message}</div>`;
    return;
  }

  renderMonthly(monthlyCache, monthStart, year, monthIdx);
}

function reRenderMonthly(){
  loadMonthlyAttendance();
}

// ── REPORT HISTORY ──
let reportHistory=[];
async function loadReportHistory(){
  try{
    const snap=await db.collection('reports').orderBy('uploadedAt','desc').get();
    reportHistory=[];
    snap.forEach(doc=>{ const d=doc.data(); if(d.statsJSON) reportHistory.push(d); });
    renderReportHistory();
  }catch(e){ console.warn('History load:',e); }
}
function renderReportHistory(){
  const el=document.getElementById('report-history');
  if(!el||!reportHistory.length){if(el)el.innerHTML='';return;}
  // Always newest date first
  const sorted = [...reportHistory].sort((a,b)=>b.date.localeCompare(a.date));
  el.innerHTML='<div style="font-size:0.6rem;font-weight:800;letter-spacing:2px;color:var(--muted);margin-bottom:6px;text-transform:uppercase;">📂 Previous Reports — click to load</div>'
    +sorted.map((r)=>{
      const origIdx = reportHistory.indexOf(r);
      const isActive = r.date === statsDataDate;
      const isToday  = r.date === getTodayGY();
      const baseBorder = isToday ? 'var(--green)' : 'var(--border)';
      const baseBg     = isToday ? 'rgba(52,211,153,0.1)' : 'transparent';
      const baseColor  = isToday ? 'var(--green)' : 'var(--muted)';
      return `<button data-report-idx="${origIdx}" onclick="loadReportByIndex(${origIdx})"
        style="margin:0 4px 4px 0;display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:20px;
        border:1.5px solid ${isActive?'var(--gold)':baseBorder};
        background:${isActive?'rgba(251,191,36,0.12)':baseBg};
        color:${isActive?'var(--gold)':baseColor};
        font-family:Barlow Condensed,sans-serif;font-size:0.75rem;font-weight:800;cursor:pointer;
        box-shadow:${isActive?'0 0 8px rgba(251,191,36,0.3)':'none'};">
        ${isToday?'⚡ ':isActive?'▶ ':''} ${r.date} <span style="opacity:0.6;">(${r.agentCount||'?'} agents)</span>
      </button>`;
    }).join('');
}
let compareData     = [];   // second dataset for comparison
let compareDataDate = '';
let compareModeOn   = false;

function toggleCompareMode(){
  if(!compareData.length){
    // Prompt to select a report to compare against
    const btn = document.getElementById('compare-toggle-btn');
    btn.textContent = '⚖️ SELECT REPORT TO COMPARE...';
    btn.style.borderColor = 'var(--gold)';
    btn.style.color = 'var(--gold)';
    window._pickingCompare = true;
  } else {
    compareModeOn = !compareModeOn;
    updateCompareBanner();
    renderStatsTable();
  }
}

function clearCompare(){
  compareData = []; compareDataDate = ''; compareModeOn = false;
  window._pickingCompare = false;
  document.getElementById('compare-toggle-btn').textContent = '⚖️ COMPARE';
  document.getElementById('compare-toggle-btn').style.borderColor = 'var(--border)';
  document.getElementById('compare-toggle-btn').style.color = 'var(--muted)';
  document.getElementById('compare-clear-btn').style.display = 'none';
  document.getElementById('compare-banner').style.display = 'none';
  renderStatsTable();
}

function updateCompareBanner(){
  const banner = document.getElementById('compare-banner');
  const text   = document.getElementById('compare-banner-text');
  if(compareModeOn && compareData.length){
    banner.style.display = '';
    text.innerHTML = `Comparing <strong style="color:var(--accent);">${statsDataDate}</strong> vs <strong style="color:var(--gold);">${compareDataDate}</strong> — <span style="color:var(--green);">▲ green = improved</span> · <span style="color:var(--red);">▼ red = declined</span>`;
  } else {
    banner.style.display = 'none';
  }
}

function loadReportByIndex(idx){
  const r=reportHistory[idx];
  if(!r||!r.statsJSON) return;
  try{
    statsData=JSON.parse(r.statsJSON);

    // Team was already correctly resolved at upload time — do NOT re-resolve here.
    // Re-running resolveAgentTeam causes BB/PR to swap for agents not found in ROSTER.

    document.getElementById('csv-date-lbl').textContent='📅 '+r.date;
    document.getElementById('csv-expiry-lbl').textContent=r.expiryDate?'🗑 Expires: '+r.expiryDate:'';
    statsDataDate = r.date; // track which date this data is for
    updateGoalBars();
    renderStatsTable();
    // Re-render history so active state updates correctly (uses statsDataDate)
    renderReportHistory();
  }catch(e){ console.error('Load report:',e); }
}

function renderMonthly(attMap, monthStart, year, monthIdx){
  const teamFilter = document.getElementById('monthly-team-filter').value;
  const daysInMonth = new Date(parseInt(year), monthIdx+1, 0).getDate();
  const allAgents = Object.values(ROSTER)
    .filter(a=>!a.inactive && (teamFilter==='all'||a.team===teamFilter))
    .sort((a,b)=>a.name.localeCompare(b.name));

  if(allAgents.length===0){
    document.getElementById('monthly-table-wrap').innerHTML='<div style="text-align:center;color:var(--muted);padding:30px;">No active agents found — make sure the roster is loaded.</div>';
    return;
  }

  // Build day headers
  const dayNames=['Su','Mo','Tu','We','Th','Fr','Sa'];
  let html='<table style="border-collapse:collapse;font-size:0.68rem;width:100%;">';
  html+='<thead><tr style="background:#060d1a;"><th style="text-align:left;padding:8px 10px;color:var(--muted);font-family:Barlow Condensed,sans-serif;font-size:0.6rem;font-weight:800;letter-spacing:1.5px;border-bottom:2px solid #1a2a45;white-space:nowrap;min-width:130px;">Agent</th>';
  for(let d=1;d<=daysInMonth;d++){
    const dayOfWeek = new Date(parseInt(year),monthIdx,d).getDay();
    const isSun = dayOfWeek===0;
    html+=`<th style="padding:4px 3px;color:${isSun?'var(--red)':'var(--muted)'};font-family:Barlow Condensed,sans-serif;font-size:0.52rem;font-weight:800;letter-spacing:1px;text-align:center;border-bottom:2px solid #1a2a45;">${d}<br><span style="font-size:0.45rem;opacity:0.7;">${dayNames[dayOfWeek]}</span></th>`;
  }
  html+='<th style="padding:4px 8px;color:var(--green);font-family:Barlow Condensed,sans-serif;font-size:0.6rem;font-weight:800;border-bottom:2px solid #1a2a45;">P</th>';
  html+='<th style="padding:4px 8px;color:var(--gold);font-family:Barlow Condensed,sans-serif;font-size:0.6rem;font-weight:800;border-bottom:2px solid #1a2a45;">L</th>';
  html+='<th style="padding:4px 8px;color:var(--red);font-family:Barlow Condensed,sans-serif;font-size:0.6rem;font-weight:800;border-bottom:2px solid #1a2a45;">A</th>';
  html+='</tr></thead><tbody>';

  let totalP=0,totalL=0,totalA=0;

  allAgents.forEach((agent,i)=>{
    // monthlyCache is keyed by lowercase agent name
    const nameKey  = agent.name.toLowerCase().trim();
    const agentAtt = monthlyCache[nameKey] || {};
    let p=0,l=0,a=0;
    const rowBg = i%2===0 ? '#070e1c' : '#060b18';
    html+=`<tr style="background:${rowBg};"><td style="padding:7px 10px;font-size:0.72rem;color:var(--text);white-space:nowrap;font-weight:600;border-bottom:1px solid #0f1e35;">${agent.name.split(' ').slice(0,2).join(' ')}</td>`;
    for(let d=1;d<=daysInMonth;d++){
      const dateStr = monthStart+'-'+(d<10?'0':'')+d;
      const dayOfWeek = new Date(parseInt(year),monthIdx,d).getDay();
      const isSun = dayOfWeek===0;
      const isFuture = dateStr > getTodayGY();
      const rawStatus = agentAtt[dateStr];
      const status    = normalizeStatus(rawStatus);
      let cls='mcal-off', lbl='';

      if(status==='P'){cls='mcal-p';lbl='P';p++;}
      else if(status==='L'){cls='mcal-l';lbl='L';l++;}
      else if(status==='A'){cls='mcal-a';lbl='A';a++;}
      else if(status==='S'){cls='mcal-a';lbl='S';a++;}
      else if(status==='PO'){cls='mcal-a';lbl='PO';a++;}
      else if(status==='V'){cls='mcal-l';lbl='V';}
      else if(status==='OFF'){cls='mcal-off';lbl='OFF';}
      else if(isFuture){cls='mcal-off';lbl='';}
      else if(isSun && !status){cls='mcal-off';lbl='·';}
      else{cls='mcal-off';lbl='';}
      html+=`<td style="padding:4px 3px;text-align:center;border-bottom:1px solid #0f1e35;"><div class="mcal-cell ${cls}" title="${dateStr}">${lbl}</div></td>`;
    }
    totalP+=p;totalL+=l;totalA+=a;
    html+=`<td style="padding:7px 8px;text-align:center;color:var(--green);font-weight:800;font-size:0.75rem;border-bottom:1px solid #0f1e35;">${p}</td>`;
    html+=`<td style="padding:7px 8px;text-align:center;color:var(--gold);font-weight:800;font-size:0.75rem;border-bottom:1px solid #0f1e35;">${l}</td>`;
    html+=`<td style="padding:7px 8px;text-align:center;color:var(--red);font-weight:800;font-size:0.75rem;border-bottom:1px solid #0f1e35;">${a}</td>`;
    html+='</tr>';
  });

  html+='</tbody></table>';
  document.getElementById('monthly-table-wrap').innerHTML=html;

  // Summary
  const total = totalP+totalL+totalA;
  const rate = total>0?Math.round((totalP/total)*100):0;
  document.getElementById('ms-present').textContent=totalP;
  document.getElementById('ms-late').textContent=totalL;
  document.getElementById('ms-absent').textContent=totalA;
  document.getElementById('ms-rate').textContent=rate+'%';
  document.getElementById('monthly-summary').style.display='grid';
}

// ── CSV UPLOAD WITH EXPIRY ──
function handleStatsCSV(input){
  const file=input.files[0];
  if(!file) return;
  // Reset input value so re-uploading the same file triggers onchange again
  input.value='';
  const reader=new FileReader();
  reader.onload=e=>{
    const text = e.target.result;

    // ── Extract real report date ──
    // Priority:
    //  1. Filename  e.g. Agent_Status_Details_Report_03_21_2026__3_.csv → 2026-03-21
    //  2. CSV line  e.g. "AGENT STATUS DETAIL REPORTS 2026-03-21 07:31:57"
    //  3. CSV Time Range end date
    //  4. Today as last resort
    let reportDate = getTodayGY();

    // 1 — Filename: matches MM_DD_YYYY anywhere in the name
    const mf = file.name.match(/(\d{2})_(\d{2})_(\d{4})/);
    if(mf){
      reportDate = `${mf[3]}-${mf[1]}-${mf[2]}`;
    } else {
      // 2 — CSV content: "AGENT STATUS DETAIL REPORTS YYYY-MM-DD HH:MM:SS"
      const m1 = text.match(/AGENT STATUS DETAIL REPORTS\s+(\d{4}-\d{2}-\d{2})/i);
      if(m1){ reportDate = m1[1]; }
      else {
        // 3 — Time Range end date: "To YYYY-MM-DD"
        const m2 = text.match(/To\s+(\d{4}-\d{2}-\d{2})/i);
        if(m2){ reportDate = m2[1]; }
      }
    }

    pendingCSVData={text, filename:file.name, date:reportDate};
    selectedExpiryDays=7;
    updateExpiryDisplay();

    // Show the detected date to the admin before they confirm
    const picker = document.getElementById('expiry-picker');
    picker.style.display='';
    // Pre-fill the date override field with detected date
    const overrideEl = document.getElementById('csv-date-override');
    if(overrideEl) overrideEl.value = reportDate;
  };
  reader.readAsText(file);
}

function selectExpiry(days,btn){
  selectedExpiryDays=days;
  document.querySelectorAll('.expiry-opt').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  document.getElementById('custom-expiry-days').value='';
  updateExpiryDisplay();
}

function selectCustomExpiry(val){
  const n=parseInt(val);
  if(!n||n<1) return;
  selectedExpiryDays=n;
  document.querySelectorAll('.expiry-opt').forEach(b=>b.classList.remove('active'));
  updateExpiryDisplay();
}

function updateExpiryDisplay(){
  const d=new Date();
  d.setDate(d.getDate()+selectedExpiryDays);
  document.getElementById('expiry-date-display').textContent=d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
}

async function confirmCSVUpload(){
  if(!pendingCSVData) return;

  // Force fresh roster reload from Google Sheet to get latest IDs and teams
  const uploadBtn = document.querySelector('#expiry-picker button');
  if(uploadBtn){ uploadBtn.textContent = '⏳ Loading roster...'; uploadBtn.disabled = true; }
  rosterLoaded = false;
  await loadRoster();
  if(uploadBtn){ uploadBtn.textContent = '✅ UPLOAD & SAVE REPORT'; uploadBtn.disabled = false; }

  const expiryDate=new Date();
  expiryDate.setDate(expiryDate.getDate()+selectedExpiryDays);

  // Parse CSV first
  parseStatsCSV(pendingCSVData.text);

  // Save to Firebase — same date = overwrite (set not add)
  try{
    await db.collection('reports').doc(pendingCSVData.date).set({
      date: pendingCSVData.date,
      filename: pendingCSVData.filename,
      uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
      expiryDate: expiryDate.toISOString().split('T')[0],
      expiryDays: selectedExpiryDays,
      agentCount: statsData.length,
      // Store parsed data for reload
      statsJSON: JSON.stringify(statsData)
    });
    console.log('Report saved to Firebase — date:', pendingCSVData.date);
  }catch(e){ console.error('Report save error:',e); }

  document.getElementById('expiry-picker').style.display='none';
  document.getElementById('csv-date-lbl').textContent='📅 '+pendingCSVData.date;
  document.getElementById('csv-expiry-lbl').textContent='🗑 Expires: '+expiryDate.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});

  // Show matched vs total count — helps diagnose why CSV total ≠ marked count
  const rosterIds = new Set(Object.keys(ROSTER));
  const matched   = statsData.filter(a => a.ytelId && rosterIds.has(a.ytelId)).length;
  const total     = statsData.length;
  const unmatched = statsData.filter(a => !a.ytelId || !rosterIds.has(a.ytelId));
  const matchLbl  = document.getElementById('csv-match-lbl');
  if(matchLbl){
    matchLbl.textContent = total + ' in CSV · ' + matched + ' matched roster';
    matchLbl.style.color = matched < total ? 'var(--gold)' : 'var(--green)';
  }
  if(unmatched.length){
    console.warn('⚠️ CSV agents NOT matched to roster (' + unmatched.length + '):', unmatched.map(a=>a.nameRaw+'(ID:'+a.ytelId+')').join(', '));
  }
  statsDataDate = pendingCSVData.date;
  pendingCSVData=null;

  updateGoalBars();
  renderStatsTable();

  // Reload report history so the new upload appears in the buttons immediately
  await loadReportHistory();

  // Clear weekly performance cache so it rebuilds with new data on next view
  wpAllReports = [];
  wpWeekRanges = [];

  // If weekly performance tab is currently open, refresh it immediately
  const wpEl = document.getElementById('admin-weekperf');
  if(wpEl && wpEl.style.display !== 'none'){
    loadWeeklyPerformance();
  }

  // Refresh daily overview if it's open — same-day upload should update transfer counts
  const ovEl = document.getElementById('admin-overview');
  if(ovEl && ovEl.style.display !== 'none'){
    loadAdminOverview();
  }
}

// ── CANONICAL TEAM RESOLVER ──
// Priority:
//  1. ytelId  → ROSTER lookup (most reliable)
//  2. nameRaw prefix  → GUYP=PR, GUY/GUYB=BB (direct CSV source)
//  3. ytelName in ROSTER (agent.name exact match → use ytelName prefix)
//  4. Fallback to saved team value
function resolveAgentTeam(agent){
  const rosterAgents = Object.values(ROSTER);

  // Helper: get team from a ytelName string
  // GUYP = Providence (PR), GUYB = Berbice (BB)
  // Plain GUY (no suffix) = ambiguous, return null so caller uses other signals
  const teamFromYtel = (yn)=>{
    const u = (yn||'').toUpperCase().replace(/[\s-]/g,'');
    if(u.startsWith('GUYP')) return 'PR';
    if(u.startsWith('GUYB')) return 'BB';
    return null;
  };

  // 1. nameRaw prefix from saved CSV — HIGHEST PRIORITY
  // GUYP = Providence (PR), GUYB = Berbice (BB)
  // This is the most direct signal and must not be overridden by stale ROSTER data
  if(agent.nameRaw){
    const t = teamFromYtel(agent.nameRaw);
    if(t) return t;
  }

  // 2. ytelId → ROSTER lookup → use ytelName prefix
  if(agent.ytelId){
    const r = ROSTER[String(agent.ytelId).trim()];
    if(r){ return teamFromYtel(r.ytelName) || r.team || 'BB'; }
  }

  // 3. Match name in ROSTER → use that entry's ytelName
  const nameLow = (agent.name||'').toLowerCase().trim();
  const parts   = nameLow.split(' ').filter(p=>p.length>1);
  const first   = parts[0]||'';
  const last    = parts[parts.length-1]||'';

  // Exact name match first
  let match = rosterAgents.find(r=>r.name.toLowerCase()===nameLow);

  // First + last name match (both must be 2+ chars)
  if(!match && first.length>=2 && last.length>=2 && first!==last){
    match = rosterAgents.find(r=>{
      const rn = r.name.toLowerCase();
      const rp = rn.split(' ').filter(p=>p.length>1);
      return rp[0]===first && rp[rp.length-1]===last;
    });
  }

  if(match){ return teamFromYtel(match.ytelName) || match.team || 'BB'; }

  // 4. Keep saved value
  return agent.team || 'BB';
}

// ── CHECK IF AN AGENT IS INACTIVE ──
// Used to filter out inactive roster entries from the stats table and weekly performance
function isAgentInactive(agent){
  const nameLow = (agent.name||'').toLowerCase().trim();

  // 1. NH tag means "New Hire" — NOT inactive. Do NOT filter based on NH alone.
  //    NH agents are shown unless they are explicitly inactive in the roster.
  //    (Old behaviour of skipping all NH agents has been removed.)

  // 2. Known NH agent names — these people are confirmed inactive
  // Only list agents confirmed permanently inactive/terminated — do NOT put active trainees here
  const knownNH = ['angelica alert','esha singh','keisha graig'];
  if(knownNH.some(n=>nameLow===n)) return true;

  // 3. Hardcoded INACTIVE_AGENTS list
  if(INACTIVE_AGENTS.some(n=>n.toLowerCase()===nameLow)) return true;

  // 4. ytelId found in ROSTER — check status
  if(agent.ytelId){
    const inRoster = ROSTER[String(agent.ytelId).trim()];
    if(inRoster && (inRoster.status||'').toLowerCase()==='inactive') return true;
    // NOTE: Do NOT mark agents as inactive just because their ID is missing from
    // the current ROSTER — ID mismatches happen due to CSV format, new hires, or
    // roster sync delays. Only explicitly inactive entries should be filtered.
  }

  // 5. Check by name in ROSTER — if found and inactive
  const byName = Object.values(ROSTER).find(r=>r.name.toLowerCase()===nameLow);
  if(byName && (byName.status||'').toLowerCase()==='inactive') return true;

  return false;
}

function parseStatsCSV(text){
  // Normalize line endings — Windows CSVs use \r\n, strip \r so splits are clean
  const lines = text.trim().replace(/\r\n/g,'\n').replace(/\r/g,'\n').split('\n');
  if(!lines.length) return;

  // ── AUTO-DETECT DELIMITER (comma vs semicolon) ──
  // Some computers (LibreOffice, non-English locales) export CSVs with semicolons.
  // Count occurrences in the header line to decide which delimiter to use.
  const firstLine = lines[0];
  const commaCount = (firstLine.match(/,/g)||[]).length;
  const semiCount  = (firstLine.match(/;/g)||[]).length;
  const DELIM = semiCount > commaCount ? ';' : ',';
  if(DELIM === ';') console.log('⚠️ CSV uses semicolon delimiter — adjusting parser');

  // Parse headers — strip BOM, quotes, spaces
  const headers = firstLine.split(DELIM).map(h=>h.replace(/^\uFEFF/,'').replace(/^"|"$/g,'').trim());

  // Build column index map by header name
  const col = {};
  headers.forEach((h,i)=>{ col[h.trim()]=i; });

  // Key columns — find by name regardless of position
  const getCol = (...names) => {
    for(const n of names){
      if(col[n]!==undefined) return col[n];
    }
    return -1;
  };

  const iCalls  = getCol('CALLS');
  const iCI     = getCol('CIcalls','CI');
  const iXfer   = getCol('XFER','TRANSFER','XFERS');
  const iDNC    = getCol('DNC');
  const iNI     = getCol('NI','NOINTR');
  const iHangup = getCol('HANGUP');
  const iSpnsh  = getCol('Spnsh','SPANISH');
  const iCRPull = getCol('CRPULL');
  const iCallbk = getCol('CALLBK','CALLBACK');
  const iDNCCI  = getCol(' DNC/CI','DNC/CI');
  const iName   = getCol('User Name','USER NAME');

  statsData     = [];
  statsDataDate = '';

  for(let i=1;i<lines.length;i++){
    const raw = lines[i];
    if(!raw.trim()) continue;

    // Parse CSV line properly handling quoted fields
    const cols = parseCSVLine(raw, DELIM);
    if(!cols.length) continue;

    const nameRaw = cols[iName]||'';
    // Skip total row, meta rows, empty rows
    if(!nameRaw || nameRaw.startsWith('TOTAL') || nameRaw.startsWith('AGENT STATUS') || nameRaw.startsWith('Time Range')) continue;

    // Extract 4-digit Ytel ID from the end of the User Name field
    // e.g. "GUY Angel Narine - 4413" → "4413"
    // Also works for NH-tagged names: "GUY Akeem Sullivan NH - 4446" → "4446"
    const csvIdMatch = nameRaw.match(/-\s*(\d{4,})\s*$/);
    const csvYtelId  = csvIdMatch ? csvIdMatch[1].trim() : null;

    // ── ROSTER LOOKUP — ID-first matching ──
    // ROSTER is guaranteed loaded at this point because parseStatsCSV
    // is only called from confirmUpload which runs after loadRoster()
    // NOTE: NH in the Ytel name means "New Hire" (trainee) — NOT inactive.
    // We do the roster lookup BEFORE any NH filtering so active trainees
    // tagged NH in Ytel are never dropped incorrectly.
    const rosterAgents = Object.values(ROSTER);

    // Clean name — strip prefix (GUY/GUYB/GUYP/GUYP4), NH suffix, and extension number
    const name = nameRaw
      .replace(/^GUYP\d*\s+/i,'')
      .replace(/^GUYB\d*\s+/i,'')
      .replace(/^GUY\s+/i,'')
      .replace(/^GUY[PB]?\d*-/i,'')
      .replace(/\s+NH\s*$/i,'')        // strip trailing NH suffix before the dash
      .replace(/\s+NH\s+-/i,' -')      // strip NH between name and ID dash
      .replace(/\s*-\s*\d{4,}$/,'')
      .trim();

    if(!name) continue;

    // ── ID-FIRST ROSTER MATCH ──
    // Step 1: match by the 4-digit ID extracted above (most reliable)
    let rosterMatch = null;
    if(csvYtelId){
      rosterMatch = ROSTER[csvYtelId] || rosterAgents.find(r => String(r.userId).trim() === csvYtelId) || null;
    }

    // Step 2: fallback — match by name if no ID match
    if(!rosterMatch){
      const nameLow = name.toLowerCase().trim();
      rosterMatch = rosterAgents.find(r => r.name.toLowerCase() === nameLow) || null;
      if(!rosterMatch){
        const cParts = nameLow.split(' ');
        const cF = cParts[0], cL = cParts[cParts.length-1];
        rosterMatch = rosterAgents.find(r => {
          const rn = r.name.toLowerCase().split(' ');
          const rF = rn[0], rL = rn[rn.length-1];
          return rF === cF && cL.length > 2 && rL.length > 2
            && (rL.startsWith(cL.substring(0,4)) || cL.startsWith(rL.substring(0,4)));
        }) || null;
      }
    }

    // ── NH means "New Hire" — always include NH agents regardless of roster match ──
    // NH agents appear in the CSV because they are active; never skip them.

    if(!rosterMatch){
      console.warn('⚠️ No roster match for CSV agent — including with prefix fallback:', nameRaw, 'ID:', csvYtelId);
    }

    // ── TEAM RESOLUTION ──
    // Priority: (1) roster Team column when matched → most reliable
    //           (2) GUYP/GUYB prefix in nameRaw → prefix-based fallback
    //           (3) Default BB
    let team;
    if(rosterMatch && rosterMatch.team){
      const teamUp = rosterMatch.team.toUpperCase().trim();
      if(teamUp === 'PROVIDENCE' || teamUp === 'PR') team = 'PR';
      else if(teamUp === 'BERBICE' || teamUp === 'BB') team = 'BB';
      else team = rosterMatch.team; // keep as-is if custom value
    } else {
      // Prefix fallback — handles GUYP = Providence, GUYB = Berbice
      // Plain GUY (no P/B suffix) is ambiguous — do NOT default to BB.
      // For plain GUY names, try to match by ID or name in ROSTER one more time
      // to get the saved team, then fall back to BB only as a last resort.
      const ynRaw = nameRaw.toUpperCase().replace(/[\s-]/g,'');
      const prefixClean = ynRaw.replace(/^(GUYP|GUYB)\d+/, '$1');
      if(prefixClean.startsWith('GUYP'))      team = 'PR';
      else if(prefixClean.startsWith('GUYB')) team = 'BB';
      else {
        // Plain GUY prefix — look up saved team from Firebase roster by ID or name
        let savedTeam = null;
        if(csvYtelId) {
          const fbEntry = ROSTER[csvYtelId] || Object.values(ROSTER).find(r=>String(r.userId).trim()===csvYtelId);
          if(fbEntry && fbEntry.team) savedTeam = fbEntry.team;
        }
        if(!savedTeam) {
          const nameLow = name.toLowerCase().trim();
          const fbEntry = Object.values(ROSTER).find(r=>r.name.toLowerCase()===nameLow);
          if(fbEntry && fbEntry.team) savedTeam = fbEntry.team;
        }
        if(savedTeam === 'PR' || savedTeam === 'BB') {
          team = savedTeam;
          console.log(`ℹ️ Plain GUY prefix — team from Firebase roster: ${team} for`, nameRaw);
        } else {
          console.warn('⚠️ Team unresolved — defaulting BB:', nameRaw, 'ID:', csvYtelId);
          team = 'BB';
        }
      }
    }

    const n = s => parseInt((cols[s]||'0').replace(/[^0-9]/g,''))||0;

    const calls  = n(iCalls);
    const ci     = n(iCI);
    const xfer   = n(iXfer);
    const dnc    = n(iDNC);
    const ni     = n(iNI);
    const hangup = n(iHangup);
    const spnsh  = n(iSpnsh);
    const crpull = n(iCRPull);
    const callbk = n(iCallbk);
    const conv   = calls > 0 ? parseFloat(((xfer/calls)*100).toFixed(1)) : 0;

    statsData.push({name, nameRaw, ytelId: csvYtelId||'', team, calls, ci, xfer, dnc, ni, hangup, spnsh, crpull, callbk, conv});
  }

  console.log('CSV parsed:', statsData.length, 'agents | delimiter:', DELIM === ',' ? 'comma' : 'semicolon');
}

// Proper CSV line parser — handles quoted fields with commas or semicolons inside
// Pass the delimiter character detected from the header line (default: comma)
function parseCSVLine(line, delim){
  // Strip trailing \r in case of Windows \r\n line endings
  line = line.replace(/\r$/,'');
  delim = delim || ',';
  const result=[];
  let cur='', inQ=false;
  for(let i=0;i<line.length;i++){
    const c=line[i];
    if(c==='"'){ inQ=!inQ; }
    else if(c===delim&&!inQ){ result.push(cur.trim()); cur=''; }
    else cur+=c;
  }
  result.push(cur.trim());
  return result;
}

function renderStatsTable(){
  const tbody = document.getElementById('stats-tbody');
  const today = getTodayGY();
  const isOldReport = statsDataDate && statsDataDate !== today;

  if(!statsData.length){
    tbody.innerHTML=`<tr><td colspan="9" style="text-align:center;padding:40px;">
      <div style="font-family:'Barlow Condensed',sans-serif;font-size:1.3rem;font-weight:800;color:#64748b;letter-spacing:2px;margin-bottom:12px;">NO DATA YET</div>
      <div style="margin-bottom:16px;">
        <button onclick="document.getElementById('stats-csv-upload').click()" style="padding:12px 28px;border-radius:10px;border:none;background:linear-gradient(90deg,var(--accent),var(--cyan));color:#000;font-family:'Barlow Condensed',sans-serif;font-size:1.1rem;font-weight:800;letter-spacing:2px;cursor:pointer;">⬆ CLICK HERE TO UPLOAD CSV</button>
      </div>
      <div style="font-size:0.72rem;color:#3a4a6a;">Upload a daily CSV report to see agent stats</div>
    </td></tr>`;
    return;
  }

  // Show banner if viewing an old report
  const bannerEl = document.getElementById('old-report-banner');
  if(bannerEl) bannerEl.style.display = isOldReport ? '' : 'none';
  const bannerTxt = document.getElementById('old-report-date');
  if(bannerTxt && isOldReport) bannerTxt.textContent = statsDataDate;

  const q=(document.getElementById('stats-search')||{value:''}).value.toLowerCase();
  let rows=[...statsData].filter(r=>!isAgentInactive(r) && (!q||r.name.toLowerCase().includes(q)));
  const keys=['name','calls','ci','xfer','dnc','ni','conv'];
  rows.sort((a,b)=>typeof a[keys[statsSortCol]]==='string'
    ? a[keys[statsSortCol]].localeCompare(b[keys[statsSortCol]])*statsSortDir
    : (a[keys[statsSortCol]]-b[keys[statsSortCol]])*statsSortDir);

  if(!rows.length){
    tbody.innerHTML='<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:16px;">No agents match search.</td></tr>';
    return;
  }
  tbody.innerHTML=rows.map((r,i)=>{
    const cc=r.conv>=5?'var(--green)':r.conv>=2?'var(--gold)':'var(--red)';
    const team=r.team==='BB'?'<span style="color:var(--accent);font-size:0.72rem;font-weight:800;">BB</span>':'<span style="color:var(--purple);font-size:0.72rem;font-weight:800;">PR</span>';
    return `<tr onclick="openRepProfile('',${JSON.stringify(r.name)},'${r.team}','')">
      <td style="color:var(--muted);font-size:0.7rem;">${i+1}</td>
      <td style="font-weight:700;">${r.name}</td>
      <td>${team}</td>
      <td>${r.calls.toLocaleString()}</td>
      <td>${r.ci.toLocaleString()}</td>
      <td><span class="att-badge att-p">${r.xfer}</span></td>
      <td><span class="att-badge att-a">${r.dnc}</span></td>
      <td><span class="att-badge att-l">${r.ni}</span></td>
      <td style="color:${cc};font-weight:800;">${r.conv}%</td>
    </tr>`;
  }).join('');
}

function sortStats(col){
  statsSortDir=statsSortCol===col?-statsSortDir:-1;
  statsSortCol=col;
  renderStatsTable();
}
function filterStatsTable(){ renderStatsTable(); }

// ── REP PROFILE ──
// ══════════════════════════════════════════════
//  FULL AGENT ANALYSIS PANEL
// ══════════════════════════════════════════════

async function openRepProfile(id,name,team,shift){
  // Always resolve full agent from ROSTER — id may be empty or stale (e.g. stats table)
  const rAll = Object.values(ROSTER);
  const rKeys = Object.keys(ROSTER);
  let rAgent = (id && id!=='') ? ROSTER[String(id)] : null;
  if(!rAgent && name){
    const nl = name.toLowerCase();
    rAgent = rAll.find(r=>r.name.toLowerCase()===nl)
          || rAll.find(r=>r.name.toLowerCase().includes(nl.split(' ')[0]) && r.name.toLowerCase().includes(nl.split(' ').slice(-1)[0]));
  }
  // Get the actual userId key from ROSTER map
  const resolvedId = rAgent
    ? String(rKeys.find(k=>ROSTER[k]===rAgent)||id||'')
    : String(id||'');

  // Pull break time from Firebase
  let brk = '';
  if(resolvedId && resolvedId!==''&&resolvedId!=='unknown'){
    try{
      const bSnap = await db.collection('roster').doc(resolvedId).get();
      if(bSnap.exists) brk = bSnap.data().brk||'';
    }catch(e){}
  }

  currentRepProfile = {
    id:     resolvedId,
    name:   rAgent ? rAgent.name   : name,
    team:   rAgent ? rAgent.team   : (team||'BB'),
    shift:  rAgent ? rAgent.shift  : (shift||''),
    lunch:  rAgent ? rAgent.lunch  : '',
    brk,
    status: rAgent ? (rAgent.status||'Agent') : 'Agent'
  };

  const p = currentRepProfile;
  const teamFull = p.team==='BB'?'Berbice':p.team==='PR'?'Providence':(p.team||'—');
  document.getElementById('rp-name').textContent          = p.name;
  document.getElementById('ap-avatar').textContent        = p.name.split(' ').map(x=>x[0]||'').join('').substring(0,2).toUpperCase();
  document.getElementById('rp-meta').textContent          = 'ID: '+(resolvedId||'—')+' · Lunch: '+(p.lunch||'—');
  document.getElementById('ap-team-badge').textContent    = p.team+' · '+teamFull;
  document.getElementById('ap-status-badge').textContent  = p.status;
  document.getElementById('ap-shift-badge').textContent   = p.shift||'No shift';

  document.getElementById('rep-profile-overlay').classList.add('open');
  document.body.style.overflow='hidden';

  // Pre-load monthly cache if not yet populated (so attendance data shows immediately)
  if(Object.keys(monthlyCache).length === 0){
    loadMonthlyAttendance().catch(()=>{}).then(()=>{
      // Refresh overview after monthly loads if still on that tab
      if(currentRepProfile && document.getElementById('apt-overview')?.classList.contains('active')){
        apLoadOverview(currentRepProfile.id, currentRepProfile.name);
      }
    });
  }

  apTab('overview', document.getElementById('apt-overview'));
}

function closeRepProfile(){
  document.getElementById('rep-profile-overlay').classList.remove('open');
  document.body.style.overflow='';
  currentRepProfile = null;
}

function apTab(tab, btn){
  ['overview','attendance','coaching','monitoring','schedule','audit','rebuttal','stats'].forEach(t=>{
    const el = document.getElementById('ap-'+t);
    if(el) el.style.display = t===tab ? '' : 'none';
    const b  = document.getElementById('apt-'+t);
    if(b){ b.classList.toggle('active', t===tab); }
  });
  if(!currentRepProfile) return;
  const {id, name} = currentRepProfile;
  if(tab==='overview')   { apLoadOverview(id,name); }
  if(tab==='attendance') { apLoadAttendance(id,name); }
  if(tab==='coaching')   { apLoadSessions(id,'coaching'); }
  if(tab==='monitoring') { apLoadSessions(id,'monitoring'); }
  if(tab==='schedule')   { apLoadSchedule(); }
  if(tab==='audit')      { loadRepAudit(id); }
  if(tab==='rebuttal')  { apLoadRebuttalUsage(id,name); }
  if(tab==='stats')     { apLoadStatsHistory(name); }
}

// ── OVERVIEW ──
async function apLoadOverview(id,name){
  const today      = getTodayGY();
  const monthStart = today.substring(0,7);
  const idStr      = String(id||'');

  // Show loading state
  ['rp-att-p','rp-att-l','rp-att-a','rp-att-rate','rp-live-calls','rp-live-xfer','rp-coach-count','rp-monitor-count'].forEach(i=>{
    const el=document.getElementById(i); if(el) el.textContent='…';
  });
  document.getElementById('rp-live-conv').textContent='…';
  document.getElementById('rp-att-status').innerHTML='<span style="color:#64748b;">Loading...</span>';

  // ── Today's attendance status ──
  try{
    const attSnap = await db.collection('attendance').doc(idStr+'_'+today).get();
    const el = document.getElementById('rp-att-status');
    if(attSnap && attSnap.exists){
      const d=attSnap.data();
      const s=normalizeStatus(d.status);
      const label=s==='P'?'Present':s==='L'?'Late':s==='A'?'Absent':s==='S'?'Sick':d.status||'—';
      const col=s==='P'?'#34d399':s==='L'?'#fbbf24':'#f87171';
      el.innerHTML=`<span style="color:${col};font-weight:800;font-size:0.9rem;">● ${label}</span>`;
    } else {
      el.innerHTML='<span style="color:#64748b;font-size:0.75rem;">Not logged in today</span>';
    }
  }catch(e){ document.getElementById('rp-att-status').innerHTML='<span style="color:#64748b;">—</span>'; }

  // ── Today's calls/xfer ──
  ['rp-live-calls','rp-live-xfer','rp-live-conv'].forEach(i=>{ const el=document.getElementById(i); if(el) el.textContent='0'; });
  const csvAgent = statsData.find(r=>r.name&&(r.name.toLowerCase()===name.toLowerCase()||name.toLowerCase().includes(r.name.toLowerCase())));
  if(csvAgent){
    document.getElementById('rp-live-calls').textContent = csvAgent.calls||'0';
    document.getElementById('rp-live-xfer').textContent  = csvAgent.xfer||'0';
    document.getElementById('rp-live-conv').textContent  = (csvAgent.conv||'0')+'%';
  } else {
    try{
      const tSnap = await db.collection('taps').doc(idStr+'_'+today).get();
      if(tSnap && tSnap.exists){
        const d=tSnap.data();
        document.getElementById('rp-live-calls').textContent = d.calls||0;
        document.getElementById('rp-live-xfer').textContent  = d.xfer||0;
        document.getElementById('rp-live-conv').textContent  = d.calls>0?Math.round((d.xfer/d.calls)*100)+'%':'0%';
      }
    }catch(e){}
  }

  // ── Monthly attendance ──
  // 1. Try monthlyCache (populated if Monthly tab was visited)
  let p=0,l=0,a=0;
  const nameKey  = name.toLowerCase().trim();
  const sheetAtt = monthlyCache[nameKey]||{};

  if(Object.keys(sheetAtt).length > 0){
    Object.values(sheetAtt).forEach(s=>{
      const c=normalizeStatus(s);
      if(c==='P') p++;
      else if(c==='L') l++;
      else if(c&&c!=='OFF') a++;
    });
  } else {
    // 2. Fallback: scan all attendance docs for this agent this month
    // Use a simple collection scan filtered client-side to avoid index requirement
    try{
      const allDocs = await db.collection('attendance')
        .where('id','==',idStr)
        .get();
      allDocs.forEach(doc=>{
        const d=doc.data();
        if(!d.date || !d.date.startsWith(monthStart)) return;
        const c=normalizeStatus(d.status);
        if(c==='P') p++;
        else if(c==='L') l++;
        else if(c&&c!=='OFF') a++;
      });
    }catch(e){
      // Last resort: scan by doc ID prefix pattern
      try{
        const daysInMonth = new Date(parseInt(monthStart.split('-')[0]), parseInt(monthStart.split('-')[1]), 0).getDate();
        const promises = [];
        for(let d=1;d<=daysInMonth;d++){
          const dateStr = monthStart+'-'+(d<10?'0':'')+d;
          promises.push(db.collection('attendance').doc(idStr+'_'+dateStr).get());
        }
        const snaps = await Promise.all(promises);
        snaps.forEach(snap=>{
          if(!snap.exists) return;
          const c=normalizeStatus(snap.data().status);
          if(c==='P') p++;
          else if(c==='L') l++;
          else if(c&&c!=='OFF') a++;
        });
      }catch(e2){}
    }
  }

  const total = p+l+a;
  const rate  = total>0?Math.round((p/total)*100):0;
  document.getElementById('rp-att-p').textContent    = p;
  document.getElementById('rp-att-l').textContent    = l;
  document.getElementById('rp-att-a').textContent    = a;
  document.getElementById('rp-att-rate').textContent = total>0?rate+'%':'—';
  if(total>0){
    document.getElementById('ap-bar-p').style.width = (p/total*100)+'%';
    document.getElementById('ap-bar-l').style.width = (l/total*100)+'%';
    document.getElementById('ap-bar-a').style.width = (a/total*100)+'%';
  } else {
    ['ap-bar-p','ap-bar-l','ap-bar-a'].forEach(i=>{ const el=document.getElementById(i); if(el) el.style.width='0%'; });
  }

  // ── Coaching & monitoring counts ──
  try{
    let cSnap = await db.collection('coaching_sessions').where('repId','==',idStr).get();
    if(cSnap.empty){
      cSnap = await db.collection('coaching_sessions').where('repName','==',name).get();
    }
    let coaching=0, monitoring=0, lastDate='';
    cSnap.forEach(doc=>{
      const d=doc.data();
      if(d.type==='monitoring') monitoring++; else coaching++;
      const ds=d.date||(d.createdAt?new Date(d.createdAt.seconds*1000).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'America/Guyana'}):'');
      if(ds>lastDate) lastDate=ds;
    });
    document.getElementById('rp-coach-count').textContent   = coaching;
    document.getElementById('rp-monitor-count').textContent = monitoring;
    document.getElementById('rp-last-coach').textContent    = lastDate?'Last session: '+lastDate:'No sessions yet';
  }catch(e){
    document.getElementById('rp-coach-count').textContent   = '0';
    document.getElementById('rp-monitor-count').textContent = '0';
    document.getElementById('rp-last-coach').textContent    = '';
  }

  // ── Streak ──
  try{
    loadAgentStreakForProfile(idStr, name);
  }catch(e){}

  // ── Rebuttal mini card ──
  apLoadRebuttalMini(idStr, name);
}

// ── ATTENDANCE ──
async function apLoadAttendance(id,name){
  const today      = getTodayGY();
  const monthStart = today.substring(0,7);
  const year       = parseInt(monthStart.split('-')[0]);
  const monthIdx   = parseInt(monthStart.split('-')[1])-1;
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const idStr      = String(id||'');

  document.getElementById('ap-cal-month-lbl').textContent = monthNames[monthIdx].toUpperCase()+' '+year;

  // Build attMap from monthlyCache first, then overlay Firebase docs
  const nameKey = name.toLowerCase().trim();
  const attMap  = {...(monthlyCache[nameKey]||{})};

  // Fetch all attendance docs for this month by doc ID (no index needed)
  const daysInMonth = new Date(year, monthIdx+1, 0).getDate();
  try{
    const promises = [];
    for(let d=1;d<=daysInMonth;d++){
      const dateStr = monthStart+'-'+String(d).padStart(2,'0');
      promises.push(db.collection('attendance').doc(idStr+'_'+dateStr).get());
    }
    const snaps = await Promise.all(promises);
    snaps.forEach(snap=>{
      if(!snap.exists) return;
      const d=snap.data();
      if(d.date) attMap[d.date] = normalizeStatus(d.status);
    });
  }catch(e){}

  renderAgentCalendar('ap-cal-current', year, monthIdx, attMap, today);
  renderWeekBars('ap-week-bars', year, monthIdx, attMap);

  // Previous month
  const prevMonthIdx = monthIdx===0?11:monthIdx-1;
  const prevYear     = monthIdx===0?year-1:year;
  const prevStart    = prevYear+'-'+String(prevMonthIdx+1).padStart(2,'0');
  const prevMonthPfx = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][prevMonthIdx];
  document.getElementById('ap-prev-month-lbl').textContent = monthNames[prevMonthIdx].toUpperCase()+' '+prevYear;

  // Build prev attMap: Firebase docs first
  const prevAtt = {};
  const daysInPrev = new Date(prevYear, prevMonthIdx+1, 0).getDate();
  try{
    const promises2 = [];
    for(let d=1;d<=daysInPrev;d++){
      const dateStr = prevStart+'-'+String(d).padStart(2,'0');
      promises2.push(db.collection('attendance').doc(idStr+'_'+dateStr).get());
    }
    const snaps2 = await Promise.all(promises2);
    snaps2.forEach(snap=>{
      if(!snap.exists) return;
      const d=snap.data();
      if(d.date) prevAtt[d.date]=normalizeStatus(d.status);
    });
  }catch(e){}

  // Also pull from Google Sheet previous month Monthly Overview
  try{
    const prevMonthData = await callBridge({action:'getMonthlyAttendance', month: prevMonthPfx});
    if(prevMonthData && prevMonthData.success && Array.isArray(prevMonthData.agents)){
      const nl = name.toLowerCase().trim();
      const agentRow = prevMonthData.agents.find(a=>(a.name||'').toLowerCase().trim()===nl
        || (a.name||'').toLowerCase().includes(nl.split(' ')[0]));
      if(agentRow){
        Object.entries(agentRow.days||{}).forEach(([dayNum,status])=>{
          const d = parseInt(dayNum);
          if(d>=1&&d<=31){
            const dateStr = prevStart+'-'+String(d).padStart(2,'0');
            if(!prevAtt[dateStr]) prevAtt[dateStr]=normalizeStatus(status);
          }
        });
      }
    }
  }catch(e){}

  renderAgentCalendar('ap-cal-prev', prevYear, prevMonthIdx, prevAtt, '');
}

function renderAgentCalendar(elId, year, monthIdx, attMap, todayStr){
  const el = document.getElementById(elId);
  if(!el) return;
  const dayNames    = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  const daysInMonth = new Date(year, monthIdx+1, 0).getDate();
  const firstDow    = new Date(year, monthIdx, 1).getDay();

  // Header row
  let html = dayNames.map(d=>`<div class="ap-cal-hdr">${d}</div>`).join('');

  // Empty cells before day 1
  for(let i=0;i<firstDow;i++) html+=`<div class="ap-cal-cell ap-cal-empty"></div>`;

  for(let d=1;d<=daysInMonth;d++){
    const dd      = String(d).padStart(2,'0');
    const mm      = String(monthIdx+1).padStart(2,'0');
    const dateStr = `${year}-${mm}-${dd}`;
    const isToday = dateStr===todayStr;
    const isFuture= todayStr && dateStr>todayStr;
    const raw     = attMap[dateStr]||'';
    const status  = normalizeStatus(raw)||raw;

    let cls='ap-cal-off', lbl='';

    if(isFuture){
      cls='ap-cal-future'; lbl='';
    } else if(status==='P'){
      cls='ap-cal-p'; lbl='P';
    } else if(status==='L'){
      cls='ap-cal-l'; lbl='L';
    } else if(status==='A'){
      cls='ap-cal-a'; lbl='A';
    } else if(status==='S'){
      cls='ap-cal-s'; lbl='S';
    } else if(status==='PO'){
      cls='ap-cal-a'; lbl='PO';
    } else if(status==='OFF'){
      cls='ap-cal-off'; lbl='—';
    } else {
      cls='ap-cal-off'; lbl='';
    }

    html+=`<div class="ap-cal-cell ${cls}${isToday?' ap-cal-today':''}" title="${dateStr}${status?' · '+status:''}">
      <span class="ap-cal-daynum">${d}</span>
      ${lbl?`<span class="ap-cal-lbl">${lbl}</span>`:''}
    </div>`;
  }
  el.innerHTML=html;
}

function renderWeekBars(elId, year, monthIdx, attMap){
  const el=document.getElementById(elId);
  if(!el) return;
  const daysInMonth=new Date(year,monthIdx+1,0).getDate();
  const monthStr=year+'-'+(monthIdx+1<10?'0':'')+(monthIdx+1);

  // Group into Mon–Sun weeks
  const weeks=[];
  let week=null;
  for(let d=1;d<=daysInMonth;d++){
    const dateStr=monthStr+'-'+(d<10?'0':'')+d;
    const dow=new Date(year,monthIdx,d).getDay();
    if(!week||dow===1){ // start new week on Monday
      if(week) weeks.push(week);
      week={label:'',days:[]};
    }
    if(!week.label) week.label=monthStr.split('-')[1]+'/'+String(d).padStart(2,'0');
    else week.end=String(d).padStart(2,'0');
    week.days.push({dateStr,dow});
  }
  if(week) weeks.push(week);

  el.innerHTML=weeks.map(w=>{
    let p=0,l=0,a=0,worked=0;
    w.days.forEach(({dateStr,dow})=>{
      const s=attMap[dateStr]||'';
      if(dow===0) return; // skip Sunday for bar (still in calendar)
      if(s==='P'){p++;worked++;}
      else if(s==='L'){l++;worked++;}
      else if(s==='A'||s==='S'||s==='PO'){a++;worked++;}
    });
    const total=p+l+a||1;
    const lbl=w.label+(w.end?'–'+w.end:'');
    return `<div class="ap-week-row">
      <div class="ap-week-lbl">Week ${lbl}</div>
      <div class="ap-week-bar-wrap">
        <div class="ap-week-seg p" style="width:${p/total*100}%">${p>0?p:''}</div>
        <div class="ap-week-seg l" style="width:${l/total*100}%">${l>0?l:''}</div>
        <div class="ap-week-seg a" style="width:${a/total*100}%">${a>0?a:''}</div>
      </div>
      <div class="ap-week-counts" style="color:#34d399;">${p}P ${l>0?'<span style="color:#fbbf24;">'+l+'L</span>':''} ${a>0?'<span style="color:#f87171;">'+a+'A</span>':''}</div>
    </div>`;
  }).join('');
}

// ── COACHING / MONITORING SESSIONS in agent profile ──
async function apLoadSessions(id, type){
  const listId = type==='coaching' ? 'ap-coaching-list' : 'ap-monitoring-list';
  const el = document.getElementById(listId);
  if(!el) return;
  el.innerHTML='<div style="color:#64748b;font-size:0.78rem;">Loading...</div>';

  const renderDocs = docs => {
    const filtered = type==='monitoring'
      ? docs.filter(d=>d.type==='monitoring')
      : docs.filter(d=>d.type!=='monitoring');
    if(!filtered.length){
      el.innerHTML=`<div style="color:#64748b;font-size:0.78rem;padding:20px 0;">No ${type} sessions recorded yet.</div>`;
      return;
    }
    // Use the shared renderNoteCard with full edit/delete
    el.innerHTML = filtered.map(d=>renderNoteCard(d, type)).join('');
  };

  const idStr = String(id||'');
  const idNum = parseFloat(id);

  const fetchDocs = async () => {
    // Try string id first
    try{
      const snap = await db.collection('coaching_sessions')
        .where('repId','==',idStr)
        .orderBy('createdAt','desc').limit(100).get();
      if(!snap.empty){ const d=[]; snap.forEach(doc=>d.push({id:doc.id,...doc.data()})); return d; }
    }catch(e){}
    // Try numeric id
    if(!isNaN(idNum)){
      try{
        const snap = await db.collection('coaching_sessions')
          .where('repId','==',idNum)
          .orderBy('createdAt','desc').limit(100).get();
        if(!snap.empty){ const d=[]; snap.forEach(doc=>d.push({id:doc.id,...doc.data()})); return d; }
      }catch(e){}
    }
    // Fallback: by agent name
    try{
      const agentName = currentRepProfile ? currentRepProfile.name : '';
      if(agentName){
        const snap = await db.collection('coaching_sessions').where('repName','==',agentName).get();
        const d=[]; snap.forEach(doc=>d.push({id:doc.id,...doc.data()}));
        return d.sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));
      }
    }catch(e){}
    // Last resort: no-order query
    try{
      const snap = await db.collection('coaching_sessions').where('repId','==',idStr).get();
      const d=[]; snap.forEach(doc=>d.push({id:doc.id,...doc.data()}));
      return d.sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));
    }catch(e){ return []; }
  };

  try{
    const docs = await fetchDocs();
    renderDocs(docs);
  }catch(e){ el.innerHTML='<div style="color:#f87171;">Could not load sessions.</div>'; }
}

// ── SCHEDULE ──
function apLoadSchedule(){
  if(!currentRepProfile) return;
  const r=currentRepProfile;
  const s=document.getElementById('rp-shift-input');
  const l=document.getElementById('rp-lunch-input');
  const b=document.getElementById('rp-break-input');

  // For the shift dropdown, find the closest matching option
  if(s){
    const shiftVal = (r.shift||'').toLowerCase().replace(/\s+/g,'');
    let matched = '';
    Array.from(s.options).forEach(opt=>{
      if(opt.value && opt.value.toLowerCase().replace(/\s+/g,'') === shiftVal) matched = opt.value;
    });
    s.value = matched || r.shift || '';
  }
  if(l) l.value=r.lunch||'';
  if(b) b.value=r.brk||'';
  const t=document.getElementById('rp-team-input');
  if(t) t.value=r.team||'';
  ['rp-shift-status','rp-lunch-status','rp-break-status','rp-team-status'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.textContent='';
  });
}

// Keep old rpTab as alias for backward compat
function rpTab(tab,btn){
  const map={perf:'overview',schedule:'schedule',att:'attendance',coach:'coaching',audit:'audit'};
  apTab(map[tab]||tab, document.getElementById('apt-'+(map[tab]||tab)));
}

async function loadRepPerf(id,name,team){ apLoadOverview(id,name); }
async function loadRepAtt(id){
  if(currentRepProfile) apLoadAttendance(id, currentRepProfile.name);
}
async function loadRepCoach(id){
  apLoadSessions(id,'coaching');
}

async function saveRosterField(field){
  if(!currentRepProfile) return;
  const r = currentRepProfile;
  const inputEl  = document.getElementById('rp-'+field+'-input');
  const statusEl = document.getElementById('rp-'+field+'-status');
  if(!inputEl) return;
  const value = inputEl.value.trim();
  if(!value){
    if(statusEl){ statusEl.textContent='⚠ Please enter a value.'; statusEl.style.color='#f87171'; }
    return;
  }
  if(statusEl){ statusEl.textContent='Saving...'; statusEl.style.color='#64748b'; }

  // Team → Firebase + Google Sheet
  if(field==='team'){
    if(!r.id||r.id===''){ if(statusEl){ statusEl.textContent='❌ Agent ID missing'; statusEl.style.color='#f87171'; } return; }
    if(value!=='BB'&&value!=='PR'){ if(statusEl){ statusEl.textContent='⚠ Please select a team.'; statusEl.style.color='#f87171'; } return; }
    try{
      await db.collection('roster').doc(r.id).set({team:value},{merge:true});
      await callBridge({action:'updateRosterField', userId:r.id, field:'team', value}).catch(()=>{});
      currentRepProfile.team=value;
      if(ROSTER[r.id]) ROSTER[r.id].team=value;
      if(currentUser && String(currentUser.id)===String(r.id)){ currentUser.team=value; }
      const metaEl=document.getElementById('pe-meta');
      if(metaEl) metaEl.textContent=(value==='BB'?'Berbice (BB)':'Providence (PR)')+' · ID: '+r.id;
      if(statusEl){ statusEl.textContent='✅ Team saved — re-upload CSV to apply'; statusEl.style.color='#34d399'; }
      setTimeout(()=>{ if(statusEl) statusEl.textContent=''; },5000);
    }catch(e){
      if(statusEl){ statusEl.textContent='❌ '+e.message; statusEl.style.color='#f87171'; }
    }
    return;
  }

  // Break → Firebase only
  if(field==='break'){    try{
      if(!r.id||r.id===''){ throw new Error('Agent ID not found'); }
      await db.collection('roster').doc(r.id).set({brk:value},{merge:true});
      currentRepProfile.brk = value;
      if(statusEl){ statusEl.textContent='✅ Break saved'; statusEl.style.color='#34d399'; }
      if(currentUser && String(currentUser.id)===String(r.id)){ currentUser.brk=value; }
      setTimeout(()=>{ if(statusEl) statusEl.textContent=''; },4000);
    }catch(e){
      if(statusEl){ statusEl.textContent='❌ '+e.message; statusEl.style.color='#f87171'; }
    }
    return;
  }

  // Shift / Lunch → Google Sheet
  if(!r.id || r.id==='' || r.id==='unknown'){
    if(statusEl){ statusEl.textContent='❌ Agent ID missing — open profile from Agent Profiles tab'; statusEl.style.color='#f87171'; }
    return;
  }

  try{
    const result = await callBridge({action:'updateRosterField', userId:r.id, field, value});
    if(result && result.success){
      if(field==='shift'){
        currentRepProfile.shift=value;
        if(ROSTER[r.id]) ROSTER[r.id].shift=value;
        const sb=document.getElementById('ap-shift-badge');
        if(sb) sb.textContent=value;
      }
      if(field==='lunch'){
        currentRepProfile.lunch=value;
        if(ROSTER[r.id]) ROSTER[r.id].lunch=value;
        const mb=document.getElementById('rp-meta');
        if(mb) mb.textContent='ID: '+r.id+' · Lunch: '+value;
      }
      // Push to Firebase so agent sees update on next login
      const fbUp={}; fbUp[field]=value;
      await db.collection('roster').doc(r.id).set(fbUp,{merge:true}).catch(()=>{});
      if(currentUser && String(currentUser.id)===String(r.id)){
        currentUser[field]=value; showDashboard();
      }
      if(statusEl){ statusEl.textContent='✅ Saved to Google Sheet & Firebase'; statusEl.style.color='#34d399'; }
      setTimeout(()=>{ if(statusEl) statusEl.textContent=''; },4000);
    } else {
      if(statusEl){ statusEl.textContent='❌ '+(result?.error||'Save failed'); statusEl.style.color='#f87171'; }
    }
  }catch(e){
    if(statusEl){ statusEl.textContent='❌ '+e.message; statusEl.style.color='#f87171'; }
  }
}

async function loadRepPerf(id,name,team){
  const today=getTodayGY();
  try{
    const snap=await db.collection('attendance').doc(id+'_'+today).get();
    const el=document.getElementById('rp-att-status');
    if(snap.exists){
      const d=snap.data();
      const s=d.status==='P'||d.status==='Present'?'Present':d.status==='L'||d.status==='Late'?'Late':d.status||'Unknown';
      el.innerHTML=`<span class="att-badge ${s==='Present'?'att-p':s==='Late'?'att-l':'att-a'}">${s}</span><span style="font-size:0.7rem;color:var(--muted);margin-left:8px;">Logged in today</span>`;
    } else {
      el.innerHTML='<span class="att-badge att-pending">Not logged in yet</span>';
    }
  }catch(e){}
  try{
    const snap2=await db.collection('taps').doc(id+'_'+today).get();
    if(snap2.exists){
      const d=snap2.data();
      document.getElementById('rp-live-calls').textContent=d.calls||0;
      document.getElementById('rp-live-xfer').textContent=d.xfer||0;
      document.getElementById('rp-live-conv').textContent=d.calls>0?Math.round((d.xfer/d.calls)*100)+'%':'0%';
    } else {
      ['rp-live-calls','rp-live-xfer'].forEach(id=>document.getElementById(id).textContent='0');
      document.getElementById('rp-live-conv').textContent='0%';
    }
  }catch(e){}
  // Stats from CSV
  const csvAgent=statsData.find(r=>r.name.toLowerCase()===name.toLowerCase()||name.toLowerCase().includes(r.name.toLowerCase()));
  if(csvAgent){
    document.getElementById('rp-live-calls').textContent=csvAgent.calls;
    document.getElementById('rp-live-xfer').textContent=csvAgent.xfer;
    document.getElementById('rp-live-conv').textContent=csvAgent.conv+'%';
  }
}

async function loadRepAtt(id){
  const today=getTodayGY();
  const monthStart=today.substring(0,7);
  try{
    const snap=await db.collection('attendance')
      .where('id','==',id)
      .where('date','>=',monthStart+'-01')
      .get();
    let p=0,l=0,a=0;
    snap.forEach(doc=>{
      const d=doc.data();
      if(d.status==='Present'||d.status==='P') p++;
      else if(d.status==='Late'||d.status==='L') l++;
      else a++;
    });
    document.getElementById('rp-att-p').textContent=p;
    document.getElementById('rp-att-l').textContent=l;
    document.getElementById('rp-att-a').textContent=a;
  }catch(e){}
}

async function loadRepAudit(id){
  const list = document.getElementById('audit-list');
  if(!list) return;
  list.innerHTML='<div style="color:#64748b;font-size:0.78rem;">Loading...</div>';
  const idStr = String(id||'');
  const idNum = parseFloat(id);
  try{
    let snap = await db.collection('sessions').where('id','==',idStr).orderBy('loginTime','desc').limit(20).get();
    if(snap.empty && !isNaN(idNum)){
      snap = await db.collection('sessions').where('id','==',idNum).orderBy('loginTime','desc').limit(20).get();
    }
    if(snap.empty){ list.innerHTML='<div style="color:#64748b;font-size:0.78rem;">No login history found.</div>'; return; }
    list.innerHTML='';
    snap.forEach(doc=>{
      const d=doc.data();
      const date=d.loginTime?new Date(d.loginTime.seconds*1000).toLocaleString('en-US',{timeZone:'America/Guyana',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}):'—';
      list.innerHTML+=`<div class="ap-login-row">
        <span style="color:#e2e8f0;font-weight:600;">${d.date||'—'}</span>
        <span style="color:#64748b;">Logged in at <strong style="color:#60a5fa;">${date}</strong></span>
      </div>`;
    });
  }catch(e){
    list.innerHTML='<div style="color:#64748b;">Could not load audit log.</div>';
  }
}

async function markAgentAbsent(status){
  if(!currentRepProfile) return;
  const {id,name,team,shift}=currentRepProfile;
  const today=getTodayGY();
  const labels={P:'Present',L:'Late',A:'Absent',S:'Sick',PO:'Personal Out'};
  const label = labels[status]||status;
  if(!confirm('Mark '+name+' as '+label+' for today?')) return;
  try{
    await db.collection('attendance').doc(id+'_'+today).set({
      id, name, team, shift, date:today, status,
      markedBy:'admin', loginTime:firebase.firestore.FieldValue.serverTimestamp()
    },{merge:true});
    // Also write to Google Sheet weekly tab
    try{ await callBridge({action:'markAttendance', name, team, status}); }catch(e){}
    // Refresh the overview stats
    apLoadOverview(id, name);
  }catch(e){ alert('Could not save: '+e.message); }
}

async function markAgentAbsentDirect(id,name,team){
  const status=prompt('Mark '+name+' as:\nP = Present  L = Late  A = Absent  S = Sick  PO = Personal Out\n\nType the code:','A');
  if(!status) return;
  const today=getTodayGY();
  try{
    await db.collection('attendance').doc(id+'_'+today).set({
      id,name,team,date:today,status:status.toUpperCase().trim(),
      markedBy:'admin',loginTime:firebase.firestore.FieldValue.serverTimestamp()
    },{merge:true});
    loadAdminAttendance();
  }catch(e){alert('Could not save.');}
}


// ══════════════════════════════════════════════
//  WEEKLY PERFORMANCE TAB
//  Aggregates all saved CSV reports within the
//  current Mon–Sun week (and past weeks) and
//  ranks every rep by total transfers
// ══════════════════════════════════════════════
let wpTeamFilter  = 'all';
let wpWeekRanges  = []; // [{label, start, end}] populated from reports
let wpAllReports  = []; // all parsed reports with dates

function wpSetTeam(team, btn){
  wpTeamFilter = team;
  ['all','bb','pr'].forEach(t=>{
    const b = document.getElementById('wp-'+t);
    if(!b) return;
    const active = t === team.toLowerCase() || (team==='all'&&t==='all') || (team==='BB'&&t==='bb') || (team==='PR'&&t==='pr');
    b.style.borderColor = active ? (team==='BB'?'var(--accent)':team==='PR'?'var(--purple)':'var(--accent)') : 'var(--border)';
    b.style.background  = active ? (team==='BB'?'#0b1a38':team==='PR'?'#160e2c':'#0b1a38') : 'transparent';
    b.style.color       = active ? (team==='BB'?'var(--accent)':team==='PR'?'var(--purple)':'var(--accent)') : 'var(--muted)';
  });
  renderWeeklyPerformance();
}

// Get Monday of week containing a date string YYYY-MM-DD
// Uses T12:00:00 to avoid UTC timezone shifting the date
function getMondayOf(dateStr){
  const d = new Date(dateStr+'T12:00:00');
  const day = d.getDay(); // 0=Sun,1=Mon...6=Sat
  const diff = (day === 0) ? -6 : 1 - day; // Monday = day 1, diff=0; Sun = day 0, diff=-6
  const mon = new Date(d);
  mon.setDate(d.getDate() + diff);
  // Return as YYYY-MM-DD using local date parts (not toISOString which is UTC)
  const y = mon.getFullYear();
  const m = String(mon.getMonth()+1).padStart(2,'0');
  const dd= String(mon.getDate()).padStart(2,'0');
  return `${y}-${m}-${dd}`;
}

function getSundayOf(mondayStr){
  const d = new Date(mondayStr+'T12:00:00');
  d.setDate(d.getDate() + 6);
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const dd= String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${dd}`;
}

function fmtDate(str){
  const d = new Date(str+'T12:00:00');
  return d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
}

async function loadWeeklyPerformance(){
  const content = document.getElementById('wp-content');
  const summary = document.getElementById('wp-summary');
  if(!content) return;
  content.innerHTML='<div style="text-align:center;color:var(--muted);padding:40px;font-size:0.85rem;">⏳ Loading reports...</div>';

  // Always reload all reports fresh — need full history across all weeks
  try{
    const snap = await db.collection('reports').orderBy('uploadedAt','desc').get();
    reportHistory=[];
    snap.forEach(doc=>{ const d=doc.data(); if(d.statsJSON) reportHistory.push(d); });
  }catch(e){ console.error('Weekly perf load error:',e); }

  if(!reportHistory.length){
    content.innerHTML='<div style="color:var(--muted);text-align:center;padding:40px;">No saved reports yet. Upload CSVs in Agent Stats to build history.</div>';
    return;
  }

  // Parse all reports — use stored team (correctly set at upload time)
  wpAllReports = [];
  reportHistory.forEach(r=>{
    try{
      const raw = JSON.parse(r.statsJSON);
      // Use stored team value — do NOT re-resolve (resolveAgentTeam defaults to BB for
      // anyone not in ROSTER, causing PR agents to appear as BB)
      const agents = raw.map(a=>({
        ...a,
        team: a.team || 'BB',
        _inactive: isAgentInactive(a)
      }));
      wpAllReports.push({date: r.date, agents});
    }catch(e){}
  });

  // Build week ranges from all report dates
  const weekSet = {};
  wpAllReports.forEach(r=>{
    const mon = getMondayOf(r.date);
    const sun = getSundayOf(mon);
    const label = fmtDate(mon)+' – '+fmtDate(sun);
    weekSet[mon] = {label, start:mon, end:sun};
  });
  wpWeekRanges = Object.values(weekSet).sort((a,b)=>b.start.localeCompare(a.start));

  // Populate week selector
  const sel = document.getElementById('wp-week-select');
  if(sel){
    // Get current week's Monday to flag it
    const todayMon = getMondayOf(getTodayGY());
    sel.innerHTML = wpWeekRanges.map((w,i)=>{
      const isCurrent = w.start === todayMon;
      const isPrev    = w.start < todayMon;
      const prefix    = isCurrent ? '⚡ This Week — ' : isPrev ? '📅 ' : '📅 ';
      return `<option value="${i}">${prefix}${w.label}</option>`;
    }).join('');
    // Always default to current week if it exists, else most recent
    const currentIdx = wpWeekRanges.findIndex(w=>w.start===todayMon);
    sel.value = currentIdx >= 0 ? String(currentIdx) : '0';
  }

  renderWeeklyPerformance();
}

function renderWeeklyPerformance(){
  const content = document.getElementById('wp-content');
  const summary = document.getElementById('wp-summary');
  if(!content || !wpWeekRanges.length) return;

  const sel = document.getElementById('wp-week-select');
  const weekIdx = sel ? parseInt(sel.value)||0 : 0;
  const week = wpWeekRanges[weekIdx];
  if(!week) return;

  // Update label
  const todayMon2 = getMondayOf(getTodayGY());
  const isCurrentWeek = week.start === todayMon2;
  const isPastWeek    = week.start < todayMon2;
  const lbl = document.getElementById('wp-week-label');
  if(lbl){
    lbl.textContent = (isCurrentWeek ? '⚡ CURRENT WEEK — ' : isPastWeek ? '📅 PREV WEEK — ' : '📅 ') + week.label;
    lbl.style.color = isCurrentWeek ? 'var(--green)' : 'var(--gold)';
  }

  // Get all reports within this Mon–Sun window
  const weekReports = wpAllReports.filter(r=> r.date >= week.start && r.date <= week.end);

  if(!weekReports.length){
    content.innerHTML='<div style="color:var(--muted);text-align:center;padding:30px;">No reports uploaded for this week.</div>';
    summary.innerHTML='';
    return;
  }

  // Aggregate per agent across all days in the week
  // Use ytelId as primary key so same person across reports is always merged correctly
  const agentMap = {};
  weekReports.forEach(report=>{
    report.agents.forEach(a=>{
      // Skip inactive agents (pre-computed at load time via isAgentInactive)
      if(a._inactive) return;
      // Team already resolved at load time
      const resolvedTeam = a.team;
      // Key by ytelId if available, else cleaned name — prevents duplicates across reports
      const key = a.ytelId ? 'id_'+a.ytelId : 'name_'+a.name.toLowerCase().trim();
      if(!agentMap[key]){
        agentMap[key] = {
          name: a.name, nameRaw: a.nameRaw||'', ytelId: a.ytelId||'',
          team: resolvedTeam, xfer:0, calls:0, ci:0, dnc:0, ni:0,
          convSum:0, days:0, dailyXfer:{}
        };
      }
      // Always keep the most accurate team from latest resolution
      agentMap[key].team = resolvedTeam;
      agentMap[key].xfer    += (a.xfer||0);
      agentMap[key].calls   += (a.calls||0);
      agentMap[key].ci      += (a.ci||0);
      agentMap[key].dnc     += (a.dnc||0);
      agentMap[key].ni      += (a.ni||0);
      agentMap[key].convSum += (a.conv||0);
      agentMap[key].days    += 1;
      agentMap[key].dailyXfer[report.date] = (agentMap[key].dailyXfer[report.date]||0) + (a.xfer||0);
    });
  });

  // Get sorted days for the week
  const weekDays = [...new Set(weekReports.map(r=>r.date))].sort();

  // Filter by team
  let agents = Object.values(agentMap);
  if(wpTeamFilter === 'BB') agents = agents.filter(a=>a.team==='BB');
  if(wpTeamFilter === 'PR') agents = agents.filter(a=>a.team==='PR');

  // Sort by total xfer descending
  agents.sort((a,b)=>b.xfer - a.xfer);

  if(!agents.length){
    content.innerHTML='<div style="color:var(--muted);text-align:center;padding:30px;">No data for selected team.</div>';
    summary.innerHTML='';
    return;
  }

  // Summary cards
  const totalXfer  = agents.reduce((s,a)=>s+a.xfer,0);
  const totalCalls = agents.reduce((s,a)=>s+a.calls,0);
  const bbXfer     = Object.values(agentMap).filter(a=>a.team==='BB').reduce((s,a)=>s+a.xfer,0);
  const prXfer     = Object.values(agentMap).filter(a=>a.team==='PR').reduce((s,a)=>s+a.xfer,0);
  const topRep     = agents[0];

  summary.innerHTML = [
    {label:'TOTAL XFERS',   val:totalXfer,              color:'var(--green)'},
    {label:'TOTAL CALLS',   val:totalCalls.toLocaleString(), color:'var(--accent)'},
    {label:'🏠 BERBICE',    val:bbXfer,                 color:'var(--accent)'},
    {label:'🌴 PROVIDENCE', val:prXfer,                 color:'var(--purple)'},
    {label:'DAYS LOADED',   val:weekDays.length,        color:'var(--gold)'},
    {label:'REPS TRACKED',  val:agents.length,          color:'var(--cyan)'},
  ].map(s=>`<div style="background:#0a1020;border:1px solid var(--border);border-radius:9px;padding:10px;text-align:center;">
    <div style="font-family:'Bebas Neue',sans-serif;font-size:1.7rem;color:${s.color};line-height:1;">${s.val}</div>
    <div style="font-size:0.48rem;color:var(--muted);font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-top:2px;">${s.label}</div>
  </div>`).join('');

  // Build the leaderboard
  const maxXfer = agents[0].xfer || 1;
  let html = `
  <div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:10px;">
    RANKED BY TRANSFERS — ${weekDays.length} DAY${weekDays.length!==1?'S':''} (${weekDays.map(fmtDate).join(', ')})
  </div>`;

  agents.forEach((a, idx)=>{
    const rank     = idx+1;
    const avgConv  = a.days>0 ? (a.convSum/a.days).toFixed(1) : '0.0';
    const barPct   = Math.round((a.xfer/maxXfer)*100);
    const teamColor= a.team==='BB'?'var(--accent)':'var(--purple)';
    const teamLabel= a.team==='BB'?'BB':'PR';
    const medal    = rank===1?'🥇':rank===2?'🥈':rank===3?'🥉':'';
    const convColor= avgConv>=5?'var(--green)':avgConv>=2?'var(--gold)':'var(--red)';

    // Daily breakdown dots
    const dots = weekDays.map(d=>{
      const v = a.dailyXfer[d]||0;
      const dotColor = v>=5?'var(--green)':v>=2?'var(--gold)':v>0?'var(--accent)':'#1a2540';
      return `<span title="${fmtDate(d)}: ${v} xfer" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${dotColor};margin:0 1px;"></span>`;
    }).join('');

    html += `
    <div style="background:#090f1e;border:1px solid ${rank<=3?teamColor:'var(--border)'};border-radius:11px;padding:13px 14px;margin-bottom:7px;${rank<=3?'box-shadow:0 0 12px rgba(0,0,0,0.3);':''}">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:1.4rem;color:${rank<=3?teamColor:'var(--muted)'};min-width:28px;">${medal||'#'+rank}</div>
        <div style="flex:1;">
          <div style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:1rem;color:var(--text);">${a.name}</div>
          <div style="font-size:0.6rem;color:${teamColor};font-weight:700;letter-spacing:1px;">${teamLabel}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:var(--green);line-height:1;">${a.xfer}</div>
          <div style="font-size:0.5rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">xfers</div>
        </div>
      </div>

      <!-- Transfer bar -->
      <div style="background:#0a1020;border-radius:4px;height:6px;overflow:hidden;margin-bottom:8px;">
        <div style="width:${barPct}%;height:100%;background:linear-gradient(90deg,${teamColor},var(--green));border-radius:4px;transition:width 0.5s;"></div>
      </div>

      <!-- Stats row -->
      <div style="display:flex;gap:14px;font-size:0.7rem;margin-bottom:8px;">
        <span style="color:var(--muted);">Calls: <strong style="color:var(--text);">${a.calls.toLocaleString()}</strong></span>
        <span style="color:var(--muted);">CI: <strong style="color:var(--text);">${a.ci.toLocaleString()}</strong></span>
        <span style="color:var(--muted);">Avg Conv: <strong style="color:${convColor};">${avgConv}%</strong></span>
        <span style="color:var(--muted);">Days: <strong style="color:var(--text);">${a.days}</strong></span>
      </div>

      <!-- Daily dots -->
      <div style="display:flex;align-items:center;gap:4px;">
        <span style="font-size:0.55rem;color:var(--muted);margin-right:4px;">Daily:</span>
        ${dots}
        <span style="font-size:0.62rem;color:var(--muted);margin-left:6px;">${weekDays.map(d=>{
          const v=a.dailyXfer[d]||0;
          return `<span style="margin-right:4px;">${fmtDate(d)}: <strong style="color:${v>=5?'var(--green)':v>=2?'var(--gold)':v>0?'var(--accent)':'var(--muted)'}">${v}</strong></span>`;
        }).join('')}</span>
      </div>
    </div>`;
  });

  content.innerHTML = html;
}

// ── LOAD TODAY REPORT SHORTCUT ──
function loadTodayReport(){
  if(!reportHistory.length) return;
  const idx = reportHistory.findIndex(r=>r.date===getTodayGY());
  if(idx>=0) loadReportByIndex(idx);
  else { statsData=[]; statsDataDate=''; renderStatsTable(); }
}

// ══════════════════════════════════════════════
//  REP STATS HISTORY TAB
// ══════════════════════════════════════════════
let shCurrentView = 'daily';

function shSetView(view){
  shCurrentView = view;
  ['daily','weekly','monthly'].forEach(v=>{
    const btn = document.getElementById('sh-view-'+v);
    if(!btn) return;
    const active = v===view;
    btn.style.borderColor = active ? 'var(--accent)' : 'var(--border)';
    btn.style.background  = active ? '#0b1a38' : 'transparent';
    btn.style.color       = active ? 'var(--accent)' : 'var(--muted)';
  });
  if(currentRepProfile) apLoadStatsHistory(currentRepProfile.name);
}

async function apLoadStatsHistory(name){
  const el = document.getElementById('ap-stats-content');
  if(!el) return;
  el.innerHTML='<div style="color:var(--muted);text-align:center;padding:30px;font-size:0.82rem;">⏳ Loading...</div>';

  if(!reportHistory.length){
    // Try loading from Firestore if not yet loaded
    try{
      const snap = await db.collection('reports').orderBy('uploadedAt','desc').get();
      reportHistory=[];
      snap.forEach(doc=>{ const d=doc.data(); if(d.statsJSON) reportHistory.push(d); });
    }catch(e){}
  }

  if(!reportHistory.length){
    el.innerHTML='<div style="color:var(--muted);text-align:center;padding:30px;font-size:0.82rem;">No saved reports yet. Upload CSVs in Agent Stats to build history.</div>';
    return;
  }

  const nameLower = name.toLowerCase();

  // Pull this agent's data from every saved report
  const agentReports = [];
  reportHistory.forEach(report=>{
    try{
      const data = JSON.parse(report.statsJSON);
      const match = data.find(r=>{
        const rn = r.name.toLowerCase();
        return rn===nameLower || (rn.includes(nameLower.split(' ')[0]) && rn.includes(nameLower.split(' ').slice(-1)[0]));
      });
      if(match) agentReports.push({date: report.date, ...match});
    }catch(e){}
  });

  // Sort oldest → newest
  agentReports.sort((a,b)=>a.date.localeCompare(b.date));

  if(!agentReports.length){
    el.innerHTML='<div style="color:var(--muted);text-align:center;padding:30px;font-size:0.82rem;">No data found for this agent in saved reports.</div>';
    return;
  }

  if(shCurrentView==='daily')   shRenderDaily(el, agentReports);
  else if(shCurrentView==='weekly')  shRenderGrouped(el, agentReports, 'week');
  else shRenderGrouped(el, agentReports, 'month');
}

function shRenderDaily(el, reports){
  // Summary totals
  const totXfer  = reports.reduce((s,r)=>s+r.xfer,0);
  const totCalls = reports.reduce((s,r)=>s+r.calls,0);
  const avgConv  = reports.length ? (reports.reduce((s,r)=>s+r.conv,0)/reports.length).toFixed(1) : 0;
  const bestDay  = [...reports].sort((a,b)=>b.xfer-a.xfer)[0];

  let html = `
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px;">
    <div style="background:#0a1020;border:1px solid var(--border);border-radius:9px;padding:10px;text-align:center;">
      <div style="font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:var(--green);line-height:1;">${totXfer}</div>
      <div style="font-size:0.5rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Total Transfers</div>
    </div>
    <div style="background:#0a1020;border:1px solid var(--border);border-radius:9px;padding:10px;text-align:center;">
      <div style="font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:var(--accent);line-height:1;">${totCalls.toLocaleString()}</div>
      <div style="font-size:0.5rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Total Calls</div>
    </div>
    <div style="background:#0a1020;border:1px solid var(--border);border-radius:9px;padding:10px;text-align:center;">
      <div style="font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:var(--gold);line-height:1;">${avgConv}%</div>
      <div style="font-size:0.5rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Avg Conv %</div>
    </div>
  </div>
  ${bestDay?`<div style="background:var(--green-light);border:1px solid rgba(52,211,153,0.3);border-radius:8px;padding:8px 12px;margin-bottom:12px;font-size:0.75rem;color:var(--green);">⭐ Best day: <strong>${bestDay.date}</strong> — ${bestDay.xfer} transfers, ${bestDay.conv}% conv</div>`:''}
  <div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:8px;">DAILY BREAKDOWN (${reports.length} report${reports.length!==1?'s':''})</div>
  <div style="overflow-x:auto;">
  <table style="width:100%;border-collapse:collapse;font-size:0.78rem;">
    <thead><tr style="border-bottom:1px solid var(--border);">
      <th style="padding:6px 8px;text-align:left;color:var(--muted);font-size:0.58rem;letter-spacing:1px;">DATE</th>
      <th style="padding:6px 8px;text-align:right;color:var(--muted);font-size:0.58rem;letter-spacing:1px;">CALLS</th>
      <th style="padding:6px 8px;text-align:right;color:var(--muted);font-size:0.58rem;letter-spacing:1px;">CI</th>
      <th style="padding:6px 8px;text-align:right;color:var(--muted);font-size:0.58rem;letter-spacing:1px;">XFER</th>
      <th style="padding:6px 8px;text-align:right;color:var(--muted);font-size:0.58rem;letter-spacing:1px;">DNC</th>
      <th style="padding:6px 8px;text-align:right;color:var(--muted);font-size:0.58rem;letter-spacing:1px;">NI</th>
      <th style="padding:6px 8px;text-align:right;color:var(--muted);font-size:0.58rem;letter-spacing:1px;">CONV%</th>
      <th style="padding:6px 8px;text-align:right;color:var(--muted);font-size:0.58rem;letter-spacing:1px;">TREND</th>
    </tr></thead>
    <tbody>`;

  reports.slice().reverse().forEach((r,i,arr)=>{
    const prev = arr[i+1];
    const xferDelta = prev ? r.xfer - prev.xfer : null;
    const convDelta = prev ? (r.conv - prev.conv).toFixed(1) : null;
    const trendIcon = xferDelta===null ? '' : xferDelta>0 ? `<span style="color:var(--green);">▲${xferDelta}</span>` : xferDelta<0 ? `<span style="color:var(--red);">▼${Math.abs(xferDelta)}</span>` : `<span style="color:var(--muted);">—</span>`;
    const cc = r.conv>=5?'var(--green)':r.conv>=2?'var(--gold)':'var(--red)';
    const isToday = r.date === getTodayGY();
    html += `<tr style="border-bottom:1px solid #0d1a2e;${isToday?'background:rgba(52,211,153,0.05);':''}">
      <td style="padding:7px 8px;color:${isToday?'var(--green)':'var(--text)'};font-weight:${isToday?'800':'600'};font-size:0.75rem;">${r.date}${isToday?' ⚡':''}</td>
      <td style="padding:7px 8px;text-align:right;color:var(--muted);">${r.calls.toLocaleString()}</td>
      <td style="padding:7px 8px;text-align:right;color:var(--muted);">${r.ci.toLocaleString()}</td>
      <td style="padding:7px 8px;text-align:right;font-weight:800;color:var(--green);">${r.xfer}</td>
      <td style="padding:7px 8px;text-align:right;color:var(--red);">${r.dnc}</td>
      <td style="padding:7px 8px;text-align:right;color:var(--gold);">${r.ni}</td>
      <td style="padding:7px 8px;text-align:right;font-weight:800;color:${cc};">${r.conv}%</td>
      <td style="padding:7px 8px;text-align:right;font-size:0.72rem;">${trendIcon}</td>
    </tr>`;
  });

  html += '</tbody></table></div>';
  el.innerHTML = html;
}

function shRenderGrouped(el, reports, groupBy){
  // Group by week (Mon-Sun) or month
  const groups = {};
  reports.forEach(r=>{
    let key;
    if(groupBy==='month'){
      key = r.date.substring(0,7); // YYYY-MM
    } else {
      // Get Monday of that week
      const d = new Date(r.date);
      const day = d.getDay(); // 0=Sun
      const diff = d.getDate() - (day===0?6:day-1);
      const mon = new Date(d.setDate(diff));
      key = mon.toISOString().split('T')[0];
    }
    if(!groups[key]) groups[key]=[];
    groups[key].push(r);
  });

  const keys = Object.keys(groups).sort().reverse();
  if(!keys.length){ el.innerHTML='<div style="color:var(--muted);text-align:center;padding:20px;">No data.</div>'; return; }

  let html = `<div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:10px;">${groupBy==='month'?'MONTHLY':'WEEKLY'} SUMMARY</div>`;

  keys.forEach(key=>{
    const reps = groups[key];
    const totalXfer  = reps.reduce((s,r)=>s+r.xfer,0);
    const totalCalls = reps.reduce((s,r)=>s+r.calls,0);
    const totalCI    = reps.reduce((s,r)=>s+r.ci,0);
    const totalDNC   = reps.reduce((s,r)=>s+r.dnc,0);
    const totalNI    = reps.reduce((s,r)=>s+r.ni,0);
    const avgConv    = reps.length ? (reps.reduce((s,r)=>s+r.conv,0)/reps.length).toFixed(1) : 0;
    const label      = groupBy==='month' ? key : `Week of ${key} (${reps.length} day${reps.length!==1?'s':''})`;
    const cc         = avgConv>=5?'var(--green)':avgConv>=2?'var(--gold)':'var(--red)';

    html += `<div style="background:#090f1e;border:1px solid var(--border);border-radius:10px;padding:12px 14px;margin-bottom:10px;">
      <div style="font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:0.95rem;color:var(--text);margin-bottom:10px;">${label}</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:8px;">
        <div style="background:#0a1020;border-radius:7px;padding:8px;text-align:center;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1.5rem;color:var(--green);line-height:1;">${totalXfer}</div>
          <div style="font-size:0.48rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Transfers</div>
        </div>
        <div style="background:#0a1020;border-radius:7px;padding:8px;text-align:center;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1.5rem;color:var(--accent);line-height:1;">${totalCalls.toLocaleString()}</div>
          <div style="font-size:0.48rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Calls</div>
        </div>
        <div style="background:#0a1020;border-radius:7px;padding:8px;text-align:center;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1.5rem;color:${cc};line-height:1;">${avgConv}%</div>
          <div style="font-size:0.48rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Avg Conv</div>
        </div>
      </div>
      <div style="display:flex;gap:12px;font-size:0.7rem;color:var(--muted);">
        <span>CI: <strong style="color:var(--text);">${totalCI.toLocaleString()}</strong></span>
        <span>DNC: <strong style="color:var(--red);">${totalDNC}</strong></span>
        <span>NI: <strong style="color:var(--gold);">${totalNI}</strong></span>
        <span>Days: <strong style="color:var(--text);">${reps.length}</strong></span>
      </div>
      <!-- Day breakdown inside the week/month -->
      <div style="margin-top:10px;border-top:1px solid var(--border);padding-top:8px;display:flex;flex-wrap:wrap;gap:5px;">
        ${reps.slice().reverse().map(r=>{
          const daycc=r.conv>=5?'var(--green)':r.conv>=2?'var(--gold)':'var(--red)';
          return `<div style="background:#060b18;border:1px solid #1a2540;border-radius:6px;padding:5px 8px;font-size:0.65rem;">
            <div style="color:var(--muted);margin-bottom:2px;">${r.date}</div>
            <div style="font-weight:800;color:var(--green);">${r.xfer} xfer</div>
            <div style="color:${daycc};">${r.conv}%</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  });

  el.innerHTML = html;
}

// ── LOAD TODAY REPORT SHORTCUT ──
function loadTodayReport(){
  if(!reportHistory.length) return;
  const idx = reportHistory.findIndex(r=>r.date===getTodayGY());
  if(idx>=0) loadReportByIndex(idx);
  else { statsData=[]; statsDataDate=''; renderStatsTable(); }
}

// ── REP PROFILE: REBUTTAL MINI CARD (Overview Tab) ──
async function apLoadRebuttalMini(id, name){
  const el = document.getElementById('rp-rb-mini-content');
  if(!el) return;
  const today = getTodayGY();
  try{
    const snap = await db.collection('rebuttal_clicks').doc(id+'_'+today).get();
    if(!snap.exists){
      el.innerHTML='<div style="color:var(--red);font-size:0.78rem;font-weight:700;">⚠️ No rebuttals opened today yet</div>';
      return;
    }
    const d = snap.data();
    const clicks = d.clicks||{};
    const total = Object.values(clicks).reduce((s,v)=>s+v,0);
    const used = Object.keys(clicks).filter(k=>clicks[k]>0).length;
    const allKeys = Object.keys(REBUTTAL_LABELS);
    const critMissing = CRITICAL_REBUTTALS.filter(k=>!clicks[k]);
    const top3 = Object.entries(clicks).sort((a,b)=>b[1]-a[1]).slice(0,3);
    const engPct = Math.round((used/allKeys.length)*100);
    const engColor = engPct>=60?'var(--green)':engPct>=30?'var(--gold)':'var(--red)';

    el.innerHTML=`
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px;">
        <div style="background:#0a1020;border-radius:8px;padding:8px;text-align:center;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1.6rem;color:var(--accent);line-height:1;">${total}</div>
          <div style="font-size:0.5rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Total Opens</div>
        </div>
        <div style="background:#0a1020;border-radius:8px;padding:8px;text-align:center;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1.6rem;color:${engColor};line-height:1;">${engPct}%</div>
          <div style="font-size:0.5rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Coverage</div>
        </div>
        <div style="background:#0a1020;border-radius:8px;padding:8px;text-align:center;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1.6rem;color:${critMissing.length>0?'var(--red)':'var(--green)'};line-height:1;">${critMissing.length===0?'✓':critMissing.length}</div>
          <div style="font-size:0.5rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;">Crit Missing</div>
        </div>
      </div>
      ${top3.length>0?`<div style="font-size:0.55rem;color:var(--muted);font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:5px;">🔥 MOST USED TODAY</div>
      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px;">
        ${top3.map(([k,v])=>`<span style="background:#111c30;border:1px solid #2a3a5a;border-radius:6px;padding:3px 9px;font-size:0.7rem;color:var(--text);">${REBUTTAL_LABELS[k]||k} <strong style="color:var(--gold);">×${v}</strong></span>`).join('')}
      </div>`:''}
      ${critMissing.length>0?`<div style="background:var(--red-light);border:1px solid rgba(248,113,113,0.35);border-radius:8px;padding:8px 10px;font-size:0.72rem;color:var(--red);">
        🚨 <strong>Critical not opened:</strong> ${critMissing.map(k=>REBUTTAL_LABELS[k]||k).join(', ')}
      </div>`:'<div style="background:var(--green-light);border:1px solid rgba(52,211,153,0.3);border-radius:8px;padding:8px 10px;font-size:0.72rem;color:var(--green);">✅ All critical rebuttals covered today</div>'}`;
  }catch(e){
    el.innerHTML='<div style="color:var(--muted);font-size:0.75rem;">Could not load rebuttal data.</div>';
  }
}

// ── REP PROFILE: REBUTTAL FULL TAB ──
async function apLoadRebuttalUsage(id, name){
  const summaryEl  = document.getElementById('ap-rb-summary');
  const signalsEl  = document.getElementById('ap-rb-signals');
  const barsEl     = document.getElementById('ap-rb-bars');
  const neverEl    = document.getElementById('ap-rb-never');
  if(!summaryEl) return;

  const range = document.getElementById('ap-rebuttal-range')?.value || 'today';
  const idStr = String(id||'');
  const allKeys = Object.keys(REBUTTAL_LABELS);

  summaryEl.innerHTML='<div style="color:var(--muted);font-size:0.75rem;grid-column:1/-1;">Loading...</div>';
  barsEl.innerHTML='';
  neverEl.innerHTML='';
  signalsEl.innerHTML='';

  try{
    let query = db.collection('rebuttal_clicks').where('id','==',idStr);
    if(range==='today'){
      query = query.where('date','==',getTodayGY());
    } else if(range!=='all'){
      const days=parseInt(range);
      const cutoff=new Date();cutoff.setDate(cutoff.getDate()-days);
      query = query.where('date','>=',cutoff.toISOString().split('T')[0]);
    }
    const snap = await query.get();
    const merged = {};
    const allEvents = [];
    let daysActive = 0;
    snap.forEach(doc=>{
      const d = doc.data();
      const clicks = d.clicks||{};
      if(Object.keys(clicks).length>0) daysActive++;
      Object.entries(clicks).forEach(([k,v])=>{ merged[k]=(merged[k]||0)+v; });
      if(d.events && Array.isArray(d.events)) allEvents.push(...d.events);
    });

    const total = Object.values(merged).reduce((s,v)=>s+v,0);
    const used  = Object.keys(merged).filter(k=>merged[k]>0).length;
    const never = allKeys.filter(k=>!merged[k]);
    const critMissing = CRITICAL_REBUTTALS.filter(k=>!merged[k]);
    const engPct = Math.round((used/allKeys.length)*100);
    const engColor = engPct>=60?'var(--green)':engPct>=30?'var(--gold)':'var(--red)';

    // Summary row
    summaryEl.innerHTML=[
      {label:'Total Opens',val:total,color:'var(--accent)'},
      {label:'Coverage',val:engPct+'%',color:engColor},
      {label:'Days Active',val:daysActive,color:'var(--gold)'},
    ].map(s=>`<div style="background:#0a1020;border:1px solid var(--border);border-radius:8px;padding:10px;text-align:center;">
      <div style="font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:${s.color};line-height:1;">${s.val}</div>
      <div style="font-size:0.5rem;color:var(--muted);font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-top:2px;">${s.label}</div>
    </div>`).join('');

    // Coaching signals for this rep
    const repSignals=[];
    if(!merged['no_ssn']&&!merged['ssn_concerns']) repSignals.push({type:'danger',icon:'🚨',msg:'Never opens SSN rebuttal — likely losing leads at SSN ask'});
    if(!merged['confidence_mindset']) repSignals.push({type:'warning',icon:'💡',msg:'Never opened Confidence Technique — may be projecting uncertainty'});
    if((merged['not_interested']||0)>=10) repSignals.push({type:'warning',icon:'🔥',msg:`Opens "Not Interested" ${merged['not_interested']} times — prospects frequently objecting`});
    if((merged['wants_to_hangup']||0)>=8) repSignals.push({type:'warning',icon:'📞',msg:`Taking Over Technique opened ${merged['wants_to_hangup']} times — high hang-up risk`});
    if(!merged['pitch_benefit']&&!merged['pitch_urgency']&&!merged['pitch_softpull']) repSignals.push({type:'info',icon:'💬',msg:'No Pitch Boost rebuttals used — not enhancing the pitch'});
    if(total>=20&&used>=8) repSignals.push({type:'good',icon:'⭐',msg:`Strong engagement — ${total} opens across ${used} different rebuttals`});
    if(total===0) repSignals.push({type:'danger',icon:'🚫',msg:'Zero rebuttal opens — not using the tool at all'});

    // ── Fraud detection ──
    const fraudFlags = analyzeRebuttalFraud(allEvents);
    const colMap={danger:{bg:'var(--red-light)',border:'rgba(248,113,113,0.3)',text:'var(--red)'},warning:{bg:'var(--gold-light)',border:'rgba(251,191,36,0.3)',text:'var(--gold)'},info:{bg:'var(--purple-light)',border:'rgba(167,139,250,0.3)',text:'var(--purple)'},good:{bg:'var(--green-light)',border:'rgba(52,211,153,0.3)',text:'var(--green)'}};
    
    let signalsHtml = '';
    if(fraudFlags.length){
      signalsHtml += `<div style="background:rgba(239,68,68,0.06);border:2px solid rgba(239,68,68,0.4);border-radius:10px;padding:12px;margin-bottom:8px;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
          <span style="font-size:1rem;">🕵️</span>
          <div style="font-size:0.58rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#ef4444;">SUSPICIOUS CLICKING DETECTED</div>
          <span style="margin-left:auto;font-family:'Bebas Neue',sans-serif;font-size:0.95rem;color:#ef4444;">${fraudFlags.length} FLAG${fraudFlags.length!==1?'S':''}</span>
        </div>
        ${fraudFlags.map(f=>{const c=fraudLevelColor(f.level);return`<div style="background:${c.bg};border:1px solid ${c.border};border-radius:7px;padding:8px 10px;margin-bottom:4px;"><div style="font-size:0.78rem;font-weight:700;color:${c.text};">${f.icon} ${f.title}</div><div style="font-size:0.68rem;color:var(--muted);margin-top:2px;">${f.detail}</div></div>`;}).join('')}
      </div>`;
    }
    if(repSignals.length){
      signalsHtml += '<div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;color:var(--muted);text-transform:uppercase;margin-bottom:6px;">COACHING SIGNALS</div>'+
        repSignals.map(s=>{const c=colMap[s.type];return`<div style="background:${c.bg};border:1px solid ${c.border};border-radius:8px;padding:9px 12px;margin-bottom:5px;display:flex;gap:8px;align-items:flex-start;"><span style="font-size:1rem;flex-shrink:0;">${s.icon}</span><span style="font-size:0.75rem;color:${c.text};">${s.msg}</span></div>`;}).join('');
    }
    if(signalsHtml) signalsEl.innerHTML = signalsHtml;

    // Bars
    const sorted=allKeys.sort((a,b)=>(merged[b]||0)-(merged[a]||0));
    const maxVal=Math.max(...sorted.map(k=>merged[k]||0),1);
    barsEl.innerHTML=sorted.map(k=>{
      const v=merged[k]||0;
      const pct=Math.round((v/maxVal)*100);
      const isCrit=CRITICAL_REBUTTALS.includes(k);
      const barColor=v===0?'#1a2540':isCrit?'var(--purple)':'var(--accent)';
      const textColor=v===0?'var(--muted)':isCrit?'var(--purple)':'var(--accent)';
      return`<div style="display:flex;align-items:center;gap:8px;">
        <div style="font-size:0.68rem;color:${textColor};width:150px;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${isCrit?'⭐ ':''} ${REBUTTAL_LABELS[k]||k}</div>
        <div style="flex:1;background:#0a1020;border-radius:4px;height:7px;overflow:hidden;">
          <div style="width:${pct}%;height:100%;background:${barColor};border-radius:4px;transition:width 0.5s;"></div>
        </div>
        <div style="font-size:0.7rem;font-weight:800;color:${textColor};width:22px;text-align:right;">${v||''}</div>
      </div>`;
    }).join('');

    // Never used
    if(never.length){
      neverEl.innerHTML=`<div style="font-size:0.55rem;font-weight:800;letter-spacing:2px;color:var(--muted);text-transform:uppercase;margin-bottom:6px;">💤 NEVER USED (${never.length})</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;">
        ${never.map(k=>`<span style="background:#0a1020;border:1px solid #1a2540;border-radius:6px;padding:3px 8px;font-size:0.65rem;color:var(--muted);">${REBUTTAL_LABELS[k]||k}</span>`).join('')}
      </div>`;
    } else {
      neverEl.innerHTML='<div style="color:var(--green);font-size:0.78rem;font-weight:700;">🏆 Used all rebuttals at least once!</div>';
    }

  }catch(e){
    summaryEl.innerHTML='<div style="color:var(--red);font-size:0.75rem;grid-column:1/-1;">Error: '+e.message+'</div>';
  }
}

// ── REBUTTAL INTEL JS ──
const REBUTTAL_LABELS = {
  not_interested:'Not Interested', no_info:'Why No Info?', bad_credit:'Bad Credit',
  rate_question:'Interest Rate?', how_info:"How'd You Get My Info?", no_loan:"Don't Need a Loan",
  website:'Give Me the Website', spouse:'Need to Ask Spouse', no_ssn:"Won't Give SSN",
  company_name:'What Company Is This?', who_are_we:'Who Are You / Where Located?',
  diff_numbers:'Different Numbers', lower_rate:'My Bank Has Lower Rate',
  voicemail_approved:'Voicemail Said Approved', dnc_file:'DNC / Enrolled / Bad Lead',
  llc_question:'Is Your Company LLC?', debt_consolidation:'Is This Debt Consolidation?',
  soft_pull:'Soft Credit Pull', private_lender:'What Bank / Private Lender?',
  confidence_mindset:'Confidence Technique', wants_to_hangup:'Taking Over Technique',
  follow_up_pivot:'Follow Up / Pivot', ssn_concerns:'Concerns About SSN',
  pitch_benefit:'Pitch — Benefit-Oriented', pitch_urgency:'Pitch — Urgency',
  pitch_softpull:'Pitch — Soft Pull / Privacy'
};

const CRITICAL_REBUTTALS = ['no_ssn','ssn_concerns','confidence_mindset','not_interested','wants_to_hangup'];
let riCurrentView = 'reps';
let riAllData = [];

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