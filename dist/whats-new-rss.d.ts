/**
 * === Whats New RSS ===
 *
 * Version: 1.1.0
 * Generated on: 2nd March, 2026
 * Documentation: https://github.com/brainstormforce/whats-new-rss/blob/master/README.md
 */

type ConstructorArgs = {
    rssFeedURL: string | Array<{
        /**
         * Unique key for the feed. Must only contain letters, numbers, hyphens, and underscores.
         * Must not be populated from user input or untrusted sources.
         */
        key: string;
        label: string;
        url: string;
    }>;
    selector: string;
    uniqueKey: string;
    /**
     * Raw HTML string. Must be trusted, developer-provided content only.
     * Do NOT populate from user input or external data sources.
     */
    loaderIcon?: string;
    viewAll?: {
        link: string;
        label?: string;
    };
    triggerButton?: {
        label?: string;
        /**
         * Raw HTML string. Must be trusted, developer-provided content only.
         * Do NOT populate from user input or external data sources.
         */
        icon?: string;
        /**
         * Raw HTML string. Must be trusted, developer-provided content only.
         * Do NOT populate from user input or external data sources.
         */
        beforeBtn?: string;
        /**
         * Raw HTML string. Must be trusted, developer-provided content only.
         * Do NOT populate from user input or external data sources.
         */
        afterBtn?: string;
        className?: string;
        onClick?: ((RSS: WhatsNewRSS) => void);
    };
    notification?: {
        setLastPostUnixTime?: null | ((unixTime: number, key: string) => void);
        getLastPostUnixTime?: null | ((key: string, RSS: WhatsNewRSS) => number);
    };
    flyout?: {
        title?: string;
        innerContent?: {
            titleLink?: boolean;
            additionalClasses?: string[];
        };
        excerpt?: {
            wordLimit?: null | number;
            moreSymbol?: string;
            readMore?: {
                label?: string;
                className?: string;
            };
        };
        className?: string;
        /**
         * Raw HTML string. Must be trusted, developer-provided content only.
         * Do NOT populate from user input or external data sources.
         */
        closeBtnIcon?: string;
        closeOnEsc?: boolean;
        closeOnOverlayClick?: boolean;
        onOpen?: ((RSS: WhatsNewRSS) => void);
        onClose?: ((RSS: WhatsNewRSS) => void);
        onReady?: ((RSS: WhatsNewRSS) => void);
        formatDate?: null | ((date: Date) => string);
    };
};
/**
 * HTML-escapes a plain-text string so it is safe to interpolate into innerHTML.
 */
declare function escapeHTML(str: string): string;
/**
 * Returns true only for http: and https: URLs.
 * Rejects javascript:, data:, and any other protocol.
 */
declare function isSafeURL(url: string): boolean;
/**
 * Sanitizes an HTML string by removing dangerous elements and event-handler
 * attributes. Keeps safe formatting markup (p, strong, a, img, etc.) while
 * stripping scripts, iframes, and on* attributes.
 */
declare function sanitizeHTML(html: string): string;
declare const WhatsNewRSSDefaultArgs: ConstructorArgs;
declare class WhatsNewRSS {
    private ID;
    /**
     * User passed and default merged arguments.
     */
    private args;
    /**
     * HTML Element according to provided "selector".
     */
    private element;
    private rssFeedURLs;
    /**
     * RSS Fetch instance.
     */
    private RSS_Fetch_Instance;
    /**
     * RSS View instance.
     */
    private RSS_View_Instance;
    /**
     * Per-instance cache utility (fixes BUG-03 singleton issue).
     */
    private cacheUtils;
    /**
     * UnixTime stamp of the last seen or read post.
     */
    private lastPostUnixTime;
    /**
     * UnixTime stamp of the last seen or read post for multi feeds by feed key.
     */
    private multiLastPostUnixTime;
    /**
     * Total number of new notification counts.
     */
    private notificationsCount;
    /**
     * Notification counts for multi feeds by feed key.
     */
    private multiNotificationCount;
    /**
     * Check if has new feeds.
     */
    private hasNewFeeds;
    /**
     * Check if has new feeds in multi feeds mode.
     */
    private multiHasNewFeeds;
    /**
     * Guard to ensure the scrollbar-compensation CSS rule is inserted only once
     * per instance (fixes BUG-02 unbounded insertRule accumulation).
     */
    private _scrollbarRuleInserted;
    /**
     * Initialize our class.
     *
     * @param {ConstructorArgs} args
     */
    constructor(args: ConstructorArgs);
    /**
     * Validate the passed arguments in constructor.
     *
     * @param {ConstructorArgs} args
     */
    private validateArgs;
    /**
     * Parse the arguments passed by the user with the defaults.
     *
     * @param {ConstructorArgs} args
     */
    private parseDefaults;
    /**
     * Returns parsed args.
     *
     * @returns {ConstructorArgs}
     */
    getArgs(): ConstructorArgs;
    /**
     * Sets the HTML element queried using passed selector.
     */
    private setElement;
    /**
     * Returns the html element according to the selector.
     *
     * @returns {HTMLElement}
     */
    getElement(): HTMLElement;
    /**
     * Creates unique ID for current instance, that can be used by the library elements.
     */
    private setID;
    /**
     * Whether or not multiple feed urls is provided or not.
     *
     * @returns {boolean}
     */
    isMultiFeedRSS(): boolean;
    private setRSSFeedURLs;
    getRSSFeedURLs(): {
        key: string;
        label: string;
        url: string;
    }[];
    /**
     * Returns the current instance unique ID.
     *
     * @returns {string}
     */
    getID(): string;
    /**
     * Returns the per-instance cache utility.
     *
     * @returns {WhatsNewRSSCacheUtils}
     */
    getCacheUtils(): WhatsNewRSSCacheUtils;
    /**
     * Checks and counts new notification for the notification badge.
     */
    private setNotificationsCount;
    /**
     * Returns total number of new notifications.
     *
     * @returns {number}
     */
    getNotificationsCount(): number;
    /**
     * Sets the triggers for the library, eg: close, open, fetch.
     */
    private setTriggers;
}
/**
 * BUG-03 fix: converted from a static singleton to an instance-based class.
 * Each WhatsNewRSS instance creates its own WhatsNewRSSCacheUtils with its
 * own instanceID, preventing cache key collisions across multiple instances.
 */
declare class WhatsNewRSSCacheUtils {
    private instanceID;
    private keys;
    constructor(instanceID: string);
    private prefixer;
    private _setDataExpiry;
    private _isDataExpired;
    setSessionData(data: string, prefixKey?: string): void;
    getSessionData(prefixKey?: string): string;
    setLastPostUnixTime(unixTime: number, prefixKey?: string): void;
    getLastPostUnixTime(prefixKey?: string): number;
}
/**
 * Class for handling the data fetching.
 * It also handles the session caching of the fetched data internally.
 */
declare class WhatsNewRSSFetch {
    private RSS;
    private data;
    constructor(RSS: WhatsNewRSS);
    fetchData(): Promise<{
        [key: string]: {
            title: string;
            date: number | null;
            postLink: string;
            description: string;
            children: object;
        }[];
    }>;
}
/**
 * The class for handling library trigger button and flyout elements.
 * It also provides some necessary methods that can be used during development.
 */
declare class WhatsNewRSSView {
    private RSS;
    constructor(RSS: WhatsNewRSS);
    getTriggerButtonID(): string;
    getFlyoutID(): string;
    getFlyoutCloseBtnID(): string;
    getFlyoutMultiFeedNavID(): string;
    setIsLoading(isLoading?: boolean): void;
    setNotification(notificationsCount: number | false): void;
    private createTriggerButton;
    private createFlyOut;
    setMultiFeedTabNotificationCount(key: string, notificationCount?: number): void;
    innerContentWrapper(content: string, isNewPost?: boolean, additionalClasses?: string): string;
    createExcerpt(content: string, readMoreLink: string, options: ConstructorArgs['flyout']['excerpt']): string;
    listChildrenPosts(children: object): string;
    formatDate(date: Date): string;
}
