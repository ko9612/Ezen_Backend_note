const area = require("./ex06_module");

const square = area.square(10);
const circle = area.circle(10);
const triangle = area.triangle(10, 3);

console.log(square); // 100
console.log(circle); // 314.1592653589793
console.log(triangle); // 15
