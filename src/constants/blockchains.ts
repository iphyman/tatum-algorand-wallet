export const SUPPORTED_BLOCKCHAIN_ASSETS = [
  "algorand",
  "bitcoin",
  "ethereum",
  "ripple",
  "stellar",
  "solana",
  "flow",
  "celo",
  "wrapped-bitcoin",
  "elrond",
  "tron",
  "cardano",
  "litecoin",
  "binancecoin",
] as const;

export type SupportedBlockchainAssetId = typeof SUPPORTED_BLOCKCHAIN_ASSETS[number];

export const SUPPORTED_BLOCKCHAIN_ASSETS_COLORS: {
  [color in SupportedBlockchainAssetId]: string;
} = {
  algorand: "#000000",
  bitcoin: "#F7931A",
  ethereum: "#627EEA",
  ripple: "#00AAE4",
  stellar: "#46647E",
  solana: "#A54FE3",
  flow: "#00EF8B",
  celo: "#FBCC5C",
  "wrapped-bitcoin": "#EFAE74",
  elrond: "#000000",
  tron: "#81241E",
  cardano: "#245293",
  litecoin: "#838383",
  binancecoin: "#F2B92F",
};
