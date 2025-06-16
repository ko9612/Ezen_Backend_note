// os (내장 모듈)
const os = require("os");
console.log("OS 시스템의 타입: %s", os.type()); // OS 시스템의 타입: Windows_NT
console.log("시스템의 호스트명: %s", os.hostname()); // 시스템의 호스트명: DESKTOP-8DBRQTU
console.log("시스템의 메모리 %d bytes / %d bytes", os.freemem(), os.totalmem()); // 시스템의 메모리 22924750848 bytes / 34222698496 bytes
