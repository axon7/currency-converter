import { convertToPLN, findBiggest, calculateTotalSum } from "./utils";

const transactions = [
  {
    transaction: "laptop",
    amount: 111111111
  },
  {
    transaction: "cookie",
    amount: 123
  },
  {
    transaction: "bread",
    amount: 30
  }
];

it("calculates to 123* 2.6406 = 324.79", () => {
  expect(convertToPLN(123, 2.6406)).toEqual(324.79);
});

it("search for biggest transaction by amount and return object with laptop", () => {
  const obj = {
    transaction: "laptop",
    amount: 111111111
  };
  expect(findBiggest(transactions, "amount")).toEqual(obj);
});

it("calculates to total sum and returns", () => {
  expect(calculateTotalSum(transactions, "amount")).toEqual(111111264);
});
