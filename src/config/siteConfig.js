export const DEFAULT_WABA_NUMBER = '919160230223';
export const DEFAULT_WABA_MESSAGE = 'Hi, I would like to explore more about ADVYU InsureTech Automation CRM';

const envMeta = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};

export const siteConfig = {
  brandName: envMeta.VITE_BRAND_NAME || 'ADVYU',
  websiteUrl: envMeta.VITE_WEBSITE_URL || 'https://advyu.com',
  websiteDisplay: 'advyu.com',
  wabaNumber: envMeta.VITE_WABA_NUMBER || DEFAULT_WABA_NUMBER,
  crmWebhookUrl: envMeta.VITE_CRM_WEBHOOK_URL || '[YOUR_CRM_WEBHOOK_URL]',
  demoCalendarUrl: envMeta.VITE_DEMO_CALENDAR_URL || '[YOUR_CALENDLY_OR_CAL_LINK]',
};

export function isPlaceholderValue(value) {
  if (!value || typeof value !== 'string') return true;
  const trimmed = value.trim();
  return !trimmed || (trimmed.startsWith('[') && trimmed.endsWith(']')) || trimmed.includes('[YOUR_');
}

export function getCleanWabaNumber() {
  const raw = siteConfig.wabaNumber;
  if (isPlaceholderValue(raw)) {
    return DEFAULT_WABA_NUMBER;
  }
  const digits = raw.replace(/[^\d]/g, '');
  if (/^[6-9]\d{9}$/.test(digits)) {
    return `91${digits}`;
  }
  return digits || DEFAULT_WABA_NUMBER;
}

export function getWhatsAppDeepLink(message = DEFAULT_WABA_MESSAGE) {
  const targetNumber = getCleanWabaNumber();
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${targetNumber}?text=${encodedText}`;
}

export function getHeroWhatsAppDemoLink() {
  return getWhatsAppDeepLink(DEFAULT_WABA_MESSAGE);
}

export function isWebhookConfigured(url = envMeta.VITE_CRM_WEBHOOK_URL) {
  if (isPlaceholderValue(url)) return false;
  return /^https?:\/\/.+/i.test(url.trim());
}

export function isCalendarConfigured(url = siteConfig.demoCalendarUrl) {
  if (isPlaceholderValue(url)) return false;
  return /^https?:\/\/.+/i.test(url.trim());
}
