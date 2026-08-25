---
title: "Centering that does not cut off the top of your content"
slug: "centering-that-survives-overflow"
description: "A centred modal looks fine until the content is taller than the screen. Then the top is unreachable and nobody can scroll to it. Safe alignment fixes it in one word."
date: "2026-07-07"
topic: "CSS"
tags:
  - alignment
  - overflow
  - modal
---

You centre a dialog:

```css
.overlay {
  display: grid;
  place-items: center;
  height: 100svh;
}
```

Perfect, until someone opens it on a small laptop with a long form inside. The dialog is taller than the viewport, so it overflows in both directions. The bottom you can scroll to. The top you cannot. The heading and the close button are off screen above the top edge, and there is no way to reach them.

## Why the top is unreachable

Centring puts equal overflow on both sides. The browser only lets you scroll towards the end of the content, never towards the start. Overflow above the starting edge is called *data loss* in the alignment spec, and that name is accurate: it is content you can see is missing and cannot get to.

## The one word fix

```css
.overlay {
  display: grid;
  place-items: safe center;
  height: 100svh;
}
```

`safe` means: centre while it fits, and fall back to `start` alignment as soon as the content would overflow. Nothing is ever pushed past the scrollable edge.

`unsafe` is the opposite and is the old default behaviour, if you ever need it explicitly.

Safe alignment is supported in Chrome, Edge, Safari, and Firefox. If you support something older, the pattern below does the same job without it.

## The version that works everywhere

Use auto margins on the child, inside a scrollable parent:

```css
.overlay {
  height: 100svh;
  overflow-y: auto;
  display: flex;
  padding: 1rem;
}

.dialog {
  margin: auto; /* centres while there is room, then stops */
}
```

Auto margins never take space that is not there, so a tall child sits at the top with the padding intact instead of being clipped.

That padding matters. Without it, a dialog that exactly fills the screen touches both edges and looks broken.

## The absolute positioning version

If you are stuck with absolute positioning, this is the safe shape:

```css
.dialog {
  position: fixed;
  inset: 0;
  margin: auto;
  width: min(640px, 100% - 2rem);
  max-height: calc(100svh - 2rem);
  overflow-y: auto;
}
```

`inset: 0` plus `margin: auto` centres in both directions. `max-height` with `overflow-y: auto` means the dialog itself scrolls when the content is long, and the page behind it stays put.

Avoid `top: 50%; transform: translateY(-50%)` for anything that can grow. It has the same unreachable top problem, and it can land on a half pixel and make text look blurry.

## Quick test before you ship

Open the centred thing, then set the browser window to about 500px tall, or add ten more fields to the form. If you cannot reach the first element, you have this bug. It takes ten seconds to check and it is the kind of thing that only ever shows up in a screenshot from a user on a small laptop.
