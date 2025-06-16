const fs = require("fs");
const zlib = require("zlib");

const copy = (src, dest) => {
  const rs = fs.createReadStream(src); // 원본파일명 => 읽는 스트림 연결
  const ws = fs.createWriteStream(dest); // 목적파일명 => 쓰는 스트림 연결
  // readStream.pipe(writeStream)
  // 읽는 스트림과 쓰는 스트림을 면결해서 데이터를 전달하는 기능 수행
  rs.pipe(ws);
  console.log("---파일 카피 중...---");
};
console.log("복사 시작******");
copy("ex03_process.js", "copy.txt");
copy("heroImage4.jpg", "copy.jpg");
console.log("복사 완료******");

// 파일 압축(Gzip, zip은 라이브러리)
fs.createReadStream("heroImage4.jpg")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("copy_compression.gz"))
  .on("finish", () => {
    console.log("파일 압축 완료!");
  });
