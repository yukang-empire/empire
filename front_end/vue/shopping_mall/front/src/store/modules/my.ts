
import axios from '../../assets/api/axios';

const my = {
	state: {
		
	},
	actions: {
		//会员中心数据
		my_data (state: any, data: any) {
			var http_data: any = new FormData();
            http_data.append("token", sessionStorage.getItem('token'));
            return new Promise((resolve, reject) => {
                axios.post("/index.php?m=Api&c=Shop&a=user_index", http_data).then((res: any) => {
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

export default my;