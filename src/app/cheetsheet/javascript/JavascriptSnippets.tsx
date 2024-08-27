"use client";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

const jsBasics = [
  {
    concept: "Variables",
    description:
      "Declaring variables in JavaScript using `var`, `let`, and `const`.",
    snippet: `
      // Using var (function-scoped)
      var x = 10;

      // Using let (block-scoped)
      let y = 20;

      // Using const (block-scoped, constant value)
      const z = 30;
    `,
  },
  {
    concept: "Data Types",
    description:
      "Different data types in JavaScript including numbers, strings, booleans, objects, and arrays.",
    snippet: `
      // Number
      let num = 100;

      // String
      let name = 'JavaScript';

      // Boolean
      let isActive = true;

      // Object
      let person = {
        firstName: 'John',
        lastName: 'Doe'
      };

      // Array
      let colors = ['red', 'green', 'blue'];
    `,
  },
  {
    concept: "Operators",
    description:
      "Basic operators in JavaScript like arithmetic, comparison, and logical operators.",
    snippet: `
      // Arithmetic Operators
      let sum = 5 + 3;   // 8
      let difference = 10 - 6; // 4

      // Comparison Operators
      let isEqual = 10 == '10'; // true
      let isIdentical = 10 === '10'; // false

      // Logical Operators
      let andCondition = true && false; // false
      let orCondition = true || false; // true
    `,
  },
  {
    concept: "Functions",
    description: "Defining and calling a function in JavaScript.",
    snippet: `
      // Function Declaration
      function greet(name) {
        return 'Hello, ' + name;
      }

      // Calling the function
      let greeting = greet('Alice'); // 'Hello, Alice'
    `,
  },
  {
    concept: "Conditionals",
    description: "Using if-else statements to make decisions in your code.",
    snippet: `
      let age = 20;

      // If-else statement
      if (age >= 18) {
        console.log('You are an adult.');
      } else {
        console.log('You are a minor.');
      }
    `,
  },
  {
    concept: "Loops",
    description:
      "Using loops to iterate over elements or repeat a block of code.",
    snippet: `
      // For loop
      for (let i = 0; i < 5; i++) {
        console.log('Iteration:', i);
      }

      // While loop
      let count = 0;
      while (count < 5) {
        console.log('Count:', count);
        count++;
      }
    `,
  },
  {
    concept: "Array Declaration",
    description: "Declaring arrays in JavaScript using square brackets.",
    snippet: `
      // Empty array
      let emptyArray = [];

      // Array with initial elements
      let numbers = [1, 2, 3, 4, 5];

      // Array of strings
      let fruits = ['apple', 'banana', 'cherry'];
    `,
  },
  {
    concept: "Accessing Elements",
    description: "Accessing elements in an array using their index.",
    snippet: `
      let fruits = ['apple', 'banana', 'cherry'];

      // Accessing the first element
      let firstFruit = fruits[0]; // 'apple'

      // Accessing the last element
      let lastFruit = fruits[fruits.length - 1]; // 'cherry'
    `,
  },
  {
    concept: "Adding Elements",
    description: "Adding elements to an array using `push()` and `unshift()`.",
    snippet: `
      let fruits = ['apple', 'banana'];

      // Add to the end
      fruits.push('cherry'); // ['apple', 'banana', 'cherry']

      // Add to the beginning
      fruits.unshift('orange'); // ['orange', 'apple', 'banana', 'cherry']
    `,
  },
  {
    concept: "Removing Elements",
    description:
      "Removing elements from an array using `pop()`, `shift()`, and `splice()`.",
    snippet: `
      let fruits = ['apple', 'banana', 'cherry'];

      // Remove the last element
      let lastFruit = fruits.pop(); // ['apple', 'banana']

      // Remove the first element
      let firstFruit = fruits.shift(); // ['banana', 'cherry']

      // Remove elements by index using splice
      let removedFruit = fruits.splice(1, 1); // ['banana'] ['cherry']
    `,
  },
  {
    concept: "Iterating Over an Array",
    description:
      "Iterating over array elements using `for` loops and `forEach()`.",
    snippet: `
      let numbers = [1, 2, 3, 4, 5];

      // Using a for loop
      for (let i = 0; i < numbers.length; i++) {
        console.log(numbers[i]);
      }

      // Using forEach
      numbers.forEach(number => console.log(number));
    `,
  },
  {
    concept: "Array Methods",
    description:
      "Common array methods like `map()`, `filter()`, and `reduce()`.",
    snippet: `
      let numbers = [1, 2, 3, 4, 5];

      // map: creates a new array with each element doubled
      let doubled = numbers.map(x => x * 2); // [2, 4, 6, 8, 10]

      // filter: creates a new array with elements that are even
      let evens = numbers.filter(x => x % 2 === 0); // [2, 4]

      // reduce: sums all elements of the array
      let sum = numbers.reduce((acc, cur) => acc + cur, 0); // 15
    `,
  },
  {
    concept: "Array Destructuring",
    description:
      "Extracting values from an array using destructuring assignment.",
    snippet: `
      let numbers = [10, 20, 30];

      // Destructuring assignment
      let [first, second, third] = numbers;

      console.log(first); // 10
      console.log(second); // 20
      console.log(third); // 30
    `,
  },
  {
    concept: "Finding Elements",
    description: "Finding elements in an array using `find()` and `indexOf()`.",
    snippet: `
      let numbers = [1, 2, 3, 4, 5];

      // find: returns the first element that matches the condition
      let firstEven = numbers.find(x => x % 2 === 0); // 2

      // indexOf: returns the index of the first occurrence of the element
      let index = numbers.indexOf(3); // 2
    `,
  },
  {
    concept: "Concatenating Arrays",
    description:
      "Combining two or more arrays using `concat()` and spread operator.",
    snippet: `
      let array1 = [1, 2, 3];
      let array2 = [4, 5, 6];

      // Using concat
      let combined = array1.concat(array2); // [1, 2, 3, 4, 5, 6]

      // Using spread operator
      let combinedSpread = [...array1, ...array2]; // [1, 2, 3, 4, 5, 6]
    `,
  },
  {
    concept: "Array Sorting",
    description: "Sorting elements in an array using `sort()` and `reverse()`.",
    snippet: `
      let numbers = [3, 1, 4, 1, 5, 9];

      // sort: sorts the array in place
      numbers.sort(); // [1, 1, 3, 4, 5, 9]

      // reverse: reverses the order of the array elements
      numbers.reverse(); // [9, 5, 4, 3, 1, 1]
    `,
  },
  {
    concept: "Array Length",
    description:
      "Getting the number of elements in an array using the `length` property.",
    snippet: `
      let fruits = ['apple', 'banana', 'cherry'];

      // Get the length of the array
      let length = fruits.length; // 3
    `,
  },
  {
    concept: "Array Includes",
    description:
      "Checking if an array includes a specific element using `includes()`.",
    snippet: `
      let fruits = ['apple', 'banana', 'cherry'];

      // Check if 'banana' is in the array
      let hasBanana = fruits.includes('banana'); // true

      // Check if 'grape' is in the array
      let hasGrape = fruits.includes('grape'); // false
    `,
  },
  {
    concept: "Array Spread Operator",
    description: "Using the spread operator (`...`) to copy or merge arrays.",
    snippet: `
      let fruits = ['apple', 'banana', 'cherry'];

      // Copy an array
      let moreFruits = [...fruits]; // ['apple', 'banana', 'cherry']

      // Merge arrays
      let vegetables = ['carrot', 'lettuce'];
      let food = [...fruits, ...vegetables]; // ['apple', 'banana', 'cherry', 'carrot', 'lettuce']
    `,
  },
  {
    concept: "Array FindIndex",
    description:
      "Finding the index of the first element that satisfies a condition using `findIndex()`.",
    snippet: `
      let numbers = [4, 9, 16, 25];

      // Find the index of the first number greater than 10
      let index = numbers.findIndex(num => num > 10); // 1
    `,
  },
  {
    concept: "Array Slice",
    description:
      "Extracting a section of an array without modifying the original array using `slice()`.",
    snippet: `
      let numbers = [1, 2, 3, 4, 5];

      // Get a portion of the array
      let sliced = numbers.slice(1, 3); // [2, 3]

      // Original array remains unchanged
      console.log(numbers); // [1, 2, 3, 4, 5]
    `,
  },
  {
    concept: "Array Splice",
    description:
      "Modifying an array by removing or replacing elements using `splice()`.",
    snippet: `
      let numbers = [1, 2, 3, 4, 5];

      // Remove 2 elements starting from index 1
      let removed = numbers.splice(1, 2); // [2, 3]
      
      // Replace elements at index 1
      numbers.splice(1, 0, 6, 7); // [1, 6, 7, 4, 5]
    `,
  },
  {
    concept: "Array Join",
    description:
      "Joining all elements of an array into a string using `join()`.",
    snippet: `
      let words = ['Hello', 'world'];

      // Join array elements into a single string
      let sentence = words.join(' '); // 'Hello world'
    `,
  },
  {
    concept: "Array Split",
    description: "Splitting a string into an array using `split()`.",
    snippet: `
      let sentence = 'Hello world';

      // Split the string into an array
      let words = sentence.split(' '); // ['Hello', 'world']
    `,
  },
  {
    concept: "Array Flat",
    description:
      "Flattening a nested array into a single-level array using `flat()`.",
    snippet: `
      let nestedArray = [1, [2, 3], [4, [5, 6]]];

      // Flatten the array by one level
      let flatArray = nestedArray.flat(); // [1, 2, 3, 4, [5, 6]]

      // Flatten the array completely
      let fullyFlatArray = nestedArray.flat(2); // [1, 2, 3, 4, 5, 6]
    `,
  },
  {
    concept: "Array Fill",
    description: "Filling an array with a static value using `fill()`.",
    snippet: `
      let numbers = [1, 2, 3, 4, 5];

      // Fill the array with the value 0
      numbers.fill(0); // [0, 0, 0, 0, 0]

      // Fill part of the array with the value 7
      numbers.fill(7, 1, 3); // [0, 7, 7, 0, 0]
    `,
  },
  {
    concept: "Array From",
    description:
      "Creating an array from an array-like or iterable object using `Array.from()`.",
    snippet: `
      // Create an array from a string
      let arrayFromString = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']

      // Create an array from a Set
      let mySet = new Set(['apple', 'banana', 'cherry']);
      let arrayFromSet = Array.from(mySet); // ['apple', 'banana', 'cherry']
    `,
  },
  {
    concept: "Array Of",
    description:
      "Creating a new array with a variable number of arguments using `Array.of()`.",
    snippet: `
      // Create an array from individual arguments
      let numbers = Array.of(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]

      // Create an empty array
      let emptyArray = Array.of(); // []
    `,
  },
  {
    concept: "Array ReduceRight",
    description:
      "Applying a function against an accumulator for each element of an array from right to left using `reduceRight()`.",
    snippet: `
      let numbers = [1, 2, 3, 4, 5];

      // Calculate the difference starting from the right
      let difference = numbers.reduceRight((acc, curr) => acc - curr); // -5
    `,
  },
  {
    concept: "Array Every",
    description:
      "Checking if all elements in an array pass a test using `every()`.",
    snippet: `
      let numbers = [2, 4, 6, 8];

      // Check if all numbers are even
      let allEven = numbers.every(num => num % 2 === 0); // true
    `,
  },
  {
    concept: "Array Some",
    description:
      "Checking if at least one element in an array passes a test using `some()`.",
    snippet: `
      let numbers = [1, 2, 3, 4, 5];

      // Check if there's any number greater than 4
      let hasNumberGreaterThan4 = numbers.some(num => num > 4); // true
    `,
  },
];

const JavaScriptCheatSheet = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">JavaScript Cheat Sheet</h1>
      <div className="space-y-4">
        {jsBasics.map((command, index) => (
          <div
            key={index}
            className="relative p-4 border rounded-md bg-gray-900 text-white"
          >
            <h2 className="text-xl font-semibold mb-2">{command.concept}</h2>
            <p className="mb-2 text-gray-400">{command.description}</p>
            <SyntaxHighlighter language="javascript" style={okaidia}>
              {command.snippet}
            </SyntaxHighlighter>
            <CopyToClipboard text={command.example}>
              <button className="absolute top-2 right-2 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition-colors duration-200">
                Copy
              </button>
            </CopyToClipboard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JavaScriptCheatSheet;
