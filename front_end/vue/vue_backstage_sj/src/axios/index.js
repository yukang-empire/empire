import Axios from 'axios';
import { Message } from 'element-ui';
import router from "../routers/index.js";


// //创建自定义的axios实例
const diy_axios = Axios.create({
    baseURL: 'https://shop.technologyle.com',
    timeout: 5000
});

//发出请求之前做一些事情
diy_axios.interceptors.request.use(
    config => {
        if (sessionStorage.getItem('token')) {
            config.headers['token'] = sessionStorage.getItem('token');
        };
        return config;
    },
    //如果请求失败
    error => {
        return Promise.reject(error);
    }
);

//请求收到响应后做一些事情
diy_axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        //如果授权过期 则跳转回登录页
        // if (error.response.data.code == 401) {
        //     router.push({ path: '/login' });
        //     Message({
        //         message: '授权过期,请重新登录！',
        //         type: 'error',
        //         duration: 3 * 1000
        //     });
        // };
        return Promise.reject(error);
    }
);

export default diy_axios;
// export default Axios;