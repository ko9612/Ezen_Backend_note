// path 모듈: 파일의 경로 처리 기능 제공
// path.sep: os의 파일 경로 구분자
// join(): 경로를 결합
// resolve(경로): 주어진 경로를 절대 경로로 변환
// dirname(경로): 주어진 경로에서 파일 이름을 제외한 디렉토리 경로만 반환
// basename(경로): 파일명 반환(확장자 포함)
// extname(경로): 확장자 반환
const path = require("path");
const dirs = [
  "C:",
  "Users",
  "ezen501-16",
  "Desktop",
  "풀스택",
  "root",
  "Ezen_Backend",
  "node_basic",
];
const dirStr = dirs.join(path.sep);
console.log(dirStr); // C:\Users\ezen501-16\Desktop\풀스택\root\Ezen_Backend\node_basic

const curPath = path.join(dirStr, "public", "pizzaUI.html"); // curPath: 파일명 제외한 상위 경로
const upDir = path.dirname(curPath);
console.log(upDir); // C:\Users\ezen501-16\Desktop\풀스택\root\Ezen_Backend\node_basic\public
const fname = path.basename(curPath);
console.log(fname); // pizzaUI.html
const ext = path.extname(curPath);
console.log(ext); // .html

console.log("*********************");

const filename = "/home/user/project/file.txt";
// 2단계 상위 경로
const str = path.join(filename, "..", "..");
console.log(str); // \home\user
console.log(path.resolve(str)); // 주어진 경로를 절대 경로로 반환 C:\home\user
