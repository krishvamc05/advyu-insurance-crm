export const QUALIFYING_CLIENT_BUCKETS = [
  '50–250 Policyholders',
  '250–1,000 Policyholders',
  '1,000+ Policyholders (MDRT / Top Producer)',
];

export function computeQualificationTier({ activeClients }) {
  return QUALIFYING_CLIENT_BUCKETS.includes(activeClients)
    ? 'hot_qualified_advisor'
    : 'nurture_starter_advisor';
}

export function normalizeIndianWhatsApp(rawInput) {
  const cleaned = String(rawInput || '').replace(/[\s\-()]/g, '');

  let digits = cleaned;
  if (digits.startsWith('+91')) {
    digits = digits.slice(3);
  } else if (digits.startsWith('91') && digits.length === 12) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0') && digits.length === 11) {
    digits = digits.slice(1);
  }

  const isValid = /^[6-9]\d{9}$/.test(digits);
  if (!isValid) {
    return {
      valid: false,
      digits,
      formatted: '',
      error: 'Enter a valid 10-digit Indian WhatsApp mobile number (starting with 6–9).',
    };
  }

  return {
    valid: true,
    digits,
    formatted: `+91${digits}`,
    error: '',
  };
}

export function suggestClientBucket(policyholdersCount) {
  const count = Number(policyholdersCount) || 350;
  if (count >= 1000) return '1,000+ Policyholders (MDRT / Top Producer)';
  if (count >= 250) return '250–1,000 Policyholders';
  if (count >= 50) return '50–250 Policyholders';
  return 'Just Starting (< 50 Clients)';
}
