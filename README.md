# ADVYU — Individual Insurance Agent WhatsApp & Social Automation CRM Funnel

High-converting InsurTech funnel built with **React + Vite + Tailwind CSS + Lucide Icons** exclusively for **Individual Insurance Agents** in India (LIC, Term Life, Health, Motor, and MDRT Advisors).

## Configuration Before Deploying

Update `.env` (copied from `.env.example`) with your live credentials:

```env
VITE_BRAND_NAME=ADVYU
VITE_WEBSITE_URL=https://advyu.com
VITE_WABA_NUMBER=9198XXXXXXXX
VITE_CRM_WEBHOOK_URL=https://your-crm-endpoint.example.com/webhook
VITE_DEMO_CALENDAR_URL=https://cal.com/your-team/advyu-advisor-demo
```

## Running Locally

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
npm run preview
```

## Funnel Routes

- `/` — 10-section main conversion landing page tailored exclusively for solo insurance advisors with realistic editorial imagery, live commission recovery calculator, 4 pre-built WhatsApp automations, social/QR lead engine, 24/7 claims concierge & referral showcase, 48-hour launch roadmap, and advisor FAQ accordion.
- `/apply` — 3-step progressive advisor qualification funnel (`Advisor Profile` → `Policy Book & Lines` → `Goal & +91 WhatsApp`) with smart tier routing (`hot_qualified_advisor` vs `nurture_starter_advisor`).
- `/thank-you` — Personalized confirmation with live calendar embed + pre-filled WhatsApp bot handoff for active advisors, or downloadable Solo Agent MDRT Playbook + WhatsApp bot demo for new advisors.

## CRM Webhook & UTM Attribution

- `src/utils/utmTracker.js` captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_adset`, and `utm_content` on first landing and persists them in `sessionStorage`.
- `src/services/crmWebhook.js` posts `Content-Type: application/json` to `import.meta.env.VITE_CRM_WEBHOOK_URL` with the structured advisor lead payload (`lead_name`, `city`, `practice_type`, `whatsapp_number`, `email`, `active_policyholders`, `insurance_lines`, `primary_goal`, `qualification_tier`, `estimated_leakage_inr`, UTMs, and `submitted_at`).
