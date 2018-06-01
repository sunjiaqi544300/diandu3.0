/*export 把方法暴露出来*/
//设置cookie
export function setCookie(name,psd,expire){
	var date = new Date();
	date.setSeconds(date.getSeconds()+expire);
	document.cookie=name+"="+escape(psd)+"; expire="+ date.toGMTString();
	console.log(document.cookie);
}

//获取 cookie
export function getCookie(name){
	if (document.cookie.length>0){
		let star = document.cookie.indexOf(name + "=")
		if(star != -1){
			star = star + name.length+1
			let end = document.cookie.indexOf(";",sta)
			if(end == -1)
			return unescape(document.cookie.substring(star,end))
		}
	}
	return ''
}

//删除cookie
export function delCookie(name) {
	setCookie(name,'',-1)
}
