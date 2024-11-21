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
 * Complete the 'nearlySimilarRectangles' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts 2D_LONG_INTEGER_ARRAY sides as parameter.
 */

function nearlySimilarRectangles(sides) {
  // Write your code here
  let count = 0;
  let map = new Map();
  for (let i = 0; i < sides.length; i++) {
    let ratio = sides[i][0] / sides[i][1];
    if (map.has(ratio)) {
      count += map.get(ratio);
      map.set(ratio, map.get(ratio) + 1);
    } else {
      map.set(ratio, 1);
    }
  }
  return count;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const sidesRows = parseInt(readLine().trim(), 10);

  const sidesColumns = parseInt(readLine().trim(), 10);

  let sides = Array(sidesRows);

  for (let i = 0; i < sidesRows; i++) {
    sides[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((sidesTemp) => parseInt(sidesTemp, 10));
  }

  const result = nearlySimilarRectangles(sides);

  ws.write(result + "\n");

  ws.end();
}
