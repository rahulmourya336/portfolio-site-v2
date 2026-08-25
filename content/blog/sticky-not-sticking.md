---
title: "position sticky does nothing: the four things to check"
slug: "sticky-not-sticking"
description: "Sticky headers fail silently. There is no error, the element just scrolls away. Work through these four causes in order and you will find it in under a minute."
date: "2026-04-14"
topic: "CSS"
tags:
  - position-sticky
  - layout
  - debugging
---

`position: sticky` has no error state. When it does not work, nothing tells you why. The element just scrolls off like any other.

Almost every failure is one of four things. Check them in this order.

## The mental model

A sticky element scrolls normally until it hits an offset you named, then it stops and stays there. It stops *inside its parent*, and only while the parent is on screen. When the parent scrolls out, the sticky child goes with it.

So sticky is really a deal between three parts: the element, the offset, and the parent's box.

## 1. You did not give it an offset

Sticky needs to know where to stop. Without `top`, `bottom`, `left`, or `right` it behaves like `position: relative` and nothing happens.

```css
.header {
  position: sticky;
  top: 0; /* required */
}
```

This is the most common one by a wide margin.

## 2. An ancestor has overflow that is not visible

If any parent between the sticky element and the scrolling box has `overflow: hidden`, `auto`, or `scroll`, that parent becomes the scroll container. The element now sticks inside *that* box, which is often exactly as tall as the element, so it never has room to move.

Find it fast in the console:

```js
let node = document.querySelector(".header").parentElement;
while (node) {
  const overflow = getComputedStyle(node).overflow;
  if (overflow !== "visible") console.log(node, overflow);
  node = node.parentElement;
}
```

Any line printed is a suspect. The usual culprit is an `overflow: hidden` added long ago to clear floats or to hide a decorative shape.

## 3. The parent is exactly as tall as the element

Sticky moves within the parent's content box. If the parent has no extra height, there is nowhere to travel.

This bites in grid and flex layouts, because a grid item is stretched to the row height by default. A sidebar that is the same height as its container cannot stick inside it.

```css
.sidebar {
  align-self: start; /* stop stretching, now there is room to move */
  position: sticky;
  top: 1rem;
}
```

## 4. A parent has a transform or filter

`transform`, `filter`, and `will-change` on an ancestor create a containing block. Position values then resolve against that ancestor instead of the viewport, and sticky positioning gets confused or stops entirely. Remove the transform, or move the sticky element outside that subtree.

## A working sidebar, end to end

```html
<div class="layout">
  <main>...long article...</main>
  <aside class="sidebar">
    <nav>...</nav>
  </aside>
</div>
```

```css
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 2rem;
  /* no overflow rules here */
}
.sidebar {
  position: sticky;
  top: 1rem;
  align-self: start;
  max-height: calc(100svh - 2rem);
  overflow-y: auto;
}
```

`align-self: start` gives it room to travel. `max-height` plus `overflow-y` keeps a long sidebar usable on short screens.

## One more thing: the gap under a sticky header

If your sticky header sits above anchored sections, add scroll padding so headings do not land under it:

```css
html {
  scroll-padding-top: 5rem; /* header height plus a little */
}
```

Without it, clicking a table of contents link puts the heading behind the header, and everyone assumes the link is broken.
