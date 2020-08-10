import Utils from "./libs/Utils";

export default class Gmail2Slack {
  note: string;
  channel: string;
  sendTo: string;
  url: string;
  messageBodylength: number;
  query: string;

  /**
   * constructor
   * @param note
   * @param channel
   * @param sendTo
   * @param messageBodylength
   * @param query
   */
  constructor(
    note: string,
    channel: string,
    sendTo: string,
    messageBodylength: number,
    query: string
  ) {
    this.note = note;
    this.channel = channel;
    this.sendTo = sendTo;
    this.messageBodylength = messageBodylength;
    this.query = query;
    this.url = Utils.getWebhookURL();
    Utils.checkNotEmpty(
      this.url,
      "Webhook URL が 未設定です。Webhook URL を設定してください。"
    );
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
      summary = "";
    } else {
      summary =
        mailBody === "" ? "" : Utils.truncate(mailBody, this.messageBodylength);
    }
    return summary;
  }

  /**
   * createSendTo
   * @param sendToString
   */
  private createSendTo(sendToString: string): string {
    let sendTo = sendToString === "" ? "@channel" : sendToString;
    // 送信IDが1つの場合は、数値型なので文字列へ変換する。
    sendTo = String(sendTo);
    const sendToArray = sendTo.split(",");
    let result = "";
    for (let elem of sendToArray) {
      if (elem.indexOf("@") != 0) {
        elem = "@" + elem;
      }

      if (elem == "@here" || elem == "@channel" || elem == "@everyone") {
        elem = elem.replace("@", "!");
      }
      result += "<" + elem + ">" + " ";
    }
    return result;
  }

  /**
   * postMessage
   * @param feeds
   */
  public postMessage(): void {
    const threads = GmailApp.search(this.query, 0, 50);
    const msgs = GmailApp.getMessagesForThreads(threads);
    //各スレッド×メール
    for (let i = msgs.length - 1; i >= 0; i--) {
      const msgsInThread = msgs[i];
      for (let j = 0; j < msgsInThread.length; j++) {
        const msg = msgsInThread[j];
        const dateString: string = Utilities.formatDate(
          msg.getDate(),
          "JST",
          "yyyy-MM-dd HH:mm:ss"
        );
        const mailUrl =
          "https://mail.google.com/mail/u/0/?shva=1#inbox/" + msg.getId();
        const payload = {
          channel: this.channel,
          attachments: [
            {
              fallback: "メールを受信しました。（" + mailUrl + "）",
              pretext:
                this.createSendTo(this.sendTo) + " メールを受信しました。",
              title: msg.getSubject(),
              title_link: mailUrl,
              text: this.getMailSummaryOrBlank(msg.getPlainBody()),
              fields: [
                {
                  title: "受信時刻",
                  value: dateString,
                  short: true
                },
                {
                  title: "タグ",
                  value: this.note,
                  short: true
                }
              ]
            }
          ]
        };
        const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
          method: "post",
          contentType: "application/json",
          payload: JSON.stringify(payload)
        };

        try {
          Utils.fetchAsJson(this.url, options);
        } catch (e) {
          if (e.errors == "Rate limit exceeded") {
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
