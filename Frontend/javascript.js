/* ==================================================
   1. HOISTING
   ==================================================
   WHAT:
   - JavaScript moves variable & function declarations to the top of the scope
   - Only declarations are hoisted, NOT initializations

   REAL WORLD ANALOGY:
   - Like reserving a meeting room name in advance, but deciding the agenda later
*/

console.log("Hoisting example:");
console.log(a); // undefined (not error)
var a = 10;

hoistedFunction(); // Works because function declaration is hoisted

function hoistedFunction() {
  console.log("I am hoisted");
}

// console.log(b); // ❌ ReferenceError
let b = 20;

/* ==================================================
   2. CLOSURES
   ==================================================
   WHAT:
   - A function remembers variables from its outer scope

   REAL WORLD ANALOGY:
   - A backpack: wherever you go, you carry your belongings
*/

console.log("\nClosure example:");

function createCounter() {
  let count = 0;

  return function () {
    count++;
    console.log(count);
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3

/* ==================================================
   3. PROMISE
   ==================================================
   WHAT:
   - Represents a value that will be available in the future
   - States: pending → fulfilled / rejected

   REAL WORLD ANALOGY:
   - Food delivery order: you place order now, food comes later
*/

console.log("\nPromise example:");

const foodOrder = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("🍕 Pizza delivered");
  }, 1000);
});

foodOrder.then(result => console.log(result));

/* ==================================================
   4. ASYNC & AWAIT
   ==================================================
   WHAT:
   - Cleaner way to work with promises
   - async returns a promise
   - await pauses execution until promise resolves

   REAL WORLD ANALOGY:
   - Waiting at a restaurant until food arrives
*/

console.log("\nAsync/Await example:");

function getUser() {
  return new Promise(resolve => {
    setTimeout(() => resolve({ name: "Abbb" }), 1000);
  });
}

async function showUser() {
  const user = await getUser();
  console.log(user);
}

showUser();

/* ==================================================
   5. DEBOUNCE
   ==================================================
   WHAT:
   - Executes function only after user stops triggering event

   REAL WORLD ANALOGY:
   - Searching on Google: request sent only after you stop typing
*/

console.log("\nDebounce example:");

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const search = debounce((query) => {
  console.log("Searching for", query);
}, 500);

search("R");
search("Re");
search("Rea");
search("React");

/* ==================================================
   6. THROTTLE
   ==================================================
   WHAT:
   - Ensures function runs at most once in a given time

   REAL WORLD ANALOGY:
   - Elevator capacity: only one batch allowed at a time
*/

console.log("\nThrottle example:");

function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const handleScroll = throttle(() => {
  console.log("Scroll event fired");
}, 1000);

handleScroll();
handleScroll();
handleScroll();

/* ==================================================
   7. SHALLOW COPY
   ==================================================
   WHAT:
   - Copies reference for nested objects

   REAL WORLD ANALOGY:
   - Photocopy of a document folder but same inner files
*/

console.log("\nShallow copy example:");

const user1 = {
  name: "John",
  address: { city: "Delhi" }
};

const shallowCopy = { ...user1 };
shallowCopy.address.city = "Mumbai";

console.log(user1.address.city); // Mumbai ❗

/* ==================================================
   8. DEEP COPY
   ==================================================
   WHAT:
   - Completely independent copy

   REAL WORLD ANALOGY:
   - New folder with new copies of all files
*/

console.log("\nDeep copy example:");

const deepCopy = JSON.parse(JSON.stringify(user1));
deepCopy.address.city = "Bangalore";

console.log(user1.address.city); // Mumbai
console.log(deepCopy.address.city); // Bangalore

/* ==================================================
   9. EVENT LOOP
   ==================================================
   WHAT:
   - Handles async operations
   - Call Stack → Microtask Queue → Macrotask Queue

   REAL WORLD ANALOGY:
   - Restaurant waiter prioritizing VIP orders first
*/

console.log("\nEvent Loop example:");

console.log("Start");

setTimeout(() => console.log("setTimeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");

/* OUTPUT ORDER:
   Start
   End
   Promise
   setTimeout
*/
