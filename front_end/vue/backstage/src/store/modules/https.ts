//所有的数据请求都走这里 方便维护
import axios from '../../assets/api/axios';

const https = {
    state: {
        domain01: "https://manage.technologyle.com",
        domain02: "https://shop.technologyle.com",
        //登录相关
        login: {
            token: '',
            role: '',
            role_name: ''
        }
    },
    mutations: {
        //临时储存后端返回的token,角色,角色名
        set_token: (state: any, token: string) => {
            state.login.token = token;
        },
        set_role: (state: any, role: string) => {
            state.login.role = role;
        },
        set_role_name: (state: any, role_name: string) => {
            state.login.role_name = role_name;
        },
    },
    actions: {
        //登录
        login ({ commit }: any, data: object) {
            var send_data = JSON.stringify(data);
            //这里看不懂的可以查看vuex官网说明 https://vuex.vuejs.org/zh/guide/actions.html
            return new Promise((resolve, reject) => {
                axios.post("/api/login", send_data).then( response => {
                    console.log("登录数据", response);
                    commit('set_token', response.data.token);
                    commit('set_role', response.data.roles[0].RoleId);
                    commit('set_role_name', response.data.roles[0].RoleName);
                    resolve(response);
                });
            });
        },

    }
};
export default https;