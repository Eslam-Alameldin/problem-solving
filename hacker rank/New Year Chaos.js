"use strict";

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
 * Complete the 'minimumBribes' function below.
 *
 * The function accepts INTEGER_ARRAY q as parameter.
 */

function minimumBribes(q) {
  // Write your code here
  let bribes = 0;
  let chaotic = false;
  for (let i = 0; i < q.length; i++) {
    if (q[i] - (i + 1) > 2) {
      chaotic = true;
      break;
    }
    for (let j = Math.max(0, q[i] - 2); j < i; j++) {
      if (q[j] > q[i]) bribes++;
    }
  }
  if (chaotic) {
    console.log("Too chaotic");
  } else {
    console.log(bribes);
  }
}

function main() {
  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine().trim(), 10);

    const q = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((qTemp) => parseInt(qTemp, 10));

    minimumBribes(q);
  }
}
