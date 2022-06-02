// 사용자 인증 미들웨어
// res.locals.user 라는 객체에 인증해놓은 유저객체를 넣어두었다.

const jwt = require("jsonwebtoken"); //jwt 불러오기
const User = require("../models/user"); // User 모델 스키마 불러오기

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = (authorization || "").split(" "); //split 함수로 공백을 기준, 배열로 반환함.

    if (tokenType !== "Bearer") {
        res.status(401).send({
            errorMessage: "로그인이 필요합니다."
        });
        return;
    }

    try {
        const { userId } = jwt.verify(tokenValue, "hohoho"); //서버에선 시크릿키로 jwt 검증(verify)해야함. 
        console.log(userId);

        User.findbyId(userId).exec() // User 모델에서 userId 찾기. 사용자를 데이터베이스에 가져옴.
           .then((user) => {  //promise then
                res.locals.user = user; //response 객체. locals 객체 공간에 user를 담아서 auth 미들웨어를 사용하는 모든 곳에 넘길 수 있음
                next(); //미들웨어는 next가 꼭 호출되어야함.
            });
        // `res.locals.user = user;` 는 무슨 코드인가요?
        // 우리는 토큰에 담긴 userId로 해당 사용자가 실제로 존재하는지 확인했습니다.   
        // 이미 데이터베이스에서 사용자 정보를 가져온것이죠.
        // 이 미들웨어를 사용하는 라우터에서는 굳이 데이터베이스에서 사용자 정보를 가져오지 않게 할 수 있도록 express가 제공하는 안전한 변수에 담아두고 언제나 꺼내서 사용할 수 있게 작성했습니다! 
        // 이렇게 담아둔 값은 정상적으로 응답 값을 보내고 나면 소멸하므로 해당 데이터가 어딘가에 남아있을 걱정의 여지를 남겨두지 않게 됩니다 😎

    } catch (error) { //유효한 토큰이 아닌 경우 에러로 옴.
        res.status(401).send({
            errorMessage: '로그인이 필요합니다.'
        });
    };

    //try catch 공부하기. try 구문 안에서 실행될 때 에러가 발생하면 catch로 넘김

};