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


/*
Hooks (useState, useEffect)
Props vs State
Rendering & Keys
Performance Optimization
Context API
Custom Hooks
Error Boundaries
Reconciliation
*/