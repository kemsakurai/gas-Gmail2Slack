import i18next from "i18next";
import * as enLocalesTrJson from "../locales/en/translation.json";
import * as jaLocalesTrJson from "../locales/ja/translation.json";

const lang = Session.getActiveUserLocale();
i18next.init(
  {
    lng: lang,
    fallbackLng: "ja",
    debug: true,
    resources: {
      en: {
        translation: enLocalesTrJson
      },
      ja: {
        translation: jaLocalesTrJson
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function(err, t) {
    console.info("i18n init end.");
  }
);
export default i18next;
