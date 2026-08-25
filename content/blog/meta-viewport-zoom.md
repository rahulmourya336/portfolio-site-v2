---
title: "The viewport meta tag that breaks pinch to zoom"
slug: "meta-viewport-zoom"
description: "user-scalable=no and maximum-scale=1 are copied into projects every day. They fail an accessibility audit, and the bug they were added to fix has another cause."
date: "2026-07-14"
topic: "HTML"
tags:
  - viewport
  - mobile
  - accessibility
---

This line is in a lot of templates:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
```

The last two values stop people zooming. For anyone with low vision, that is the difference between using your site and closing it. It is also a direct failure of WCAG success criterion 1.4.4, which requires text to scale to 200%.

Use this instead:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

That is the whole tag. Two values, nothing else, for almost every site.

## What each part does

`width=device-width` tells the browser to make the layout viewport as wide as the screen. Without it, mobile browsers assume a 980px desktop page and shrink it, which is why an unstyled page looks tiny on a phone.

`initial-scale=1` sets the starting zoom to 100%, so one CSS pixel maps to one density independent pixel.

`maximum-scale` and `user-scalable` cap or block zooming. Safari on iOS has ignored them since iOS 10 for exactly this reason. Chrome on Android still honours them, so the harm is real.

## The bug people are actually fixing

`user-scalable=no` usually gets added for one of two reasons.

**Reason one: iOS zooms in when you focus an input.** Safari does this when the input font size is below 16px. That is the entire rule. Fix the font size, not the zoom:

```css
input,
select,
textarea {
  font-size: 16px; /* Safari will not zoom at 16px or larger */
}
```

You can keep the visual size you wanted by adjusting padding and line height instead.

**Reason two: a double tap zooms when they meant to tap twice.** Modern browsers removed the 300ms delay for pages that declare `width=device-width`, and the double tap behaviour is standard on the web. Leave it alone.

## The rest of the head that goes with it

```html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Page name, site name</title>
<meta name="description" content="One sentence about this page." />
<link rel="canonical" href="https://example.com/page" />
```

`charset` must be within the first 1024 bytes of the document, so it goes first. Otherwise the browser may start parsing with the wrong encoding and then restart.

## Notches and safe areas

If your layout goes edge to edge on a phone with a notch, add `viewport-fit=cover` and then pad your content back in with the environment variables:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

```css
.app-bar {
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

Without `viewport-fit=cover` those `env()` values are zero, which is a fine default. Only opt in when you actually paint under the system UI.

## Two related settings worth knowing

`interactive-widget` controls what happens to the viewport when the on screen keyboard opens:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, interactive-widget=resizes-content" />
```

`resizes-content` shrinks the layout viewport so a fixed bottom bar sits above the keyboard rather than behind it. Useful for chat interfaces.

And `theme-color` paints the browser chrome, with support for both schemes:

```html
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#08080b" media="(prefers-color-scheme: dark)" />
```

## The 20 second test

Open the site on a phone, or in device mode, and pinch. If nothing happens, find the viewport tag and delete everything after `initial-scale=1`. Then check whether an input still zooms on focus, and if it does, set its font size to 16px.
