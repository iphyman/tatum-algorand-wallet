import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { useParams, Navigate } from "react-router-dom";
import { FaSearch, FaDownload } from "react-icons/fa";
import { ImArrowDownRight2, ImArrowUpRight2 } from "react-icons/im";
import { BiTransfer } from "react-icons/bi";
import { GiPaperPlane } from "react-icons/gi";
import {
  BoxWrapper,
  Flex,
  FlexBetween,
  FlexCenter,
  FlexColumn,
  FullWidth,
  PriceChange,
  StyledInput,
} from "components/Styled";
import { Trans } from "@lingui/macro";
import { useMarkets } from "contexts/markets";
import { getChartData } from "utils/request";
import { formatUSD, roundToDecimal, shortenAddress } from "utils/formatter";
import { Loader } from "components/Loader";
import { Market } from "typings/coingecko";
// import { SparklineChart } from "components/Chart/SparklineChart";
import { getChartColor } from "utils/chart";
import { BaseChart } from "components/Chart";
import media from "theme/media";
import { PrimaryOutlineButton } from "components/Button";

const SUPPORTED_SYMBOLS = ["algo"];

const Row = styled(Flex)`
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  justify-content: space-between;

  ${media.atLeastLaptop`
    height: 7.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  `}
`;

const BalanceColumn = styled(BoxWrapper)`
  min-width: 20rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;

  ${media.atLeastLaptop`
    height: 100%;
    max-width: 20rem;
    margin-bottom: 0rem;
  `}
`;

const PriceChartColumn = styled(BoxWrapper)`
  height: auto;
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;

  ${media.atLeastLaptop`
    height: 100%;
    max-width: calc(100% - 21.5rem);
    margin-bottom: 0rem;
  `}
`;

const PriceChartPrice = styled(FlexColumn)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-right: 1rem;
`;

const StyledLabel = styled.div<{ textRight?: boolean }>`
  font-size: 1rem;
  color: ${({ theme }) => theme.text200};
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-align: ${({ textRight }) => (textRight ? "right" : "left")};
  text-overflow: ellipsis;
`;

const StyledValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text100};
`;

const SparklineContainer = styled(FlexCenter)`
  width: 100%;
  height: 100%;
`;

const TabsNavWrapper = styled(FullWidth)`
  position: sticky;
  top: 0rem;
  z-index: 200;
`;

const TabsNavContainer = styled(FlexCenter)`
  width: 100%;

  ${media.tabletL`
    flex-direction: column;
  `}
`;

const TabsNavLeft = styled(FlexCenter)`
  justify-content: flex-start;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.bg100};
  ${media.laptopL`
    margin-right: 1rem;
  `}
`;

const TabsNavRight = styled(TabsNavLeft)`
  width: 100%;
  background-color: transparent;
  margin-top: 1rem;
  margin-right: 0rem;

  ${media.atLeastTabletL`
    margin-top: 0rem;
  `}
`;

const TabsButton = styled(PrimaryOutlineButton)`
  min-width: auto;
  color: ${({ theme }) => theme.text100};
  border-color: transparent;
  padding: 0.75rem 1.25rem;
  margin: 0.125rem;

  :hover {
    color: ${({ theme }) => theme.text200};
  }
  &.active {
    color: ${({ theme }) => theme.primary100};
    background-color: ${({ theme }) => theme.bg200};
  }
`;

const TabsContent = styled(FlexColumn)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.bg300};
  border-radius: 0.5rem;
  box-sizing: border-box;
  margin-top: 1.5rem;
`;

const SearchInputContainer = styled.div`
  width: 100%;
  height: 2.5rem;
  position: relative;
  margin-left: 1rem;
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.875rem;
`;

const TextInput = styled(StyledInput)`
  padding: 0rem 0.75rem 0rem 2.5rem;
  height: 2.5rem;
`;

const DownloadButton = styled(PrimaryOutlineButton)`
  min-width: auto;
  svg {
    margin-right: 0.5rem;
  }
`;

const TransactionRow = styled(FlexBetween)`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.bg300};
  padding: 1rem;
  cursor: pointer;
`;

const StyledIcon = styled.div`
  margin-right: 1rem;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const TransactionValue = styled(StyledValue)<{ textRight?: boolean }>`
  font-size: 1rem;
  text-align: ${({ textRight }) => (textRight ? "right" : "left")};
`;

const NoRecordFound = styled(TransactionValue)`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
`;

export default function Transactions() {
  const [isSupportedSymbol, setSupportedSymbol] = useState<boolean>(true);
  const [chartData, setChartData] = useState<any[]>([]);
  const [marketData, setMarketData] = useState<Market | null>(null);
  const [activeTab, setActiveTab] = useState<
    "All" | "Sent" | "Received" | "Transfered"
  >("All");
  const { markets } = useMarkets();
  let { currency } = useParams();
  currency?.toLocaleLowerCase();

  useEffect(() => {
    if (currency && SUPPORTED_SYMBOLS.indexOf(currency) === -1) {
      setSupportedSymbol(false);
    }

    const activeMarket = markets.find(
      (market) => ~market.symbol.search(new RegExp(currency as string, "i"))
    );

    if (!activeMarket) return;

    let isMounted = true;

    const get = async () => {
      const { prices } = await getChartData({ id: activeMarket.id });

      if (isMounted) {
        setChartData(prices);
        setMarketData(activeMarket);
      }
    };

    get();

    return () => {
      isMounted = false;
    };
  }, [currency, markets]);

  return (
    <>
      {!isSupportedSymbol && <Navigate to="/" />}
      {!chartData || !marketData ? (
        <Loader />
      ) : (
        <>
          <Row>
            <BalanceColumn>
              <StyledLabel>
                {currency?.toUpperCase()} <Trans>Balance</Trans>
              </StyledLabel>
              <StyledValue>$0.00</StyledValue>
              <StyledLabel>230,000 {currency?.toUpperCase()}</StyledLabel>
            </BalanceColumn>
            <PriceChartColumn>
              <PriceChartPrice>
                <StyledLabel>
                  {currency?.toUpperCase()} <Trans>Price</Trans>
                </StyledLabel>
                <StyledValue>{formatUSD(marketData.current_price)}</StyledValue>
                <PriceChange isPositive={marketData.price_change_24h > 0}>
                  {formatUSD(marketData.price_change_24h)} (
                  {roundToDecimal(marketData.price_change_percentage_24h)})%
                </PriceChange>
              </PriceChartPrice>
              <SparklineContainer>
                <BaseChart
                  data={chartData}
                  color={getChartColor(marketData.id)}
                  height={80}
                  interval="DAYS"
                />
              </SparklineContainer>
            </PriceChartColumn>
          </Row>
          <TabsNavWrapper>
            <TabsNavContainer>
              <TabsNavLeft>
                <TabsButton
                  className={activeTab === "All" ? "active" : ""}
                  onClick={() => setActiveTab("All")}
                >
                  All
                </TabsButton>
                <TabsButton
                  className={activeTab === "Received" ? "active" : ""}
                  onClick={() => setActiveTab("Received")}
                >
                  Received
                </TabsButton>
                <TabsButton
                  className={activeTab === "Sent" ? "active" : ""}
                  onClick={() => setActiveTab("Sent")}
                >
                  Sent
                </TabsButton>
                <TabsButton
                  className={activeTab === "Transfered" ? "active" : ""}
                  onClick={() => setActiveTab("Transfered")}
                >
                  Transferred
                </TabsButton>
              </TabsNavLeft>
              <TabsNavRight>
                <DownloadButton>
                  <FaDownload /> Download
                </DownloadButton>
                <SearchInputContainer>
                  <SearchIcon>
                    <FaSearch />
                  </SearchIcon>
                  <TextInput />
                </SearchInputContainer>
              </TabsNavRight>
            </TabsNavContainer>
          </TabsNavWrapper>
          <TabsContent>
            <TransactionRow>
              <FlexCenter>
                <StyledIcon>
                  <ImArrowUpRight2 />
                </StyledIcon>
                <FlexColumn>
                  <TransactionValue>
                    Sent {currency?.toUpperCase()}
                  </TransactionValue>
                  <StyledLabel>{new Date().toLocaleString()}</StyledLabel>
                </FlexColumn>
              </FlexCenter>
              <FlexColumn>
                <StyledLabel>
                  From:{" "}
                  {shortenAddress(
                    "FUXIMLGZRLMOCN3FVBRKL5UWC46EOYSIPZUAJR3NOXQVPREHCOD4LB7FB4"
                  )}
                </StyledLabel>
                <StyledLabel>
                  To:{" "}
                  {shortenAddress(
                    "FUXIMLGZRLMOCN3FVBRKL5UWC46EOYSIPZUAJR3NOXQVPREHCOD4LB7FB4"
                  )}
                </StyledLabel>
              </FlexColumn>
              <FlexColumn>
                <TransactionValue textRight>
                  0.00123 {currency?.toUpperCase()}
                </TransactionValue>
                <StyledLabel textRight>$0.234</StyledLabel>
              </FlexColumn>
            </TransactionRow>
            <TransactionRow>
              <NoRecordFound>No Transactions Yet!</NoRecordFound>
            </TransactionRow>
          </TabsContent>
        </>
      )}
    </>
  );
}
