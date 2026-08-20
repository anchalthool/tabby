export const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value || 0);

export const round2 = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
