import styled from "styled-components/macro";
import { darken, rgba } from "polished";
// import media from "theme/media";

export interface BaseButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  opacity?: string;
}

export const BaseButton = styled.button.attrs<BaseButtonProps>(({ type }) => ({
  type: type ?? "button",
}))<BaseButtonProps>`
  width: auto;
  height: auto;
  padding: 10px 15px;
  margin: 0px;
  background-color: transparent;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  text-align: center;
  line-height: 1;
  color: #fff;
  text-transform: none;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  text-decoration: none;
  transition: all 0.25s ease-in-out;
  opacity: ${({ disabled, opacity }) =>
    disabled ? 0.5 : opacity ? opacity : 1};

  &:hover {
    text-decoration: none;
  }

  &:focus {
    outline: 0px;
  }
`;

export const PrimaryButton = styled(BaseButton)`
  min-width: 7rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.primary100};
  padding: 0.625rem 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.white};
  white-space: nowrap;
  transition: all 0.5s ease;
  border-radius: 0.5rem;
  border-color: ${({ theme }) => theme.primary100};

  &:hover {
    background-color: ${({ theme }) => darken(0.1, theme.primary100)};
  }
`;

export const PrimaryOutlineButton = styled(PrimaryButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.primary100};
  border-color: ${({ theme }) => theme.primary100};

  &:hover {
    background-color: ${darken(0.1, "transparent")};
  }
`;

export const DropdownItemBtn = styled(PrimaryOutlineButton)`
  width: 100%;
  background-color: transparent;
  color: ${({ theme }) => rgba(theme.white, 0.9)};
  border-color: transparent;
  justify-content: flex-start;

  &:hover {
    color: ${({ theme }) => darken(0.1, theme.text300)};
    background-color: ${({ theme }) => theme.bg400};
  }

  &.active {
    color: ${({ theme }) => theme.text300};
    background-color: ${({ theme }) => theme.bg400};
  }
`;
