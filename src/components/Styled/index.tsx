import { darken, rgba } from "polished";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

const activeclassname = "active";

export const Flex = styled.div`
  display: flex;
`;

export const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexBetween = styled(FlexCenter)`
  justify-content: space-between;
`;

export const StyledNavLink = styled(NavLink).attrs({
  activeclassname,
})`
  position: relative;
  height: 100%;
  text-decoration: none;
  white-space: nowrap;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 600;
  color: ${({ theme }) => rgba(theme.white, 0.9)};
  transition: all 0.5s ease-in-out;
  padding: 0rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;

  &.${activeclassname} {
    color: ${({ theme }) => theme.text300};
    background-color: ${({ theme }) => theme.bg400};
  }
  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text300)};
    background-color: ${({ theme }) => theme.bg400};
  }

  :not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.bg300};
  }
`;

export const FlexCenterColumn = styled(FlexCenter)`
  flex-direction: column;
`;

export const FlexEnd = styled(FlexCenter)`
  justify-self: flex-end;
  justify-content: flex-end;
`;

export const StyledIcon = styled.div<{ large?: boolean }>`
  display: flex;
  svg,
  img {
    width: ${({ large }) => (large ? "2rem" : "1.5rem")};
    height: ${({ large }) => (large ? "2rem" : "1.5rem")};
  }
`;

export const StyledNavText = styled.span`
  padding-left: 0.5rem;
`;

export const FullWidth = styled.div`
  width: 100%;
`;

export const PriceChange = styled.div<{ isPositive?: boolean }>`
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0.5rem;
  color: ${({ theme, isPositive }) =>
    isPositive ? theme.positive : theme.negative};
  white-space: nowrap;
`;

export const BoxWrapper = styled(FullWidth)`
  border: 1px solid ${({ theme }) => theme.bg300};
  border-radius: 0.5rem;
  box-sizing: border-box;
`;

export const StyledInput = styled.input`
  display: flex;
  width: 100%;
  height: 3rem;
  border: 1px solid ${({ theme }) => theme.bg300};
  font-size: 1rem;
  color: ${({ theme }) => theme.text200};
  font-weight: 500;
  font-family: "Inter", sans-serif;
  padding: 0.25rem 0.75rem;
  outline-width: 0rem;
  background-color: transparent;
  border-radius: 0.5rem;
  box-sizing: border-box;
  user-select: text;
  background-image: none;
  transition: all 0.3s ease;

  &:focus {
    border: 1px solid rgb(12, 108, 242);
    &::-webkit-input-placeholder {
      opacity: 0.5;
    }
  }
`;

export const FormGroup = styled(FullWidth)`
  margin-bottom: 1rem;
`;

export const Label = styled(FullWidth)`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text400};
  margin-bottom: 0.25rem;
`;
