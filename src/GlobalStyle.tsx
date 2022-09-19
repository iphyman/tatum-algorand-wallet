import { createGlobalStyle } from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import "tippy.js/dist/tippy.css";

export const GlobalFontStyle = () => {
  return (
    <Helmet>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
};

export const GlobalStyle = createGlobalStyle`

.nft-grid > div {
  position: relative;
  margin: auto;
}

.tippy-box .tippy-content {
  padding: 0rem;
}

.tippy-box {
  background-color: ${({ theme }) => theme.bg100};
  color: ${({ theme }) => theme.text200};
  border-radius: 0.75rem;
}

.tippy-box[data-placement^='top'] > .tippy-arrow::before {
  border-top-color: ${({ theme }) => theme.bg100};
}
.tippy-box[data-placement^='bottom'] > .tippy-arrow::before {
  border-bottom-color: ${({ theme }) => theme.bg100};
}
.tippy-box[data-placement^='left'] > .tippy-arrow::before {
  border-left-color: ${({ theme }) => theme.bg100};
}
.tippy-box[data-placement^='right'] > .tippy-arrow::before {
  border-right-color: ${({ theme }) => theme.bg100};
}

.tippy-box > .tippy-svg-arrow {
  fill: ${({ theme }) => theme.bg100};
}

*, *::before, *::after{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

* {
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar {
    width: 4px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
}

body {
  overflow-x: hidden;
}

html {
  min-height: 100vh;
  color: ${({ theme }) => theme.text200};
  background-color: ${({ theme }) => theme.bg200};
  display: flex;
  flex-direction: column;
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  ::-webkit-scrollbar {
    width: 5px;
    background: #636975;
}
}

`;
