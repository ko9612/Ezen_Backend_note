// console
console.log("정수 출력: %d", 555); // 정수 출력: 555
console.log("실수 출력: %d", 3.141592); // 실수 출력: 3.141592
console.log("실수 출력: %s", (3.141592).toFixed(2)); // 실수 출력: 3.14
console.log("문자열: %s", "Hello World~"); // 문자열: Hello World~
const obj = {
  num: 1,
  name: "홍길동",
  age: 22,
};
console.log("JSON객체: %j", obj); // JSON객체: {"num":1,"name":"홍길동","age":22}
console.log("%d % 할인", 30); // 30 % 할인

console.table([obj, { num: 2, name: "김영희", age: 21 }]);
/*
 ┌─────────┬─────┬──────────┬─────┐
 │ (index) │ num │ name     │ age │
 ├─────────┼─────┼──────────┼─────┤
 │ 0       │ 1   │ '홍길동'  │ 22  │
 │ 1       │ 2   │ '김영희'  │ 21  │
 └─────────┴─────┴──────────┴─────┘
*/
console.time("sum"); // label
let result = 0;
for (let i = 0; i < 10000; i++) {
  result += i;
}
console.timeEnd("sum"); // sum: 0.14ms
console.log("1~10000까지의 누접 합: %d", result); // 1~10000까지의 누접 합: 49995000

console.error("에러 출력 (x)");
console.warn("경고 출력 (!)");
console.debug("디버깅 정보");
console.info("정보 출력");
console.assert(1 == 2); // 검증 시 사용 (assertion) 조건이 false일 때만 메시지 출력 => Assertion failed
