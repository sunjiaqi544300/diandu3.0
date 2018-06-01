import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Login from "./components/login/login"
import Zhuce from "./components/zhuce/zhuce"
import Home from "./components/home/home"
import V404 from "./components/404/404"
import Xieyi from "./components/xieyi/xieyi"
import Dingdan from "./components/mydingdan/mydingdan"
import Dingdanxiangqing from "./components/mydingdan/dingdanxiangqing"
import axiosConfig from '../static/js/axiosConfig.js'

//import router from './router.js'  废弃了
Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
	{
		path:'*',
		component:V404
	},
	{
		path:'/',
		component:Login
	},
	{
		path:'/Login',
		component: Login
	},
	{
		path:'/Zhuce',
		component: Zhuce
	},
	{
		path:'/Home/Xieyi',
		component: Xieyi
	},
	{
		path:'/Home',
		component: Home,
	},
	{
		path:'/Dingdan',
		component: Dingdan
	},
	{
		path:'/mydingdan/dingdanxiangqing',
		component: Dingdanxiangqing
	}
];

const router = new VueRouter({
//	mode: 'hostory',
	routes:routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
