const url = require("url"); // url 주소를 파싱하여 조작할 수 있게 하는 모듈
const str = `https:brand.naver.com/weeknine/shoppingstory/detail?id=5002039527`;
const str2 = `https://example.com:8080/path/name?query=string#hash`;
// 1. url.parse(url): url주소를 분해해서 내가 원하는 정보를 추출할 수 있다.
// 2. url.format(obj): 분해된 url 객체를 다시 원 상태로 조립한 문자열 반환
const parseUrl = url.parse(str);
console.log(parseUrl);
console.log(parseUrl.query); // id=5002039527
console.log(parseUrl.pathname); // brand.naver.com/weeknine/shoppingstory/detail
console.log("url.format(): ", url.format(parseUrl)); // url.format():  https:brand.naver.com/weeknine/shoppingstory/detail?id=5002039527
console.log("*********************************");

// 최근 whatwg url 표준을 따른ㄴ 새로운 url api를 사용
const myUrl = new URL(str2);

// 쿼리 읽기
console.log(myUrl);
console.log(myUrl.searchParams.get("query")); // string
console.log(myUrl.searchParams.get("id")); // null
console.log(myUrl.hash); // #hash

// 쿼리 수정
myUrl.searchParams.set("id", "300");
// console.log(myUrl.href); // https://example.com:8080/path/name?query=string&id=300#hash

// 쿼리 추가
myUrl.searchParams.append("sort", "price");
// console.log(myUrl.href); // https://example.com:8080/path/name?query=string&id=300&sort=price#hash

// 쿼리 삭제
myUrl.searchParams.delete("query");
console.log(myUrl.href); // https://example.com:8080/path/name?id=300&sort=price#hash
