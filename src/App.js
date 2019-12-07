import React from "react";
import { createGlobalStyle } from "styled-components";
import CurrencyConverter from "./components/CurrencyConverter";

const GlobalStyles = createGlobalStyle`
  * {
  box-sizing: border-box;
  }
`;
function App() {
  return (
    <div className='App'>
      <GlobalStyles />
      <CurrencyConverter />
    </div>
  );
}

export default App;
