export type multiDimensionalArray = number[] | number[][] | number[][][] | number[][][][];

export type multiDimensionalArrayComplex = Exclude<multiDimensionalArray, number[]>;

export const isNumberArray = (initial: multiDimensionalArray): initial is [number, number] => typeof initial[0] === "number";

export const isNumberArrayArray = (initial: multiDimensionalArray): initial is multiDimensionalArrayComplex => initial[0] instanceof Array;

export const flattenNumberArrays = (initial: multiDimensionalArray) => {
  if (isNumberArray(initial)) {
    return [initial];
  }

  if (isNumberArrayArray(initial)) {
    const acc = [] as [number, number][];

    initial.forEach((coordinate) => {
      acc.push(...flattenNumberArrays(coordinate));
    });

    return acc;
  }

  return [] as [number, number][];
};