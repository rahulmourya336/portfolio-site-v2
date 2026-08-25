---
title: "Your effect runs twice in development, and that is the point"
slug: "useeffect-runs-twice"
description: "StrictMode mounts, unmounts, and mounts your component again. It is not a bug to work around. It is a test that finds effects with no cleanup, and here is how to pass it."
date: "2026-07-21"
topic: "React"
tags:
  - hooks
  - effects
  - strict-mode
---

You add a fetch in `useEffect`. The network tab shows two requests. You add a log. It prints twice. Production only does it once, so the usual reaction is to reach for a ref that blocks the second run.

Do not. The second run is a test, and if you fail it your component has a real bug that shows up in production too.

## What StrictMode actually does

In development, React mounts your component, runs the effect, runs the cleanup, and then runs the effect again. Three steps, on purpose.

The point is to simulate what happens when a component is mounted, unmounted, and mounted again. That happens in production all the time: a route change and back, a list that re-renders, a tab that closes and reopens. In React 18 and later it can also happen when state is restored.

If your effect works correctly for that sequence, it works. If it does not, you have a subscription that never gets removed, a timer that keeps running, or a request whose response arrives after the component is gone.

## The bad fix

```js
const didRun = useRef(false);

useEffect(() => {
  if (didRun.current) return;
  didRun.current = true;
  fetchData();
}, []);
```

This makes the symptom go away in development and keeps the bug. The effect still has no cleanup, so the real remount case, the one that happens to users, is still broken.

## The good fix, three patterns

**A subscription: return the unsubscribe.**

```js
useEffect(() => {
  const socket = createConnection(roomId);
  socket.connect();
  return () => socket.disconnect();
}, [roomId]);
```

Connect, disconnect, connect. The end state is one open connection, which is what you want.

**A fetch: ignore the stale response.**

```js
useEffect(() => {
  let ignore = false;

  (async () => {
    const data = await getUser(userId);
    if (!ignore) setUser(data);
  })();

  return () => {
    ignore = true;
  };
}, [userId]);
```

The first request still finishes, but its result is thrown away. This also fixes a race that has nothing to do with StrictMode: switching from user 1 to user 2 while request 1 is still in flight, and having request 1 land last and overwrite user 2.

**A fetch you want to cancel: AbortController.**

```js
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/users/${userId}`, { signal: controller.signal })
    .then((response) => response.json())
    .then(setUser)
    .catch((error) => {
      if (error.name !== "AbortError") setError(error);
    });

  return () => controller.abort();
}, [userId]);
```

Do not forget the `AbortError` check, or a cancelled request will show up as a failed one.

## The case where the effect should not be there at all

Often the double run is a hint that the code does not belong in an effect.

- Analytics on page view: an effect is right, and running twice in development is harmless.
- Sending a POST because the user clicked something: that belongs in the event handler, not an effect. It was never about the render.
- Computing a value from props or state: no effect at all. Calculate it during render.

That last one is the most common. If you find yourself writing an effect that only calls `setState`, look at it again before you look at StrictMode.

## Two things people get wrong about it

StrictMode only does this in development. Your production build runs the effect once. Do not disable StrictMode to make numbers look right in a development console.

And it is not only effects. React also calls your component function, your state initialiser, and your reducer twice in development, to find code that mutates something instead of returning new values. If a double render breaks your component, you are mutating something you should be copying.
