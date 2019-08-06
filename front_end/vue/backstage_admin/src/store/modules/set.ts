
import axios from '../../assets/api/axios';

const home =  {
    state: {
        domain01: "https://manage.technologyle.com",
        domain02: "https://shop.technologyle.com",
    },
    actions: {
        //角色列表
        role_list (state: any, data: any) {
            var send_data = JSON.stringify(data);
            return new Promise((resolve, reject) => {
                axios.post( "/api/getRoleList", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //员工列表
        staff_list (state: any, data: any) {
            var send_data = JSON.stringify(data);
            return new Promise((resolve, reject) => {
                axios.post( "/api/getUsers", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //新增员工
        add_staff (state: any, data: any) {
            data.content = data.staff_content;
            console.log(data);
            var send_data = JSON.stringify(data);
            return new Promise((resolve, reject) => {
                axios.post( "/api/addUser", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //日志列表
        log_list (state: any, data: any) {
            var send_data = JSON.stringify(data);
            return new Promise((resolve, reject) => {
                axios.post( "/api/getUserLog", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //修改密码
        change_password (state: any, data: any) {
            var send_data = JSON.stringify(data);
            return new Promise((resolve, reject) => {
                axios.post( "/api/getUserLog", send_data).then( (res: any) => {
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