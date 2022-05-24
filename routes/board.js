const express = require("express");
const Board = require("../schemas/board"); //스키마 폴더 안에 board 스키마
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ success: true, call: "메인페이지입니다." })
});

router.get("/board", async (req, res) => { // 게시글 전체목록 조회 API 
    //get Method를 가진 board URL을 가진 json 데이터로 내보내는 API
    const { postDate } = req.query;

    const board = await Board.find({ postDate }); //Boards라는 스키마에서 find
    res.json({ //json형식으로 응답
        boards: board//원래는 goods:goods로 작성되어야한다. 그러나 key와 value가 같다면 약식이 가능하다. (객체 초기자)
    });
});

router.post("/board", async (req, res) => { // 게시글 작성 API //postingId는 입력받지 않고 어떻게 서버에서 자동으로 지정해서 res보내는지 찾아볼것.
    const { postNum, userName, password, title, content, postDate } = req.body; // 바디 정보가져옴

    isExist = await Board.find({ postNum });
    if (isExist.length) {
        return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
    }

    const createBoard = await Board.create({ postNum, userName, password, title, content, postDate });

    res.json({ board: createBoard });
});


router.get("/board/:postNum", async (req, res) => { // 게시글 상세 조회 API
    const { postNum } = req.params;

    const [posting] = await Board.find({ postNum: Number(postNum) });

    res.json({ //json형식으로 상세 조회 응답
        posting, //detail이라는 Key에 json 데이터를 넣어서 응답을 준다.
    });
})

router.put("board/:postId", async (req, res) => { // 게시글 수정 API


});

router.delete("board/:postId", async (req, res) => { // 게시글 삭제 API


});



module.exports = router; // app.js의 require()로 리턴. module.exports는 꼭 있어야함.