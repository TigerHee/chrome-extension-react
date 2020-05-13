import React from "react";
import { useHistory } from "react-router";
import styles from "./style.less";

export default (props) => {

  const history = useHistory();
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
      </div>
      <div className={styles.footer}>footer</div>
    </div>
  );
};
