import styled from "styled-components/macro";
import {
  // Flex,
  FlexBetween,
  FlexEnd,
  StyledNavLink,
  StyledIcon,
  // StyledNavText,
} from "components/Styled";
import LogoWhite from "assets/images/logo_white.svg";
import media from "theme/media";
// import { Trans } from "@lingui/macro";
import {
  // FaPaperPlane,
  // FaDownload,
  // FaExchangeAlt,
  // FaShoppingCart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { GiCheckedShield } from "react-icons/gi";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 4.5rem;
  position: sticky;
  top: 0rem;
  display: flex;
  background-color: ${({ theme }) => theme.bg100};
  z-index: 900;
`;

const Container = styled(FlexBetween)`
  width: 100%;
  padding: 0rem 1rem;
`;

const Logo = styled.a`
  height: 100%;
  text-decoration: none;
  color: ${({ theme }) => theme.text200};
  svg,
  img {
    max-width: 200px;
    height: 100%;

    ${media.mobile`
      max-width: 110px;
    `}
  }
`;

const MenuItems = styled(Container)`
  padding: 0rem;
  height: 2.5rem;
`;

// const GroupMenuItemsStart = styled(Flex)`
//   height: 100%;
// `;

const GroupMenuItemsEnd = styled(FlexEnd)`
  width: 100%;
  height: 100%;
`;

export const WalletHeader = () => {
  return (
    <HeaderWrapper>
      <Container>
        <Logo href="/">
          <img src={LogoWhite} alt="logo" />
        </Logo>
        <MenuItems>
          {/* <GroupMenuItemsStart>
            <StyledNavLink to="/account">
              <StyledIcon>
                <FaPaperPlane />
              </StyledIcon>
              <StyledNavText>
                <Trans>Send</Trans>
              </StyledNavText>
            </StyledNavLink>
            <StyledNavLink to="/account">
              <StyledIcon>
                <FaDownload />
              </StyledIcon>
              <StyledNavText>
                <Trans>Receive</Trans>
              </StyledNavText>
            </StyledNavLink>
            <StyledNavLink to="/account">
              <StyledIcon>
                <FaExchangeAlt />
              </StyledIcon>
              <StyledNavText>
                <Trans>Swap</Trans>
              </StyledNavText>
            </StyledNavLink>
            <StyledNavLink to="/account">
              <StyledIcon>
                <FaShoppingCart />
              </StyledIcon>
              <StyledNavText>
                <Trans>Buy/Sell crypto</Trans>
              </StyledNavText>
            </StyledNavLink>
          </GroupMenuItemsStart> */}
          <GroupMenuItemsEnd>
            <StyledNavLink to="/account">
              <StyledIcon>
                <GiCheckedShield />
              </StyledIcon>
            </StyledNavLink>
            <StyledNavLink to="/account">
              <StyledIcon>
                <FaCog />
              </StyledIcon>
            </StyledNavLink>
            <StyledNavLink to="/account">
              <StyledIcon>
                <FaSignOutAlt />
              </StyledIcon>
            </StyledNavLink>
          </GroupMenuItemsEnd>
        </MenuItems>
      </Container>
    </HeaderWrapper>
  );
};
