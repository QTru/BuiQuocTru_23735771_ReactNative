// 1234.5 -> "$1,234.50"
export function formatCurrency(value: number): string {
  const [int, dec] = value.toFixed(2).split(".");
  return `$${int.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${dec}`;
}
