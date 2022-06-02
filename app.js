const express = require("express");
const app = express();
const connect = require("./models"); // schemas를 index.js에서 mongoDB 서버에 연결


connect();

const boardRouter = require("./routes/board"); // 함수표현식. require 함수로 모듈(board.js)을 가지고옴.

const userRouter = require("./routes/user"); // 함수표현식. require 함수로 모듈(user.js)을 가지고옴.

const commentRouter = require("./routes/comment");

const requestMiddleware = ((req, res, next) => {  // 접근 URL과 시간 로그 미들웨어
    console.log("Request URL:",req.originalUrl, "-", new Date());
    next();
});

app.use(express.static('static')); //프론트엔드 static

app.use(express.json()); // json 미들웨어 실행

app.use(express.urlencoded()); // url 인코더 미들웨어 실행

app.use(requestMiddleware); // 요청 URL과 시간 미들웨어 실행

app.use("/api", [boardRouter]); // /api라는 주소url 요청시 라우터 미들웨어 실행. routes/board.js에 있는 라우터 미들웨어를 통해 처리된다.

app.use("/api", [userRouter]);
app.use("/api", [commentRouter]);


app.get('/', (req, res) => { //루트 디렉토리
  res.send('Hello World!@@@');
});



app.listen(3000, () => {
  console.log('포트로 서버가 열렸어요!');
});