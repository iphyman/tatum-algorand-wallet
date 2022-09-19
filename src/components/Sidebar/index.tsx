import styled from "styled-components/macro";
import {
  FlexColumn,
  StyledNavLink,
  StyledIcon,
  StyledNavText,
  Flex,
} from "components/Styled";
import { Trans } from "@lingui/macro";
import { FaHome, FaAddressBook } from "react-icons/fa";
import { MdExplore, MdAddCircle } from "react-icons/md";
import { RiGalleryFill } from "react-icons/ri";
import ALGOLOGO from "assets/images/algo.png";
import BTCLOGO from "assets/images/btc.png";
import ETHLOGO from "assets/images/eth.png";

const SidebarWrapper = styled.aside`
  width: 15.625rem;
  min-width: 15.625rem;
  height: calc(100vh - 4.5rem);
  overflow: hidden;
  /* max-width: 0rem; */
`;

const Container = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 0rem;
    background-color: transparent;
  }
`;

const BalanceButton = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  background-color: transparent;
  border: 0rem;
  cursor: pointer;
  margin-bottom: 1rem;
  outline: none;
`;

const SidebarLink = styled(StyledNavLink)`
  height: 3rem;
  min-height: 3rem;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text200};
  :not(:last-child) {
    border: 0rem;
  }
`;

const BalanceTitle = styled.h5`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text200};
  line-height: 1.5;
  margin: 0rem;
`;

const BalanceValue = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text300};
`;

const SidebarLabel = styled(Flex)`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text200};
  margin: 0.5rem 0rem 1rem 1rem;
`;

export const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Container>
        <BalanceButton>
          <BalanceTitle>
            <Trans>Total Balance</Trans>
          </BalanceTitle>
          <BalanceValue>$0.00</BalanceValue>
        </BalanceButton>
        <SidebarLink to="/" className="home-link">
          <StyledIcon>
            <FaHome />
          </StyledIcon>
          <StyledNavText>
            <Trans>Home</Trans>
          </StyledNavText>
        </SidebarLink>
        <SidebarLink to="/prices">
          <StyledIcon>
            <MdExplore />
          </StyledIcon>
          <StyledNavText>
            <Trans>Prices</Trans>
          </StyledNavText>
        </SidebarLink>
        <SidebarLink to="/nfts">
          <StyledIcon>
            <RiGalleryFill />
          </StyledIcon>
          <StyledNavText>
            <Trans>NFTs</Trans>
          </StyledNavText>
        </SidebarLink>
        <SidebarLabel>
          <Trans>Account</Trans>
        </SidebarLabel>
        <SidebarLink to="/wallets">
          <StyledIcon>
            <MdAddCircle />
          </StyledIcon>
          <StyledNavText>
            <Trans>Add Wallet</Trans>
          </StyledNavText>
        </SidebarLink>
        <SidebarLink to="/address-book">
          <StyledIcon>
            <FaAddressBook />
          </StyledIcon>
          <StyledNavText>
            <Trans>Address Book</Trans>
          </StyledNavText>
        </SidebarLink>
        <SidebarLabel>
          <Trans>Portfolio</Trans>
        </SidebarLabel>
        <SidebarLink to="/algo/transactions">
          <StyledIcon>
            <img src={ALGOLOGO} alt="Algorand" />
          </StyledIcon>
          <StyledNavText>
            <Trans>Algorand</Trans>
          </StyledNavText>
        </SidebarLink>
        <SidebarLink to="/btc/transactions">
          <StyledIcon>
            <img src={BTCLOGO} alt="Bitcoin" />
          </StyledIcon>
          <StyledNavText>
            <Trans>Bitcoin</Trans>
          </StyledNavText>
        </SidebarLink>
        <SidebarLink to="/eth/transactions">
          <StyledIcon>
            <img src={ETHLOGO} alt="Ethereum" />
          </StyledIcon>
          <StyledNavText>
            <Trans>Ethereum</Trans>
          </StyledNavText>
        </SidebarLink>
      </Container>
    </SidebarWrapper>
  );
};
