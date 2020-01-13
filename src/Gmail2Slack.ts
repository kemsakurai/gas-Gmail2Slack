import Utils from './Utils';

export default class Gmail2Slack {
  note: string;
  roomId: string;
  sendTo: string;
  token: string;
  messageBodylength: number;
  query: string;

  /**
   * constructor
   * @param note
   * @param roomId
   * @param sendTo
   * @param messageBodylength
   * @param query
   */
  constructor(
    note: string,
    roomId: string,
    sendTo: string,
    messageBodylength: number,
    query: string
  ) {
    this.note = note;
    this.roomId = roomId;
    this.sendTo = sendTo;
    this.messageBodylength = messageBodylength;
    this.query = query;
    this.token = Utils.getChatworkToken();
    Utils.checkNotEmpty(this.token, 'token が 未設定です。token を設定してください。');
  }

  /**
   * getMailSummaryOrBlank
   * @param feedItem
   */
  private getMailSummaryOrBlank(mailBody: string): string {
    let summary;
    if (this.messageBodylength <= -1) {
      summary = mailBody;
    } else if (this.messageBodylength == 0) {
      summary = '';
    } else {
      summary = mailBody === '' ? '' : Utils.truncate(mailBody, this.messageBodylength);
    }
    return summary === '' ? '' : '[hr]' + summary;
  }
  /**
   * createSendTo
   * @param sendToString
   */
  private createSendTo(sendToString: string): string {
    let sendTo = sendToString === '' ? 'All' : sendToString;
    // 送信IDが1つの場合は、数値型なので文字列へ変換する。
    sendTo = String(sendTo);
    let sendToArray = sendTo.split(',');
    let result = '';
    for (let elem of sendToArray) {
      result += '[To:' + elem + ']' + '\n';
    }
    return result;
  }

  /**
   * postMessage
   * @param feeds
   */
  public postMessage(): void {
    let threads = GmailApp.search(this.query, 0, 50);
    let msgs = GmailApp.getMessagesForThreads(threads);
    //各スレッド×メール
    for (var i = msgs.length - 1; i >= 0; i--) {
      let msgsInThread = msgs[i];
      for (let j = 0; j < msgsInThread.length; j++) {
        let msg = msgsInThread[j];
        let dateString: string = Utilities.formatDate(msg.getDate(), 'JST', 'yyyy-MM-dd HH:mm:ss');

        let message =
          this.createSendTo(this.sendTo) +
          '[info][title]' +
          msg.getSubject() +
          '\n[' +
          dateString +
          '][/title]' +
          'https://mail.google.com/mail/u/0/?shva=1#inbox/' +
          msg.getId() +
          this.getMailSummaryOrBlank(msg.getPlainBody()) +
          '[hr]' +
          this.note +
          '[/info]';

        if (message == '') {
          continue;
        }

        let payload = {
          body: message,
          self_unread: '1'
        };
        const options: Object = {
          method: 'post',
          headers: { 'X-ChatWorkToken': this.token },
          payload: payload
        };
        try {
          Utils.fetchAsJson(
            'https://api.chatwork.com/v2/rooms/' + this.roomId + '/messages',
            options
          );
        } catch (e) {
          if (e.errors == 'Rate limit exceeded') {
            throw e.errors;
          }
        }
        //メールを既読にする
        msg.markRead();
      }
    }
    return;
  }
}
