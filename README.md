# What's New RSS Library

## Overview

The **What's New RSS** library is a JavaScript library that allows you to easily integrate a "What's New?" section into your website or application. It fetches and displays the latest updates from an RSS feed in a customizable and user-friendly way.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Methods](#methods)
- [Examples](#examples)

## Installation

To use the library, download the `dist` folder in your project and include the following script tag in your HTML:

```HTML
<link rel="stylesheet" href="URL_TO_LIB_DIST/whats-new-rss.min.css">
<script src="URL_TO_LIB_DIST/whats-new-rss.min.js"></script>
```

## Usage

### Initialize the Library

```JS
const rss = new WhatsNewRSS({
  rssFeedURL: 'YOUR_RSS_FEED_URL',
  selector: 'YOUR_CONTAINER_SELECTOR',
  // Additional configuration options (optional)
});
```

### HTML Structure

The library expects a specific HTML structure. Ensure your container element has the required structure:

```HTML
<div id="YOUR_CONTAINER_SELECTOR">

  <!-- Trigger button will be added here automatically -->
</div>
```

## Configuration

The `WhatsNewRSS` class accepts the following configuration options:

- `rssFeedURL` (string | Array, required): URL of the RSS feed.
- `selector` (string, required): CSS selector for the container where the library will be rendered.
- `loaderIcon` (string, optional): SVG code for the loader icon.
- `viewAll` (object, optional): Configuration for the "View All" button.
  - `link` (string, required): Link to the full feed.
  - `label` (string, optional): Label for the "View All" button.
- `triggerButton` (object, optional): Configuration for the trigger button.
  - `icon` (string, required): SVG code for the trigger button icon.
  - `beforeBtn` (string, optional): HTML code to be inserted before the trigger button.
  - `afterBtn` (string, optional): HTML code to be inserted after the trigger button.
  - `className` (string, optional): Additional CSS class for the trigger button.
  - `onClick` (function, optional): Function to be executed on trigger button click.
- `notification` (object, optional): Configuration for notification handlers.
  - `setLastPostUnixTime` (function, optional): You can use this method to save the UnixTime in your server.
  - `getLastPostUnixTime` (function, optional): You can use this method to fetch the saved UnixTime from your server when needed.
- `flyout` (object, optional): Configuration for the flyout.
  - `title` (string, optional): Title of the flyout.
  - `excerpt` (object, optional): Configuration for the excerpt.
  - `wordLimit` (number | null, optional): Total length of the content to keep after trimming. Default is `500 words`. Provide `null` to disable excerpt.
  - `moreSymbol` (string, optional): Symbol to append after excerpt. Default: `&hellip;`: &hellip;
  - `readMore` (object | optional): Configuration for the excerpt read more link.
    - `label` (string | optional): Read more link label.
    - `className` (string | optional): Additional class read more link.
  - `className` (string, optional): Additional CSS class for the flyout.
  - `closeBtnIcon` (string, optional): SVG code for the close button icon.
  - `closeOnEsc` (boolean, optional): Close the flyout on ESC key press.
  - `closeOnOverlayClick` (boolean, optional): Close the flyout on overlay click.
  - `onOpen` (function, optional): Function to be executed on flyout open.
  - `onClose` (function, optional): Function to be executed on flyout close.
  - `onReady` (function, optional): Function to be executed on flyout ready.

## Methods

The `WhatsNewRSS` class provides the following methods:

- `getArgs()`: Returns the parsed configuration arguments.
- `getElement()`: Returns the HTML element according to the provided selector.
- `getID()`: Returns the unique ID for the current instance.
- `getNotificationsCount()`: Returns the total number of new notifications count.

## Examples

### Basic Usage

```JS
const rss = new WhatsNewRSS({
  rssFeedURL: 'YOUR_RSS_FEED_URL',
  selector: '#whats-new-container',
});
```

### Multi Feed Example
In multi-feed mode, you will pass `rssFeedURL` as an Array of objects, with properties:
```
{
	key: [string] (Required): Unique key for current feed tab,
	label: [string] (Required): Title for the current feed tab,
	url: [string] (Required): Feed url,
}
```

```JS
const rss = new WhatsNewRSS({
	rssFeedURL: [
		{
			key: "astra-theme",
			label: "Astra Theme",
			url: "https://wpastra.com/product/astra-theme/feed",
		},
		{
			key: "astra-pro",
			label: "Astra Pro",
			url: "https://wpastra.com/product/astra-pro-addon/feed",
		}
	],
	selector: '#whats-new-container',
});
```

### Custom Configuration

```JS
const rss = new WhatsNewRSS({
  rssFeedURL: 'YOUR_RSS_FEED_URL',
  selector: '#whats-new-container',
  loaderIcon: '<your-custom-loader-svg>',
  viewAll: {
	link: 'FULL_FEED_LINK', // When provided, the user will see a button by the label ( which we provide at viewAll > label ) at the end of the posts list.
	label: 'See All Updates',
  },
  triggerButton: {
	icon: '<your-custom-icon-svg>',
	className: 'custom-trigger-btn',
	onClick: (RSS) => {
	  console.log('Trigger button clicked!');
	},
  },
  notification: {
	setLastPostUnixTime: (unixTime) => {
	  // You can use this method to save the UnixTime in your server.
	},
	getLastPostUnixTime: (RSS) => {
	  // You can fetch saved "UnixTime" from your server.
	  // Must always return UnixTime.

	  // If you are using API call, using fetch or axios like libraries, then you can make this function asynchronous.

	  // Eg:
	  return 1706191615000; // Example.
	}
  },
  flyout: {
	title: 'Latest Updates',
	excerpt: {
		wordLimit: 500,
		moreSymbol: '&hellip;',
		readMore: {
			label: 'Read More',
			className: '',
		}
	},
	className: 'custom-flyout',
	closeBtnIcon: '<your-custom-close-icon-svg>',
	closeOnEsc: true,
	closeOnOverlayClick: true,
	onOpen: (RSS) => {
	  console.log('Flyout opened!');
	},
	onClose: (RSS) => {
	  console.log('Flyout closed!');
	},
	onReady: (RSS) => {
	  console.log('Flyout is ready!');
	},
  },
});
```

### Saving Last Post UnixTime at the server side ( Overriding library's notification handler )

Here, we'll explore a simple example of saving the latest post Unix time in the database using WordPress AJAX, organized by user ID. This enables us to display notification counts to users seamlessly, regardless of where they log in on their website.

#### Lets create an Ajax function in our PHP file:

```PHP
// File: ajax.php

add_action( 'wp_ajax_astra_debugger', function() {

	$user_id = get_current_user_id();

	if ( ! empty( $_GET['unixtime'] ) ) {
		wp_send_json_success( update_user_meta( $user_id, 'astra_debugger_last_post_unixtime', absint( $_GET['unixtime'] ) ) );
	}

	wp_send_json_success( get_user_meta( $user_id, 'astra_debugger_last_post_unixtime', true ) );
} );

```

#### Now, in our JS file:

```JS
// File: public.js

const rss = new WhatsNewRSS({
  rssFeedURL: 'https://zipwp.com/whats-new/feed',
  selector: '#ast-hf-menu-1',
  notification: {
	setLastPostUnixTime(unixtime) {
	  fetch(`http://YOUR_WEBSITE_DOMAIN/wp-admin/admin-ajax.php?action=YOUR_AJAX_ACTION&unixtime=${unixtime}`);
	},
	async getLastPostUnixTime(rss) {
	  let unixtime = 0;
	  await fetch(`http://YOUR_WEBSITE_DOMAIN/wp-admin/admin-ajax.php?action=YOUR_AJAX_ACTION`)
	  .then((res) => res.json())
	  .then((res) => {
		unixtime = res.data;
	  });

	  return unixtime;
	}
  }
});

console.log(rss);
```
