
import axios from '../../assets/api/axios';

const address = {
	state: {
		
	},
	actions: {
		//获取全部地址
		get_all_address (state: any, data: any) {
			var http_data: any = new FormData();
            http_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post("/index.php?m=Api&c=Shop&a=address_list", http_data).then((res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
		},
		//新增地址
		add_address (state: any, data: any) {
			var http_data: any = new FormData();
            http_data.append("province", data.province);
            http_data.append("city", data.city);
            http_data.append("district", data.district);
            http_data.append("address", data.address);
            http_data.append("consignee", data.consignee);
            http_data.append("mobile", data.mobile);
            http_data.append("is_default", data.is_default);
            http_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post("/index.php?m=Api&c=Shop&a=save_address", http_data).then((res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
		},
		//编辑地址
		edit_address (state: any, data: any) {
			var http_data: any = new FormData();
            http_data.append("province", data.province);
            http_data.append("city", data.city);
            http_data.append("district", data.district);
            http_data.append("address", data.address);
            http_data.append("consignee", data.consignee);
            http_data.append("mobile", data.mobile);
            http_data.append("is_default", data.is_default);
            http_data.append("address_id", data.address_id);
            http_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post("/index.php?m=Api&c=Shop&a=save_address", http_data).then((res: any) => {
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

export default address;