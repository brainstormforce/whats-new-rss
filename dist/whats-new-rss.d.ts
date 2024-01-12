type RequiredArgs = {
    rssFeedURL: string;
    selector: string;
};
type ConstructorArgs = Required<RequiredArgs> & {
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
        onClick?: Function;
    };
    flyout?: {
        title?: string;
        className?: string;
        closeBtnIcon?: string;
        closeOnEsc?: boolean;
        closeOnOverlayClick?: boolean;
        onOpen?: Function;
        onClose?: Function;
        onReady?: Function;
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
     * Handles the hide/show of the notification badge of the trigger button.
     */
    private handleNotificationBadge;
    /**
     * Sets the triggers for the library, eg: close, open, fetch.
     */
    private setTriggers;
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
    fetchData(): Promise<any[]>;
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
    setNotification(hasNotification?: boolean): void;
    private createTriggerButton;
    private createFlyOut;
    innerContentWrapper(content: string): string;
    timeAgo(date: Date): string;
}
