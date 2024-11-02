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
 * Complete the 'isValid' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

// Sample Input
// aabbcd
// Sample Output
// NO

function isValid(s) {
  // Create an array to store the frequency of each character
  const cnt = Array(26).fill(0);
  const n = s.length;

  // Count the frequency of each character
  for (let i = 0; i < n; i++) {
    cnt[s[i].charCodeAt(0) - "a".charCodeAt(0)]++;
  }

  // Initialize answer to "NO"
  let ans = "NO";

  // Check for each character if we can make the string valid by removing one occurrence
  for (let i = -1; i < 26; i++) {
    // If character i + 'a' is not present in string continue
    if (i >= 0 && cnt[i] === 0) {
      continue;
    }

    // Reduce frequency of character at index i
    if (i >= 0) {
      cnt[i]--;
    }

    // Use a Set to track unique frequencies
    const myset = new Set();

    // Insert remaining positive frequencies into the Set
    for (let j = 0; j < 26; j++) {
      if (cnt[j] > 0) {
        myset.add(cnt[j]);
      }
    }

    // If set size is 1, the string is now valid
    if (myset.size === 1) {
      ans = "YES";
    }

    // Restore the frequency back
    if (i >= 0) {
      cnt[i]++;
    }
  }

  return ans;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  const result = isValid(s);

  ws.write(result + "\n");

  ws.end();
}
