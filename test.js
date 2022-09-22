const a = [1, 2, 3];
const b = [4, 5, 6];
const c = [1, 2, 3];

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

console.log(arrayEquals(a, b));
arrayEquals(a, b); // false
arrayEquals(a, c); // true
