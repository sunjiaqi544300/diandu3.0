<template>
	<div class="login_top">
 			<i class="but_i fl icon iconfont icon-fanhui" @click="go_hostroy"></i>
 			<p class="title">{{TITLE}}</p>
 			<i class="but_i fr icon iconfont icon-home"></i>
 		</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: ['TITLE'],
		methods: {
			//返回上一步
	  	go_hostroy() {
	  		this.$router.go(-1);
	  	}
		}
	}
</script>

<style>
/*login头部返回、home*/
.login_top{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 40px;
	background: #fff;
	text-align: center;
	font-size: 16px;
	z-index: 10;
}
.login_top .title{
	height: 40px;
	line-height: 40px;
	overflow: hidden;
	font-weight: bold;
}
.login_top .but_i{
	position: absolute;
	top: 10px;
	font-size: 20px;
	color: #2B61C0;
}
.login_top .but_i.fl{
	left: 10px;
}
.login_top .but_i.fr{
	right: 10px;
}
</style>