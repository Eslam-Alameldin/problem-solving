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
 * Complete the 'lilysHomework' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function lilysHomework(arr) {
  // Helper function to count the minimum swaps needed to reach a sorted array
  function countSwaps(sortedArr) {
    // Map to track the original positions of each element in the unsorted array
    const positionMap = new Map(arr.map((val, idx) => [val, idx]));
    let swaps = 0; // Swap counter
    const arrCopy = [...arr]; // Copy of the original array for tracking swaps

    for (let i = 0; i < arrCopy.length; i++) {
      // If the current element is not in the correct position
      if (arrCopy[i] !== sortedArr[i]) {
        swaps++; // Count this as a swap

        // Find the index of the correct element for this position
        const originalIndex = positionMap.get(sortedArr[i]);

        // Update the position map for the element we're swapping
        positionMap.set(arrCopy[i], originalIndex);

        // Perform the swap in the copy array
        [arrCopy[i], arrCopy[originalIndex]] = [
          arrCopy[originalIndex],
          arrCopy[i],
        ];
      }
    }
    return swaps; // Return the total number of swaps needed for this sorted version
  }

  // Sort the array in ascending and descending order
  const sortedAsc = [...arr].sort((a, b) => a - b);
  const sortedDesc = [...arr].sort((a, b) => b - a);

  // Calculate the minimum swaps for both ascending and descending sorted arrays
  return Math.min(countSwaps(sortedAsc), countSwaps(sortedDesc));
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const arr = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => parseInt(arrTemp, 10));

  const result = lilysHomework(arr);

  ws.write(result + "\n");

  ws.end();
}
