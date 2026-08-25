---
title: "One card, three layouts: container queries instead of breakpoints"
slug: "container-queries"
description: "A card that looks right in the main column breaks in the sidebar. Media queries cannot help, because the screen did not change. Container queries can."
date: "2026-06-23"
topic: "CSS"
tags:
  - container-queries
  - responsive
  - components
---

You build a product card. Image on the left, text on the right. It looks good in the main column.

Then someone drops the same card into a 280px sidebar. The image and text are now squeezed into two useless slivers. You add a media query, but the screen is 1440px wide in both cases. The screen is not the thing that changed. The available space is.

## The mental model

A media query asks: how big is the window?

A container query asks: how big is the box I am in?

For a component that gets reused in different slots, the second question is the useful one. The card does not care about the phone or the laptop. It cares whether it has 280px or 700px to work with.

## The two steps

First, tell CSS which element is the box to measure:

```css
.card-slot {
  container-type: inline-size;
  container-name: card;
}
```

`inline-size` means "measure the width". That is what you want almost every time. `container-type: size` measures both width and height, and it requires the box to have a fixed height, which is usually not true.

Then query it:

```css
.card {
  display: grid;
  gap: 1rem;
}

@container card (min-width: 420px) {
  .card {
    grid-template-columns: 160px 1fr;
    align-items: start;
  }
}

@container card (min-width: 700px) {
  .card {
    grid-template-columns: 240px 1fr;
    gap: 2rem;
  }
}
```

One card, three layouts, no knowledge of the page it sits in.

## The rule that catches everyone

A container queries its ancestors, never itself. If you put `container-type: inline-size` on `.card` and then write `@container` rules that target `.card`, nothing happens.

That is why the example above puts the container on the slot and the layout rules on the card inside it. When in doubt, add one wrapper.

## Container query units

Inside a container you also get units relative to it:

- `cqw` is 1% of the container width
- `cqh` is 1% of the container height
- `cqi` and `cqb` are the inline and block versions

Useful for type that should scale with the component rather than the viewport:

```css
@container card (min-width: 420px) {
  .card h3 {
    font-size: clamp(1rem, 4cqi, 1.5rem);
  }
}
```

`clamp()` reads as `clamp(minimum, preferred, maximum)`. Here the heading grows with the card but never goes below 1rem or above 1.5rem.

## What it costs

`container-type: inline-size` applies `contain: layout inline-size style` to the element. Two practical effects:

- The container's height no longer depends on its children in the inline direction, which is what makes the measurement possible.
- The element becomes a containing block for absolutely positioned descendants, so an absolutely positioned child now anchors to it. This surprises people who had a child escaping the box on purpose.

Both are usually fine, but if a positioned overlay suddenly moves after you add a container, that is why.

## When to still use media queries

Container queries are for components. Media queries are still right for anything that is genuinely about the device or the window:

- overall page structure, for example whether the sidebar exists at all
- `prefers-reduced-motion` and `prefers-color-scheme`
- print styles

Rule of thumb I use: if the CSS belongs to a component that could appear in two different slots, it is a container query. If it belongs to the page shell, it is a media query.
