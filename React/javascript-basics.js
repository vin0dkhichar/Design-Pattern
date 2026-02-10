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
user1.name = "Charlie";  // ✅ This works! (mutating object)
// user1 = {};           // ❌ This fails! (reassigning)


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
const subtractNumbers = function(a, b) {
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
// console.log(blockScoped); // ❌ ReferenceError

// Function scope with var
function demo() {
  if (true) {
    var functionScoped = "I leak out of the if block";
  }
  console.log(functionScoped); // ✅ Works
}

// Hoisting example
hoisted(); // ✅ Works (function declaration is hoisted)
function hoisted() {
  console.log("Hoisted function");
}

// notHoisted(); // ❌ Cannot access before initialization
const notHoisted = () => {
  console.log("Not hoisted");
};

// Temporal Dead Zone
{
  // console.log(x); // ❌ ReferenceError (TDZ)
  let x = 5;
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
// console.log(balance); // ❌ Cannot access private variable


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


/* ================================
   8. this Keyword
================================ */

/*
WHY: 'this' behavior is a common source of bugs and interview questions
WHERE: Object methods, event handlers, classes, React components

'this' refers to the object that is executing the current function
Its value depends on HOW the function is called
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

person1.greet();      // "Hello, Rahul" ✅
person1.greetArrow(); // undefined (arrow functions don't bind 'this')

// this in different contexts
function regularFunction() {
  console.log(this); // window (or undefined in strict mode)
}

// Event handler issue (common interview question)
const button = {
  text: "Click me",
  click: function() {
    console.log(this.text);
  }
};

button.click(); // "Click me" ✅
// setTimeout(button.click, 1000); // undefined ❌ (loses context)

// Solutions:
// 1. Arrow function
setTimeout(() => button.click(), 1000);

// 2. bind()
setTimeout(button.click.bind(button), 1000);

// call() and apply()
function introduce(greeting, punctuation) {
  console.log(greeting + ", I'm " + this.name + punctuation);
}

const person2 = { name: "Alice" };
introduce.call(person2, "Hello", "!");    // Hello, I'm Alice!
introduce.apply(person2, ["Hi", "."]);    // Hi, I'm Alice.


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

fetchDataCallback((data) => {
  console.log(data);
});

// Promise
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("Data loaded");
      } else {
        reject("Error occurred");
      }
    }, 1000);
  });
}

// Using .then()
fetchDataPromise()
  .then(data => console.log(data))
  .catch(err => console.error(err));

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

// Promise.race (first promise to resolve/reject wins)
Promise.race([
  fetchDataPromise(),
  new Promise((_, reject) => 
    setTimeout(() => reject("Timeout"), 5000)
  )
]);


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
  if (age < 0) {
    throw new ValidationError("Age cannot be negative");
  }
  return true;
}

try {
  validateAge(-5);
} catch (err) {
  if (err instanceof ValidationError) {
    console.error("Validation error:", err.message);
  }
}


/* ==================================================
   11. FLATTEN AN ARRAY
================================================== */

/*
WHY: Common interview question; tests recursion understanding
WHERE: Data normalization, processing nested API responses

Problem: Convert nested array into single flat array
Input:  [1, [2, [3, 4]], 5]
Output: [1, 2, 3, 4, 5]
*/

function flattenArray(arr) {
  let result = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item)); // Recursive call
    } else {
      result.push(item);
    }
  }

  return result;
}

// Modern approach using flat()
const nestedArray = [1, [2, [3, 4]], 5];
console.log("Flattened:", flattenArray(nestedArray));
console.log("Using flat():", nestedArray.flat(Infinity));


/* ==================================================
   12. DEBOUNCE
================================================== */

/*
WHY: Optimize performance by limiting function calls
WHERE: Search input, window resize, scroll events, API calls

Problem: Function called too often (e.g., on every keystroke)
Solution: Execute function only after user stops typing for X milliseconds
*/

function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer); // Cancel previous timer
    
    timer = setTimeout(() => {
      fn.apply(this, args); // Execute after delay
    }, delay);
  };
}

// Example: Search only after user stops typing for 500ms
const searchDebounced = debounce((text) => {
  console.log("Searching for:", text);
}, 500);

searchDebounced("r");      // Cancelled
searchDebounced("re");     // Cancelled
searchDebounced("rea");    // Cancelled
searchDebounced("react");  // Executes after 500ms


/* ==================================================
   13. THROTTLE
================================================== */

/*
WHY: Limit function execution to once per time interval
WHERE: Scroll events, mouse movement, resize events

Difference from Debounce:
- Debounce: Waits for pause in events
- Throttle: Executes at regular intervals
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

// Example: Log scroll position max once per 1000ms
const handleScroll = throttle(() => {
  console.log("Scrolled:", window.scrollY);
}, 1000);

// window.addEventListener('scroll', handleScroll);


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

// Shallow copy (only copies first level)
const shallow1 = { ...originalObj };
const shallow2 = Object.assign({}, originalObj);

shallow1.name = "Bob";           // ✅ Original unchanged
shallow1.address.city = "Mumbai"; // ❌ Original CHANGED (nested reference)

// Deep copy (copies all levels)
const deep1 = JSON.parse(JSON.stringify(originalObj)); // Simple but has limitations
// Limitations: doesn't copy functions, undefined, Date, RegExp, etc.

// Better deep copy (for complex objects)
function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepCopy(item));
  
  const copy = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }
  return copy;
}

// Modern approach (if available)
// const deep2 = structuredClone(original);


/* ==================================================
   15. EVENT LOOP
================================================== */

/*
WHY: Fundamental to understanding async JavaScript
WHERE: All async operations, promises, setTimeout, setInterval

JavaScript is single-threaded but can handle async operations using:
1. Call Stack
2. Web APIs (browser provides)
3. Callback Queue (Task Queue)
4. Microtask Queue (Promise callbacks)
5. Event Loop

Order of execution:
1. Synchronous code
2. Microtasks (Promises, queueMicrotask)
3. Macrotasks (setTimeout, setInterval, setImmediate)
*/

console.log("1: Start");

setTimeout(() => {
  console.log("2: Timeout"); // Macrotask
}, 0);

Promise.resolve().then(() => {
  console.log("3: Promise"); // Microtask
});

console.log("4: End");

// Output order:
// 1: Start
// 4: End
// 3: Promise (microtask runs first)
// 2: Timeout (macrotask runs after)


/* ==================================================
   16. PROTOTYPES & INHERITANCE
================================================== */

/*
WHY: Foundation of JavaScript's object-oriented programming
WHERE: Understanding classes, inheritance, method lookup
*/

// Every object has a prototype
const obj = {};
console.log(obj.__proto__); // Object.prototype

// Constructor function
function PersonConstructor(name, age) {
  this.name = name;
  this.age = age;
}

// Add method to prototype (shared across all instances)
PersonConstructor.prototype.greet = function() {
  return `Hi, I'm ${this.name}`;
};

const person3 = new PersonConstructor("Alice", 25);
const person4 = new PersonConstructor("Bob", 30);

console.log(person3.greet()); // "Hi, I'm Alice"
console.log(person3.greet === person4.greet); // true (same function)

// Prototype chain
console.log(person3.hasOwnProperty("name")); // true
console.log(person3.hasOwnProperty("greet")); // false (on prototype)

// Modern class syntax (syntactic sugar over prototypes)
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  speak() {
    return `${this.name} barks`;
  }
}

const dog = new Dog("Max", "Labrador");
console.log(dog.speak()); // "Max barks"


/* ==================================================
   17. CURRYING
================================================== */

/*
WHY: Creates specialized functions, improves reusability
WHERE: Functional programming, React hooks, Redux

Currying: Transform function with multiple arguments
into sequence of functions each taking single argument
*/

// Regular function
function addThreeNumbers(a, b, c) {
  return a + b + c;
}

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(curriedAdd(1)(2)(3)); // 6

// Using arrow functions
const curriedAddArrow = a => b => c => a + b + c;

// Practical example
function multiplyBy(a) {
  return function(b) {
    return a * b;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Generic curry function
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

const curriedSum = curry((a, b, c) => a + b + c);
console.log(curriedSum(1)(2)(3));     // 6
console.log(curriedSum(1, 2)(3));     // 6
console.log(curriedSum(1, 2, 3));     // 6


/* ==================================================
   18. MEMOIZATION
================================================== */

/*
WHY: Cache expensive function results to improve performance
WHERE: React.memo, useMemo, expensive calculations, recursive functions
*/

function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      console.log("Fetching from cache:", key);
      return cache[key];
    }
    
    console.log("Calculating result for:", key);
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Expensive function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFib = memoize(fibonacci);

console.log(memoizedFib(40)); // Slow first time
console.log(memoizedFib(40)); // Instant from cache


/* ==================================================
   19. HIGHER-ORDER FUNCTIONS
================================================== */

/*
WHY: Enable functional programming patterns
WHERE: Array methods, React HOCs, middleware

A function that:
1. Takes a function as argument, OR
2. Returns a function
*/

// Function that takes function as argument
function performOperation(a, b, operation) {
  return operation(a, b);
}

console.log(performOperation(5, 3, (x, y) => x + y)); // 8
console.log(performOperation(5, 3, (x, y) => x * y)); // 15

// Function that returns function
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const multiplyBy5 = createMultiplier(5);
console.log(multiplyBy5(10)); // 50

// Practical example: Array filter
function createFilter(condition) {
  return function(array) {
    return array.filter(condition);
  };
}

const filterEven = createFilter(n => n % 2 === 0);
console.log(filterEven([1, 2, 3, 4, 5])); // [2, 4]


/* ==================================================
   20. POLYFILLS
================================================== */

/*
WHY: Understand how built-in methods work, common interview question
WHERE: Understanding internals, legacy browser support
*/

// Polyfill for Array.prototype.map
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(callback(this[i], i, this));
    }
    return result;
  };
}

console.log([1, 2, 3].myMap(x => x * 2)); // [2, 4, 6]

// Polyfill for Array.prototype.filter
Array.prototype.myFilter = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// Polyfill for Array.prototype.reduce
Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;
  
  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  
  return accumulator;
};

// Polyfill for bind
Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  return function(...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};


/* ==================================================
   21. PROMISES - DETAILED
================================================== */

/*
WHY: Handle async operations cleanly
WHERE: API calls, file operations, any async task
*/

// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  
  if (success) {
    resolve("Operation successful");
  } else {
    reject("Operation failed");
  }
});

// Promise states: pending, fulfilled, rejected

// Promise chaining
fetchDataPromise()
  .then(data => {
    console.log(data);
    return "processed " + data;
  })
  .then(processed => {
    console.log(processed);
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    console.log("Cleanup");
  });

// Implementing Promise.all manually
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completed++;
          
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
};


/* ==================================================
   22. CALL, APPLY, BIND
================================================== */

/*
WHY: Control 'this' context in functions
WHERE: Event handlers, borrowing methods, React class components
*/

const person5 = {
  firstName: "John",
  lastName: "Doe"
};

function greetPerson(greeting, punctuation) {
  return `${greeting}, I'm ${this.firstName} ${this.lastName}${punctuation}`;
}

// call - invoke immediately with arguments separated
console.log(greetPerson.call(person5, "Hello", "!"));

// apply - invoke immediately with arguments as array
console.log(greetPerson.apply(person5, ["Hi", "."]));

// bind - returns new function with bound context
const boundGreet = greetPerson.bind(person5);
console.log(boundGreet("Hey", "!!"));

// Partial application with bind
const greetJohn = greetPerson.bind(person5, "Hello");
console.log(greetJohn("!"));


/* ==================================================
   23. MODULES (ES6)
================================================== */

/*
WHY: Code organization, reusability, avoiding global scope pollution
WHERE: Every modern JavaScript application

// math.js (file 1)
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

export default function multiply(a, b) {
  return a * b;
}

// app.js (file 2)
import multiply, { add, subtract } from './math.js';
import * as MathUtils from './math.js';

console.log(add(2, 3));
console.log(multiply(2, 3));
console.log(MathUtils.add(5, 5));
*/


/* ==================================================
   24. COMMON INTERVIEW PATTERNS
================================================== */

// 1. Check if string is palindrome
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

// 2. Remove duplicates from array
const removeDuplicates = arr => [...new Set(arr)];

// 3. Find most frequent element
function findMostFrequent(arr) {
  const frequency = {};
  let maxCount = 0;
  let mostFrequent;
  
  arr.forEach(item => {
    frequency[item] = (frequency[item] || 0) + 1;
    if (frequency[item] > maxCount) {
      maxCount = frequency[item];
      mostFrequent = item;
    }
  });
  
  return mostFrequent;
}

// 4. Reverse a string
const reverseString = str => str.split('').reverse().join('');

// 5. Check if two strings are anagrams
function areAnagrams(str1, str2) {
  const normalize = str => str.toLowerCase().split('').sort().join('');
  return normalize(str1) === normalize(str2);
}

// 6. Sum of array
const sumArray = arr => arr.reduce((a, b) => a + b, 0);

// 7. Find max value
const findMax = arr => Math.max(...arr);

// 8. Capitalize first letter of each word
function capitalizeWords(str) {
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// 9. Group array of objects by property
function groupBy(arr, key) {
  return arr.reduce((result, item) => {
    const group = item[key];
    result[group] = result[group] || [];
    result[group].push(item);
    return result;
  }, {});
}

const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 }
];
console.log(groupBy(users, 'age'));


/* ==================================================
   CONNECTION SUMMARY
================================================== */

/*
CLOSURES appear in:
- Debounce and Throttle (remember timer)
- Memoization (remember cache)
- Currying (remember previous arguments)
- Module pattern (private variables)

HIGHER-ORDER FUNCTIONS:
- map, filter, reduce (take functions as arguments)
- Debounce, throttle (return functions)
- Curry (returns functions)

ASYNC PATTERNS:
- Callbacks → Promises → Async/Await
- Event Loop controls execution order
- Crucial for API calls, React useEffect

PROTOTYPES & THIS:
- Foundation of classes and inheritance
- call, apply, bind control 'this'
- Arrow functions don't bind 'this'

KEY INTERVIEW TOPICS:
1. Closures ⭐⭐⭐
2. Promises & Async/Await ⭐⭐⭐
3. Event Loop ⭐⭐⭐
4. Array methods (map, filter, reduce) ⭐⭐⭐
5. Debounce/Throttle ⭐⭐
6. Deep vs Shallow copy ⭐⭐
7. Hoisting & Scope ⭐⭐
8. this keyword ⭐⭐
9. Prototypes ⭐
10. Currying & Memoization ⭐
*/