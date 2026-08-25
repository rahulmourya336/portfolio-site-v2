---
title: "The dialog element gives you a focus trap for free"
slug: "dialog-element-focus"
description: "Hand rolled modals leak focus to the page behind them. The dialog element handles focus, Escape, the backdrop, and the top layer. Here is the small amount you still write."
date: "2026-04-21"
topic: "HTML"
tags:
  - dialog
  - accessibility
  - modal
---

Most hand written modals have the same three bugs. Tab moves focus to links behind the modal. Escape does nothing. Focus does not come back to the button that opened it.

`<dialog>` fixes all three, if you open it the right way.

## The minimum that works

```html
<button type="button" id="open">Delete account</button>

<dialog id="confirm">
  <form method="dialog">
    <h2>Delete account?</h2>
    <p>This cannot be undone.</p>
    <button value="cancel">Cancel</button>
    <button value="delete">Delete</button>
  </form>
</dialog>
```

```js
const dialog = document.getElementById("confirm");

document.getElementById("open").addEventListener("click", () => {
  dialog.showModal();
});

dialog.addEventListener("close", () => {
  if (dialog.returnValue === "delete") deleteAccount();
});
```

What you get without writing it:

- Focus moves into the dialog and cannot leave it while it is open.
- Escape closes it and fires the `close` event.
- Focus returns to the button that opened it.
- Everything behind it becomes inert, so clicks and screen reader browsing do not reach it.
- It renders in the top layer, above every stacking context, so no `z-index` battles.
- `::backdrop` gives you the dimmed layer.

`method="dialog"` on the form is what closes the dialog on submit and sets `returnValue` to the button's `value`.

## showModal, not show

`dialog.show()` opens a non modal dialog. No focus trap, no inert page, no backdrop. `dialog.showModal()` is the one you almost always want. Setting the `open` attribute in HTML does the same thing as `show()`, so avoid that too.

## Styling the backdrop and the box

```css
dialog {
  border: 0;
  border-radius: 12px;
  padding: 1.5rem;
  max-width: min(32rem, 100% - 2rem);
  max-height: calc(100svh - 2rem);
  overflow-y: auto;
}

dialog::backdrop {
  background: rgb(0 0 0 / 0.5);
  backdrop-filter: blur(2px);
}
```

A modal dialog is centred by the browser. `max-height` plus `overflow-y` keeps a long dialog scrollable rather than clipped.

## Closing when the backdrop is clicked

This is not built in. The trick is that a click on the backdrop has the dialog itself as its target, because the content sits inside a child element:

```js
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close("cancel");
});
```

For this to be reliable, wrap the dialog content in a single element and put the padding on that wrapper rather than on the dialog. Otherwise a click on the dialog padding closes it, which feels wrong.

## Stopping the page behind from scrolling

Also not built in:

```css
body:has(dialog[open]) {
  overflow: hidden;
}
```

`:has()` is supported everywhere now, so you can do this with no JavaScript at all. Read it as "a body that contains an open dialog".

## Choosing the first focused element

By default focus goes to the first focusable element in the dialog. For a destructive confirmation you usually want Cancel focused instead:

```html
<button value="cancel" autofocus>Cancel</button>
```

`autofocus` inside a dialog applies each time it opens, not only on page load.

## What about popover?

The Popover API covers the non modal cases: menus, tooltips, small overlays that should close when you click outside and should not trap focus.

```html
<button popovertarget="menu">Options</button>
<div id="menu" popover>...</div>
```

Rule of thumb: if the user must answer before continuing, use `showModal()`. If they can ignore it and carry on, use a popover.
