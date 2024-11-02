"use strict";

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
 * Complete the 'noPrefix' function below.
 *
 * The function accepts STRING_ARRAY words as parameter.
 */

function noPrefix(words) {
  // Write your code here
  class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
    }
  }

  class Trie {
    constructor() {
      this.root = new TrieNode();
    }

    insert(word) {
      let current = this.root;
      for (let char of word) {
        if (!current.children[char]) {
          current.children[char] = new TrieNode();
        }
        current = current.children[char];
        if (current.isEndOfWord) {
          return false; // If we encounter a complete word in the Trie that matches a prefix
        }
      }
      current.isEndOfWord = true;

      // Check if the current word is a prefix of any other existing word in the Trie
      return Object.keys(current.children).length === 0;
    }
  }

  const trie = new Trie();

  for (let word of words) {
    if (!trie.insert(word)) {
      console.log("BAD SET");
      console.log(word);
      return;
    }
  }
  console.log("GOOD SET");
}

function main() {
  const n = parseInt(readLine().trim(), 10);

  let words = [];

  for (let i = 0; i < n; i++) {
    const wordsItem = readLine();
    words.push(wordsItem);
  }

  noPrefix(words);
}
