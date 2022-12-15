export const isNumeric = (value: any): boolean =>
  !isNaN(parseFloat(value)) && isFinite(value);
