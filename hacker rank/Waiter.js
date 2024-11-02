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
 * Complete the 'waiter' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY number
 *  2. INTEGER q
 */

function waiter(number, q) {
  // Write your code here

  function getPrimes(n) {
    const primes = [];
    let i = 2;
    while (primes.length < n) {
      if (isPrime(i)) {
        primes.push(i);
      }
      i++;
    }
    return primes;
  }

  function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  const primes = getPrimes(q);
  const result = [];
  let a = number;
  let b = [];
  let temp = [];

  for (let i = 0; i < q; i++) {
    while (a.length) {
      const n = a.pop();
      if (n % primes[i] === 0) {
        b.push(n);
      } else {
        temp.push(n);
      }
    }

    result.push(...b.reverse());
    a = temp;
    b = [];
    temp = [];
  }

  result.push(...a.reverse());
  return result;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const q = parseInt(firstMultipleInput[1], 10);

  const number = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((numberTemp) => parseInt(numberTemp, 10));

  const result = waiter(number, q);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
