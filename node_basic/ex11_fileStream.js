// 대용량 로그 파일/대형 csv파일 파싱, 스트리밍 다운로드 구현, 동영상 및 오디오 처리
// fs.readFle() => 비효율적(파일 전체를 한 번에 메모리에 로드하는 방식)
// 스트림 방식 => 점진적 읽기 가능하며 이벤트 기반으로 처리(큰 파일)
// createReadStream() / createWriteStream()

const fs = require("fs");
const readStream = fs.createReadStream("ex02_console.js", {
  highWaterMark: 16, // 버퍼 크기: 16byte, default => 64byte
});

const data = []; // 파일 데이터를 담을 배열
// 이벤트 방식 입력
readStream.on("data", (chunk) => {
  // 스트림에서 데이터 조각(chunk)를 받을 때 마다 호출
  console.log(chunk);
  console.log(chunk.length);
  data.push(chunk);
});
readStream.on("end", () => {
  if (typeof data === "object") {
    // string으로 들어올 경우
    console.log(data.toString());
  } else {
    // Buffer로 들어올 경우
    // 더 이상 읽을 데이터가 없을 때 호출
    const buffer = Buffer.concat(data);
    console.log(buffer.toString());
  }
});
readStream.on("error", (err) => {
  console.log("파일 읽는 중 에러: ", err.message);
});
