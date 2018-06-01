<template>
  <div id="app">
   <!--	<router-link to="/login">确认</router-link>-->
   	<router-view keep-alive></router-view>
  </div>
</template>
<script>
	import main from './main.js'
	var fun = function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;

            //这里是假设在640px宽度设计稿的情况下，1rem = 20px；
            //可以根据实际需要修改
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
	}
	fun(document, window);
	
	export default {
	}
</script>

<style>
	@import "../static/css/common.css";
	@import "../static/fonts/iconfont.css";
</style>
