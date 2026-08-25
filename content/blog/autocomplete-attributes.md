---
title: "The autocomplete tokens that fix mobile checkout"
slug: "autocomplete-attributes"
description: "autocomplete is not on or off. It is a list of specific tokens that let phones fill an address in one tap. Getting them right is the cheapest conversion win in a form."
date: "2026-06-16"
topic: "HTML"
tags:
  - forms
  - mobile
  - autofill
---

Watch someone buy something on a phone. They type their address with two thumbs, they make a typo in the postcode, and about a third of them give up.

Their phone already knows the address. It will fill the whole form in one tap, but only if your inputs say what they hold.

## The mental model

`autocomplete` is not a boolean. It is a vocabulary of about 50 defined tokens. The browser matches your token to a field in its own stored profile.

`autocomplete="on"` means "you work it out", and the browser falls back to guessing from the `name` attribute. Guessing is why your "Company" field gets filled with someone's first name.

## The address block

```html
<label for="name">Full name</label>
<input id="name" name="name" autocomplete="name" />

<label for="line1">Address line 1</label>
<input id="line1" name="line1" autocomplete="address-line1" />

<label for="line2">Address line 2</label>
<input id="line2" name="line2" autocomplete="address-line2" />

<label for="city">City</label>
<input id="city" name="city" autocomplete="address-level2" />

<label for="state">State</label>
<input id="state" name="state" autocomplete="address-level1" />

<label for="zip">Postcode</label>
<input id="zip" name="zip" autocomplete="postal-code" inputmode="numeric" />

<label for="country">Country</label>
<select id="country" name="country" autocomplete="country-name">...</select>
```

`address-level1` is the largest administrative area, state or province. `address-level2` is the city. The numbering runs from the top down, which is the part people misremember.

## Payment fields

```html
<input autocomplete="cc-name" />
<input autocomplete="cc-number" inputmode="numeric" />
<input autocomplete="cc-exp" placeholder="MM/YY" />
<input autocomplete="cc-csc" inputmode="numeric" />
```

If you split the expiry into two fields, use `cc-exp-month` and `cc-exp-year`. Do not use one field with a custom mask and hope autofill copes.

## Login and signup

This is where wrong tokens actively hurt.

```html
<!-- sign in -->
<input type="email" autocomplete="username" />
<input type="password" autocomplete="current-password" />

<!-- create account or change password -->
<input type="email" autocomplete="username" />
<input type="password" autocomplete="new-password" />
```

`current-password` tells a password manager to fill the saved one. `new-password` tells it to offer to generate one and to save what is typed. Get these backwards and password managers will overwrite the saved password with a value the user did not intend, or refuse to offer a strong one at signup.

Yes, the email field on a login form takes `username`. That is the correct token.

## One time codes

```html
<input
  autocomplete="one-time-code"
  inputmode="numeric"
  maxlength="6"
  name="otp"
/>
```

On iOS and Android this pulls the code straight out of the SMS notification. It takes ten seconds to add and it removes the worst step of every signup flow.

## Sections, for two addresses on one page

Prefix a token with `section-` and a name to keep two groups apart:

```html
<input autocomplete="section-billing address-line1" />
<input autocomplete="section-shipping address-line1" />
```

Without this the browser sees two fields wanting the same value and fills both with the same address.

## inputmode is the other half

`autocomplete` decides what gets filled. `inputmode` decides which keyboard appears when the user types manually.

- `inputmode="numeric"` for codes, postcodes, and card numbers: digits only, no spinner.
- `inputmode="tel"` for phone numbers: gives the phone keypad with the plus sign.
- `inputmode="email"` for email: puts the at sign on the main keyboard.
- `inputmode="decimal"` for amounts.

Prefer `type="text"` with `inputmode="numeric"` over `type="number"` for things that are not really numbers. Card numbers, postcodes, and OTPs are strings of digits: `type="number"` will strip leading zeros and add a spinner nobody wants.

## When to turn it off

Almost never. `autocomplete="off"` is ignored for passwords by most browsers, and for other fields it just makes people type more. The genuine cases are one time secrets and fields where filling in a stored value would be wrong, for example a field where a support agent enters a customer's details rather than their own.
