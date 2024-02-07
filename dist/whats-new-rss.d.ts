/**
 * === Whats New RSS ===
 *
 * Version: 1.0.2
 * Generated on: 7th February, 2024
 * Documentation: https://github.com/brainstormforce/whats-new-rss/blob/master/README.md
 */

type ConstructorArgs = {
    rssFeedURL: string;
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
        setLastPostUnixTime?: null | ((unixTime: number) => void);
        getLastPostUnixTime?: null | ((RSS: WhatsNewRSS) => number);
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
     * Total number of new notification counts.
     */
    private notificationsCount;
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
    static keys: {
        LAST_LATEST_POST: string;
        SESSION: string;
    };
    static setSessionData(data: string): void;
    static getSessionData(): string;
    static setLastPostUnixTime(unixTime: number): void;
    static getLastPostUnixTime(): number;
}
/**
 * Class for handling the data fetching.
 * It also handles the session caching of the fetched data internally.
 */
declare class WhatsNewRSSFetch {
    private rssFeedURL;
    private response;
    private data;
    constructor(RSS: WhatsNewRSS);
    fetchData(): Promise<{
        title: string;
        date: number;
        postLink: string;
        description: string;
    }[]>;
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
    setIsLoading(isLoading?: boolean): void;
    setNotification(notificationsCount: number | false): void;
    private createTriggerButton;
    private createFlyOut;
    innerContentWrapper(content: string, isNewPost?: boolean): string;
    createExcerpt(content: string, readMoreLink: string, options: ConstructorArgs['flyout']['excerpt']): string;
    timeAgo(date: Date): string;
}
