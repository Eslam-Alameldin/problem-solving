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
 * Complete the 'bomberMan' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. STRING_ARRAY grid
 */

function bomberMan(n, grid) {
  // If n is 1, return the initial grid
  if (n === 1) return grid;

  // If n is even, the grid is completely filled with bombs
  if (n % 2 === 0) return Array(grid.length).fill("O".repeat(grid[0].length));

  // Helper function to simulate the explosion of bombs
  function explode(grid) {
    const r = grid.length;
    const c = grid[0].length;
    const newGrid = Array.from({ length: r }, () => "O".repeat(c).split(""));

    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (grid[i][j] === "O") {
          newGrid[i][j] = ".";
          if (i > 0) newGrid[i - 1][j] = ".";
          if (i < r - 1) newGrid[i + 1][j] = ".";
          if (j > 0) newGrid[i][j - 1] = ".";
          if (j < c - 1) newGrid[i][j + 1] = ".";
        }
      }
    }
    return newGrid.map((row) => row.join(""));
  }

  // Get the grids at time = 3 and time = 5 (repeating patterns)
  const gridAt3 = explode(grid);
  const gridAt5 = explode(gridAt3);

  // Return gridAt3 if (n - 3) % 4 == 0, otherwise gridAt5
  return (n - 3) % 4 === 0 ? gridAt3 : gridAt5;
}
function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const r = parseInt(firstMultipleInput[0], 10);

  const c = parseInt(firstMultipleInput[1], 10);

  const n = parseInt(firstMultipleInput[2], 10);

  let grid = [];

  for (let i = 0; i < r; i++) {
    const gridItem = readLine();
    grid.push(gridItem);
  }

  const result = bomberMan(n, grid);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
