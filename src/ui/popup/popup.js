import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";

import Intl from "./Intl";
import { Provider } from "react-redux";
import store from "./redux/store";

import Page1 from "@pages/page1";
import Page2 from "@pages/page2";
import "./styles/global.less";

// TODO
// Make sure that icon file will be included in bundle
require("./public/assets/temp-icon.svg");
require("./public/assets/icon/icon-16.png");
require("./public/assets/icon/icon-48.png");
require("./public/assets/icon/icon-128.png");

ReactDOM.render(
  <Provider store={store}>
    <Intl>
      <HashRouter>
        <Route exact path="/" component={Page1} />
        <Route exact path="/page2" component={Page2} />
      </HashRouter>
    </Intl>
  </Provider>,
  document.getElementById("app"),
);
