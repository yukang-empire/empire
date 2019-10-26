
import axios from '../../assets/api/axios';

const goods = {
	state: {
		
	},
	actions: {
		//获取商品详情
		get_goods_details (state: any, data: any) {
			var http_data: any = new FormData();
            http_data.append("goods_id", data.goods_id);
            http_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post("/index.php?m=Api&c=Shop&a=shop_goods_info", http_data).then((res: any) => {
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

export default goods;