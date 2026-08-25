---
title: "The label your screen reader actually reads"
slug: "label-input-wiring"
description: "Placeholder text is not a label. Wrapping text in a div next to an input is not a label either. Here is what gets announced, and how to check it in 30 seconds."
date: "2026-03-10"
topic: "HTML"
tags:
  - forms
  - accessibility
  - labels
---

This looks labelled:

```html
<div class="field">
  <div class="field-label">Email address</div>
  <input type="email" placeholder="you@example.com" />
</div>
```

A screen reader announces it as "edit, blank". No field name. The user has an empty box and no idea what goes in it.

## The mental model

Every form control has an *accessible name*, one string the browser computes and hands to assistive technology. Visual proximity does not create it. Only specific mechanisms do.

The browser looks in this order, and stops at the first thing it finds:

1. `aria-labelledby`
2. `aria-label`
3. a `<label>` associated with the control
4. `title`
5. the `placeholder`, but only as a last resort, and it is not reliable

Placeholder is last for a reason: it disappears as soon as someone types, so it fails for everyone, not only screen reader users. Someone who is interrupted mid form comes back to an empty box with no name.

## The two correct ways

Explicit association, which is what I use nearly always:

```html
<label for="email">Email address</label>
<input id="email" type="email" name="email" autocomplete="email" />
```

The `for` attribute must match the input `id`, not its `name`. This is the most common typo in the whole subject.

Implicit association, where the label wraps the control:

```html
<label>
  Email address
  <input type="email" name="email" autocomplete="email" />
</label>
```

Both give you the second benefit people forget: clicking the label focuses the input. On mobile that turns a 12 pixel checkbox into a target you can actually hit.

## When there is no visible label

Search fields and icon buttons often have no text on screen. Use `aria-label`:

```html
<input type="search" name="q" aria-label="Search posts" />
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>
```

Note `aria-hidden="true"` on the icon. Without it some screen readers announce the SVG title as well, and the user hears the name twice.

## Grouping radio buttons and checkboxes

Each control needs its own label, and the group needs a name too. That is what `<fieldset>` and `<legend>` are for:

```html
<fieldset>
  <legend>Delivery speed</legend>

  <label><input type="radio" name="speed" value="standard" /> Standard, 3 to 5 days</label>
  <label><input type="radio" name="speed" value="express" /> Express, next day</label>
</fieldset>
```

Without the fieldset, a screen reader user hears "Standard, 3 to 5 days, radio button" with no idea what question it answers.

## Error messages that get announced

Point the input at its error text, and mark the input invalid:

```html
<label for="card">Card number</label>
<input
  id="card"
  name="card"
  inputmode="numeric"
  aria-describedby="card-error"
  aria-invalid="true"
/>
<p id="card-error">Card number must be 16 digits.</p>
```

`aria-describedby` is read after the label, so the user hears the name, then the state, then the hint. Use the same attribute for helper text when there is no error.

## The 30 second check

Open DevTools, select the input, open the Accessibility panel, and read the computed Name. If it is empty or says "you@example.com", the field is not labelled.

Do this once per form before you ship. It catches more real problems than any automated scan I have run.
