<template>
 <div class="login">
 		<header-top TITLE="用户注册"></header-top>
 		<div class="login_conter">
 			<img class="touxiang" src="./pep.png" alt="" />
	 		<div id="zhanghao" class="denglu">
	 			<i class="icon iconfont icon-zhanghao"></i><input type="text" placeholder="请输入注册手机号/用户名" v-model="newUsername"/>
	 		</div>
	 		<div id="mima" class="denglu">
	 			<i class="icon iconfont icon-unie604"></i><input type="password" placeholder="6-20位密码" v-model="newPassword"/>
	 		</div>
	 		<div id="yzm" class="denglu">
	 			<i class="icon iconfont icon-shoujiyanzhengma"></i><input type="text" placeholder="请输入验证码" v-model="newIphone_yzm"/>
	 			<span class="hqyzm" v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
	 			<span class="hqyzm" @click.stop="hqyzm($event)" v-if="!sendMsgDisabled">获取验证码</span>
	 		</div>
	 		<!--用户协议-->
	 		<div class="yhxy">
	 			<input type="checkbox" checked name="" id="" value="" /> 我已经看过并同意<router-link to='/Home/Xieyi' class="yhxieyi">《用户协议》</router-link>
	 		</div>
	 		<!--忘记密码-->
	 		<!--<div class="wjmm">
	 			<a>忘记密码</a>
	 		</div>-->
	 		<div class="but clear">
	 			<!--<div class="but_dengl">登录</div>-->
	 			<div class="but_zhuc" @click="register">注册</div>
	 		</div>
	 		<!--提示信息-->
	 		<div class="footer">
	 			<h2>收不到验证码？</h2>
	 			<p>1. 请核实您输入的手机号是否正确、是否欠费或者信号是否良好。</p>
	 			<p>2. 请检查您的手机拦截软件是否将该短信自动拦截（安全卫士、手机管家等）。</p>
	 		</div>
	 		<!--提示-->
	 		<ceng v-if="error_TF"></ceng>
	 		<tishi v-if="error_TF" :SHITI_prop="{error_shit: error_shit, error_TF: error_TF}" v-on:listenToChildEvent="showSHITI_prop"></tishi>
 		</div>
 </div>
</template>

<script>
	import {setCookie,getCookie} from '../../../static/js/cookie.js'
	import tishi from '../common/tishi'
	import ceng from '../common/ceng'
	import headerTop from '../common/header'
	import axios from 'axios'
	import qs from 'qs'
export default {
	data() {
		return {
			time: 60,   //发送验证码倒计时
			sendMsgDisabled: false,
			username:'',  		//用户名
			password:'',			//密码
			newUsername: '',		//注册用户名
			newPassword: '',		//注册密码
			newIphone_yzm: '',	//手机号验证码
			Iphone: '',					//手机号
			error_shit: '',     //错误信息
			error_TF: false,		//错误控制
			user_key :''        //安全码
		}
	},
	created(){
		//获取安全码
		axios.post('user/user_key.anys').then(
	  			(ee) => {
//	  				console.log(ee.data);
						this.user_key = ee.data.user_key
	  			}
  			)
	},
	methods: {
		//注册
		register (){
			let _this=this;
			if(this.newUsername == "" || this.newPassword == "" || this.newIphone_yzm == ""){
				this.error_TF = true;
				this.error_shit = '请输入用户名或密码';
			}else{
				let data = {
					username: this.newUsername,
					pwd: this.newPassword,
					captcha: this.newIphone_yzm
				}
				console.log(data);
				axios.post('user/reg.anys',qs.stringify(data)).then(
					function(res){
						console.log(res);
						if(res.data.errcode == 110){
							setCookie(_this.newUsername,_this.newPassword,10);
							_this.$router.push({path:'/home'});
						} else{
							_this.error_TF = true;
							_this.error_shit = res.data.errmsg;
							_this.newUsername = '';
							_this.newPassword = '';
							_this.newIphone_yzm= '';
						}
					}
				).catch(function (error){
					
				})
			}
		},
  	//获取验证码
  	hqyzm() {
  		let _this=this;
  		var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
  		if(_this.newUsername == ''){
  			this.error_TF = true;
				this.error_shit = '请输入手机号码';
  		} else if(reg.test(_this.newUsername)){
	  		_this.sendMsgDisabled = true;
	  		let interval = window.setInterval(() =>{
	  			if((_this.time--) <= 0){
	  				_this.time = 60;
	  				_this.sendMsgDisabled = false;
	  			}
	  		},1000)
				//获取手机验证码
				let data = {
					username : _this.newUsername,
					user_key : _this.user_key
				}
//				console.log(data)
				axios.post('user/reg/sendcaptcha.anys',qs.stringify(data)).
				then(
					(res) => {
//						console.log(res);
						
					}
				)
	  	}else{
	  		this.error_TF = true;
				this.error_shit = '手机号输入有误';
	  	}
  	},
  	//接收 --- 子组件给父组件传值 
  	showSHITI_prop(data) {
  		this.error_shit = data.error_shit;     //错误信息
			this.error_TF = data.error_TF;				//控制tishi组件的状态
  	}
  },
  components: {
  		ceng,
			tishi,
			headerTop
	}
}
</script>


<style scoped>
/*登录*/
.login_conter{
	margin-top: 40px;
	font-size: 0;
}
.touxiang{
	display: block;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	padding: 6px;
	margin: 10px auto;
}
.denglu{
	padding: 15px;
	background: #fff;
	border-top: 1px solid #ccc;
	position: relative;
}
.denglu:last-child{
	border-bottom:1px solid #ccc;
}
.denglu i{
	font-size: 18px;
}
.denglu input{
	margin: 0 15px;
	width: 80%;
	height: 20px;
	line-height: 20px;
	font-size: 16px;
	border: none;
	outline: none
}
.denglu .hqyzm{
	position: absolute;
	top: 10px;
	right: 20px;
	font-size: 14px;
	padding: 5px 10px;
	background: #feaf5f;
	color: #fff;
	border-radius: 2px;
}
/*用户协议*/
.yhxy{
	text-align: center;
	height: 50px;
	line-height: 50px;
	font-size: 16px;
}
.yhxieyi{
	color: #7CC677;
	text-decoration: none;
}
.wjmm{
	float: right;
	margin: 6px 20px;
}
.wjmm a{
	font-size: 18px;
	color: #22d37a;
	cursor: pointer;
}
.but div{
	display: block;
	margin: 0 auto 20px;
	width: 90%;
	height: 40px;
	line-height: 40px;
	font-size: 20px;
	text-align: center;
	border-radius: 5px;
	color: #fff;
}
.but_dengl{
	background: #22d37a;
}
.but_zhuc{
	background: #22d37a;
}
.footer{
	border-top: 1px solid #e5e5e5;
	border-bottom: 1px solid #e5e5e5;
	background: #fff;
}
.footer h2{
	font-size: 16px;
	height: 40px;
	line-height: 40px;
	border-bottom: 2px solid #e5e5e5;
}
.footer p{
	padding: 0 10px;
	line-height: 25px;
	font-size: 14px;
}
</style>