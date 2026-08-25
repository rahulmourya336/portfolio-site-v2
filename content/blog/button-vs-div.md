---
title: "What you lose when a div pretends to be a button"
slug: "button-vs-div"
description: "A div with an onClick works for a mouse and fails for everyone else. Here is the full list of what the browser was doing for you, and what it costs to rebuild."
date: "2026-03-24"
topic: "HTML"
tags:
  - semantics
  - accessibility
  - buttons
---

This ships more often than it should:

```html
<div class="btn" onclick="save()">Save</div>
```

It works when you test it. You click, it saves. Then a keyboard user cannot reach it, a screen reader user does not know it exists, and a support ticket says "the save button does nothing".

## What the browser gives a real button

`<button>` is not styling. It is behaviour you would otherwise write yourself:

- It is in the tab order, with no `tabindex` needed.
- Enter and Space activate it. Space is the one people forget, and it is what most keyboard users press.
- It is announced as "Save, button", so the user knows it is actionable.
- It has a focus ring by default.
- Inside a form it submits, unless you set `type="button"`.
- It is disabled properly with the `disabled` attribute, which also removes it from the tab order.
- Windows High Contrast mode styles it as a control.

A div has none of that. It is a box with text.

## The honest rebuild

If you truly cannot use a button, this is the minimum:

```html
<div
  class="btn"
  role="button"
  tabindex="0"
  onclick="save()"
  onkeydown="if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); save(); }"
>
  Save
</div>
```

And you still do not get: form submission, the `disabled` attribute, or correct rendering in High Contrast mode. For `disabled` you now need `aria-disabled="true"` plus your own guard in the handler plus removing it from the tab order.

That is a lot of code to avoid one element.

## Button or link?

The rule is about what happens, not what it looks like.

- Goes somewhere, changes the URL, can be opened in a new tab: use `<a href>`.
- Does something on this page: use `<button>`.

A link with `href="#"` and a click handler is the same mistake in the other direction. Middle click opens a blank page, and the user's browser history fills with `#`.

Styling does not have to follow. A button can look like a link:

```css
.link-button {
  background: none;
  border: 0;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  text-decoration: underline;
}
```

## The type attribute

Inside a form, a `<button>` with no `type` is a submit button. This is the cause of the classic "clicking the delete icon reloads the page" bug.

```html
<form>
  <button type="button">Add row</button>
  <button type="submit">Save</button>
</form>
```

Set `type` on every button in a form. Every single one.

## Two more small wins

Buttons can sit outside the form they act on:

```html
<form id="settings">...</form>
<button type="submit" form="settings">Save settings</button>
```

And a button that only shows an icon still needs a name:

```html
<button type="button" aria-label="Delete row">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>
```

## How to find these in an existing codebase

```bash
grep -rn "onClick" src --include=*.tsx | grep -E "<(div|span)"
```

Every hit is a candidate. In my experience most of them can be changed to `<button type="button">` with a class, in one line each, and you delete keyboard handling code while you are there.
