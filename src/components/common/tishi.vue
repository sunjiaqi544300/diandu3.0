<template>
	<!--提示-->
	<div class="tishi">
		<div class="name">提醒</div>
		<div class="title">{{SHITI_prop.error_shit}}</div>
		<div class="btn" @click="go_qeuding">确认</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props: ['SHITI_prop'],
		methods: {
			//确认提示信息
			go_qeuding() {
				let data = {
					error_shit : '',
					error_TF: false
				}
				this.$emit('listenToChildEvent',data);
			}
		},
		computed: {
			
		}
	}
</script>

<style scoped>
.tishi{
	position: fixed;
	left: 0;
	bottom: 0;
	padding: 20px;
	z-index: 3;
	background: #fff;
	font-size: 0;
	width: 100%;
	text-align: center;
	box-sizing: border-box;
}
.tishi .name{
  padding: 10px 0px;
  padding-bottom: 15px;
  font-size: 16px;
  color: #22d37a;
}
.tishi .title{
	text-align: left;
  padding: 10px;
  padding-bottom: 35px;
  line-height: 25px;
  font-size: 14px;
}
.tishi .btn{
	height: 40px;
	line-height: 40px;
	background: #22d37a;
	border-radius: 3px;
	font-size: 16px;
	color: #fff;
}
</style>