
import fly from '../../utils/flyio';

const home =  {
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
		//获取openid和session_key
		get_session_key (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=Exercise&a=return_key", data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		},
		//获取步数
		get_step (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=Exercise&a=decryp", data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		},
		// 上传步数
		upload_step (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=user&a=add_step", data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		}, 
		//获取运动首页数据
		get_home_data (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=Exercise&a=exercise_index", data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		}, 
		//点击泡泡
		collect_kd (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=Exercise&a=give_points", data).then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		}, 
		//签到数据
		sign_data (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=Exercise&a=sign_index", data).then( (res) => {
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

export default home;