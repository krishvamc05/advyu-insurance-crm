import { isWebhookConfigured } from '../config/siteConfig';
import { computeQualificationTier } from '../utils/qualification';
import { getUtmParams } from '../utils/utmTracker';

/**
 * Builds the individual insurance advisor lead JSON payload and posts it to VITE_CRM_WEBHOOK_URL.
 */
export async function submitLeadToCrm(formData) {
  const utms = getUtmParams();
  const qualificationTier = computeQualificationTier({
    activeClients: formData.activeClients,
  });

  const payload = {
    lead_name: (formData.leadName || '').trim(),
    city: (formData.city || '').trim(),
    practice_type: formData.practiceType || '',
    whatsapp_number: formData.whatsappNumber || '',
    email: (formData.email || '').trim(),
    active_policyholders: formData.activeClients || '',
    insurance_lines: Array.isArray(formData.insuranceLines) ? formData.insuranceLines : [],
    primary_goal: formData.primaryGoal || '',
    qualification_tier: qualificationTier,
    estimated_leakage_inr: Math.round(Number(formData.estimatedLeakageInr) || 0),
    utm_source: utms.utm_source || '',
    utm_medium: utms.utm_medium || '',
    utm_campaign: utms.utm_campaign || '',
    ...(utms.utm_adset ? { utm_adset: utms.utm_adset } : {}),
    ...(utms.utm_content ? { utm_content: utms.utm_content } : {}),
    submitted_at: new Date().toISOString(),
  };

  const webhookUrl = import.meta.env.VITE_CRM_WEBHOOK_URL;

  if (!isWebhookConfigured(webhookUrl)) {
    if (import.meta.env.DEV) {
      console.info('[ADVYU Advisor CRM Webhook Preview — VITE_CRM_WEBHOOK_URL not configured]', payload);
    }
    return {
      ok: true,
      simulated: true,
      payload,
    };
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(webhookUrl.trim(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    window.clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        ok: false,
        simulated: false,
        status: response.status,
        error: `Webhook responded with HTTP ${response.status}`,
        payload,
      };
    }

    return {
      ok: true,
      simulated: false,
      status: response.status,
      payload,
    };
  } catch (error) {
    window.clearTimeout(timeoutId);
    return {
      ok: false,
      simulated: false,
      error: error instanceof Error ? error.message : 'Network error posting to CRM webhook',
      payload,
    };
  }
}
