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
 * Complete the 'legoBlocks' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 */

function legoBlocks(n, m) {
  // Write your code here
  const A = 1000000007n;
  const r = new Array(m + 1).fill(0n);
  const a = new Array(m + 1).fill(0n);

  a[0] = 1n;
  for (let j = 1; j <= m; j++) {
    a[j] += j - 1 >= 0 ? a[j - 1] : 0n;
    a[j] += j - 2 >= 0 ? a[j - 2] : 0n;
    a[j] += j - 3 >= 0 ? a[j - 3] : 0n;
    a[j] += j - 4 >= 0 ? a[j - 4] : 0n;
  }

  for (let j = 1; j <= m; j++) {
    const n1 = a[j] % A;
    const sum = n1 ** BigInt(n);
    a[j] = sum % A;
  }

  r[1] = 1n;
  for (let j = 2; j <= m; j++) {
    r[j] = a[j];
    for (let k = 1; k < j; k++) {
      const n1 = r[k] * a[j - k];
      r[j] -= n1;
    }
    // ATTENTION! in javascript, when the left operand of bigint is negative
    // need to add  +A to be positive, different from python for example
    r[j] = (r[j] % A) + A;
  }

  return r[m] % A;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const result = legoBlocks(n, m);

    ws.write(result + "\n");
  }

  ws.end();
}
