const isPrime = number => {
  for (let i = 2; i < number; i++) {
    if (number % i === 0) return false;
  }
  return number > 1;
};

const countOccurences = arr => {
  return arr.reduce(function(obj, key) {
    obj[key] = ++obj[key] || 1;
    return obj;
  }, {});
};

const filterByPrimeDuplicates = (arrA, arrB) => {
  const objCount = countOccurences(arrB);

  Object.keys(objCount).forEach(key => {
    if (!isPrime(objCount[key])) delete objCount[key];
  });
  return arrA.filter(item => !objCount[item]);
};

console.log(
  filterByPrimeDuplicates(
    [2, 3, 9, 2, 5, 1, 3, 7, 10],
    [2, 1, 3, 4, 3, 10, 6, 6, 1, 7, 10, 10, 10]
  )
);
