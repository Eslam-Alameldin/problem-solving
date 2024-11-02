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
 * Complete the 'cutTheTree' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY data
 *  2. 2D_INTEGER_ARRAY edges
 */

function dfsIterative(startNode, data, adjList, subtreeSum, visited) {
  const stack = [startNode];
  const postorder = []; // Track nodes in postorder for sum calculations

  visited[startNode] = true;

  while (stack.length) {
    const node = stack.pop();
    postorder.push(node);

    for (const neighbor of adjList[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        stack.push(neighbor);
      }
    }
  }

  // Compute subtree sums in reverse postorder
  for (let i = postorder.length - 1; i >= 0; i--) {
    const node = postorder[i];
    subtreeSum[node] = data[node - 1];

    for (const neighbor of adjList[node]) {
      if (subtreeSum[neighbor] !== 0) {
        subtreeSum[node] += subtreeSum[neighbor];
      }
    }
  }
}

function cutTheTree(data, edges) {
  const n = data.length;

  // Build the adjacency list
  const adjList = Array.from({ length: n + 1 }, () => []);
  for (const [u, v] of edges) {
    adjList[u].push(v);
    adjList[v].push(u);
  }

  // Calculate the total sum of all nodes
  const totalSum = data.reduce((acc, val) => acc + val, 0);

  // Array to store subtree sums and visited nodes
  const subtreeSum = Array(n + 1).fill(0);
  const visited = Array(n + 1).fill(false);

  // Run iterative DFS to calculate subtree sums starting from node 1
  dfsIterative(1, data, adjList, subtreeSum, visited);

  // Find the minimum absolute difference
  let minDifference = Infinity;
  for (let i = 2; i <= n; i++) {
    const currentDifference = Math.abs(totalSum - 2 * subtreeSum[i]);
    minDifference = Math.min(minDifference, currentDifference);
  }

  return minDifference;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const data = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((dataTemp) => parseInt(dataTemp, 10));

  let edges = Array(n - 1);

  for (let i = 0; i < n - 1; i++) {
    edges[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((edgesTemp) => parseInt(edgesTemp, 10));
  }

  const result = cutTheTree(data, edges);

  ws.write(result + "\n");

  ws.end();
}
