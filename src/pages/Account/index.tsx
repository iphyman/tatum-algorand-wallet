import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { WalletHeader } from "components/Header";
import { Sidebar } from "components/Sidebar";
import { FlexColumn, Flex } from "components/Styled";
import media from "theme/media";

const PageContainer = styled(FlexColumn)`
  width: 100%;
  padding: 1rem;
  ${media.atLeastTablet`
    padding: 2rem;
  `}
`;

export default function Account() {
  return (
    <FlexColumn>
      <WalletHeader />
      <Flex>
        <Sidebar />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </Flex>
    </FlexColumn>
  );
}
