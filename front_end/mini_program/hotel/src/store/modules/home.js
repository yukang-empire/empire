
// 小程序数据请求 flyio插件
import fly from '../../utils/flyio';

const home =  {
    state: {
		domain_01: 'https://shop.technologyle.com'
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
		// 首页轮播图
        home_swipers (state, data) {
            return new Promise((resolve, reject) => {
                fly.post(state.state.domain_01 + "/index.php?m=Api&c=User&a=ad_app_map").then( (res) => {
                    resolve(res);
                }).catch( error => {
                    reject(error);
                });
			});
		},
	}
};

export default home;