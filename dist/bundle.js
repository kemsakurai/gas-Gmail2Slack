function onOpen() {
}
function initialize() {
}
function inputWebhookURL() {
}
function createSchedule() {
}
function updateSchedule() {
}
function sendEmail2Slack() {
}/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/Gmail2Slack.ts":
/*!****************************!*\
  !*** ./src/Gmail2Slack.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Gmail2Slack; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");

class Gmail2Slack {
    /**
     * constructor
     * @param note
     * @param channel
     * @param sendTo
     * @param messageBodylength
     * @param query
     */
    constructor(note, channel, sendTo, messageBodylength, query) {
        this.note = note;
        this.channel = channel;
        this.sendTo = sendTo;
        this.messageBodylength = messageBodylength;
        this.query = query;
        this.url = _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].getWebhookURL();
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkNotEmpty(this.url, "Webhook URL が 未設定です。Webhook URL を設定してください。");
    }
    /**
     * getMailSummaryOrBlank
     * @param feedItem
     */
    getMailSummaryOrBlank(mailBody) {
        let summary;
        if (this.messageBodylength <= -1) {
            summary = mailBody;
        }
        else if (this.messageBodylength == 0) {
            summary = "";
        }
        else {
            summary =
                mailBody === "" ? "" : _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].truncate(mailBody, this.messageBodylength);
        }
        return summary;
    }
    /**
     * createSendTo
     * @param sendToString
     */
    createSendTo(sendToString) {
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
    postMessage() {
        const threads = GmailApp.search(this.query, 0, 50);
        const msgs = GmailApp.getMessagesForThreads(threads);
        //各スレッド×メール
        for (let i = msgs.length - 1; i >= 0; i--) {
            const msgsInThread = msgs[i];
            for (let j = 0; j < msgsInThread.length; j++) {
                const msg = msgsInThread[j];
                const dateString = Utilities.formatDate(msg.getDate(), "JST", "yyyy-MM-dd HH:mm:ss");
                const mailUrl = "https://mail.google.com/mail/u/0/?shva=1#inbox/" + msg.getId();
                const payload = {
                    channel: this.channel,
                    attachments: [
                        {
                            fallback: "メールを受信しました。（" + mailUrl + "）",
                            pretext: this.createSendTo(this.sendTo) + " メールを受信しました。",
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
                const options = {
                    method: "post",
                    contentType: "application/json",
                    payload: JSON.stringify(payload)
                };
                try {
                    _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].fetchAsJson(this.url, options);
                }
                catch (e) {
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


/***/ }),

/***/ "./src/Utils.ts":
/*!**********************!*\
  !*** ./src/Utils.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Utils; });
class Utils {
    static fetchAsJson(url, requestOptions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) {
        const response = UrlFetchApp.fetch(url, requestOptions);
        return JSON.parse(response.getContentText());
    }
    /**
     * truncate
     * @param value
     * @param length
     */
    static truncate(value, length) {
        if (value.length <= length) {
            return value;
        }
        return value.substring(0, length) + "...";
    }
    /**
     * setWebhookURL
     * @param token
     */
    static setWebhookURL(token) {
        PropertiesService.getScriptProperties().setProperty("SLACK_WEBHOOK_URL", token);
    }
    /**
     * getWebhookURL
     */
    static getWebhookURL() {
        return PropertiesService.getScriptProperties().getProperty("SLACK_WEBHOOK_URL");
    }
    /**
     * checkNotEmpty
     */
    static checkNotEmpty(value, message) {
        if (typeof value === "undefined" || value == "") {
            throw new Error(message);
        }
    }
    /**
     * getConfigSheetName
     */
    static getConfigSheetName() {
        return "Config";
    }
}


/***/ }),

/***/ "./src/createSchedule.ts":
/*!*******************************!*\
  !*** ./src/createSchedule.ts ***!
  \*******************************/
/*! exports provided: createSchedule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSchedule", function() { return createSchedule; });
const createSchedule = () => {
    const htmlOutput = HtmlService.createHtmlOutputFromFile("index")
        .setWidth(600)
        .setHeight(100);
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Create schedule");
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _initialize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initialize */ "./src/initialize.ts");
/* harmony import */ var _createSchedule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSchedule */ "./src/createSchedule.ts");
/* harmony import */ var _updateSchedule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateSchedule */ "./src/updateSchedule.ts");
/* harmony import */ var _inputWebhookURL__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inputWebhookURL */ "./src/inputWebhookURL.ts");
/* harmony import */ var _sendEmail2Slack__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sendEmail2Slack */ "./src/sendEmail2Slack.ts");





function onOpen() {
    const lang = Session.getActiveUserLocale();
    const ui = SpreadsheetApp.getUi();
    ui.createMenu("gas-Gmail2Slack")
        .addSubMenu(ui
        .createMenu(lang === "ja" ? "初期設定" : "Initial setting")
        .addItem(lang === "ja" ? "設定シート作成" : "Create config sheets", "initialize")
        .addItem(lang === "ja" ? "Webhook URL設定" : "Input webhook URL", "inputWebhookURL"))
        .addSeparator()
        .addItem(lang === "ja" ? "Slack にメールを通知する" : "Send email to Slack", "sendEmail2Slack")
        .addItem(lang === "ja" ? "スケジュール実行" : "Schedule", "createSchedule")
        .addToUi();
}
global.onOpen = onOpen;
global.initialize = _initialize__WEBPACK_IMPORTED_MODULE_0__["initialize"];
global.inputWebhookURL = _inputWebhookURL__WEBPACK_IMPORTED_MODULE_3__["inputWebhookURL"];
global.createSchedule = _createSchedule__WEBPACK_IMPORTED_MODULE_1__["createSchedule"];
global.updateSchedule = _updateSchedule__WEBPACK_IMPORTED_MODULE_2__["updateSchedule"];
global.sendEmail2Slack = _sendEmail2Slack__WEBPACK_IMPORTED_MODULE_4__["sendEmail2Slack"];

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/initialize.ts":
/*!***************************!*\
  !*** ./src/initialize.ts ***!
  \***************************/
/*! exports provided: initialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");

const initialize = () => {
    console.info("initialize start");
    const configSheetName = _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].getConfigSheetName();
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(configSheetName);
    if (!sheet) {
        sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
        sheet.setName(configSheetName);
        const range = sheet.getRange("A1:E1");
        range.setBackground("yellow");
        const headers = [];
        headers.push("Notes");
        headers.push("Channel");
        headers.push("SendTo");
        headers.push("Message body length");
        headers.push("Query");
        range.setValues([headers]);
    }
    console.info("initialize end");
};


/***/ }),

/***/ "./src/inputWebhookURL.ts":
/*!********************************!*\
  !*** ./src/inputWebhookURL.ts ***!
  \********************************/
/*! exports provided: inputWebhookURL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inputWebhookURL", function() { return inputWebhookURL; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");

const inputWebhookURL = () => {
    const ui = SpreadsheetApp.getUi();
    const response = ui.prompt("Slack の Webhook URL を入力してください。");
    const url = response.getResponseText();
    // getSelectedButtonでクリックされたボタンの情報を取得できる。入力値なしか×ボタンをクリックされたかの確認をしている
    if (url == "" || response.getSelectedButton() == ui.Button.CLOSE) {
        return;
    }
    _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].setWebhookURL(url);
    ui.alert("入力した値を Slack の Webhook URL として設定しました。");
};


/***/ }),

/***/ "./src/sendEmail2Slack.ts":
/*!********************************!*\
  !*** ./src/sendEmail2Slack.ts ***!
  \********************************/
/*! exports provided: sendEmail2Slack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendEmail2Slack", function() { return sendEmail2Slack; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");
/* harmony import */ var _Gmail2Slack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gmail2Slack */ "./src/Gmail2Slack.ts");


const sendEmail2Slack = () => {
    console.info("sendEmail2Slack start");
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].getConfigSheetName());
    const range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queries = range.getValues();
    for (const elem of queries) {
        if (elem[0] == "" || elem[1] == "" || elem[4] == "") {
            continue;
        }
        const gmail2Slack = new _Gmail2Slack__WEBPACK_IMPORTED_MODULE_1__["default"](elem[0], elem[1], elem[2], elem[3], elem[4]);
        gmail2Slack.postMessage();
    }
    console.info("sendEmail2Slack end");
};


/***/ }),

/***/ "./src/updateSchedule.ts":
/*!*******************************!*\
  !*** ./src/updateSchedule.ts ***!
  \*******************************/
/*! exports provided: updateSchedule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSchedule", function() { return updateSchedule; });
const KEY = "trigger";
const FUNCTION_NAME = "sendEmail2Slack";
const weekDay = [
    ScriptApp.WeekDay.MONDAY,
    ScriptApp.WeekDay.TUESDAY,
    ScriptApp.WeekDay.WEDNESDAY,
    ScriptApp.WeekDay.THURSDAY,
    ScriptApp.WeekDay.FRIDAY,
    ScriptApp.WeekDay.SATURDAY,
    ScriptApp.WeekDay.SUNDAY
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
const updateSchedule = (formData) => {
    const data = toJson_(formData);
    Logger.log(data);
    if (data != null) {
        if (data.automate == 0) {
            deleteTrigger_();
        }
        else if (data.automate == 1) {
            if (data.interval == 0) {
                deleteTrigger_();
                const triggerId = ScriptApp.newTrigger(FUNCTION_NAME)
                    .timeBased()
                    .everyMinutes(data.minitueOfHour)
                    .create()
                    .getUniqueId();
                setTrigger_(triggerId);
            }
            else if (data.interval == 1) {
                deleteTrigger_();
                const triggerId = ScriptApp.newTrigger(FUNCTION_NAME)
                    .timeBased()
                    .everyHours(1)
                    .create()
                    .getUniqueId();
                setTrigger_(triggerId);
            }
            else if (data.interval == 2) {
                deleteTrigger_();
                const triggerId = ScriptApp.newTrigger(FUNCTION_NAME)
                    .timeBased()
                    .atHour(data.hourOfDay)
                    .everyDays(1)
                    .inTimezone(Session.getTimeZone())
                    .create()
                    .getUniqueId();
                setTrigger_(triggerId);
            }
            else if (data.interval == 3) {
                deleteTrigger_();
                const triggerId = ScriptApp.newTrigger(FUNCTION_NAME)
                    .timeBased()
                    .onWeekDay(weekDay[data.dayOfWeek])
                    .atHour(data.hourOfDay)
                    .nearMinute(30)
                    .create()
                    .getUniqueId();
                setTrigger_(triggerId);
            }
            else if (data.interval == 4) {
                deleteTrigger_();
                const triggerId = ScriptApp.newTrigger(FUNCTION_NAME)
                    .timeBased()
                    .onMonthDay(data.dayOfMonth)
                    .atHour(data.hourOfDay)
                    .nearMinute(30)
                    .create()
                    .getUniqueId();
                setTrigger_(triggerId);
            }
            else {
                throw new Error("Illegal Argments...");
            }
        }
    }
};
//serializeArrayをjsonに変換する
function toJson_(formData) {
    const result = {};
    let automateValue = 0;
    formData.forEach(function (elem) {
        if (elem["name"] == "automate" && elem["value"] == 1) {
            automateValue = 1;
        }
        result[elem.name] = elem.value;
    });
    result["automate"] = automateValue;
    const data = {
        automate: result["automate"],
        interval: result["interval"],
        hourOfDay: result["hourOfDay"],
        dayOfWeek: result["dayOfWeek"],
        dayOfMonth: result["dayOfMonth"],
        minitueOfHour: result["minitueOfHour"]
    };
    return data;
}
//指定したkeyに保存されているトリガーIDを使って、トリガーを削除する
function deleteTrigger_() {
    const triggerId = PropertiesService.getScriptProperties().getProperty(KEY);
    if (!triggerId)
        return;
    ScriptApp.getProjectTriggers()
        .filter(function (trigger) {
        return trigger.getUniqueId() == triggerId;
    })
        .forEach(function (trigger) {
        ScriptApp.deleteTrigger(trigger);
    });
    PropertiesService.getScriptProperties().deleteProperty(KEY);
}
//トリガーを発行
function setTrigger_(triggerId) {
    //あとでトリガーを削除するためにトリガーIDを保存しておく
    PropertiesService.getScriptProperties().setProperty(KEY, triggerId);
}


/***/ })

/******/ });