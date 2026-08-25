---
title: "The index key that puts a comment on the wrong row"
slug: "react-list-keys"
description: "Using the array index as a key looks harmless until you delete a row. Then checkboxes tick the wrong item and inputs keep the wrong text. Here is what a key actually does."
date: "2026-08-08"
topic: "React"
tags:
  - lists
  - keys
  - rendering
---

You have a list of rows, each with a text input. Someone types in row three, then deletes row one. Their text is now in row two, or gone.

The classic version of this bug is one line long:

```jsx
{items.map((item, index) => (
  <Row key={index} item={item} />
))}
```

## The mental model

A key is not an id for your data. It is React's answer to one question, asked on every render:

**Is this the same component as the one that was here before?**

Same key means same component: keep its state, keep its DOM node, just update the props. Different key means a different component: throw the old one away, build a new one.

With `key={index}`, the key describes the position, not the thing. Delete the first item and everything shifts up. The component that used to be item 2 is now at index 1, so React sees "index 1 is still index 1" and keeps its state. The state stays put while the data moves under it.

## What goes wrong, concretely

Start with three rows: Apple, Banana, Cherry, using index keys. The user ticks the checkbox on Banana. Now delete Apple.

- Index 0 was Apple, now it is Banana. React keeps the DOM node and the local state, and swaps the label. The tick that belonged to Banana stays at index 0.
- The user sees Banana at the top, unticked, and Cherry in the middle, ticked.

The same applies to uncontrolled inputs, focus, scroll position inside the row, animation state, and anything held in `useState` inside the row component.

## The fix

Use something stable and unique to the item:

```jsx
{items.map((item) => (
  <Row key={item.id} item={item} />
))}
```

If your data has no id, make one when the item is created, not while rendering:

```js
const addItem = (text) => {
  setItems((current) => [...current, { id: crypto.randomUUID(), text }]);
};
```

`crypto.randomUUID()` is available in every current browser and in Node 19 and later. Generating the id in the reducer or the handler matters. Generating it during render gives you a new key every render, which unmounts and rebuilds the row every time, and that is the opposite problem.

## When index keys are fine

Three conditions, all at once:

1. The list never reorders.
2. Items are never inserted or removed except at the end.
3. The items have no state, no inputs, no focus to lose.

A static list of strings rendered as `<li>` qualifies. Anything a user can edit or reorder does not. If you are not sure, use a real id, because the cost of a stable key is nothing.

## Two related traps

**Do not use the array index inside a composite key.** `key={`${item.id}-${index}`}` reintroduces the position and undoes the fix.

**Do not use `Math.random()` as a key.** It changes every render, so React destroys and rebuilds the whole list every time. You lose focus on every keystroke, and the list gets slower rather than faster.

## Using key on purpose

The same rule is a useful tool. Changing a key deliberately resets a component:

```jsx
<CommentForm key={postId} postId={postId} />
```

Moving to a different post gives you a brand new form, with the draft, the validation errors, and the focus all reset. No effect needed, and nothing to forget.
