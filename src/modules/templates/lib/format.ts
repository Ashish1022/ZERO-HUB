const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export const formatPaise = (amount: number): string => {
  if (amount === 0) return 'Free'
  return inr.format(amount / 100)
}

export const formatCompactNumber = (value: number): string => {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
  return String(value)
}
