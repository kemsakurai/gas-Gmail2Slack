import { initialize } from "./functions/initialize";
import { createSchedule } from "./functions/createSchedule";
import { updateSchedule } from "./functions/updateSchedule";
import { inputWebhookURL } from "./functions/inputWebhookURL";
import { sendEmail2Slack } from "./functions/sendEmail2Slack";
import i18n from "./libs/i18n";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;
global.onOpen = onOpen;
global.initialize = initialize;
global.inputWebhookURL = inputWebhookURL;
global.createSchedule = createSchedule;
global.updateSchedule = updateSchedule;
global.sendEmail2Slack = sendEmail2Slack;
global.i18n = i18n;

function onOpen() {
  const lang = Session.getActiveUserLocale();
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("gas-Gmail2Slack")
    .addSubMenu(
      ui
        .createMenu(i18n.t("initialSetting"))
        .addItem(i18n.t("createConfigSheets"), "initialize")
        .addItem(i18n.t("inputWebhookURL"), "inputWebhookURL")
    )
    .addSeparator()
    .addItem(i18n.t("sendEmailToSlack"), "sendEmail2Slack")
    .addItem(i18n.t("scheduleExecution"), "createSchedule")
    .addToUi();
}
