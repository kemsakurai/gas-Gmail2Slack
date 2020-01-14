import { initialize } from './initialize';
import { createSchedule } from './createSchedule';
import { updateSchedule } from './updateSchedule';
import { inputWebhookURL } from './inputWebhookURL';
import { sendEmail2Slack } from './sendEmail2Slack';

function onOpen() {
  var lang = Session.getActiveUserLocale();
  let ui = SpreadsheetApp.getUi();
  ui.createMenu('gas-Gmail2Slack')
    .addSubMenu(
      ui
        .createMenu(lang === 'ja' ? '初期設定' : 'Initial setting')
        .addItem(lang === 'ja' ? '設定シート作成' : 'Create config sheets', 'initialize')
        .addItem(lang === 'ja' ? 'Webhook URL設定' : 'Input webhook URL', 'inputWebhookURL')
    )
    .addSeparator()
    .addItem(lang === 'ja' ? 'Slack にメールを通知する' : 'Send email to Slack', 'sendEmail2Slack')
    .addItem(lang === 'ja' ? 'スケジュール実行' : 'Schedule', 'createSchedule')
    .addToUi();
}

declare let global: any;
global.onOpen = onOpen;
global.initialize = initialize;
global.inputWebhookURL = inputWebhookURL;
global.createSchedule = createSchedule;
global.updateSchedule = updateSchedule;
global.sendEmail2Slack = sendEmail2Slack;
