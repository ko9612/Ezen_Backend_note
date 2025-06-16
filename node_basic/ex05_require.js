const obj = require("./ex05_module"); // 확장자는 생략 가능
console.log(obj.num); // 1000
obj.plus(10, 3); // 10+3=13
obj.minus(10, 3); // 10-3=7

/*
    require("모듈명")
    require("./module")
    1. 먼저 module.js를 찾는다
    2. 해당 파일이 없다면 module이라는 디렉토리를 찾는다
    3. 디렉토리가 있으면 해당 디렉토리의 index.js를 찾아서 가져옴
*/

const obj2 = require("./sample");
obj2.mul(10, 3); // 10*3=30
obj2.div(10, 3); // 10/3=3.3333333333333335
