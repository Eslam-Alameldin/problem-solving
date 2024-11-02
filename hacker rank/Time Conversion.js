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
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function timeConversion(s) {
  // Write your code here

  let time = s.split(":");
  let hours = time[0];
  let minutes = time[1];
  let seconds = time[2].substring(0, 2);
  let period = time[2].substring(2, 4);

  if (period === "AM") {
    if (hours == "12") hours = "00";
  } else {
    if (hours != "12") hours = parseInt(hours) + 12;
  }

  return `${hours}:${minutes}:${seconds}`;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  const result = timeConversion(s);

  ws.write(result + "\n");

  ws.end();
}
