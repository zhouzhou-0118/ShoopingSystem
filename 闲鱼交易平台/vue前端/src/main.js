// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs';
import http from '../src/http/index.js'
import api from '@/api/index'
import VueCookies from 'vue-cookies'
import JwChat from 'jwchat';
Vue.use(JwChat)
Vue.use(VueCookies);
Vue.prototype.$cookie = VueCookies;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$http = http;
Vue.prototype.$api = api;
Vue.prototype.qs = qs;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
