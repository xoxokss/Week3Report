const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth-middleware");
const User = require('../models/user')

const router = express.Router();

const postUsersSchema = Joi.object({
    nickname: Joi.string().required().alphanum().min(3),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')),
    confirmPassword: Joi.ref('password')
});

router.get("/login", (req, res) => {
    res.json({ success: true, call: "로그인 페이지입니다." })
});


//회원가입 API
router.post("/users", async (req, res) => {
    try { //에러가 났을 때 에러난 부분을 catch로 이동시킨다
        const {
            nickname,
            password,
            confirmPassword,
        } = await postUsersSchema.validateAsync(req.body); //Joi로 입력값을 validation(검증)함. async.

        if (password !== confirmPassword) {
            res.status(400).send({
                errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
            });
            return;
        } else if (nickname === password) {
            res.status(400).send({
                errorMessage: "아이디와 비밀번호를 다르게 해주세요."
            });
            return;
        }

        const existUsers = await User.find({ nickname });
        if (existUsers.length) {
            res.status(400).send({
                errorMessage: "중복된 닉네임입니다.",
            });
            return;
        }

        await User.create({ nickname, password });

        res.status(201).send({});
    } catch (err) { //try에서 에러가 나면 catch로 온다.
        console.log(err); //어떤 에러인지 콘솔로 확인할 수 있음.
        res.status(400).send({
            errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
        });
    }
});
//로그인 API
router.post("/login", async (req, res) => {
    try {
      const { nickname, password } = await postAuthSchema.validateAsync(req.body);
  
      const user = await User.findOne({ nickname, password });
  
      if (!user) {
        res.status(400).send({
          errorMessage: "닉네임 또는 패스워드를 확인하세요.",
        });
        return;
      }
  
      const token = jwt.sign({ nickname: user.nickname}, "hohoho");
      console.log(token);

      res.send({
        token,
      });
    } catch (err) {
        console.log(err);
      res.status(400).send({
        errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
      });
    }
  });
  
  // 내 정보 페이지?
  router.get("/users/me", authMiddleware, async (req, res) => {
    const { user } = res.locals;
    res.send({
      user,
    });
  });


  module.exports = router; // app.js의 require()로 리턴. module.exports는 꼭 있어야함.