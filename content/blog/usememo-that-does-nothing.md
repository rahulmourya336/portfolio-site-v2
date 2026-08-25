---
title: "Your useCallback is doing nothing without memo"
slug: "usememo-that-does-nothing"
description: "Wrapping every function in useCallback does not stop re-renders. It only helps when the child is memoised and every other prop is stable. Here is how to tell, and what to do instead."
date: "2026-08-11"
topic: "React"
tags:
  - performance
  - hooks
  - memoization
---

Someone opens a slow page, sees a lot of re-renders, and wraps every handler in `useCallback` and every value in `useMemo`. The page is not faster. It now has more code and more dependency arrays to keep correct.

Here is when memoisation does something, and when it is decoration.

## The mental model

When a component re-renders, all of its children re-render, whatever their props are. Props do not decide re-renders. Parents do.

`React.memo` is the opt out: a memoised component re-renders only if its props changed, compared with `Object.is`.

That comparison is where `useCallback` and `useMemo` come in. They keep the same reference between renders, so the comparison can pass.

Which gives the rule: **`useCallback` on a prop does nothing unless the receiving component is wrapped in `memo`.** No memo, no comparison, no benefit. Just a hook and a dependency array to maintain.

## The setup that actually works

All three parts have to be there.

```jsx
const Row = memo(function Row({ item, onSelect }) {
  return <li onClick={() => onSelect(item.id)}>{item.name}</li>;
});

function List({ items }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = useCallback((id) => setSelected(id), []);

  return (
    <ul>
      {items.map((item) => (
        <Row key={item.id} item={item} onSelect={handleSelect} />
      ))}
    </ul>
  );
}
```

`memo` on the child, a stable function, and stable objects. Miss one and the whole thing quietly stops working:

```jsx
<Row item={item} onSelect={handleSelect} style={{ padding: 8 }} />
```

That inline object is a new reference on every render, so the comparison fails every time and every row re-renders anyway. One careless prop undoes the lot.

## Cheaper fixes, in the order I try them

**1. Move state down.** If only one part of a big component uses a piece of state, push that state into a smaller component. The change then re-renders a small subtree instead of the page.

**2. Pass children through.** A component re-renders when its own state changes, but `children` handed in from above are the same elements as before, so they are not re-rendered.

```jsx
function Layout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Sidebar open={open} onToggle={() => setOpen(!open)} />
      {children}
    </div>
  );
}
```

Toggling the sidebar does not re-render `children`. No memo anywhere.

**3. Split the context.** One context holding both a value and its setter re-renders every consumer whenever the value changes, including the ones that only need the setter. Two contexts fix that.

**4. Then, if it is still slow, memo the expensive subtree.**

## Measure first

Open React DevTools, Profiler tab, turn on "Record why each component rendered", and click through the slow interaction. You get the list of components that re-rendered and the reason for each. Nine times out of ten it is one context, one changing object, or one component that should have been three.

A re-render is not automatically a problem. React re-rendering a hundred small components is often a millisecond. Chasing renders nobody can feel costs you readable code and buys nothing.

## What the compiler changes

The React Compiler, available from React 19, does this memoisation for you. Where it is enabled, hand written `useMemo` and `useCallback` become mostly redundant, and the right move is to remove them rather than add more.

Until it is turned on, the rule holds: memoise deliberately, in threes, after measuring.
