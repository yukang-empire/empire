
import fly from '../../utils/flyio';

const my =  {
    state: {
        domain01: "",
    },
    actions: {
		//获取我的页面数据
		my_data (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=User&a=userInfo", data).then( (res) => {
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

export default my;