//所有的数据请求都走这里 方便维护
import axios from '../../assets/api/axios';

const https = {
    state: {
        domain01: "https://manage.technologyle.com",
        domain02: "https://shop.technologyle.com",
    },
    mutations: {
        
    },
    actions: {
        //登录
        login (state, data: any) {
            var send_data = JSON.stringify(data);
            //这里看不懂的可以查看vuex官网说明 https://vuex.vuejs.org/zh/guide/actions.html
            return new Promise((resolve, reject) => {
                axios.post("/api/login", send_data).then( (res: any) => {
                    if (res.code == 0) {
                        //临时存到sessionStorage里
                        sessionStorage.setItem("token", res.data.token);
                        sessionStorage.setItem("role", res.data.roles[0].RoleId);
                        sessionStorage.setItem("role_name", res.data.roles[0].RoleName);
                    };
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取首页数据
        home_data (state) {
            return new Promise((resolve, reject) => {
                axios.post("/api/statistical").then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取user_list列表数据
        user_list (state, { commit }: any, data: object) {
            var send_data = JSON.stringify(data);
            return new Promise((resolve, reject) => {
                axios.post("/api/getUserList", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },

    }
};
export default https;