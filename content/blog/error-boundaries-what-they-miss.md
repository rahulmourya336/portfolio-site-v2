---
title: "Error boundaries do not catch the errors you expect"
slug: "error-boundaries-what-they-miss"
description: "Event handlers, async code, and the server are all outside an error boundary. Here is what it does cover, and how to handle the rest without a white screen."
date: "2026-08-23"
topic: "React"
tags:
  - errors
  - boundaries
  - resilience
---

You add an error boundary, feel safe, and then a failed save in a click handler still takes the page down to a blank screen.

Error boundaries cover less than most people assume. Knowing the boundary of the boundary is the whole trick.

## What it catches

Errors thrown **while React is rendering**, in the tree below it:

- during a component's render
- in a lifecycle method
- in a constructor

That is it.

## What it does not catch

- **Event handlers.** `onClick`, `onSubmit`, `onChange`. These run outside render.
- **Async code.** Anything after an `await`, inside `setTimeout`, or in a promise callback.
- **The boundary itself.** An error in the boundary's own render goes to the boundary above it.
- **Server rendering.** On the server you need the framework's error handling.

The reason is consistent: React can unmount a broken subtree during render because it controls that moment. It has no idea when your click handler throws three seconds later.

## The boundary

React still has no hook version, so this is a class. Write it once:

```jsx
class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    logToService(error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback ?? <p>Something went wrong.</p>;
    }
    return this.props.children;
  }
}
```

`getDerivedStateFromError` handles the display. `componentDidCatch` is where logging goes, and `info.componentStack` tells you which component threw, which is the part your logs usually lack.

The library `react-error-boundary` gives you the same thing plus a reset API, and is worth the dependency if you need retry.

## Where to put them

Not one at the root. A single boundary means any error anywhere takes out the whole page.

Put them at the seams where a broken piece can be shown as broken while the rest keeps working:

```jsx
<Layout>
  <ErrorBoundary fallback={<ChartError />}>
    <RevenueChart />
  </ErrorBoundary>

  <ErrorBoundary fallback={<FeedError />}>
    <ActivityFeed />
  </ErrorBoundary>
</Layout>
```

A failing chart should not remove the navigation.

## Handling the parts it misses

**Event handlers: try and catch, then state.**

```jsx
const [error, setError] = useState(null);

const save = async () => {
  try {
    await api.save(draft);
  } catch (err) {
    setError(err);
  }
};
```

**Or push it into the boundary on purpose,** if a failure really is fatal for that subtree. Throwing during the next render is what makes it visible to React:

```jsx
const [error, setError] = useState(null);
if (error) throw error;
```

**Unhandled rejections at the window level,** as a net for what you missed:

```js
window.addEventListener("unhandledrejection", (event) => {
  logToService(event.reason);
});
```

## Suspense is the other half

`Suspense` handles the waiting state, error boundaries handle the failure state. They are separate on purpose, and a data fetching component usually needs both:

```jsx
<ErrorBoundary fallback={<ProfileError />}>
  <Suspense fallback={<ProfileSkeleton />}>
    <Profile userId={id} />
  </Suspense>
</ErrorBoundary>
```

Order matters: the boundary goes outside, so a failure replaces the whole block instead of leaving a spinner running forever.

## One habit that pays

Give every fallback a way forward: a retry button, a link back, or a support reference. "Something went wrong" with no action is only marginally better than the blank screen it replaced.
