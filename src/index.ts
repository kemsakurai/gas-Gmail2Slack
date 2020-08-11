import { initialize } from "./functions/initialize";
import { createSchedule } from "./functions/createSchedule";
import { updateSchedule } from "./functions/updateSchedule";
import { inputWebhookURL } from "./functions/inputWebhookURL";
import { sendEmail2Slack } from "./functions/sendEmail2Slack";
import i18next from "./libs/i18n";

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("gas-Gmail2Slack")
    .addSubMenu(
      ui
        .createMenu(i18next.t("initialSetting"))
        .addItem(i18next.t("createConfigSheets"), "initialize")
        .addItem(i18next.t("inputWebhookURL"), "inputWebhookURL")
    )
    .addSeparator()
    .addItem(i18next.t("sendEmailToSlack"), "sendEmail2Slack")
    .addItem(i18next.t("scheduleExecution"), "createSchedule")
    .addToUi();
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;
global.onOpen = onOpen;
global.initialize = initialize;
global.inputWebhookURL = inputWebhookURL;
global.createSchedule = createSchedule;
global.updateSchedule = updateSchedule;
global.sendEmail2Slack = sendEmail2Slack;
global.i18next = i18next;
