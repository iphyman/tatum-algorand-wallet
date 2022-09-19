import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "components/Loader";

const Account = lazy(() => import("pages/Account"));
const Login = lazy(() => import("pages/Authentication/Login"));
const Signup = lazy(() => import("pages/Authentication/Signup"));
const Dashboard = lazy(() => import("pages/Account/Dashboard/Dashboard"));
const Prices = lazy(() => import("pages/Account/Prices"));
const NFTS = lazy(() => import("pages/Account/NFTs"));
const Transactions = lazy(() => import("pages/Account/Transactions"));
const ForgotPassword = lazy(
  () => import("pages/Authentication/ForgotPassword")
);
const Wallet = lazy(() => import("pages/Account/Wallet"));
const AddressBook = lazy(() => import("pages/Account/AddressBook"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Account />}>
          <Route index element={<Dashboard />} />
          <Route path="prices" element={<Prices />} />
          <Route path="nfts" element={<NFTS />} />
          <Route path="wallets" element={<Wallet />} />
          <Route path="address-book" element={<AddressBook />} />
          <Route path=":currency/transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
