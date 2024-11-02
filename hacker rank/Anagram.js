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
 * Complete the 'anagram' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

// sample input: aaabbb
// sample output: 3

// sample input: ab
// sample output: 1

// sample input: abc
// sample output: -1

// sample input: mnop
// sample output: 2

// sample input: xyyx
// sample output: 0

// sample input: xaxbbbxx
// sample output: 1

function anagram(s) {
  // If length of the string is odd, it's not possible to split into two anagrams
  if (s.length % 2 !== 0) return -1;

  let mid = s.length / 2;
  let s1 = s.slice(0, mid);
  let s2 = s.slice(mid);

  let s1Count = {};
  let s2Count = {};

  // Count character frequencies for each half
  for (let i = 0; i < s1.length; i++) {
    s1Count[s1[i]] = (s1Count[s1[i]] || 0) + 1;
    s2Count[s2[i]] = (s2Count[s2[i]] || 0) + 1;
  }

  let diff = 0;
  // Only count excess characters in s1 that need replacement to match s2
  for (let key in s1Count) {
    if (s1Count[key] > (s2Count[key] || 0)) {
      diff += s1Count[key] - (s2Count[key] || 0);
    }
  }

  return diff;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const s = readLine();

    const result = anagram(s);

    ws.write(result + "\n");
  }

  ws.end();
}
