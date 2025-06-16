// process 객체: 프로그램과 프로세스 관련 기능 수행
// 속성
// argv
console.log("argv속성의 파라미터 수: %d", process.argv.length); // 2
console.log(process.argv);
/*
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\ezen501-16\\Desktop\\풀스택\\node_basic\\ex03_process.js'
]
*/
console.log(process.argv[2]); // node ex03_process.js 99 88 77 => 99
process.argv.forEach((val, i) => {
  console.log(`${i} : ${val}`);
});
/*
    node ex03_process.js 99 88 77 =>
    0 : C:\Program Files\nodejs\node.exe
    1 : C:\Users\ezen501-16\Desktop\풀스택\node_basic\ex03_process.js
    2 : 99
    3 : 88
    4 : 77
*/

// process.env: 운영체제에 의해 설정된 환경 변수가 들어감
console.log("*******************");
console.log(process.env);
/*
{
  ALLUSERSPROFILE: 'C:\\ProgramData',
  APPDATA: 'C:\\Users\\ezen501-16\\AppData\\Roaming',
  ChocolateyInstall: 'C:\\ProgramData\\chocolatey',
  ...
*/
console.log(process.env.OS); // Windows_NT
console.log(process.env.Path); // C:\Python313\Scripts\;C:\Python313\;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\WINDOWS\System32\OpenSSH\;C:\Program Files\nodejs\;C:\ProgramData\chocolatey\bin;C:\Program Files\Git\cmd;C:\Users\ezen501-16\AppData\Local\Microsoft\WindowsApps;C:\Users\ezen501-16\Desktop\Microsoft VS Code\bin;C:\Users\ezen501-16\AppData\Roaming\npm;

// 프로그램 종료
/*
    노드에서 이벤트 등록 방법
    [1] addListener("이벤트", 핸들러함수)
    [2] on("이벤트", 핸들러함수)

    이벤트를 강제로 발생시키고자 할 때
    [1] emit("이벤트종류")
*/
process.on("myEvent", () => {
  console.log("myEvent가 발생했습니다");
});
process.emit("myEvent"); // myEvent가 발생했습니다

process.addListener("exit", () => {
  console.log("프로그램이 종료됩니다 Bye!");
});
process.exit(); // 프로그램이 종료됩니다 Bye!
