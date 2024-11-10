/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */

// brute force solution
var suggestedProducts = function (products, searchWord) {
  products.sort();
  const result = [];
  let prefix = "";
  for (let i = 0; i < searchWord.length; i++) {
    prefix += searchWord[i];
    const suggestions = [];
    for (let j = 0; j < products.length; j++) {
      if (products[j].startsWith(prefix)) {
        suggestions.push(products[j]);
      }
      if (suggestions.length === 3) {
        break;
      }
    }
    result.push(suggestions);
  }
  return result;
};

//If there are more than three products with a common prefix return the three lexicographically minimums products.
// optimized solution
