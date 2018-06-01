<template>
	<div class="v404">
		<header-top TITLE="404"></header-top>
		<img src="./timg.jpg"/>
	</div>
</template>

<script>
	import headerTop from '../common/header'
	export default {
		data() {
			
		},
		mounted() {
			
		},
		components:{
			headerTop
		}
	}
</script>

<style>
	.v404{
		text-align: center;
	}
	.v404 img{
		margin-top: 40px;
		width: 100%;
	}
</style>