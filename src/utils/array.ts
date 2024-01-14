export function toClone<T> (array: T[]): T[] {
  return [...new Set(array)]
}

export function toReverse<T> (array: T[]): T[] {
  return toClone(array).reverse()
}

export function toSort<T> (array: T[], compare?: (a: T, b: T) => number): T[] {
  return toClone(array).sort(compare)
}

export function toReduce<T, U> (array: T[], callback: (accumulator: U, currentValue: T) => U, initialValue: U): U {
  return toClone(array).reduce(callback, initialValue)
}
