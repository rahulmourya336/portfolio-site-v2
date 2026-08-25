---
title: "You pushed to the array and nothing rendered"
slug: "react-state-mutation-bug"
description: "React compares state with Object.is, so changing an array or object in place looks like no change at all. Here are the copy patterns, including the one for nested data."
date: "2026-08-24"
topic: "React"
tags:
  - state
  - immutability
  - rendering
---

You add an item and the list does not update:

```jsx
const [items, setItems] = useState([]);

const add = (item) => {
  items.push(item);   // the array now has it
  setItems(items);    // React does nothing
};
```

The data is correct. The screen is wrong. Sometimes it even appears later, when something unrelated triggers a render, which makes it look intermittent.

## The mental model

React decides whether to re-render by comparing the new state with the old one using `Object.is`. For objects and arrays, that compares identity, not contents.

`items.push(item)` changes the array in place. The identity is the same. So `setItems(items)` is passing React the value it already has, and React correctly concludes nothing changed.

The rule follows: **give React a new object, do not edit the old one.**

## Arrays

Do not use methods that change the array in place: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`.

```js
// add
setItems((current) => [...current, item]);

// remove
setItems((current) => current.filter((i) => i.id !== id));

// update one
setItems((current) =>
  current.map((i) => (i.id === id ? { ...i, done: true } : i)),
);

// insert at an index
setItems((current) => [
  ...current.slice(0, index),
  item,
  ...current.slice(index),
]);
```

For sorting and reversing, copy first, or use the newer methods that return a copy:

```js
setItems((current) => [...current].sort(byName));
setItems((current) => current.toSorted(byName)); // also toReversed, toSpliced, with
```

`toSorted` and friends are available in every current browser and in Node 20 and later.

## Objects, including nested ones

```js
setUser((current) => ({ ...current, name: "Rahul" }));
```

The spread is shallow, so nested objects need copying at each level you change:

```js
setUser((current) => ({
  ...current,
  address: { ...current.address, city: "Ahmedabad" },
}));
```

Three or four levels of this is a smell. Two ways out.

**Flatten the state.** Deeply nested state is usually a sign the shape is wrong. A map of items by id is easier to update than a tree.

**Or use a helper.** Immer lets you write the mutating version and produces a new object for you:

```js
setUser(
  produce((draft) => {
    draft.address.city = "Ahmedabad";
  }),
);
```

`useReducer` plus Immer covers most complicated state without hand written spreads.

## Why StrictMode surfaces this

In development React calls your component function, your state initialiser, and your reducer twice, then keeps one result. Code that mutates something outside itself runs twice and doubles its effect, so a mutation bug that hid before now shows up as duplicated items or a doubled counter.

That is a feature. A double render should be invisible. If it is not, something is mutating.

## The linter catches most of it

`eslint-plugin-react-hooks` will not flag mutation, but `eslint-plugin-immutable` or a simple review habit will. The one I use: any time I see a state variable on the left of an assignment or followed by `.push(`, I stop and copy instead.
