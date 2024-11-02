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
 * Complete the 'cookies' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY A
 */

function cookies(k, A) {
  // Write your code here

  class MinHeap {
    constructor() {
      this.heap = [];
    }

    size() {
      return this.heap.length;
    }

    insert(val) {
      this.heap.push(val);
      this.bubbleUp();
    }

    peek() {
      return this.heap[0];
    }

    remove() {
      if (this.heap.length === 0) return null;
      if (this.heap.length === 1) return this.heap.pop();

      let min = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.bubbleDown();
      return min;
    }

    bubbleUp() {
      let current = this.heap.length - 1;
      while (current > 0) {
        let parent = Math.floor((current - 1) / 2);
        if (this.heap[current] >= this.heap[parent]) break;
        let temp = this.heap[current];
        this.heap[current] = this.heap[parent];
        this.heap[parent] = temp;
        current = parent;
      }
    }

    bubbleDown() {
      let current = 0;
      let left = 2 * current + 1;
      let right = 2 * current + 2;
      let next;
      while (left < this.heap.length) {
        if (right < this.heap.length && this.heap[right] < this.heap[left]) {
          next = right;
        } else {
          next = left;
        }

        if (this.heap[current] <= this.heap[next]) break;

        let temp = this.heap[current];
        this.heap[current] = this.heap[next];
        this.heap[next] = temp;
        current = next;
        left = 2 * current + 1;
        right = 2 * current + 2;
      }
    }
  }

  let operations = 0;
  let heap = new MinHeap();
  A.forEach((element) => heap.insert(element));
  while (heap.size() > 1 && heap.peek() < k) {
    let first = heap.remove();
    let second = heap.remove();
    let newCookie = first + 2 * second;
    heap.insert(newCookie);
    operations++;
  }

  return heap.peek() < k ? -1 : operations;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const k = parseInt(firstMultipleInput[1], 10);

  const A = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((ATemp) => parseInt(ATemp, 10));

  const result = cookies(k, A);

  ws.write(result + "\n");

  ws.end();
}
