<template>
	<div class="dingdan" v-model="myobject" v-if="myobject._APP_RESULT_LIST.length>0">
		<div class="dd_list" v-for="item in myobject._APP_RESULT_LIST">
			<div class="dd_top">
				订单时间：{{item.s_create_time}}
				<span v-if="item.s_state==-1">交易完成</span>
				<span v-if="item.s_state==0">待支付</span>
				<span v-if="item.s_state==1">交易关闭</span>
			</div>
			<div class="dd_main clear" v-for="li in item.product_info" @click="dingdxq(item.order_id,item.user_id)">
				<div class="dd_fl">
					<img :src="li.cover_image"  />
				</div>
				<div class="dd_fz">
					<h2>{{li.name}}</h2>
					<h3>{{li.validity/30}}个月</h3>
					<span>{{li.service_type}}</span>
				</div>
				<div class="dd_fr">
					<p class="price">¥{{li.price}}</p>
					<p class="num">X{{li.num}}</p>
				</div>
			</div>
			<div class="dd_bottom">
				<span>共<b>{{item.product_info.length}}</b>件商品</span>
				<span>实付款：<b>{{item.pay_price}}</b></span>
				<span>(含运费<b>¥{{item.express_price}}</b>)</span>
			</div>
			<div v-if="item.s_state==1" class="shandingdan"><span>删除订单</span></div>
			<!--<div v-if="item.s_state==1" class="shandingdan"><span @click="del_dingd">删除订单</span></div>-->
			<div v-else-if="item.s_state==0" class="shandingdan"><span>立即支付</span><span>取消</span></div>
			<div class="dd_border"></div>
		</div>
	</div>
	<div v-else class="no_dd_list">没有订单奥</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	export default {
		data (){
			return {
			}
		},
		props: ['myobject'],
		created() {
			
		},
		computed: {

		},
		methods: {
		 	dingdxq(e,v){
		 		let ddxq_e = e;
		 		let ddxq_v = v;
		 		console.log(v)
		 		this.$router.push({
							path:'/mydingdan/dingdanxiangqing',
							query: {
								id: ddxq_v,
								user_id: ddxq_e
							}
					});
		 	}
		 }
	}
</script>

<style>
	.dd_list{
		position: relative;
	}
	.dd_top{
		position: relative;
    line-height: 40px;
    height: 40px;
    font-size: 16px;
    background: #fff;
    padding-left: 10px;
	}
	.dd_top span{
		float: right;
		margin-right: 10px;
		color: #c53336;
	}
	.dd_main{
		background: #f7f7f7;
		border-bottom: 1px solid #e5e5e5;
		display: flex;
		font-size: 0;
	}
	.dd_fl{
		order: -1;
		flex-basis: 100px;
	}
	.dd_fl img{
		margin: 10px;
		width: 80px;
		height: 100px;
	}
	.dd_fz{
		order: 0;
		flex-grow: 1;
	}
	.dd_fz h2{
		font-size: 16px;
		color: inherit;
	}
	.dd_fz h3{
		font-size: 14px;
		color: #999999;
		margin: 4px 0;
	}
	.dd_fz span{
		display: inline-block;
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		padding: 0 5px;
		background: #feaf5f;
		color: #fff;
	}
	.dd_fr{
		order: 1;
		flex-basis: 60px;
		text-align: right;
		margin-right: 10px;
	}
	.dd_fr .price{
		font-size: 14px;
		font-weight: 600;
		
	}
	.dd_fr .num{
		font-size: 14px;
	}
	.dd_bottom{
		padding: 10px;
		line-height: 20px;
		text-align: right;
		font-size: 0;
		background: #fff;
	}
	.dd_bottom span{
		font-size: 14px;
		padding: 0 5px;
		color: #242424;
	}
	.dd_bottom span b{
		color: #242424;
		font-weight: 600;
	}
	.shandingdan{
		padding: 7px 0;
		height: 26px;
		line-height: 26px;
		font-size: 0;
		background: #fff;
	}
	.shandingdan span{
		margin-right: 10px;
		padding: 0 10px;
		float: right;
		font-size: 14px;
		box-sizing: border-box;
		border-radius: 5px;
		border: 1px solid #ccc;
	}
	.dd_border{
		height: 10px;
		background-color: #f4f4f4;
	}
	.no_dd_list{
		text-align: center;
		font-size: 20px;
		padding: 0 100px;
	}
</style>