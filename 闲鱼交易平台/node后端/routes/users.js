/**
 * 描述: 用户路由模块

*/

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const service = require('../services/userService');


// 登录/注册校验
const vaildator = [
  body('username').isString().withMessage('用户名类型错误'),
  body('password').isString().withMessage('密码类型错误')
]

// 重置密码校验
const resetPwdVaildator = [
  body('username').isString().withMessage('用户名类型错误'),
  body('oldPassword').isString().withMessage('密码类型错误'),
  body('newPassword').isString().withMessage('密码类型错误')
]

// 用户登录路由
router.post('/login', vaildator, service.login);

// 用户注册路由
router.post('/register',vaildator, service.register);

// 密码重置路由
router.post('/resetPwd', resetPwdVaildator, service.resetPwd);

//用户更新数据接口
router.post('/updateUserInfo', service.updateUserInfo);

//查询用户信息
router.get('/findUserInfo', service.findUserInfo);

//发布新闻
router.post('/postNews',service.postNews);

//获取已发布新闻
router.post('/getUserNews',service.getUserNews);

//获取图片
router.post('/getFile',service.getFile);

//发布评论
router.post('/postComments',service.postComments);
module.exports = router;

