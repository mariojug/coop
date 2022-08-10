import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ElementColors } from "./constants/styles";
import styled from "styled-components";

const GlobalStyle = styled.div`
  @font-face {
    font-family: "Work Sans";
    src: local("./fonts/Work_Sans/WorkSans-VariableFont-wght.tff");
  }
  font-family: "Work Sans";
  background-color: ${ElementColors.BACKGROUND};
  color: ${ElementColors.TEXT_DARK_MODE};
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100vh;
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle>
      <App />
    </GlobalStyle>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
