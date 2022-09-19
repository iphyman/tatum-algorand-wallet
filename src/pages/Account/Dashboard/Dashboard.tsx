import { Balances } from "components/Balances";
import { HomeChart } from "components/Chart";
import { BoxWrapper, Flex, FlexColumn } from "components/Styled";
import styled from "styled-components/macro";
import media from "theme/media";

const Row = styled(Flex)`
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Column = styled(FlexColumn)`
  width: 100%;
  margin-bottom: 1rem;
`;

const BalanceColumn = styled(Column)`
  ${media.atLeastLaptop`
    max-width: calc(40% - 0.75rem);
  `};
`;

const ChartColumn = styled(Column)`
  ${media.atLeastLaptop`
    max-width: calc(60% - 0.75rem);
  `};
`;

export default function Dashboard() {
  return (
    <Row>
      <BalanceColumn>
        <BoxWrapper>
          <Balances />
        </BoxWrapper>
      </BalanceColumn>
      <ChartColumn>
        <BoxWrapper>
          <HomeChart />
        </BoxWrapper>
      </ChartColumn>
    </Row>
  );
}
