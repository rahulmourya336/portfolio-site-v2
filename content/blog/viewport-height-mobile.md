---
title: "100vh is wrong on mobile: use dvh, svh, and lvh"
slug: "viewport-height-mobile"
description: "A full height section on a phone gets cut off by the browser toolbar, or jumps when the toolbar hides. The new viewport units fix both, and each one solves a different problem."
date: "2026-03-31"
topic: "CSS"
tags:
  - viewport-units
  - mobile
  - layout
---

You write `height: 100vh` for a hero section. On desktop it is perfect. On a phone the bottom is cut off by the browser toolbar, or the section jumps by 60 pixels when you scroll and the toolbar slides away.

Both problems come from the same thing: on mobile the viewport has two sizes, and `vh` only knows one of them.

## The mental model

A mobile browser has a toolbar that hides when you scroll down and comes back when you scroll up. So the visible area has:

- a **small** size, when the toolbar is showing
- a **large** size, when the toolbar is hidden

`100vh` is the large size. It is fixed at page load and never changes. That is why content sits under the toolbar: the box is as tall as the page will ever get, not as tall as you can see right now.

## The four units

| Unit | Means | Changes while scrolling |
|---|---|---|
| `vh` | large viewport height | no |
| `lvh` | large viewport height | no |
| `svh` | small viewport height | no |
| `dvh` | dynamic, whatever is visible now | yes |

`dvh` sounds like the obvious winner, but it moves. If a section is sized in `dvh` it will resize as the toolbar appears and disappears, which makes text reflow mid scroll. That feels worse than a slightly short hero.

## What to use where

**A hero that must always be fully visible:** use `svh`. It is the pessimistic size, so nothing hides under the toolbar.

```css
.hero {
  min-height: 100svh;
}
```

**A fixed sheet or drawer pinned to the visible area:** use `dvh`. Here the resize is what you want, because the sheet should track the visible area.

```css
.sheet {
  position: fixed;
  inset: auto 0 0 0;
  max-height: 80dvh;
  overflow-y: auto;
}
```

**A page that should never scroll internally, like a game canvas:** use `dvh` and accept the reflow, or lock the layout with `100svh` and let the extra strip stay empty.

## Always prefer min-height

`height: 100svh` clips content when a translation makes the text longer, or when someone bumps their font size. `min-height` gives you the same look and lets the box grow.

```css
.hero {
  min-height: 100svh; /* not height */
  display: grid;
  place-items: center;
}
```

## The old workaround, and when you still need it

Before these units the trick was to measure with JavaScript:

```js
const setVh = () => {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
};
setVh();
window.addEventListener("resize", setVh);
```

```css
.hero {
  min-height: calc(var(--vh, 1vh) * 100);
}
```

You do not need this any more for current browsers. `dvh`, `svh`, and `lvh` have been supported across Chrome, Safari, and Firefox since 2022. Keep the JavaScript only if you support something older, and even then treat it as a fallback that sits before the modern line:

```css
.hero {
  min-height: calc(var(--vh, 1vh) * 100);
  min-height: 100svh;
}
```

The second declaration wins wherever it is understood, and is ignored where it is not. That is the whole fallback pattern, no feature query needed.
