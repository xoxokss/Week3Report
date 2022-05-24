const express = require("express");
const Boards = require("../schemas/board"); //스키마 폴더 안에 board 스키마
const router = express.Router();

router.get('/', (req, res) => {
	res.send('this is home page');
});

router.get('/board', (req, res) => {
	res.send('this is board page');
});

router.get("/board", async (req, res) => { // 게시글 목록조회 API 
    //get Method를 가진 board URL을 가진 json 데이터로 내보내는 API
    
    const {postingTime} = req.query;
    
    const Board = await Board.find({postingTime}); //Goods라는 스키마에서 find
    res.json({ //json형식으로 응답
        Board, //원래는 goods:goods로 작성되어야한다. 그러나 key와 value가 같다면 약식이 가능하다. (객체 초기자)
    });
});
module.exports = router; // app.js의 require()로 리턴. module.exports는 꼭 있어야함.