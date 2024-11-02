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
 * Complete the 'bfs' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. 2D_INTEGER_ARRAY edges
 *  4. INTEGER s
 */

function bfs(n, m, edges, s) {
  // Write your code here
  const adjList = Array.from({ length: n }, () => []);
  for (let i = 0; i < m; i++) {
    const [u, v] = edges[i];
    adjList[u - 1].push(v - 1);
    adjList[v - 1].push(u - 1);
  }

  // Create a queue
  const queue = [];
  const visited = new Set();
  const distances = Array(n).fill(-1);
  distances[s - 1] = 0;
  queue.push(s - 1);
  visited.add(s - 1);

  while (queue.length) {
    const node = queue.shift();
    for (const neighbor of adjList[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        distances[neighbor] = distances[node] + 6;
        queue.push(neighbor);
      }
    }
  }

  distances.splice(s - 1, 1);

  return distances;
}
function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let edges = Array(m);

    for (let i = 0; i < m; i++) {
      edges[i] = readLine()
        .replace(/\s+$/g, "")
        .split(" ")
        .map((edgesTemp) => parseInt(edgesTemp, 10));
    }

    const s = parseInt(readLine().trim(), 10);

    const result = bfs(n, m, edges, s);

    ws.write(result.join(" ") + "\n");
  }

  ws.end();
}
