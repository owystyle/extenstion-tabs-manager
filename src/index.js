import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { App, configureStore, configureSaga } from "./core";
import { stores, sagas } from "./modules";
import theme from "./theme";
import "./index.css";

const store = configureStore(stores, {});
configureSaga(sagas);

ReactDOM.render(
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </ReduxProvider>,
  document.getElementById("root")
);
