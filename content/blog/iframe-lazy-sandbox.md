---
title: "One embedded video cost me two seconds of load time"
slug: "iframe-lazy-sandbox"
description: "A YouTube embed pulls in about a megabyte before anyone presses play. Here is the lazy facade pattern, plus the sandbox and allow attributes that keep third party frames contained."
date: "2026-06-30"
topic: "HTML"
tags:
  - iframe
  - performance
  - security
---

You add one video embed to a landing page. The Lighthouse score drops 18 points. The page now loads about a megabyte of JavaScript from a domain you do not control, before anyone has decided whether to watch anything.

An iframe is a whole second web page inside yours. It has its own document, its own scripts, and its own network cost.

## Step one: stop loading it up front

```html
<iframe
  src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
  title="Product demo, 3 minutes"
  loading="lazy"
  width="560"
  height="315"
></iframe>
```

Three things here.

`loading="lazy"` defers the load until the frame is near the viewport. For anything below the fold this is a one attribute win.

`title` is required for accessibility. A screen reader announces the frame by its title, and "iframe" with no name is a dead end. Describe the content, not the technology.

`width` and `height` reserve the space so the page does not jump when the frame arrives.

## Step two: the facade, for embeds above the fold

Lazy loading does not help if the video is at the top of the page. Show an image, and only create the iframe when the user actually clicks.

```html
<button type="button" class="video-facade" id="play">
  <img src="/thumb.jpg" width="560" height="315" alt="" />
  <span>Play the product demo, 3 minutes</span>
</button>
```

```js
document.getElementById("play").addEventListener("click", (event) => {
  const frame = document.createElement("iframe");
  frame.src = "https://www.youtube-nocookie.com/embed/VIDEO_ID?autoplay=1";
  frame.title = "Product demo, 3 minutes";
  frame.allow = "autoplay; encrypted-media; picture-in-picture";
  frame.width = 560;
  frame.height = 315;
  event.currentTarget.replaceWith(frame);
});
```

The button is a real `<button>`, so it is keyboard reachable and announced properly. The thumbnail has `alt=""` because the button text already names the action.

This turns a megabyte on every page view into a megabyte only for people who watch. On a page where five percent of visitors press play, that is a large saving.

## Step three: contain what the frame can do

`sandbox` removes capabilities and then you add back only what is needed:

```html
<iframe
  src="https://example.com/widget"
  title="Pricing calculator"
  sandbox="allow-scripts allow-same-origin"
  loading="lazy"
></iframe>
```

An empty `sandbox` blocks scripts, forms, popups, top level navigation, and treats the content as a unique origin. Common tokens:

- `allow-scripts` lets it run JavaScript
- `allow-same-origin` keeps its own origin, needed for cookies and storage
- `allow-forms` lets it submit forms
- `allow-popups` lets it open windows

One warning that matters: `allow-scripts` together with `allow-same-origin` for a frame from *your own* origin lets the frame remove its own sandbox attribute. For untrusted content, serve it from a different origin.

`allow` is the other half, and it controls browser features rather than the document:

```html
allow="camera 'none'; microphone 'none'; geolocation 'none'; fullscreen"
```

Deny by default, grant only what the embed genuinely needs.

## Step four: check what it costs you

In DevTools, open the Network panel, filter by the third party domain, and load the page fresh. That number is what the embed costs every visitor.

Then decide. A support chat widget that loads 800KB on a marketing page is often better as a link to a contact form, and nobody misses it.

## The referrer detail

By default the frame gets your full URL in the Referer header, including path and query string. On a page like `/orders/1234/invoice`, that leaks something. Set:

```html
referrerpolicy="strict-origin-when-cross-origin"
```

Now the third party sees your domain, not the path.
