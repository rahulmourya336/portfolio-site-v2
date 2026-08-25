---
title: "z-index 9999 does nothing: stacking contexts explained"
slug: "z-index-not-working"
description: "Your dropdown still hides behind the header. Raising z-index does not help because the number is only compared inside one stacking context. Here is how to find the one trapping you."
date: "2026-03-17"
topic: "CSS"
tags:
  - z-index
  - stacking-context
  - debugging
---

A dropdown opens behind the sticky header. You set `z-index: 100`. Nothing. You set `z-index: 9999`. Still nothing. You set `999999` because at this point you are angry.

The number is not the problem. The comparison is.

## The mental model

Think of stacking contexts like floors in a building.

Inside one floor, `z-index` decides who stands in front. A person on floor 2 with `z-index: 1` is still above a person on floor 1 with `z-index: 9999`, because the whole floor is above the other floor. Nobody on floor 1 can climb over floor 2 by raising their own number.

Your dropdown is on a lower floor. It cannot reach the header no matter how large its number is.

## What creates a floor

An element creates a new stacking context when any of these is true:

- `position` is relative, absolute, or sticky **and** `z-index` is not `auto`
- `position: fixed`
- `opacity` is less than `1`
- `transform`, `filter`, `perspective`, `backdrop-filter`, or `will-change` on one of those
- `isolation: isolate`
- `contain: paint` or `content`
- it is a flex or grid item with a `z-index` other than `auto`

That list matters because half of those look harmless. A card with `opacity: 0.99` for a fade animation is a new floor. A section with `transform: translateZ(0)` added years ago "for smoothness" is a new floor.

## Finding the floor that traps you

Walk up from your element through each parent and stop at the first one that matches the list above. That element is your ceiling. Its `z-index`, not yours, is what competes with the header.

In DevTools this is faster than it sounds. Select the dropdown, then press the up arrow through the parents and watch the Computed panel for `opacity`, `transform`, `filter`, and `position` plus `z-index`.

Chrome also has a Layers panel that shows the tree directly.

## Three real fixes

**1. Raise the trapping parent, not the child.**

```css
/* the card was the ceiling all along */
.card.is-open {
  z-index: 60; /* above .header { z-index: 50 } */
}
```

**2. Take the element out of the subtree.**

Render the dropdown in a portal at the end of `<body>`, so it lives on the top floor with the header. This is what most component libraries do, and it is why their menus never have this bug.

**3. Use the top layer.**

A `<dialog>` opened with `showModal()` and any element using the Popover API render in the browser's top layer, which sits above every stacking context on the page. No `z-index` at all.

```html
<button popovertarget="menu">Options</button>
<div id="menu" popover>
  <button>Rename</button>
  <button>Delete</button>
</div>
```

That markup gives you a menu that cannot be trapped, with no JavaScript and no z-index arms race.

## One habit worth keeping

Give your app three or four named layers and stick to them:

```css
:root {
  --z-header: 50;
  --z-dropdown: 60;
  --z-modal: 70;
  --z-toast: 80;
}
```

Then when something goes wrong you are debugging four numbers, not forty. And when a number does not help, you now know to go looking for the floor.
