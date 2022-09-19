import { Auth } from "aws-amplify";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
// import { Alert } from "components/Alert";

const AuthenticationContext = createContext<{
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  setIsAuthenticated: (state: boolean) => void;
  setIsAuthenticating: (state: boolean) => void;
} | null>(null);

export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticatingState] = useState<boolean>(true);

  const setIsAuthenticated = (state: boolean) => setIsAuthenticatedState(state);

  const setIsAuthenticating = (state: boolean) =>
    setIsAuthenticatingState(state);

  const loadAuthState = async () => {
    try {
      await Auth.currentSession();
      setIsAuthenticated(true);
    } catch (error) {
      // const err = error as any;
      // Alert(err.message, "error");
    }

    setIsAuthenticating(false);
  };

  useEffect(() => {
    loadAuthState();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        isAuthenticating,
        setIsAuthenticated,
        setIsAuthenticating,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (!context) throw new Error("Missing Authentication context");

  const {
    isAuthenticated,
    isAuthenticating,
    setIsAuthenticated,
    setIsAuthenticating,
  } = context;

  return {
    isAuthenticated,
    isAuthenticating,
    setIsAuthenticated,
    setIsAuthenticating,
  };
};
