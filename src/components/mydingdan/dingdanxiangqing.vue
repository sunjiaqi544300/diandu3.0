<template>
	<div class="dingdanxiangqing">
		<header-top TITLE="订单详情"></header-top>
		<!--<mydingdan v-bind:myobject="myobject"></mydingdan>-->
	</div>
</template>

<script>
	import headerTop from '../common/header'
	import axios from 'axios'
	import qs from 'qs'
	export default {
		data (){
			return {
				id:this.$router.query.id,
				user_id:this.$router.query.user_id,
				myobject: {}
			}
		},
		created() {
			let data={
					access_token:sessionStorage.getItem("access_token"),
					id: this.id
		 		}
			console.log(this.id)
			console.log(this.user_id)
		 		axios.post('order/ak/pep_click/user/'+this.user_id+'/detail.json',qs.stringify(data)).then(
		 			(res) => {
		 				console.log(res)
		 				this.myobject = res.data.result;
		 			}
		 		)
		},
		components :{
			headerTop
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
</style>