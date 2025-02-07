import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import CurrencyConverter from "./components/CurrencyConverter";

const GlobalStyles = createGlobalStyle`
  * {
  box-sizing: border-box;

  }
  body {
    height: 100vh;
    background-color: white;
  }

`;

const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
  padding-top: 2%;
`;

const App = () => {
  return (
    <AppWrapper>
      <GlobalStyles />
      <CurrencyConverter />
    </AppWrapper>
  );
};

export default App;
