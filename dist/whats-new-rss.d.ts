/**
 * === Whats New RSS ===
 *
 * Version: 1.0.2
 * Generated on: 7th May, 2024
 * Documentation: https://github.com/brainstormforce/whats-new-rss/blob/master/README.md
 */

type ConstructorArgs = {
    rssFeedURL: string | Array<{
        key: string;
        label: string;
        url: string;
    }>;
    selector: string;
    loaderIcon?: string;
    viewAll?: {
        link: string;
        label?: string;
    };
    triggerButton?: {
        icon?: string;
        beforeBtn?: string;
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
        excerpt?: {
            wordLimit?: null | number;
            moreSymbol?: string;
            readMore?: {
                label?: string;
                className?: string;
            };
        };
        className?: string;
        closeBtnIcon?: string;
        closeOnEsc?: boolean;
        closeOnOverlayClick?: boolean;
        onOpen?: ((RSS: WhatsNewRSS) => void);
        onClose?: ((RSS: WhatsNewRSS) => void);
        onReady?: ((RSS: WhatsNewRSS) => void);
    };
};
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
declare class WhatsNewRSSCacheUtils {
    static instanceID: string;
    static keys: {
        LAST_LATEST_POST: string;
        SESSION: string;
    };
    static setInstanceID(instanceID: string): void;
    private static prefixer;
    static setSessionData(data: string, prefixKey?: string): void;
    static getSessionData(prefixKey?: string): string;
    static setLastPostUnixTime(unixTime: number, prefixKey?: string): void;
    static getLastPostUnixTime(prefixKey?: string): number;
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
            date: number;
            postLink: string;
            description: string;
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
    timeAgo(date: Date): string;
}
