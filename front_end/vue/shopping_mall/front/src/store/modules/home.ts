
import axios from '../../assets/api/axios';

const home = {
	state: {
		
	},
	actions: {
		//获取首页数据
		get_home_data (state: any) {
            return new Promise((resolve, reject) => {
                axios.post("/index.php?m=Api&c=Shop&a=shop_index").then((res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
		},
		//获取区域商品
		get_area_data (state: any, data: any) {
			var http_data: any = new FormData();
            http_data.append("type", data.type);
            http_data.append("searcoriginal_imgh", data.searcoriginal_imgh);
            http_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post("/index.php?m=Api&c=Shop&a=shop_goods_list", http_data).then((res: any) => {
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

export default home;