/* ================================
1. Variables & Data Types
================================ */

/*
WHY: Understanding variable declarations is crucial for scoping and mutability
WHERE: Used everywhere in JavaScript applications

let - block-scoped, reassignable
const - block-scoped, must be initialized, value can't be reassigned (but objects/arrays can be mutated)
var - function-scoped, hoisted (avoid using)
*/

let userName1 = "Alice";        // Can be reassigned
const userAge1 = 25;            // Cannot be reassigned
var isActive = true;            // Function-scoped (legacy)

console.log(userName1, userAge1, isActive);

// const with objects (common interview question)
const user1 = { name: "Bob" };
user1.name = "Charlie";  // This works! (mutating object)
// user1 = {};           // This fails! (reassigning)

// REAL-WORLD EXAMPLE: Shopping cart — use const for the cart object,
// but you can still add/remove items since the reference doesn't change
const cart = { items: [], total: 0 };
cart.items.push({ id: 1, name: "Laptop", price: 999 }); // Works fine
cart.total += 999;
// cart = {}; // TypeError: Assignment to constant variable


/* ================================
2. Type Coercion
================================ */

/*
WHY: JavaScript automatically converts types, which can cause bugs
WHERE: Comparisons, arithmetic operations, conditional statements
*/

console.log("5" + 1);      // "51" (string concatenation)
console.log("5" - 1);      // 4 (numeric subtraction)
console.log("5" == 5);     // true (loose equality, coerces types)
console.log("5" === 5);    // false (strict equality, no coercion)
console.log(null == undefined);   // true
console.log(null === undefined);  // false

// Falsy values (important for conditionals)
console.log(Boolean(0));          // false
console.log(Boolean(""));         // false
console.log(Boolean(null));       // false
console.log(Boolean(undefined));  // false
console.log(Boolean(NaN));        // false

// REAL-WORLD EXAMPLE: Form validation — user enters age as string "0"
// This causes a bug if you use loose equality
const inputAge = "0"; // from <input> element — always a string

if (inputAge == false) {
  console.log("Bug: thinks age '0' is falsy due to coercion"); // runs!
}

if (inputAge === "" || isNaN(Number(inputAge))) {
  console.log("Invalid age");
} else {
  console.log("Valid age:", Number(inputAge)); // Safe approach
}


/* ================================
3. Functions
================================ */

/*
WHY: Multiple ways to declare functions have different behaviors
WHERE: Event handlers, callbacks, React components, utility functions
*/

// Function Declaration (hoisted)
function addNumbers(a, b) {
  return a + b;
}

// Function Expression (not hoisted)
const subtractNumbers = function (a, b) {
  return a - b;
};

// Arrow Function (no 'this' binding)
const multiplyNumbers = (a, b) => a * b;

// Arrow function with block body
const divideNumbers = (a, b) => {
  if (b === 0) return "Cannot divide by zero";
  return a / b;
};

console.log(addNumbers(2, 3), multiplyNumbers(2, 3));

// REAL-WORLD EXAMPLE: Express.js route handler
// Arrow functions work well for callbacks, but regular functions
// are needed when you need dynamic 'this'
const routes = {
  basePath: "/api",
  getUsers: function () {
    // 'this.basePath' works here
    return fetch(this.basePath + "/users");
  },
  // Arrow here would break 'this'
};


/* ================================
4. Scope & Hoisting
================================ */

/*
WHY: Understanding where variables are accessible prevents bugs
WHERE: All JavaScript code, especially closures and callbacks

Hoisting: Variable and function declarations are moved to top of their scope
*/

// Block scope with let/const
{
  let blockScoped = "I exist only here";
  const alsoBlockScoped = "Me too";
}
// console.log(blockScoped); // ReferenceError

// Function scope with var
function demo() {
  if (true) {
    var functionScoped = "I leak out of the if block";
  }
  console.log(functionScoped); // Works
}

// Hoisting example
hoisted(); // Works (function declaration is hoisted)
function hoisted() {
  console.log("Hoisted function");
}

// notHoisted(); // Cannot access before initialization
const notHoisted = () => {
  console.log("Not hoisted");
};

// Temporal Dead Zone
{
  // console.log(x); // ReferenceError (TDZ)
  let x = 5;
}

// REAL-WORLD EXAMPLE: The classic var-in-loop bug
// This was a very common bug before let/const
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 100); // Prints 3, 3, 3 (bug!)
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 100); // Prints 0, 1, 2 (correct)
}


/* ================================
5. Closures
================================ */

/*
WHY: Closures enable data privacy, callbacks, and functional patterns
WHERE: React hooks, event handlers, debounce/throttle, module pattern

A closure is a function that has access to variables from its outer scope,
even after the outer function has finished executing.
*/

function createCounter() {
  let count = 0; // Private variable

  return function () {
    count++;
    return count;
  };
}

const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3

// Practical closure example: Private variables
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) return "Insufficient funds";
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const myAccount = createBankAccount(100);
console.log(myAccount.deposit(50));    // 150
console.log(myAccount.withdraw(30));   // 120

// REAL-WORLD EXAMPLE: Rate limiter per user using closures
// Each user gets their own isolated request count
function createRateLimiter(maxRequests, windowMs) {
  let requests = 0;
  let windowStart = Date.now();

  return function (userId) {
    const now = Date.now();
    if (now - windowStart > windowMs) {
      requests = 0;
      windowStart = now;
    }
    if (requests >= maxRequests) {
      return { allowed: false, message: `Rate limit exceeded for ${userId}` };
    }
    requests++;
    return { allowed: true, remaining: maxRequests - requests };
  };
}

const limiter = createRateLimiter(5, 60000); // 5 requests per minute
console.log(limiter("user_123")); // { allowed: true, remaining: 4 }


/* ================================
6. Arrays & Methods
================================ */

/*
WHY: Array methods are essential for data manipulation
WHERE: Data transformation, filtering, React state updates, API responses
*/

const nums = [1, 2, 3, 4, 5];

// map - Transform each element
const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - Select elements that match condition
const evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// reduce - Accumulate to single value
const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

// find - Get first matching element
const found = nums.find(n => n > 3);
console.log(found); // 4

// some - Check if ANY element matches
const hasEven = nums.some(n => n % 2 === 0);
console.log(hasEven); // true

// every - Check if ALL elements match
const allPositive = nums.every(n => n > 0);
console.log(allPositive); // true

// forEach - Execute function for each element (no return value)
nums.forEach(n => console.log(n));

// Chaining methods
const result = nums
  .filter(n => n > 2)
  .map(n => n * 2)
  .reduce((a, b) => a + b, 0);
console.log(result); // 24

// REAL-WORLD EXAMPLE: E-commerce dashboard data pipeline
const orders = [
  { id: 1, status: "delivered", amount: 120, category: "electronics" },
  { id: 2, status: "pending",   amount: 45,  category: "books" },
  { id: 3, status: "delivered", amount: 300, category: "electronics" },
  { id: 4, status: "cancelled", amount: 60,  category: "clothing" },
  { id: 5, status: "delivered", amount: 89,  category: "books" },
];

const deliveredRevenue = orders
  .filter(o => o.status === "delivered")
  .reduce((total, o) => total + o.amount, 0);

console.log("Delivered Revenue: $" + deliveredRevenue); // $509

const categoryTotals = orders
  .filter(o => o.status === "delivered")
  .reduce((acc, o) => {
    acc[o.category] = (acc[o.category] || 0) + o.amount;
    return acc;
  }, {});

console.log(categoryTotals); // { electronics: 420, books: 89 }


/* ================================
7. Objects & Destructuring
================================ */

/*
WHY: Clean syntax for extracting values from objects/arrays
WHERE: Function parameters, API responses, React props
*/

const user2 = {
  id: 1,
  name: "Bob",
  email: "bob@example.com",
  address: {
    city: "Delhi",
    zip: "110001"
  }
};

// Object destructuring
const { name: userName2, email: userEmail } = user2;
console.log(userName2, userEmail);

// Nested destructuring
const { address: { city: userCity, zip: userZip } } = user2;
console.log(userCity, userZip);

// Default values
const { age: userAge2 = 25, country = "India" } = user2;
console.log(userAge2, country);

// Array destructuring
const colors = ["red", "green", "blue"];
const [firstColor, secondColor] = colors;
console.log(firstColor, secondColor);

// Rest operator
const { name: userName3, ...restProps } = user2;
console.log(restProps); // Everything except 'name'

// Spread operator (very common in React)
const newUser = { ...user2, age: 30, city: "Mumbai" };
const newColors = [...colors, "yellow"];

// REAL-WORLD EXAMPLE: Parsing a GitHub API response
async function getRepoInfo(repoUrl) {
  const response = await fetch(repoUrl);
  const {
    name,
    description,
    stargazers_count: stars,
    forks_count: forks,
    owner: { login: ownerName }
  } = await response.json();

  return { name, description, stars, forks, ownerName };
}

// REAL-WORLD EXAMPLE: React component with prop destructuring
function UserCard({ name, email, role = "viewer", isActive = true }) {
  // Clean access to props without 'props.name', 'props.email', etc.
  return `${name} (${role}) — ${isActive ? "Active" : "Inactive"}`;
}


/* ================================
8. this Keyword
================================ */

/*
WHY: 'this' behavior is a common source of bugs and interview questions
WHERE: Object methods, event handlers, classes, React components
*/

const person1 = {
  name: "Rahul",
  greet() {
    console.log("Hello, " + this.name);
  },
  greetArrow: () => {
    console.log(this.name); // 'this' refers to outer scope (not person1)
  }
};

person1.greet();      // "Hello, Rahul"
person1.greetArrow(); // undefined (arrow functions don't bind 'this')

// call() and apply()
function introduce(greeting, punctuation) {
  console.log(greeting + ", I'm " + this.name + punctuation);
}

const person2 = { name: "Alice" };
introduce.call(person2, "Hello", "!");    // Hello, I'm Alice!
introduce.apply(person2, ["Hi", "."]);    // Hi, I'm Alice.

// REAL-WORLD EXAMPLE: Event listener losing 'this' — very common bug
class VideoPlayer {
  constructor() {
    this.isPlaying = false;
    this.title = "My Video";
  }

  // Bug: 'this' inside will be the button element, not VideoPlayer
  handleClickBroken() {
    console.log(this.title); // undefined — 'this' is the DOM button
  }

  // Fix 1: Arrow function in class field
  handleClick = () => {
    this.isPlaying = !this.isPlaying;
    console.log(this.title, this.isPlaying); // Works correctly
  };
}

const player = new VideoPlayer();
// document.querySelector("button").addEventListener("click", player.handleClick);


/* ================================
9. Async JavaScript
================================ */

/*
WHY: JavaScript is single-threaded; async operations prevent blocking
WHERE: API calls, file operations, timers, user interactions
*/

// Callback (oldest approach)
function fetchDataCallback(callback) {
  setTimeout(() => {
    callback("Data loaded");
  }, 1000);
}

fetchDataCallback((data) => console.log(data));

// Promise
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) resolve("Data loaded");
      else reject("Error occurred");
    }, 1000);
  });
}

// Async/Await (modern approach)
async function loadData() {
  try {
    const data = await fetchDataPromise();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

loadData();

// Promise.all (run multiple promises in parallel)
async function loadMultiple() {
  const [user, posts, comments] = await Promise.all([
    fetchDataPromise(),
    fetchDataPromise(),
    fetchDataPromise()
  ]);
  console.log(user, posts, comments);
}

// REAL-WORLD EXAMPLE: Fetching user dashboard data in parallel
async function loadDashboard(userId) {
  try {
    // Run all requests simultaneously — not sequentially!
    const [profile, notifications, recentOrders] = await Promise.all([
      fetch(`/api/users/${userId}`).then(r => r.json()),
      fetch(`/api/users/${userId}/notifications`).then(r => r.json()),
      fetch(`/api/users/${userId}/orders?limit=5`).then(r => r.json()),
    ]);

    return { profile, notifications, recentOrders };
  } catch (err) {
    console.error("Dashboard load failed:", err);
    throw err; // Re-throw so the UI can show an error state
  }
}

// Promise.allSettled — when you want ALL results even if some fail
async function loadWidgets() {
  const results = await Promise.allSettled([
    fetch("/api/weather"),
    fetch("/api/stocks"),
    fetch("/api/news"),
  ]);

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`Widget ${i} loaded`);
    } else {
      console.warn(`Widget ${i} failed:`, result.reason); // App continues
    }
  });
}


/* ================================
10. Error Handling
================================ */

/*
WHY: Prevents app crashes and provides better user experience
WHERE: API calls, JSON parsing, user input validation
*/

try {
  JSON.parse("{ bad json }");
} catch (err) {
  console.error("Parsing failed:", err.message);
} finally {
  console.log("This runs regardless");
}

// Custom errors
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateAge(age) {
  if (age < 0) throw new ValidationError("Age cannot be negative");
  return true;
}

try {
  validateAge(-5);
} catch (err) {
  if (err instanceof ValidationError) {
    console.error("Validation error:", err.message);
  }
}

// REAL-WORLD EXAMPLE: API wrapper with typed errors
class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
  }
}

class AuthError extends Error {
  constructor() {
    super("Session expired. Please log in again.");
    this.name = "AuthError";
  }
}

async function apiFetch(url) {
  const res = await fetch(url);
  if (res.status === 401) throw new AuthError();
  if (!res.ok) throw new NetworkError(res.statusText, res.status);
  return res.json();
}

async function loadUserProfile(id) {
  try {
    return await apiFetch(`/api/users/${id}`);
  } catch (err) {
    if (err instanceof AuthError) {
      window.location.href = "/login"; // Redirect on session expiry
    } else if (err instanceof NetworkError) {
      showToast(`Error ${err.statusCode}: ${err.message}`);
    }
  }
}


/* ==================================================
11. FLATTEN AN ARRAY
================================================== */

/*
WHY: Common interview question; tests recursion understanding
WHERE: Data normalization, processing nested API responses
*/

function flattenArray(arr) {
  let result = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

const nestedArray = [1, [2, [3, 4]], 5];
console.log("Flattened:", flattenArray(nestedArray));
console.log("Using flat():", nestedArray.flat(Infinity));

// REAL-WORLD EXAMPLE: Flatten a nested menu/category tree into a search index
const menu = [
  { id: 1, label: "Electronics", children: [
    { id: 2, label: "Phones", children: [
      { id: 3, label: "Smartphones", children: [] },
      { id: 4, label: "Feature Phones", children: [] }
    ]},
    { id: 5, label: "Laptops", children: [] }
  ]},
  { id: 6, label: "Books", children: [] }
];

function flattenMenu(items) {
  return items.reduce((acc, item) => {
    acc.push({ id: item.id, label: item.label });
    if (item.children.length) acc.push(...flattenMenu(item.children));
    return acc;
  }, []);
}

console.log(flattenMenu(menu));
// [{ id: 1, label: "Electronics" }, { id: 2, label: "Phones" }, ...]


/* ==================================================
12. DEBOUNCE
================================================== */

/*
WHY: Optimize performance by limiting function calls
WHERE: Search input, window resize, scroll events, API calls
*/

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const searchDebounced = debounce((text) => {
  console.log("Searching for:", text);
}, 500);

searchDebounced("r");      // Cancelled
searchDebounced("react");  // Executes after 500ms

// REAL-WORLD EXAMPLE: Auto-save form draft as user types
const saveDraft = debounce(async (formData) => {
  await fetch("/api/drafts", {
    method: "POST",
    body: JSON.stringify(formData),
  });
  console.log("Draft saved");
}, 1000); // Wait 1s after user stops typing before saving

// Called on every input event, but only saves after 1s of inactivity
// document.querySelector("#editor").addEventListener("input", e => {
//   saveDraft({ content: e.target.value, timestamp: Date.now() });
// });


/* ==================================================
13. THROTTLE
================================================== */

/*
WHY: Limit function execution to once per time interval
WHERE: Scroll events, mouse movement, resize events

Difference from Debounce:
- Debounce: Waits for pause in events
- Throttle: Executes at regular intervals regardless
*/

function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// REAL-WORLD EXAMPLE: Infinite scroll — load more items as user scrolls
const loadMoreItems = throttle(async () => {
  const scrollBottom = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;

  if (scrollBottom >= pageHeight - 200) { // 200px from bottom
    const newItems = await fetch("/api/items?page=" + nextPage).then(r => r.json());
    appendItemsToDOM(newItems);
  }
}, 500); // Check at most every 500ms, not on every pixel scroll

// window.addEventListener("scroll", loadMoreItems);


/* ==================================================
14. DEEP COPY vs SHALLOW COPY
================================================== */

/*
WHY: Critical for state management in React and avoiding mutations
WHERE: Updating nested objects/arrays, Redux, React state
*/

const originalObj = {
  name: "Alice",
  address: { city: "Delhi" }
};

// Shallow copy
const shallow1 = { ...originalObj };
shallow1.name = "Bob";           // Original unchanged
shallow1.address.city = "Mumbai"; // Original CHANGED (shared reference)

// Deep copy
const deep1 = JSON.parse(JSON.stringify(originalObj));

function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepCopy(item));
  const copy = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) copy[key] = deepCopy(obj[key]);
  }
  return copy;
}

// Modern: structuredClone(obj) — native, handles more types

// REAL-WORLD EXAMPLE: React state update — always return new objects!
// BAD (mutates state — React won't re-render)
function badUpdateUser(state, newCity) {
  state.address.city = newCity; // Direct mutation
  return state;
}

// GOOD (returns a new object — React detects the change)
function goodUpdateUser(state, newCity) {
  return {
    ...state,
    address: { ...state.address, city: newCity } // New nested object too
  };
}

// For deeply nested: use structuredClone or immer library
const updatedState = structuredClone(originalObj);
updatedState.address.city = "Chennai"; // Safe — original untouched


/* ==================================================
15. EVENT LOOP
================================================== */

/*
WHY: Fundamental to understanding async JavaScript
WHERE: All async operations, promises, setTimeout, setInterval

Execution order:
1. Synchronous code (call stack)
2. Microtasks (Promises .then, queueMicrotask, MutationObserver)
3. Macrotasks (setTimeout, setInterval, setImmediate, I/O)
*/

console.log("1: Start");

setTimeout(() => console.log("2: Timeout"), 0); // Macrotask

Promise.resolve().then(() => console.log("3: Promise")); // Microtask

console.log("4: End");

// Output: 1 → 4 → 3 → 2

// REAL-WORLD EXAMPLE: Why UI updates feel laggy
// This blocks the event loop — UI freezes for ~2s
function badHeavyWork() {
  const start = Date.now();
  while (Date.now() - start < 2000) {} // Blocks everything!
  console.log("Done — but UI was frozen");
}

// Better: break work into chunks using setTimeout
function goodHeavyWork(items, index = 0) {
  if (index >= items.length) return;
  processItem(items[index]);       // Process one item
  setTimeout(() => goodHeavyWork(items, index + 1), 0); // Yield to event loop
}

// Best for heavy CPU work: Web Workers (run in separate thread)
// const worker = new Worker("heavy-task.js");
// worker.postMessage({ data: largeDataset });


/* ==================================================
16. PROTOTYPES & INHERITANCE
================================================== */

/*
WHY: Foundation of JavaScript's object-oriented programming
WHERE: Understanding classes, inheritance, method lookup
*/

function PersonConstructor(name, age) {
  this.name = name;
  this.age = age;
}

PersonConstructor.prototype.greet = function () {
  return `Hi, I'm ${this.name}`;
};

// Modern class syntax (syntactic sugar over prototypes)
class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  speak() { return `${this.name} barks`; }
}

const dog = new Dog("Max", "Labrador");
console.log(dog.speak()); // "Max barks"

// REAL-WORLD EXAMPLE: Building a UI component hierarchy
class Component {
  constructor(id) {
    this.id = id;
    this.isVisible = true;
  }

  show() { this.isVisible = true; }
  hide() { this.isVisible = false; }
  render() { throw new Error("render() must be implemented by subclass"); }
}

class Modal extends Component {
  constructor(id, title) {
    super(id);
    this.title = title;
  }
  render() {
    return `<div class="modal" id="${this.id}"><h2>${this.title}</h2></div>`;
  }
}

class Toast extends Component {
  constructor(id, message, type = "info") {
    super(id);
    this.message = message;
    this.type = type;
  }
  render() {
    return `<div class="toast toast--${this.type}">${this.message}</div>`;
  }
}

const confirmModal = new Modal("confirm-delete", "Delete item?");
const successToast = new Toast("toast-1", "Saved successfully!", "success");

console.log(confirmModal.render());
console.log(successToast.render());


/* ==================================================
17. CURRYING
================================================== */

/*
WHY: Creates specialized functions, improves reusability
WHERE: Functional programming, React hooks, Redux
*/

const curriedAdd = a => b => c => a + b + c;
console.log(curriedAdd(1)(2)(3)); // 6

function multiplyBy(a) {
  return function (b) { return a * b; };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

// Generic curry function
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

const curriedSum = curry((a, b, c) => a + b + c);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6

// REAL-WORLD EXAMPLE: Configurable validator functions
const isGreaterThan = min => value => value > min;
const isLessThan = max => value => value < max;
const hasMinLength = min => str => str.length >= min;

const isPositive = isGreaterThan(0);
const isValidAge = value => isGreaterThan(0)(value) && isLessThan(120)(value);
const isValidPassword = hasMinLength(8);

console.log(isPositive(5));         // true
console.log(isValidAge(25));        // true
console.log(isValidPassword("abc")); // false

// REAL-WORLD EXAMPLE: API call factory
const makeRequest = method => url => data =>
  fetch(url, { method, body: JSON.stringify(data) });

const post = makeRequest("POST");
const put  = makeRequest("PUT");

const createUser = post("/api/users");
const updateUser = put("/api/users/1");

createUser({ name: "Alice" }); // POST /api/users
updateUser({ name: "Alice B." }); // PUT /api/users/1


/* ==================================================
18. MEMOIZATION
================================================== */

/*
WHY: Cache expensive function results to improve performance
WHERE: React.memo, useMemo, expensive calculations, recursive functions
*/

function memoize(fn) {
  const cache = new Map(); // Map is better than {} for keys that aren't strings

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const memoizedFib = memoize(function fib(n) {
  if (n <= 1) return n;
  return memoizedFib(n - 1) + memoizedFib(n - 2);
});

console.log(memoizedFib(40)); // Fast with memoization

// REAL-WORLD EXAMPLE: Memoize expensive data formatting
const formatCurrency = memoize((amount, currency = "USD", locale = "en-US") => {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
});

// Called 1000 times in a table — only computes once per unique value
console.log(formatCurrency(1234.56)); // "$1,234.56"
console.log(formatCurrency(1234.56)); // Cache hit — instant

// REAL-WORLD EXAMPLE: React useMemo for expensive filtering
/*
const filteredProducts = useMemo(() => {
  return allProducts
    .filter(p => p.category === selectedCategory && p.price <= maxPrice)
    .sort((a, b) => a.price - b.price);
}, [allProducts, selectedCategory, maxPrice]); // Re-compute only when deps change
*/


/* ==================================================
19. HIGHER-ORDER FUNCTIONS
================================================== */

/*
WHY: Enable functional programming patterns
WHERE: Array methods, React HOCs, middleware
*/

function performOperation(a, b, operation) {
  return operation(a, b);
}

function createMultiplier(multiplier) {
  return function (number) { return number * multiplier; };
}

const multiplyBy5 = createMultiplier(5);
console.log(multiplyBy5(10)); // 50

// REAL-WORLD EXAMPLE: Express.js middleware (HOF pattern)
function requireAuth(handler) {
  return async function (req, res) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      req.user = verifyToken(token); // attach user to request
      return handler(req, res);      // call the original handler
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}

function requireRole(role) {
  return function (handler) {
    return async function (req, res) {
      if (req.user.role !== role) {
        return res.status(403).json({ error: "Forbidden" });
      }
      return handler(req, res);
    };
  };
}

// Usage: Clean composition of auth concerns
const getAdminData = requireAuth(requireRole("admin")(async (req, res) => {
  const data = await fetchAdminData();
  res.json(data);
}));


/* ==================================================
20. POLYFILLS
================================================== */

/*
WHY: Understand how built-in methods work, common interview question
WHERE: Understanding internals, legacy browser support
*/

Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) result.push(this[i]);
  }
  return result;
};

Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue !== undefined ? initialValue : this[0];
  let start = initialValue !== undefined ? 0 : 1;
  for (let i = start; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};

Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

// Polyfill for Promise.allSettled (important for interviews)
Promise.myAllSettled = function (promises) {
  return Promise.all(
    promises.map(p =>
      Promise.resolve(p)
        .then(value => ({ status: "fulfilled", value }))
        .catch(reason => ({ status: "rejected", reason }))
    )
  );
};

console.log([1, 2, 3].myMap(x => x * 2));


/* ==================================================
21. PROMISES - DETAILED
================================================== */

/*
WHY: Handle async operations cleanly
WHERE: API calls, file operations, any async task
States: pending → fulfilled | rejected
*/

// Implementing Promise.all manually
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    if (promises.length === 0) return resolve([]);

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          if (++completed === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
};

// REAL-WORLD EXAMPLE: Retry logic for flaky API calls
async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt === retries) throw err; // Last attempt — rethrow
      console.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
}

// Usage: Will retry up to 3 times with exponential backoff
// fetchWithRetry("/api/data").then(console.log).catch(console.error);


/* ==================================================
22. CALL, APPLY, BIND
================================================== */

const person5 = { firstName: "John", lastName: "Doe" };

function greetPerson(greeting, punctuation) {
  return `${greeting}, I'm ${this.firstName} ${this.lastName}${punctuation}`;
}

console.log(greetPerson.call(person5, "Hello", "!"));        // Call — args separated
console.log(greetPerson.apply(person5, ["Hi", "."]));        // Apply — args as array
console.log(greetPerson.bind(person5)("Hey", "!!"));         // Bind — returns new fn

// REAL-WORLD EXAMPLE: Borrowing array methods for array-like objects
function logArguments() {
  // 'arguments' is array-like but not a real array — can't call .join()
  const argsArray = Array.prototype.slice.call(arguments);
  console.log(argsArray.join(", "));
}

logArguments("a", "b", "c"); // "a, b, c"

// In modern JS, use rest parameters instead:
function logArgs(...args) {
  console.log(args.join(", "));
}


/* ==================================================
23. MODULES (ES6)
================================================== */

/*
WHY: Code organization, reusability, avoiding global scope pollution
WHERE: Every modern JavaScript application

// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export default function multiply(a, b) { return a * b; }

// app.js
import multiply, { add, subtract } from './math.js';
import * as MathUtils from './math.js';
*/

// REAL-WORLD EXAMPLE: Feature-based module structure
/*
src/
  features/
    auth/
      authSlice.js       // export const login = ...
      AuthPage.jsx       // export default AuthPage
      authService.js     // export async function loginUser(...)
    products/
      productService.js  // export async function getProducts(...)
      ProductList.jsx
  utils/
    formatters.js        // export const formatPrice = ...
    validators.js        // export const isEmail = ...
*/


/* ==================================================
   24. NEW: WeakMap & WeakSet
================================================== */

/*
WHY: Memory-efficient storage tied to object lifetime
WHERE: Private data for classes, caches keyed by DOM elements

WeakMap keys must be objects. If object is garbage collected,
the WeakMap entry is automatically removed — no memory leaks.
*/

const privateData = new WeakMap();

class User {
  constructor(name, password) {
    this.name = name;
    privateData.set(this, { password }); // Truly private — can't be accessed outside
  }

  checkPassword(input) {
    return privateData.get(this).password === input;
  }
}

const user = new User("Alice", "secret123");
console.log(user.checkPassword("secret123")); // true
console.log(user.password); // undefined — truly private!

// REAL-WORLD EXAMPLE: DOM node metadata cache
const nodeMetadata = new WeakMap();

function trackElement(el, meta) {
  nodeMetadata.set(el, meta); // Auto-cleared when element is removed from DOM
}

// When el is garbage collected (removed from DOM), WeakMap clears it automatically
// No manual cleanup needed — no memory leaks


/* ==================================================
25. NEW: GENERATORS & ITERATORS
================================================== */

/*
WHY: Lazy evaluation, infinite sequences, custom iteration
WHERE: Pagination, streaming data, async iteration (async generators)

function* = generator function
yield = pause and return a value
*/

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++; // Pause here, return id, resume on next .next() call
  }
}

const getId = idGenerator();
console.log(getId.next().value); // 1
console.log(getId.next().value); // 2
console.log(getId.next().value); // 3 — infinite, but lazy (no memory issue)

// REAL-WORLD EXAMPLE: Paginated API fetching with async generator
async function* fetchAllPages(baseUrl) {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { data, nextPage } = await fetch(`${baseUrl}?page=${page}`).then(r => r.json());
    yield data;              // Pause and hand off data
    hasMore = !!nextPage;
    page++;
  }
}

async function processAllUsers() {
  for await (const batch of fetchAllPages("/api/users")) {
    batch.forEach(user => console.log(user.name)); // Process each page
  }
}


/* ==================================================
26. NEW: PROXY & REFLECT
================================================== */

/*
WHY: Intercept and customize object operations
WHERE: Validation, reactive systems (Vue 3 uses Proxy), observability

new Proxy(target, handler) — handler defines traps for get, set, delete, etc.
*/

// REAL-WORLD EXAMPLE: Auto-validating model object
function createValidatedUser(data) {
  const schema = {
    name: v => typeof v === "string" && v.length > 0,
    age: v => typeof v === "number" && v >= 0 && v < 150,
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  };

  return new Proxy(data, {
    set(target, key, value) {
      if (schema[key] && !schema[key](value)) {
        throw new TypeError(`Invalid value for ${key}: ${value}`);
      }
      target[key] = value;
      return true; // Required by Proxy
    }
  });
}

const validUser = createValidatedUser({ name: "Alice", age: 25, email: "a@b.com" });
validUser.name = "Bob"; // OK
// validUser.age = -5;  // TypeError: Invalid value for age: -5


/* ==================================================
27. NEW: OPTIONAL CHAINING & NULLISH COALESCING
================================================== */

/*
WHY: Safely access deeply nested properties without defensive code
WHERE: API responses, optional config objects, component props
*/

const apiResponse = {
  user: {
    profile: {
      address: null
    }
  }
};

// Old way — verbose and error-prone
const city1 = apiResponse &&
  apiResponse.user &&
  apiResponse.user.profile &&
  apiResponse.user.profile.address &&
  apiResponse.user.profile.address.city;

// Modern way — Optional chaining (?.)
const city2 = apiResponse?.user?.profile?.address?.city;
console.log(city2); // undefined (no error thrown)

// Nullish coalescing (??) — only falls back on null/undefined (not 0 or "")
const city3 = city2 ?? "Unknown City";
console.log(city3); // "Unknown City"

// REAL-WORLD EXAMPLE: Safe config reading
function initApp(config) {
  const timeout = config?.network?.timeout ?? 5000;
  const retries = config?.network?.retries ?? 3;
  const debugMode = config?.debug ?? false;
  const apiUrl = config?.api?.baseUrl ?? "https://api.example.com";

  return { timeout, retries, debugMode, apiUrl };
}

console.log(initApp({})); // All defaults
console.log(initApp({ network: { timeout: 10000 } })); // Custom timeout, rest defaults


/* ==================================================
28. NEW: SYMBOL
================================================== */

/*
WHY: Creates unique, non-enumerable property keys; avoids name collisions
WHERE: Library/framework development, defining custom iteration protocols

Every Symbol() call returns a unique value — even with same description
*/

const ID = Symbol("id");
const VERSION = Symbol("version");

const plugin = {
  name: "my-plugin",
  [ID]: 42,           // Non-enumerable — won't show in for...in or JSON.stringify
  [VERSION]: "1.0.0",
};

console.log(plugin[ID]); // 42
console.log(Object.keys(plugin)); // ["name"] — ID and VERSION are hidden

// Well-known symbols: customize built-in behavior
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  // Make Range iterable using Symbol.iterator
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
}

for (const n of new Range(1, 5)) {
  console.log(n); // 1, 2, 3, 4, 5
}

console.log([...new Range(1, 5)]); // [1, 2, 3, 4, 5]


/* ==================================================
29. NEW: DESIGN PATTERNS
================================================== */

/*
WHY: Proven solutions to recurring problems; shows architectural thinking
WHERE: Large codebases, team communication, system design interviews
*/

// --- SINGLETON: Only one instance exists ---
class AppConfig {
  static instance = null;

  constructor(env) {
    if (AppConfig.instance) return AppConfig.instance; // Return existing
    this.env = env;
    this.settings = {};
    AppConfig.instance = this;
  }

  set(key, value) { this.settings[key] = value; }
  get(key) { return this.settings[key]; }
}

const config1 = new AppConfig("production");
const config2 = new AppConfig("development"); // Returns same instance!
console.log(config1 === config2); // true

// --- OBSERVER: Pub/Sub pattern ---
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
    return () => this.off(event, listener); // Returns unsubscribe fn
  }

  off(event, listener) {
    this.events[event] = (this.events[event] || []).filter(l => l !== listener);
  }

  emit(event, ...args) {
    (this.events[event] || []).forEach(listener => listener(...args));
  }
}

const bus = new EventEmitter();
const unsubscribe = bus.on("user:login", (user) => {
  console.log("User logged in:", user.name);
});

bus.emit("user:login", { name: "Alice" }); // "User logged in: Alice"
unsubscribe(); // Clean up listener

// --- FACTORY: Create objects without specifying exact class ---
function createNotification(type, message) {
  const base = { message, createdAt: new Date() };
  const types = {
    email: { ...base, send: () => console.log(`Email: ${message}`) },
    sms:   { ...base, send: () => console.log(`SMS: ${message}`) },
    push:  { ...base, send: () => console.log(`Push: ${message}`) },
  };
  if (!types[type]) throw new Error(`Unknown notification type: ${type}`);
  return types[type];
}

createNotification("email", "Welcome!").send(); // Email: Welcome!
createNotification("push", "New message").send(); // Push: New message


/* ==================================================
30. NEW: PERFORMANCE PATTERNS
================================================== */

/*
WHY: Writing correct code is step 1; writing fast code is step 2
WHERE: Large lists, animations, expensive computations
*/

// --- VIRTUAL SCROLLING concept ---
// Instead of rendering 10,000 DOM nodes, only render what's visible

function VirtualList({ items, rowHeight, visibleHeight }) {
  const visibleCount = Math.ceil(visibleHeight / rowHeight);
  let scrollTop = 0;

  function getVisibleItems() {
    const startIndex = Math.floor(scrollTop / rowHeight);
    const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
    return items.slice(startIndex, endIndex).map((item, i) => ({
      item,
      top: (startIndex + i) * rowHeight // Absolute position
    }));
  }

  return { getVisibleItems };
}

// --- REQUEST ANIMATION FRAME for smooth animations ---
function smoothCounter(target, duration, element) {
  const start = performance.now();
  const startValue = 0;

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease out
    const current = Math.round(startValue + (target - startValue) * eased);
    element.textContent = current.toLocaleString();

    if (progress < 1) requestAnimationFrame(update); // ~60fps updates
  }

  requestAnimationFrame(update);
}

// Usage: Animate "0 → 1,000,000" over 2 seconds
// smoothCounter(1000000, 2000, document.querySelector("#counter"));


/* ==================================================
COMMON INTERVIEW PATTERNS
================================================== */

// 1. Check if string is palindrome
const isPalindrome = str =>
  (cleaned => cleaned === cleaned.split("").reverse().join(""))(
    str.toLowerCase().replace(/[^a-z0-9]/g, "")
  );

// 2. Remove duplicates
const removeDuplicates = arr => [...new Set(arr)];

// 3. Find most frequent element
function findMostFrequent(arr) {
  return arr.reduce((best, item, _, arr) => {
    const count = arr.filter(x => x === item).length;
    return count > arr.filter(x => x === best).length ? item : best;
  }, arr[0]);
}

// 4. Two Sum — find pair that adds to target
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return null;
}
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]

// 5. Check balanced parentheses
function isBalanced(str) {
  const stack = [];
  const map = { ")": "(", "}": "{", "]": "[" };
  for (const ch of str) {
    if ("({[".includes(ch)) stack.push(ch);
    else if (stack.pop() !== map[ch]) return false;
  }
  return stack.length === 0;
}
console.log(isBalanced("({[]})")); // true
console.log(isBalanced("({[})")); // false

// 6. Implement pipe (functional composition)
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const processName = pipe(
  str => str.trim(),
  str => str.toLowerCase(),
  str => str.replace(/\s+/g, "-")
);
console.log(processName("  Hello World  ")); // "hello-world"

// 7. Group array by property
function groupBy(arr, key) {
  return arr.reduce((result, item) => {
    const group = item[key];
    result[group] = result[group] || [];
    result[group].push(item);
    return result;
  }, {});
}

// 8. Deep equal comparison
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object") return false;
  if (a === null || b === null) return false;
  const keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(key => deepEqual(a[key], b[key]));
}

console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(deepEqual({ a: 1 }, { a: 2 })); // false

// 9. Implement once() — function that executes only once
function once(fn) {
  let called = false, result;
  return function (...args) {
    if (!called) {
      result = fn.apply(this, args);
      called = true;
    }
    return result;
  };
}

const initSDK = once(() => console.log("SDK initialized"));
initSDK(); // "SDK initialized"
initSDK(); // Silently ignored
initSDK(); // Silently ignored


/* ==================================================
CONNECTION SUMMARY
================================================== */

/*
CLOSURES appear in:
- Debounce/Throttle (remember timer)
- Memoization (remember cache)
- Currying (remember previous arguments)
- Module pattern (private variables)
- WeakMap private data

HIGHER-ORDER FUNCTIONS:
- map, filter, reduce (take functions as arguments)
- Debounce, throttle, once (return functions)
- Curry, pipe, compose

ASYNC PATTERNS:
- Callbacks → Promises → Async/Await
- Promise.all (parallel), allSettled (tolerate failures)
- Retry with exponential backoff
- Async generators for streaming/pagination
- Event Loop controls execution order

PROTOTYPES & THIS:
- Foundation of classes and inheritance
- call, apply, bind control 'this'
- Arrow functions don't bind 'this'
- Class field arrow functions solve event handler 'this' bug

MEMORY & PERFORMANCE:
- WeakMap/WeakSet for auto-cleaned caches
- Generators for lazy infinite sequences
- Virtual scrolling for large lists
- requestAnimationFrame for smooth animations
- Break up heavy work to avoid blocking event loop

DESIGN PATTERNS:
- Singleton (one global instance)
- Observer/EventEmitter (pub/sub)
- Factory (create objects by type)
- Proxy (intercept + validate)

MODERN FEATURES (often missed):
- Optional chaining (?.) & nullish coalescing (??)
- Symbol (unique keys, custom iteration)
- Proxy & Reflect (metaprogramming)
- Generators & async generators
- structuredClone for deep copy
- Promise.allSettled for resilient parallel requests

KEY INTERVIEW TOPICS (ordered by frequency):
1.  Closures
2.  Promises & Async/Await
3.  Event Loop
4.  Array methods (map, filter, reduce)
5.  Debounce/Throttle
6.  Deep vs Shallow copy
7.  Hoisting & Scope
8.  'this' keyword
9.  Prototypes & Inheritance
10. Currying & Memoization
11. Design Patterns (Observer, Singleton, Factory)
12. Optional chaining & nullish coalescing
13. Generators
14. Proxy
15. WeakMap/WeakSet
*/