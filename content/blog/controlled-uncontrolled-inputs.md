---
title: "A component is changing an uncontrolled input to be controlled"
slug: "controlled-uncontrolled-inputs"
description: "React's most confusing warning has one cause: value went from undefined to a string. Here is what controlled really means, and when uncontrolled is the better choice."
date: "2026-08-17"
topic: "React"
tags:
  - forms
  - state
  - inputs
---

The warning reads:

> A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen.

It usually appears after data loads. The form renders empty, the API responds, and the input suddenly has a value.

## The mental model

An input is **controlled** when React owns its value: you pass `value` and update it on change. The DOM node is a display of your state.

An input is **uncontrolled** when the DOM owns the value: you pass nothing, or only `defaultValue`, and read the value when you need it.

React decides which one an input is on the first render, by looking at whether `value` is `undefined`. Switching later is what triggers the warning, and it happens because your state started as `undefined`:

```jsx
const [user, setUser] = useState();        // undefined
...
<input value={user?.name} onChange={...} /> // undefined on the first render
```

## Three fixes

**Give it a defined starting value.** The simplest one, and usually right:

```jsx
const [name, setName] = useState("");
<input value={name} onChange={(e) => setName(e.target.value)} />
```

Never `useState(null)` for an input value. `null` also counts as uncontrolled.

**Fall back at the boundary.**

```jsx
<input value={user?.name ?? ""} onChange={...} />
```

**Do not render the form until the data is there.** Often the best user experience anyway, since a form that fills in half a second later loses whatever the user was typing:

```jsx
if (!user) return <FormSkeleton />;
return <ProfileForm key={user.id} user={user} />;
```

The `key` matters here. Without it, moving from one user to another reuses the same form and keeps the old draft.

## Uncontrolled is not the lazy option

For a form that only needs its values on submit, uncontrolled is less code and fewer renders:

```jsx
function ContactForm({ onSubmit }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        onSubmit(data);
      }}
    >
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" defaultValue="" required />
      <button>Send</button>
    </form>
  );
}
```

No state, no re-render per keystroke, and native validation works. The `name` attribute is what puts the field into `FormData`, so it is required here, not optional.

Reach for controlled inputs when you need the value *during* typing: live validation, a character counter, a filter that updates as you type, or one field that depends on another.

## Two smaller traps

**Resetting a form by clearing state.** If you have five pieces of state, clearing them one by one is easy to get wrong. Change the key instead and let React give you a fresh component.

**Checkboxes.** `value` does not control a checkbox. `checked` does. `<input type="checkbox" checked={done} onChange={...} />`, and the uncontrolled version is `defaultChecked`.

## React 19 note

React 19 added form actions and `useActionState`, which handle the submit, pending, and error cycle without hand written state:

```jsx
const [state, formAction, pending] = useActionState(submitContact, null);

<form action={formAction}>
  <input name="email" type="email" required />
  <button disabled={pending}>{pending ? "Sending..." : "Send"}</button>
</form>
```

The inputs stay uncontrolled and the action receives `FormData`. For most forms this is now the shortest correct version.
