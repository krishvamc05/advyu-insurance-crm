export function formatInrCompact(amount) {
  const numeric = Number(amount) || 0;
  if (numeric >= 10000000) {
    return `₹${(numeric / 10000000).toFixed(2)} Cr`;
  }
  if (numeric >= 100000) {
    return `₹${(numeric / 100000).toFixed(2)} Lakhs`;
  }
  return formatInrFull(numeric);
}

export function formatInrFull(amount) {
  const numeric = Math.round(Number(amount) || 0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numeric);
}

export function formatIndianNumber(value) {
  return new Intl.NumberFormat('en-IN').format(Math.round(Number(value) || 0));
}
