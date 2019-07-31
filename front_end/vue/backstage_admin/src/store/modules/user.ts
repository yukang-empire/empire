
import axios from '../../assets/api/axios';

const user =  {
    state: {
        domain01: "https://manage.technologyle.com",
        domain02: "https://shop.technologyle.com",
    },
    actions: {
        //获取用户列表
        user_list (state: any, data: any) {
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
    }
};

export default user;