// Formats number to separate
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
