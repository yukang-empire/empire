
import axios from '../../assets/api/axios';
import { Message } from 'element-ui';

const arr_power = sessionStorage.getItem('Permission') ? sessionStorage.getItem('Permission').split(',') : [];

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
            if (arr_power.includes('20022')) {
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
            }else {
                Message({ message: '对不起！您没有查看此内容的权限！', type: 'error', duration: 2500 });
            };
        },
        //获取转让订单列表
        transfer_list (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("p", data.p);
            send_data.append("size", data.size);
            send_data.append("search", data.search);
            send_data.append("start_time", data.start_time);
            send_data.append("end_time", data.end_time);
            send_data.append("order_status", data.order_status);
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
            if (arr_power.includes('20025')) {
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
            }else {
                Message({ message: '对不起！您没有查看此内容的权限！', type: 'error', duration: 2500 });
            };
        },
        //获取领用订单列表
        receive_list (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("p", data.p);
            send_data.append("size", data.size);
            send_data.append("search", data.search);
            send_data.append("start_time", data.start_time);
            send_data.append("end_time", data.end_time);
            send_data.append("order_status", data.order_status);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=admin_card_order", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取领用订单列表详情
        receive_details (state: any, data: any) {
            // if (arr_power.includes('20025')) {
            if (true) {
                var send_data: any = new FormData();
                send_data.append("order_id", data.order_id);
                send_data.append("token", sessionStorage.getItem('token'));
                return new Promise((resolve, reject) => {
                    axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=admin_card_order_info", send_data).then( (res: any) => {
                        //返回数据给调起dispatch的那边
                        resolve(res);
                    }).catch( error => {
                        //返回error给调起dispatch的那边
                        reject(error);
                    });
                });
            }else {
                Message({ message: '对不起！您没有查看此内容的权限！', type: 'error', duration: 2500 });
            };
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
            if (arr_power.includes('20028')) {
                var send_data: any = new FormData();
                send_data.append("out_id", data.out_id);
                send_data.append("club_id", data.club_id);
                send_data.append("tax_num", data.tax_num);
                send_data.append("price", data.price);
                send_data.append("cost_price", data.cost_price);
                send_data.append("tax_id", data.tax_id);
                send_data.append("note", data.note);
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
            }else {
              Message({ message: '对不起！您没有新增此内容的权限！', type: 'error', duration: 2500 });
            };
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
            send_data.append("note", data.note);
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
        //上架私教课
        upper_course (state: any, data: any) {
            if (arr_power.includes('20029')) {
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
            }else {
              Message({ message: '对不起！您没有上架此内容的权限！', type: 'error', duration: 2500 });
            };
        },
        //下架私教课
        down_course (state: any, data: any) {
            if (arr_power.includes('20030')) {
                var send_data: any = new FormData();
                send_data.append("id", data.id);
                send_data.append("is_sale", data.is_sale);
                send_data.append("token", sessionStorage.getItem('token'));
                return new Promise((resolve, reject) => {
                    axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=out_is_sale", send_data).then( (res: any) => {
                        //返回数据给调起dispatch的那边
                        resolve(res);
                    }).catch( error => {
                        //返回error给调起dispatch的那边
                        reject(error);
                    });
                });
            }else {
              Message({ message: '对不起！您没有上架此内容的权限！', type: 'error', duration: 2500 });
            };
        },
        //审核转让订单
        check_transfer_order (state: any, data: any) {
            if (arr_power.includes('20027')) {
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
            }else {
              Message({ message: '对不起！您没有审核此内容的权限！', type: 'error', duration: 2500 });
            };
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
        //修改健身卡信息
        edit_card (state: any, data: any) {
            if (arr_power.includes('20026')) {
                var send_data: any = new FormData();
                send_data.append("club_name", data.club_name);
                send_data.append("club_area", data.club_area);
                send_data.append("tel", data.tel);
                send_data.append("card_type", data.card_type);
                send_data.append("card_price", data.card_price);
                send_data.append("creat_time", data.creat_time);
                send_data.append("name", data.name);
                send_data.append("mobile", data.mobile);
                send_data.append("end_time", data.end_time);
                send_data.append("out_id", data.out_id);
                send_data.append("token", sessionStorage.getItem('token'));
                return new Promise((resolve, reject) => {
                    axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=up_card_info", send_data).then( (res: any) => {
                        //返回数据给调起dispatch的那边
                        resolve(res);
                    }).catch( error => {
                        //返回error给调起dispatch的那边
                        reject(error);
                    });
                });
            }else {
                Message({ message: '对不起！您没有修改此内容的权限！', type: 'error', duration: 2500 });
            };
        },
    }
};

export default home;