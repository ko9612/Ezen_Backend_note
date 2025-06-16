/*
    1. 노드의 디폴트 모듈 사용 => CommonJS 표준을 따름. require 방식
    2. ES6의 모듈 사용 방법
        2.1) 파일의 확장자를 .mjs로 변경하거나
        2.2) package.json 파일에 "type": "module" 설정을 추가
*/

export function printStar(num) {
  for (let i = 0; i < num; i++) {
    console.log("★★★★");
  }
}
