export const functionQuestions = [
  {
    id: 1,
    title: "Function Declaration vs Expression",
    difficulty: "Easy",
    description: "Write both a function declaration and a function expression that takes two numbers and returns their sum. Explain the difference between them.",
    example: "Input: add(5, 3)\nOutput: 8\nExplanation: Both function types should return the sum.",
    starterCode: `// Function Declaration
function addDeclaration(a, b) {
  // Write your code here
}

// Function Expression
const addExpression = function(a, b) {
  // Write your code here
};`
  },
  {
    id: 2,
    title: "Arrow Functions",
    difficulty: "Easy",
    description: "Convert a regular function to an arrow function. Write an arrow function that takes an array of numbers and returns a new array with each number doubled.",
    example: "Input: [1, 2, 3, 4]\nOutput: [2, 4, 6, 8]\nExplanation: Each number is multiplied by 2.",
    starterCode: `const doubleNumbers = (arr) => {
  // Write your code here
  
};`
  },
  {
    id: 3,
    title: "Higher-Order Functions",
    difficulty: "Medium",
    description: "Create a higher-order function that takes a function as an argument and returns a new function that calls the original function twice.",
    example: "Input: callTwice(console.log)('Hello')\nOutput: 'Hello' (printed twice)\nExplanation: The function is executed twice.",
    starterCode: `function callTwice(fn) {
  // Write your code here
  
}`
  },
  {
    id: 4,
    title: "Closures",
    difficulty: "Medium",
    description: "Create a function that returns a counter function. Each time the counter function is called, it should increment and return the count.",
    example: "Input: const counter = createCounter(); counter(); counter(); counter();\nOutput: 1, 2, 3\nExplanation: The closure maintains the count state.",
    starterCode: `function createCounter() {
  // Write your code here
  
}`
  },
  {
    id: 5,
    title: "Function Currying",
    difficulty: "Medium",
    description: "Implement a curry function that transforms a function with multiple arguments into a sequence of functions each taking a single argument.",
    example: "Input: const curriedAdd = curry((a, b, c) => a + b + c); curriedAdd(1)(2)(3);\nOutput: 6\nExplanation: Arguments are provided one at a time.",
    starterCode: `function curry(fn) {
  // Write your code here
  
}`
  },
  {
    id: 6,
    title: "Function Composition",
    difficulty: "Medium",
    description: "Create a compose function that takes multiple functions as arguments and returns a new function that applies them from right to left.",
    example: "Input: const addThenDouble = compose(x => x * 2, x => x + 1); addThenDouble(3);\nOutput: 8\nExplanation: (3 + 1) * 2 = 8",
    starterCode: `function compose(...fns) {
  // Write your code here
  
}`
  },
  {
    id: 7,
    title: "Memoization",
    difficulty: "Hard",
    description: "Implement a memoize function that caches the results of expensive function calls and returns the cached result when the same inputs occur again.",
    example: "Input: const memoizedFib = memoize(fibonacci); memoizedFib(10);\nOutput: 55 (computed once, then cached)\nExplanation: Subsequent calls with same input use cached result.",
    starterCode: `function memoize(fn) {
  // Write your code here
  
}`
  },
  {
    id: 8,
    title: "Debounce Function",
    difficulty: "Hard",
    description: "Implement a debounce function that delays the execution of a function until after a specified wait time has elapsed since the last time it was invoked.",
    example: "Input: const debouncedFn = debounce(fn, 1000); debouncedFn(); debouncedFn();\nOutput: Function executes once after 1000ms\nExplanation: Multiple rapid calls result in single execution.",
    starterCode: `function debounce(fn, delay) {
  // Write your code here
  
}`
  },
  {
    id: 9,
    title: "Throttle Function",
    difficulty: "Hard",
    description: "Implement a throttle function that ensures a function is called at most once in a specified time period.",
    example: "Input: const throttledFn = throttle(fn, 1000); throttledFn(); throttledFn();\nOutput: Function executes immediately, then waits 1000ms\nExplanation: Subsequent calls within time window are ignored.",
    starterCode: `function throttle(fn, limit) {
  // Write your code here
  
}`
  },
  {
    id: 10,
    title: "Partial Application",
    difficulty: "Medium",
    description: "Create a partial function that allows you to fix a certain number of arguments to a function, producing another function of smaller arity.",
    example: "Input: const add5 = partial(add, 5); add5(10);\nOutput: 15\nExplanation: First argument is pre-filled with 5.",
    starterCode: `function partial(fn, ...fixedArgs) {
  // Write your code here
  
}`
  },
  {
    id: 11,
    title: "Function Pipe",
    difficulty: "Medium",
    description: "Create a pipe function that takes multiple functions and returns a new function that applies them from left to right (opposite of compose).",
    example: "Input: const addThenDouble = pipe(x => x + 1, x => x * 2); addThenDouble(3);\nOutput: 8\nExplanation: (3 + 1) * 2 = 8",
    starterCode: `function pipe(...fns) {
  // Write your code here
  
}`
  },
  {
    id: 12,
    title: "Once Function",
    difficulty: "Medium",
    description: "Implement a once function that ensures a given function can only be called one time. Repeated calls should return the result of the first call.",
    example: "Input: const onceAdd = once((a, b) => a + b); onceAdd(2, 3); onceAdd(5, 7);\nOutput: 5, 5\nExplanation: Second call returns cached result from first call.",
    starterCode: `function once(fn) {
  // Write your code here
  
}`
  }
];
