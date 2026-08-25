---
title: "section, div, or article: pick by the heading test"
slug: "sections-and-headings"
description: "HTML5 sectioning elements do less than most people think. One question decides which to use, and one old myth about heading levels still causes real bugs."
date: "2026-06-02"
topic: "HTML"
tags:
  - semantics
  - headings
  - structure
---

People wrap everything in `<section>` because it feels more semantic than `<div>`. Most of the time it changes nothing, and sometimes it makes the page worse.

Here is the rule I use, and the myth that causes the damage.

## The heading test

**Does this block of content have a heading?**

- Yes, and it is a self contained piece that would make sense on its own, for example a blog post or a comment: `<article>`.
- Yes, and it is a themed part of a larger page: `<section>`.
- No heading: `<div>`.

That is the whole decision. A `<section>` without a heading is announced by screen readers as an unnamed region, which adds noise and tells the user nothing.

If you do use a section, name it:

```html
<section aria-labelledby="pricing-heading">
  <h2 id="pricing-heading">Pricing</h2>
  ...
</section>
```

Now it appears in the landmarks list as "Pricing, region", which is genuinely useful for navigation.

## div is not a failure

`<div>` is the right element for a box that exists for layout or styling. Using it says "no meaning here", which is honest and correct. Swapping every `div` for a `section` does not improve accessibility, it just adds unnamed regions.

## The myth: the document outline

For years the advice was that you could use `<h1>` inside every `<section>` and browsers would compute the correct nesting. That outline algorithm was in the HTML spec, but no browser and no screen reader ever implemented it. It was removed from the spec in 2022.

So this page announces as five level one headings, which is exactly as confusing as it sounds:

```html
<section><h1>Features</h1></section>
<section><h1>Pricing</h1></section>
<section><h1>FAQ</h1></section>
```

Write real heading levels instead:

```html
<h1>Product name</h1>
<section aria-labelledby="features"><h2 id="features">Features</h2></section>
<section aria-labelledby="pricing"><h2 id="pricing">Pricing</h2></section>
```

## Heading rules that do matter

- One `<h1>` per page. It is the page title and screen reader users often jump straight to it.
- Do not skip levels going down. `h2` then `h4` leaves a hole in the structure. Going back up is fine, that is just the end of a subsection.
- Headings are for structure, not for size. If you want small text that is still a heading, use the right level and style it with CSS.

Most screen reader users navigate by pulling up a list of headings and jumping. If your headings are chosen for their font size, that list is nonsense.

## The landmarks worth having

A page needs a small set of these, once each:

```html
<header>site name and nav</header>
<nav aria-label="Main">...</nav>
<main id="main">
  <h1>Page title</h1>
  ...
</main>
<footer>...</footer>
```

- `<main>` once per page, holding the unique content. Screen reader users jump to it, and it is the target of your skip link.
- `<nav>` for major navigation blocks. If you have two, label them: `aria-label="Main"` and `aria-label="Footer"`.
- `<header>` and `<footer>` are landmarks at page level, and ordinary elements inside an `<article>` or `<section>`.
- `<aside>` for content that is related but not essential, like a sidebar of links.

## The skip link that goes with main

```html
<a class="skip-link" href="#main">Skip to content</a>
```

```css
.skip-link {
  position: absolute;
  top: -3rem;
  left: 1rem;
  transition: top 150ms;
}
.skip-link:focus {
  top: 0.75rem;
}
```

Hidden until focused, then the first thing a keyboard user reaches. On a site with a 20 link header, this saves someone 20 tab presses on every page.

## A quick audit

In DevTools, run this in the console:

```js
console.table(
  [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
    level: h.tagName,
    text: h.textContent.trim().slice(0, 60),
  })),
);
```

Read the list top to bottom. If it reads like a table of contents, your structure is right. If it does not, no ARIA attribute will save it.
