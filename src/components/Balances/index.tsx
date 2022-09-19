import { Trans } from "@lingui/macro";
import {
  FlexColumn,
  StyledNavLink,
  StyledIcon,
  StyledNavText,
  Flex,
  FlexEnd,
  FlexBetween,
} from "components/Styled";
import styled from "styled-components/macro";
import ALGOLOGO from "assets/images/algo.png";
import BTCLOGO from "assets/images/btc.png";
import ETHLOGO from "assets/images/eth.png";

const BlancesWrapper = styled(FlexColumn)`
  width: 100%;
  padding: 2rem 1rem;
`;

const BalanceHeader = styled(FlexBetween)`
  width: 100%;
`;

const BalanceBody = styled(BlancesWrapper)`
  padding: 0rem;
`;

const BalancesTitle = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.text200};
  line-height: 1.5;
  font-weight: 700;
  margin: 0rem;
`;

const BalanceValue = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text100};
  text-align: end;
`;

const BalanceFiatValue = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text300};
  text-align: end;
`;

const FlexStart = styled(Flex)`
  align-items: center;
`;

const BalanceLink = styled(StyledNavLink)`
  justify-content: space-between;
  padding: 0.25rem 0rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text200};
  &.active {
    color: none;
    background-color: transparent;
  }
  :hover,
  :focus {
    color: none;
    background-color: transparent;
  }

  :not(:last-child) {
    border: 0rem;
    border-bottom: 1px solid ${({ theme }) => theme.bg300};
  }
`;

export const Balances = () => {
  return (
    <BlancesWrapper>
      <BalanceHeader>
        <BalancesTitle>
          <Trans>Holdings</Trans>
        </BalancesTitle>
      </BalanceHeader>
      <BalanceBody>
        <BalanceLink to="/algo/transactions">
          <FlexStart>
            <StyledIcon large>
              <img src={ALGOLOGO} alt="Algorand" />
            </StyledIcon>
            <StyledNavText>Algorand</StyledNavText>
          </FlexStart>
          <FlexEnd>
            <FlexColumn>
              <BalanceFiatValue>$0.00</BalanceFiatValue>
              <BalanceValue>0.00 ALGO</BalanceValue>
            </FlexColumn>
          </FlexEnd>
        </BalanceLink>
        <BalanceLink to="/btc/transactions">
          <FlexStart>
            <StyledIcon large>
              <img src={BTCLOGO} alt="Bitcoin" />
            </StyledIcon>
            <StyledNavText>Bitcoin</StyledNavText>
          </FlexStart>
          <FlexEnd>
            <FlexColumn>
              <BalanceFiatValue>$0.00</BalanceFiatValue>
              <BalanceValue>0.00 BTC</BalanceValue>
            </FlexColumn>
          </FlexEnd>
        </BalanceLink>
        <BalanceLink to="/eth/transactions">
          <FlexStart>
            <StyledIcon large>
              <img src={ETHLOGO} alt="Ethereum" />
            </StyledIcon>
            <StyledNavText>Ethereum</StyledNavText>
          </FlexStart>
          <FlexEnd>
            <FlexColumn>
              <BalanceFiatValue>$0.00</BalanceFiatValue>
              <BalanceValue>0.00 ETH</BalanceValue>
            </FlexColumn>
          </FlexEnd>
        </BalanceLink>
      </BalanceBody>
    </BlancesWrapper>
  );
};
