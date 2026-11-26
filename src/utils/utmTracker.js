const UTM_STORAGE_KEY = 'advyu_utm_attribution';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_adset', 'utm_content'];

function readStoredUtms() {
  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
  } catch {
    // Ignore storage read failures in restricted contexts
  }
  return null;
}

function writeStoredUtms(data) {
  try {
    window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage write failures in restricted contexts
  }
}

export function captureUtmParams(searchString = typeof window !== 'undefined' ? window.location.search : '') {
  const emptyUtms = {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_adset: '',
    utm_content: '',
  };

  const existing = readStoredUtms() || emptyUtms;
  const params = new URLSearchParams(searchString || '');

  let hasIncomingUtm = false;
  const nextUtms = { ...emptyUtms, ...existing };

  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val !== null && val.trim() !== '') {
      nextUtms[key] = val.trim();
      hasIncomingUtm = true;
    }
  }

  if (hasIncomingUtm || !readStoredUtms()) {
    writeStoredUtms(nextUtms);
  }

  return nextUtms;
}

export function getUtmParams() {
  const stored = readStoredUtms();
  if (stored) {
    return {
      utm_source: stored.utm_source || '',
      utm_medium: stored.utm_medium || '',
      utm_campaign: stored.utm_campaign || '',
      utm_adset: stored.utm_adset || '',
      utm_content: stored.utm_content || '',
    };
  }
  return captureUtmParams();
}
