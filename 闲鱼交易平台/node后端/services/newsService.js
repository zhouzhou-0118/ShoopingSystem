/**
 * 描述: 业务逻辑处理 - 任务相关接口
*/
const { querySql, queryOne } = require('../utils/index');
const jwt = require('jsonwebtoken');
const boom = require('boom');
const { validationResult } = require('express-validator');
const { 
  CODE_ERROR,
  CODE_SUCCESS, 
  PRIVATE_KEY, 
  JWT_EXPIRED 
} = require('../utils/constant');
const { decode } = require('../utils/user-jwt');

//搜索商品列表
function searchNews(req, res, next){
    const err = validationResult(req);
    // 如果验证错误，empty不为空
    if (!err.isEmpty()) {
      // 获取错误信息
      const [{ msg }] = err.errors;
      // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
      next(boom.badRequest(msg));
    } else {
        let {searchWord,pageSize,currentPage} = req.body;
        pageSize = pageSize? pageSize : 10;
        currentPage = currentPage? currentPage : 1;
        let query = `select * from news`
        querySql(query)//获取所有数据列表数据
        .then(data => {
            if(!data || data.length === 0){
                res.json({
                    code: CODE_SUCCESS,
                    msg:`获取到0条数据`,
                    data:[],
                    total:parseInt(data.length),
                    pageSize:parseInt(pageSize),
                    currentPage:parseInt(currentPage)
                })
            }else{
                let total = data.length;
                let  n = (currentPage - 1) * pageSize;
                let querySearchAll  = `select * from news where title LIKE '%${searchWord}%' order by gmt_create`;
                querySql(querySearchAll)
                .then(
                    data => {
                        if(!data || data.length === 0){
                            res.json({
                                code: CODE_SUCCESS,
                                msg:`获取到0条数据`,
                                data:[],
                                total:parseInt(data.length),
                                pageSize:parseInt(pageSize),
                                currentPage:parseInt(currentPage)
                            })
                        }else{
                            let querySearchPage = querySearchAll + ` limit ${n} , ${pageSize}`;
                            querySql(querySearchPage)
                            .then(dataPage => {
                                res.json({
                                    code:CODE_SUCCESS,
                                    msg:`获取到${data.length}条数据`,
                                    data:dataPage,
                                    total:parseInt(data.length),
                                    pageSize:parseInt(pageSize),
                                    currentPage:parseInt(currentPage)
                                })
                            })
                        }
                    }
                )
            }
        })
    }
}

//商品详情
function getNewsById(req, res, next){
    const err = validationResult(req);
    // 如果验证错误，empty不为空
    if (!err.isEmpty()) {
      // 获取错误信息
      const [{ msg }] = err.errors;
      // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
      next(boom.badRequest(msg));
    } else {
        const menuId = req.body.id;
        let query = `select * from news where id = ${menuId}`
        querySql(query)
        .then(
            (data) => {
                if(!data || data.length === 0){
                    res.json({
                        code:CODE_ERROR,
                        msg:'获取商品详情失败',
                        data:null
                    })
                }else{
                    res.json({
                        code:CODE_SUCCESS,
                        msg:'获取商品详情成功',
                        data:data
                    })
                }
            }
        )
    }
}
//评论详情
function getCommentsById(req, res, next){
    const err = validationResult(req);
    // 如果验证错误，empty不为空
    if (!err.isEmpty()) {
      // 获取错误信息
      const [{ msg }] = err.errors;
      // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
      next(boom.badRequest(msg));
    } else {
        const menuId = req.body.id;
        let query = `select * from comments where shop_id = ${menuId}`
        querySql(query)
        .then(
            (data) => {
                if(!data || data.length === 0){
                    res.json({
                        code:CODE_SUCCESS,
                        msg:'获取评论成功',
                        data:[]
                    })
                }else{
                    res.json({
                        code:CODE_SUCCESS,
                        msg:'获取评论成功',
                        data:data
                    })
                }
            }
        )
    }
}
//热门推荐
function getRecommendNews(req, res, next){
    const err = validationResult(req);
    // 如果验证错误，empty不为空
    if (!err.isEmpty()) {
      // 获取错误信息
      const [{ msg }] = err.errors;
      // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
      next(boom.badRequest(msg));
    } else {
        let {article_type,pageSize,currentPage} = req.body;
        pageSize = pageSize? pageSize : 10;
        currentPage = currentPage? currentPage : 1;
        let query = `select * from news`
        querySql(query)//获取所有数据列表数据
        .then(data => {
            if(!data || data.length === 0){
                res.json({
                    code: CODE_SUCCESS,
                    msg:`获取到0条数据`,
                    data:[],
                    total:parseInt(data.length),
                    pageSize:parseInt(pageSize),
                    currentPage:parseInt(currentPage)
                })
            }else{
                let total = data.length;
                let  n = (currentPage - 1) * pageSize;
                let querySearchAll  = `select * from news where article_type = '${article_type}' order by gmt_create`;
                querySql(querySearchAll)
                .then(
                    data => {
                        if(!data || data.length === 0){
                            res.json({
                                code: CODE_SUCCESS,
                                msg:`获取到0条数据`,
                                data:[],
                                total:parseInt(data.length),
                                pageSize:parseInt(pageSize),
                                currentPage:parseInt(currentPage)
                            })
                        }else{
                            let querySearchPage = querySearchAll + ` limit ${n} , ${pageSize}`;
                            querySql(querySearchPage)
                            .then(dataPage => {
                                res.json({
                                    code:CODE_SUCCESS,
                                    msg:`获取到${data.length}条数据`,
                                    data:dataPage,
                                    total:parseInt(data.length),
                                    pageSize:parseInt(pageSize),
                                    currentPage:parseInt(currentPage)
                                })
                            })
                        }
                    }
                )
            }
        })
    }
}
//获取所有商品
function getAllNews(req, res, next){
    const err = validationResult(req);
    // 如果验证错误，empty不为空
    if (!err.isEmpty()) {
      // 获取错误信息
      const [{ msg }] = err.errors;
      // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
      next(boom.badRequest(msg));
    } else {
        console.log(req.headers.cookie);
        let query = `select * from news`
        querySql(query)//获取所有数据列表数据
        .then(data => {
            if(!data || data.length === 0){
                res.json({
                    code: CODE_SUCCESS,
                    msg:`获取到0条数据`,
                    data:[],
                })
            }else{
                res.json({
                    code:CODE_SUCCESS,
                    msg:`获取到${data.length}条数据`,
                    data
                })
            }
        })
    }
}
module.exports = {
    searchNews,
    getNewsById,
    getRecommendNews,
    getAllNews,
    getCommentsById
}