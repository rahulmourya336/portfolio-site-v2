---
title: "Animating an element to display none, without JavaScript timers"
slug: "animate-display-none"
description: "Fade outs get cut off because display none is not animatable. transition-behavior allow-discrete and @starting-style fix it in CSS, and here is the fallback that still works."
date: "2026-05-26"
topic: "CSS"
tags:
  - transitions
  - animation
  - dropdown
---

You write a fade for a dropdown:

```css
.menu {
  display: none;
  opacity: 0;
  transition: opacity 200ms;
}
.menu.is-open {
  display: block;
  opacity: 1;
}
```

Opening does nothing visible, it just appears. Closing does nothing either, it just vanishes. The transition is ignored in both directions.

## The mental model

A transition needs two values it can interpolate between: 0 and 1, 10px and 20px. `display` has no in between. There is no half of `none`. Properties like this are called discrete, and by default the browser skips the animation and flips the value at once.

Worse, on opening the element goes from `display: none`, where it is not rendered at all, to rendered with `opacity: 1`. There is no first frame at `opacity: 0` to start from, so there is nothing to animate.

## The modern fix, two pieces

```css
.menu {
  display: none;
  opacity: 0;
  transition: opacity 200ms, display 200ms allow-discrete;
}

.menu.is-open {
  display: block;
  opacity: 1;
}

/* the frame the element starts from when it first renders */
@starting-style {
  .menu.is-open {
    opacity: 0;
  }
}
```

`allow-discrete` tells the browser to hold the discrete change until the correct end of the transition. Going in, `display: block` applies immediately so the fade is visible. Going out, `display: none` is delayed until the fade finishes.

`@starting-style` gives the browser a first frame for an element that was not rendered before. Without it you get a pop on open.

This works in Chrome, Edge, and Safari today, and in Firefox from version 129. Where it is not supported the element still opens and closes correctly, just with no fade. That is a good failure mode.

## The same trick for popover and dialog

```css
[popover] {
  opacity: 0;
  transition: opacity 200ms, overlay 200ms allow-discrete, display 200ms allow-discrete;
}
[popover]:popover-open {
  opacity: 1;
}
@starting-style {
  [popover]:popover-open {
    opacity: 0;
  }
}
```

`overlay` is the property that controls whether the element sits in the browser top layer. Add it to the transition list with `allow-discrete`, otherwise the element leaves the top layer instantly and your fade happens behind the page content.

## The fallback that still works everywhere

Keep the element rendered, and use `visibility` instead of `display`. `visibility` is discrete too, but it has a special rule: it can be transitioned, so the change waits until the end of the duration.

```css
.menu {
  visibility: hidden;
  opacity: 0;
  transition: opacity 200ms, visibility 0s 200ms;
}
.menu.is-open {
  visibility: visible;
  opacity: 1;
  transition: opacity 200ms, visibility 0s;
}
```

The trick is the delay. On the way out `visibility` waits 200ms before flipping to `hidden`. On the way in it flips at once.

Two things to know: a `visibility: hidden` element still takes up space in the layout, and it is correctly hidden from screen readers, so it is safe from an accessibility point of view.

## What not to do

Avoid this:

```js
element.classList.remove("is-open");
setTimeout(() => (element.style.display = "none"), 200);
```

The number in the timer and the number in the CSS drift apart the first time someone changes the duration, and you get a flash of a visible menu at the end of every close. If you must do it in JavaScript, listen for the event:

```js
element.addEventListener("transitionend", (event) => {
  if (event.propertyName === "opacity" && !element.classList.contains("is-open")) {
    element.style.display = "none";
  }
});
```

Check `propertyName`, because `transitionend` fires once per animated property and you will get several.
