/**
 * 描述: 任务路由模块
*/

const express = require('express');
const router = express.Router();
const service = require('../services/newsService');

//商品搜索接口
router.post('/searchNews',service.searchNews);
//商品详情
router.post('/getNewsById',service.getNewsById);
//热门推荐
router.post('/getRecommendNews',service.getRecommendNews);
//获取所有商品
router.post('/getAllNews',service.getAllNews);
//获取所有评论
router.post('/getCommentsById',service.getCommentsById);
module.exports = router;