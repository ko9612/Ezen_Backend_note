// 전역객체: global
// console.log(global);
console.log("*****************");
global.setTimeout(() => {
  console.log("1초 뒤에 실행");
}, 1000);
global.var = "전역 변수";
global.func = () => {
  console.log("Global Function");
};
console.log(global);
console.log(global.var);
func();

// __filename, __dirname
console.log("현재 실행 중인 파일 명: %s", __filename);
console.log("현재 실행 중인 파일의 상위 경로: %s", __dirname);
