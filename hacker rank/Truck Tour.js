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
 * Complete the 'truckTour' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY petrolpumps as parameter.
 */

function truckTour(petrolpumps) {
  // Write your code here

  let start = 0;
  let petrol = 0;

  for (let i = 0; i < petrolpumps.length; i++) {
    petrol += petrolpumps[i][0] - petrolpumps[i][1];
    if (petrol < 0) {
      start = i + 1;
      petrol = 0;
    }
  }

  return start;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  let petrolpumps = Array(n);

  for (let i = 0; i < n; i++) {
    petrolpumps[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((petrolpumpsTemp) => parseInt(petrolpumpsTemp, 10));
  }

  const result = truckTour(petrolpumps);

  ws.write(result + "\n");

  ws.end();
}
