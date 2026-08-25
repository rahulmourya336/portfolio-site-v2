---
title: "Your CSS grid stretches past the screen with auto-fit"
slug: "grid-column-blowout"
description: "repeat(auto-fit, minmax(300px, 1fr)) is the pattern everyone copies. On a 320px phone it overflows. Here is why, and the one character that fixes it."
date: "2026-05-12"
topic: "CSS"
tags:
  - grid
  - responsive
  - overflow
---

This is the responsive grid everyone copies, and it is a good pattern:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
```

Then someone opens it on a 320px wide phone with 16px of page padding, and the cards spill off the right edge.

## The mental model

Read `minmax(300px, 1fr)` literally: **never smaller than 300px**, and grow to share the free space.

On a 288px wide container, "never smaller than 300px" still wins. The track stays 300px and the container overflows by 12px. CSS is doing exactly what you asked.

## The fix

Let the minimum bend when the container is smaller than it:

```css
.cards {
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
}
```

`min(300px, 100%)` reads as "300px, unless that is wider than the container, in which case the container width". On a wide screen it is 300px and behaves as before. On a narrow screen it becomes 100% and you get one column that fits.

That is the whole fix. It works everywhere `min()` works, which is every browser you support.

## auto-fit against auto-fill

These two look interchangeable and are not.

- `auto-fill` keeps the empty tracks. Three cards in a container wide enough for five leaves two empty columns, so the cards stay narrow and left aligned.
- `auto-fit` collapses the empty tracks to zero, so the three cards stretch to fill the row.

Use `auto-fit` when you want items to fill the row. Use `auto-fill` when you want a stable column rhythm, for example a calendar or a photo wall where items should not balloon.

## The other overflow: content wider than its track

Even with the fix above, a single long word or a wide `<pre>` block inside a card can push the track wider. That is the `min-width: auto` rule again: a grid item will not shrink below its content.

```css
.cards > * {
  min-width: 0;
}
```

For code blocks, give the overflow somewhere to go instead of letting it push the layout:

```css
.card pre {
  overflow-x: auto;
}
```

## A checklist for a grid that overflows

1. Is a track minimum larger than the container? Wrap it in `min(..., 100%)`.
2. Is an item's content wider than its track? Add `min-width: 0` to the items.
3. Is a `gap` pushing you over? `gap` is added between tracks, so five 300px tracks plus four 16px gaps needs 1564px, not 1500px.
4. Are you using `100vw` anywhere? `100vw` includes the scrollbar width on desktop, so it is wider than the page. Use `100%` inside a normal layout.

That fourth one catches people who build a full bleed section. If you need one, this is safer:

```css
.full-bleed {
  width: 100%;
  margin-inline: calc(50% - 50vw);
}
```

and even then, test it with a visible scrollbar on Windows before you ship it.
