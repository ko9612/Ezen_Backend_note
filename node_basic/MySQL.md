# MySql

## cmd console에서 db server 접속

- mysql 설치 경로로 이동 => `cd C:\Program Files\MySQL\MySQL Server 8.0\bin`
- 접속 => `mysql - u root(예시) -p`
- `password` 입력
- db 생성 => `create database DB명;`
- 사용자 생성 => `create user '사용자명'@'%' identified by '비밀번호';` (@는 외부 접속 허용)
  - `create user '사용자명'@'localhost' identified by '비밀번호';`
- 권한부여 => `grant all on DB명.\* to '사용자명'@'%';`
  - `grant all on DB명.\* to '사용자명'@'localhost';`
- 권한반영 => `flush privileges;`
- 권한확인 => `show grants for '사용자명'@'localhost';`
- 현재 접속 정보 확인 => `select user(), current_user();`
- 종료 => `quit`

### 설정한 사용자로 db 서버 접속

```
mysql -u 사용자명 -p
password 입력
use db명
```

## Query 작성

- `--` 단문 주석
- `/* */` 복문 주석

### DDL(Data Definition Language)

- create, drop, alter...

```sql
create table if not exists members(
	id int auto_increment primary key,
    name varchar(50) not null,
    email varchar(100) unique not null,
    passwd varchar(100) not null,
    role varchar(20) default "USER",
    indate datetime default current_timestamp,
    refreshtoken varchar(255)
)

desc members // 테이블 확인
```

### DML

- insert, update, delete

```sql
-- 실습 내용

use eduDB;
desc members;
select * from members;

 -- 데이터 삽입: insert
 -- insert into 테이블명(컬럼명1, 컬럼명2, ...) values(값1, 값2, ...);
 -- varchar, char, text, ... 홑따옴표로 감싸서 값을 넣는다. 숫자는 x '값'
insert into members(name, passwd, email, role)
values
('홍길동','111', 'hong@naver.com', 'USER'),
('김영희','222', 'kim@naver.com','USER'),
('이철수','333', 'lee@naver.com','USER'),
('강태풍', '444', 'kang@naver.com', 'ADMIN');
;

-- 데이터 조회: select
-- select 컬럼1, 컬럼2, ...from 테이블명 [where 조건]
select id, name, email, indate, passwd, refreshtoken from members;
select * from members;

-- 이름에 특정 글자를 가진 회원정보 출력(like)
select * from members where name like '김%';
select * from members where name like '%길%';
select * from members where name like '%수';

-- 정렬, 제한
-- 회원의 이름을 정렬해서 보여주기
-- order by 컬럼명 asc(오름차순)|desc(내림차순)
select id, name, role from members
order by name asc;
select id, name, role from members
order by name desc;

-- e.g) role 오름차순 정렬 및 같은 role일 경우 등록일(indate) 내림차순으로
select id, name, role, indate from members
order by role asc, indate desc;

-- e.g) 이메일에 k가 포함된 회원들을 보여주되 등록일 내림차순으로
-- WFHO 순서
select id, name, email, indate from members
where email like '%k%'
order by indate desc;

-- e.g) 가장 오래전에 등록한 회원 2명만 보여주세요.
select id, name, indate from members
order by indate asc limit 2;

-- 집계함수
-- e.g) 전체 회원수 출력
select count(*) from members; -- null값은 포함하지 않기때문에 primary key로 카운팅해야함
select count(id) from members;
-- e.g) 일반 USER가 몇 명인지 출력
select count(*) from members
where role='USER';

-- update: 데이터 수정
update members
set name = '최지열', email='update@gamil.com', passwd='qwerty'
where id=22;
select * from members;

-- delete: 데이터 삭제
delete from members where id=22;
select * from members;
```

## JOIN

```sql
-- e.g) posts 테이블 생성
create table if not exists posts (
  id int primary key auto_increment, -- 글번호
  writer varchar(100) not null, -- 작성자
  title VARCHAR(200) NOT NULL, -- 글제목
  content TEXT, -- 글내용
  attach VARCHAR(255), -- 첨부파일명
  wdate DATETIME DEFAULT CURRENT_TIMESTAMP, -- 작성일
  -- 외래키 제약조건 (members의 email을 writer가 참조하도록)
  foreign key(writer) references members(email)
  on delete cascade -- 회원정보를 삭제하면 게시글또한 같이 삭제되는 옵션
);

insert into posts(writer, title, content)
value
('hong@naver.com', '처음 쓰는 글','처음 쓰는 글의 내용'),
('kim@naver.com', 'SQL 정리','DML문장 복습'),
('kang@naver.com', '공지사항','프로젝트 계획: 6월말 시작 예정');

select * from posts;

-- join
-- 2개 이상의 테이블을 합쳐서 1개의 테이블처럼 보여줄 수 있음

-- e.g) 게시글 목록(작성자 이름 포함)
-- select a.컬럼1, a.컬럼2, b.컬럼1, b.컬럼2 from 테이블명1 as 별칭 join 테이블명2 as 별칭 on a.pk = b.fk
select name, writer, title, wdate, p.id as '글번호' -- 컬럼값 중복 아니면 별칭 생략 가능
from members as m join posts as p
on m.email = p.writer
order by p.id desc;

-- distinct
select distinct writer from posts; -- 중복제거

-- e.g) 전체 게시글 수를 구해 출력
select count(id) from posts;

-- e.g) 회원별 게시글 수를 구해 출력
-- group by절을 통해 select할 경우, group by에서 사용된 컬럼만 가져올 수 있음 + 그룹함수
select writer, count(id) from posts group by writer;

-- e.g) 작성자별로 게시글 수가 3개 이상되는 통계치만 보여줘
-- group by절에 조건을 부여할 때는 having절을 이용
select writer, count(id)
from posts
group by writer
having count(id) >= 3;
```
