
// 小程序数据请求 flyio插件
import fly from '../../utils/flyio';

const hotel =  {
    state: {
		
    },
    actions: {
		// 首页数据
		home_data (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("", data).then( (res) => {
                    // 返回数据
                    resolve(res);
                }).catch( error => {
                    reject(error);
                });
			});
		},
	}
};

export default hotel;