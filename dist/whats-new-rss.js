/**
 * === Whats New RSS ===
 *
 * Version: 1.1.0
 * Generated on: 2nd March, 2026
 * Documentation: https://github.com/brainstormforce/whats-new-rss/blob/master/README.md
 */

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ---------------------------------------------------------------------------
// Security helpers
// ---------------------------------------------------------------------------
/**
 * HTML-escapes a plain-text string so it is safe to interpolate into innerHTML.
 */
function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}
/**
 * Returns true only for http: and https: URLs.
 * Rejects javascript:, data:, and any other protocol.
 */
function isSafeURL(url) {
    try {
        const parsed = new URL(url);
        return ['https:', 'http:'].includes(parsed.protocol);
    }
    catch (_a) {
        return false;
    }
}
/**
 * Sanitizes an HTML string by removing dangerous elements and event-handler
 * attributes. Keeps safe formatting markup (p, strong, a, img, etc.) while
 * stripping scripts, iframes, and on* attributes.
 */
function sanitizeHTML(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    // Remove elements that can execute code or make unexpected requests.
    const dangerousTags = [
        'script', 'style', 'iframe', 'object', 'embed',
        'form', 'input', 'textarea', 'select', 'meta', 'base',
    ];
    dangerousTags.forEach(tag => {
        doc.querySelectorAll(tag).forEach(el => el.remove());
    });
    // Remove event-handler attributes and unsafe URL attributes.
    doc.querySelectorAll('*').forEach(el => {
        Array.from(el.attributes).forEach(attr => {
            if (attr.name.startsWith('on')) {
                el.removeAttribute(attr.name);
            }
            if (['href', 'src', 'action', 'formaction'].includes(attr.name) && !isSafeURL(attr.value)) {
                el.removeAttribute(attr.name);
            }
        });
    });
    return doc.body.innerHTML;
}
// ---------------------------------------------------------------------------
const WhatsNewRSSDefaultArgs = {
    rssFeedURL: '',
    selector: '',
    uniqueKey: '',
    loaderIcon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
	<circle cx="50" cy="50" fill="none" stroke="#9f9f9f" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
		<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
	</circle>
	</svg>`,
    viewAll: {
        link: '',
        label: 'View All',
    },
    triggerButton: {
        label: '',
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.61703 13.1998C8.04294 13.1503 7.46192 13.125 6.875 13.125H6.25C4.17893 13.125 2.5 11.4461 2.5 9.375C2.5 7.30393 4.17893 5.625 6.25 5.625H6.875C7.46192 5.625 8.04294 5.59972 8.61703 5.55018M8.61703 13.1998C8.82774 14.0012 9.1031 14.7764 9.43719 15.5195C9.64341 15.9782 9.48685 16.5273 9.05134 16.7787L8.50441 17.0945C8.04492 17.3598 7.45466 17.1921 7.23201 16.7106C6.70983 15.5811 6.30451 14.3866 6.03155 13.1425M8.61703 13.1998C8.29598 11.9787 8.125 10.6968 8.125 9.375C8.125 8.05316 8.29598 6.77125 8.61703 5.55018M8.61703 13.1998C11.25 13.427 13.737 14.1643 15.9789 15.3124M8.61703 5.55018C11.25 5.323 13.737 4.58569 15.9789 3.43757M15.9789 3.43757C15.8808 3.12162 15.7751 2.80903 15.662 2.5M15.9789 3.43757C16.4247 4.87356 16.7131 6.37885 16.8238 7.93326M15.9789 15.3124C15.8808 15.6284 15.7751 15.941 15.662 16.25M15.9789 15.3124C16.4247 13.8764 16.7131 12.3711 16.8238 10.8167M16.8238 7.93326C17.237 8.2772 17.5 8.79539 17.5 9.375C17.5 9.95461 17.237 10.4728 16.8238 10.8167M16.8238 7.93326C16.8578 8.40942 16.875 8.8902 16.875 9.375C16.875 9.8598 16.8578 10.3406 16.8238 10.8167" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        beforeBtn: '',
        afterBtn: '',
        className: '',
        onClick: () => { },
    },
    notification: {
        setLastPostUnixTime: null,
        getLastPostUnixTime: null
    },
    flyout: {
        title: "What's New?",
        innerContent: {
            titleLink: true,
            additionalClasses: []
        },
        excerpt: {
            wordLimit: 500,
            moreSymbol: '&hellip;',
            readMore: {
                label: 'Read More',
                className: '',
            }
        },
        className: '',
        closeOnEsc: true,
        closeOnOverlayClick: true,
        closeBtnIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6L18 18" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        formatDate: null,
        onOpen: () => { },
        onClose: () => { },
        onReady: () => { },
    }
};
class WhatsNewRSS {
    ;
    /**
     * Initialize our class.
     *
     * @param {ConstructorArgs} args
     */
    constructor(args) {
        this.rssFeedURLs = [];
        /**
         * UnixTime stamp of the last seen or read post.
         */
        this.lastPostUnixTime = 0;
        /**
         * UnixTime stamp of the last seen or read post for multi feeds by feed key.
         */
        this.multiLastPostUnixTime = {};
        /**
         * Total number of new notification counts.
         */
        this.notificationsCount = 0;
        /**
         * Notification counts for multi feeds by feed key.
         */
        this.multiNotificationCount = {};
        /**
         * Check if has new feeds.
         */
        this.hasNewFeeds = false;
        /**
         * Check if has new feeds in multi feeds mode.
         */
        this.multiHasNewFeeds = {};
        /**
         * Guard to ensure the scrollbar-compensation CSS rule is inserted only once
         * per instance (fixes BUG-02 unbounded insertRule accumulation).
         */
        this._scrollbarRuleInserted = false;
        this.validateArgs(args);
        this.parseDefaults(args);
        this.setElement();
        if (!this.getElement()) {
            console.warn('WNR: Cannot find element with', this.getArgs().selector);
            return;
        }
        this.setID();
        this.setRSSFeedURLs();
        // BUG-03: Each instance owns its own cache utility keyed to its own ID.
        this.cacheUtils = new WhatsNewRSSCacheUtils(this.getID());
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
    validateArgs(args) {
        ["rssFeedURL", "selector", "uniqueKey"].forEach((requiredArg) => {
            if (!args[requiredArg]) {
                throw new Error(`${requiredArg} is a required argument. It cannot be empty or undefined.`);
            }
            switch (requiredArg) {
                case 'rssFeedURL':
                    const arg = args[requiredArg];
                    if (Array.isArray(arg)) {
                        arg.forEach((rssFeedURL) => {
                            if (!(rssFeedURL === null || rssFeedURL === void 0 ? void 0 : rssFeedURL.key)) {
                                throw new Error(`The parameter "key" is required for "${requiredArg}" parameter in multi-feed mode.`);
                            }
                            // ADD-04: Restrict feed.key to safe characters for use in CSS
                            // selectors and HTML data attributes.
                            if (!/^[a-zA-Z0-9_-]+$/.test(rssFeedURL.key)) {
                                throw new Error(`The parameter "key" may only contain letters, numbers, hyphens, and underscores for "${requiredArg}" parameter in multi-feed mode. Ref Key: "${rssFeedURL.key}"`);
                            }
                        });
                    }
                    break;
                default:
                    break;
            }
        });
    }
    /**
     * Parse the arguments passed by the user with the defaults.
     *
     * @param {ConstructorArgs} args
     */
    parseDefaults(args) {
        var _a, _b;
        this.args = Object.assign(Object.assign(Object.assign({}, WhatsNewRSSDefaultArgs), args), { viewAll: Object.assign(Object.assign({}, WhatsNewRSSDefaultArgs.viewAll), args === null || args === void 0 ? void 0 : args.viewAll), triggerButton: Object.assign(Object.assign({}, WhatsNewRSSDefaultArgs.triggerButton), args === null || args === void 0 ? void 0 : args.triggerButton), flyout: Object.assign(Object.assign(Object.assign({}, WhatsNewRSSDefaultArgs.flyout), args === null || args === void 0 ? void 0 : args.flyout), { innerContent: Object.assign(Object.assign({}, WhatsNewRSSDefaultArgs.flyout.innerContent), (_a = args === null || args === void 0 ? void 0 : args.flyout) === null || _a === void 0 ? void 0 : _a.innerContent), excerpt: Object.assign(Object.assign({}, WhatsNewRSSDefaultArgs.flyout.excerpt), (_b = args === null || args === void 0 ? void 0 : args.flyout) === null || _b === void 0 ? void 0 : _b.excerpt) }) });
    }
    /**
     * Returns parsed args.
     *
     * @returns {ConstructorArgs}
     */
    getArgs() {
        return this.args;
    }
    /**
     * Sets the HTML element queried using passed selector.
     */
    setElement() {
        this.element = document.querySelector(this.args.selector);
    }
    /**
     * Returns the html element according to the selector.
     *
     * @returns {HTMLElement}
     */
    getElement() {
        return this.element;
    }
    /**
     * Creates unique ID for current instance, that can be used by the library elements.
     */
    setID() {
        const data = [this.getArgs().selector, this.getArgs().uniqueKey];
        const rssFeedURL = this.getArgs().rssFeedURL;
        if (Array.isArray(rssFeedURL)) {
            rssFeedURL.forEach((_rssFeedURL) => {
                data.push(_rssFeedURL.key);
            });
        }
        else {
            data.push(rssFeedURL);
        }
        this.ID = btoa(data.join('-')).slice(-12).replace(/=/g, '') + '-' + this.getArgs().uniqueKey;
    }
    /**
     * Whether or not multiple feed urls is provided or not.
     *
     * @returns {boolean}
     */
    isMultiFeedRSS() {
        return 'string' !== typeof this.getArgs().rssFeedURL;
    }
    setRSSFeedURLs() {
        const rssFeedURL = this.getArgs().rssFeedURL;
        if (!this.isMultiFeedRSS()) {
            this.rssFeedURLs.push({
                key: null,
                label: '',
                url: rssFeedURL.toString(),
            });
        }
        else {
            if (Array.isArray(rssFeedURL)) {
                rssFeedURL.forEach(_item => {
                    this.rssFeedURLs.push(_item);
                });
            }
        }
    }
    getRSSFeedURLs() {
        return this.rssFeedURLs;
    }
    /**
     * Returns the current instance unique ID.
     *
     * @returns {string}
     */
    getID() {
        return this.ID;
    }
    /**
     * Returns the per-instance cache utility.
     *
     * @returns {WhatsNewRSSCacheUtils}
     */
    getCacheUtils() {
        return this.cacheUtils;
    }
    /**
     * Checks and counts new notification for the notification badge.
     */
    setNotificationsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(this.getRSSFeedURLs().map((_a) => __awaiter(this, [_a], void 0, function* ({ key }) {
                let lastPostUnixTime = 0;
                if (('function' === typeof this.getArgs().notification.getLastPostUnixTime)) {
                    lastPostUnixTime = yield this.getArgs().notification.getLastPostUnixTime(key, this);
                }
                else {
                    lastPostUnixTime = this.cacheUtils.getLastPostUnixTime(key);
                }
                if (this.isMultiFeedRSS()) {
                    this.multiLastPostUnixTime[key] = +lastPostUnixTime;
                }
                else {
                    this.lastPostUnixTime = +lastPostUnixTime;
                }
            })));
            yield this.RSS_Fetch_Instance.fetchData()
                .then((res) => {
                Object.keys(res).forEach((key) => {
                    const data = res[key];
                    if (!data.length) {
                        return;
                    }
                    this.multiNotificationCount[key] = 0;
                    const currentPostUnixTime = +data[0].date;
                    const lastPostUnixTime = this.isMultiFeedRSS() ? this.multiLastPostUnixTime[key] : this.lastPostUnixTime;
                    if (currentPostUnixTime > lastPostUnixTime) {
                        data.forEach((item) => {
                            if (item.date > lastPostUnixTime) {
                                if (this.isMultiFeedRSS()) {
                                    this.multiNotificationCount[key]++;
                                    this.multiHasNewFeeds[key] = true;
                                }
                                // Keep a record of total notifications even in multi-feed mode.
                                this.notificationsCount++;
                                this.hasNewFeeds = true;
                            }
                        });
                        this.RSS_View_Instance.setNotification(this.notificationsCount);
                    }
                });
            })
                .catch(console.error);
        });
    }
    /**
     * Returns total number of new notifications.
     *
     * @returns {number}
     */
    getNotificationsCount() {
        return this.notificationsCount;
    }
    /**
     * Sets the triggers for the library, eg: close, open, fetch.
     */
    setTriggers() {
        const triggerButton = document.getElementById(this.RSS_View_Instance.getTriggerButtonID());
        const flyout = document.getElementById(this.RSS_View_Instance.getFlyoutID());
        const flyoutInner = flyout.querySelector('.whats-new-rss-flyout-inner-content');
        const flyoutCloseBtn = document.getElementById(this.RSS_View_Instance.getFlyoutCloseBtnID());
        const multiFeedNav = document.getElementById(this.RSS_View_Instance.getFlyoutMultiFeedNavID());
        const injectContents = (key) => {
            /**
             * Fetch data on flyout open.
             */
            this.RSS_Fetch_Instance.fetchData()
                .then((res) => {
                flyoutInner.innerHTML = '';
                const data = res[key];
                if (!data.length) {
                    return;
                }
                const currentPostUnixTime = +data[0].date;
                const lastPostUnixTime = this.isMultiFeedRSS() ? this.multiLastPostUnixTime[key] : this.lastPostUnixTime;
                data.forEach((item) => {
                    const isNewPost = !!lastPostUnixTime ? item.date > lastPostUnixTime : false;
                    // VULN-01 fix: item.title is HTML-escaped at ingestion time.
                    // VULN-03 fix: item.postLink is validated at ingestion time.
                    const contentTitle = this.getArgs().flyout.innerContent.titleLink ?
                        `<a href="${item.postLink}" target="_blank">
								<h2>${item.title}</h2>
							</a>`
                        :
                            `<h2>${item.title}</h2>`;
                    const innerContent = `
								<div class="rss-content-header">
									<p>${this.RSS_View_Instance.formatDate(new Date(item.date))}</p>
									${contentTitle}
								</div>
								${this.RSS_View_Instance.createExcerpt(item.description, item.postLink, this.getArgs().flyout.excerpt)}
								${this.RSS_View_Instance.listChildrenPosts(item.children)}
							`;
                    // BUG-01 fix: clone the array so we never mutate the shared config
                    // object; also fixes the template literal misquote below.
                    const additionalClasses = [...this.getArgs().flyout.innerContent.additionalClasses];
                    if (!!key) {
                        // BUG-01 fix: was single-quoted string — now a proper template literal.
                        additionalClasses.push(`inner-content-item-feed-key-${key}`);
                    }
                    flyoutInner.innerHTML += this.RSS_View_Instance.innerContentWrapper(innerContent, isNewPost, additionalClasses.join(' '));
                });
                if (this.getArgs().viewAll.link) {
                    // ADD-01 fix: validate the URL protocol and escape the label.
                    const safeViewAllLink = isSafeURL(this.getArgs().viewAll.link)
                        ? this.getArgs().viewAll.link
                        : '#';
                    flyoutInner.innerHTML += this.RSS_View_Instance.innerContentWrapper(`<a href="${safeViewAllLink}" class="button view-all">${escapeHTML(this.getArgs().viewAll.label)}</a>`);
                }
                this.RSS_View_Instance.setIsLoading(false);
                flyout.classList.add('ready');
                this.getArgs().flyout.onReady(this);
                /**
                 * Change focus to flyout on flyout ready.
                 */
                flyout.focus();
                // Set the last latest post date for notification handling.
                if (!this.isMultiFeedRSS()) {
                    this.lastPostUnixTime = currentPostUnixTime;
                    if (this.hasNewFeeds) {
                        if ('function' === typeof this.getArgs().notification.setLastPostUnixTime) {
                            this.getArgs().notification.setLastPostUnixTime(currentPostUnixTime, key);
                        }
                        else {
                            this.cacheUtils.setLastPostUnixTime(currentPostUnixTime, key);
                        }
                    }
                }
            })
                .catch(console.error);
        };
        /**
         * Open flyout on trigger button click.
         * Flyout has three states: `closed | open | ready`
         */
        triggerButton.addEventListener("click", (e) => {
            e.preventDefault();
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            this.getArgs().triggerButton.onClick(this);
            this.RSS_View_Instance.setIsLoading(true);
            flyout.removeAttribute('style');
            flyout.classList.remove('closed');
            flyout.classList.add('open');
            document.body.classList.add('whats-new-rss-is-active');
            // BUG-02 fix: insert the rule only once per instance, and remove the
            // accidental debug `background-color: yellow` that was left in.
            if (!!scrollBarWidth && !this._scrollbarRuleInserted) {
                const styleSheet = document.getElementById('whats-new-rss-styles');
                if (styleSheet === null || styleSheet === void 0 ? void 0 : styleSheet.sheet) {
                    styleSheet.sheet.insertRule(`.whats-new-rss-is-active { padding-right: ${scrollBarWidth}px; }`, styleSheet.sheet.cssRules.length);
                    this._scrollbarRuleInserted = true;
                }
            }
            this.getArgs().flyout.onOpen(this);
            if (!this.isMultiFeedRSS()) {
                injectContents(null);
                return;
            }
            const navBtns = multiFeedNav.querySelectorAll('button');
            navBtns.forEach((navBtn) => {
                this.RSS_View_Instance.setMultiFeedTabNotificationCount(navBtn.dataset.feedKey, this.multiNotificationCount[navBtn.dataset.feedKey]);
                navBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const currentFeedKey = navBtn.dataset.feedKey;
                    this.multiNotificationCount[currentFeedKey] = 0;
                    this.RSS_Fetch_Instance.fetchData()
                        .then((res) => {
                        const currentPostUnixTime = res[currentFeedKey][0].date;
                        this.multiLastPostUnixTime[currentFeedKey] = currentPostUnixTime;
                        if (true === this.multiHasNewFeeds[currentFeedKey]) {
                            if ('function' === typeof this.getArgs().notification.setLastPostUnixTime) {
                                this.getArgs().notification.setLastPostUnixTime(currentPostUnixTime, currentFeedKey);
                            }
                            else {
                                this.cacheUtils.setLastPostUnixTime(currentPostUnixTime, currentFeedKey);
                            }
                        }
                        this.multiHasNewFeeds[currentFeedKey] = false;
                    })
                        .catch(console.error);
                    navBtns.forEach(navBtn => {
                        navBtn.classList.remove('selected');
                        const feedKey = navBtn.dataset.feedKey;
                        // ADD-04 fix: feed.key is now validated to safe chars in validateArgs,
                        // but also escape via CSS.escape() as a defence-in-depth measure.
                        const innerContentClassName = `.inner-content-item-feed-key-${CSS.escape(feedKey)}`;
                        document.querySelectorAll(innerContentClassName).forEach(item => {
                            if (currentFeedKey !== feedKey) {
                                item.classList.add('hidden');
                            }
                            else {
                                item.classList.remove('hidden');
                            }
                        });
                    });
                    navBtn.classList.add('selected');
                    injectContents(currentFeedKey);
                });
            });
            navBtns[0].click();
        });
        /**
         * Handle events for the closing of the flyout.
         */
        const handleFlyoutClose = () => {
            flyout.classList.add('closed');
            flyout.classList.remove('open');
            flyout.classList.remove('ready');
            document.body.classList.remove('whats-new-rss-is-active');
            if (this.isMultiFeedRSS()) {
                this.RSS_View_Instance.setNotification(Object.values(this.multiNotificationCount).filter(Boolean).length);
            }
            else {
                this.hasNewFeeds = false;
                this.RSS_View_Instance.setNotification(false);
            }
            flyoutInner.innerHTML = '';
            this.getArgs().flyout.onClose(this);
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
    }
}
/**
 * BUG-03 fix: converted from a static singleton to an instance-based class.
 * Each WhatsNewRSS instance creates its own WhatsNewRSSCacheUtils with its
 * own instanceID, preventing cache key collisions across multiple instances.
 */
class WhatsNewRSSCacheUtils {
    constructor(instanceID) {
        this.keys = {
            SESSION_DATA_EXPIRY: "whats-new-cache-expiry",
            LAST_LATEST_POST: "whats-new-last-unixtime",
            SESSION: "whats-new-cache"
        };
        this.instanceID = instanceID;
    }
    prefixer(key, prefixKey = '') {
        return !!prefixKey
            ? `${this.keys[key]}-${this.instanceID}-${prefixKey}`
            : `${this.keys[key]}-${this.instanceID}`;
    }
    _setDataExpiry(prefixKey = '') {
        const expiryInSeconds = 86400; // Defaults to 24 hours.
        const now = new Date();
        const expiry = now.getTime() + (expiryInSeconds * 1000);
        sessionStorage.setItem(this.prefixer('SESSION_DATA_EXPIRY', prefixKey), JSON.stringify(expiry));
    }
    _isDataExpired(prefixKey = '') {
        const key = this.prefixer('SESSION_DATA_EXPIRY', prefixKey);
        const value = window.sessionStorage.getItem(key);
        if (!value) {
            return true;
        }
        const expiry = JSON.parse(value);
        const now = new Date();
        if (now.getTime() > expiry) {
            window.sessionStorage.removeItem(key);
            return true;
        }
        return false;
    }
    setSessionData(data, prefixKey = '') {
        this._setDataExpiry(prefixKey);
        return window.sessionStorage.setItem(this.prefixer('SESSION', prefixKey), data);
    }
    getSessionData(prefixKey = '') {
        if (!this._isDataExpired(prefixKey)) {
            return window.sessionStorage.getItem(this.prefixer('SESSION', prefixKey));
        }
        return '{}';
    }
    setLastPostUnixTime(unixTime, prefixKey = '') {
        return window.localStorage.setItem(this.prefixer('LAST_LATEST_POST', prefixKey), unixTime.toString());
    }
    getLastPostUnixTime(prefixKey = '') {
        return +window.localStorage.getItem(this.prefixer('LAST_LATEST_POST', prefixKey));
    }
}
/**
 * Class for handling the data fetching.
 * It also handles the session caching of the fetched data internally.
 */
class WhatsNewRSSFetch {
    constructor(RSS) {
        this.data = {};
        this.RSS = RSS;
        this.RSS.getRSSFeedURLs().forEach((feed) => {
            const sessionCache = JSON.parse(this.RSS.getCacheUtils().getSessionData(feed.key));
            if (sessionCache && sessionCache.length) {
                this.data[feed.key] = sessionCache;
            }
        });
    }
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(this.data).length) {
                return this.data;
            }
            const fetchPromises = this.RSS.getRSSFeedURLs().map((feed) => __awaiter(this, void 0, void 0, function* () {
                this.data[feed.key] = [];
                const res = yield fetch(feed.url);
                let data = yield res.text();
                /**
                 * There was an issue with the xml content parse
                 * And during parse we were getting "<parsererror>" because of the 'raquo' entity.
                 */
                data = data.replace(/&raquo;/g, '&amp;raquo;');
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, 'text/xml');
                const items = xmlDoc.querySelectorAll('item');
                items.forEach(item => {
                    var _a;
                    const title = item.querySelector('title').textContent;
                    const link = item.querySelector('link').textContent;
                    const contentEncoded = item.querySelector('content\\:encoded, encoded');
                    const content = contentEncoded ? contentEncoded.textContent : '';
                    const rssDate = item.querySelector('pubDate').innerHTML;
                    // ADD-03 fix: wrap JSON.parse in try/catch so a malformed <children>
                    // element does not abort rendering of all subsequent feed items.
                    let children = {};
                    try {
                        children = JSON.parse(((_a = item.querySelector('children')) === null || _a === void 0 ? void 0 : _a.innerHTML) || '{}');
                    }
                    catch (_b) {
                        console.warn('WNR: Failed to parse <children> element JSON — skipping children for this item.');
                    }
                    this.data[feed.key].push({
                        // VULN-01 fix: HTML-escape the title so it is safe for innerHTML injection.
                        title: escapeHTML(title),
                        date: !!rssDate ? +new Date(rssDate) : null,
                        // VULN-03 fix: only allow http/https URLs; fall back to '#' for others.
                        postLink: isSafeURL(link) ? link : '#',
                        // VULN-02 fix: sanitize the HTML content to remove dangerous elements
                        // and event-handler attributes while preserving safe formatting markup.
                        description: sanitizeHTML(content
                            .replace(/<a\b((?:(?!target=)[^>])*)>/g, '<a$1 target="_blank">')
                            .replace(/<p>\s*<\/p>/g, '')),
                        children,
                    });
                });
                this.RSS.getCacheUtils().setSessionData(JSON.stringify(this.data[feed.key]), feed.key);
            }));
            yield Promise.all(fetchPromises);
            return this.data;
        });
    }
}
/**
 * The class for handling library trigger button and flyout elements.
 * It also provides some necessary methods that can be used during development.
 */
class WhatsNewRSSView {
    constructor(RSS) {
        this.RSS = RSS;
        this.createTriggerButton();
        this.createFlyOut();
    }
    getTriggerButtonID() {
        return `whats-new-rss-btn-${this.RSS.getID()}`;
    }
    getFlyoutID() {
        return `whats-new-rss-flyout-${this.RSS.getID()}`;
    }
    getFlyoutCloseBtnID() {
        return `whats-new-rss-flyout-close-${this.RSS.getID()}`;
    }
    getFlyoutMultiFeedNavID() {
        return `whats-new-rss-flyout-multi-feed-nav-${this.RSS.getID()}`;
    }
    setIsLoading(isLoading = false) {
        const flyoutWrapper = document.getElementById(this.getFlyoutID());
        if (isLoading) {
            flyoutWrapper.classList.add('is-loading');
        }
        else {
            flyoutWrapper.classList.remove('is-loading');
        }
    }
    setNotification(notificationsCount) {
        const notificationBadge = document.querySelector(`#${this.getTriggerButtonID()} .whats-new-rss-notification-badge`);
        if (!!notificationsCount) {
            if (this.RSS.isMultiFeedRSS()) {
                notificationBadge.innerHTML = '';
                notificationBadge.classList.add('is-multi-feed');
            }
            else {
                notificationBadge.innerHTML = notificationsCount > 9 ? "9+" : notificationsCount.toString();
            }
            notificationBadge.classList.remove('hide');
        }
        else {
            notificationBadge.classList.add('hide');
        }
    }
    createTriggerButton() {
        let button = '';
        const label = this.RSS.getArgs().triggerButton.label;
        if (!!label) {
            button = `
			${this.RSS.getArgs().triggerButton.beforeBtn}
			<a class="whats-new-rss-trigger-button has-label" id="${this.getTriggerButtonID()}">
				<div class="icon-badge">
					${this.RSS.getArgs().triggerButton.icon}
					<div class="whats-new-rss-notification-badge hide">0</div>
				</div>
				${label}
			</a>
			${this.RSS.getArgs().triggerButton.afterBtn}
			`;
        }
        else {
            button = `
			${this.RSS.getArgs().triggerButton.beforeBtn}
			<a class="whats-new-rss-trigger-button" id="${this.getTriggerButtonID()}">
				${this.RSS.getArgs().triggerButton.icon}
				<div class="whats-new-rss-notification-badge hide">0</div>
			</a>
			${this.RSS.getArgs().triggerButton.afterBtn}
			`;
        }
        this.RSS.getElement().innerHTML += button;
    }
    createFlyOut() {
        const wrapperClasses = [
            'whats-new-rss-flyout',
            'closed',
        ];
        if (this.RSS.getArgs().flyout.className) {
            wrapperClasses.push(this.RSS.getArgs().flyout.className);
        }
        let multiFeedNav = [];
        if (this.RSS.isMultiFeedRSS()) {
            multiFeedNav.push(`<nav id="${this.getFlyoutMultiFeedNavID()}" class="whats-new-rss-multi-feed-nav">`);
            this.RSS.getRSSFeedURLs().forEach((feed) => {
                multiFeedNav.push(`<button type="button" data-feed-key="${feed.key}">
						${feed.label}
						<div class="new-notification-count"></div>
					</button>
					`);
            });
            multiFeedNav.push('</nav>');
        }
        const flyoutWrapper = document.createElement('div');
        flyoutWrapper.setAttribute('id', this.getFlyoutID());
        flyoutWrapper.setAttribute('class', wrapperClasses.join(' '));
        flyoutWrapper.setAttribute('role', 'dialog');
        flyoutWrapper.setAttribute('style', 'visibility:hidden');
        flyoutWrapper.innerHTML = `
		<div class="whats-new-rss-flyout-contents">

			<div class="whats-new-rss-flyout-inner-header">

				<div class="whats-new-rss-flyout-inner-header__title-icon-wrapper">
					<h3>${this.RSS.getArgs().flyout.title}</h3>

					<span class="whats-new-rss-flyout-inner-header__loading-icon">
					${this.RSS.getArgs().loaderIcon}
					</span>
				</div>

				<button type="button" id="${this.getFlyoutCloseBtnID()}">${this.RSS.getArgs().flyout.closeBtnIcon}</button>
			</div>

			${multiFeedNav.join('')}

			<div class="whats-new-rss-flyout-inner-content">
				<div class="skeleton-container">
					<div class="skeleton-row whats-new-rss-flyout-inner-content-item"></div>
					<div class="skeleton-row whats-new-rss-flyout-inner-content-item"></div>
					<div class="skeleton-row whats-new-rss-flyout-inner-content-item"></div>
				</div>
			</div>

		</div>

		<div class="whats-new-rss-flyout-overlay"></div>
		`;
        document.body.appendChild(flyoutWrapper);
    }
    setMultiFeedTabNotificationCount(key, notificationCount = 0) {
        const tabBtn = document.querySelector(`#${this.getFlyoutMultiFeedNavID()} button[data-feed-key="${key}"]`);
        if (!tabBtn) {
            return;
        }
        const el = tabBtn.querySelector('.new-notification-count');
        if (notificationCount) {
            const _count = notificationCount > 9 ? '9+' : notificationCount;
            el.innerHTML = _count.toString();
        }
        else {
            el.innerHTML = '';
        }
    }
    innerContentWrapper(content, isNewPost = false, additionalClasses = '') {
        const classes = ['whats-new-rss-flyout-inner-content-item'];
        if (isNewPost) {
            classes.push('rss-new-post');
        }
        if (!!additionalClasses) {
            classes.push(additionalClasses);
        }
        return `
		<div class="${classes.join(' ')}">
			${isNewPost ? '<small class="new-post-badge">New ✨</small>' : ''}
			${content}
		</div>
		`;
    }
    createExcerpt(content, readMoreLink, options) {
        const { wordLimit, moreSymbol, readMore } = options;
        if (!wordLimit) {
            return content;
        }
        const plainText = content.replace(/<[^>]*>/g, '');
        const words = plainText.split(/\s+/);
        let rawExcerpt = words.slice(0, wordLimit).join(' ');
        if (moreSymbol) {
            rawExcerpt += moreSymbol;
        }
        if (wordLimit > words.length) {
            return content;
        }
        // VULN-03 fix: readMoreLink (item.postLink) is already validated at ingestion
        // time, so it is safe to use here. escapeHTML() is applied to the label in
        // case it contains special characters.
        if (!!readMoreLink && !!(readMore === null || readMore === void 0 ? void 0 : readMore.label)) {
            return `<p>${rawExcerpt} <a href="${readMoreLink}" target="_blank" class="${readMore.className}">${escapeHTML(readMore.label)}</a></p>`;
        }
        return `<p>${rawExcerpt}</p>`;
    }
    listChildrenPosts(children) {
        const _children = Object.values(children);
        if (!_children.length)
            return '';
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        const itemsWrapper = document.createElement('div');
        _children.forEach((child) => {
            const postContentDoc = new DOMParser().parseFromString(child.post_content, 'text/html');
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('sub-version-item');
            // VULN-04 fix: HTML-escape post_title before injecting into innerHTML.
            // post_content is safe: it passes through DOMParser + .textContent.
            itemDiv.innerHTML = `
				<div class="sub-version-header">
					<h4 class="sub-version-title">${escapeHTML(child.post_title)}</h4>
					<span class="sub-version-date">${this.formatDate(new Date(child.post_date))}</span>
				</div>
				<div class="sub-version-content">${postContentDoc.documentElement.textContent}</div>
			`;
            itemsWrapper.appendChild(itemDiv);
        });
        summary.innerHTML = '<p class="text-see-more">See More</p><p class="text-see-less">See Less</p>';
        details.appendChild(summary);
        details.appendChild(itemsWrapper);
        itemsWrapper.classList.add('sub-version-items-wrapper');
        details.classList.add('whats-new-rss-sub-version-details');
        return details.outerHTML;
    }
    formatDate(date) {
        if ('function' === typeof this.RSS.getArgs().flyout.formatDate) {
            return this.RSS.getArgs().flyout.formatDate(date);
        }
        const currentDate = new Date();
        const timestamp = date.getTime();
        const currentTimestamp = currentDate.getTime();
        const difference = currentTimestamp - timestamp;
        // Define time intervals in milliseconds
        const minute = 60 * 1000;
        const hour = minute * 60;
        const day = hour * 24;
        const week = day * 7;
        const month = day * 30; // Rough estimate, assuming 30 days in a month
        if (difference < minute) {
            return 'Just now';
        }
        else if (difference < hour) {
            const minutes = Math.floor(difference / minute);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        }
        else if (difference < day) {
            const hours = Math.floor(difference / hour);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        }
        else if (difference < week) {
            const days = Math.floor(difference / day);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
        else if (difference < month) {
            const weeks = Math.floor(difference / week);
            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        }
        else {
            // Handle months and years accordingly
            // This is a rough estimate and may not be accurate in all cases
            const months = Math.floor(difference / month);
            return `${months} month${months > 1 ? 's' : ''} ago`;
        }
    }
}
module.exports = WhatsNewRSS;
