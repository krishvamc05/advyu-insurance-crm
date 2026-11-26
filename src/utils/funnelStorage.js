const CALCULATOR_KEY = 'advyu_calculator_metrics';
const SUBMISSION_KEY = 'advyu_lead_submission';

export function saveCalculatorMetrics(metrics) {
  try {
    window.sessionStorage.setItem(CALCULATOR_KEY, JSON.stringify(metrics));
  } catch {
    // Ignore storage failures
  }
}

export function getCalculatorMetrics() {
  try {
    const raw = window.sessionStorage.getItem(CALCULATOR_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveLeadSubmission(submission) {
  try {
    window.sessionStorage.setItem(SUBMISSION_KEY, JSON.stringify(submission));
  } catch {
    // Ignore storage failures
  }
}

export function getLeadSubmission() {
  try {
    const raw = window.sessionStorage.getItem(SUBMISSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
