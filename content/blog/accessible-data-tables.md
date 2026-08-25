---
title: "A data table a screen reader can actually read"
slug: "accessible-data-tables"
description: "Four attributes turn a grid of numbers into a table that announces which row and column each cell belongs to. Plus how to make a wide table scroll without breaking it."
date: "2026-05-19"
topic: "HTML"
tags:
  - tables
  - accessibility
  - data
---

A sighted user reads a table by moving their eyes up to the column header. A screen reader user cannot do that. The browser has to tell them which header a cell belongs to, and it can only do that if your markup says so.

Here is the difference between a table that works and one that reads as a wall of numbers.

## The markup that carries meaning

```html
<table>
  <caption>Monthly claim volume, 2026</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Claims filed</th>
      <th scope="col">Settled</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>5,120</td>
      <td>4,880</td>
    </tr>
    <tr>
      <th scope="row">February</th>
      <td>4,940</td>
      <td>4,710</td>
    </tr>
  </tbody>
</table>
```

Four things are doing the work.

`<caption>` is the table's name. It is announced when the user enters the table, and it is the first thing that tells them whether this is the table they want. It must be the first child of `<table>`.

`<th scope="col">` marks a column header. Now every cell below it is announced as "Claims filed, 5,120".

`<th scope="row">` marks the row header. The month is a label, not data, so it belongs in a `th`. Now a cell announces as "February, Settled, 4,710".

`<thead>` and `<tbody>` separate the header row from the data. This also means the header repeats on each page when the table is printed.

## Cells that span

For a cell that covers several columns or rows, `scope` has plural forms:

```html
<th scope="colgroup" colspan="2">Q1</th>
```

If a table needs more than that, with headers on two levels, use `id` and `headers`:

```html
<th id="q1-filed">Filed</th>
...
<td headers="q1 q1-filed">5,120</td>
```

This is verbose and easy to get wrong. It is also a signal: a table complex enough to need it is usually two tables that would each be clearer on their own.

## Do not use tables for layout

If you do, add `role="presentation"` so assistive technology ignores the structure:

```html
<table role="presentation">
```

The main place this still comes up is HTML email, where table layout remains the only reliable option.

## Making a wide table scroll properly

A wide table needs to scroll sideways, and the scroll container must be reachable by keyboard. Otherwise a keyboard user can see the container but cannot scroll it.

```html
<div class="table-scroll" tabindex="0" role="region" aria-label="Monthly claim volume">
  <table>...</table>
</div>
```

```css
.table-scroll {
  overflow-x: auto;
}
```

`tabindex="0"` puts the container in the tab order so it can receive arrow key scrolling. `role="region"` with a label tells the user what they have landed on. Chrome now adds focusability to scrollable regions on its own, but the explicit version is still the safe one.

## Sticky headers on a long table

```css
thead th {
  position: sticky;
  top: 0;
  background: white; /* needed, otherwise rows show through */
  z-index: 1;
}
```

Two gotchas. Sticky works on `th`, not on `thead` in older engines, so target the cells. And a background colour is required, because sticky elements do not get one for free.

## The one minute check

Turn on the screen reader you have. VoiceOver on macOS with Command and F5, Narrator on Windows with Control, Windows, and Enter. Move into the table and step through three cells.

If you hear the column name with each value, your markup is right. If you hear bare numbers, add `scope`.
