const express = require('express');
const router = express.Router();

// 인증 라우터: 실제 컨트롤러와 인증 미들웨어를 연결
const authController = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/authMiddleware');

// 회원가입
router.post('/signup', authController.signup);

// 로그인
router.post('/login', authController.login);

// 내 정보(인증 필요)
router.get('/me', authMiddleware, authController.me);

module.exports = router;


