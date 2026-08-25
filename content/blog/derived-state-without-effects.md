---
title: "Delete the effect that copies props into state"
slug: "derived-state-without-effects"
description: "Syncing state with useEffect gives you an extra render, a flash of stale data, and two sources of truth. Most of the time you can calculate the value during render instead."
date: "2026-08-04"
topic: "React"
tags:
  - state
  - effects
  - rendering
---

This shape is everywhere:

```jsx
function ProductList({ products, query }) {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered(products.filter((p) => p.name.includes(query)));
  }, [products, query]);

  return <List items={filtered} />;
}
```

It works, mostly. It also renders twice for every change, shows the previous list for one frame, and gives you two things that can disagree.

## The mental model

State is for things React cannot work out on its own: what the user typed, whether the panel is open, what came back from the server.

Anything you can calculate from props and state is not state. It is a value. Calculate it while rendering.

```jsx
function ProductList({ products, query }) {
  const filtered = products.filter((p) => p.name.includes(query));
  return <List items={filtered} />;
}
```

One render. No stale frame. Nothing to keep in sync, because there is only one source of truth.

## But is that slow?

Usually not. Filtering a few hundred items takes a fraction of a millisecond, far less than the render it is part of.

Measure before you optimise, and if it really is slow, cache it rather than storing it:

```jsx
const filtered = useMemo(
  () => products.filter((p) => p.name.includes(query)),
  [products, query],
);
```

`useMemo` still runs during render, so the result is never out of date. It just skips the work when the inputs have not changed.

## The reset case

The other common effect is resetting state when a prop changes:

```jsx
useEffect(() => {
  setDraft("");
  setError(null);
}, [userId]);
```

There is a better tool: give the component a `key`. When the key changes, React unmounts the old component and mounts a fresh one, so all of its state starts over.

```jsx
<ProfileForm key={userId} userId={userId} />
```

No effect, no partially reset state, and it cannot be forgotten when someone adds a fourth piece of state next year.

## Adjusting state during render

Occasionally you need to change a piece of state when a prop changes, and only part of it. React supports setting state during render, as long as it is in the same component and guarded:

```jsx
function List({ items }) {
  const [selection, setSelection] = useState(null);
  const [prevItems, setPrevItems] = useState(items);

  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }
  ...
}
```

React throws away the render in progress and re-runs immediately, before anything reaches the screen, so there is no flash. It is still a last resort, and the `key` approach is better when it fits.

## When an effect is right

Keep the effect when you are talking to something outside React:

- a subscription to a store, a socket, or an event
- reading or writing the DOM directly, for example measuring an element
- analytics on view
- setting up a third party widget

The test I use: if removing the effect would only mean the screen shows something different, it was derived state. If removing it would leave a connection open or a listener attached, it is a real effect.
