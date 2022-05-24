const express = require("express");
const Board = require("../schemas/board"); //스키마 폴더 안에 board 스키마
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ success: true, call: "메인페이지입니다." })
});
// /board?sortby=postDate&orderby=desc
router.get("/board", async (req, res) => { // 게시글 전체목록 조회 API 
    //get Method를 가진 board URL을 가진 json 데이터로 내보내는 API
    const { postDate } = req.query;

    const board = await Board.find({ postDate }).sort({postDate:-1}); //Board라는 스키마에서 find, sort()날짜기준 내림차순 
    res.status(200).json({ //json형식으로 응답
        boards: board//원래는 json 형식으로 board:board 로 작성되어야한다. 그러나 key와 value가 같다면 약식이 가능하다. (객체 초기자)
    });
});

router.post("/board", async (req, res) => { // 게시글 작성 API
    const { userName, password, title, content, postDate } = req.body; // 바디 정보가져옴

    // 자동으로 postId를 넣는 라이브러리 설치 후 중복확인 절차 제거
    // isExist = await Board.find({ postId });
    // if (isExist.length) {
    //     return res.status(400).json({ success: false, errorMessage: "이미 있는 게시글입니다." });
    // }

    const createBoard = await Board.create({ userName, password, title, content, postDate });

    res.status(201).json({ board: createBoard });
});


router.get("/board/:postId", async (req, res) => { // 게시글 상세 조회 API
    const { postId } = req.params;

    const [detail] = await Board.find({ postId: Number(postId) });

    res.status(200).json({ //json형식으로 상세 조회 응답
        detail, // detail이라는 Key에 json 데이터를 넣어서 응답을 준다.
    });
});


router.put("/board/:postId", async (req, res) => { // 게시글 수정 API
    const { postId } = req.params;
    const { password, title, content } = req.body;
    const correctPw = await Board.findOne({ postId })
    if (password == correctPw.password) {
        const updateBoard = await Board.updateOne({ postId: Number(postId) }, { $set: { title , content} });
        res.status(201).json({ board: updateBoard })
    } else {
        return res.status(401).json({ success: false, errorMessage: "비밀번호 재확인." });
    };
});

router.delete("/board/:postId", async (req, res) => { // 게시글 삭제 API
    const { postId } = req.params;
    const { password } = req.body;
    const correctPw = await Board.findOne({ postId })
    if (password == correctPw.password) {
        const deleteBoard = await Board.deleteOne({ postId: Number(postId) });
        res.status(200).json({ board: deleteBoard })
    } else {
        return res.status(401).json({ success: false, errorMessage: "비밀번호 재확인." });
    };
});

module.exports = router; // app.js의 require()로 리턴. module.exports는 꼭 있어야함.