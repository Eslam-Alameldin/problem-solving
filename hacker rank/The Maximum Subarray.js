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
 * Complete the 'maxSubarray' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function maxSubarray(arr) {
  // Write your code here

  let maxSum = arr[0];
  let currentSum = arr[0];
  let maxElement = arr[0];
  for (let i = 1; i < arr.length; i++) {
    maxElement = Math.max(maxElement, arr[i]);
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  let nonContiguousSum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      nonContiguousSum += arr[i];
    }
  }

  if (maxElement < 0) {
    nonContiguousSum = maxElement;
  }

  return [maxSum, nonContiguousSum];
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine().trim(), 10);

    const arr = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((arrTemp) => parseInt(arrTemp, 10));

    const result = maxSubarray(arr);

    ws.write(result.join(" ") + "\n");
  }

  ws.end();
}
