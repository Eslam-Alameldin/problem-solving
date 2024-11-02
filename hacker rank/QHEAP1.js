function processData(input) {
  //Enter your code here
  let inputArr = input.split("\n");

  let n = parseInt(inputArr[0]);

  let heap = [];

  for (let i = 1; i <= n; i++) {
    let temp = inputArr[i].split(" ");

    if (temp[0] === "1") {
      heap.push(parseInt(temp[1]));
      bubbleUp(heap, heap.length - 1);
    } else if (temp[0] === "2") {
      let index = heap.indexOf(parseInt(temp[1]));
      heap[index] = heap[heap.length - 1];
      heap.pop();
      bubbleDown(heap, index);
    } else {
      console.log(heap[0]);
    }
  }

  function bubbleUp(heap, index) {
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (heap[index] >= heap[parent]) break;
      let temp = heap[index];
      heap[index] = heap[parent];
      heap[parent] = temp;
      index = parent;
    }
  }

  function bubbleDown(heap, index) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let next;
    while (left < heap.length) {
      if (right < heap.length && heap[right] < heap[left]) {
        next = right;
      } else {
        next = left;
      }

      if (heap[index] <= heap[next]) break;

      let temp = heap[index];
      heap[index] = heap[next];
      heap[next] = temp;
      index = next;
      left = 2 * index + 1;
      right = 2 * index + 2;
    }
  }
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
  _input += input;
});

process.stdin.on("end", function () {
  processData(_input);
});
