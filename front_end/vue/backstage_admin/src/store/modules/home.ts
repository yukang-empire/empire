
import axios from '../../assets/api/axios';

const home =  {
    state: {
        domain01: "https://manage.technologyle.com",
        domain02: "https://shop.technologyle.com",
    },
    actions: {
        //获取首页数据
        home_data (state: any) {
            return new Promise((resolve, reject) => {
                axios.post("/api/statistical").then( (res: any) => {
                    //返回数据给调起dispatch的那边
                    resolve(res);
                }).catch( error => {
                    //返回error给调起dispatch的那边
                    reject(error);
                });
            });
        }
    }
};

export default home;