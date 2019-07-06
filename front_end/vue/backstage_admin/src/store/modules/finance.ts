
import axios from '../../assets/api/axios';

const home =  {
    state: {
        domain01: "https://manage.technologyle.com",
        domain02: "https://shop.technologyle.com",
    },
    actions: {
        //提现列表
        cash_out_list (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("p", data.p);
            send_data.append("size", data.size);
            send_data.append("search", data.search);
            send_data.append("start_time", data.start_time);
            send_data.append("end_time", data.end_time);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //充值统计列表
        finance_recharge_list (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("p", data.p);
            send_data.append("size", data.size);
            send_data.append("search", data.search);
            send_data.append("start_time", data.start_time);
            send_data.append("end_time", data.end_time);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //充值统计列表明细
        finance_recharge_details (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("p", data.p);
            send_data.append("size", data.size);
            send_data.append("search", data.search);
            send_data.append("start_time", data.start_time);
            send_data.append("end_time", data.end_time);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //服务订单列表
        finance_service_list (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("p", data.p);
            send_data.append("size", data.size);
            send_data.append("search", data.search);
            send_data.append("start_time", data.start_time);
            send_data.append("end_time", data.end_time);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //服务订单列表明细
        finance_service_details (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("p", data.p);
            send_data.append("size", data.size);
            send_data.append("search", data.search);
            send_data.append("start_time", data.start_time);
            send_data.append("end_time", data.end_time);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //通用设置充值列表
        finance_set_recharge (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("p", data.p);
            send_data.append("size", data.size);
            send_data.append("search", data.search);
            send_data.append("start_time", data.start_time);
            send_data.append("end_time", data.end_time);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //通用设置会籍卡列表
        finance_set_card (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("p", data.p);
            send_data.append("size", data.size);
            send_data.append("search", data.search);
            send_data.append("start_time", data.start_time);
            send_data.append("end_time", data.end_time);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //设置提现规则
        set_cash_out_rule (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("p", data.p);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "", send_data).then( (res: any) => {
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

export default home;