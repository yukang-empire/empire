import Axios from 'axios';

//创建自定义的axios实例
const axios = Axios.create({
	//默认域名
	baseURL: 'https://shop.technologyle.com',
	timeout: 5000
});

//发出请求前do something
axios.interceptors.request.use(
	config => {
		return config;
	},
	//如果请求失败
	error => {
		return Promise.reject(error);
	}
);

//请求收到响应后do something
axios.interceptors.response.use(
	response => {
		return response.data;
	},
	error => {
		return Promise.reject(error);
	}
);

export default axios;