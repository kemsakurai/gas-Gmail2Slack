import Utils from './Utils';
import Gmail2Slack from './Gmail2Slack';

export const sendEmail2Slack = (): void => {
  console.info('sendEmail2Slack start');
  let sheet: GoogleAppsScript.Spreadsheet.Sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    Utils.getConfigSheetName()
  );
  let range: GoogleAppsScript.Spreadsheet.Range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5);
  let queries: any[][] = range.getValues();
  for (let elem of queries) {
    // Notes、roomId、feedUrl の設定がなければ、処理の対象外
    if (elem[0] == '' || elem[1] == '' || elem[4] == '') {
      continue;
    }
    let gmail2Slack = new Gmail2Slack(elem[0], elem[1], elem[2], elem[3], elem[4]);
    gmail2Slack.postMessage();
  }
  console.info('sendEmail2Slack end');
};
