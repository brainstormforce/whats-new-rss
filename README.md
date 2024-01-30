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

- `rssFeedURL` (string, required): URL of the RSS feed.
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

## Examples

### Basic Usage

```JS
const rss = new WhatsNewRSS({
  rssFeedURL: 'YOUR_RSS_FEED_URL',
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
    link: 'FULL_FEED_LINK',
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

      // Eg:
      return 1706191615000; // Example.
    }
  },
  flyout: {
    title: 'Latest Updates',
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
