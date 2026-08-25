---
title: "Winning a specificity fight without !important"
slug: "specificity-without-important"
description: "Your override loses to a library rule. Reaching for !important starts an arms race you lose later. Cascade layers, :where(), and one honest audit work better."
date: "2026-06-09"
topic: "CSS"
tags:
  - cascade
  - specificity
  - architecture
---

You need to change a button colour. The component library ships `.btn.btn-primary` and you write `.checkout-btn`. Yours loses. You add `!important`. Six months later someone needs to override your override, and now two `!important` rules are shouting at each other.

There is a better order of operations.

## The mental model

Specificity is not one number. It is three, compared left to right:

```
(ids, classes and attributes and pseudo-classes, elements)
```

- `.btn.btn-primary` is `0, 2, 0`
- `.checkout-btn` is `0, 1, 0`
- `#checkout .btn` is `1, 1, 0`

The comparison runs column by column, it is not a sum. One id beats any number of classes, the same way one digit in the hundreds column beats any digits in the tens column.

`!important` is not part of that comparison at all. It moves the declaration into a separate bucket that is resolved first. That is why it feels like a cheat code, and why it is so hard to undo.

## Fix 1: cascade layers

Layers set precedence by origin instead of selector shape. A rule in a later layer beats a rule in an earlier layer even when the earlier one is more specific.

```css
@layer reset, vendor, components, utilities;

@layer vendor {
  .btn.btn-primary { background: #2563eb; } /* 0,2,0 */
}

@layer components {
  .checkout-btn { background: #16a34a; } /* 0,1,0 and it wins */
}
```

Import third party CSS straight into a layer:

```css
@import url("library.css") layer(vendor);
```

This is the highest value change you can make in an old codebase with specificity problems. Put the library in an early layer once, and every override you write afterwards gets simple again.

Anything outside a layer beats everything inside a layer, so unlayered legacy CSS keeps working while you migrate piece by piece.

## Fix 2: :where() for zero specificity

`:where()` always counts as zero. `:is()` counts as its most specific argument.

```css
/* both of these are 0,1,0 */
:where(.prose) h2,
:where(.prose) h3 { margin-block-start: 1.5em; }
```

Use it for base styles that should be easy to override later. Component authors should reach for it far more than they do.

## Fix 3: raise your own specificity honestly

If layers are not an option yet, match the shape instead of shouting:

```css
.checkout-btn.checkout-btn { background: #16a34a; } /* 0,2,0 */
```

Repeating a class is a deliberate, greppable way to add one point of specificity. It looks like a workaround, which is exactly right: it invites cleanup instead of hiding.

## When !important is actually correct

Two cases.

State utilities that must always win:

```css
.hidden { display: none !important; }
```

A `.hidden` helper that fails silently is worse than one that shouts.

And user level overrides, for example forcing reduced motion in your own app for people who ask for it.

Outside those two, treat `!important` as a bug report about your architecture, not a fix.

## A five minute audit

Open DevTools, select the element, read the Styles panel from top to bottom. Crossed out declarations are the rules that lost. The winner sits at the top. If the winner is not what you expected, look at its selector shape before writing any new CSS. Nine times out of ten the fix is moving a rule into a layer, not making your selector longer.
