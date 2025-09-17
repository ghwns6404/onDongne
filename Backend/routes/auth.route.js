const express = require('express');
const router = express.Router();

// 인증 라우터: 단순 회원가입/로그인 (평문)
const authController = require('../controllers/auth.controller');

// 회원가입
router.post('/signup', authController.signup);

// 로그인
router.post('/login', authController.login);

module.exports = router;


