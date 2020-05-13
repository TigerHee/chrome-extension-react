import React from "react";
import { useHistory } from "react-router";
import styles from "./style.less";
import { FormattedMessage, injectIntl } from "react-intl";
import { getFirstBrowserLanguage } from "@utils/helper";
import { useFetch } from "@hooks/useFetch";

let Page1 = (props) => {
  const history = useHistory();

  const toPage2 = () => {
    chrome.browserAction.setBadgeText({ text: "new" });
    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
    // chrome.browserAction.disable()
    history.push("/page2");
    // 在新的页面打开
    // chrome.tabs.create({
    //   url: "/popup.html#/page2"
    // });
  };

  console.log("getFirstBrowserLanguage === ", getFirstBrowserLanguage());

  const fetch = useFetch("https://blog.kuchain.io/wp-json/wp/v2/posts?page=1&per_page=10&tags=9", "get");
  console.log("fetch 结果 === ", fetch);
  const listData = fetch.data || [];

  return (
    <div className={styles.page}>
      <div className={styles.header}>PAGE111</div>
      <div className={styles.main}>
        main
        <br />
        <button onClick={toPage2}>to page2</button>
        <br />
        <FormattedMessage id="hello" />
        <div>
          {listData.map((item) => (
            <div key={item.id}>{item.title.rendered}</div>
          ))}
        </div>
      </div>
      <div className={styles.footer}>footer</div>
    </div>
  );
};
Page1 = injectIntl(Page1);
export default Page1;
