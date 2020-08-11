import Utils from "../libs/Utils";
import i18n from "../libs/i18n";

export const inputWebhookURL = (): void => {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt(i18n.t("showWebhookURL"));
  const url = response.getResponseText();
  if (url == "" || response.getSelectedButton() == ui.Button.CLOSE) {
    return;
  }
  Utils.setWebhookURL(url);
  ui.alert(i18n.t("noticeSetWebhookURL"));
};
