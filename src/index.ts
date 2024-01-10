type RequiredArgs = {
	rssFeedURL: string,
	selector: string
}

type ConstructorArgs = Required<RequiredArgs> & {
	loaderIcon: string,
	triggerButton: {
		type: "link" | "button",
		icon: string,
		className: string,
		onClick: Function,
	},
	flyout: {
		title: string,
		className: string,
		onOpen: Function,
		onClose: Function,
		afterFetch: Function,
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
	triggerButton: {
		type: "link",
		icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.61703 13.1998C8.04294 13.1503 7.46192 13.125 6.875 13.125H6.25C4.17893 13.125 2.5 11.4461 2.5 9.375C2.5 7.30393 4.17893 5.625 6.25 5.625H6.875C7.46192 5.625 8.04294 5.59972 8.61703 5.55018M8.61703 13.1998C8.82774 14.0012 9.1031 14.7764 9.43719 15.5195C9.64341 15.9782 9.48685 16.5273 9.05134 16.7787L8.50441 17.0945C8.04492 17.3598 7.45466 17.1921 7.23201 16.7106C6.70983 15.5811 6.30451 14.3866 6.03155 13.1425M8.61703 13.1998C8.29598 11.9787 8.125 10.6968 8.125 9.375C8.125 8.05316 8.29598 6.77125 8.61703 5.55018M8.61703 13.1998C11.25 13.427 13.737 14.1643 15.9789 15.3124M8.61703 5.55018C11.25 5.323 13.737 4.58569 15.9789 3.43757M15.9789 3.43757C15.8808 3.12162 15.7751 2.80903 15.662 2.5M15.9789 3.43757C16.4247 4.87356 16.7131 6.37885 16.8238 7.93326M15.9789 15.3124C15.8808 15.6284 15.7751 15.941 15.662 16.25M15.9789 15.3124C16.4247 13.8764 16.7131 12.3711 16.8238 10.8167M16.8238 7.93326C17.237 8.2772 17.5 8.79539 17.5 9.375C17.5 9.95461 17.237 10.4728 16.8238 10.8167M16.8238 7.93326C16.8578 8.40942 16.875 8.8902 16.875 9.375C16.875 9.8598 16.8578 10.3406 16.8238 10.8167" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
		className: '',
		onClick: () => { },
	},
	flyout: {
		title: "What's New?",
		className: '',
		onOpen: () => { },
		onClose: () => { },
		afterFetch: () => { }
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
	private element: HTMLElement

	/**
	 * RSS Fetch instance.
	 */
	private RSS_Fetch_Instance: WhatsNewRSSFetch;

	/**
	 * RSS View instance.
	 */
	private RSS_View_Instance: WhatsNewRSSView;

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

		this.RSS_Fetch_Instance = new WhatsNewRSSFetch(this);
		this.RSS_View_Instance = new WhatsNewRSSView(this);

		this.setTrigger();
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
		});
	}

	private parseDefaults(args: ConstructorArgs) {
		this.args = {
			...WhatsNewRSSDefaultArgs,
			...args,
			triggerButton: {
				...WhatsNewRSSDefaultArgs.triggerButton,
				...args.triggerButton,
			},
			flyout: {
				...WhatsNewRSSDefaultArgs.flyout,
				...args.flyout,
			},
		};
	}

	public getArgs() {
		return this.args;
	}

	private setElement() {
		this.element = document.querySelector(this.args.selector);
	}

	public getElement() {
		return this.element;
	}

	private setID() {
		this.ID = btoa(JSON.stringify(this)).replace('==', '').slice(-12);
	}

	public getID() {
		return this.ID;
	}

	private setTrigger() {

		const triggerButton = document.getElementById(this.RSS_View_Instance.getTriggerButtonID());
		const flyout = document.getElementById(this.RSS_View_Instance.getFlyoutID());
		const flyoutInner = flyout.querySelector('.whats-new-rss-flyout-inner-content');
		const flyoutCloseBtn = document.getElementById(this.RSS_View_Instance.getFlyoutCloseBtnID());

		triggerButton.addEventListener("click", (e) => {
			e.preventDefault();

			this.args.triggerButton.onClick(e, this);

			this.RSS_View_Instance.setIsLoading(true);

			flyout.classList.remove('closed');
			flyout.classList.add('open');

			this.RSS_Fetch_Instance.fetchData()
				.then((data) => {
					data.forEach((item) => {
						flyoutInner.innerHTML += `
						<div class="whats-new-rss-flyout-inner-content-item">
							<h2>${item.title}</h2>
							<p>${item.description}</p>
						</div>
						`;
					});

					this.RSS_View_Instance.setIsLoading(false);

					flyout.focus();
				});
		});

		flyoutCloseBtn.addEventListener('click', (e) => {
			e.preventDefault();
			flyout.classList.add('closed');
			flyout.classList.remove('open');

			flyoutInner.innerHTML = '';

			flyout.blur();
		});
	}

}

class WhatsNewRSSFetch {

	private rssFeedURL: string = '';

	private response: Response;

	private data = [];

	constructor(RSS: WhatsNewRSS) {
		this.rssFeedURL = RSS.getArgs().rssFeedURL;
	}

	public async fetchData() {

		if (this.data.length) {
			return this.data;
		}

		this.response = await fetch(this.rssFeedURL);

		const data = await this.response.text();

		const _div = document.createElement('div');

		_div.innerHTML = data;

		const items = _div.querySelectorAll('item');

		items.forEach((item) => {
			this.data.push({
				title: item.querySelector('title').innerHTML,
				description: item.querySelector('content\\:encoded').innerHTML.replace(/<!--[\s\S]*?-->/g, ''),
			});
		});

		return this.data;
	}

}

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

	private createTriggerButton() {

		let button = `<a class="whats-new-rss-trigger-button" id="${this.getTriggerButtonID()}">${this.RSS.getArgs().triggerButton.icon}</a>`;

		this.RSS.getElement().innerHTML = button;
	}

	private createFlyOut() {

		const wrapperClasses = [
			'whats-new-rss-flyout',
			'closed',
			this.RSS.getArgs().flyout.className
		];

		let flyout = `
		<div class="${wrapperClasses.join(' ')}" id="${this.getFlyoutID()}" role="dialog">

			<div class="whats-new-rss-flyout-contents">

				<div class="whats-new-rss-flyout-inner-header">

					<div class="whats-new-rss-flyout-inner-header__title-icon-wrapper">
						<h3>${this.RSS.getArgs().flyout.title}</h3>

						<span class="whats-new-rss-flyout-inner-header__loading-icon">
						${this.RSS.getArgs().loaderIcon}
						</span>
					</div>

					<button type="button" id="${this.getFlyoutCloseBtnID()}">&times;</button>
				</div>

				<div class="whats-new-rss-flyout-inner-content"></div>

			</div>

			<div class="whats-new-rss-flyout-overlay"></div>
		</div>
		`;

		document.body.innerHTML += flyout;
	}

}
