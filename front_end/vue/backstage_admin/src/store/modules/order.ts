
import axios from '../../assets/api/axios';

const home =  {
    state: {
        domain01: "https://manage.technologyle.com",
        domain02: "https://shop.technologyle.com",
    },
    actions: {
        //获取服务订单列表
        service_list (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("p", data.p);
            send_data.append("size", data.size);
            send_data.append("search", data.search);
            send_data.append("start_time", data.start_time);
            send_data.append("end_time", data.end_time);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=card_order", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取服务订单列表详情
        service_details (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("card_id", data.card_id);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=card_order_info", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取转让订单列表
        transfer_list (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("p", data.p);
            send_data.append("size", data.size);
            send_data.append("search", data.search);
            send_data.append("start_time", data.start_time);
            send_data.append("end_time", data.end_time);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=card_out_order", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取转让订单列表详情
        transfer_details (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("out_id", data.out_id);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=card_out_info", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取领用订单列表
        receive_list (state: any, data: any) {
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
        //获取操作记录
        get_operation_log (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.get( state.state.domain02 + "", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //新增私家课
        add_course (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("out_id", data.out_id);
            send_data.append("club_id", data.club_id);
            send_data.append("tax_num", data.tax_num);
            send_data.append("price", data.price);
            send_data.append("cost_price", data.cost_price);
            send_data.append("tax_id", data.tax_id);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=up_club_tax", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //编辑私家课
        edit_course (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("out_id", data.out_id);
            send_data.append("club_id", data.club_id);
            send_data.append("tax_num", data.tax_num);
            send_data.append("price", data.price);
            send_data.append("cost_price", data.cost_price);
            send_data.append("tax_id", data.tax_id);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=up_club_tax", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //上架订单
        upper (state: any) {
            var send_data: any = new FormData();
            send_data.append("out_id", data.out_id);
            send_data.append("club_id", data.club_id);
            send_data.append("tax_num", data.tax_num);
            send_data.append("price", data.price);
            send_data.append("cost_price", data.cost_price);
            send_data.append("tax_id", data.tax_id);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=up_club_tax", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //审核转让订单
        check_transfer_order (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("out_id", data.out_id);
            send_data.append("status", data.status);
            send_data.append("price", data.price);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=upcard_status", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取所有健身房
        all_jsf (state: any) {
            var send_data: any = new FormData();
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=clubid_list", send_data).then( (res: any) => {
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