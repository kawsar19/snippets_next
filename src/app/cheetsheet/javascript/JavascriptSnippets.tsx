"use client";
import React, { useState } from "react";
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
  {
    concept: "Array Map",
    description: "Transforms each element in an array based on a function.",
    snippet: `
      const numbers = [1, 2, 3];
      const doubled = numbers.map(num => num * 2); // [2, 4, 6]
    `,
  },
  {
    concept: "Array Filter",
    description: "Filters elements in an array based on a condition.",
    snippet: `
      const numbers = [1, 2, 3, 4];
      const evens = numbers.filter(num => num % 2 === 0); // [2, 4]
    `,
  },
  {
    concept: "Array Reduce",
    description: "Reduces an array to a single value by applying a function.",
    snippet: `
      const numbers = [1, 2, 3, 4];
      const sum = numbers.reduce((acc, curr) => acc + curr, 0); // 10
    `,
  },
  {
    concept: "Array forEach",
    description: "Executes a function for each element in an array.",
    snippet: `
      const numbers = [1, 2, 3];
      numbers.forEach(num => console.log(num)); // 1 2 3
    `,
  },
  {
    concept: "Debounce Function",
    description: "Limits the rate at which a function can fire.",
    snippet: `
      function debounce(func, delay) {
        let timeout;
        return function(...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), delay);
        };
      }
    `,
  },
  {
    concept: "Throttle Function",
    description:
      "Ensures a function is called at most once in a specified period.",
    snippet: `
      function throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function(...args) {
          if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
          } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
              if (Date.now() - lastRan >= limit) {
                func.apply(this, args);
                lastRan = Date.now();
              }
            }, limit - (Date.now() - lastRan));
          }
        };
      }
    `,
  },
  {
    concept: "Deep Clone",
    description: "Creates a deep copy of an object or array.",
    snippet: `
      function deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
      }
    `,
  },
  {
    concept: "Merge Objects",
    description: "Combines multiple objects into one.",
    snippet: `
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2 }
    `,
  },
  {
    concept: "Shallow Copy Array",
    description: "Creates a shallow copy of an array.",
    snippet: `
      const numbers = [1, 2, 3];
      const copy = [...numbers]; // [1, 2, 3]
    `,
  },
  {
    concept: "Unique Array Values",
    description: "Returns an array with unique values.",
    snippet: `
      const numbers = [1, 1, 2, 2, 3];
      const unique = [...new Set(numbers)]; // [1, 2, 3]
    `,
  },
  {
    concept: "Sort Array",
    description: "Sorts an array in ascending or descending order.",
    snippet: `
      const numbers = [3, 1, 4, 2];
      const sortedAsc = [...numbers].sort((a, b) => a - b); // [1, 2, 3, 4]
      const sortedDesc = [...numbers].sort((a, b) => b - a); // [4, 3, 2, 1]
    `,
  },
  {
    concept: "Check Empty Object",
    description: "Checks if an object is empty.",
    snippet: `
      const isEmptyObject = (obj) => Object.keys(obj).length === 0;
    `,
  },
  {
    concept: "Check Data Type",
    description: "Determines the data type of a variable.",
    snippet: `
      const getType = (value) => typeof value;
    `,
  },
  {
    concept: "Format Date",
    description: "Formats a date object into a readable string.",
    snippet: `
      const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return \`\${day}/\${month}/\${year}\`;
      };
    `,
  },
  {
    concept: "Capitalize String",
    description: "Capitalizes the first letter of a string.",
    snippet: `
      const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    `,
  },
  {
    concept: "Generate Random Number",
    description: "Generates a random number between min and max.",
    snippet: `
      const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    `,
  },
  {
    concept: "Check Array Equality",
    description: "Checks if two arrays are equal.",
    snippet: `
      const arraysEqual = (arr1, arr2) => 
        arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
    `,
  },
  {
    concept: "Flatten Array",
    description: "Flattens a nested array into a single-level array.",
    snippet: `
      const flattenArray = (arr) => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val), []);
    `,
  },
  {
    concept: "Debounce Event",
    description:
      "Delays the processing of an event until a specified time has passed.",
    snippet: `
      const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), wait);
        };
      };
    `,
  },
  {
    concept: "Throttle Event",
    description: "Limits the rate at which an event handler can be triggered.",
    snippet: `
      const throttle = (func, limit) => {
        let lastFunc;
        let lastRan;
        return function(...args) {
          if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
          } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
              if (Date.now() - lastRan >= limit) {
                func.apply(this, args);
                lastRan = Date.now();
              }
            }, limit - (Date.now() - lastRan));
          }
        };
      };
    `,
  },
  {
    concept: "UUID Generator",
    description: "Generates a unique identifier.",
    snippet: `
      const generateUUID = () => 
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    `,
  },
  {
    concept: "Debounce Function",
    description: "Ensures a function is not called too frequently.",
    snippet: `
      function debounce(func, wait) {
        let timeout;
        return function(...args) {
          const context = this;
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(context, args), wait);
        };
      }
    `,
  },
  {
    concept: "Get Query String Parameter",
    description: "Extracts a parameter value from a query string.",
    snippet: `
      const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
      };
    `,
  },
  {
    concept: "Generate Random Color",
    description: "Generates a random hex color.",
    snippet: `
      const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
    `,
  },
  {
    concept: "Check if Value is Object",
    description: "Determines if a value is an object.",
    snippet: `
      const isObject = (value) => value && typeof value === 'object' && value.constructor === Object;
    `,
  },
  {
    concept: "Deep Merge Objects",
    description: "Recursively merges two objects.",
    snippet: `
      const deepMerge = (target, source) => {
        for (const key in source) {
          if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], deepMerge(target[key], source[key]));
          }
        }
        Object.assign(target || {}, source);
        return target;
      };
    `,
  },
  {
    concept: "Format Currency",
    description: "Formats a number as currency.",
    snippet: `
      const formatCurrency = (amount, locale = 'en-US', currency = 'USD') => 
        new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
    `,
  },
  {
    concept: "Generate Random String",
    description: "Generates a random string of specified length.",
    snippet: `
      const generateRandomString = (length) => 
        Math.random().toString(36).substr(2, length);
    `,
  },
  {
    concept: "Parse JSON Safely",
    description: "Parses JSON safely, handling errors.",
    snippet: `
      const parseJSON = (str) => {
        try {
          return JSON.parse(str);
        } catch (e) {
          console.error('Invalid JSON:', e);
          return null;
        }
      };
    `,
  },
  {
    concept: "Throttle Function",
    description:
      "Ensures a function is only called at most once in a specified time period.",
    snippet: `
      function throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function(...args) {
          if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
          } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
              if (Date.now() - lastRan >= limit) {
                func.apply(this, args);
                lastRan = Date.now();
              }
            }, limit - (Date.now() - lastRan));
          }
        };
      }
    `,
  },
  {
    concept: "Get URL Parameters",
    description: "Retrieves URL parameters as an object.",
    snippet: `
      const getUrlParams = () => {
        const params = {};
        const queryString = window.location.search.substring(1);
        const queryParams = queryString.split('&');
        queryParams.forEach(param => {
          const [key, value] = param.split('=');
          params[key] = decodeURIComponent(value);
        });
        return params;
      };
    `,
  },
  {
    concept: "Escape HTML",
    description: "Escapes HTML characters to prevent injection attacks.",
    snippet: `
      const escapeHTML = (str) => 
        str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    `,
  },
  {
    concept: "Deep Compare Objects",
    description: "Compares two objects for deep equality.",
    snippet: `
      const deepEqual = (obj1, obj2) => {
        if (obj1 === obj2) return true;
        if (obj1 == null || obj2 == null || typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) return false;
        for (const key of keys1) {
          if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
        }
        return true;
      };
    `,
  },
  {
    concept: "Debounce with Immediate Execution",
    description: "Debounces a function with an option for immediate execution.",
    snippet: `
      const debounceImmediate = (func, wait) => {
        let timeout;
        return function(...args) {
          const context = this;
          const callNow = !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(context, args), wait);
          if (callNow) func.apply(context, args);
        };
      };
    `,
  },
  {
    concept: "Convert to Base64",
    description: "Converts a string to Base64 encoding.",
    snippet: `
      const toBase64 = (str) => 
        btoa(unescape(encodeURIComponent(str)));
    `,
  },
  {
    concept: "Decode Base64",
    description: "Decodes a Base64 encoded string.",
    snippet: `
      const fromBase64 = (str) => 
        decodeURIComponent(escape(atob(str)));
    `,
  },
  {
    concept: "Find Largest Number",
    description: "Finds the largest number in an array.",
    snippet: `
      const findMax = (arr) => Math.max(...arr);
    `,
  },
  {
    concept: "Find Smallest Number",
    description: "Finds the smallest number in an array.",
    snippet: `
      const findMin = (arr) => Math.min(...arr);
    `,
  },
  {
    concept: "Get Object Keys",
    description: "Retrieves the keys of an object.",
    snippet: `
      const getObjectKeys = (obj) => Object.keys(obj);
    `,
  },
  {
    concept: "Get Object Values",
    description: "Retrieves the values of an object.",
    snippet: `
      const getObjectValues = (obj) => Object.values(obj);
    `,
  },
  {
    concept: "Check for NaN",
    description: "Checks if a value is NaN.",
    snippet: `
      const isNaNValue = (value) => Number.isNaN(value);
    `,
  },
  {
    concept: "Create Date Object",
    description: "Creates a Date object from a timestamp.",
    snippet: `
      const createDate = (timestamp) => new Date(timestamp);
    `,
  },
  {
    concept: "Extract Date Components",
    description: "Extracts year, month, and day from a Date object.",
    snippet: `
      const getDateComponents = (date) => ({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      });
    `,
  },
  {
    concept: "Get Random Element",
    description: "Selects a random element from an array.",
    snippet: `
      const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
    `,
  },
  {
    concept: "Check for Null or Undefined",
    description: "Checks if a value is null or undefined.",
    snippet: `
      const isNullOrUndefined = (value) => value == null;
    `,
  },
  {
    concept: "Parse Query String",
    description: "Parses a query string into an object.",
    snippet: `
      const parseQueryString = (queryString) => {
        return queryString.substring(1).split('&').reduce((params, param) => {
          const [key, value] = param.split('=');
          params[key] = decodeURIComponent(value);
          return params;
        }, {});
      };
    `,
  },
  {
    concept: "Get File Extension",
    description: "Extracts the file extension from a file name.",
    snippet: `
      const getFileExtension = (filename) => filename.split('.').pop();
    `,
  },
  {
    concept: "Check Valid Email",
    description: "Validates if an email address is in a valid format.",
    snippet: `
      const isValidEmail = (email) => 
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    `,
  },
  {
    concept: "Find Index in Array",
    description: "Finds the index of an element in an array.",
    snippet: `
      const findIndex = (arr, value) => arr.indexOf(value);
    `,
  },
  {
    concept: "Convert to Camel Case",
    description: "Converts a string to camelCase format.",
    snippet: `
      const toCamelCase = (str) => 
        str.replace(/[-_][a-z]/g, (match) => match.charAt(1).toUpperCase());
    `,
  },
  {
    concept: "Convert to Kebab Case",
    description: "Converts a string to kebab-case format.",
    snippet: `
      const toKebabCase = (str) => 
        str.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase());
    `,
  },
  {
    concept: "Delay Execution",
    description: "Delays the execution of a function by a specified time.",
    snippet: `
      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    `,
  },
  {
    concept: "Check if Array Contains",
    description: "Checks if an array contains a specific element.",
    snippet: `
      const contains = (arr, value) => arr.includes(value);
    `,
  },
  {
    concept: "Generate Random Boolean",
    description: "Generates a random boolean value.",
    snippet: `
      const getRandomBoolean = () => Math.random() >= 0.5;
    `,
  },
  {
    concept: "Extract URL Path",
    description: "Extracts the path from a URL.",
    snippet: `
      const getUrlPath = (url) => new URL(url).pathname;
    `,
  },
  {
    concept: "Get Current Timestamp",
    description: "Gets the current timestamp in milliseconds.",
    snippet: `
      const getCurrentTimestamp = () => Date.now();
    `,
  },
  {
    concept: "Convert to Uppercase",
    description: "Converts a string to uppercase.",
    snippet: `
      const toUpperCase = (str) => str.toUpperCase();
    `,
  },
  {
    concept: "Convert to Lowercase",
    description: "Converts a string to lowercase.",
    snippet: `
      const toLowerCase = (str) => str.toLowerCase();
    `,
  },
  {
    concept: "Merge Objects",
    description: "Merges multiple objects into one.",
    snippet: `
      const mergeObjects = (...objs) => Object.assign({}, ...objs);
    `,
  },
  {
    concept: "Sort Array of Objects",
    description: "Sorts an array of objects by a specified key.",
    snippet: `
      const sortByKey = (arr, key) => 
        arr.slice().sort((a, b) => (a[key] > b[key] ? 1 : -1));
    `,
  },
  {
    concept: "Check Object for Key",
    description: "Checks if an object contains a specified key.",
    snippet: `
      const hasKey = (obj, key) => obj.hasOwnProperty(key);
    `,
  },
  {
    concept: "Merge Arrays",
    description: "Merges multiple arrays into one.",
    snippet: `
      const mergeArrays = (...arrays) => [].concat(...arrays);
    `,
  },
  {
    concept: "Shuffle Array",
    description: "Shuffles the elements of an array.",
    snippet: `
      const shuffleArray = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      };
    `,
  },
  {
    concept: "Extract URL Parameters",
    description: "Extracts parameters from a URL.",
    snippet: `
      const getUrlParams = (url) => {
        const params = new URLSearchParams(new URL(url).search);
        const result = {};
        for (const [key, value] of params) {
          result[key] = value;
        }
        return result;
      };
    `,
  },
  {
    concept: "Round Number",
    description: "Rounds a number to a specified number of decimal places.",
    snippet: `
      const roundNumber = (num, decimals) => 
        Number(num.toFixed(decimals));
    `,
  },
  {
    concept: "Extract Domain from URL",
    description: "Extracts the domain from a URL.",
    snippet: `
      const getDomain = (url) => new URL(url).hostname;
    `,
  },
  {
    concept: "Get Time Difference",
    description: "Gets the difference in time between two Date objects.",
    snippet: `
      const getTimeDifference = (date1, date2) => 
        Math.abs(date2 - date1);
    `,
  },
  {
    concept: "Validate Phone Number",
    description: "Validates if a phone number is in a valid format.",
    snippet: `
      const isValidPhoneNumber = (number) => 
        /^\+?[1-9]\d{1,14}$/.test(number);
    `,
  },
  {
    concept: "Format Phone Number",
    description: "Formats a phone number with country code and hyphens.",
    snippet: `
      const formatPhoneNumber = (number) => 
        number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    `,
  },
  {
    concept: "Convert to Sentence Case",
    description: "Converts a string to sentence case.",
    snippet: `
      const toSentenceCase = (str) => 
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    `,
  },
  {
    concept: "Get Current Date",
    description: "Gets the current date as a formatted string.",
    snippet: `
      const getCurrentDate = () => {
        const date = new Date();
        return date.toISOString().split('T')[0];
      };
    `,
  },
  {
    concept: "Calculate Age",
    description: "Calculates the age based on a birthdate.",
    snippet: `
      const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };
    `,
  },
  {
    concept: "Check for Palindrome",
    description: "Checks if a string is a palindrome.",
    snippet: `
      const isPalindrome = (str) => 
        str === str.split('').reverse().join('');
    `,
  },
  {
    concept: "Generate UUID",
    description: "Generates a UUID (v4).",
    snippet: `
      const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      };
    `,
  },
  {
    concept: "Get File Size",
    description: "Gets the size of a file in bytes.",
    snippet: `
      const getFileSize = (file) => file.size;
    `,
  },
  {
    concept: "Check for Empty Object",
    description: "Checks if an object is empty.",
    snippet: `
      const isEmptyObject = (obj) => Object.keys(obj).length === 0;
    `,
  },
  {
    concept: "Debounce with Leading Edge",
    description: "Debounces a function but executes on the leading edge.",
    snippet: `
      const debounceLeadingEdge = (func, wait) => {
        let timeout;
        return function(...args) {
          const context = this;
          if (!timeout) func.apply(context, args);
          clearTimeout(timeout);
          timeout = setTimeout(() => { timeout = null; }, wait);
        };
      };
    `,
  },
  {
    concept: "Update Object Property",
    description: "Updates a property of an object.",
    snippet: `
      const updateObjectProperty = (obj, key, value) => ({
        ...obj,
        [key]: value
      });
    `,
  },
  {
    concept: "Flatten Array of Arrays",
    description: "Flattens a nested array of arrays into a single array.",
    snippet: `
      const flattenArray = (arr) => arr.flat();
    `,
  },
  {
    concept: "Convert to Title Case",
    description: "Converts a string to title case.",
    snippet: `
      const toTitleCase = (str) => 
        str.replace(/\b\w/g, char => char.toUpperCase());
    `,
  },
  {
    concept: "Generate Random Integer",
    description: "Generates a random integer between a min and max value.",
    snippet: `
      const getRandomInteger = (min, max) => 
        Math.floor(Math.random() * (max - min + 1)) + min;
    `,
  },
  {
    concept: "Merge Arrays with Unique Values",
    description: "Merges multiple arrays into one, keeping unique values.",
    snippet: `
      const mergeUniqueArrays = (...arrays) => 
        [...new Set([].concat(...arrays))];
    `,
  },
  {
    concept: "Get Object Length",
    description: "Gets the number of properties in an object.",
    snippet: `
      const getObjectLength = (obj) => Object.keys(obj).length;
    `,
  },
  {
    concept: "Sort Array in Descending Order",
    description: "Sorts an array in descending order.",
    snippet: `
      const sortDescending = (arr) => arr.slice().sort((a, b) => b - a);
    `,
  },
  {
    concept: "Generate Range Array",
    description: "Generates an array of numbers within a range.",
    snippet: `
      const generateRange = (start, end) => 
        Array.from({ length: end - start + 1 }, (_, i) => i + start);
    `,
  },
  {
    concept: "Find Object by Key",
    description: "Finds an object in an array of objects by a key value.",
    snippet: `
      const findObjectByKey = (arr, key, value) => 
        arr.find(obj => obj[key] === value);
    `,
  },
  {
    concept: "Get Query Parameter",
    description: "Gets the value of a query parameter from the URL.",
    snippet: `
      const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
      };
    `,
  },
  {
    concept: "Format Date",
    description: "Formats a date object as a string.",
    snippet: `
      const formatDate = (date, format = 'YYYY-MM-DD') => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
      };
    `,
  },
  {
    concept: "Check if Array is Sorted",
    description: "Checks if an array is sorted in ascending order.",
    snippet: `
      const isArraySorted = (arr) => arr.every((val, i, arr) => !i || arr[i - 1] <= val);
    `,
  },
  {
    concept: "Generate Random Color",
    description: "Generates a random HEX color code.",
    snippet: `
      const generateRandomColor = () => 
        '#' + Math.floor(Math.random()*16777215).toString(16);
    `,
  },
  {
    concept: "Format Currency",
    description: "Formats a number as currency.",
    snippet: `
      const formatCurrency = (amount, currency = 'USD') => 
        new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
    `,
  },
  {
    concept: "Extract Date from String",
    description: "Extracts a date from a string formatted as YYYY-MM-DD.",
    snippet: `
      const extractDateFromString = (str) => {
        const match = str.match(/\d{4}-\d{2}-\d{2}/);
        return match ? new Date(match[0]) : null;
      };
    `,
  },
  {
    concept: "Get Date Difference in Days",
    description: "Calculates the difference in days between two dates.",
    snippet: `
      const getDateDifferenceInDays = (date1, date2) => 
        Math.floor((new Date(date2) - new Date(date1)) / (1000 * 60 * 60 * 24));
    `,
  },
  {
    concept: "Transform Array to Object",
    description: "Transforms an array of key-value pairs into an object.",
    snippet: `
      const transformArrayToObject = (arr) => 
        arr.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
    `,
  },
  {
    concept: "Get Current Time",
    description: "Gets the current time as a formatted string.",
    snippet: `
      const getCurrentTime = () => new Date().toLocaleTimeString();
    `,
  },
  {
    concept: "Remove Leading and Trailing Whitespace",
    description: "Removes leading and trailing whitespace from a string.",
    snippet: `
      const trimString = (str) => str.trim();
    `,
  },
  {
    concept: "Get Weekday Name",
    description: "Gets the name of the weekday from a date.",
    snippet: `
      const getWeekdayName = (date) => 
        new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date));
    `,
  },
  {
    concept: "Get Month Name",
    description: "Gets the name of the month from a date.",
    snippet: `
      const getMonthName = (date) => 
        new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(date));
    `,
  },
  {
    concept: "Check if Object Contains Value",
    description: "Checks if an object contains a specified value.",
    snippet: `
      const objectContainsValue = (obj, value) => 
        Object.values(obj).includes(value);
    `,
  },
  {
    concept: "Generate Random String",
    description: "Generates a random alphanumeric string of a given length.",
    snippet: `
      const generateRandomString = (length) => 
        Math.random().toString(36).substr(2, length);
    `,
  },
  {
    concept: "Get Random Item from Array",
    description: "Gets a random item from an array.",
    snippet: `
      const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    `,
  },
  {
    concept: "Merge Objects with Unique Keys",
    description: "Merges multiple objects into one, keeping unique keys.",
    snippet: `
      const mergeUniqueObjects = (...objs) => {
        return objs.reduce((acc, obj) => {
          Object.keys(obj).forEach(key => {
            if (!acc.hasOwnProperty(key)) {
              acc[key] = obj[key];
            }
          });
          return acc;
        }, {});
      };
    `,
  },
  {
    concept: "Check if Array Contains Duplicate",
    description: "Checks if an array contains duplicate values.",
    snippet: `
      const hasDuplicates = (arr) => new Set(arr).size !== arr.length;
    `,
  },
  {
    concept: "Get Object Values as Array",
    description: "Gets the values of an object as an array.",
    snippet: `
      const getObjectValues = (obj) => Object.values(obj);
    `,
  },
  {
    concept: "Generate Fibonacci Sequence",
    description: "Generates a Fibonacci sequence up to a given number.",
    snippet: `
      const generateFibonacci = (num) => {
        const result = [0, 1];
        while (result.length < num) {
          result.push(result[result.length - 1] + result[result.length - 2]);
        }
        return result;
      };
    `,
  },
  {
    concept: "Find Max Value in Array",
    description: "Finds the maximum value in an array.",
    snippet: `
      const findMaxValue = (arr) => Math.max(...arr);
    `,
  },
  {
    concept: "Find Min Value in Array",
    description: "Finds the minimum value in an array.",
    snippet: `
      const findMinValue = (arr) => Math.min(...arr);
    `,
  },
  {
    concept: "Capitalize First Letter of Each Word",
    description: "Capitalizes the first letter of each word in a string.",
    snippet: `
      const capitalizeWords = (str) => 
        str.replace(/\b\w/g, char => char.toUpperCase());
    `,
  },
  {
    concept: "Convert Array to Comma-Separated String",
    description: "Converts an array to a comma-separated string.",
    snippet: `
      const arrayToCommaString = (arr) => arr.join(', ');
    `,
  },
  {
    concept: "Group Array by Key",
    description: "Groups an array of objects by a specific key.",
    snippet: `
      const groupByKey = (arr, key) => 
        arr.reduce((acc, obj) => {
          (acc[obj[key]] = acc[obj[key]] || []).push(obj);
          return acc;
        }, {});
    `,
  },
  {
    concept: "Convert Object to Query String",
    description: "Converts an object to a query string for a URL.",
    snippet: `
      const objectToQueryString = (obj) => 
        new URLSearchParams(obj).toString();
    `,
  },
  {
    concept: "Debounce Function",
    description: "Debounces a function to limit its execution rate.",
    snippet: `
      const debounce = (func, wait) => {
        let timeout;
        return function(...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), wait);
        };
      };
    `,
  },
  {
    concept: "Throttle Function",
    description:
      "Throttles a function to execute it at most once every specified interval.",
    snippet: `
      const throttle = (func, limit) => {
        let lastFunc;
        let lastRan;
        return function(...args) {
          if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
          } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
              if ((Date.now() - lastRan) >= limit) {
                func.apply(this, args);
                lastRan = Date.now();
              }
            }, limit - (Date.now() - lastRan));
          }
        };
      };
    `,
  },
  {
    concept: "Deep Clone Object",
    description: "Creates a deep clone of an object.",
    snippet: `
      const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
    `,
  },
  {
    concept: "Check for Email Format",
    description: "Checks if a string is a valid email format.",
    snippet: `
      const isValidEmail = (email) => 
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    `,
  },
  {
    concept: "Parse JSON String",
    description: "Parses a JSON string into an object.",
    snippet: `
      const parseJson = (jsonString) => JSON.parse(jsonString);
    `,
  },
  {
    concept: "String to Boolean",
    description: "Converts a string to a boolean value.",
    snippet: `
      const stringToBoolean = (str) => str.toLowerCase() === 'true';
    `,
  },
  {
    concept: "Convert Object to Array",
    description: "Converts an object into an array of key-value pairs.",
    snippet: `
      const objectToArray = (obj) => Object.entries(obj);
    `,
  },
  {
    concept: "Remove Duplicates from Array",
    description: "Removes duplicate values from an array.",
    snippet: `
      const removeDuplicates = (arr) => [...new Set(arr)];
    `,
  },
  {
    concept: "Convert Array of Objects to Object",
    description:
      "Converts an array of objects into a single object keyed by a specified key.",
    snippet: `
      const arrayToObject = (arr, key) => 
        arr.reduce((acc, obj) => ({ ...acc, [obj[key]]: obj }), {});
    `,
  },
  {
    concept: "Filter Array by Value",
    description: "Filters an array based on a specific value in an object.",
    snippet: `
      const filterByValue = (arr, key, value) => 
        arr.filter(obj => obj[key] === value);
    `,
  },
  {
    concept: "Convert Array to Set",
    description: "Converts an array to a Set, removing duplicate values.",
    snippet: `
      const arrayToSet = (arr) => new Set(arr);
    `,
  },
  {
    concept: "Find Index of Object in Array",
    description:
      "Finds the index of an object in an array based on a key-value pair.",
    snippet: `
      const findIndexByKeyValue = (arr, key, value) => 
        arr.findIndex(obj => obj[key] === value);
    `,
  },
  {
    concept: "Combine Arrays into Single Array",
    description: "Combines multiple arrays into a single array.",
    snippet: `
      const combineArrays = (...arrays) => [].concat(...arrays);
    `,
  },
  {
    concept: "Check if Value Exists in Array",
    description: "Checks if a value exists in an array.",
    snippet: `
      const valueExistsInArray = (arr, value) => arr.includes(value);
    `,
  },
  {
    concept: "Convert String to Title Case",
    description: "Converts a string to title case format.",
    snippet: `
      const toTitleCase = (str) => 
        str.replace(/\b\w/g, char => char.toUpperCase());
    `,
  },
  {
    concept: "Get Unique Values from Array",
    description: "Gets unique values from an array.",
    snippet: `
      const uniqueValues = (arr) => [...new Set(arr)];
    `,
  },
  {
    concept: "Check if String Contains Substring",
    description: "Checks if a string contains a specific substring.",
    snippet: `
      const containsSubstring = (str, substring) => str.includes(substring);
    `,
  },
  {
    concept: "Get Keys from Object",
    description: "Gets the keys from an object.",
    snippet: `
      const getObjectKeys = (obj) => Object.keys(obj);
    `,
  },
  {
    concept: "Convert Object to String",
    description: "Converts an object into a string.",
    snippet: `
      const objectToString = (obj) => JSON.stringify(obj);
    `,
  },
  {
    concept: "Check if Array is Empty",
    description: "Checks if an array is empty.",
    snippet: `
      const isArrayEmpty = (arr) => arr.length === 0;
    `,
  },
  {
    concept: "Flatten Nested Array",
    description: "Flattens a nested array into a single array.",
    snippet: `
      const flattenArray = (arr) => arr.flat(Infinity);
    `,
  },
  {
    concept: "Check if Value Exists in Object",
    description: "Checks if a value exists in an object.",
    snippet: `
      const valueExistsInObject = (obj, value) => Object.values(obj).includes(value);
    `,
  },
  {
    concept: "Sort Array of Objects by Key",
    description: "Sorts an array of objects by a specific key.",
    snippet: `
      const sortByKey = (arr, key) => 
        arr.slice().sort((a, b) => (a[key] > b[key] ? 1 : -1));
    `,
  },
  {
    concept: "Check if Object is Empty",
    description: "Checks if an object is empty.",
    snippet: `
      const isObjectEmpty = (obj) => Object.keys(obj).length === 0;
    `,
  },
  {
    concept: "Convert String to Array",
    description: "Converts a string into an array of characters.",
    snippet: `
      const stringToArray = (str) => Array.from(str);
    `,
  },
  {
    concept: "Find Object by Key-Value Pair",
    description: "Finds an object in an array by a key-value pair.",
    snippet: `
      const findObjectByKeyValue = (arr, key, value) => 
        arr.find(obj => obj[key] === value);
    `,
  },
  {
    concept: "Shuffle Array",
    description: "Shuffles the elements of an array randomly.",
    snippet: `
      const shuffleArray = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      };
    `,
  },
  {
    concept: "Create Object from Array of Pairs",
    description: "Creates an object from an array of key-value pairs.",
    snippet: `
      const createObjectFromPairs = (pairs) => 
        Object.fromEntries(pairs);
    `,
  },
  {
    concept: "Convert Array of Objects to Array of Values",
    description:
      "Converts an array of objects into an array of values for a specific key.",
    snippet: `
      const extractValuesByKey = (arr, key) => 
        arr.map(obj => obj[key]);
    `,
  },
  {
    concept: "Get Query Parameter Value",
    description: "Gets the value of a query parameter from a URL.",
    snippet: `
      const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
      };
    `,
  },
  {
    concept: "Check if Value Exists in Object by Key",
    description: "Checks if a value exists in an object by key.",
    snippet: `
      const valueExistsInObjectByKey = (obj, key, value) => obj[key] === value;
    `,
  },
  {
    concept: "Remove Specific Property from Object",
    description: "Removes a specific property from an object.",
    snippet: `
      const removePropertyFromObject = (obj, prop) => {
        const { [prop]: _, ...rest } = obj;
        return rest;
      };
    `,
  },
  {
    concept: "Merge Arrays and Remove Duplicates",
    description: "Merges multiple arrays into one and removes duplicates.",
    snippet: `
      const mergeArraysAndRemoveDuplicates = (...arrays) => 
        [...new Set([].concat(...arrays))];
    `,
  },
  {
    concept: "Calculate Array Average",
    description: "Calculates the average value of an array of numbers.",
    snippet: `
      const calculateAverage = (arr) => arr.reduce((acc, val) => acc + val, 0) / arr.length;
    `,
  },
  {
    concept: "Check if String is Palindrome",
    description: "Checks if a string is a palindrome.",
    snippet: `
      const isPalindrome = (str) => 
        str === str.split('').reverse().join('');
    `,
  },
  {
    concept: "Get Maximum Value from Array of Objects",
    description:
      "Gets the maximum value from an array of objects based on a specific key.",
    snippet: `
      const getMaxValueFromArrayOfObjects = (arr, key) => 
        Math.max(...arr.map(obj => obj[key]));
    `,
  },
  {
    concept: "Get Minimum Value from Array of Objects",
    description:
      "Gets the minimum value from an array of objects based on a specific key.",
    snippet: `
      const getMinValueFromArrayOfObjects = (arr, key) => 
        Math.min(...arr.map(obj => obj[key]));
    `,
  },
  {
    concept: "Create Object from Array of Objects",
    description:
      "Creates an object from an array of objects using a specific key as the object key.",
    snippet: `
      const createObjectFromArray = (arr, key) => 
        arr.reduce((obj, item) => ({ ...obj, [item[key]]: item }), {});
    `,
  },
  {
    concept: "Find Index of Item in Array",
    description: "Finds the index of an item in an array.",
    snippet: `
      const findIndexOfItem = (arr, item) => arr.indexOf(item);
    `,
  },
  {
    concept: "Find Duplicate Objects in Array",
    description: "Finds duplicate objects in an array based on a key.",
    snippet: `
      const findDuplicateObjects = (arr, key) => {
        const seen = new Set();
        return arr.filter(obj => {
          const val = obj[key];
          if (seen.has(val)) {
            return true;
          }
          seen.add(val);
          return false;
        });
      };
    `,
  },
  {
    concept: "Get Object with Highest Value",
    description:
      "Gets the object with the highest value for a specific key from an array of objects.",
    snippet: `
      const getObjectWithHighestValue = (arr, key) => 
        arr.reduce((max, obj) => (obj[key] > max[key] ? obj : max), arr[0]);
    `,
  },
  {
    concept: "Get Object with Lowest Value",
    description:
      "Gets the object with the lowest value for a specific key from an array of objects.",
    snippet: `
      const getObjectWithLowestValue = (arr, key) => 
        arr.reduce((min, obj) => (obj[key] < min[key] ? obj : min), arr[0]);
    `,
  },
];

const JavaScriptCheatSheet = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (index: number) => {
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  return (
    <div className="">
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
            <CopyToClipboard
              text={command.snippet}
              onCopy={() => handleCopy(index)}
            >
              <button className="absolute top-2 right-2 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition-colors duration-200">
                {copiedIndex === index ? "Copied" : "Copy"}
              </button>
            </CopyToClipboard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JavaScriptCheatSheet;
