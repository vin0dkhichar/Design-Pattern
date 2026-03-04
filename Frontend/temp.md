---

# JavaScript, Async, React & Next.js – Interview Notes

---

## JavaScript Core Concepts

### 1. First-Class Functions

Functions in JavaScript are treated like values.

**Capabilities**

* Assigned to variables
* Passed as arguments
* Returned from other functions

**Why important**

* Enables callbacks, closures, higher-order functions, currying

```js
const greet = () => console.log("Hello");
function run(fn) {
  fn();
}
run(greet);
```

---

### 2. Execution Context & Call Stack

**Execution Context** = environment where JS runs
Each context contains:

* Variable Environment
* Lexical Environment
* `this` binding

**Types**

* Global Execution Context
* Function Execution Context

**Call Stack**

* Manages execution order
* LIFO (Last In, First Out)

```js
function a() { b(); }
function b() { console.log("b"); }
a();
```

Call stack: `global → a → b → pop b → pop a`

---

### 3. Hoisting & Temporal Dead Zone (TDZ)

**Hoisting**

* Declarations moved to top during compilation

| Keyword | Hoisted | Initialized |
| ------- | ------- | ----------- |
| `var`   | ✅       | `undefined` |
| `let`   | ✅       | ❌           |
| `const` | ✅       | ❌           |

**TDZ**

* Time between declaration and initialization of `let`/`const`
* Access before initialization → `ReferenceError`

```js
console.log(x); //  TDZ
let x = 10;
```

---

### 4. `this` (Regular vs Arrow Functions)

**Regular Function**

* `this` determined by call site

**Arrow Function**

* Lexically binds `this`
* Cannot be changed using `call/apply/bind`

```js
const obj = {
  name: "JS",
  regular() { console.log(this.name); },
  arrow: () => console.log(this.name)
};
```

---

### 5. Currying & Pure vs Impure Functions

**Currying**

* Converts multi-argument function into chained single-argument functions

```js
const add = a => b => a + b;
add(2)(3); // 5
```

**Pure Function**

* Same input → same output
* No side effects

**Impure Function**

* Depends on external state or mutates data

---

### 6. Debounce vs Throttle

| Feature   | Debounce     | Throttle          |
| --------- | ------------ | ----------------- |
| Execution | After delay  | At fixed interval |
| Use case  | Search input | Scroll, resize    |

```js
// debounce example
setTimeout(fn, delay);

// throttle example
setInterval(fn, interval);
```

---

### 7. Shallow vs Deep Copy

**Shallow Copy**

* Copies references
* Nested objects shared

```js
const copy = { ...obj };
```

**Deep Copy**

* Full recursive copy

```js
const deep = structuredClone(obj);
```

---

### 8. `undefined` vs `null`, Optional Chaining, Nullish Coalescing

* `undefined`: value not assigned
* `null`: intentional absence of value

```js
user?.profile?.name; // optional chaining
value ?? "default"; // nullish coalescing
```

`??` checks only `null` and `undefined` (not falsy values).

---

### 9. Garbage Collection & Weak References

**Garbage Collection**

* Automatic memory cleanup
* Uses reachability

**WeakMap / WeakSet**

* Keys are weakly referenced
* Garbage collected when no strong reference exists

Use case: caching, DOM element metadata

---

### 10. Streams, Backpressure & Event Loop

**Streams**

* Process data in chunks

**Backpressure**

* Prevents overwhelming consumers
* Producer slows when consumer is slow

**Event Loop**

* Manages:

  * Call stack
  * Microtasks (Promises)
  * Macrotasks (setTimeout, I/O)

---

### 11. Performance: De-optimization & Deleting Properties

**Why deleting object properties hurts performance**

* Breaks hidden classes
* Forces JS engine to re-optimize object
* Slower property access

```js
delete obj.key; // ❌ avoid
obj.key = undefined; // ✅ better
```

---

## Async & Architecture

### 1. Promises & Async Flow

**Promise states**

* pending
* fulfilled
* rejected

```js
async function fetchData() {
  try {
    const res = await fetch(url);
  } catch (e) {
    console.error(e);
  }
}
```

---

### 2. Throttling vs Diffusion

**Throttling**

* Limits rate of requests/events

**Diffusion**

* Spreads workload over time or nodes
* Used in distributed systems (load smoothing)

---

### 3. Preventing Starvation & Handling Concurrency

**Starvation**

* Some tasks never get CPU/time

**Solutions**

* Task prioritization
* Fair scheduling
* Worker pools
* Queues (BullMQ, RabbitMQ)

---

## React & Frontend Fundamentals

### 1. JSX & Reconciliation

**JSX**

* Syntax sugar for `React.createElement`

**Reconciliation**

* React compares Virtual DOM trees
* Updates only changed parts (diffing)

---

### 2. Component Lifecycle

**Mount**

* constructor → render → useEffect

**Update**

* render → useEffect (dependency change)

**Unmount**

* cleanup function in `useEffect`

---

### 3. Error Boundaries & Controlled vs Uncontrolled

**Error Boundaries**

* Catch render-time errors
* Only class components

**Controlled Component**

* State controlled by React

```js
<input value={state} onChange={...} />
```

**Uncontrolled Component**

* DOM manages state (`ref`)

---

### 4. Events in React & Looping Objects

**Synthetic Events**

* Cross-browser wrapper around native events

**Looping Objects**

```js
Object.entries(obj).map(([k, v]) => ...)
```

Keys are required in lists to help reconciliation.

---

### 5. `useEffect` Behaviour & Optimization

Runs:

* After render
* On dependency change
* Cleanup before next run/unmount

**Optimizations**

* Correct dependency array
* Split effects by responsibility
* Use `useMemo`, `useCallback`
* Avoid unnecessary state

---

## Next.js & Backend

### 1. Server Handling in Next.js

* Server Components
* Client Components
* API Routes
* Middleware
* Edge Runtime

Server handles rendering, caching, auth, data fetching.

---

### 2. API Methods

| Method | Purpose        |
| ------ | -------------- |
| GET    | Fetch data     |
| POST   | Create         |
| PUT    | Replace        |
| PATCH  | Partial update |
| DELETE | Remove         |

---

### 3. REST Structure & Optimization Thinking

**REST Principles**

* Resource-based URLs
* Stateless
* Proper HTTP methods

**Optimization**

* Pagination
* Caching
* Compression
* Proper status codes
* Avoid over-fetching



Got it 👍
I’ll give you **clean, interview-ready notes**, same **WHY / WHAT / WHEN / REAL-WORLD** style you like. You can literally revise from this before interviews.

---

# 🔹 React & JavaScript

---

## 1️⃣ `useState` & Why State Must Be Immutable

### What is `useState`?

* A React Hook to store **component-level state**
* Triggers **re-render** when state changes

```js
const [count, setCount] = useState(0);
```

### Why state updates should be **immutable**

❌ **Wrong (mutating state)**

```js
state.items.push(newItem);
setState(state);
```

✅ **Correct (immutable update)**

```js
setState(prev => [...prev, newItem]);
```

### WHY immutability matters

* React uses **reference comparison (Object.is)** to detect changes
* Mutation keeps the **same reference**
* React may **skip re-render**
* Breaks:

  * `React.memo`
  * `useEffect` dependencies
  * Time-travel debugging

### Real-world example

```js
setUser(prev => ({
  ...prev,
  address: {
    ...prev.address,
    city: "Bangalore"
  }
}));
```

---

## 2️⃣ `map`, `filter`, `reduce` — Do they create new data?

### Short answer

✅ **YES**, they return **new arrays**

### Why?

* They are **non-mutating** methods
* Preserve **immutability**
* Essential for React state updates

### Examples

```js
const arr = [1, 2, 3];

// map
const doubled = arr.map(n => n * 2);

// filter
const even = arr.filter(n => n % 2 === 0);

// reduce
const sum = arr.reduce((acc, n) => acc + n, 0);
```

### Important caveat ⚠️

* They create a **new array**
* BUT objects inside are **shallow-copied**

```js
arr.map(obj => {
  obj.x = 10; // ❌ mutates object
  return obj;
});
```

---

## 3️⃣ `Promise.all` – Working & Use Cases

### What it does

* Runs **multiple promises in parallel**
* Resolves when **ALL succeed**
* Rejects if **ANY fails**

```js
Promise.all([p1, p2, p3])
  .then(results => {})
  .catch(err => {});
```

### How it works internally

* Starts all promises **simultaneously**
* Waits for completion
* Returns results **in same order**

### Practical use cases

* Multiple API calls on page load
* Fetching dashboard data
* Parallel file uploads

```js
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
]);
```

### When NOT to use

* When APIs are **dependent**
* When partial success is acceptable → use `Promise.allSettled`

---

## 4️⃣ `useContext` vs `useMemo`

| Feature            | `useContext`            | `useMemo`                |
| ------------------ | ----------------------- | ------------------------ |
| Purpose            | Access shared state     | Memoize expensive values |
| Solves             | Prop drilling           | Performance              |
| Triggers re-render | Yes (on context change) | No (unless deps change)  |

### `useContext`

```js
const theme = useContext(ThemeContext);
```

✔ Global data
✔ Auth, theme, locale
❌ Overuse → unnecessary re-renders

### `useMemo`

```js
const total = useMemo(() => calcTotal(cart), [cart]);
```

✔ Heavy computations
✔ Derived values
❌ Not for side effects

---

# 🔹 Next.js

---

## 1️⃣ React vs Next.js

| React            | Next.js            |
| ---------------- | ------------------ |
| Client-side only | SSR, SSG, ISR      |
| Manual routing   | File-based routing |
| SEO harder       | SEO-friendly       |
| Needs config     | Production-ready   |

---

## 2️⃣ When & Why to use Next.js

### Use Next.js when:

* SEO matters
* Fast first load required
* Large production apps
* Server rendering needed

### Why companies use it

* Better **performance**
* Built-in **routing & API**
* Full-stack capability

---

## 3️⃣ Real-World Use Cases

* E-commerce (product SEO)
* Blogs & CMS
* Dashboards
* Marketing websites
* SaaS platforms

---

## 4️⃣ Performance & Optimization Techniques

### Built-in optimizations

* Image Optimization (`next/image`)
* Code splitting
* Automatic lazy loading
* Font optimization

### Developer techniques

* `useMemo`, `useCallback`
* Dynamic imports

```js
const Chart = dynamic(() => import('./Chart'), { ssr: false });
```

---

## 5️⃣ Rendering Strategies & Benefits

| Strategy | Meaning                     | Benefit                   |
| -------- | --------------------------- | ------------------------- |
| CSR      | Client renders              | Interactive apps          |
| SSR      | Server renders each request | SEO + fresh data          |
| SSG      | Pre-built at build time     | Fastest                   |
| ISR      | Rebuild after interval      | Balance speed & freshness |

---

# 🔹 Backend & Databases

---

## 1️⃣ What is NGINX & Why it’s used

### What is NGINX?

* High-performance **web server**
* Reverse proxy
* Load balancer

### Why use it?

* Handles **thousands of concurrent requests**
* Faster than Apache
* Acts as gateway before backend

### Real-world flow

```
Client → NGINX → Node/Java API → Database
```

### Common use cases

* SSL termination
* Load balancing
* Static file serving
* Rate limiting

---

## 2️⃣ SQL Joins & Differences

### Types of joins

#### `INNER JOIN`

* Only matching rows

```sql
SELECT * FROM A INNER JOIN B ON A.id = B.id;
```

#### `LEFT JOIN`

* All rows from left + matches

```sql
SELECT * FROM A LEFT JOIN B ON A.id = B.id;
```

#### `RIGHT JOIN`

* All rows from right + matches

#### `FULL JOIN`

* All rows from both tables

### Quick comparison

| Join  | Returns        |
| ----- | -------------- |
| INNER | Common rows    |
| LEFT  | Left + common  |
| RIGHT | Right + common |
| FULL  | Everything     |










Perfect 😄
These are **senior-level / tricky interview questions**. I’ll answer them **clearly, deeply, and practically**, with **WHY + WHAT + REAL USE** so you can *explain*, not just *recite*.

---

# 1️⃣ How would you build a React app **without a bundler**?

### Short answer

Use **CDN + ES Modules** directly in the browser.

### How

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>

    <script type="module">
      import React from "https://esm.sh/react";
      import ReactDOM from "https://esm.sh/react-dom/client";

      function App() {
        return React.createElement("h1", null, "Hello");
      }

      ReactDOM.createRoot(document.getElementById("root")).render(
        React.createElement(App)
      );
    </script>
  </body>
</html>
```

### Why this works

* Modern browsers support **ES modules**
* No build step needed
* React is just JS

### Why this is NOT used in production

* No code splitting
* No minification
* Slow network imports
* Poor DX

### Where it *is* useful

* Learning React internals
* Debugging
* Small demos
* Embedded widgets

---

# 2️⃣ What is the **Zombie Child problem** in React + Redux?

### What it is

A **child component** continues using **stale Redux state** after the parent has updated or unmounted.

### Why it happens

* Redux updates are async
* Child subscribes independently
* Parent updates → child still renders old data

### Example

```js
const Child = () => {
  const data = useSelector(state => state.data);
};
```

Parent dispatches → child renders with outdated selector snapshot.

### Why it’s dangerous

* Inconsistent UI
* Hard-to-debug bugs
* Race conditions

### How to fix

✅ Use **React-Redux hooks properly**
✅ Avoid reading state after unmount
✅ Prefer **lifting selectors up**
✅ Use `useSyncExternalStore` (modern fix)

---

# 3️⃣ Why should you **never define a component inside another component**?

### ❌ Bad

```js
function Parent() {
  function Child() {
    return <div />;
  }
  return <Child />;
}
```

### WHY this is bad

* New `Child` function created **on every render**
* React thinks it’s a **different component**
* Causes:

  * Remounting
  * State loss
  * Performance issues

### Symptoms

* `useEffect` runs repeatedly
* Inputs lose focus
* Animations reset

### ✅ Correct

```js
function Child() {
  return <div />;
}

function Parent() {
  return <Child />;
}
```

---

# 4️⃣ What is the **stale closure problem** in React hooks & how do you fix it?

### What it is

Hooks **capture old values** from previous renders.

### Example

```js
useEffect(() => {
  setInterval(() => {
    console.log(count);
  }, 1000);
}, []);
```

👉 `count` is always the **initial value**

### Why it happens

* JS closures freeze variables
* Effect runs only once

### Fixes

#### ✅ Functional updates

```js
setCount(prev => prev + 1);
```

#### ✅ Add dependencies

```js
useEffect(() => {
  console.log(count);
}, [count]);
```

#### ✅ useRef for mutable values

```js
const countRef = useRef(count);
countRef.current = count;
```

---

# 5️⃣ What are **React Portals** & when would you use them in production?

### What portals do

Render children **outside the DOM hierarchy** of the parent.

```js
ReactDOM.createPortal(
  <Modal />,
  document.getElementById("modal-root")
);
```

### Why portals exist

* DOM hierarchy ≠ React tree
* Fix z-index, overflow, stacking issues

### Real production use cases

✅ Modals
✅ Tooltips
✅ Dropdowns
✅ Toast notifications

### Key benefit

* Event bubbling still works
* CSS isolation

---

# 6️⃣ Can you use React **without JSX**? Why would you?

### Yes

JSX is **syntactic sugar**

```js
React.createElement("h1", null, "Hello");
```

### Why JSX exists

* Readability
* Developer productivity

### Why avoid JSX (rare cases)

* No build step
* Dynamic UI generators
* Educational purposes
* Low-level libraries

### Interview line 💡

> “JSX compiles to `React.createElement`, React doesn’t require JSX.”

---

# 7️⃣ What is **hydration** & what causes hydration errors in Next.js?

### Hydration

* Server sends HTML
* React **attaches event listeners**
* Makes page interactive

### Hydration error means

👉 **Server HTML ≠ Client HTML**

### Common causes

❌ `window` / `document` usage on server
❌ `Date.now()`, `Math.random()`
❌ Conditional rendering based on browser state
❌ Mismatched locale / time

### Example

```js
const time = new Date().toLocaleTimeString(); // ❌
```

### Fix

* Move client-only code to `useEffect`
* Use dynamic imports with `ssr: false`

---

# 8️⃣ What happens if you call `setState` inside `useEffect` with **no dependency array**?

```js
useEffect(() => {
  setCount(c => c + 1);
});
```

### What happens

1. Render
2. Effect runs
3. setState → re-render
4. Effect runs again
   🔁 **Infinite loop**

### When this is okay

* When state update is **conditionally guarded**

```js
useEffect(() => {
  if (count < 5) setCount(count + 1);
});
```

---

# 9️⃣ What is **tearing** in React & how does Concurrent Mode fix it?

### Tearing

UI shows **inconsistent state** across components during render.

Example:

* Component A reads old state
* Component B reads new state
* UI becomes inconsistent

### Why it happens

* Async rendering
* Shared mutable state

### How Concurrent Mode fixes it

✅ Interruptible rendering
✅ Versioned state snapshots
✅ `useSyncExternalStore`

### Result

* UI always reflects **one consistent state**

---

# 🔟 `useLayoutEffect` vs `useEffect` (REAL use case)

| Feature      | useEffect     | useLayoutEffect  |
| ------------ | ------------- | ---------------- |
| Timing       | After paint   | Before paint     |
| Blocks paint | ❌ No          | ✅ Yes            |
| Use for      | Data fetching | DOM measurements |

### Real use case for `useLayoutEffect`

```js
useLayoutEffect(() => {
  const height = ref.current.getBoundingClientRect().height;
  setHeight(height);
}, []);
```

### Why NOT always use it

* Blocks rendering
* Can cause jank
* Slower UX

### Rule of thumb

> If it **visually affects layout**, use `useLayoutEffect`

---






Here’s a **clear, interview-ready breakdown** of each concept, how they relate, and *why they exist* — all in one mental model 🧠
(I’ll keep it crisp but deep.)

---

## 1. **Partial Hydration**

**What:**
Hydrating only *interactive* parts of the page instead of the entire HTML.

**Why:**
Full hydration blocks the main thread → slow TTI (Time To Interactive).

**How:**

* Server sends HTML
* JS hydrates components **on demand** (when visible / interacted)

**Where you see it:**

* Modern frameworks built on **React**
* Popular in **Next.js**

**Mental model:**

> “Only wake up the parts of the page the user actually touches.”

---

## 2. **Island Architecture**

**What:**
Static HTML page with **isolated interactive islands**.

**Why:**
Most pages are static. Why ship JS everywhere?

**How:**

* Page renders as HTML
* Only specific components load JS

**Comparison:**

* SPA: JS everywhere ❌
* Islands: JS *only where needed* ✅

**Example:**
Navbar, search box, cart → hydrated
Blog text → static

---

## 3. **Streaming SSR**

**What:**
Server sends HTML **in chunks** as it becomes ready.

**Why:**
Don’t wait for *all* data before showing *anything*.

**How:**

* Shell HTML first
* Data-heavy sections later
* Browser progressively paints

**React feature:**
`<Suspense />` + streaming

**Result:**

* Faster First Paint
* Better perceived performance

---

## 4. **Concurrent Rendering**

**What:**
React can **pause, resume, or abandon renders**.

**Why:**
Old React = blocking renders
Concurrent React = interruptible work

**Key ability:**

> React decides *when* to render, not you.

**User benefit:**

* UI stays responsive
* Long renders don’t freeze the app

---

## 5. **Time Slicing**

**What:**
Breaking rendering work into small chunks.

**Why:**
Avoid blocking the browser for too long.

**How:**

* Render for a few ms
* Yield to browser (paint, input)
* Continue later

**Used by:**
Concurrent Rendering

**Analogy:**

> Like downloading a file in chunks instead of one huge block.

---

## 6. **Reconciliation Algorithm**

**What:**
Process React uses to decide **what changed** between renders.

**Goal:**
Minimal DOM mutations (DOM is expensive).

**Rules:**

* Same type → update
* Different type → replace
* Keys matter in lists

**Big idea:**

> React doesn’t diff trees blindly — it makes assumptions for speed.

---

## 7. **Fiber Architecture**

**What:**
Internal rewrite of React’s renderer (React 16+).

**Why:**
Old stack renderer = synchronous & blocking.

**Fiber enables:**

* Concurrent rendering
* Time slicing
* Priority-based updates
* Interruptible work

**Fiber =**

> A data structure representing a unit of work.

---

## 8. **Virtual DOM Diffing Complexity**

**Problem:**
Tree diffing is **O(n³)** in theory.

**React’s optimization:**

* Assumes same component structure
* Uses keys to avoid deep comparisons
* Linear-time heuristics → **O(n)**

**Trade-off:**
May not find the *absolute minimal* diff
But fast enough for real apps ✅

---

## 9. **Structural Sharing**

**What:**
Reusing unchanged parts of a data structure.

**Why:**

* Cheap comparisons (`===`)
* Faster updates
* Less memory usage

**Where it’s used:**

* React state updates
* Immutable patterns
* Redux-like systems

**Example:**

```js
newState = {
  ...oldState,
  user: {
    ...oldState.user,
    name: "New Name"
  }
}
```

Only changed paths get new references.

---

## 🔗 How All These Fit Together (Big Picture)

```
Fiber
 ├─ enables Concurrent Rendering
 │    ├─ uses Time Slicing
 │    └─ supports Streaming SSR
 │
 ├─ improves Reconciliation
 │    └─ efficient Virtual DOM diffing
 │
 └─ allows Partial Hydration
      └─ used by Island Architecture
```

---