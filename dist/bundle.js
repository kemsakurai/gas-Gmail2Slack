function onOpen() {
}
function initialize() {
}
function inputToken() {
}
function getRooms() {
}
function createSchedule() {
}
function updateSchedule() {
}
function sendEmail2Chatwork() {
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

/***/ "./src/Gmail2Chatwork.ts":
/*!*******************************!*\
  !*** ./src/Gmail2Chatwork.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");

var Gmail2Chatwork = /** @class */ (function () {
    /**
     * constructor
     * @param note
     * @param roomId
     * @param sendTo
     * @param messageBodylength
     * @param query
     */
    function Gmail2Chatwork(note, roomId, sendTo, messageBodylength, query) {
        this.note = note;
        this.roomId = roomId;
        this.sendTo = sendTo;
        this.messageBodylength = messageBodylength;
        this.query = query;
        this.token = _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].getChatworkToken();
        _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkNotEmpty(this.token, 'token が 未設定です。token を設定してください。');
    }
    /**
     * getMailSummaryOrBlank
     * @param feedItem
     */
    Gmail2Chatwork.prototype.getMailSummaryOrBlank = function (mailBody) {
        var summary;
        if (this.messageBodylength <= -1) {
            summary = mailBody;
        }
        else if (this.messageBodylength == 0) {
            summary = '';
        }
        else {
            summary = mailBody === '' ? '' : _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].truncate(mailBody, this.messageBodylength);
        }
        return summary === '' ? '' : '[hr]' + summary;
    };
    /**
     * createSendTo
     * @param sendToString
     */
    Gmail2Chatwork.prototype.createSendTo = function (sendToString) {
        var sendTo = sendToString === '' ? 'All' : sendToString;
        // 送信IDが1つの場合は、数値型なので文字列へ変換する。
        sendTo = String(sendTo);
        var sendToArray = sendTo.split(',');
        var result = '';
        for (var _i = 0, sendToArray_1 = sendToArray; _i < sendToArray_1.length; _i++) {
            var elem = sendToArray_1[_i];
            result += '[To:' + elem + ']' + '\n';
        }
        return result;
    };
    /**
     * postMessage
     * @param feeds
     */
    Gmail2Chatwork.prototype.postMessage = function () {
        var threads = GmailApp.search(this.query, 0, 50);
        var msgs = GmailApp.getMessagesForThreads(threads);
        //各スレッド×メール
        for (var i = msgs.length - 1; i >= 0; i--) {
            var msgsInThread = msgs[i];
            for (var j = 0; j < msgsInThread.length; j++) {
                var msg = msgsInThread[j];
                var dateString = Utilities.formatDate(msg.getDate(), 'JST', 'yyyy-MM-dd HH:mm:ss');
                var message = this.createSendTo(this.sendTo) +
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
                var payload = {
                    body: message,
                    self_unread: '1'
                };
                var options = {
                    method: 'post',
                    headers: { 'X-ChatWorkToken': this.token },
                    payload: payload
                };
                try {
                    _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].fetchAsJson('https://api.chatwork.com/v2/rooms/' + this.roomId + '/messages', options);
                }
                catch (e) {
                    if (e.errors == 'Rate limit exceeded') {
                        throw e.errors;
                    }
                }
                //メールを既読にする
                msg.markRead();
            }
        }
        return;
    };
    return Gmail2Chatwork;
}());
/* harmony default export */ __webpack_exports__["default"] = (Gmail2Chatwork);


/***/ }),

/***/ "./src/Utils.ts":
/*!**********************!*\
  !*** ./src/Utils.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.fetchAsJson = function (url, requestOptions) {
        var response = UrlFetchApp.fetch(url, requestOptions);
        return JSON.parse(response.getContentText());
    };
    /**
     * truncate
     * @param value
     * @param length
     */
    Utils.truncate = function (value, length) {
        if (value.length <= length) {
            return value;
        }
        return value.substring(0, length) + '...';
    };
    /**
     * setChatworkToken
     * @param token
     */
    Utils.setChatworkToken = function (token) {
        PropertiesService.getScriptProperties().setProperty('CHATWORK_TOKEN', token);
    };
    /**
     * getChatworkToken
     */
    Utils.getChatworkToken = function () {
        return PropertiesService.getScriptProperties().getProperty('CHATWORK_TOKEN');
    };
    /**
     * checkNotEmpty
     */
    Utils.checkNotEmpty = function (value, message) {
        if (typeof value === 'undefined' || value == '') {
            throw new Error(message);
        }
    };
    /**
     * getConfigSheetName
     */
    Utils.getConfigSheetName = function () {
        return 'Config';
    };
    /**
     * getRoomSheetName
     */
    Utils.getRoomSheetName = function () {
        return 'Room';
    };
    return Utils;
}());
/* harmony default export */ __webpack_exports__["default"] = (Utils);


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
var createSchedule = function () {
    var htmlOutput = HtmlService.createHtmlOutputFromFile('index')
        .setWidth(600)
        .setHeight(100);
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Create schedule');
};


/***/ }),

/***/ "./src/getRooms.ts":
/*!*************************!*\
  !*** ./src/getRooms.ts ***!
  \*************************/
/*! exports provided: getRooms */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRooms", function() { return getRooms; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");

var getRooms = function () {
    console.info('getRooms start');
    var token = _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].getChatworkToken();
    _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkNotEmpty(token, 'token が 未設定です。token を設定してください。');
    var options = {
        method: 'get',
        headers: { 'X-ChatWorkToken': token }
    };
    var response = _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].fetchAsJson('https://api.chatwork.com/v2/rooms', options);
    var values = new Array();
    for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
        var room = response_1[_i];
        var row = new Array();
        row.push(room['name']);
        row.push(room['room_id']);
        values.push(row);
    }
    var roomSheetName = _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].getRoomSheetName();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(roomSheetName);
    // sheet clear
    var range = sheet.getRange(2, 1, sheet.getLastRow(), 2);
    range.clear();
    // set values
    range = sheet.getRange(2, 1, values.length, 2);
    range.setValues(values);
    console.info('getRooms end');
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
/* harmony import */ var _inputToken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inputToken */ "./src/inputToken.ts");
/* harmony import */ var _sendEmail2Chatwork__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sendEmail2Chatwork */ "./src/sendEmail2Chatwork.ts");
/* harmony import */ var _getRooms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getRooms */ "./src/getRooms.ts");






function onOpen() {
    var lang = Session.getActiveUserLocale();
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('gas-Gmail2Chatwork')
        .addSubMenu(ui
        .createMenu(lang === 'ja' ? '初期設定' : 'Initial setting')
        .addItem(lang === 'ja' ? '設定シート作成' : 'Create config sheets', 'initialize')
        .addItem(lang === 'ja' ? 'Token設定' : 'Input token', 'inputToken')
        .addItem(lang === 'ja' ? 'ルーム一覧を取得' : 'Get rooms', 'getRooms'))
        .addSeparator()
        .addItem(lang === 'ja' ? 'Chatwork にメールを通知する' : 'Send email to Chatwork', 'sendEmail2Chatwork')
        .addItem(lang === 'ja' ? 'スケジュール実行' : 'Schedule', 'createSchedule')
        .addToUi();
}
global.onOpen = onOpen;
global.initialize = _initialize__WEBPACK_IMPORTED_MODULE_0__["initialize"];
global.inputToken = _inputToken__WEBPACK_IMPORTED_MODULE_3__["inputToken"];
global.getRooms = _getRooms__WEBPACK_IMPORTED_MODULE_5__["getRooms"];
global.createSchedule = _createSchedule__WEBPACK_IMPORTED_MODULE_1__["createSchedule"];
global.updateSchedule = _updateSchedule__WEBPACK_IMPORTED_MODULE_2__["updateSchedule"];
global.sendEmail2Chatwork = _sendEmail2Chatwork__WEBPACK_IMPORTED_MODULE_4__["sendEmail2Chatwork"];

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

var initialize = function () {
    console.info('initialize start');
    var configSheetName = _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].getConfigSheetName();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(configSheetName);
    if (!sheet) {
        sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
        sheet.setName(configSheetName);
        var range = sheet.getRange('A1:E1');
        range.setBackground('yellow');
        var headers = new Array();
        headers.push('Notes');
        headers.push('RoomId');
        headers.push('SendTo');
        headers.push('Message body length');
        headers.push('Query');
        range.setValues([headers]);
    }
    var roomSheetName = _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].getRoomSheetName();
    sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(roomSheetName);
    if (!sheet) {
        sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
        sheet.setName(roomSheetName);
        var range = sheet.getRange('A1:B1');
        range.setBackground('yellow');
        var headers = new Array();
        headers.push('Name');
        headers.push('RoomId');
        range.setValues([headers]);
    }
    console.info('initialize end');
};


/***/ }),

/***/ "./src/inputToken.ts":
/*!***************************!*\
  !*** ./src/inputToken.ts ***!
  \***************************/
/*! exports provided: inputToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inputToken", function() { return inputToken; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");

var inputToken = function () {
    var ui = SpreadsheetApp.getUi();
    var response = ui.prompt('ChatWork の API Token を入力してください。');
    var token = response.getResponseText();
    // getSelectedButtonでクリックされたボタンの情報を取得できる。入力値なしか×ボタンをクリックされたかの確認をしている
    if (token == '' || response.getSelectedButton() == ui.Button.CLOSE) {
        return;
    }
    _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].setChatworkToken(token);
    ui.alert('入力した値を ChatWork の API Token として設定しました。');
};


/***/ }),

/***/ "./src/sendEmail2Chatwork.ts":
/*!***********************************!*\
  !*** ./src/sendEmail2Chatwork.ts ***!
  \***********************************/
/*! exports provided: sendEmail2Chatwork */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendEmail2Chatwork", function() { return sendEmail2Chatwork; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");
/* harmony import */ var _Gmail2Chatwork__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gmail2Chatwork */ "./src/Gmail2Chatwork.ts");


var sendEmail2Chatwork = function () {
    console.info('sendEmail2Chatwork start');
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(_Utils__WEBPACK_IMPORTED_MODULE_0__["default"].getConfigSheetName());
    var range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5);
    var queries = range.getValues();
    for (var _i = 0, queries_1 = queries; _i < queries_1.length; _i++) {
        var elem = queries_1[_i];
        // Notes、roomId、feedUrl の設定がなければ、処理の対象外
        if (elem[0] == '' || elem[1] == '' || elem[4] == '') {
            continue;
        }
        var gmail2Chatwork = new _Gmail2Chatwork__WEBPACK_IMPORTED_MODULE_1__["default"](elem[0], elem[1], elem[2], elem[3], elem[4]);
        gmail2Chatwork.postMessage();
    }
    console.info('sendEmail2Chatwork end');
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
var KEY = 'trigger';
var FUNCTION_NAME = 'sendEmail2Chatwork';
var weekDay = [
    ScriptApp.WeekDay.MONDAY,
    ScriptApp.WeekDay.TUESDAY,
    ScriptApp.WeekDay.WEDNESDAY,
    ScriptApp.WeekDay.THURSDAY,
    ScriptApp.WeekDay.FRIDAY,
    ScriptApp.WeekDay.SATURDAY,
    ScriptApp.WeekDay.SUNDAY
];
var updateSchedule = function (formData) {
    var data = toJson_(formData);
    Logger.log(data);
    if (data != null) {
        if (data.automate == 0) {
            deleteTrigger_();
        }
        else if (data.automate == 1) {
            if (data.interval == 0) {
                deleteTrigger_();
                var triggerId_1 = ScriptApp.newTrigger(FUNCTION_NAME)
                    .timeBased()
                    .everyMinutes(data.minitueOfHour)
                    .create()
                    .getUniqueId();
                setTrigger_(triggerId_1);
            }
            else if (data.interval == 1) {
                deleteTrigger_();
                var triggerId_2 = ScriptApp.newTrigger(FUNCTION_NAME)
                    .timeBased()
                    .everyHours(1)
                    .create()
                    .getUniqueId();
                setTrigger_(triggerId_2);
            }
            else if (data.interval == 2) {
                deleteTrigger_();
                var triggerId_3 = ScriptApp.newTrigger(FUNCTION_NAME)
                    .timeBased()
                    .atHour(data.hourOfDay)
                    .everyDays(1)
                    .inTimezone(Session.getTimeZone())
                    .create()
                    .getUniqueId();
                setTrigger_(triggerId_3);
            }
            else if (data.interval == 3) {
                deleteTrigger_();
                var triggerId_4 = ScriptApp.newTrigger(FUNCTION_NAME)
                    .timeBased()
                    .onWeekDay(weekDay[data.dayOfWeek])
                    .atHour(data.hourOfDay)
                    .nearMinute(30)
                    .create()
                    .getUniqueId();
                setTrigger_(triggerId_4);
            }
            else if (data.interval == 4) {
                deleteTrigger_();
                var triggerId = ScriptApp.newTrigger(FUNCTION_NAME)
                    .timeBased()
                    .onMonthDay(data.dayOfMonth)
                    .atHour(data.hourOfDay)
                    .nearMinute(30)
                    .create()
                    .getUniqueId();
                setTrigger_(triggerId);
            }
            else {
                throw new Error('Illegal Argments...');
            }
        }
    }
};
//serializeArrayをjsonに変換する
function toJson_(formData) {
    var result = {};
    var automateValue = 0;
    formData.forEach(function (elem, i) {
        if (elem['name'] == 'automate' && elem['value'] == 1) {
            automateValue = 1;
        }
        result[elem.name] = elem.value;
    });
    result['automate'] = automateValue;
    var data = {
        automate: result['automate'],
        interval: result['interval'],
        hourOfDay: result['hourOfDay'],
        dayOfWeek: result['dayOfWeek'],
        dayOfMonth: result['dayOfMonth'],
        minitueOfHour: result['minitueOfHour']
    };
    return data;
}
//指定したkeyに保存されているトリガーIDを使って、トリガーを削除する
function deleteTrigger_() {
    var triggerId = PropertiesService.getScriptProperties().getProperty(KEY);
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