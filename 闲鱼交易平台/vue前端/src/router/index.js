import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import home from '@/pages/home'
import register from '@/pages/register'
import newsSort from '@/pages/newsSort'
import postNews from '@/pages/postNews'
import searchNews from '@/pages/searchNews'
import infoCenter from '@/pages/infoCenter'
import error from '@/pages/error'
import newsDetail from '@/pages/newsDetail'
Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta:{
        isCheck:true
      },
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{
        isCheck:false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta:{
        isCheck:false
      }
    },
    {
      path: '/newsSort',
      name: 'newsSort',
      component: newsSort,
      meta:{
        isCheck:true
      }
    },
    {
      path: '/newsDetail',
      name: 'newsDetail',
      component: newsDetail,
      meta:{
        isCheck:true
      }
    },
    {
      path: '/postNews',
      name: 'postNews',
      component: postNews,
      meta:{
        isCheck:true
      },
    },
    {
      path: '/searchNews',
      name: 'searchNews',
      component: searchNews,
      meta:{
        isCheck:true
      },
    },
    {
      path: '/infoCenter',
      name: 'infoCenter',
      component: infoCenter,
      meta:{
        isCheck:true
      },
    },
    {
      path:'*',
      component:error
    }
  ]
})

//to:跳转到的路由 from:从哪个路由离开  next:显示函数
router.beforeEach((to,from,next)=>{  
  if(to.meta.isCheck){
    if(!localStorage.testToken || localStorage.testToken == ''){
      alert("请先登录");
      next('/login');
      return
    }
    next();
  }
  next();
});

export default router;