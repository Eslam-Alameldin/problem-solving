function processData(input) {
  //Enter your code here
  let stack = [];
  let str = "";
  let n = input.split("\n");
  for (let i = 1; i < n.length; i++) {
    let [op, val] = n[i].split(" ");
    if (op === "1") {
      stack.push(str);
      str += val;
    } else if (op === "2") {
      stack.push(str);
      str = str.slice(0, str.length - val);
    } else if (op === "3") {
      console.log(str[val - 1]);
    } else {
      str = stack.pop();
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
