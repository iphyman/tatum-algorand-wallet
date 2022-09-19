import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Amplify from "aws-amplify";
import { DateUtils } from "@aws-amplify/core";
import { ThemeProvider } from "contexts/theme";
import { LocaleProvider } from "contexts/localization";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlobalFontStyle, GlobalStyle } from "GlobalStyle";
import { MarketsProvider } from "contexts/markets";
import { AuthenticationProvider } from "contexts/authentication";
import { AmplifyConfig } from "configs";

const CLOCK_OFFSET = 10000;

Amplify.configure(AmplifyConfig);
DateUtils.setClockOffset(CLOCK_OFFSET);

ReactDOM.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <HelmetProvider>
        <MarketsProvider>
          <LocaleProvider>
            <ThemeProvider>
              <BrowserRouter>
                <App />
                <GlobalFontStyle />
                <GlobalStyle />
              </BrowserRouter>
            </ThemeProvider>
          </LocaleProvider>
        </MarketsProvider>
      </HelmetProvider>
    </AuthenticationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
