/**
 * 描述: 业务逻辑处理 - 用户相关接口
*/

const multiparty = require('multiparty');
const { querySql, queryOne } = require('../utils/index');
const md5 = require('../utils/md5');
const jwt = require('jsonwebtoken');
const boom = require('boom');
const { body, validationResult } = require('express-validator');
const { 
  CODE_ERROR,
  CODE_SUCCESS, 
  PRIVATE_KEY, 
  JWT_EXPIRED 
} = require('../utils/constant');
const { decode } = require('../utils/user-jwt');


// 登录
function login(req, res, next) {
  const err = validationResult(req);
  // 如果验证错误，empty不为空
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
    next(boom.badRequest(msg));
  } else {
    let { username, password } = req.body;
    // md5加密
    password = md5(password);
    const query = `select * from user where username='${username}' and password='${password}'`;
    querySql(query)
    .then(user => {
    	// console.log('用户登录===', user);
      if (!user || user.length === 0) {
        res.json({ 
        	code: CODE_ERROR, 
        	msg: '用户名或密码错误', 
        	data: null 
        })
      } else {
        // 登录成功，签发一个token并返回给前端
        const token = jwt.sign(
          // payload：签发的 token 里面要包含的一些数据。
          { username},
          // 私钥
          PRIVATE_KEY,
          // 设置过期时间
          { expiresIn: JWT_EXPIRED }
        )

        let userData = {
          id: user[0].id,
          username: user[0].username,
          nickname: user[0].nickname,
          avator: user[0].avator,
          sex: user[0].sex,
          gmt_create: user[0].gmt_create,
          gmt_modify: user[0].gmt_modify
        };
        res.json({ 
        	code: CODE_SUCCESS, 
        	msg: '登录成功', 
        	data: { 
            token,
            id:userData.id
          } 
        })
      }
    })
  }
}
// 注册
function register(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    let { username, password, phone, address,nickname,sex } = req.body;
    console.log('body');
    console.log(req.body);
    findUser(username,1)
  	.then(data => {
  		// console.log('用户注册===', data);
  		if (data) {
  			res.json({ 
	      	code: CODE_ERROR, 
	      	msg: '用户已存在', 
	      	data: null 
	      })
  		} else {
	    	password = md5(password);
  			const query = `insert into user(username, password,nickname,sex,phone,address) values('${username}', '${password}','${nickname}','${sex}', '${phone}', '${address}')`;
  			querySql(query)
		    .then(result => {
		    	// console.log('用户注册===', result);
		      if (!result || result.length === 0) {
		        res.json({ 
		        	code: CODE_ERROR, 
		        	msg: '注册失败', 
		        	data: null 
		        })
		      } else {
            const queryUser = `select * from user where username='${username}' and password='${password}'`;
            querySql(queryUser)
            .then(user => {
              const token = jwt.sign(
                { username },
                PRIVATE_KEY,
                { expiresIn: JWT_EXPIRED }
              )

              let userData = {
                id: user[0].id,
                username: user[0].username,
                nickname: user[0].nickname,
                avator: user[0].avator,
                sex: user[0].sex,
                gmt_create: user[0].gmt_create,
                gmt_modify: user[0].gmt_modify
              };

              res.json({ 
                code: CODE_SUCCESS, 
                msg: '注册成功', 
                data: { 
                  token,
                } 
              })
            })
		      }
		    })
  		}
  	})
   
  }
}

// 重置密码
function resetPwd(req, res, next) {
	const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    let { username, oldPassword, newPassword } = req.body;
    oldPassword = md5(oldPassword);
    validateUser(username, oldPassword)
    .then(data => {
      console.log('校验用户名和密码===', data);
      if (data) {
        if (newPassword) {
          newPassword = md5(newPassword);
				  const query = `update user set password='${newPassword}' where username='${username}'`;
				  querySql(query)
          .then(user => {
            // console.log('密码重置===', user);
            if (!user || user.length === 0) {
              res.json({ 
                code: CODE_ERROR, 
                msg: '重置密码失败', 
                data: null 
              })
            } else {
              res.json({ 
                code: CODE_SUCCESS, 
                msg: '重置密码成功', 
                data: null
              })
            }
          })
        } else {
          res.json({ 
            code: CODE_ERROR, 
            msg: '新密码不能为空', 
            data: null 
          })
        }
      } else {
        res.json({ 
          code: CODE_ERROR, 
          msg: '用户名或旧密码错误', 
          data: null 
        })
      }
    })
   
  }
}

// 校验用户名和密码
function validateUser(username, oldPassword) {
	const query = `select id, username from user where username='${username}' and password='${oldPassword}'`;
  	return queryOne(query);
}

//更新用户信息
function updateUserInfo(req, res, next) {
  const err = validationResult(req);
  // 如果验证错误，empty不为空
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
    next(boom.badRequest(msg));
  }else{
    let {id,username,nickname,avator,sex,address,phone} = req.body;
    findUser(id,0).then((data)=>{
      if(data){
            const query = `update user set username='${username}', nickname='${nickname}',avator='${avator}',sex='${sex}',address='${address}',phone='${phone}' where id='${id}'`
            querySql(query).then(data =>{
              if(!data && data.length === 0){
                res.json({
                    code: CODE_ERROR, 
                    msg: '更新数据失败', 
                    data: null 
                })
              }else{
                res.json({ 
                  code: CODE_SUCCESS, 
                  msg: '更新数据成功', 
                  data: null 
                })
              }
            })
      }else{
        res.json({
          code:CODE_ERROR,
          msg: '参数错误或数据不存在',
          data:null
        })
      }
    })
  }
}
//查询用户信息
function findUserInfo(req, res, next){
  const err = validationResult(req);
  // 如果验证错误，empty不为空
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
    next(boom.badRequest(msg));
  }else{
    let id = req.query.id
    findUser(id,0).then((data)=>{
      if(data && data.length !== 0){
        const {id,username,nickname,avator,sex,address,phone} = data;
        res.json({
          code: CODE_SUCCESS, 
          msg: '获取用户信息成功', 
          data: {id,username,nickname,avator,sex,address,phone} 
        })
      }else{
        res.json({
          code: CODE_ERROR, 
          msg: '获取用户信息失败', 
          data: null 
        })
      }
    })
  }
}

//发布商品
function postNews(req, res, next) {
  const err = validationResult(req);
  // 如果验证错误，empty不为空
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
    next(boom.badRequest(msg));
  }else{
    let {id,title,mainImage,article,articleType,recommand,price} = {...req.body};
    // console.log({id,title,mainImage,article,articleType,recommand,price});
    findUser(id,0).then((data)=>{
      if(!data || data.length === 0){
        res.json({
          code:CODE_ERROR,
          data:null,
          msg:'发布商品失败，该用户不存在'
        })
      }else{
        let addMenuQuery = 
        `insert into news(artist_id,title,main_image,article,article_type,recommand,price) values('${id}', '${title}', '${mainImage}', '${article}', '${articleType}', '${recommand}', '${price}')`;
        console.log(addMenuQuery);
        querySql(addMenuQuery)
        .then((data)=>{
          if(!data || data.length === 0){
            res.json({ 
              code: CODE_ERROR, 
              msg: '发布商品失败', 
              data:null
            })
          }else{
            res.json({ 
              code: CODE_SUCCESS, 
              msg: '发布商品成功', 
              data:null
            })
          }
        })
      }
    })
  }
}

//发布新闻
function postComments(req, res, next) {
  const err = validationResult(req);
  // 如果验证错误，empty不为空
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
    next(boom.badRequest(msg));
  }else{
    let {artist_id,content,shop_id,avator,userName} = {...req.body};
    findUser(artist_id,0).then((data)=>{
      if(!data || data.length === 0){
        res.json({
          code:CODE_ERROR,
          data:null,
          msg:'发布评论失败，该用户不存在'
        })
      }else{
        let addMenuQuery = 
        `insert into comments(artist_id,content,shop_id,avator,userName) values('${artist_id}', '${content}', '${shop_id}', '${avator}', '${userName}')`;
        console.log(addMenuQuery);
        querySql(addMenuQuery)
        .then((data)=>{
          if(!data || data.length === 0){
            res.json({ 
              code: CODE_ERROR, 
              msg: '发布评论失败', 
              data:null
            })
          }else{
            res.json({ 
              code: CODE_SUCCESS, 
              msg: '发布评论成功', 
              data:null
            })
          }
        })
      }
    })
  }
}

//获取已发布新闻
function getUserNews(req, res, next){
  const err = validationResult(req);
  // 如果验证错误，empty不为空
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
    next(boom.badRequest(msg));
  }else{
    let {id} = {...req.body};
    let query = `select * from news where artist_id = ${id}`;
    querySql(query).then(
      data => {
        res.json({
          code:CODE_SUCCESS,
          msg:'获取已发布新闻成功',
          data:data
        })
      }
    )
  }
}

//获取文件
function getFile(req, res, next){
  let form = new multiparty.Form();
  form.uploadDir="./assests/images";
  const err = validationResult(req);
  // 如果验证错误，empty不为空
  if (!err.isEmpty()) {
    // 获取错误信息
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
    next(boom.badRequest(msg));
  }else{
    form.parse(req,function(err,fields,files){  //其中fields表示你提交的表单数据对象，files表示你提交的文件对象
      // console.log(req);
      // console.log(files.file[0].path); 
      let path = 'http://localhost:8088/' + files.file[0].path.split('\\').join('/');
      if(err){
        res.json({
          status:"0",
          msg:"上传失败！"+err
        });
      }else{
        res.json({ 
          status:"1",
          msg:"上传成功！",
          path
        });
      }
    })  
  }
}

// 通过用户名和ID查询用户信息
function findUser(data,status) {
  let query = ''; 
  if(status == 1){//根据用户名查询数据
     query = `select id, username from user where username='${data}'`;
  }else{
     query = `select * from user where id='${data}'`;
  }
  return queryOne(query);
}

module.exports = {
  login,
  register,
  resetPwd,
  updateUserInfo,
  findUserInfo,
  postNews,
  getUserNews,
  getFile,
  postComments
}
