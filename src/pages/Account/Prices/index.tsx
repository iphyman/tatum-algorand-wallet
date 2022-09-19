import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { Flex, FullWidth } from "components/Styled";
import styled from "styled-components/macro";
import media from "theme/media";
import { useMarkets } from "contexts/markets";
import { useSortableData } from "hooks/useSortable";
import { Market } from "typings/coingecko";
import { formatNumber, formatUSD, roundToDecimal } from "utils/formatter";

const PricesWrapper = styled(FullWidth)`
  border: 1px solid ${({ theme }) => theme.bg300};
  border-radius: 0.5rem;
`;

const TableContainer = styled(FullWidth)`
  overflow-x: hidden;
  overflow-y: auto;
`;

const TickerTableHeaderWrap = styled.div`
  font-size: 0.8125rem;
  margin-top: 1.25rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0rem;
  /* border-radius: 0.25rem; */
  text-align: left;
  letter-spacing: 1px;
  font-size: 0.875rem;

  th,
  td {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    padding-right: 0.625rem;
    padding-left: 0.625rem;
    text-align: left;
    vertical-align: top;
    white-space: nowrap;
  }
  th {
    font-weight: 600;
    text-transform: uppercase;
    :not(:first-child, :nth-child(2)) {
      text-align: right;
    }
  }
  .text-right {
    text-align: right;
  }
  tbody tr td {
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);
    vertical-align: middle;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .rank-cell {
    width: 5%;
  }
  .name-cell {
    width: 15%;
    max-width: 0rem;
    overflow: hidden;
  }
  .price-cell {
    width: 15%;
  }
  .daily-change-cell {
    width: 15%;
  }
  .daily-high-cell {
    width: 14%;
    ${media.tabletL`
    display: none;
  `}
  }
  .daily-low-cell {
    width: 14%;
    ${media.tabletL`
      display: none;
    `}
  }
  .daily-volume-cell {
    width: 22%;
  }
  .is-up {
    color: ${({ theme }) => theme.positive};
  }
  .is-down {
    color: ${({ theme }) => theme.negative};
  }
`;

const HideSm = styled.span`
  margin-right: 0.125rem;
  ${media.mobileL`
  display: none;
  margin-right: 0rem;
`}
`;

const SortButton = styled.button.attrs({
  type: "button",
})`
  width: auto;
  height: 2rem;
  padding: 0rem;
  margin: 0rem;
  font-size: 0.875rem;
  text-align: left;
  color: inherit;
  background: none;
  box-shadow: none;
  outline: none;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SortIconWrap = styled.span`
  margin-left: 0.125rem;
`;

const Name = styled.span`
  padding-left: 0.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Logo = styled.span`
  display: flex;
  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
  }
`;

export default function Prices() {
  const { markets } = useMarkets();
  const { items, sortBy, sortConfig } = useSortableData(markets);

  const SortIcon = (name: string) => {
    if (!sortConfig) return <FaSort />;

    if (sortConfig.key === name) {
      return sortConfig.direction === "ascending" ? (
        <FaSortUp />
      ) : (
        <FaSortDown />
      );
    }

    return <FaSort />;
  };

  const TickersTableBody = styled(TickerTableHeaderWrap)`
    margin-top: 0rem;
    height: 25rem;
  `;

  return (
    <PricesWrapper>
      <TableContainer>
        <TickerTableHeaderWrap>
          <Table>
            <thead>
              <tr>
                <th className="rank-cell"></th>
                <th className="name-cell">
                  <SortButton onClick={() => sortBy("name")}>
                    Name <SortIconWrap>{SortIcon("name")}</SortIconWrap>
                  </SortButton>
                </th>
                <th className="price-cell">
                  <SortButton onClick={() => sortBy("current_price")}>
                    <HideSm>Last</HideSm>Price{" "}
                    <SortIconWrap>{SortIcon("current_price")}</SortIconWrap>
                  </SortButton>
                </th>
                <th className="daily-change-cell">
                  <SortButton
                    onClick={() => sortBy("price_change_percentage_24h")}
                  >
                    <HideSm>24H</HideSm>Change
                    <SortIconWrap>
                      {SortIcon("price_change_percentage_24h")}
                    </SortIconWrap>
                  </SortButton>
                </th>
                <th className="daily-high-cell">
                  <SortButton onClick={() => sortBy("high_24h")}>
                    <HideSm>24H</HideSm>High
                    <SortIconWrap>{SortIcon("high_24h")}</SortIconWrap>
                  </SortButton>
                </th>
                <th className="daily-low-cell">
                  <SortButton onClick={() => sortBy("low_24h")}>
                    <HideSm>24H</HideSm>Low
                    <SortIconWrap>{SortIcon("low_24h")}</SortIconWrap>
                  </SortButton>
                </th>
                <th className="daily-volume-cell">
                  <SortButton onClick={() => sortBy("total_volume")}>
                    <HideSm>24H</HideSm>Volume
                    <SortIconWrap>{SortIcon("total_volume")}</SortIconWrap>
                  </SortButton>
                </th>
              </tr>
            </thead>
          </Table>
        </TickerTableHeaderWrap>
        <TickersTableBody>
          <Table>
            <tbody>
              {items.map((market: Market, index: number) => (
                <tr key={index}>
                  <td className="rank-cell">{index + 1}</td>
                  <td className="name-cell">
                    <Flex>
                      <Logo>
                        <img src={market.image} alt={market.name} />
                      </Logo>
                      <Name>{market.name}</Name>
                    </Flex>
                  </td>
                  <td className="text-right price-cell">
                    {formatUSD(market.current_price)}
                  </td>
                  <td
                    className={
                      market.price_change_percentage_24h > 0
                        ? "text-right daily-change-cell is-up"
                        : "text-right daily-change-cell is-down"
                    }
                  >
                    {roundToDecimal(market.price_change_percentage_24h)}
                  </td>
                  <td className="text-right daily-high-cell">
                    {formatNumber(market.high_24h)}
                  </td>
                  <td className="text-right daily-low-cell">
                    {formatNumber(market.low_24h)}
                  </td>
                  <td className="text-right daily-volume-cell">
                    {formatNumber(market.total_volume)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TickersTableBody>
      </TableContainer>
    </PricesWrapper>
  );
}
