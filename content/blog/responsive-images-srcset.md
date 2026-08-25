---
title: "srcset and sizes: the part everyone gets wrong"
slug: "responsive-images-srcset"
description: "srcset alone does not save bandwidth. Without a correct sizes attribute the browser assumes your image is the full page width and downloads the largest file anyway."
date: "2026-05-05"
topic: "HTML"
tags:
  - images
  - performance
  - responsive
---

You add `srcset` with four widths, deploy, and the network panel still shows the 1600px file on a phone. Nothing improved.

The missing piece is `sizes`, and the default value is the trap.

## The mental model

The browser picks an image before it has done layout. It does not know your CSS yet. So it needs you to tell it, in advance, roughly how wide the image will be on screen.

That is what `sizes` is. When you leave it out, the browser assumes `100vw`, which means "as wide as the viewport". On a 400px phone with a 2x screen that is 800 device pixels, so it picks the 800px file or larger, even if the image is displayed in a 150px thumbnail.

## The width descriptor version

```html
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w, photo-1600.jpg 1600w"
  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
  width="1600"
  height="900"
  alt="Team standing in front of the new office"
/>
```

Read `sizes` as a list of rules, first match wins:

- viewport 1024px and up: the image is 360px wide
- viewport 640px and up: half the viewport
- otherwise: full viewport width

The `w` values in `srcset` describe the real pixel width of each file. The browser combines the two, multiplies by the device pixel ratio, and picks the smallest file that is still big enough.

`sizes` does not have to be perfect. It has to be close. Being 10% off costs you nothing. Leaving it out costs you the whole optimisation.

## Always set width and height

```html
<img ... width="1600" height="900" />
```

These are not the display size. CSS still controls that. They give the browser the aspect ratio so it can reserve the right space before the file arrives, which stops the page from jumping. That jump is measured by Cumulative Layout Shift and it is the easiest Core Web Vitals point you will ever score.

Pair it with:

```css
img {
  max-width: 100%;
  height: auto;
}
```

## Format switching with picture

Use `<picture>` when you need different *files* rather than different sizes, for example modern formats with a fallback:

```html
<picture>
  <source type="image/avif" srcset="hero.avif" />
  <source type="image/webp" srcset="hero.webp" />
  <img src="hero.jpg" width="1600" height="900" alt="" />
</picture>
```

The browser takes the first `<source>` it understands. AVIF is usually 30 to 50% smaller than WebP for photos, and WebP is smaller than JPEG. Order matters: put the best format first.

## Art direction is a different job

If the crop should change, not just the resolution, that is also `<picture>`:

```html
<picture>
  <source media="(max-width: 640px)" srcset="hero-square.jpg" />
  <img src="hero-wide.jpg" width="1600" height="900" alt="..." />
</picture>
```

A wide hero often loses its subject on a phone. This lets you ship a squarer crop for small screens.

## Loading and priority

- Above the fold hero: `fetchpriority="high"` and no lazy loading.
- Everything below the fold: `loading="lazy"`.
- Add `decoding="async"` to keep decoding off the main thread.

```html
<img src="hero.jpg" fetchpriority="high" decoding="async" ... />
<img src="thumb.jpg" loading="lazy" decoding="async" ... />
```

Do not set `loading="lazy"` on the hero. It delays your Largest Contentful Paint, which is exactly the image you want early.

## Alt text, quickly

- Meaningful image: describe what matters, not "image of".
- Decorative image: `alt=""`, empty and present. Leaving `alt` out entirely makes some screen readers read the file name aloud.
- Image inside a link with no other text: the alt text becomes the link name, so write it as a destination, for example "Read the full case study".
