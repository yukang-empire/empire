
import axios from '../../assets/api/axios';
import { Message } from 'element-ui';

const arr_power = sessionStorage.getItem('Permission') ? sessionStorage.getItem('Permission').split(',') : [];

const home =  {
    state: {
        domain01: "https://manage.technologyle.com",
        domain02: "https://shop.technologyle.com",
    },
    actions: {
        //优惠券列表
        coupon_list (state: any, data: any) {
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
        //新增优惠券
        add_coupon (state: any, data: any) {
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