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
        login (state: any, data: any) {
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
        home_data () {
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

        //获取用户列表
        user_list (state: any, data: any) {
            console.log(data);
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
        //禁用/开启用户账号
        change_state_user (state: any, data: any) {
            var send_data = JSON.stringify(data);
            return new Promise((resolve, reject) => {
                axios.post("/api/userLock", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取用户基本信息
        user_base_info (state: any, data: any) {
            var send_data = JSON.stringify(data);
            return new Promise((resolve, reject) => {
                axios.post("/api/getUser", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取用户订单记录
        user_order (state: any, data: any) {
            var send_data = JSON.stringify(data);
            return new Promise((resolve, reject) => {
                axios.post("/api/userRrder", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取用户充值记录
        user_recharge (state: any, data: any) {
            var send_data = JSON.stringify(data);
            return new Promise((resolve, reject) => {
                axios.post("/api/userRecharge", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取用户优惠券信息
        user_coupon (state: any, data: any) {
            var send_data = JSON.stringify(data);
            return new Promise((resolve, reject) => {
                axios.post("/api/userCoupon", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },

        //获取商家列表
        business_list (state: any, data: any) {
            //domain02接口需要这种数据
            var send_data: any = new FormData();
            send_data.append("p", data.p);
            send_data.append("size", data.size);
            send_data.append("search", data.search);
            send_data.append("start_time", data.start_time);
            send_data.append("end_time", data.end_time);
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=master_list", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取门店列表
        store_list (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("p", data.p);
            send_data.append("size", data.size);
            send_data.append("search", data.search);
            send_data.append("start_time", data.start_time);
            send_data.append("end_time", data.end_time);
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=club_lists", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取商品列表
        goods_list (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("p", data.p);
            send_data.append("size", data.size);
            send_data.append("search", data.search);
            send_data.append("start_time", data.start_time);
            send_data.append("end_time", data.end_time);
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=club_goods", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取商家详细信息
        business_details (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("club_id", data.club_id);
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=master_list_info", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取门店详细信息
        store_details (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("club_id", data.club_id);
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=club_lists_info", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取商品详情
        goods_details (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("goods_id", data.goods_id);
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=club_goods_info", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //新增商家
        add_business (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("realname", data.realname);
            send_data.append("mobile", data.mobile);
            send_data.append("password", data.password);
            send_data.append("image", data.image);
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=User&a=add_club", send_data).then( (res: any) => {
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