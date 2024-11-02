"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'solve' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY arr
 *  2. INTEGER_ARRAY queries
 */

function solve(arr, queries) {
  // Write your code here
  let results = [];

  for (let d of queries) {
    // Store maximums of each sliding window of size d
    let maxInWindows = [];

    let deque = []; // This will store indices of arr

    // Initialize the deque for the first window of size d
    for (let i = 0; i < d; i++) {
      while (deque.length > 0 && arr[deque[deque.length - 1]] <= arr[i]) {
        deque.pop();
      }
      deque.push(i);
    }

    // Process the rest of the elements
    for (let i = d; i <= arr.length; i++) {
      // The front of the deque is the maximum for the last window
      maxInWindows.push(arr[deque[0]]);

      // Remove elements outside the current window
      while (deque.length > 0 && deque[0] <= i - d) {
        deque.shift();
      }

      // Add the current element, removing elements smaller than it
      if (i < arr.length) {
        while (deque.length > 0 && arr[deque[deque.length - 1]] <= arr[i]) {
          deque.pop();
        }
        deque.push(i);
      }
    }

    // Find the minimum of all maximums in windows of size d
    results.push(Math.min(...maxInWindows));
  }

  return results;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const q = parseInt(firstMultipleInput[1], 10);

  const arr = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => parseInt(arrTemp, 10));

  let queries = [];

  for (let i = 0; i < q; i++) {
    const queriesItem = parseInt(readLine().trim(), 10);
    queries.push(queriesItem);
  }

  const result = solve(arr, queries);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
