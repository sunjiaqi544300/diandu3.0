<template>
 <div class="login">
 		<header-top TITLE="登录人教点读"></header-top>
 		<div class="login_conter">
 			<img class="touxiang" src="./boy0.jpg" alt="" />
	 		<div id="zhanghao" class="denglu">
	 			<i class="icon iconfont icon-zhanghao"></i><input type="text" placeholder="请输入注册手机号/用户名" v-model="username"/>
	 		</div>
	 		<div id="mima" class="denglu">
	 			<i class="icon iconfont icon-unie604"></i><input type="password" placeholder="请输入密码" v-model="password"/>
	 		</div>
	 		<div class="wjmm">
	 			<a>忘记密码</a>
	 		</div>
	 		<div class="but clear">
	 			<div class="but_dengl" @click="go_denglu">登录</div>
	 			<div class="but_zhuc" @click="go_Zhuce">注册</div>
	 		</div>
 		</div>
 		
 		<div class="login_san" style="display: block">
        <!--第三方登录文本-->
        <div class="login_third">
            <div class="login_text">
              	  第三方平台登录
            </div>
        </div>
        <!--第三方登录图标-->
        <div class="login_icon">
            <div id="btn_qq" class="login_qq" @click="qqwxLogin('QQ')"></div>
            <div id="btn_weixin" class="login_weixin" @click="qqwxLogin('WeiXin')"></div>
        </div>
    </div>
    
    <!--提示-->
 		<ceng v-if="error_TF"></ceng>
 		<tishi v-if="error_TF" :SHITI_prop="{error_shit: error_shit, error_TF: error_TF}" v-on:listenToChildEvent="showSHITI_prop"></tishi>
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
	data(){
		return {
			username: '',  		//用户名
			password: '',			//密码
			error_shit: '',   //错误信息
			error_TF: false		//错误控制
		}
	},
  methods: {
  	go_denglu() {
  		var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
  		if(this.username == '' || this.password == ''){
  			this.error_TF = true;
				this.error_shit = '请输入用户名或密码，不能为空';
  		}else{
  			if(!reg.test(this.username)){
	  			this.error_TF = true;
					this.error_shit = '手机号输入有误';
	  		}
  			let data ={
  				dev_id : '123456',
  				dev_name : 'meizu',
  				pwd : this.password,
  				username : this.username
  			}
  			axios.post('user/ak/pep_click/login.anys',qs.stringify(data)).then(
  				(res) => {
  					console.log(res);
  					if (res.data.errcode == 110) {
  						//存储access_token
  						sessionStorage.setItem("access_token", res.data.access_token);
  						setCookie(this.username,this.password,10);
  						this.$router.push({
  							path:'/home',
  							query: {
  								user_id: res.data.user_info.user_id
  							}
  						});
  						
  					}else{
  						this.error_TF = true;
							this.error_shit = res.data.errmsg;
  					}
  				}
  			)
  		}
  	},
  	go_Zhuce() {
			this.$router.push({path:'/Zhuce'});
  	},
  	qqwxLogin(e) {
  		if(e==='QQ'){
  			
  		}
  		else if(e==='WeiXin'){
  			
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


<style>
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
.wjmm{
	float: right;
	margin: 6px 20px;
}
.wjmm a{
	font-size: 18px;
	color: #22d37a;
	cursor: pointer;
}
.but{
	margin-top: 60px;
}
.but div{
	display: block;
	margin: 20px auto;
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
	background: #feaf5f;
}
/*第三方登录*/
.login_third {
  border-top: 1px solid #2a2a2a;
  margin-top: 40px;
  position: relative;
}
.login_third .login_text {
    position: absolute;
    padding: 0 10px;
    font-size: 0.28rem;
    background-color: #f4f4f4;
    color: #2a2a2a;
    left: 50%;
    transform: translate(-50%, -50%);
}
.login_icon {
    text-align: center;
    margin-top: 0.34rem;
}
.login_icon > div {
    width: 1.05rem;
    height: 1.05rem;
    display: inline-block;
}
.login_icon .login_qq {
    background: url(https://rjddw.mypep.cn/tina/static/app/login_qq.png) no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-right: 1.26rem;
}
.login_icon .login_weixin {
    background: url(https://rjddw.mypep.cn/tina/static/app/login_weixin.png) no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
}
</style>