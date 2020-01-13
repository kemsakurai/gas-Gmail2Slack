import { initialize } from './initialize';
import { createSchedule } from './createSchedule';
import { updateSchedule } from './updateSchedule';
import { inputToken } from './inputToken';
import { sendEmail2Slack } from './sendEmail2Slack';
import { getRooms } from './getRooms';

function onOpen() {
  var lang = Session.getActiveUserLocale();
  let ui = SpreadsheetApp.getUi();
  ui.createMenu('gas-Gmail2Slack')
    .addSubMenu(
      ui
        .createMenu(lang === 'ja' ? '初期設定' : 'Initial setting')
        .addItem(lang === 'ja' ? '設定シート作成' : 'Create config sheets', 'initialize')
        .addItem(lang === 'ja' ? 'Token設定' : 'Input token', 'inputToken')
    )
    .addSeparator()
    .addItem(
      lang === 'ja' ? 'Slack にメールを通知する' : 'Send email to Slack',
      'sendEmail2Slack'
    )
    .addItem(lang === 'ja' ? 'スケジュール実行' : 'Schedule', 'createSchedule')
    .addToUi();
}

declare let global: any;
global.onOpen = onOpen;
global.initialize = initialize;
global.inputToken = inputToken;
global.getRooms = getRooms;
global.createSchedule = createSchedule;
global.updateSchedule = updateSchedule;
global.sendEmail2Chatwork = sendEmail2Slack;
