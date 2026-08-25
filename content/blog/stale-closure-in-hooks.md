---
title: "Your interval keeps reading the old state: stale closures"
slug: "stale-closure-in-hooks"
description: "A counter inside setInterval always logs zero. The state is fine, the function is old. Here is the mental model, and the three fixes worth knowing."
date: "2026-07-28"
topic: "React"
tags:
  - hooks
  - state
  - closures
---

You write a counter with an interval:

```jsx
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count); // always 0
      setCount(count + 1); // always sets 1
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>{count}</p>;
}
```

The display goes to 1 and stops. The log prints 0 forever. Nothing is broken in React. The problem is which function is still running.

## The mental model

Every render is a snapshot. React calls your component function, and everything created during that call, including `count` and every function that reads it, belongs to that snapshot.

`count` is not a live box you read from. It is a `const` captured at the moment that render happened.

Your effect ran once, on the first render, where `count` was 0. The callback you handed to `setInterval` came from that render. It will read 0 for as long as it lives, no matter how many renders happen afterwards. That is a stale closure: an old function, holding old values, still running.

## Fix 1: the updater function

If you only need the previous value, ask React for it instead of closing over it:

```js
setCount((current) => current + 1);
```

`current` is whatever the value is at the moment the update runs, not what it was when the function was created. This is the smallest fix and the one to reach for first.

```jsx
useEffect(() => {
  const id = setInterval(() => setCount((c) => c + 1), 1000);
  return () => clearInterval(id);
}, []);
```

## Fix 2: let the effect re-run

Put the value in the dependency array and let React tear down and set up again:

```jsx
useEffect(() => {
  const id = setTimeout(() => setCount(count + 1), 1000);
  return () => clearTimeout(id);
}, [count]);
```

Now every render gets a fresh timer with a fresh `count`. Correct, and fine for a timeout. For an interval it means clearing and recreating every second, which drifts, so prefer fix 1 there.

The general rule: if the effect uses a value, that value belongs in the dependency array. When the linter asks for a dependency you did not want to add, it is telling you the effect is closing over something. Removing the warning by deleting the dependency hides a stale closure.

## Fix 3: a ref for the latest value

When you truly need a long lived callback that always sees current values, keep them in a ref:

```jsx
const onTickRef = useRef(onTick);

useEffect(() => {
  onTickRef.current = onTick;
});

useEffect(() => {
  const id = setInterval(() => onTickRef.current(), 1000);
  return () => clearInterval(id);
}, []);
```

The interval is created once. The ref is updated after every render, so the call always goes to the newest function. This is the pattern behind most `useInterval` and `useEventCallback` helpers you will find.

Use it for callbacks that should not restart the effect, like an `onChange` prop. Do not use it to dodge dependencies in general: a ref read during render is not reactive, so nothing re-renders when it changes.

## Where else this bites

- An event listener added once in an effect, reading state.
- A `setTimeout` inside an event handler that reads state after an await.
- A debounced function created with `useMemo` and an empty dependency array.
- Anything passed to a third party library that holds onto the callback.

Same shape every time: a function that outlives the render it was created in. When a value looks stale, ask which render the running function came from.
