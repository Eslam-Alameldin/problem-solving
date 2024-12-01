/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  // use sets to store the numbers in each row, column, and box

  const rows = Array.from({ length: 9 }, () => new Set());
  const columns = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const num = board[r][c];
      if (num === ".") continue;
      const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      if (rows[r].has(num) || columns[c].has(num) || boxes[boxIndex].has(num)) {
        return false;
      }
      rows[r].add(num);
      columns[c].add(num);
      boxes[boxIndex].add(num);
    }
  }

  return true;
};
