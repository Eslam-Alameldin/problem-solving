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
 * Complete the 'balancedSums' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function balancedSums(arr) {
  // Write your code here
  let leftSum = 0;
  let rightSum = arr.reduce((acc, curr) => acc + curr, 0);

  for (let i = 0; i < arr.length; i++) {
    rightSum -= arr[i];
    if (leftSum === rightSum) {
      return "YES";
    }
    leftSum += arr[i];
  }

  return "NO";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const T = parseInt(readLine().trim(), 10);

  for (let TItr = 0; TItr < T; TItr++) {
    const n = parseInt(readLine().trim(), 10);

    const arr = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((arrTemp) => parseInt(arrTemp, 10));

    const result = balancedSums(arr);

    ws.write(result + "\n");
  }

  ws.end();
}
