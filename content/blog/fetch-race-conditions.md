---
title: "The search box that shows results for the wrong query"
slug: "fetch-race-conditions"
description: "Type fast and a slow earlier request lands last, overwriting newer results. The fix is four lines. The better fix is not fetching in an effect at all."
date: "2026-08-14"
topic: "React"
tags:
  - data-fetching
  - effects
  - race-conditions
---

A search box fetches on every keystroke. You type "chair" quickly. The results show items for "cha". Refresh, type again, and it is correct. It only happens sometimes, which makes it hard to report and easy to dismiss.

It is a race, and it is guaranteed to happen at some point for every user on a slow connection.

## The mental model

Requests do not come back in the order you sent them.

You type five characters, so five requests go out. Request 3 hits a slow moment and takes 900ms. Request 5 comes back in 100ms. Your state gets request 5, then request 3, and the last write wins. The screen now shows results for a query the user has moved past.

Nothing in `fetch` or `useEffect` prevents this. You have to say which response is still wanted.

## The four line fix

```jsx
useEffect(() => {
  let ignore = false;

  (async () => {
    const results = await search(query);
    if (!ignore) setResults(results);
  })();

  return () => {
    ignore = true;
  };
}, [query]);
```

When `query` changes, React runs the cleanup from the previous effect before the new one. That flips `ignore` for the old request, so when its response lands it is dropped.

`ignore` is a plain variable, not a ref, and that is deliberate. Each effect run gets its own, which is exactly the scoping you want.

## Cancelling for real

`ignore` throws away the response but the request still finishes. To stop it on the wire:

```jsx
useEffect(() => {
  const controller = new AbortController();

  search(query, { signal: controller.signal })
    .then(setResults)
    .catch((error) => {
      if (error.name !== "AbortError") setError(error);
    });

  return () => controller.abort();
}, [query]);
```

Handle `AbortError` separately or every keystroke logs an error and your error state flickers.

## Add a debounce, not just a race fix

Cancelling still means one request per keystroke. Wait for a pause first:

```jsx
const [query, setQuery] = useState("");
const [debounced, setDebounced] = useState(query);

useEffect(() => {
  const id = setTimeout(() => setDebounced(query), 300);
  return () => clearTimeout(id);
}, [query]);

useEffect(() => {
  if (!debounced) return;
  let ignore = false;
  search(debounced).then((r) => !ignore && setResults(r));
  return () => {
    ignore = true;
  };
}, [debounced]);
```

The cleanup on the first effect is the debounce. Every keystroke clears the pending timer, so only a pause of 300ms lets it through.

## The waterfall next door

The other common bug is sequential fetching that should be parallel:

```js
const user = await getUser(id);        // 200ms
const posts = await getPosts(id);      // 200ms, waits for no reason
```

`getPosts` does not need the user, so both should go at once:

```js
const [user, posts] = await Promise.all([getUser(id), getPosts(id)]);
```

The component version of this is a parent that fetches, then renders a child that fetches. The child's request cannot start until the parent's finishes. Lift both to the same level, or fetch on the server.

## The honest recommendation

All of the above is what a data library does for you, correctly, plus caching, retries, deduplication, and refetch on focus. If you are writing this more than twice in an app, use TanStack Query or SWR, or move the fetch into a server component and pass the data down.

Fetching in `useEffect` is worth understanding because you will read a lot of it. It is rarely the code I would choose to write today.
