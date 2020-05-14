import React from "react";
import { useSelector } from "react-redux";
import { IntlProvider } from "react-intl";
import zh_CN from "./locales/zh-CN";
import en_US from "./locales/en-US";

export default (props) => {
  const { children } = props;
  const currentLang = useSelector((state) => state.common.currentLang);

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
