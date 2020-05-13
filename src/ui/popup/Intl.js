import React from "react";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import zh_CN from "./locales/zh-CN";
import en_US from "./locales/en-US";

const Intl = (props) => {
  const { children, currentLang } = props;

  const language = currentLang === "en_US" ? "en" : "zh";
  let messages = {};
  messages["en"] = en_US;
  messages["zh"] = zh_CN;

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      {children}
    </IntlProvider>
  );
};

const mapStateToProps = (state) => ({
  currentLang: state.common.currentLang,
});

export default connect(mapStateToProps)(Intl);
