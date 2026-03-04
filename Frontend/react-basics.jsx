/* ================================
1. WHAT IS REACT?
================================ */

/*
WHY:
- Build fast, interactive UIs
- Component-based architecture
- Efficient updates using Virtual DOM

WHERE:
- SPAs, dashboards, admin panels, mobile (React Native)
*/

// React is a JavaScript library for building user interfaces using components.

// Key principles:
// - Declarative UI
// - Component-based
// - Unidirectional data flow
// - State-driven rendering


/* ================================
2. JSX
================================ */

/*
WHY:
- Makes UI code readable
- Looks like HTML but is JavaScript

WHERE:
- All React components
*/

const name = "Alice";

const element = (
  <h1 className="title">
    Hello, {name}
  </h1>
);

/*
JSX RULES:
- Must return ONE parent element
- Use className (not class)
- JS expressions inside {}
- JSX compiles to React.createElement()
*/


/* ================================
3. COMPONENTS
================================ */

/*
WHY:
- Reusable UI blocks
- Separation of concerns

WHERE:
- Every React app
*/

// Functional Component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Arrow component
const WelcomeArrow = ({ name }) => {
  return <h1>Hello, {name}</h1>;
};

// Usage
<Welcome name="Alice" />;


/* ================================
   4. PROPS
================================ */

/*
WHY:
- Pass data from parent → child
- Makes components reusable

WHERE:
- Parent-child communication
*/

function Child({ title, count }) {
  return (
    <p>{title} — {count}</p>
  );
}

function Parent() {
  return <Child title="Items" count={5} />;
}

/*
IMPORTANT:
- Props are READ-ONLY
- Cannot modify props inside child
*/


/* ================================
5. STATE (useState)
================================ */

/*
WHY:
- Store dynamic data
- Trigger re-render on change

WHERE:
- Forms, toggles, counters, UI state
*/

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}

/*
KEY POINTS:
- State updates are ASYNC
- Never mutate state directly
*/


/* ================================
6. STATE UPDATE PITFALL (IMPORTANT)
================================ */

/*
WHY:
- React batches state updates
- Using old state causes bugs
*/

setCount(count + 1); // may use stale value

// Correct
setCount(prev => prev + 1);


/* ================================
7. CONDITIONAL RENDERING
================================ */

/*
WHY:
- Render UI based on conditions

WHERE:
- Authentication, loaders, feature flags
*/

{isLoggedIn && <Dashboard />}

{isLoading ? <Loader /> : <Content />}

if (!user) {
  return <Login />;
}


/* ================================
8. LIST RENDERING & KEYS
================================ */

/*
WHY:
- Render dynamic lists
- Keys help React identify items

WHERE:
- Tables, menus, cards
*/

const users = ["Alice", "Bob", "Charlie"];

<ul>
  {users.map(user => (
    <li key={user}>{user}</li>
  ))}
</ul>

/*
KEY RULE:
- Key must be UNIQUE and STABLE
- Avoid index as key (unless static list)
*/


/* ================================
9. EVENTS
================================ */

/*
WHY:
- Handle user interactions

WHERE:
- Buttons, forms, inputs
*/

function Button() {
  function handleClick(e) {
    console.log("Clicked", e);
  }

  return <button onClick={handleClick}>Click</button>;
}

// Inline
<button onClick={() => alert("Hi")} />


/* ================================
10. FORMS & CONTROLLED COMPONENTS
================================ */

/*
WHY:
- Single source of truth
- Validation & submission control

WHERE:
- Login, signup, filters
*/

function LoginForm() {
  const [email, setEmail] = useState("");

  return (
    <input
      value={email}
      onChange={e => setEmail(e.target.value)}
    />
  );
}

/*
Controlled:
- React controls input value

Uncontrolled:
- DOM controls value (useRef)
*/


/* ================================
11. useEffect
================================ */

/*
WHY:
- Handle side effects

WHERE:
- API calls, subscriptions, timers
*/

import { useEffect } from "react";

useEffect(() => {
  console.log("Component mounted");

  return () => {
    console.log("Cleanup on unmount");
  };
}, []);

/*
DEPENDENCY ARRAY:
[]        → run once
[dep]     → run when dep changes
(no deps) → run on every render
*/


/* ================================
12. DATA FETCHING
================================ */

useEffect(() => {
  async function fetchData() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  }
  fetchData();
}, []);


/* ================================
13. useRef
================================ */

/*
WHY:
- Access DOM
- Store mutable value without re-render

WHERE:
- Focus input, timers, previous values
*/

const inputRef = useRef(null);

<input ref={inputRef} />

inputRef.current.focus();


/* ================================
14. useMemo
================================ */

/*
WHY:
- Optimize expensive calculations

WHERE:
- Heavy loops, derived data
*/

const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

/*
DO NOT overuse useMemo
*/


/* ================================
15. useCallback
================================ */

/*
WHY:
- Memoize functions
- Prevent unnecessary re-renders

WHERE:
- Passed to memoized children
*/

const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []);


/* ================================
16. React.memo
================================ */

/*
WHY:
- Prevent unnecessary re-renders
*/

const Child = React.memo(({ value }) => {
  console.log("Rendered");
  return <p>{value}</p>;
});


/* ================================
17. CONTEXT API
================================ */

/*
WHY:
- Avoid prop drilling

WHERE:
- Theme, auth, language
*/

const ThemeContext = React.createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>{theme}</div>;
}


/* ================================
18. LIFTING STATE UP
================================ */

/*
WHY:
- Share state between siblings
*/

// Move state to nearest common parent


/* ================================
19. CUSTOM HOOKS
================================ */

/*
WHY:
- Reuse logic
- Clean components
*/

function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  return { count, inc: () => setCount(c => c + 1) };
}


/* ================================
20. ERROR BOUNDARIES
================================ */

/*
WHY:
- Catch runtime errors
- Prevent app crash

NOTE:
- Only class components
*/

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>;
    }
    return this.props.children;
  }
}


/* ================================
21. RECONCILIATION & VIRTUAL DOM
================================ */

/*
WHY:
- Efficient UI updates

React:
- Creates Virtual DOM
- Compares (diffing)
- Updates only changed nodes
*/


/* ================================
22. PERFORMANCE PITFALLS
================================ */

/*
Inline functions in props
Missing keys
Overusing context
Unnecessary re-renders
*/


/* ================================
23. COMMON INTERVIEW QUESTIONS
================================ */

/*
Q: Why keys are important?
A: Help React identify list items efficiently

Q: useEffect vs useLayoutEffect?
A:
- useEffect → async, after paint
- useLayoutEffect → sync, before paint

Q: Controlled vs Uncontrolled?
A:
- Controlled → React state
- Uncontrolled → DOM

Q: Why state updates async?
A:
- Batching for performance
*/


/* ================================
24. CONNECTION TO JS CONCEPTS
================================ */

/*
Closures:
- useState
- useEffect
- Custom hooks

Memoization:
- useMemo
- useCallback
- React.memo

HOFs:
- map, filter in JSX
- React.memo

Event Loop:
- setState batching
- async effects
*/


/* ================================
25. FRAGMENTS  ← NEW
================================ */

/*
WHY:
- Return multiple elements without adding extra DOM nodes

WHERE:
- Wherever a wrapper div would pollute the DOM (tables, flex/grid layouts)
*/

// Short syntax
function List() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
    </>
  );
}

// Long syntax (needed when passing key in lists)
function Items({ items }) {
  return items.map(item => (
    <React.Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.desc}</dd>
    </React.Fragment>
  ));
}


/* ================================
26. useReducer  ← NEW
================================ */

/*
WHY:
- Manage complex state logic
- Alternative to useState when next state depends on previous
- Centralizes update logic (like Redux, but local)

WHERE:
- Forms with many fields, multi-step flows, complex toggles
*/

import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "decrement": return { count: state.count - 1 };
    case "reset":     return initialState;
    default: throw new Error("Unknown action");
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
}

/*
useState vs useReducer:
- useState  → simple, independent values
- useReducer → complex logic, multiple sub-values, actions
*/


/* ================================
27. PORTALS  ← NEW
================================ */

/*
WHY:
- Render children outside the parent DOM hierarchy
- But still within the React component tree (events bubble normally)

WHERE:
- Modals, tooltips, dropdowns, toasts
*/

import ReactDOM from "react-dom";

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById("modal-root") // target DOM node
  );
}

/*
NOTE:
- Events still bubble up through React tree (not DOM tree)
- Useful when parent has overflow:hidden or z-index issues
*/


/* ================================
28. SUSPENSE & LAZY LOADING
================================ */

/*
WHY:
- Code splitting: load components only when needed
- Reduces initial bundle size

WHERE:
- Large components, routes, heavy libraries
*/

import { Suspense, lazy } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HeavyComponent />
    </Suspense>
  );
}

/*
NOTE:
- lazy() only works with default exports
- Suspense can also wrap data-fetching libraries (React Query, Relay)
*/


/* ================================
29. FORWARDREF
================================ */

/*
WHY:
- Pass a ref through a component to a DOM element inside it
- Needed when parent needs direct DOM access to child's element

WHERE:
- Custom input wrappers, UI libraries, focus management
*/

import { forwardRef } from "react";

const FancyInput = forwardRef((props, ref) => (
  <input ref={ref} className="fancy" {...props} />
));

// Parent usage
function Form() {
  const inputRef = useRef(null);

  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </>
  );
}


/* ================================
30. useTransition & useDeferredValue
================================ */

/*
WHY:
- Keep UI responsive during heavy state updates
- Mark updates as non-urgent (concurrent features)

WHERE:
- Search/filter on large lists, tab switching
*/

import { useTransition, useDeferredValue } from "react";

// useTransition — wrap the update
function SearchPage() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    setQuery(e.target.value);           // urgent: update input
    startTransition(() => {
      setResults(search(e.target.value)); // non-urgent: update list
    });
  }

  return isPending ? <Spinner /> : <Results />;
}

// useDeferredValue — defer a value
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query); // lags behind if busy
  const results = expensiveFilter(deferredQuery);
  return <List items={results} />;
}

/*
useTransition vs useDeferredValue:
- useTransition  → you control the state setter
- useDeferredValue → you receive a value (e.g. from props)
*/


/* ================================
31. useId  ← NEW
================================ */

/*
WHY:
- Generate stable, unique IDs safe for SSR
- Avoid ID collisions between multiple instances

WHERE:
- Accessibility: linking <label> to <input>
*/

import { useId } from "react";

function TextField({ label }) {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  );
}


/* ================================
32. STRICT MODE  ← NEW
================================ */

/*
WHY:
- Highlights potential problems in development
- Double-invokes render & effects to detect side effects

WHERE:
- Wrap the entire app during development
*/

import { StrictMode } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

/*
NOTE:
- Only affects development build (no-op in production)
- Helps catch impure renders, deprecated API usage
*/


/* ================================
33. PROP TYPES / TYPE CHECKING  ← NEW
================================ */

/*
WHY:
- Catch wrong prop types at runtime (dev mode)
- Self-document component contracts

WHERE:
- Any project not using TypeScript
*/

// import PropTypes from "prop-types";

// function Button({ label, onClick, disabled }) {
//   return <button onClick={onClick} disabled={disabled}>{label}</button>;
// }

// Button.propTypes = {
//   label:    PropTypes.string.isRequired,
//   onClick:  PropTypes.func.isRequired,
//   disabled: PropTypes.bool,
// };

// Button.defaultProps = {
//   disabled: false,
// };

// /*
// With TypeScript (preferred in modern projects):
// */

// type ButtonProps = {
//   label: string;
//   onClick: () => void;
//   disabled?: boolean;
// };

// const Button = ({ label, onClick, disabled = false }: ButtonProps) => (
//   <button onClick={onClick} disabled={disabled}>{label}</button>
// );


/* ================================
34. COMPONENT LIFECYCLE (CLASS vs HOOKS)
================================ */

/*
WHY:
- Understand execution order
- Required for legacy codebases & interviews

Class lifecycle       →  Hooks equivalent
─────────────────────────────────────────
componentDidMount     →  useEffect(() => {}, [])
componentDidUpdate    →  useEffect(() => {}, [dep])
componentWillUnmount  →  useEffect(() => { return () => cleanup }, [])
shouldComponentUpdate →  React.memo / useMemo
*/


/* ================================
35. REACT ROUTER (v6)
================================ */

/*
WHY:
- Client-side routing in SPAs

WHERE:
- Any multi-page React app
*/

import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/about"   element={<About />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="*"        element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Reading URL params
function UserPage() {
  const { id } = useParams();
  return <p>User: {id}</p>;
}

// Programmatic navigation
function Login() {
  const navigate = useNavigate();
  return <button onClick={() => navigate("/dashboard")}>Login</button>;
}


/* ================================
   36. STATE MANAGEMENT PATTERNS
================================ */

/*
Local state         → useState / useReducer
Cross-component     → Context API
Server state        → React Query / SWR
Global client state → Zustand / Redux Toolkit

Choosing:
- Small app              → useState + Context
- Medium app             → useState + Zustand
- Large / enterprise     → Redux Toolkit + React Query
*/


/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FULL TOPIC CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Core
  Hooks (useState, useEffect, useRef, useMemo, useCallback, useReducer, useId)
  Props vs State
  Rendering & Keys
  Fragments
  Controlled / Uncontrolled components

Performance
  React.memo
  useMemo / useCallback
  Lazy loading & Suspense
  useTransition / useDeferredValue

Architecture
  Context API
  Custom Hooks
  Lifting State Up
  Error Boundaries
  Portals
  ForwardRef
  State Management Patterns

Advanced / Modern
  Reconciliation & Virtual DOM
  StrictMode
  Concurrent features (useTransition)
  Component lifecycle mapping
  Prop Types / TypeScript
  React Router v6
*/