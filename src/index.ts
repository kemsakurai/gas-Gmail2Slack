import { initialize } from "./initialize";
import { createSchedule } from "./createSchedule";
import { updateSchedule } from "./updateSchedule";
import { inputWebhookURL } from "./inputWebhookURL";
import { sendEmail2Slack } from "./sendEmail2Slack";

function onOpen() {
  const lang = Session.getActiveUserLocale();
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("gas-Gmail2Slack")
    .addSubMenu(
      ui
        .createMenu(lang === "ja" ? "初期設定" : "Initial setting")
        .addItem(
          lang === "ja" ? "設定シート作成" : "Create config sheets",
          "initialize"
        )
        .addItem(
          lang === "ja" ? "Webhook URL設定" : "Input webhook URL",
          "inputWebhookURL"
        )
    )
    .addSeparator()
    .addItem(
      lang === "ja" ? "Slack にメールを通知する" : "Send email to Slack",
      "sendEmail2Slack"
    )
    .addItem(lang === "ja" ? "スケジュール実行" : "Schedule", "createSchedule")
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
