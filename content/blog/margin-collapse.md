---
title: "The margin that disappeared: collapsing margins in practice"
slug: "margin-collapse"
description: "You add margin-top to a child and the parent moves instead. That is margin collapsing. Here is when it happens, and the three ways to stop it."
date: "2026-04-28"
topic: "CSS"
tags:
  - box-model
  - spacing
  - layout
---

You have a card. You add `margin-top: 2rem` to the heading inside it. The heading does not move. The whole card moves down by 2rem, and the gap you wanted inside the card is not there.

Nothing is broken. This is margin collapsing, and it has been in CSS since the beginning.

## The mental model

Vertical margins that touch each other merge into one. The merged margin is the largest of them, not the sum.

Two boxes stacked with `margin-bottom: 20px` and `margin-top: 30px` between them end up 30px apart, not 50px.

The part that surprises people is that a parent and its first child also "touch", if nothing separates them. The child's top margin escapes the parent and becomes the parent's top margin.

## The three places it happens

**Between siblings**

```html
<p style="margin-bottom: 20px">One</p>
<p style="margin-top: 30px">Two</p>
```

Gap is 30px.

**Between a parent and its first or last child**

```html
<div class="card">
  <h2 style="margin-top: 2rem">Title</h2>
</div>
```

The card moves down by 2rem. The heading sits flush against the top of the card.

**On an empty element**

A `<div>` with no content, no height, no border and no padding collapses its own top and bottom margin into one.

## What stops it

Anything that puts something between the two margins:

- padding or a border on the parent
- `overflow` other than `visible` on the parent
- `display: flow-root` on the parent
- the parent being a flex or grid container
- absolute positioning or floats

Note what is not on the list: setting `height` or `width`. Those change nothing.

## Which fix to pick

**Padding on the parent** if the design already wants breathing room. Simple and honest.

```css
.card {
  padding: 1.5rem;
}
```

**`display: flow-root`** when you want the containment without changing the visual box. This is the modern replacement for the old `overflow: hidden` trick, and it does not clip anything.

```css
.card {
  display: flow-root;
}
```

**Flex or grid with `gap`** when you are laying out a stack anyway. Margins do not collapse between flex or grid items at all, so spacing becomes predictable.

```css
.stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
```

## The rule I actually follow

Set vertical spacing in one direction only. I use `margin-block-end` (or `margin-bottom`) on flow content, never `margin-top`, and let `gap` handle the rest.

```css
.prose > * + * {
  margin-block-start: 1.25em;
}
```

This is sometimes called the owl selector. Every element gets space above it except the first one, so there is no top margin to escape the parent, and no trailing margin at the bottom to fight with the parent's padding.

Once spacing is one directional, collapsing margins stop being something you debug. They are still there, they just never surprise you.
