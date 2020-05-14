import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { update_state } from "@redux/actions";
import styles from "./style.less";

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      update_state({
        currentLang: "en_US",
      }),
    );
    return () => {
      dispatch(
        update_state({
          currentLang: "zh_CN",
        }),
      );
    };
  }, []);

  const toPage1 = () => {
    chrome.browserAction.setBadgeText({ text: "" });
    chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
    // chrome.browserAction.enable()
    history.push("/");
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>PAGE 222</div>
      <div className={styles.main}>
        <button className={styles.btn} onClick={toPage1}>
          回page1
        </button>
        <br />
        <FormattedMessage id="hello" />
      </div>
      <div className={styles.footer}>footer</div>
    </div>
  );
};
