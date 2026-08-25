---
title: "Your flex item refuses to shrink, and min-width is why"
slug: "flex-item-wont-shrink"
description: "A long word or a wide table pushes your flex layout past the screen edge. The fix is one line, but only after you know what min-width auto does."
date: "2026-03-03"
topic: "CSS"
tags:
  - flexbox
  - layout
  - overflow
---

You build a two column layout with flexbox. It looks right. Then real data arrives, someone pastes a long URL, and the whole row grows wider than the screen. A horizontal scrollbar appears at the bottom of the page.

You set `width: 50%`. Still broken. You set `max-width: 100%`. Still broken.

Here is what is happening.

## The mental model

Every flex item has a floor it will not shrink below. By default that floor is not zero. It is the item's *content size*: the width of the widest thing inside it that cannot be broken up.

The spec calls this `min-width: auto`. On a normal block element `auto` means zero. On a flex item it means "as wide as my content needs".

So a 400 character URL with no spaces sets the floor at 400 characters wide. `flex: 1` says "share the leftover space". It never says "you are allowed to be smaller than your floor".

## The reproduction

```html
<div class="row">
  <div class="col">
    <p>https://example.com/a-very-long-path-that-never-breaks-anywhere-at-all</p>
  </div>
  <div class="col">Sidebar</div>
</div>
```

```css
.row {
  display: flex;
  gap: 1rem;
}
.col {
  flex: 1;
}
```

The first column blows past its share and the row overflows.

## The fix

```css
.col {
  flex: 1;
  min-width: 0;
}
```

That is it. You are telling the item its floor is zero, so `flex: 1` can finally do its job.

If the overflowing content is text you also want it to wrap somewhere sensible:

```css
.col p {
  overflow-wrap: anywhere;
}
```

`overflow-wrap: anywhere` breaks a long word at the box edge. `word-break: break-all` breaks every word, including short ones, which usually looks worse.

## The same bug in a column

In a column flex container the floor is on the other axis. A tall child inside `flex-direction: column` will not shrink below its content height, and you get the same overflow going down instead of across.

```css
.stack {
  display: flex;
  flex-direction: column;
}
.stack > * {
  min-height: 0;
}
```

This is the reason a scrollable panel inside a flex column often refuses to scroll and pushes the page instead.

## Grid has the same rule

Grid tracks also use `auto` as a minimum. A `1fr` column will not go below its content size, which is why this still overflows:

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 300px;
}
```

Fix it in the track definition:

```css
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
}
```

`minmax(0, 1fr)` reads as "somewhere between zero and one share of the free space". It is the grid spelling of `min-width: 0`.

## How to spot it fast

When a layout overflows and nothing you set on width helps, ask one question: is the overflowing box a flex item or a grid item? If yes, set `min-width: 0` (or `minmax(0, 1fr)`) first and check again. It fixes this specific bug more often than any other single line I know.
