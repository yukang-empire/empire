
import axios from '../../assets/api/axios';
import { Message } from 'element-ui';

const arr_power = sessionStorage.getItem('Permission') ? sessionStorage.getItem('Permission').split(',') : [];

const user =  {
    state: {
        domain01: "https://manage.technologyle.com",
        domain02: "https://shop.technologyle.com",
    },
    actions: {
        //获取分润列表
        share_profit_list (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Bonus&a=admin_bonus_index", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //新增分润
        add_share_profit (state: any, data: any) {
            if (arr_power.includes('20052')) {
                var send_data: any = new FormData();
                send_data.append("phase", data.share_profit_num);
                send_data.append("grant_time", data.share_profit_time / 1000);
                send_data.append("total_money", data.share_profit_price);
                send_data.append("token", sessionStorage.getItem('token'));
                return new Promise((resolve, reject) => {
                    axios.post( state.state.domain02 + "/index.php?m=Api&c=Bonus&a=add_phase", send_data).then( (res: any) => {
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
        //分红
        to_bonus (state: any, data: any) {
            if (arr_power.includes('20052')) {
                var send_data: any = new FormData();
                send_data.append("id", data.id);
                send_data.append("total_money", data.total_money);
                send_data.append("token", sessionStorage.getItem('token'));
                return new Promise((resolve, reject) => {
                    axios.post( state.state.domain02 + "/index.php?m=Api&c=Bonus&a=give_bonus", send_data).then( (res: any) => {
                        //返回数据给调起dispatch的那边
                        resolve(res);
                    }).catch( error => {
                        //返回error给调起dispatch的那边
                        reject(error);
                    });
                });
            }else {
                Message({ message: '对不起！您没有分红权限！', type: 'error', duration: 2500 });
            };
        },
        //查看分红详情
        share_profit_details (state: any, data: any) {
            if (arr_power.includes('20051')) {
                var send_data: any = new FormData();
                send_data.append("id", data.id);
                send_data.append("token", sessionStorage.getItem('token'));
                return new Promise((resolve, reject) => {
                    axios.post( state.state.domain02 + "/index.php?m=Api&c=Bonus&a=admin_bonus_info", send_data).then( (res: any) => {
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
        }
    }
};

export default user;