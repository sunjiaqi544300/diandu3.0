<template>
	<!--用户中心-->
	<div class="yhzx">
		<header-top TITLE="用户中心"></header-top>
		<!--用户头像-->
		<div class="yh_tx">
			<img v-if="this.user.head_image" :src="this.user.head_image" alt="" />
			<img v-else src="../../../static/images/boy0.jpg" alt="" />
			<h2 v-if="this.user.name">{{user.name}}</h2>
			<h2 v-else>{{user.mobile}}</h2>
		</div>
		<!--yhlist  用户菜单项-->
		<ul class="yhlist">
			<li class="list" @click="mydingdan"><span class="name"><i class="icon iconfont icon-dingdan"></i>我的订单</span><i class="jiantou">&gt;</i></li>
			<li class="list"><span class="name"><i class="icon iconfont icon-gerenxinxi"></i>个人信息(测试环境)</span><i class="jiantou">设置年级、教材版本&gt;</i></li>
			<li class="list"><span class="name"><i class="icon iconfont icon-wodemimaanquanma"></i>账户安全</span><i class="jiantou">&gt;</i></li>
			<li class="list"><span class="name"><i class="icon iconfont icon-fankui"></i>我的反馈</span><i class="jiantou">&gt;</i></li>
			<li class="list"><span class="name"><i class="icon iconfont icon-shouji"></i>设备管理</span><i class="jiantou">&gt;</i></li>
			<li class="list"><span class="name"><i class="icon iconfont icon-jihuoma"></i>激活码兑换</span><i class="jiantou">&gt;</i></li>
			<li class="list"><span class="name"><i class="icon iconfont icon-lianxi"></i>联系我们</span><i class="jiantou">&gt;</i></li>
		</ul>
		<!--退出登录-->
		<div class="tuiCDL">
			<span class="tuiCDL_btn" @click="tuiCDL_btn">退出登录</span>
		</div>
		
	</div>
</template>

<script>
	import {setCookie,getCookie,delCookie} from '../../../static/js/cookie.js'
	import axios from 'axios'
	import headerTop from '../common/header'
	import qs from 'qs'
	export default {
		data() {
			return {
				access_token: sessionStorage.getItem("access_token"),
				user_id: this.$route.query.user_id,
				user:''   //用户信息对象
			}
		},
		created(){
			//获取用户信息
			axios.post('user/ak/pep_click/user/'+this.user_id+'/userinfo.json',qs.stringify(
				{access_token: this.access_token}
			)).then(
				(res) => {
					if (res.data.errcode == 110) {
						this.user = res.data.user;
//						console.log(res)
					}
				}
			)
		},
		methods: {
			mydingdan() {
				console.log(this.user_id);
				this.$router.push({path:'Dingdan',query: {
  								user_id: this.user_id
  							}})
			},
			tuiCDL_btn(){
				delCookie(this.user.mobile);
				this.$router.push({path:'/Login'})
			}
		},
		components :{
			headerTop
		}
	}
</script>

<style>

.yh_tx{
	height: 240px;
	text-align: center;
	background-image: linear-gradient(to bottom,#20D378 ,#42ced0);
}
.yh_tx img{
	margin-top: 60px;
	width: 100px;
	height: 100px;
}
.yh_tx h2{
	word-break: break-all;
  word-wrap: break-word;
  font-size: 20px;
  color: #fff;
}
.yhlist{
	
} 
.list{
	height: 55px;
	line-height: 55px;
	border-bottom: 1px solid #e3e3e3;
	font-size: 0;
}
.list .name{
	float: left;
	margin-left: 15px;
	font-size: 16px;
	color: #242424;
}
.list .name i{
	margin-right: 10px;
	color: #242424;
}
.list .jiantou{
	float: right;
	margin-right: 15px;
	font-size: 16px;
	color: #999;
}
.tuiCDL{
	margin: 10px;
	background: #fefefe;
}
.tuiCDL_btn {
	display: block;
	margin: 0 auto;
	text-align: center;
	width: 100%;
	padding: 8px;
	border: none;
	border-radius: 4px;
	box-sizing: border-box;
	background: #22d37a;
	color: #fff;
	font-size: 18px;
}
</style>