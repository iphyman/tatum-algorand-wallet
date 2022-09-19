import {
  createContext,
  ReactNode,
  useMemo,
  useState,
  useEffect,
  useContext,
} from "react";
import { ACTIVE_MARKET_CACHE_KEY } from "constants/cache";
import { Market } from "typings/coingecko";
import { cache } from "utils/cache";
import { COINGECKO_GET_MARKETS } from "constants/endpoints";
import {
  SupportedBlockchainAssetId,
  SUPPORTED_BLOCKCHAIN_ASSETS,
} from "constants/blockchains";

const MarketsContext = createContext<{
  activeMarket: Market | null;
  markets: Market[];
  supportedMarkets: Market[];
  marketsMap: Map<string, Market>;
  activeMarketId: string | null;
  isLoading: boolean;
  setActiveMarketId: (id: string) => void;
} | null>(null);

export const MarketsProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [marketsMap, setMarketsMapState] = useState(new Map<string, Market>());
  const [activeMarketId, setActiveMarketIdState] = useState<string | null>(
    cache(ACTIVE_MARKET_CACHE_KEY)
  );

  const markets: Market[] = useMemo(() => Array.from(marketsMap.values()), [
    marketsMap,
  ]);

  const supportedMarkets = markets.filter(market => {
    return (
      SUPPORTED_BLOCKCHAIN_ASSETS.indexOf(
        market.id as SupportedBlockchainAssetId
      ) > -1
    );
  });

  const activeMarket = useMemo(
    () => (!activeMarketId ? null : marketsMap.get(activeMarketId) ?? null),
    [activeMarketId, marketsMap]
  );

  const setActiveMarketId = (id: string | null) => {
    setActiveMarketIdState(id);
    cache(ACTIVE_MARKET_CACHE_KEY, id);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchMarkets = async () => {
      const res = await fetch(COINGECKO_GET_MARKETS, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      const marketsData = await res.json();

      if (isMounted) {
        setMarketsMapState(
          new Map(marketsData.map((market: Market) => [market.id, market]))
        );

        if (!activeMarketId) {
          const { id } =
            marketsData.find(
              (market: Market) => ~market.name.search(/algorand/i)
            ) ?? marketsData[0];
          setActiveMarketId(id);
        }

        setIsLoading(false);
      }
    };

    fetchMarkets();

    return function cleanup() {
      isMounted = false;
    };
  }, [setMarketsMapState, activeMarketId]);

  return (
    <MarketsContext.Provider
      value={{
        activeMarket,
        activeMarketId,
        markets,
        supportedMarkets,
        marketsMap,
        isLoading,
        setActiveMarketId,
      }}
    >
      {children}
    </MarketsContext.Provider>
  );
};

export const useMarkets = () => {
  const context = useContext(MarketsContext);

  if (!context) {
    throw new Error("Missing Markets context");
  }

  const {
    activeMarket,
    activeMarketId,
    markets,
    supportedMarkets,
    marketsMap,
    isLoading,
    setActiveMarketId,
  } = context;

  return {
    activeMarket,
    activeMarketId,
    markets,
    supportedMarkets,
    marketsMap,
    isLoading,
    setActiveMarketId,
  };
};
