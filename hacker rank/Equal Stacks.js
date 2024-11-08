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
 * Complete the 'equalStacks' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY h1
 *  2. INTEGER_ARRAY h2
 *  3. INTEGER_ARRAY h3
 */

function equalStacks(h1, h2, h3) {
  // Write your code here

  let sum1 = h1.reduce((acc, cur) => acc + cur, 0);
  let sum2 = h2.reduce((acc, cur) => acc + cur, 0);
  let sum3 = h3.reduce((acc, cur) => acc + cur, 0);

  let i = 0;
  let j = 0;
  let k = 0;

  while (i < h1.length && j < h2.length && k < h3.length) {
    if (sum1 === sum2 && sum2 === sum3) {
      return sum1;
    }

    if (sum1 >= sum2 && sum1 >= sum3) {
      sum1 -= h1[i];
      i++;
    } else if (sum2 >= sum1 && sum2 >= sum3) {
      sum2 -= h2[j];
      j++;
    } else if (sum3 >= sum1 && sum3 >= sum2) {
      sum3 -= h3[k];
      k++;
    }
  }

  return 0;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n1 = parseInt(firstMultipleInput[0], 10);

  const n2 = parseInt(firstMultipleInput[1], 10);

  const n3 = parseInt(firstMultipleInput[2], 10);

  const h1 = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((h1Temp) => parseInt(h1Temp, 10));

  const h2 = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((h2Temp) => parseInt(h2Temp, 10));

  const h3 = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((h3Temp) => parseInt(h3Temp, 10));

  const result = equalStacks(h1, h2, h3);

  ws.write(result + "\n");

  ws.end();
}
