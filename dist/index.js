
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var jac = (function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    var sub2NumStr = function (num) { return ("0" + num).substr(-2); };
    var getDate = function (time) {
        var date = time || new Date();
        return date.getFullYear() + "-" + sub2NumStr(date.getMonth() + 1) + "-" + sub2NumStr(date.getDate()) + " " + sub2NumStr(date.getHours()) + ":" + sub2NumStr(date.getMinutes()) + ":" + sub2NumStr(date.getSeconds());
    };

    var global = (function () { return (typeof window === "undefined" ? {} : window); })();
    var platform = (function () {
        if (!global.navigator) {
            return "";
        }
        var u = global.navigator.userAgent || "";
        var mobileAgents = [
            "Android",
            "iPhone",
            "webOS",
            "BlackBerry",
            "SymbianOS",
            "Windows Phone",
            "iPad",
            "iPod"
        ];
        for (var i = 0; i < mobileAgents.length; i++) {
            if (u.includes(mobileAgents[i])) {
                return mobileAgents[i];
            }
        }
        return global.navigator.platform;
    })();
    var ua = (function () {
        var _a;
        var agent = ((_a = global.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) || "";
        if (agent.includes("Opera") || agent.includes("OPR")) {
            // opera 浏览器
            return agent.match(/(Opera|OPR)([0-9./]+)?/)[0];
        }
        if (agent.includes("Edge")) {
            // edge 浏览器
            return agent.match(/Edge([0-9./]+)?/)[0];
        }
        if (agent.includes("Firefox")) {
            // Firefox 浏览器
            return agent.match(/Firefox([0-9./]+)?/)[0];
        }
        if (agent.includes("Safari") && !agent.includes("Chrome")) {
            // Safari 浏览器
            return agent.match(/Safari([0-9./]+)?/)[0];
        }
        if (agent.includes("Chrome")) {
            // Chrome 浏览器
            return agent.match(/Chrome([0-9./]+)?/)[0];
        }
        if (agent.includes("MSIE") && agent.includes("Trident")) {
            // IE 浏览器
            return agent.match(/MSIE ([0-9./]+)?/)[0];
        }
        return agent.split(" ")[0] || "";
    })();

    var config = {
        log: true,
        max: 30
    };
    global.__JAC_CONFIG = config;

    var MessageType;
    (function (MessageType) {
        MessageType[MessageType["EVENT"] = 1] = "EVENT";
        MessageType[MessageType["HTTP"] = 2] = "HTTP";
        MessageType[MessageType["CONSOLE"] = 3] = "CONSOLE";
        MessageType[MessageType["NATIVE"] = 4] = "NATIVE";
        MessageType[MessageType["ERROR"] = 10] = "ERROR";
    })(MessageType || (MessageType = {}));
    var MessageColor;
    (function (MessageColor) {
        MessageColor["EVENT"] = "green";
        MessageColor["HTTP"] = "yellow";
        MessageColor["CONSOLE"] = "";
        MessageColor["ERROR"] = "red";
    })(MessageColor || (MessageColor = {}));
    var Logger = /** @class */ (function () {
        function Logger() {
            this._message = [];
        }
        Logger.prototype.put = function (type, action, message) {
            var subText = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                subText[_i - 3] = arguments[_i];
            }
            var date = getDate();
            var originType = MessageType[type];
            var logColor = MessageColor[originType];
            var subStr = subText.join(" ");
            // eslint-disable-next-line max-len
            var context = "[" + date + "][" + platform + "][" + ua + "][" + originType + "][" + action + "] " + message + " " + subStr;
            this.transferMessage("<span style=\"color: " + logColor + "\">" + context + "</span>");
            this.outputConsole(context, logColor, type);
        };
        // eslint-disable-next-line class-methods-use-this
        Logger.prototype.outputConsole = function (context, color, type) {
            if (!config.log || type === MessageType.CONSOLE)
                return;
            (console.originLog || console.log)("%c" + context, "color:" + color);
        };
        Logger.prototype.capture = function () {
            return __spreadArrays(this._message);
        };
        Logger.prototype.clear = function () {
            this._message = [];
        };
        Logger.prototype.transferMessage = function (str) {
            this._message.push(str);
            if (this._message.length > config.max) {
                this._message.shift();
            }
        };
        return Logger;
    }());
    var logger;
    if (!logger) {
        logger = new Logger();
    }
    var logger$1 = logger;

    var consoleHacked = false;
    var consoleHack = function () {
        if (!consoleHacked) {
            consoleHacked = true;
            console.originDebug = console.debug;
            console.originLog = console.log;
            console.originInfo = console.info;
            console.originWarn = console.warn;
            console.originError = console.error;
            console.debug = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                logger$1.put.apply(logger$1, __spreadArrays([MessageType.CONSOLE, "debug", message], optionalParams));
                console.originDebug.apply(console, __spreadArrays([message], optionalParams));
            };
            console.log = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                logger$1.put.apply(logger$1, __spreadArrays([MessageType.CONSOLE, "log", message], optionalParams));
                console.originLog.apply(console, __spreadArrays([message], optionalParams));
            };
            console.info = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                logger$1.put.apply(logger$1, __spreadArrays([MessageType.CONSOLE, "info", message], optionalParams));
                console.originInfo.apply(console, __spreadArrays([message], optionalParams));
            };
            console.warn = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                logger$1.put.apply(logger$1, __spreadArrays([MessageType.CONSOLE, "warn", message], optionalParams));
                console.originWarn.apply(console, __spreadArrays([message], optionalParams));
            };
            console.error = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                logger$1.put.apply(logger$1, __spreadArrays([MessageType.CONSOLE, "error", message], optionalParams));
                console.originError.apply(console, __spreadArrays([message], optionalParams));
            };
        }
    };

    var MouseEventActive;
    (function (MouseEventActive) {
        MouseEventActive["click"] = "\u89E6\u53D1\u70B9\u51FB\u4E8B\u4EF6";
        MouseEventActive["dbClick"] = "\u89E6\u53D1\u53CC\u51FB\u4E8B\u4EF6";
        MouseEventActive["mouseup"] = "\u89E6\u53D1\u70B9\u51FB\u4E8B\u4EF6";
        MouseEventActive["mousedown"] = "\u89E6\u53D1\u70B9\u51FB\u4E8B\u4EF6";
        MouseEventActive["mousemove"] = "\u89E6\u53D1\u9F20\u6807\u60AC\u505C\u4E8B\u4EF6";
        MouseEventActive["mouseenter"] = "\u89E6\u53D1\u9F20\u6807\u8FDB\u5165\u4E8B\u4EF6";
        MouseEventActive["mouseover"] = "\u89E6\u53D1\u9F20\u6807\u79BB\u5F00\u4E8B\u4EF6";
        MouseEventActive["mouseout"] = "\u89E6\u53D1\u9F20\u6807\u79BB\u5F00\u4E8B\u4EF6";
        MouseEventActive["mouseleave"] = "\u89E6\u53D1\u9F20\u6807\u79BB\u5F00\u4E8B\u4EF6";
        MouseEventActive["contextmenu"] = "\u89E6\u53D1\u53F3\u952E\u70B9\u51FB\u4E8B\u4EF6";
    })(MouseEventActive || (MouseEventActive = {}));
    var FocusEventActive;
    (function (FocusEventActive) {
        FocusEventActive["focus"] = "\u89E6\u53D1\u805A\u7126\u4E8B\u4EF6";
        FocusEventActive["blur"] = "\u89E6\u53D1\u5931\u7126\u4E8B\u4EF6";
        FocusEventActive["focusin"] = "\u89E6\u53D1\u805A\u7126\u4E8B\u4EF6";
        FocusEventActive["focusout"] = "\u89E6\u53D1\u5931\u7126\u4E8B\u4EF6";
    })(FocusEventActive || (FocusEventActive = {}));
    var InputEventActive;
    (function (InputEventActive) {
        InputEventActive["input"] = "\u89E6\u53D1\u8F93\u5165\u4E8B\u4EF6";
    })(InputEventActive || (InputEventActive = {}));
    var KeyboardEventActive;
    (function (KeyboardEventActive) {
        KeyboardEventActive["keydown"] = "\u89E6\u53D1\u8F93\u5165\u4E8B\u4EF6";
        KeyboardEventActive["keyup"] = "\u89E6\u53D1\u8F93\u5165\u4E8B\u4EF6";
        KeyboardEventActive["keypress"] = "\u89E6\u53D1\u8F93\u5165\u4E8B\u4EF6";
    })(KeyboardEventActive || (KeyboardEventActive = {}));

    var limitOutput = function (str) {
        if (!str)
            return "undefined";
        return str.toString().slice(0, 15);
    };
    var mouseEventEmitter = function (event) {
        var target = event.target;
        return [
            MouseEventActive[event.type] || event.type,
            event.type,
            "<" + target.tagName + ">",
            "ID::" + (target.id || "null"),
            "TEXT::" + limitOutput(target.innerText),
            "PAGE::" + event.pageX + "," + event.pageY
        ];
    };
    var focusEventEmitter = function (event) {
        var target = event.target;
        return [
            FocusEventActive[event.type] || event.type,
            event.type,
            "<" + target.tagName + ">",
            "ID::" + (target.id || "null"),
            "VAL::" + (target.value || "null")
        ];
    };
    var inputEventEmitter = function (event) {
        var target = event.target;
        return [
            InputEventActive[event.type] || event.type,
            event.type,
            "<" + target.tagName + ">",
            "ID::" + (target.id || "null"),
            "VAL::" + limitOutput(target.value),
            "INPUT::" + event.data
        ];
    };
    var keyboardEventEmitter = function (event) {
        var target = event.target;
        return [
            KeyboardEventActive[event.type] || event.type,
            event.type,
            "<" + target.tagName + ">",
            "ID::" + (target.id || "null"),
            "VAL::" + limitOutput(target.value),
            "CODE::" + event.code
        ];
    };
    var defaultEventEmitter = function (event) {
        var _a, _b;
        return [
            event.type,
            "<" + ((_a = event.target) === null || _a === void 0 ? void 0 : _a.tagName) + ">",
            "ID::" + (((_b = event.target) === null || _b === void 0 ? void 0 : _b.id) || "null")
        ];
    };
    var getEventMessage = function (event) {
        if (event instanceof MouseEvent)
            return mouseEventEmitter(event);
        if (event instanceof FocusEvent)
            return focusEventEmitter(event);
        if (event instanceof InputEvent)
            return inputEventEmitter(event);
        if (event instanceof KeyboardEvent)
            return keyboardEventEmitter(event);
        return defaultEventEmitter(event);
    };

    var eventHacked = false;
    var eventHack = function () {
        if (eventHacked)
            return;
        eventHacked = true;
        function hackEventListener(event) {
            var _this = this;
            clearTimeout(this.__loggerQueueTimeout);
            this.__loggerQueueTimeout = setTimeout(function () {
                _this.__latestActiveType = undefined;
            }, 300);
            if (this.__latestActiveType !== event.type) {
                logger$1.put.apply(logger$1, __spreadArrays([MessageType.EVENT], getEventMessage(event)));
                this.__latestActiveType = event.type;
            }
        }
        // eslint-disable-next-line max-len
        EventTarget.prototype.originAddEventListener = EventTarget.prototype.addEventListener;
        // eslint-disable-next-line max-len
        EventTarget.prototype.originRemoveEventListener = EventTarget.prototype.removeEventListener;
        EventTarget.prototype.addEventListener = function addEventHack(type, listener, options) {
            if (!this.__eventListenerCount) {
                this.__eventListenerCount = {};
            }
            console.log(this.__eventListenerCount);
            if (!this.__eventListenerCount[type]) {
                this.__eventListenerCount[type] = 1;
                console.log("binding hcak");
                this.originAddEventListener(type, hackEventListener);
            }
            else {
                this.__eventListenerCount[type] += 1;
            }
            this.originAddEventListener.call(this, type, listener, options);
        };
        EventTarget.prototype.removeEventListener = function removeEventHack(type, callback, options) {
            if (!this.__eventListenerCount) {
                this.__eventListenerCount = {};
            }
            if (this.__eventListenerCount[type]) {
                this.__eventListenerCount[type]--;
            }
            if (this.__eventListenerCount[type] === 0) {
                this.originRemoveEventListener(type, hackEventListener);
            }
            this.originRemoveEventListener.call(this, type, callback, options);
        };
    };
    var originBinding = function (target, type, listener, options) {
        (target.originAddEventListener || target.addEventListener)(type, listener, options);
    };

    var popstateCallback = function () {
        logger$1.put(MessageType.NATIVE, "HISTORY路由跳转", "popstate", global.location.href);
    };
    var nativeHack = function () {
        originBinding(global, "load", function () {
            logger$1.put(MessageType.NATIVE, "页面载入", "loaded");
        });
        originBinding(global, "popstate", popstateCallback);
    };

    var index = (function () {
        consoleHack();
        eventHack();
        nativeHack();
        window.__logger = logger$1;
        console.log("31");
    });

    return index;

}());
