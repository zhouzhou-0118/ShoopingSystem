export default {
	SUCCESS: 1,
	NOLOGIN:1004,
	function:{
		login:'/api/user/login',//用户登录接口
        register:'/api/user/register',//用户注册接口
        resetPwd:'/api/user/resetPwd',//密码重置接口
        updateUserInfo:'/api/user/updateUserInfo',//用户更新数据接口
        findUserInfo:'/api/user/findUserInfo',//查询用户信息
        postMenu:'/api/user/postMenu',//发布商品
        getUserMenu:'/api/user/getUserMenu',//获取已发布/待审核菜谱

        searchMenu:'/api/menu/searchMenu',//商品搜索接口
        sortMenu:'/api/menu/sortMenu',//商品分类
        healthyMenu:'/api/menu/healthyMenu',//饮食健康
        getMenuById:'/api/menu/getMenuById',//商品详情
        getRecommendMenu:'/api/menu/getRecommendMenu',//热门推荐
	}
}