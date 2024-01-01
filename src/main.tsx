import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./css/other/main.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.tsx";
import ScrollToTop from "./utils/ScrollToTop.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <ScrollToTop />
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
);
