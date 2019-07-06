
import axios from '../../assets/api/axios';

const home =  {
    state: {
        domain01: "https://manage.technologyle.com",
        domain02: "https://shop.technologyle.com",
    },
    actions: {
        //获取商家列表
        business_list (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("p", data.p);
            send_data.append("size", data.size);
            send_data.append("search", data.search);
            send_data.append("start_time", data.start_time);
            send_data.append("end_time", data.end_time);
            send_data.append("token", sessionStorage.getItem('token'));
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
            send_data.append("token", sessionStorage.getItem('token'));
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
            send_data.append("token", sessionStorage.getItem('token'));
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
        //获取商家详情
        business_details (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("club_id", data.club_id);
            send_data.append("token", sessionStorage.getItem('token'));
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
        //获取门店详情
        store_details (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("club_id", data.club_id);
            send_data.append("token", sessionStorage.getItem('token'));
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
            send_data.append("token", sessionStorage.getItem('token'));
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
            send_data.append("club_name", data.club_name);
            send_data.append("province", data.province);
            send_data.append("city", data.city);
            send_data.append("area", data.area);
            send_data.append("street", data.street);
            send_data.append("address", data.address);
            send_data.append("lat", data.lat);
            send_data.append("lng", data.lng);
            send_data.append("tel", data.tel);
            send_data.append("open_time", data.open_time);
            send_data.append("close_time", data.close_time);
            send_data.append("club_facil", data.club_facil);
            var length = data.shop_image.length;
            for (var i = 0; i < length; i++) {
                send_data.append("shop_image[]", data.shop_image[i]);
            };
            send_data.append("content", data.content);
            send_data.append("token", sessionStorage.getItem('token'));
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
        //新增门店
        add_store (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("store_id", data.store_id02);
            send_data.append("realname", data.realname);
            send_data.append("mobile", data.mobile);
            send_data.append("password", data.password);
            send_data.append("club_name", data.club_name);
            send_data.append("province", data.province);
            send_data.append("city", data.city);
            send_data.append("area", data.area);
            send_data.append("street", data.street);
            send_data.append("address", data.address);
            send_data.append("lat", data.lat);
            send_data.append("lng", data.lng);
            send_data.append("tel", data.tel);
            send_data.append("open_time", data.open_time);
            send_data.append("close_time", data.close_time);
            send_data.append("club_facil", data.club_facil);
            var length = data.shop_image.length;
            for (var i = 0; i < length; i++) {
                send_data.append("shop_image[]", data.shop_image[i]);
            };
            send_data.append("content", data.content);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=add_over_club", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //编辑门店
        edit_store (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("realname", data.realname);
            send_data.append("mobile", data.mobile);
            send_data.append("club_name", data.club_name);
            send_data.append("province", data.province);
            send_data.append("city", data.city);
            send_data.append("area", data.area);
            send_data.append("street", data.street);
            send_data.append("address", data.address);
            send_data.append("lat", data.lat);
            send_data.append("lng", data.lng);
            send_data.append("tel", data.tel);
            send_data.append("open_time", data.open_time);
            send_data.append("close_time", data.close_time);
            send_data.append("club_facil", data.club_facil);
            var length01 = data.shop_image.length;
            for (var i = 0; i < length01; i++) {
                send_data.append("shop_image[]", data.shop_image[i]);
            };
            var length02 = data.shop_images.length;
            for (var i = 0; i < length02; i++) {
                send_data.append("shop_images[]", data.shop_images[i]);
            };
            send_data.append("content", data.content);
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
        //新增商品
        add_goods (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("goods_name", data.goods_name);
            send_data.append("store_id", data.store_id);
            send_data.append("shop_price", data.shop_price);
            send_data.append("cost_price", data.cost_price);
            send_data.append("card_info", data.card_info);
            send_data.append("card_type", data.card_type);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=admin_add_club", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //编辑商品
        edit_goods (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("goods_id", data.goods_id);
            send_data.append("goods_name", data.goods_name);
            send_data.append("store_id", data.store_id);
            send_data.append("shop_price", data.shop_price);
            send_data.append("cost_price", data.cost_price);
            send_data.append("card_info", data.card_info);
            send_data.append("card_type", data.card_type);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=admin_up_goods", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取所有商家
        get_all_business (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.get( state.state.domain02 + "/index.php?m=Api&c=Club&a=search_admin_club", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取所有门店
        get_all_store (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.get( state.state.domain02 + "/index.php?m=Api&c=Club&a=search_club_list", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //获取所有附加服务
        get_service (state: any, data: any) {
            var send_data: any = new FormData();
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.get( state.state.domain02 + "/index.php?m=Api&c=User&a=club_facil", send_data).then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        },
        //禁用/开启门店
        change_state_store (state: any, data: any) {
            console.log(data)
            var send_data: any = new FormData();
            send_data.append("club_id", data.club_id);
            send_data.append("status", data.status);
            send_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post( state.state.domain02 + "/index.php?m=Api&c=Club&a=up_status", send_data).then( (res: any) => {
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