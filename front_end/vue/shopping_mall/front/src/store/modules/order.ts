
import axios from '../../assets/api/axios';

const order = {
	state: {
		
	},
	actions: {
		//获取商品详情
		get_order_details (state: any, data: any) {
			var http_data: any = new FormData();
            http_data.append("goods_id", data.goods_id);
            http_data.append("goods_num", data.goods_num);
            http_data.append("item_id", data.item_id);
            http_data.append("address_id", data.address_id);
            http_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post("/index.php?m=Api&c=Shop&a=cart", http_data).then((res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
		},
		//获取订单号
		get_order_num (state: any, data: any) {
			var http_data: any = new FormData();
            http_data.append("goods_id", data.goods_id);
            http_data.append("goods_num", data.goods_num);
            http_data.append("item_id", data.item_id);
            http_data.append("address_id", data.address_id);
            http_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post("/index.php?m=Api&c=Shop&a=add_order", http_data).then((res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
		},
		//获取所有订单
		get_all_orders (state: any, data: any) {
			var http_data: any = new FormData();
            http_data.append("type", data.type);
            http_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post("/index.php?m=Api&c=Order&a=getOrderList", http_data).then((res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
		},
		//确认收货
		sure_receive (state: any, data: any) {
			var http_data: any = new FormData();
            http_data.append("order_id", data.order_id);
            http_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post("/index.php?m=Api&c=Shop&a=order_confirm", http_data).then((res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
		},
		//确认收货
		cancel_order (state: any, data: any) {
			var http_data: any = new FormData();
            http_data.append("order_id", data.order_id);
            http_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post("/index.php?m=Api&c=Shop&a=order_del", http_data).then((res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
		},
	}
}

export default order;