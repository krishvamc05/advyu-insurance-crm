import { jsPDF } from 'jspdf';
import { getHeroWhatsAppDemoLink } from '../config/siteConfig.js';

function formatInrAscii(amount) {
  const num = Math.round(Number(amount) || 0);
  if (num >= 10000000) return `Rs. ${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `Rs. ${(num / 100000).toFixed(2)} Lakhs`;
  return `Rs. ${new Intl.NumberFormat('en-IN').format(num)}`;
}

/**
 * Generates a formatted 6-page PDF Playbook for Individual Insurance Agents
 * with clickable WhatsApp CTAs on every page.
 */
export function buildSoloAgentPlaybookPdf({
  advisorName = 'Advisor',
  city = 'India',
  practiceType = 'Independent Insurance Advisor',
  estimatedLeakageInr = 0,
} = {}) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  const totalPages = 6;
  const whatsappCtaUrl = getHeroWhatsAppDemoLink();

  const NAVY = [11, 19, 43];
  const EMERALD = [16, 185, 129];
  const EMERALD_DARK = [5, 150, 105];
  const AMBER = [245, 158, 11];
  const SLATE_BG = [248, 250, 252];
  const BORDER = [226, 232, 240];
  const TEXT_DARK = [15, 23, 42];
  const TEXT_MUTED = [71, 85, 105];

  const drawPageCtaAndFooter = (pageNum) => {
    // Persistent clickable WhatsApp CTA banner on every page
    const ctaY = pageHeight - 31;
    const ctaH = 12.5;

    doc.setFillColor(...NAVY);
    doc.roundedRect(margin, ctaY, contentWidth, ctaH, 2.5, 2.5, 'F');

    // Left emerald badge accent
    doc.setFillColor(...EMERALD);
    doc.roundedRect(margin + 2, ctaY + 2, 34, ctaH - 4, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text('WHATSAPP LIVE', margin + 19, ctaY + 7.5, { align: 'center' });

    // CTA headline + number
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text('Explore ADVYU InsureTech Automation CRM -> +91 9160230223', margin + 40, ctaY + 5.7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(167, 243, 208);
    doc.text('Tap to chat: "Hi, I would like to explore more about ADVYU InsureTech Automation CRM"', margin + 40, ctaY + 10);

    // Right emerald action pill
    doc.setFillColor(...EMERALD_DARK);
    doc.roundedRect(pageWidth - margin - 26, ctaY + 2.2, 24, ctaH - 4.4, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text('CHAT NOW', pageWidth - margin - 14, ctaY + 7.4, { align: 'center' });

    // Clickable URI link annotation covering entire CTA bar
    doc.link(margin, ctaY, contentWidth, ctaH, { url: whatsappCtaUrl });

    // Footer
    doc.setDrawColor(...BORDER);
    doc.line(margin, pageHeight - 14.5, pageWidth - margin, pageHeight - 14.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...TEXT_MUTED);
    doc.text(`Prepared for ${advisorName} (${city}) - advyu.com`, margin, pageHeight - 9);
    doc.setFont('helvetica', 'bold');
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 9, { align: 'right' });
  };

  const drawPageChrome = (pageNum, sectionTag) => {
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, pageWidth, 14, 'F');
    doc.setFillColor(...EMERALD);
    doc.rect(0, 14, pageWidth, 1.2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text('ADVYU | SOLO INSURANCE AGENT WHATSAPP & MDRT PLAYBOOK', margin, 9);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(167, 243, 208);
    doc.text(sectionTag.toUpperCase(), pageWidth - margin, 9, { align: 'right' });

    drawPageCtaAndFooter(pageNum);
  };

  const drawSectionHeading = (y, kicker, title) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...EMERALD);
    doc.text(kicker.toUpperCase(), margin, y);

    doc.setFontSize(15.5);
    doc.setTextColor(...NAVY);
    const lines = doc.splitTextToSize(title, contentWidth);
    doc.text(lines, margin, y + 6.2);
    return y + 6.2 + lines.length * 6.2 + 2.5;
  };

  const drawCalloutBox = (y, title, bodyLines, accent = EMERALD) => {
    const padding = 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.8);
    const textLines = bodyLines.flatMap((line) => doc.splitTextToSize(line, contentWidth - padding * 2 - 4));
    const boxHeight = 9.5 + textLines.length * 4.6 + 3.5;

    doc.setFillColor(...SLATE_BG);
    doc.setDrawColor(...BORDER);
    doc.roundedRect(margin, y, contentWidth, boxHeight, 2.5, 2.5, 'FD');

    doc.setFillColor(...accent);
    doc.rect(margin, y, 2.2, boxHeight, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...NAVY);
    doc.text(title, margin + 5.5, y + 6.2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.8);
    doc.setTextColor(...TEXT_DARK);
    doc.text(textLines, margin + 5.5, y + 11.8);

    return y + boxHeight + 4.5;
  };

  const drawBulletList = (y, items) => {
    let cursor = y;
    for (const item of items) {
      doc.setFillColor(...EMERALD);
      doc.circle(margin + 2, cursor - 1.2, 1.1, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.2);
      doc.setTextColor(...NAVY);
      doc.text(item.heading, margin + 6, cursor);
      cursor += 4.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.6);
      doc.setTextColor(...TEXT_MUTED);
      const wrapped = doc.splitTextToSize(item.text, contentWidth - 6);
      doc.text(wrapped, margin + 6, cursor);
      cursor += wrapped.length * 4.3 + 2.8;
    }
    return cursor;
  };

  // =========================================================================
  // PAGE 1: COVER & DIAGNOSTIC OVERVIEW
  // =========================================================================
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageWidth, 84, 'F');
  doc.setFillColor(...EMERALD);
  doc.rect(0, 84, pageWidth, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...AMBER);
  doc.text('ADVYU ADVISOR GROWTH BLUEPRINT - INDIA EDITION', margin, 18);

  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  const coverTitle = doc.splitTextToSize(
    'The Solo Insurance Agent\'s WhatsApp & MDRT Automation Playbook',
    contentWidth
  );
  doc.text(coverTitle, margin, 29);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(203, 213, 225);
  const coverSub = doc.splitTextToSize(
    'How Independent LIC, Health, Motor & Multi-Insurer Advisors Recover Lost Renewals, Qualify Social Leads in 5 Seconds, and Win 3x Referrals Without Hiring Office Staff.',
    contentWidth
  );
  doc.text(coverSub, margin, 51);

  doc.setFillColor(22, 33, 62);
  doc.roundedRect(margin, 66, contentWidth, 12.5, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.8);
  doc.setTextColor(255, 255, 255);
  doc.text(`Prepared For: ${advisorName}  |  Practice: ${practiceType}  |  Market: ${city}`, margin + 4, 73.8);

  let y = 96;
  y = drawSectionHeading(
    y,
    'Chapter 1 - Revenue Leakage Audit',
    'Why Hard-Working Solo Agents Lose Rs. 15,000 - Rs. 45,000+ Every Month'
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(...TEXT_MUTED);
  const introP = doc.splitTextToSize(
    'Most independent insurance advisors in India do not have a product or sales skill problem. They hit an income ceiling because manual follow-ups via personal WhatsApp, sticky notes, and Excel renewal trackers collapse once a book crosses 150 active families.',
    contentWidth
  );
  doc.text(introP, margin, y);
  y += introP.length * 4.5 + 4;

  if (Number(estimatedLeakageInr) > 0) {
    y = drawCalloutBox(
      y,
      'Your Personalized Calculator Snapshot',
      [
        `Estimated Annual Premium Opportunity At Risk: ${formatInrAscii(estimatedLeakageInr)} / year.`,
        'Recovering even 2 to 3 lapsed renewals per month plus faster Meta lead callbacks adds lakhs in annual recurring commission without spending extra on ads.',
      ],
      AMBER
    );
  }

  y = drawBulletList(y, [
    {
      heading: '1. Silent Policy Lapses & Diary Chaos (10-15% Annual Book Loss)',
      text: 'When T-30, T-15, and T-7 reminders depend on manual memory, clients forget due dates and end up paying through aggregator apps instead of renewing through you.',
    },
    {
      heading: '2. Slow Replies to Instagram & Facebook Inquiries (78% Drop After 15 Mins)',
      text: 'Prospects scrolling Reels at 9 PM or during lunch expect immediate answers. Replying 3 hours later after a client meeting means losing warm buyers to faster advisors.',
    },
    {
      heading: '3. Evening Admin Burnout (KYC, Medicals & Proposal Nudges)',
      text: 'Chasing PAN/Aadhaar photos and tele-medical bookings one-by-one steals 12+ hours every week that should be spent closing high-ticket Term, Health, and Investment cases.',
    },
    {
      heading: '4. Personal WhatsApp Ban Risk & Forgotten Referrals',
      text: 'Using cracked bulk-sender tools or sending repeated manual broadcasts puts your primary mobile number at risk of permanent Meta suspension—erasing years of client history.',
    },
  ]);

  drawPageCtaAndFooter(1);

  // =========================================================================
  // PAGE 2: BAN-SAFE OFFICIAL WABA & TAGGING SYSTEM
  // =========================================================================
  doc.addPage();
  drawPageChrome(2, 'Chapter 2 - Ban-Safe Setup');
  y = 26;

  y = drawSectionHeading(
    y,
    'Chapter 2 - Ban-Safe Infrastructure',
    'How to Automate 100% Safely Without Risking Your Client WhatsApp Number'
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(...TEXT_MUTED);
  const ch2Intro = doc.splitTextToSize(
    'Before launching automated renewal reminders or lead qualification bots, protect your most valuable asset: your WhatsApp identity. Below is how Official Meta Cloud API (used by ADVYU) compares to personal or grey-market bulk tools.',
    contentWidth
  );
  doc.text(ch2Intro, margin, y);
  y += ch2Intro.length * 4.7 + 5;

  const colWidths = [46, 65, 67];
  const rows = [
    ['Capability', 'Unofficial Bulk / Personal App', 'ADVYU Official Meta WABA'],
    ['Ban Protection', 'High ban risk on broadcasts', '100% Meta-approved & ban-safe'],
    ['24/7 Bot Replies', 'Manual replies only when free', 'Replies in < 5 sec, 24/7'],
    ['Renewal Reminders', 'Copy-paste 1 by 1 from Excel', 'Auto T-30, T-15, T-7 & Grace'],
    ['Interactive Buttons', 'Plain text links only', '1-Tap Quick Replies & UPI Links'],
    ['Client Trust', 'Looks informal / unverified', 'Branded Verified Business Profile'],
  ];

  rows.forEach((row, idx) => {
    const rowHeight = idx === 0 ? 9.5 : 10.2;
    let x = margin;
    if (idx === 0) {
      doc.setFillColor(...NAVY);
    } else if (idx % 2 === 1) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(...SLATE_BG);
    }
    doc.setDrawColor(...BORDER);
    doc.rect(margin, y, contentWidth, rowHeight, 'FD');

    row.forEach((cell, cIdx) => {
      doc.setFont('helvetica', idx === 0 || cIdx === 0 ? 'bold' : 'normal');
      doc.setFontSize(8.5);
      if (idx === 0) {
        doc.setTextColor(255, 255, 255);
      } else if (cIdx === 2) {
        doc.setTextColor(5, 150, 105);
      } else {
        doc.setTextColor(...TEXT_DARK);
      }
      doc.text(cell, x + 3, y + 6.2);
      x += colWidths[cIdx];
    });
    y += rowHeight;
  });

  y += 8;
  y = drawCalloutBox(
    y,
    'The 5 Golden Rules for Advisor WhatsApp Compliance',
    [
      '1. Always use Meta-approved utility templates for T-30 / T-15 / T-7 policy renewal reminders.',
      '2. Tag every contact by lifecycle stage: [NB | Proposal Sent], [REN | Due 30d], [CLM | Docs Collected].',
      '3. Include a polite 1-tap opt-out or preference option on annual cross-sell newsletters.',
      '4. Collect client opt-in naturally whenever they message your Personal QR or Click-to-WhatsApp ad.',
      '5. Keep suitability details (age, income bracket, existing cover) logged in CRM notes for IRDAI clarity.',
    ],
    EMERALD
  );

  y = drawCalloutBox(
    y,
    'Advisor Time-Saving Rule: The 3-Bucket Daily Inbox',
    [
      'Instead of scrolling through 200 unordered chats every evening, check just 3 priority tags:',
      '- HOT (Score 80+): Qualified new leads who booked a call slot -> Call at scheduled time.',
      '- GRACE / DUE SOON: Policyholders who clicked the renewal link or hit T-3 -> 2-minute follow-up call.',
      '- CLAIM URGENT: Any client who typed CLAIM -> Immediate personal reassurance + TPA submission.',
    ],
    NAVY
  );

  // =========================================================================
  // PAGE 3: COPY-PASTE SCRIPTS — LEAD QUALIFICATION & KYC CHASE
  // =========================================================================
  doc.addPage();
  drawPageChrome(3, 'Chapter 3 - Lead & KYC Scripts');
  y = 26;

  y = drawSectionHeading(
    y,
    'Chapter 3 - Lead Conversion Scripts',
    '5-Second Meta Lead Qualification & Gentle KYC Follow-Up Templates'
  );

  y = drawCalloutBox(
    y,
    'Script A: Instant 5-Second Welcome (Triggered by Instagram / Facebook Ad or QR)',
    [
      '"Namaste {{FirstName}}! Thank you for messaging {{AdvisorName}} Insurance Advisory. To prepare the best plan options without wasting your time, tap what you are exploring today:"',
      '[Button 1: Term Life (Rs. 1Cr - 2Cr+)]   [Button 2: Family Health Cover]   [Button 3: Motor / Renewal]',
    ],
    EMERALD
  );

  y = drawCalloutBox(
    y,
    'Script B: 4-Step Auto-Qualification Questions (Before Booking Your Call)',
    [
      'Q1 (Age): "Great choice! May I know the eldest insured member\'s age (e.g., 32 years)?"',
      'Q2 (City): "Which city do you currently reside in?" (Sets metro vs Tier-2 health zone automatically)',
      'Q3 (Cover / Budget): "What cover amount or annual budget slab fits your family best?"',
      'Q4 (Slot): "Perfect! I have prepared 2 custom comparisons. Pick a 15-min call slot: [Today 5:30 PM] [Tomorrow 11 AM]"',
    ],
    NAVY
  );

  y = drawCalloutBox(
    y,
    'Script C: +24 Hour Proposal Comparison Nudge (Stops Ghosting)',
    [
      '"Hi {{FirstName}}, I shared your side-by-side comparison PDF yesterday showing Claim Settlement Ratio, room-rent rules & 30-year total cost. Reply QUOTE if you\'d like me to simplify the top 2 riders on a quick 5-minute call."',
    ],
    AMBER
  );

  y = drawCalloutBox(
    y,
    'Script D: Automated PAN, Aadhaar & Tele-Medical Chase (Zero Awkward Calling)',
    [
      '"Hi {{FirstName}}, your application #{{ProposalNo}} is at final underwriting! To lock in your current age premium before rates change, please upload clear photos of your PAN & Aadhaar right here in WhatsApp, and reply YES for tomorrow\'s 9:30 AM home medical slot."',
    ],
    EMERALD
  );

  // =========================================================================
  // PAGE 4: AUTOPILOT RENEWAL & NCB RETENTION SEQUENCE
  // =========================================================================
  doc.addPage();
  drawPageChrome(4, 'Chapter 4 - Renewal Retention');
  y = 26;

  y = drawSectionHeading(
    y,
    'Chapter 4 - Zero-Lapse Renewal System',
    'The Complete T-30 to Grace-Period WhatsApp Renewal Sequence'
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(...TEXT_MUTED);
  const renIntro = doc.splitTextToSize(
    'Consistent, value-first reminders protect your renewal income from leaking to online aggregators. Run this 5-touch timeline automatically for every Life, Health, and Motor policy in your book:',
    contentWidth
  );
  doc.text(renIntro, margin, y);
  y += renIntro.length * 4.7 + 5;

  y = drawCalloutBox(
    y,
    'Touch 1 (T-30 Days): Early Continuity & Benefit Reminder',
    [
      '"Namaste {{FirstName}}, gentle 30-day alert: Your {{Insurer}} {{PlanName}} (Policy #{{PolicyNo}}, Premium {{Amount}}) is due on {{DueDate}}. Renewing early keeps your waiting-period credits and No-Claim Bonus 100% protected. Reply LINK anytime for your direct payment link."',
    ],
    EMERALD
  );

  y = drawCalloutBox(
    y,
    'Touch 2 (T-15 Days): Zero-Gap Protection Check + Free Review Offer',
    [
      '"Hi {{FirstName}}, 15 days left for your {{PlanName}} renewal. Want to check if adding a Rs. 15L Super Top-Up or updating nominee details makes sense before renewing? Tap [Keep Same Plan] or [Quick 5-Min Review]."',
    ],
    NAVY
  );

  y = drawCalloutBox(
    y,
    'Touch 3 (T-7 & T-2 Days): 1-Tap Direct Insurer UPI Payment Link',
    [
      '"Important Reminder: Only {{DaysLeft}} days left before {{DueDate}}. Avoid late-fee risk or coverage break—complete your payment in 30 seconds using the official {{Insurer}} link below, and send me a screenshot if you need instant receipt filing."',
    ],
    AMBER
  );

  y = drawCalloutBox(
    y,
    'Touch 4 (T+1 to T+10 Grace Period): Personal Advisor Rescue Alert',
    [
      '"Urgent Notice for {{FirstName}}: Your policy #{{PolicyNo}} has entered the grace window. Please do not let your existing health/life cover lapse—reply CALL and I will personally help renew it within 10 minutes today."',
    ],
    [225, 29, 72]
  );

  // =========================================================================
  // PAGE 5: 24/7 CLAIMS CONCIERGE & 3X REFERRAL MULTIPLIER
  // =========================================================================
  doc.addPage();
  drawPageChrome(5, 'Chapter 5 - Claims & Referrals');
  y = 26;

  y = drawSectionHeading(
    y,
    'Chapter 5 - Loyalty & Referrals',
    'Turn Stressful Midnight Claims Into Lifelong Trust & 3x Family Referrals'
  );

  y = drawCalloutBox(
    y,
    '11:30 PM Instant Claim Intimation Flow (Triggered When Client Types "CLAIM")',
    [
      'Auto-Reply (< 5 sec): "We are right here with you, {{FirstName}}. Please tap the claim type so I can alert {{AdvisorName}} immediately and send your document checklist:"',
      '[Cashless Hospitalization]   [Reimbursement Claim]   [Motor Accident / Garage]   [Life Claim]',
    ],
    EMERALD
  );

  y = drawBulletList(y, [
    {
      heading: 'Health Cashless Checklist (Sent Automatically in Chat)',
      text: '1) Policy E-Card / Policy Number  2) Patient Aadhaar & PAN  3) Treating Doctor Admission Note & Estimated Cost  4) Past 2-Year Consultation Papers (if any).',
    },
    {
      heading: 'Motor Accident Checklist (Sent Automatically in Chat)',
      text: '1) Vehicle RC & Policy Copy  2) Driver License Front/Back  3) 4-Angle Clear Damage Photos  4) Cashless Network Garage Name & Claim Form.',
    },
  ]);

  y = drawCalloutBox(
    y,
    'The Post-Settlement 3x Referral Multiplier Script',
    [
      'Wait 48 hours after smooth claim payout or policy renewal, then trigger automatically:',
      '"So glad everything went smoothly for your family, {{FirstName}}! Because my practice grows through trusted word-of-mouth rather than spam calls, if 1 or 2 colleagues or relatives ever need honest advice on Term or Health cover, simply forward my WhatsApp QR card below."',
    ],
    AMBER
  );

  y = drawCalloutBox(
    y,
    '4 High-Converting Places to Put Your Personal Referral QR Code',
    [
      '1. Bottom of your WhatsApp digital visiting card & PDF quote cover pages.',
      '2. Weekly WhatsApp Status updates (claim settlement wins + inflation facts).',
      '3. Inside physical/digital policy document folders delivered to clients.',
      '4. Annual policy anniversary review messages ("Scan to book your family cover review").',
    ],
    NAVY
  );

  // =========================================================================
  // PAGE 6: 48-HOUR LAUNCH & DIARY / EXCEL MIGRATION CHECKLIST
  // =========================================================================
  doc.addPage();
  drawPageChrome(6, 'Chapter 6 - 48-Hour Launch');
  y = 26;

  y = drawSectionHeading(
    y,
    'Chapter 6 - Implementation Roadmap',
    'Your 48-Hour Launch & Diary / Excel Renewal Migration Checklist'
  );

  y = drawCalloutBox(
    y,
    'Step 1: Prepare Your 7-Column Renewal Migration Sheet (15 Minutes)',
    [
      'Export your Excel sheet or list your diary entries using these 7 simple columns:',
      'Client Name | WhatsApp Mobile (+91) | Insurer | Policy Number | Line (Term/Health/Motor) | Renewal Due Date (DD-MM-YYYY) | Annual Premium (INR)',
    ],
    EMERALD
  );

  y = drawBulletList(y, [
    {
      heading: 'Hour 1 - 6: Official WhatsApp Business API Verification',
      text: 'Connect your dedicated advisor number under your own brand identity with ADVYU onboarding support—100% compliant with Meta policies.',
    },
    {
      heading: 'Hour 7 - 24: Pre-Load All 4 Automations & Templates',
      text: 'Lead qualification bot, T-30 to grace renewal reminders, 24/7 claim checklists, and birthday/referral campaigns installed and customized with your signature.',
    },
    {
      heading: 'Hour 25 - 36: Connect Meta Ads & Personal Referral QR',
      text: 'Link Instagram/Facebook Click-to-WhatsApp ads (optional) and receive your custom Personal Referral QR card for visiting cards and WhatsApp status.',
    },
    {
      heading: 'Hour 37 - 48: Import Your Policy Book & Go Live',
      text: 'Upload your Excel renewal list so upcoming T-30/T-15/T-7 reminders start firing automatically, followed by a 1-on-1 dashboard walkthrough.',
    },
  ]);

  y = drawCalloutBox(
    y,
    'Ready to Put Your Advisory Practice on Autopilot in 48 Hours?',
    [
      `Book your 15-minute live setup walkthrough for ${city} or tap the WhatsApp button below to message +91 9160230223 and test ADVYU InsureTech Automation CRM live.`,
      'Visit: https://advyu.com  |  Built Exclusively for Independent Indian Insurance Advisors.',
    ],
    NAVY
  );

  return doc;
}

export function downloadAutomationBlueprint(options = {}) {
  const doc = buildSoloAgentPlaybookPdf(options);
  doc.save('ADVYU-Solo-Insurance-Agent-Automation-Playbook.pdf');
}
