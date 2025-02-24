export function addCommas(x:number):string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatCurrency(amount:number):string {
  return `$${addCommas(amount)}`;
}

export function formatAmount(amount:number):string {
  return amount < 0 ? `-$${addCommas(Math.abs(amount))}` : `$${addCommas(amount)}`;
}