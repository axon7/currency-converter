export const convertToPLN = (amount, rate) => Math.round(amount * rate * 100) / 100;

export const findBiggest = (arr, toCompare) => {
  const sortedArray = [...arr];
  return sortedArray.sort((a, b) => b[toCompare] - a[toCompare])[0];
};

export const calculateTotalSum = (arr, toAdd) =>
  arr.reduce((a, b) => {
    return Number(a) + Number(b[toAdd]);
  }, 0);
