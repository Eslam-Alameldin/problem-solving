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
 * Complete the 'highestValuePalindrome' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER n
 *  3. INTEGER k
 */

function highestValuePalindrome(s, n, k) {
  // Write your code here
  let arr = s.split("");
  let changed = Array(n).fill(false); // Track which characters were changed

  // Step 1: Make the string a palindrome with minimum changes
  let a = 0,
    b = n - 1;
  while (a < b) {
    if (arr[a] !== arr[b]) {
      if (k === 0) return "-1"; // Not enough changes to make it a palindrome
      k--; // Use one change to make the pair identical

      if (arr[a] > arr[b]) {
        arr[b] = arr[a];
        changed[b] = true;
      } else {
        arr[a] = arr[b];
        changed[a] = true;
      }
    }
    a++;
    b--;
  }

  // Step 2: Maximize the palindrome by changing characters to '9' where possible
  a = 0;
  b = n - 1;
  while (a <= b && k > 0) {
    if (arr[a] === "9") {
      // Skip if already '9'
    } else if (a === b) {
      // If it's the middle character in an odd-length string, change it to '9'
      k--;
      arr[a] = "9";
    } else if (changed[a] || changed[b]) {
      // If either side of the pair was changed earlier, we need only one more change to make both '9'
      k--;
      arr[a] = "9";
      arr[b] = "9";
    } else if (k >= 2) {
      // If both sides were unchanged, we need two changes to make both '9'
      k -= 2;
      arr[a] = "9";
      arr[b] = "9";
    }
    a++;
    b--;
  }

  // Join the array back into a string and return the result
  return arr.join("");
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const k = parseInt(firstMultipleInput[1], 10);

  const s = readLine();

  const result = highestValuePalindrome(s, n, k);

  ws.write(result + "\n");

  ws.end();
}
