
import Fly from 'flyio/dist/npm/wx';
const fly = new Fly();
//默认域名
const domain = "https://shop.technologyle.com"
fly.config.baseURL = domain;

//添加请求拦截器
// fly.interceptors.request.use((request) => {
// 	wx.showLoading({
// 	  title: "加载中",
// 	  mask:true
// 	});
// 	console.log(request);
// 	// request.headers["X-Tag"] = "flyio";
// 	// request.headers['content-type']= 'application/json';
// 	request.headers = {
// 	  "X-Tag": "flyio",
// 	  'content-type': 'application/json'
// 	};
  
// 	let authParams = {
		
// 	};
  
// 	request.body && Object.keys(request.body).forEach((val) => {
// 	  if(request.body[val] === ""){
// 		delete request.body[val]
// 	  };
// 	});

// 	request.body = {
// 	  ...request.body,
// 	  ...authParams
// 	}
// 	return request;
// });

//添加响应拦截器
// fly.interceptors.response.use(
// 	(response) => {
// 		wx.hideLoading();
// 		return response.data;//请求成功之后将返回值返回
// 	},
// 	(err) => {
// 		//请求出错，根据返回状态码判断出错原因
// 		console.log(err);
// 		wx.hideLoading();
// 		if(err){
// 			return "请求失败";
// 		};
// 	}
// );

export default fly;