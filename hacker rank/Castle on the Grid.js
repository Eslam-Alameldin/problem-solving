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
 * Complete the 'minimumMoves' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING_ARRAY grid
 *  2. INTEGER startX
 *  3. INTEGER startY
 *  4. INTEGER goalX
 *  5. INTEGER goalY
 */

function minimumMoves(grid, startX, startY, goalX, goalY) {
  const n = grid.length;
  const directions = [
    [0, 1], // Right
    [0, -1], // Left
    [1, 0], // Down
    [-1, 0], // Up
  ];
  const queue = [[startX, startY, 0]];
  const visited = Array.from({ length: n }, () => Array(n).fill(false));

  visited[startX][startY] = true;

  while (queue.length > 0) {
    const [x, y, moves] = queue.shift();

    // Check if goal is reached
    if (x === goalX && y === goalY) {
      return moves;
    }

    for (const [dx, dy] of directions) {
      let nx = x + dx;
      let ny = y + dy;

      // Move in the current direction until hitting a wall or boundary
      while (nx >= 0 && nx < n && ny >= 0 && ny < n && grid[nx][ny] === ".") {
        if (!visited[nx][ny]) {
          visited[nx][ny] = true;
          queue.push([nx, ny, moves + 1]);
        }
        nx += dx;
        ny += dy;
      }
    }
  }

  return -1; // Just a fallback, as the goal should be reachable
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  let grid = [];

  for (let i = 0; i < n; i++) {
    const gridItem = readLine();
    grid.push(gridItem);
  }

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const startX = parseInt(firstMultipleInput[0], 10);

  const startY = parseInt(firstMultipleInput[1], 10);

  const goalX = parseInt(firstMultipleInput[2], 10);

  const goalY = parseInt(firstMultipleInput[3], 10);

  const result = minimumMoves(grid, startX, startY, goalX, goalY);

  ws.write(result + "\n");

  ws.end();
}
