import axios from "axios";

// 接口前缀
axios.defaults.baseURL = 'https://dianducs.mypep.cn/'; // 测试环境
// axios.defaults.baseURL="http://192.168.186.5:8085/mockjsdata/2/" // RAP-mock
// axios.defaults.baseURL = 'http://192.168.180.75:8080/jx_click/'; // 冲哥
// axios.defaults.baseURL = 'http://192.168.180.29:8080/jx_click/'; // 晓东哥
// axios.defaults.baseURL = 'http://192.168.180.24:8088/jx_click/'; // 思昌
axios.defaults.timeout = 50000;

//添加一个请求拦截器
axios.interceptors.request.use(
	(config)=>{
		//在请求发出之前进行一些操作

		return config 
	},function(err){
		return Promise.reject(error);
});

//添加一个响应拦截器
axios.interceptors.response.use(
	(res)=>{
		//在这里对返回的数据进行处理
		if(res.data.errcode==95||res.data.errcode==96){
			localStorage.setItem("access_token", '')
			localStorage.setItem("user_id", '')
			localStorage.setItem("name", '')
			alert("登录失效，请重新登录！")
			window.location.href="#/login"
		}
			return res;
	},(err)=>{
			return Promise.reject(error);
})