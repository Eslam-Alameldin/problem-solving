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
 * Complete the 'counterGame' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts LONG_INTEGER n as parameter.
 */

function counterGame(n) {
  let moves = 0;

  while (n > 1) {
    if ((n & (n - 1)) === 0) {
      // If n is a power of 2, divide by 2
      n /= 2;
    } else {
      // Otherwise, subtract the largest power of 2 less than n
      n -= Math.pow(2, Math.floor(Math.log2(n)));
    }
    moves++;
  }

  // If moves is odd, Louise wins, otherwise Richard wins
  return moves % 2 === 1 ? "Louise" : "Richard";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine().trim(), 10);

    const result = counterGame(n);

    ws.write(result + "\n");
  }

  ws.end();
}
