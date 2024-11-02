function processData(input) {
  //Enter your code here
  let inputArr = input.split("\n");
  let n = parseInt(inputArr[0]);
  let queue = [];
  let stack1 = [];
  let stack2 = [];
  for (let i = 1; i <= n; i++) {
    let temp = inputArr[i].split(" ");
    if (temp[0] === "1") {
      stack1.push(parseInt(temp[1]));
    } else {
      if (stack2.length === 0) {
        while (stack1.length > 0) {
          stack2.push(stack1.pop());
        }
      }
      if (temp[0] === "2") {
        stack2.pop();
      } else {
        queue.push(stack2[stack2.length - 1]);
      }
    }
  }
  console.log(queue.join("\n"));
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
