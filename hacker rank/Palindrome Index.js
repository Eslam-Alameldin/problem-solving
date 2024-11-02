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
 * Complete the 'palindromeIndex' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function palindromeIndex(s) {
  // Write your code here
  function isPalindrome(left, right) {
    while (left <= right) {
      if (s[left] !== s[right]) return false;
      left++;
      right--;
    }

    return true;
  }

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      if (isPalindrome(left + 1, right)) return left;
      else if (isPalindrome(left, right - 1)) return right;
    }
    left++;
    right--;
  }

  return -1;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const s = readLine();

    const result = palindromeIndex(s);

    ws.write(result + "\n");
  }

  ws.end();
}
