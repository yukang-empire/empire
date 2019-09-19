
import fly from '../../utils/flyio';

const order =  {
    state: {
        domain01: "",
    },
    actions: {
		//获取转让订单
		transfer_order (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=Order&a=card_out_order", data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		},
		//获取服务订单
		service_order (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=Order&a=card_order", data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		},
		//取消订单
		cancel_order (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=user&a=payment_refund", data).then( (res) => {
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

export default order;