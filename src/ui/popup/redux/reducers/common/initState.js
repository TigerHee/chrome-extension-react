import { getFirstBrowserLanguage } from "@utils/helper";
const DEFAULTLANG = "en_US";
const LANGSPARAM = [
  {
    key: "en_US",
    label: "EN",
  },
  {
    key: "zh_CN",
    label: "中文",
  },
];
const LANGSKEYS = LANGSPARAM.map((item) => item.key);

const INITLANG = (() => {
  let browserLang = getFirstBrowserLanguage();
  if (browserLang) {
    browserLang = browserLang.replace("-", "_");
  }
  if (LANGSKEYS.includes(browserLang)) {
    return browserLang;
  }
  return DEFAULTLANG;
})();

const initState = {
  currentLang: INITLANG,
};

export default initState;
