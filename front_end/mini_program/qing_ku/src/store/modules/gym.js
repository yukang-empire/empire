
import fly from '../../utils/flyio';

const gym =  {
    state: {
        domain01: "",
    },
    actions: {
		//登录
		login (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("https://api.technologyle.com/hthapi.php", data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		},
        //获取banner
        gym_banner (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=User&a=ad_app_map").then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		},
		//获取会所列表
        club_list (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=User&a=myNearClub", data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		},
		//搜索会所
		search_club (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=Club&a=search_club", data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		},
		//获取会所信息
		get_club_info (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=goods&a=clubinfo_app", data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		},
		//提交订单
		submit_order (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=Virtual&a=virtualInfo", data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		},
		//优惠券列表
		coupon_list (state, data) {
            return new Promise((resolve, reject) => {
                fly.get("/index.php?m=Api&c=Virtual&a=coupon_list" + data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		},
		//健身卡列表
		card_list (state, data) {
            return new Promise((resolve, reject) => {
                fly.get("/index.php?m=Api&c=Virtual&a=add_order" + data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		},
		//套餐下单
		add_order (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=Virtual&a=add_order", data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		},
		//提交订单签名
		order_sign (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=Wxpay&a=minappPay", data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		},
		//调起微信支付
		wx_pay (state, data) {
            return new Promise((resolve, reject) => {
                fly.get("https://shop.technologyle.com/index.php/Api/user1/minappPay?code=" + data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		}
    }
};

export default gym;