type ConstructorArgs = {
	rssFeedURL: string | Array<{
		key: string,
		label: string,
		url: string,
	}>,
	selector: string,
	loaderIcon?: string,
	viewAll?: {
		link: string,
		label?: string,
	},
	triggerButton?: {
		icon?: string,
		beforeBtn?: string,
		afterBtn?: string,
		className?: string,
		onClick?: ((RSS: WhatsNewRSS) => void),
	},
	notification?: {
		setLastPostUnixTime?: null | ((unixTime: number, key: string) => void),
		getLastPostUnixTime?: null | ((key: string, RSS: WhatsNewRSS) => number),
	}
	flyout?: {
		title?: string,
		excerpt?: {
			wordLimit?: null | number,
			moreSymbol?: string,
			readMore?: {
				label?: string,
				className?: string,
			}
		},
		className?: string,
		closeBtnIcon?: string,
		closeOnEsc?: boolean,
		closeOnOverlayClick?: boolean,
		onOpen?: ((RSS: WhatsNewRSS) => void),
		onClose?: ((RSS: WhatsNewRSS) => void),
		onReady?: ((RSS: WhatsNewRSS) => void),
	}
}

const WhatsNewRSSDefaultArgs: ConstructorArgs = {
	rssFeedURL: '',
	selector: '',
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
		onOpen: () => { },
		onClose: () => { },
		onReady: () => { }
	}
}

class WhatsNewRSS {

	private ID: string;

	/**
	 * User passed and default merged arguments.
	 */
	private args: ConstructorArgs;

	/**
	 * HTML Element according to provided "selector".
	 */
	private element: HTMLElement;

	/**
	 * If current instance is for multi feed.
	 */
	private isMultiFeed: boolean;

	private rssFeedURLs: Array<{
		key: string,
		label: string,
		url: string,
	}> = [];;

	/**
	 * RSS Fetch instance.
	 */
	private RSS_Fetch_Instance: WhatsNewRSSFetch;

	/**
	 * RSS View instance.
	 */
	private RSS_View_Instance: WhatsNewRSSView;

	/**
	 * UnixTime stamp of the last seen or read post.
	 */
	private lastPostUnixTime = 0;

	/**
	 * UnixTime stamp of the last seen or read post for multi feeds by feed key.
	 */
	private multiLastPostUnixTime: {
		[key: string]: number,
	} = {};;

	/**
	 * Total number of new notification counts.
	 */
	private notificationsCount = 0;

	/**
	 * Notification counts for multi feeds by feed key.
	 */
	private multiNotificationCount: {
		[key: string]: number,
	} = {};

	/**
	 * Initialize our class.
	 *
	 * @param {ConstructorArgs} args
	 */
	constructor(args: ConstructorArgs) {
		this.validateArgs(args);
		this.parseDefaults(args);
		this.setElement();

		this.setID();

		this.isMultiFeed = 'string' !== typeof this.getArgs().rssFeedURL;

		this.setRSSFeedURLs();

		WhatsNewRSSCacheUtils.setInstanceID(this.getID());
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
	private validateArgs(args: ConstructorArgs) {
		["rssFeedURL", "selector"].map((requiredArg) => {
			if (!args[requiredArg]) {
				throw new Error(`${requiredArg} is a required argument. It cannot be empty or undefined.`);
			}

			switch (requiredArg) {
				case 'rssFeedURL':
					const arg = args[requiredArg];
					if (Array.isArray(arg)) {
						arg.forEach((rssFeedURL) => {
							if (!rssFeedURL?.key) {
								throw new Error(`The parameter "key" is required for "${requiredArg}" parameter in multi-feed mode.`);
							}

							if (rssFeedURL.key.includes(' ')) {
								throw new Error(`The parameter "key" cannot have spaces for "${requiredArg}" parameter in multi-feed mode. Ref Key: "${rssFeedURL.key}"`);
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
	private parseDefaults(args: ConstructorArgs) {
		this.args = {
			...WhatsNewRSSDefaultArgs,
			...args,
			viewAll: {
				...WhatsNewRSSDefaultArgs.viewAll,
				...args?.viewAll,
			},
			triggerButton: {
				...WhatsNewRSSDefaultArgs.triggerButton,
				...args?.triggerButton,
			},
			flyout: {
				...WhatsNewRSSDefaultArgs.flyout,
				...args?.flyout,
				excerpt: {
					...WhatsNewRSSDefaultArgs.flyout.excerpt,
					...args?.flyout?.excerpt,
				}
			},
		};
	}

	/**
	 * Returns parsed args.
	 *
	 * @returns {ConstructorArgs}
	 */
	public getArgs(): ConstructorArgs {
		return this.args;
	}

	/**
	 * Sets the HTML element queried using passed selector.
	 */
	private setElement() {
		this.element = document.querySelector(this.args.selector);
	}

	/**
	 * Returns the html element according to the selector.
	 *
	 * @returns {HTMLElement}
	 */
	public getElement(): HTMLElement {
		return this.element;
	}

	/**
	 * Creates unique ID for current instance, that can be used by the library elements.
	 */
	private setID() {
		const data = [this.getArgs().selector];
		const rssFeedURL = this.getArgs().rssFeedURL;

		if (Array.isArray(rssFeedURL)) {
			rssFeedURL.forEach((_rssFeedURL) => {
				data.push(_rssFeedURL.key);
			});
		} else {
			data.push(rssFeedURL);
		}

		this.ID = btoa(data.join('-')).slice(-12).replace(/=/g, '');
	}

	/**
	 * Whether or not multiple feed urls is provided or not.
	 * 
	 * @returns {boolean}
	 */
	public isMultiFeedRSS(): boolean {
		return this.isMultiFeed;
	}

	private setRSSFeedURLs() {

		const rssFeedURL = this.getArgs().rssFeedURL;

		if (!this.isMultiFeedRSS()) {
			this.rssFeedURLs.push({
				key: this.getID(),
				label: '',
				url: rssFeedURL.toString(),
			});
		} else {
			if (Array.isArray(rssFeedURL)) {
				rssFeedURL.forEach(_item => {
					this.rssFeedURLs.push(_item);
				});
			}
		}

	}

	public getRSSFeedURLs() {
		return this.rssFeedURLs;
	}

	/**
	 * Returns the current instance unique ID.
	 *
	 * @returns {string}
	 */
	public getID(): string {
		return this.ID;
	}

	/**
	 * Checks and counts new notification for the notification badge.
	 */
	private async setNotificationsCount() {
		this.lastPostUnixTime = ('function' === typeof this.getArgs().notification.getLastPostUnixTime) ? await this.getArgs().notification.getLastPostUnixTime(this.getID(), this) : +WhatsNewRSSCacheUtils.getLastPostUnixTime();

		this.RSS_Fetch_Instance.fetchData()
			.then((res) => {
				Object.keys(res).forEach((key) => {

					const data = res[key];

					if (!data.length) {
						return;
					}

					const currentPostUnixTime = +data[0].date;

					if (currentPostUnixTime > this.lastPostUnixTime) {

						data.forEach((item) => {
							if (item.date > this.lastPostUnixTime) {
								this.notificationsCount++;
							}
						});

						this.RSS_View_Instance.setNotification(this.notificationsCount);
					}
				});
			});

	}

	/**
	 * Returns total number of new notifications.
	 *
	 * @returns {number}
	 */
	public getNotificationsCount(): number {
		return this.notificationsCount;
	}

	/**
	 * Sets the triggers for the library, eg: close, open, fetch.
	 */
	private setTriggers() {

		const triggerButton = document.getElementById(this.RSS_View_Instance.getTriggerButtonID());
		const flyout = document.getElementById(this.RSS_View_Instance.getFlyoutID());
		const flyoutInner = flyout.querySelector('.whats-new-rss-flyout-inner-content');
		const flyoutCloseBtn = document.getElementById(this.RSS_View_Instance.getFlyoutCloseBtnID());

		/**
		 * Open flyout on trigger button click.
		 * Flyout has three states: `closed | open | ready`
		 */
		triggerButton.addEventListener("click", (e) => {
			e.preventDefault();

			this.getArgs().triggerButton.onClick(this);

			this.RSS_View_Instance.setIsLoading(true);

			flyout.classList.remove('closed');
			flyout.classList.add('open');
			document.body.classList.add('whats-new-rss-is-active');

			this.getArgs().flyout.onOpen(this);

			/**
			 * Fetch data on flyout open.
			 */
			this.RSS_Fetch_Instance.fetchData()
				.then((res) => {

					flyoutInner.innerHTML = '';

					Object.keys(res).forEach((key) => {

						const data = res[key];

						if (!data.length) {
							return;
						}

						const currentPostUnixTime = +data[0].date;

						data.forEach((item) => {

							const isNewPost = !!this.lastPostUnixTime ? item.date > this.lastPostUnixTime : false;
							const innerContent = `
								<div class="rss-content-header">
									<p>${this.RSS_View_Instance.timeAgo(new Date(item.date))}</p>
									<a href="${item.postLink}" target="_blank">
										<h2>${item.title}</h2>
									</a>
								</div>
								${this.RSS_View_Instance.createExcerpt(item.description, item.postLink, this.getArgs().flyout.excerpt)}
							`;

							flyoutInner.innerHTML += this.RSS_View_Instance.innerContentWrapper(innerContent, isNewPost);
						});

						if (this.getArgs().viewAll.link) {
							// If we have link provided for the view all button then append a view all button at the end of the contents.
							flyoutInner.innerHTML += this.RSS_View_Instance.innerContentWrapper(
							`
							<a href="${this.getArgs().viewAll.link}" class="button view-all">${this.getArgs().viewAll.label}</a>
							`
							)
						}

						this.RSS_View_Instance.setIsLoading(false);

						flyout.classList.add('ready');
						this.getArgs().flyout.onReady(this);

						/**
						 * Change focus to flyout on flyout ready.
						 */
						flyout.focus();

						// Set the last latest post date for notification handling.
						this.lastPostUnixTime = currentPostUnixTime;
						if ('function' === typeof this.getArgs().notification.setLastPostUnixTime) {
							this.getArgs().notification.setLastPostUnixTime(currentPostUnixTime, this.getID());
						} else {
							WhatsNewRSSCacheUtils.setLastPostUnixTime(currentPostUnixTime);
						}
					})

				});
		});

		/**
		 * Handle events for the closing of the flyout.
		 */
		const handleFlyoutClose = () => {
			flyout.classList.add('closed');
			flyout.classList.remove('open');
			flyout.classList.remove('ready');
			document.body.classList.remove('whats-new-rss-is-active');
			this.RSS_View_Instance.setNotification(false);

			flyoutInner.innerHTML = '';

			this.getArgs().flyout.onClose(this);

			/**
			 * Change focus back to trigger button after flyout close.
			 */
			triggerButton.focus();
		}

		if (this.getArgs().flyout.closeOnEsc) {
			document.addEventListener('keydown', function (e) {
				if ('Escape' !== e.key) return;
				if (!flyout.classList.contains('open')) return;
				handleFlyoutClose();
			});
		}

		if (this.getArgs().flyout.closeOnOverlayClick) {
			flyout.querySelector('.whats-new-rss-flyout-overlay').addEventListener('click', handleFlyoutClose);
		}

		flyoutCloseBtn.addEventListener('click', handleFlyoutClose);
	}
}

class WhatsNewRSSCacheUtils {

	static instanceID: string;

	static keys = {
		LAST_LATEST_POST: "whats-new-rss-last-lastest-post-unixtime",
		SESSION: "whats-new-rss-session-cache-response"
	}

	static setInstanceID(instanceID: string) {
		if (!this.instanceID) {
			this.instanceID = instanceID;
		}
	}

	private static prefixer(key: string, prefixKey = '') {
		if (!this.instanceID) {
			throw new Error('Instance ID not set.');
		}
		return !!prefixKey ? `${this.keys[key]}-${this.instanceID}-${prefixKey}` : `${this.keys[key]}-${this.instanceID}`;
	}

	static setSessionData(data: string, prefixKey = '') {
		return window.sessionStorage.setItem(this.prefixer('SESSION', prefixKey), data);
	}

	static getSessionData(prefixKey = '') {
		return window.sessionStorage.getItem(this.prefixer('SESSION', prefixKey));
	}

	static setLastPostUnixTime(unixTime: number, prefixKey = '') {
		return window.localStorage.setItem(this.prefixer('LAST_LATEST_POST', prefixKey), unixTime.toString());
	}

	static getLastPostUnixTime(prefixKey = '') {
		return +window.localStorage.getItem(this.prefixer('LAST_LATEST_POST', prefixKey));
	}
}

/**
 * Class for handling the data fetching.
 * It also handles the session caching of the fetched data internally.
 */
class WhatsNewRSSFetch {

	private RSS: WhatsNewRSS;

	private data: {
		[key: string]: {
			title: string;
			date: number | null;
			postLink: string;
			description: string;
		}[];
	} = {};

	constructor(RSS: WhatsNewRSS) {
		this.RSS = RSS;

		this.RSS.getRSSFeedURLs().forEach((feed) => {
			const sessionCache = JSON.parse(WhatsNewRSSCacheUtils.getSessionData(feed.key));

			if (sessionCache && sessionCache.length) {
				this.data[feed.key] = sessionCache;
			}
		});
	}

	public async fetchData() {
		if (Object.keys(this.data).length) {
			return this.data;
		}

		this.RSS.getRSSFeedURLs().forEach(async (feed) => {

			this.data[feed.key] = [];

			const response = await fetch(feed.url);

			const data = await response.text();

			const div = document.createElement('div');

			div.innerHTML = data.replace(/<link>(.*?)<\/link>/g, '<a class="whats-new-rss-post-link">$1</a>').replace(/\s*]]>\s*/g, '');

			const items = div.querySelectorAll('item');

			items.forEach((item) => {

				const rssDate = item.querySelector('pubDate').innerHTML;

				this.data[feed.key].push({
					title: item.querySelector('title').innerHTML,
					date: !!rssDate ? +new Date(rssDate) : null,
					postLink: item.querySelector('.whats-new-rss-post-link').innerHTML.trim(),
					description: item.querySelector('content\\:encoded').innerHTML,
				});
			});

			WhatsNewRSSCacheUtils.setSessionData(JSON.stringify(this.data[feed.key]), feed.key);

		});

		return this.data;
	}
}

/**
 * The class for handling library trigger button and flyout elements.
 * It also provides some necessary methods that can be used during development.
 */
class WhatsNewRSSView {

	private RSS: WhatsNewRSS;

	constructor(RSS: WhatsNewRSS) {
		this.RSS = RSS;

		this.createTriggerButton();
		this.createFlyOut();
	}

	public getTriggerButtonID() {
		return `whats-new-rss-btn-${this.RSS.getID()}`;
	}

	public getFlyoutID() {
		return `whats-new-rss-flyout-${this.RSS.getID()}`;
	}

	public getFlyoutCloseBtnID() {
		return `whats-new-rss-flyout-close-${this.RSS.getID()}`;
	}

	public setIsLoading(isLoading = false) {

		const flyoutWrapper = document.getElementById(this.getFlyoutID());

		if (isLoading) {
			flyoutWrapper.classList.add('is-loading');
		} else {
			flyoutWrapper.classList.remove('is-loading');
		}
	}

	public setNotification(notificationsCount: number | false) {

		const notificationBadge = document.querySelector(`#${this.getTriggerButtonID()} .whats-new-rss-notification-badge`);

		if (!!notificationsCount) {
			notificationBadge.innerHTML = notificationsCount > 9 ? "9+" : notificationsCount.toString();
			notificationBadge.classList.remove('hide');
		} else {
			notificationBadge.classList.add('hide');
		}
	}

	private createTriggerButton() {

		let button = `
		${this.RSS.getArgs().triggerButton.beforeBtn}
		<a class="whats-new-rss-trigger-button" id="${this.getTriggerButtonID()}">
			${this.RSS.getArgs().triggerButton.icon}
			<div class="whats-new-rss-notification-badge hide">0</div>
		</a>
		${this.RSS.getArgs().triggerButton.afterBtn}
		`;

		this.RSS.getElement().innerHTML += button;
	}

	private createFlyOut() {

		const wrapperClasses = [
			'whats-new-rss-flyout',
			'closed',
		];

		if (this.RSS.getArgs().flyout.className) {
			wrapperClasses.push(this.RSS.getArgs().flyout.className);
		}

		const flyoutWrapper = document.createElement('div');
		flyoutWrapper.setAttribute('id', this.getFlyoutID());
		flyoutWrapper.setAttribute('class', wrapperClasses.join(' '));
		flyoutWrapper.setAttribute('role', 'dialog');

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

	public innerContentWrapper(content: string, isNewPost: boolean = false) {

		const classes = ['whats-new-rss-flyout-inner-content-item'];

		if (isNewPost) {
			classes.push('rss-new-post');
		}

		return `
		<div class="${classes.join(' ')}">
			${isNewPost ? '<small class="new-post-badge">New ✨</small>' : ''}
			${content}
		</div>
		`;
	}

	public createExcerpt(content: string, readMoreLink: string, options: ConstructorArgs['flyout']['excerpt']) {

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

		if (!!readMoreLink && !!readMore?.label) {
			return `<p>${rawExcerpt} <a href="${readMoreLink}" target="_blank" class="${readMore.className}">${readMore.label}</a></p>`;
		}

		return `<p>${rawExcerpt}</p>`;
	}

	public timeAgo(date: Date) {
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
		} else if (difference < hour) {
			const minutes = Math.floor(difference / minute);
			return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
		} else if (difference < day) {
			const hours = Math.floor(difference / hour);
			return `${hours} hour${hours > 1 ? 's' : ''} ago`;
		} else if (difference < week) {
			const days = Math.floor(difference / day);
			return `${days} day${days > 1 ? 's' : ''} ago`;
		} else if (difference < month) {
			const weeks = Math.floor(difference / week);
			return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
		} else {
			// Handle months and years accordingly
			// This is a rough estimate and may not be accurate in all cases
			const months = Math.floor(difference / month);
			return `${months} month${months > 1 ? 's' : ''} ago`;
		}
	}
}
