
import axios from '../../assets/api/axios';
import { Message } from 'element-ui';

const arr_power = sessionStorage.getItem('Permission') ? sessionStorage.getItem('Permission').split(',') : [];

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
                axios.post( "/role/getRoleList", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //角色权限清单
        getPermissions (state: any, data: any) {
            var send_data = JSON.stringify(data);
            return new Promise((resolve, reject) => {
                axios.post( "/role/getPermissions", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //添加权限
        add_power (state: any, data: any) {
            var send_data = JSON.stringify(data);
            return new Promise((resolve, reject) => {
                axios.post( "/role/addPermissions", send_data).then( (res: any) => {
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
            if (arr_power.includes('20042')) {
                var send_data_before = {};
                send_data_before.username = data.username;
                send_data_before.password = data.password;
                send_data_before.roleID = data.roleID;
                send_data_before.workid = data.workid;
                send_data_before.phone = data.phone;
                send_data_before.head = data.head;
                send_data_before.content = data.staff_content;
                var send_data = JSON.stringify(send_data_before);
                return new Promise((resolve, reject) => {
                    axios.post( "/api/addUser", send_data).then( (res: any) => {
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
        //编辑员工
        edit_staff (state: any, data: any) {
            if (arr_power.includes('20043')) {
                var send_data_before = {};
                send_data_before.username = data.username;
                send_data_before.password = data.password;
                send_data_before.roleID = data.roleID;
                send_data_before.workid = data.workid;
                send_data_before.phone = data.phone;
                send_data_before.head = data.head;
                send_data_before.content = data.staff_content;
                var send_data = JSON.stringify(send_data_before);
                return new Promise((resolve, reject) => {
                    axios.post( "/api/editUser", send_data).then( (res: any) => {
                        //返回数据给调起dispatch的那边
                        resolve(res);
                    }).catch( error => {
                        //返回error给调起dispatch的那边
                        reject(error);
                    });
                });
            }else {
                Message({ message: '对不起！您没有编辑员工的权限！', type: 'error', duration: 2500 });
            };
        },
        //删除员工
        del_staff (state: any, data: any) {
            if (arr_power.includes('20044')) {
                var send_data = JSON.stringify(data);
                return new Promise((resolve, reject) => {
                    axios.post( "/api/delUser", send_data).then( (res: any) => {
                        //返回数据给调起dispatch的那边
                        resolve(res);
                    }).catch( error => {
                        //返回error给调起dispatch的那边
                        reject(error);
                    });
                });
            }else {
                Message({ message: '对不起！您没有删除员工的权限！', type: 'error', duration: 2500 });
            };
        },
        //禁用员工
        ban_staff (state: any, data: any) {
            if (arr_power.includes('20045')) {
                var send_data_before = {};
                send_data_before.username = data.username;
                send_data_before.password = data.password;
                send_data_before.roleID = data.roleID;
                send_data_before.workid = data.workid;
                send_data_before.phone = data.phone;
                send_data_before.head = data.head;
                send_data_before.content = data.staff_content;
                var send_data = JSON.stringify(send_data_before);
                return new Promise((resolve, reject) => {
                    axios.post( "", send_data).then( (res: any) => {
                        //返回数据给调起dispatch的那边
                        resolve(res);
                    }).catch( error => {
                        //返回error给调起dispatch的那边
                        reject(error);
                    });
                });
            }else {
                Message({ message: '对不起！您没有禁用员工的权限！', type: 'error', duration: 2500 });
            };
        },
        //新增角色
        add_role (state: any, data: any) {
            if (arr_power.includes('20038')) {
                var send_data_before = {};
                send_data_before.RoleName = data.RoleName;
                send_data_before.Permission = data.Permission;
                send_data_before.DbPermission = data.DbPermission;
                send_data_before.note = data.note;
                var send_data = JSON.stringify(send_data_before);
                return new Promise((resolve, reject) => {
                    axios.post( "/role/addRole", send_data).then( (res: any) => {
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
        //修改角色
        revise_role () {
            if (arr_power.includes('20039')) {
                var send_data_before = {};
                send_data_before.RoleName = data.RoleName;
                send_data_before.Permission = data.Permission;
                send_data_before.DbPermission = data.DbPermission;
                send_data_before.note = data.note;
                var send_data = JSON.stringify(send_data_before);
                return new Promise((resolve, reject) => {
                    axios.post( "/role/editRole", send_data).then( (res: any) => {
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
        //删除角色
        del_role (state: any, data: any) {
            if (arr_power.includes('20040')) {
                var send_data = JSON.stringify(data);
                return new Promise((resolve, reject) => {
                    axios.post( "/role/delRole", send_data).then( (res: any) => {
                        //返回数据给调起dispatch的那边
                        resolve(res);
                    }).catch( error => {
                        //返回error给调起dispatch的那边
                        reject(error);
                    });
                });
            }else {
                Message({ message: '对不起！您没有删除此内容的权限！', type: 'error', duration: 2500 });
            };
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
            if (arr_power.includes('20046')) {
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
            }else {
                Message({ message: '对不起！您没有修改员工密码的权限！', type: 'error', duration: 2500 });
            };
        },
    }
};

export default home;