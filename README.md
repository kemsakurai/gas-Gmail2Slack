# gas-gmail2slack

Gmail の 検索クエリに合致するメールを Slack に通知し、通知したメールを既読にする Google Apps Script。     
検索クエリ、通知先のルーム情報、送信者のアカウントは スプレッドシートから読み込みます。    

---------
## Google Apps Script から、Slack へメッセージを送信するための前準備          

Incoming Webhooks を使って、Slack へメッセージを送信するための、エンドポイントを作成できます。       
これを使って、Google Apps Script から、Slack へメッセージを送信します。    

---------
## 参考     

* [SlackのIncoming Webhooksを使い倒す - Qiita](https://qiita.com/ik-fib/items/b4a502d173a22b3947a0)

