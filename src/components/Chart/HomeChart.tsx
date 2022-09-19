import styled from "styled-components/macro";
import Tippy from "@tippyjs/react";
import { HiChevronDown } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import { BaseChart } from "components/Chart/BaseChart";
import {
  FlexColumn,
  FlexBetween,
  FlexCenterColumn,
  StyledIcon,
  FlexEnd,
  FullWidth,
  FlexCenter,
  PriceChange
} from "components/Styled";
import {
  PrimaryOutlineButton,
  PrimaryButton,
  DropdownItemBtn,
} from "components/Button";
import { Trans } from "@lingui/macro";
import media from "theme/media";
import { useMarkets } from "contexts/markets";
import { formatUSD, roundToDecimal } from "utils/formatter";
import { useEffect, useState } from "react";
import { getChartData } from "utils/request";
import { Loader } from "components/Loader";
import { getChartColor } from "utils/chart";

const HomeChartWrapper = styled(FullWidth)`
min-height: 25rem;
`;

const Container = styled(FlexColumn)`
  width: 100%;
`;

const ChartHeader = styled(FlexBetween)`
  width: 100%;
  padding: 2rem 1rem 0rem;
  ${media.mobileL`
    flex-wrap: wrap;
    justify-content: center;
  `}
`;

const GroupHeaderStart = styled(FlexCenterColumn)`
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const GroupHeaderEnd = styled(FlexEnd)`
  & > button:first-child {
    margin-right: 1rem;
  }
`;

const DropdownButton = styled(PrimaryOutlineButton)`
  color: ${({ theme }) => theme.text200};
  border-color: transparent;
  padding: 0rem;
  min-width: fit-content;

  &:hover {
    background-color: transparent;
  }
`;

const DropdownWrapper = styled.div`
  min-width: 13rem;
  background-color: ${({ theme }) => theme.bg100};
  border-radius: 0.5rem;
  padding: 0rem 0.5rem;
  max-height: 18rem;
  overflow-y: auto;
`;

const DropdownItem = styled(FullWidth)`
  padding: 0.25rem 0rem;
  :not(:last-child) {
    border-bottom: 0.0625rem solid ${({ theme }) => theme.bg300};
  }
`;

const LeftIcon = styled(FlexCenter)`
  margin-right: 10px;
  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
  }
  & > svg {
    path {
      stroke: inherit;
    }
  }
`;

const RightIcon = styled(LeftIcon)`
  margin: 0px 0px 0px auto;
`;

const CurrencySymbol = styled.div`
  margin-right: 0.25rem;
`;

const CurrencyName = styled(CurrencySymbol)`
  max-width: 5.625rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CurrentPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text100};
`;

const SupportedBlockchainDropdown = () => {
  const { supportedMarkets, activeMarketId, setActiveMarketId } = useMarkets();
  supportedMarkets.sort((a, b) => a.id.localeCompare(b.id));

  return (
    <DropdownWrapper>
      {supportedMarkets.map(market => (
        <DropdownItem key={market.id}>
          <DropdownItemBtn
            className={activeMarketId === market.id ? "active" : ""}
            onClick={() => setActiveMarketId(market.id)}
          >
            <LeftIcon>
              <img src={market.image} alt={market.name} />
            </LeftIcon>
            {market.name}
            {activeMarketId === market.id && (
              <RightIcon>
                <FaCheckCircle color="#00897B" />
              </RightIcon>
            )}
          </DropdownItemBtn>
        </DropdownItem>
      ))}
    </DropdownWrapper>
  );
};

export const HomeChart = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const { activeMarket, activeMarketId } = useMarkets();

  const isPositive = () => {
    if (activeMarket) return activeMarket.price_change_24h > 0;

    return false;
  };

  useEffect(() => {
    if (!activeMarketId) return;
    let isMounted = true;

    const get = async () => {
      const { prices } = await getChartData({ id: activeMarketId });

      if (isMounted) {
        setData(prices);
        setIsLoading(false);
      }
    };

    get();

    return () => {
      isMounted = false;
    };
  }, [activeMarketId]);

  return (
    <HomeChartWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <ChartHeader>
            <GroupHeaderStart>
              <Tippy
                content={<SupportedBlockchainDropdown />}
                interactive
                trigger="click"
                placement="bottom-start"
                allowHTML
                arrow={false}
                offset={[0, 0]}
              >
                <DropdownButton>
                  <CurrencyName>{activeMarket?.name}</CurrencyName>
                  <CurrencySymbol>
                    ({activeMarket?.symbol.toUpperCase()})
                  </CurrencySymbol>
                  <StyledIcon>
                    <HiChevronDown />
                  </StyledIcon>
                </DropdownButton>
              </Tippy>
              <CurrentPrice>
                {formatUSD(activeMarket?.current_price)}
              </CurrentPrice>
              <PriceChange isPositive={isPositive()}>
                {formatUSD(activeMarket?.price_change_24h)} (
                {roundToDecimal(activeMarket?.price_change_percentage_24h)})%
              </PriceChange>
            </GroupHeaderStart>
            <GroupHeaderEnd>
              <PrimaryButton>
                <Trans>Send</Trans>
              </PrimaryButton>
              <PrimaryOutlineButton>
                <Trans>Request</Trans>
              </PrimaryOutlineButton>
            </GroupHeaderEnd>
          </ChartHeader>
          <BaseChart
            data={data}
            color={getChartColor(activeMarketId)}
            height={300}
            interval="DAYS"
          />
        </Container>
      )}
    </HomeChartWrapper>
  );
};
