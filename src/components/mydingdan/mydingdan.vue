<template>
	<div class="yhdingdan">
		<header-top TITLE="用户订单"></header-top>
		<div class="tab" >
				<div class="tab-item" v-for="(tab,index) in items" :class="{'active':tab.show === true}" @click="all(tab,index)">{{tab.name}}</div>
			<!--<div class="tab-item active" @click="all">全部</div>
			<div class="tab-item" @click="unpaid">代付款</div>
			<div class="tab-item" @click="close">交易关闭</div>
			<div class="tab-item" @click="finish">交易完成</div>-->
		</div>
		<mydingdan v-bind:myobject="myobject"></mydingdan>
		<!--<router-view :mydingdan="this.userID" keep-alive></router-view>-->
	</div>
</template>

<script>
	import headerTop from '../common/header'
	import mydingdan from '../mydingdan/dingdan'
	import axios from 'axios'
	import qs from 'qs'
	export default {
		data() {
			return {
				items:[
					{name: '全部',show: true},
					{name: '代付款',show: false},
					{name: '交易关闭',show: false},
					{name: '交易完成',show: false}
				],
				user_id: this.$route.query.user_id,
				myobject: {},
			}
		},
		created(){
			let data = {
				access_token: sessionStorage.getItem("access_token"),
				page_no: 1,
				page_size:20,
				type: 0
			}
			axios.post('order/ak/pep_click/user/'+this.user_id+'/list.json',qs.stringify(data)).then(
				(res) => {
//					console.log(res)
					if(res.data.errcode == 110){
						this.myobject = res.data.result
					}
				}
			)
		},
		methods: {
			//tab   切换 
			//type 0  全部
			//type 1  代付款
			//type 2  交易完成
			//type -1  交易关闭 
			all(t,i){	
				this.items[0].show = false;
				this.items[1].show = false;
				this.items[2].show = false;
				this.items[3].show = false;
				t.show = true;
				//全部
				if(i==0){
					axios.post('order/ak/pep_click/user/'+this.user_id+'/list.json',qs.stringify({
						access_token: sessionStorage.getItem("access_token"),
						page_no: 1,
						page_size:10,
						type: 0
					})).then(
						(res) => {
							if(res.data.errcode == 110){
								this.myobject = res.data.result
							}
						}
					)
				}
				//代支付
				else if(i==1){
					axios.post('order/ak/pep_click/user/'+this.user_id+'/list.json',qs.stringify({
						access_token: sessionStorage.getItem("access_token"),
						page_no: 1,
						page_size:10,
						type: 1
					})).then(
						(res) => {
							if(res.data.errcode == 110){
								this.myobject = res.data.result
							}
						}
					)
				}
				//交易关闭
				else if(i==2){
					axios.post('order/ak/pep_click/user/'+this.user_id+'/list.json',qs.stringify({
						access_token: sessionStorage.getItem("access_token"),
						page_no: 1,
						page_size:10,
						type: 2
					})).then(
						(res) => {
							if(res.data.errcode == 110){
								this.myobject = res.data.result
							}
						}
					)
				}
				//交易关闭
				else if(i==3){
					axios.post('order/ak/pep_click/user/'+this.user_id+'/list.json',qs.stringify({
						access_token: sessionStorage.getItem("access_token"),
						page_no: 1,
						page_size:10,
						type: -1
					})).then(
						(res) => {
							if(res.data.errcode == 110){
								this.myobject = res.data.result
							}
						}
					)
				}
			}
			//代付款
//			unpaid(){
//				let data = {
//					access_token: sessionStorage.getItem("access_token"),
//					page_no: 1,
//					page_size:10,
//					type: 1
//				}
//				this.active= 2
//				axios.post('order/ak/pep_click/user/'+this.user_id+'/list.json',qs.stringify(data)).then(
//					(res) => {
//						if(res.data.errcode == 110){
//							this.myobject = res.data.result
//						}
//					}
//				)
//			},
//			//交易关闭
//			close(){
//				let data = {
//					access_token: sessionStorage.getItem("access_token"),
//					page_no: 1,
//					page_size:10,
//					type: -1
//				}
//				this.active= 1;
//				axios.post('order/ak/pep_click/user/'+this.user_id+'/list.json',qs.stringify(data)).then(
//					(res) => {
//						if(res.data.errcode == 110){
//							this.myobject = res.data.result
//						}
//					}
//				)
//			},
//			//交易完成
//			finish(){
//				let data = {
//					access_token: sessionStorage.getItem("access_token"),
//					page_no: 1,
//					page_size:10,
//					type: 2
//				}
//				this.active= 4;
//				axios.post('order/ak/pep_click/user/'+this.user_id+'/list.json',qs.stringify(data)).then(
//					(res) => {
//						if(res.data.errcode == 110){
//							this.myobject = res.data.result
//						}
//					}
//				)
//			}
		},
		components :{
			headerTop,
			mydingdan
		}
	}
</script>

<style>
	.tab{
		display: flex;
		margin-top: 40px;
		width: 100%;
		height: 40px;
		line-height: 40px;
		box-sizing: border-box;
		border-bottom: 1px solid grey;
		background: #c5c5c5;
		z-index: 10;
	}
	.tab-item{
		flex: 1;
		height: 40px;
		line-height: 40px;
	 	text-align: center;
	 	box-sizing: border-box;
	 	font-size: 14px;
		color: #333;
	}
	.active{
		color: #22d37a;
		border-bottom:  2px solid #22d37a;
	}
</style>