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
 * Complete the 'componentsInGraph' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts 2D_INTEGER_ARRAY gb as parameter.
 */

function componentsInGraph(gb) {
  // Write your code here
  // Create an adjacency list for the graph
  const graph = new Map();

  for (const [u, v] of gb) {
    if (!graph.has(u)) graph.set(u, []);
    if (!graph.has(v)) graph.set(v, []);
    graph.get(u).push(v);
    graph.get(v).push(u);
  }

  // Function to perform DFS and return size of the connected component
  function dfs(node, visited) {
    let stack = [node];
    let size = 0;
    visited.add(node);

    while (stack.length > 0) {
      const current = stack.pop();
      size += 1;

      for (const neighbor of graph.get(current)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      }
    }

    return size;
  }

  // Find the sizes of all connected components with at least 2 nodes
  const visited = new Set();
  const componentSizes = [];

  for (const node of graph.keys()) {
    if (!visited.has(node)) {
      const size = dfs(node, visited);
      if (size > 1) {
        componentSizes.push(size);
      }
    }
  }

  // Find the smallest and largest component sizes
  const minSize = Math.min(...componentSizes);
  const maxSize = Math.max(...componentSizes);

  return [minSize, maxSize];
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  let gb = Array(n);

  for (let i = 0; i < n; i++) {
    gb[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((gbTemp) => parseInt(gbTemp, 10));
  }

  const result = componentsInGraph(gb);

  ws.write(result.join(" ") + "\n");

  ws.end();
}
