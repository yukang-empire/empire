
import axios from '../../assets/api/axios';
import { Message } from 'element-ui';

const arr_power = sessionStorage.getItem('Permission') ? sessionStorage.getItem('Permission').split(',') : [];

const game =  {
    state: {
        domain01: "https://manage.technologyle.com",
        domain02: "https://shop.technologyle.com",
    },
    actions: {
        //获取打卡列表
        sign_up_list (state: any, data: any) {

			if (arr_power.includes('20059')) {
				var send_data: any = new FormData();
				send_data.append("p", data.p);
				send_data.append("size", data.size);
				send_data.append("start_time", data.start_time);
				send_data.append("end_time", data.end_time);
				send_data.append("token", sessionStorage.getItem('token'));
				return new Promise((resolve, reject) => {
					axios.post( state.state.domain02 + "/index.php?m=Api&c=Game&a=admin_clock_list", send_data).then( (res: any) => {
						//返回数据给调起dispatch的那边
						resolve(res);
					}).catch( error => {
						//返回error给调起dispatch的那边
						reject(error);
					});
				});
            }else {
            	Message({ message: '对不起！您没有查看此内容的权限！', type: 'error', duration: 2500 });
            };
		},
		//修改虚拟人数
        revise_person (state: any, data: any) {
			if (arr_power.includes('20060')) {
				var send_data: any = new FormData();
				send_data.append("id", data.id);
				send_data.append("num", data.num);
				send_data.append("token", sessionStorage.getItem('token'));
				return new Promise((resolve, reject) => {
					axios.post( state.state.domain02 + "/index.php?m=Api&c=Game&a=admin_save_clock", send_data).then( (res: any) => {
						//返回数据给调起dispatch的那边
						resolve(res);
					}).catch( error => {
						//返回error给调起dispatch的那边
						reject(error);
					});
				});
            }else {
            	Message({ message: '对不起！您没有修改此内容的权限！', type: 'error', duration: 2500 });
            };
        },
		//编辑配置
		add_sign_up_set (state: any, data: any) {
			if (arr_power.includes('20061')) {
				var send_data: any = new FormData();
				send_data.append("start_clock", data.start_clock);
				send_data.append("end_clock", data.end_clock);
				send_data.append("entered_end", data.entered_end);
				send_data.append("clock_cut", data.clock_cut);
				send_data.append("one_price", data.one_price);
				send_data.append("token", sessionStorage.getItem('token'));
				return new Promise((resolve, reject) => {
					axios.post( state.state.domain02 + "/index.php?m=Api&c=Game&a=admin_save_config", send_data).then( (res: any) => {
						//返回数据给调起dispatch的那边
						resolve(res);
					}).catch( error => {
						//返回error给调起dispatch的那边
						reject(error);
					});
				});
            }else {
            	Message({ message: '对不起！您没有修改此内容的权限！', type: 'error', duration: 2500 });
            };
		},
		//夺宝列表
		cap_treasure_list (state: any, data: any) {
			if (arr_power.includes('20062')) {
				var send_data: any = new FormData();
				send_data.append("p", data.p);
				send_data.append("size", data.size);
				send_data.append("start_time", data.start_time);
				send_data.append("end_time", data.end_time);
				send_data.append("token", sessionStorage.getItem('token'));
				return new Promise((resolve, reject) => {
					axios.post( state.state.domain02 + "/index.php?m=Api&c=Game&a=admin_luck_list", send_data).then( (res: any) => {
						//返回数据给调起dispatch的那边
						resolve(res);
					}).catch( error => {
						//返回error给调起dispatch的那边
						reject(error);
					});
				});
            }else {
            	Message({ message: '对不起！您没有查看此内容的权限！', type: 'error', duration: 2500 });
            };
		},
		//新增夺宝期数
		add_add_cap_treasure (state: any, data: any) {
			if (arr_power.includes('20063')) {
				var send_data: any = new FormData();
				send_data.append("goods_name", data.goods_name);
				send_data.append("goods_price", data.goods_price);
				send_data.append("goods_points", data.goods_points);
				send_data.append("total_num", data.total_num);
				send_data.append("goods_image", data.goods_image);
				send_data.append("token", sessionStorage.getItem('token'));
				return new Promise((resolve, reject) => {
					axios.post( state.state.domain02 + "/index.php?m=Api&c=Game&a=admin_add_luck", send_data).then( (res: any) => {
						//返回数据给调起dispatch的那边
						resolve(res);
					}).catch( error => {
						//返回error给调起dispatch的那边
						reject(error);
					});
				});
            }else {
            	Message({ message: '对不起！您没有新增此内容的权限！', type: 'error', duration: 2500 });
            };
		},
		//夺宝期数详情
		cap_treasure_details (state: any, data: any) {
			if (arr_power.includes('20065')) {
				var send_data: any = new FormData();
				send_data.append("id", data.id);
				send_data.append("token", sessionStorage.getItem('token'));
				return new Promise((resolve, reject) => {
					axios.post( state.state.domain02 + "/index.php?m=Api&c=Game&a=admin_luck_info", send_data).then( (res: any) => {
						//返回数据给调起dispatch的那边
						resolve(res);
					}).catch( error => {
						//返回error给调起dispatch的那边
						reject(error);
					});
				});
            }else {
            	Message({ message: '对不起！您没有查看此内容的权限！', type: 'error', duration: 2500 });
            };
		},
		//生成中奖号码
		created_num (state: any, data: any) {
			var send_data: any = new FormData();
			send_data.append("id", data.id);
			send_data.append("token", sessionStorage.getItem('token'));
			return new Promise((resolve, reject) => {
				axios.post( state.state.domain02 + "/index.php?m=Api&c=Game&a=admin_give_no", send_data).then( (res: any) => {
					//返回数据给调起dispatch的那边
					resolve(res);
				}).catch( error => {
					//返回error给调起dispatch的那边
					reject(error);
				});
			});
		},
		//确定开奖
		sure_lottery (state: any, data: any) {
			if (arr_power.includes('20064')) {
				var send_data: any = new FormData();
				send_data.append("luck_no", data.luck_no);
				send_data.append("token", sessionStorage.getItem('token'));
				return new Promise((resolve, reject) => {
					axios.post( state.state.domain02 + "/index.php?m=Api&c=Game&a=admin_add_no", send_data).then( (res: any) => {
						//返回数据给调起dispatch的那边
						resolve(res);
					}).catch( error => {
						//返回error给调起dispatch的那边
						reject(error);
					});
				});
            }else {
            	Message({ message: '对不起！您没有生成中奖号码的权限！', type: 'error', duration: 2500 });
            };
		},
    }
};

export default game;