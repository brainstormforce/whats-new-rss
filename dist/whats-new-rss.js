/**
 * === Whats New RSS ===
 *
 * Version: 1.0.1
 * Generated on: 30th January, 2024
 * Documentation: https://github.com/brainstormforce/whats-new-rss/blob/master/README.md
 */

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var WhatsNewRSSDefaultArgs = {
    rssFeedURL: '',
    selector: '',
    loaderIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\">\n\t<circle cx=\"50\" cy=\"50\" fill=\"none\" stroke=\"#9f9f9f\" stroke-width=\"10\" r=\"35\" stroke-dasharray=\"164.93361431346415 56.97787143782138\">\n\t\t<animateTransform attributeName=\"transform\" type=\"rotate\" repeatCount=\"indefinite\" dur=\"1s\" values=\"0 50 50;360 50 50\" keyTimes=\"0;1\"></animateTransform>\n\t</circle>\n\t</svg>",
    viewAll: {
        link: '',
        label: 'View All',
    },
    triggerButton: {
        icon: "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M8.61703 13.1998C8.04294 13.1503 7.46192 13.125 6.875 13.125H6.25C4.17893 13.125 2.5 11.4461 2.5 9.375C2.5 7.30393 4.17893 5.625 6.25 5.625H6.875C7.46192 5.625 8.04294 5.59972 8.61703 5.55018M8.61703 13.1998C8.82774 14.0012 9.1031 14.7764 9.43719 15.5195C9.64341 15.9782 9.48685 16.5273 9.05134 16.7787L8.50441 17.0945C8.04492 17.3598 7.45466 17.1921 7.23201 16.7106C6.70983 15.5811 6.30451 14.3866 6.03155 13.1425M8.61703 13.1998C8.29598 11.9787 8.125 10.6968 8.125 9.375C8.125 8.05316 8.29598 6.77125 8.61703 5.55018M8.61703 13.1998C11.25 13.427 13.737 14.1643 15.9789 15.3124M8.61703 5.55018C11.25 5.323 13.737 4.58569 15.9789 3.43757M15.9789 3.43757C15.8808 3.12162 15.7751 2.80903 15.662 2.5M15.9789 3.43757C16.4247 4.87356 16.7131 6.37885 16.8238 7.93326M15.9789 15.3124C15.8808 15.6284 15.7751 15.941 15.662 16.25M15.9789 15.3124C16.4247 13.8764 16.7131 12.3711 16.8238 10.8167M16.8238 7.93326C17.237 8.2772 17.5 8.79539 17.5 9.375C17.5 9.95461 17.237 10.4728 16.8238 10.8167M16.8238 7.93326C16.8578 8.40942 16.875 8.8902 16.875 9.375C16.875 9.8598 16.8578 10.3406 16.8238 10.8167\" stroke=\"#94A3B8\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
        beforeBtn: '',
        afterBtn: '',
        className: '',
        onClick: function () { },
    },
    notification: {
        setLastPostUnixTime: null,
        getLastPostUnixTime: null
    },
    flyout: {
        title: "What's New?",
        className: '',
        closeOnEsc: true,
        closeOnOverlayClick: true,
        closeBtnIcon: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6 18L18 6M6 6L18 18\" stroke=\"#94A3B8\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
        onOpen: function () { },
        onClose: function () { },
        onReady: function () { }
    }
};
var WhatsNewRSS = /** @class */ (function () {
    /**
     * Initialize our class.
     *
     * @param {ConstructorArgs} args
     */
    function WhatsNewRSS(args) {
        /**
         * Total number of new notification counts.
         */
        this.notificationsCount = 0;
        this.validateArgs(args);
        this.parseDefaults(args);
        this.setElement();
        this.setID();
        this.RSS_Fetch_Instance = new WhatsNewRSSFetch(this);
        this.RSS_View_Instance = new WhatsNewRSSView(this);
        this.setNotificationsCount();
        this.setTriggers();
    }
    /**
     * Validate the passed arguments in constructor.
     *
     * @param {ConstructorArgs} args
     */
    WhatsNewRSS.prototype.validateArgs = function (args) {
        ["rssFeedURL", "selector"].map(function (requiredArg) {
            if (!args[requiredArg]) {
                throw new Error("".concat(requiredArg, " is a required argument. It cannot be empty or undefined."));
            }
        });
    };
    /**
     * Parse the arguments passed by the user with the defaults.
     *
     * @param {ConstructorArgs} args
     */
    WhatsNewRSS.prototype.parseDefaults = function (args) {
        this.args = __assign(__assign(__assign({}, WhatsNewRSSDefaultArgs), args), { viewAll: __assign(__assign({}, WhatsNewRSSDefaultArgs.viewAll), args.viewAll), triggerButton: __assign(__assign({}, WhatsNewRSSDefaultArgs.triggerButton), args.triggerButton), flyout: __assign(__assign({}, WhatsNewRSSDefaultArgs.flyout), args.flyout) });
    };
    /**
     * Returns parsed args.
     *
     * @returns {ConstructorArgs}
     */
    WhatsNewRSS.prototype.getArgs = function () {
        return this.args;
    };
    /**
     * Sets the HTML element queried using passed selector.
     */
    WhatsNewRSS.prototype.setElement = function () {
        this.element = document.querySelector(this.args.selector);
    };
    /**
     * Returns the html element according to the selector.
     *
     * @returns {HTMLElement}
     */
    WhatsNewRSS.prototype.getElement = function () {
        return this.element;
    };
    /**
     * Creates unique ID for current instance, that can be used by the library elements.
     */
    WhatsNewRSS.prototype.setID = function () {
        this.ID = btoa("".concat(this.getArgs().rssFeedURL, "-").concat(this.getArgs().selector)).replace(/=/g, '').slice(-12);
    };
    /**
     * Returns the current instance unique ID.
     *
     * @returns {string}
     */
    WhatsNewRSS.prototype.getID = function () {
        return this.ID;
    };
    /**
     * Checks and counts new notification for the notification badge.
     */
    WhatsNewRSS.prototype.setNotificationsCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lastPostUnixTime, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!('function' === typeof this.getArgs().notification.getLastPostUnixTime)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getArgs().notification.getLastPostUnixTime(this)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = WhatsNewRSSCacheUtils.getLastPostUnixTime();
                        _b.label = 3;
                    case 3:
                        lastPostUnixTime = _a;
                        this.RSS_Fetch_Instance.fetchData()
                            .then(function (data) {
                            if (!data.length) {
                                return;
                            }
                            var currentPostUnixTime = +data[0].date;
                            if (currentPostUnixTime > lastPostUnixTime) {
                                data.forEach(function (item) {
                                    if (item.date > lastPostUnixTime) {
                                        _this.notificationsCount++;
                                    }
                                });
                                _this.RSS_View_Instance.setNotification(_this.notificationsCount);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns total number of new notifications.
     *
     * @returns {number}
     */
    WhatsNewRSS.prototype.getNotificationsCount = function () {
        return this.notificationsCount;
    };
    /**
     * Sets the triggers for the library, eg: close, open, fetch.
     */
    WhatsNewRSS.prototype.setTriggers = function () {
        var _this = this;
        var triggerButton = document.getElementById(this.RSS_View_Instance.getTriggerButtonID());
        var flyout = document.getElementById(this.RSS_View_Instance.getFlyoutID());
        var flyoutInner = flyout.querySelector('.whats-new-rss-flyout-inner-content');
        var flyoutCloseBtn = document.getElementById(this.RSS_View_Instance.getFlyoutCloseBtnID());
        /**
         * Open flyout on trigger button click.
         * Flyout has three states: `closed | open | ready`
         */
        triggerButton.addEventListener("click", function (e) {
            e.preventDefault();
            _this.getArgs().triggerButton.onClick(_this);
            _this.RSS_View_Instance.setIsLoading(true);
            flyout.classList.remove('closed');
            flyout.classList.add('open');
            document.body.classList.add('whats-new-rss-is-active');
            _this.getArgs().flyout.onOpen(_this);
            /**
             * Fetch data on flyout open.
             */
            _this.RSS_Fetch_Instance.fetchData()
                .then(function (data) {
                // Set the last latest post date for notification handling.
                if ('function' === typeof _this.getArgs().notification.setLastPostUnixTime) {
                    _this.getArgs().notification.setLastPostUnixTime(data[0].date);
                }
                else {
                    WhatsNewRSSCacheUtils.setLastPostUnixTime(data[0].date);
                }
                flyoutInner.innerHTML = '';
                data.forEach(function (item) {
                    flyoutInner.innerHTML += _this.RSS_View_Instance.innerContentWrapper("\n\t\t\t\t\t\t\t<div class=\"rss-content-header\">\n\t\t\t\t\t\t\t\t<p>".concat(_this.RSS_View_Instance.timeAgo(new Date(item.date)), "</p>\n\t\t\t\t\t\t\t\t<h2>").concat(item.title, "</h2>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t").concat(item.description, "\n\t\t\t\t\t\t\t"));
                });
                if (_this.getArgs().viewAll.link) {
                    // If we have link provided for the view all button then append a view all button at the end of the contents.
                    flyoutInner.innerHTML += _this.RSS_View_Instance.innerContentWrapper("\n\t\t\t\t\t\t\t<a href=\"".concat(_this.getArgs().viewAll.link, "\" class=\"button view-all\">").concat(_this.getArgs().viewAll.label, "</a>\n\t\t\t\t\t\t\t"));
                }
                _this.RSS_View_Instance.setIsLoading(false);
                flyout.classList.add('ready');
                _this.getArgs().flyout.onReady(_this);
                /**
                 * Change focus to flyout on flyout ready.
                 */
                flyout.focus();
            });
        });
        /**
         * Handle events for the closing of the flyout.
         */
        var handleFlyoutClose = function () {
            flyout.classList.add('closed');
            flyout.classList.remove('open');
            flyout.classList.remove('ready');
            document.body.classList.remove('whats-new-rss-is-active');
            _this.RSS_View_Instance.setNotification(false);
            flyoutInner.innerHTML = '';
            _this.getArgs().flyout.onClose(_this);
            /**
             * Change focus back to trigger button after flyout close.
             */
            triggerButton.focus();
        };
        if (this.getArgs().flyout.closeOnEsc) {
            document.addEventListener('keydown', function (e) {
                if ('Escape' !== e.key)
                    return;
                if (!flyout.classList.contains('open'))
                    return;
                handleFlyoutClose();
            });
        }
        if (this.getArgs().flyout.closeOnOverlayClick) {
            flyout.querySelector('.whats-new-rss-flyout-overlay').addEventListener('click', handleFlyoutClose);
        }
        flyoutCloseBtn.addEventListener('click', handleFlyoutClose);
    };
    return WhatsNewRSS;
}());
var WhatsNewRSSCacheUtils = /** @class */ (function () {
    function WhatsNewRSSCacheUtils() {
    }
    WhatsNewRSSCacheUtils.setSessionData = function (data) {
        return window.sessionStorage.setItem(this.keys.SESSION, data);
    };
    WhatsNewRSSCacheUtils.getSessionData = function () {
        return window.sessionStorage.getItem(this.keys.SESSION);
    };
    WhatsNewRSSCacheUtils.setLastPostUnixTime = function (unixTime) {
        return window.localStorage.setItem(this.keys.LAST_LATEST_POST, unixTime.toString());
    };
    WhatsNewRSSCacheUtils.getLastPostUnixTime = function () {
        return +window.localStorage.getItem(this.keys.LAST_LATEST_POST);
    };
    WhatsNewRSSCacheUtils.keys = {
        LAST_LATEST_POST: "whats-new-rss-last-lastest-post-unixtime",
        SESSION: "whats-new-rss-session-cache-response"
    };
    return WhatsNewRSSCacheUtils;
}());
/**
 * Class for handling the data fetching.
 * It also handles the session caching of the fetched data internally.
 */
var WhatsNewRSSFetch = /** @class */ (function () {
    function WhatsNewRSSFetch(RSS) {
        this.rssFeedURL = '';
        this.data = [];
        this.rssFeedURL = RSS.getArgs().rssFeedURL;
        var sessionCache = JSON.parse(WhatsNewRSSCacheUtils.getSessionData());
        if (sessionCache && sessionCache.length) {
            this.data = sessionCache;
        }
    }
    WhatsNewRSSFetch.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, _div, items;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.data.length) {
                            return [2 /*return*/, this.data];
                        }
                        _a = this;
                        return [4 /*yield*/, fetch(this.rssFeedURL)];
                    case 1:
                        _a.response = _b.sent();
                        return [4 /*yield*/, this.response.text()];
                    case 2:
                        data = _b.sent();
                        _div = document.createElement('div');
                        _div.innerHTML = data.replace(/\s*]]>\s*/g, '');
                        items = _div.querySelectorAll('item');
                        items.forEach(function (item) {
                            var rssDate = item.querySelector('pubDate').innerHTML;
                            _this.data.push({
                                title: item.querySelector('title').innerHTML,
                                date: !!rssDate ? +new Date(rssDate) : null,
                                description: item.querySelector('content\\:encoded').innerHTML,
                            });
                        });
                        WhatsNewRSSCacheUtils.setSessionData(JSON.stringify(this.data));
                        return [2 /*return*/, this.data];
                }
            });
        });
    };
    return WhatsNewRSSFetch;
}());
/**
 * The class for handling library trigger button and flyout elements.
 * It also provides some necessary methods that can be used during development.
 */
var WhatsNewRSSView = /** @class */ (function () {
    function WhatsNewRSSView(RSS) {
        this.RSS = RSS;
        this.createTriggerButton();
        this.createFlyOut();
    }
    WhatsNewRSSView.prototype.getTriggerButtonID = function () {
        return "whats-new-rss-btn-".concat(this.RSS.getID());
    };
    WhatsNewRSSView.prototype.getFlyoutID = function () {
        return "whats-new-rss-flyout-".concat(this.RSS.getID());
    };
    WhatsNewRSSView.prototype.getFlyoutCloseBtnID = function () {
        return "whats-new-rss-flyout-close-".concat(this.RSS.getID());
    };
    WhatsNewRSSView.prototype.setIsLoading = function (isLoading) {
        if (isLoading === void 0) { isLoading = false; }
        var flyoutWrapper = document.getElementById(this.getFlyoutID());
        if (isLoading) {
            flyoutWrapper.classList.add('is-loading');
        }
        else {
            flyoutWrapper.classList.remove('is-loading');
        }
    };
    WhatsNewRSSView.prototype.setNotification = function (notificationsCount) {
        var notificationBadge = document.querySelector("#".concat(this.getTriggerButtonID(), " .whats-new-rss-notification-badge"));
        if (!!notificationsCount) {
            notificationBadge.innerHTML = notificationsCount > 9 ? "9+" : notificationsCount.toString();
            notificationBadge.classList.remove('hide');
        }
        else {
            notificationBadge.classList.add('hide');
        }
    };
    WhatsNewRSSView.prototype.createTriggerButton = function () {
        var button = "\n\t\t".concat(this.RSS.getArgs().triggerButton.beforeBtn, "\n\t\t<a class=\"whats-new-rss-trigger-button\" id=\"").concat(this.getTriggerButtonID(), "\">\n\t\t\t").concat(this.RSS.getArgs().triggerButton.icon, "\n\t\t\t<div class=\"whats-new-rss-notification-badge hide\">0</div>\n\t\t</a>\n\t\t").concat(this.RSS.getArgs().triggerButton.afterBtn, "\n\t\t");
        this.RSS.getElement().innerHTML += button;
    };
    WhatsNewRSSView.prototype.createFlyOut = function () {
        var wrapperClasses = [
            'whats-new-rss-flyout',
            'closed',
        ];
        if (this.RSS.getArgs().flyout.className) {
            wrapperClasses.push(this.RSS.getArgs().flyout.className);
        }
        var flyout = "\n\t\t<div class=\"".concat(wrapperClasses.join(' '), "\" id=\"").concat(this.getFlyoutID(), "\" role=\"dialog\">\n\n\t\t\t<div class=\"whats-new-rss-flyout-contents\">\n\n\t\t\t\t<div class=\"whats-new-rss-flyout-inner-header\">\n\n\t\t\t\t\t<div class=\"whats-new-rss-flyout-inner-header__title-icon-wrapper\">\n\t\t\t\t\t\t<h3>").concat(this.RSS.getArgs().flyout.title, "</h3>\n\n\t\t\t\t\t\t<span class=\"whats-new-rss-flyout-inner-header__loading-icon\">\n\t\t\t\t\t\t").concat(this.RSS.getArgs().loaderIcon, "\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<button type=\"button\" id=\"").concat(this.getFlyoutCloseBtnID(), "\">").concat(this.RSS.getArgs().flyout.closeBtnIcon, "</button>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"whats-new-rss-flyout-inner-content\">\n\t\t\t\t\t<div class=\"skeleton-container\">\n\t\t\t\t\t\t<div class=\"skeleton-row whats-new-rss-flyout-inner-content-item\"></div>\n\t\t\t\t\t\t<div class=\"skeleton-row whats-new-rss-flyout-inner-content-item\"></div>\n\t\t\t\t\t\t<div class=\"skeleton-row whats-new-rss-flyout-inner-content-item\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t\t<div class=\"whats-new-rss-flyout-overlay\"></div>\n\t\t</div>\n\t\t");
        document.body.innerHTML += flyout;
    };
    WhatsNewRSSView.prototype.innerContentWrapper = function (content) {
        return "\n\t\t<div class=\"whats-new-rss-flyout-inner-content-item\">\n\t\t\t".concat(content, "\n\t\t</div>\n\t\t");
    };
    WhatsNewRSSView.prototype.timeAgo = function (date) {
        var currentDate = new Date();
        var timestamp = date.getTime();
        var currentTimestamp = currentDate.getTime();
        var difference = currentTimestamp - timestamp;
        // Define time intervals in milliseconds
        var minute = 60 * 1000;
        var hour = minute * 60;
        var day = hour * 24;
        var week = day * 7;
        var month = day * 30; // Rough estimate, assuming 30 days in a month
        if (difference < minute) {
            return 'Just now';
        }
        else if (difference < hour) {
            var minutes = Math.floor(difference / minute);
            return "".concat(minutes, " minute").concat(minutes > 1 ? 's' : '', " ago");
        }
        else if (difference < day) {
            var hours = Math.floor(difference / hour);
            return "".concat(hours, " hour").concat(hours > 1 ? 's' : '', " ago");
        }
        else if (difference < week) {
            var days = Math.floor(difference / day);
            return "".concat(days, " day").concat(days > 1 ? 's' : '', " ago");
        }
        else if (difference < month) {
            var weeks = Math.floor(difference / week);
            return "".concat(weeks, " week").concat(weeks > 1 ? 's' : '', " ago");
        }
        else {
            // Handle months and years accordingly
            // This is a rough estimate and may not be accurate in all cases
            var months = Math.floor(difference / month);
            return "".concat(months, " month").concat(months > 1 ? 's' : '', " ago");
        }
    };
    return WhatsNewRSSView;
}());
