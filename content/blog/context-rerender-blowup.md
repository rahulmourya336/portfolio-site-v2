---
title: "One context is re-rendering your whole app"
slug: "context-rerender-blowup"
description: "Context has no selectors. Every consumer re-renders when the value changes, even the ones using a field that did not. Splitting the context fixes most of it."
date: "2026-08-20"
topic: "React"
tags:
  - context
  - performance
  - state
---

You put the user, the theme, the cart, and a few setters into one `AppContext`. Months later, opening the cart drawer re-renders every screen in the app.

Context is a delivery mechanism, not a store. It has one rule and no way around it.

## The mental model

Every component that calls `useContext(X)` re-renders when X's value changes. There is no partial subscription, no "only when `cart` changes". The comparison is on the whole value, with `Object.is`.

So this re-renders every consumer on every render of the provider:

```jsx
<AppContext.Provider value={{ user, theme, cart, setCart }}>
```

The object literal is new each time, so even a component that reads only `theme` re-renders when the cart changes.

## Fix 1: memoise the value

The smallest step, and necessary but not sufficient:

```jsx
const value = useMemo(
  () => ({ user, theme, cart, setCart }),
  [user, theme, cart, setCart],
);
```

Now the provider re-rendering for an unrelated reason does not push a new object. But when `cart` genuinely changes, everyone still re-renders.

## Fix 2: split by change frequency

This is the real fix. Group values by how often they change, not by what feature they belong to.

```jsx
<ThemeContext.Provider value={theme}>
  <UserContext.Provider value={user}>
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  </UserContext.Provider>
</ThemeContext.Provider>
```

The theme changes twice a day. The cart changes constantly. They have no business sharing a subscription.

## Fix 3: split the value from the setters

Setters from `useState` and dispatch from `useReducer` are stable for the life of the component. Put them in their own context and a component that only writes will never re-render:

```jsx
const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
```

An "Add to cart" button calls `useCartDispatch()` only. It never re-renders when the cart changes, which is right: it does not display anything from the cart.

No `useMemo` needed either. `cart` and `dispatch` are already stable references.

## Fix 4: keep the provider from re-rendering

If the provider component itself re-renders for its own reasons, take `children` as a prop so the tree below is not rebuilt:

```jsx
function App() {
  return (
    <CartProvider>
      <Routes />   {/* created by App, not by CartProvider */}
    </CartProvider>
  );
}
```

## When to stop and use a store

Context is good for values that are read widely and written rarely: theme, locale, the signed in user, a feature flag set.

For state that changes often and is read by many components in different slices, a store with selector based subscriptions is a better fit. Zustand, Jotai, or Redux Toolkit all let a component subscribe to one field and skip renders when the rest changes. That is the thing context cannot do.

The signal that you have crossed the line: you are memoising context values, splitting providers three ways, and still watching unrelated components render in the profiler.
