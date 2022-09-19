import {
  SupportedBlockchainAssetId,
  SUPPORTED_BLOCKCHAIN_ASSETS_COLORS,
} from "constants/blockchains";

export const getChartColor = (activeMarketId: string | null) => {
  if (!activeMarketId) {
    return "#ff3";
  }

  return SUPPORTED_BLOCKCHAIN_ASSETS_COLORS[
    activeMarketId as SupportedBlockchainAssetId
  ];
};
