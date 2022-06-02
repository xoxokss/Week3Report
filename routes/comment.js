const express = require("express");
const Comment = require("../models/comment"); //스키마 폴더 안에 board 스키마
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();
