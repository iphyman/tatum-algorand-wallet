import { Trans } from "@lingui/macro";
import { PrimaryButton } from "components/Button";
import { Helmet } from "react-helmet-async";
import {
  FlexCenterColumn,
  FormGroup,
  Label,
  StyledInput,
} from "components/Styled";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import { useAuthentication } from "contexts/authentication";
import { useState, FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components/macro";
import { Auth } from "aws-amplify";
import { Alert } from "components/Alert";

const LoginWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginCard = styled.div`
  min-width: 20rem;
  width: 100%;
  max-width: 30rem;
  background-color: ${({ theme }) => theme.white};
  border-radius: 0.5rem;
  box-shadow: rgb(0 0 0 / 20%) 0rem 0.125rem 0.5rem 0rem;
`;

const Container = styled(FlexCenterColumn)`
  width: 100%;
  padding: 2rem;
`;

const Textbox = styled(StyledInput)`
  border-color: ${({ theme }) => theme.bg600};
  color: ${({ theme }) => theme.text400};
  font-size: 1.25rem;
  & [type="password"] {
    letter-spacing: 0.25rem;
  }
`;

const LoginButton = styled(PrimaryButton)`
  width: 100%;
  height: 3rem;
`;

const ForgotPasswordLink = styled(Link)`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary100};
  text-decoration: none;
  text-align: center;
`;

const CreateAccountText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text400};
  font-weight: 500;
  margin-top: 3rem;
`;

const CreateAccountLink = styled(ForgotPasswordLink)`
  font-size: 1rem;
  padding-left: 0.1rem;
`;

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setIsAuthenticated, isAuthenticated } = useAuthentication();

  const validateForm = (): boolean => {
    return (
      isEmail(email) &&
      isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.signIn(email, password);
      setIsLoading(false);
      Alert("Logged In successfully", "success");
      setIsAuthenticated(true);
    } catch (error) {
      const err = error as any;
      Alert(err.message, "error");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <LoginWrapper>
          <Helmet>
            <title>Login | Tatum Alogo Wallet</title>
            <meta
              name="description"
              content="Login to manage your ASAs and other cryptocurrencies"
            />
          </Helmet>
          <LoginCard>
            <Container>
              <FormGroup>
                <Label>
                  <Trans>Email Address</Trans>
                </Label>
                <Textbox />
              </FormGroup>
              <FormGroup>
                <Label>
                  <Trans>Password</Trans>
                </Label>
                <Textbox type="password" />
              </FormGroup>
              <FormGroup>
                <LoginButton>
                  <Trans>Log in</Trans>
                </LoginButton>
              </FormGroup>
              <ForgotPasswordLink to="#">
                <Trans>Forgotten password? Recover</Trans>
              </ForgotPasswordLink>
              <CreateAccountText>
                <Trans>Don't have an account yet?</Trans>
                <CreateAccountLink to="/signup">
                  <Trans>Create Account</Trans>
                </CreateAccountLink>
              </CreateAccountText>
            </Container>
          </LoginCard>
        </LoginWrapper>
      )}
    </>
  );
}
