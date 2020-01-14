import Utils from './Utils';
export const inputWebhookURL = (): void => {
  let ui = SpreadsheetApp.getUi();
  let response = ui.prompt('Slack の Webhook URL を入力してください。');
  let url = response.getResponseText();
  // getSelectedButtonでクリックされたボタンの情報を取得できる。入力値なしか×ボタンをクリックされたかの確認をしている
  if (url == '' || response.getSelectedButton() == ui.Button.CLOSE) {
    return;
  }
  Utils.setWebhookURL(url);
  ui.alert('入力した値を Slack の Webhook URL として設定しました。');
};
