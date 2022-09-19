export const formatUSD = (value = 0) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const roundToDecimal = (value = 0, precision = 2) => {
  const multiplier = Math.pow(10, precision);

  return Math.round(value * multiplier) / multiplier;
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("en-US").format(number);
}

export const shortenAddress = (address: string, first = 22, last = 3) => {
  if (!address) return;
  address = address.toUpperCase();
  return `${address.substring(0, first)}...${address.substring(address.length - last)}`;
}