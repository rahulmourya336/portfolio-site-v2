---
title: "Form validation without a validation library"
slug: "native-form-validation"
description: "The browser already validates required fields, emails, and number ranges. With :user-invalid and setCustomValidity you get good error handling and ship far less code."
date: "2026-04-07"
topic: "HTML"
tags:
  - forms
  - validation
  - javascript
---

A signup form with four fields does not need a validation library. The browser has one built in, and it is wired into the accessibility tree, works before your JavaScript loads, and costs zero bytes.

Here is how to use it properly, because the default experience does have two rough edges worth fixing.

## The base

```html
<form novalidate>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required autocomplete="email" />

  <label for="pw">Password</label>
  <input id="pw" name="pw" type="password" required minlength="8" autocomplete="new-password" />

  <label for="age">Age</label>
  <input id="age" name="age" type="number" min="13" max="120" />

  <button type="submit">Create account</button>
</form>
```

Each constraint attribute does real work: `required`, `minlength`, `maxlength`, `min`, `max`, `step`, `pattern`, and the input `type` itself.

## Why novalidate is there

`novalidate` turns off the browser's own error bubbles, not the validation. The API still works, `:invalid` still matches, `checkValidity()` still runs. You are only taking over the presentation.

That matters because the native bubbles disappear after a few seconds, cannot be styled, and only show one error at a time.

## The styling rule that makes it usable

Do not style `:invalid`. An empty required field is invalid from the moment the page loads, so the whole form is red before anyone has typed anything.

Use `:user-invalid` instead. It only matches after the user has interacted with the field or tried to submit.

```css
input:user-invalid {
  border-color: #dc2626;
}
input:user-invalid + .error {
  display: block;
}
```

`:user-invalid` is supported in Chrome, Edge, Safari, and Firefox. Older engines simply do not match it, so you get no red border rather than a broken form.

## Showing your own messages

```js
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
    showErrors();
    form.querySelector(":invalid")?.focus();
  }
});

function showErrors() {
  for (const field of form.elements) {
    if (!field.willValidate) continue;
    const error = document.getElementById(`${field.id}-error`);
    if (!error) continue;
    error.textContent = field.validationMessage;
    field.setAttribute("aria-invalid", String(!field.validity.valid));
    field.setAttribute("aria-describedby", `${field.id}-error`);
  }
}
```

Two details are doing a lot here. Focusing the first invalid field means keyboard and screen reader users are taken straight to the problem. `field.validationMessage` is the browser's own message, already translated into the user's language, which is a lot of localisation work you do not have to do.

## Custom rules and custom wording

`setCustomValidity` puts your own message into the same pipeline:

```js
const confirmField = document.getElementById("pw-confirm");

const checkMatch = () => {
  const mismatch = confirmField.value !== document.getElementById("pw").value;
  confirmField.setCustomValidity(mismatch ? "Passwords do not match." : "");
};

confirmField.addEventListener("input", checkMatch);
```

The empty string is important. It means valid. Forget it and the field stays invalid forever, which is a fun half hour of debugging.

## The pattern attribute

`pattern` takes a regular expression that must match the whole value. Always pair it with `title`, because some browsers use the title in the error message.

```html
<input
  name="postcode"
  pattern="[0-9]{6}"
  title="Six digits, for example 380015"
  inputmode="numeric"
/>
```

Note `inputmode="numeric"`, which gives phones a number keypad without the spinner behaviour of `type="number"`.

## What you still need a server for

All of this is a convenience for the user. None of it is security. Every constraint here can be removed in DevTools in five seconds, so validate on the server as well, always. Client validation exists to keep people from wasting a round trip, not to protect your database.
