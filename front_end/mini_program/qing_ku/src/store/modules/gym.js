
import fly from '../../utils/flyio';

const gym =  {
    state: {
        domain01: "",
    },
    actions: {
        //获取banner
        gym_banner (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=User&a=ad_app_map").then( (res) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
			});
		},
		//获取会所列表
        club_list (state, data) {
            return new Promise((resolve, reject) => {
                fly.post("/index.php?m=Api&c=User&a=myNearClub", data).then( (res) => {
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

export default gym;