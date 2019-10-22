
import axios from '../../assets/api/axios';

const home = {
	state: {
		
	},
	actions: {
		//获取首页数据
		get_home_data (state: any, send_data: any) {
			return new Promise((resolve, reject) => {
				axios.post("", send_data).then((res: any) => {
					//返回数据给调起dispatch那边
					resolve(res);
				}).catch((error: any) => {
					reject(error);
				});
			});
		},
	}
}

export default home;