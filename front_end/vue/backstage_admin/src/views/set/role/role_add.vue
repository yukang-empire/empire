<template>
    <div class="role_add">
        <add :add_data='role_add_data' @add_submit='add_role' />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import add from "@/components/add.vue";

@Component({
    components: {
        add
    }
})

export default class role_add extends Vue{
    private role_add_data: any = {
        name: '角色',
        type: 'role',
        title: '填写角色信息',
        icon: '#iconjiaose',
    };

    mounted () {
        //角色权限清单
        var send_data = { page: 1, size: 100 };
        this.$store.dispatch("getPermissions", send_data).then( (res: any) => {
            console.log("角色权限清单", res);
            if (res.code == 0 || res.status == 1) {
                
            }else {
                //失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
        var for_arr = [

            //首页模块
                // {fid: '20009', title: '首页数据', url: '/api/statistical', controller: 'api', action: 'statistical', note: '查看首页收入数据'},
                // {fid: '20009', title: '查看首页经营状况数据', url: '/api/statistical', controller: 'api', action: 'statistical', note: '查看首页经营状况数据'},
                // {fid: '20009', title: '查看首页待办事项数据', url: '/api/statistical', controller: 'api', action: 'statistical', note: '查看首页待办事项数据'},
                // {fid: '20009', title: '查看首页酷点数据', url: '/api/statistical', controller: 'api', action: 'statistical', note: '查看首页酷点数据'},
                // {fid: '20009', title: '查看首页收入趋势数据', url: '/api/statistical', controller: 'api', action: 'statistical', note: '查看首页收入趋势数据'},

            //用户管理模块
                // //用户详情
                // {fid: '20003', title: '用户详情', url: '/api/getUserList', controller: 'api', action: 'getUserList', note: '查看用户详情'},
                // //禁用用户
                // {fid: '20003', title: '禁用用户', url: '/api/userLock', controller: 'api', action: 'userLock', note: '禁用用户'},

            //商家管理模块
                // //商家
                // {fid: '20004', title: '查看商家列表', url: '', controller: '', action: '', note: '查看商家列表'},
                // //新增商家
                // {fid: '20004', title: '新增商家', url: '', controller: '', action: '', note: '新增商家'},
                // //门店
                // {fid: '20004', title: '查看门店列表', url: '', controller: '', action: '', note: '查看门店列表'},
                // //新增门店
                // {fid: '20004', title: '新增门店', url: '', controller: '', action: '', note: '新增门店'},
                // //编辑门店
                // {fid: '20004', title: '编辑门店', url: '', controller: '', action: '', note: '编辑门店'},
                // //禁用门店
                // {fid: '20004', title: '禁用门店', url: '', controller: '', action: '', note: '禁用门店'},
                // //商品
                // {fid: '20004', title: '查看商品列表', url: '', controller: '', action: '', note: '查看商品列表'},
                // //新增商品
                // {fid: '20004', title: '新增商品', url: '', controller: '', action: '', note: '新增商品'},
                // //编辑商品
                // {fid: '20004', title: '编辑商品', url: '', controller: '', action: '', note: '编辑商品'},
            
            //订单管理模块
                // //服务订单
                // {fid: '20007', title: '查看服务订单列表', url: '', controller: '', action: '', note: '查看服务订单列表'},
                // {fid: '20007', title: '查看服务订单详情', url: '', controller: '', action: '', note: '查看服务订单详情'},
                // //转让订单
                // {fid: '20007', title: '查看转让订单列表', url: '', controller: '', action: '', note: '查看转让订单列表'},
                // {fid: '20007', title: '查看转让订单详情', url: '', controller: '', action: '', note: '查看转让订单详情'},
                // {fid: '20007', title: '修改健身卡信息', url: '', controller: '', action: '', note: '修改健身卡信息'},
                // {fid: '20007', title: '审核转让订单', url: '', controller: '', action: '', note: '审核通过转让订单'},
                // {fid: '20007', title: '新增私教课', url: '', controller: '', action: '', note: '新增私教课'},
                // {fid: '20007', title: '上架私教课', url: '', controller: '', action: '', note: '上架私教课'},
                // {fid: '20007', title: '下架私教课', url: '', controller: '', action: '', note: '下架私教课'},
                // //领用订单
                // {fid: '20007', title: '查看领用订单列表', url: '', controller: '', action: '', note: '查看领用订单列表'},

            //优惠券模块
                //优惠券
                // {fid: '20006', title: '查看优惠券列表', url: '', controller: '', action: '', note: '查看优惠券列表'},
                // //新增优惠券
                // {fid: '20006', title: '新增优惠券', url: '', controller: '', action: '', note: '新增优惠券'},

            //财务管理
                // //提现
                // {fid: '20005', title: '查看提现列表', url: '/api/userTransfer', controller: 'api', action: 'userTransfer', note: '查看提现列表'},
                // {fid: '20005', title: '审核提现', url: '/index.php/Api/Withdrawal/transfer', controller: 'Api', action: 'Withdrawal/transfer', note: '审核提现'},
                // {fid: '20005', title: '设置提现规则', url: '', controller: '', action: '', note: '设置提现规则'},
                // {fid: '20005', title: '导出excel表格', url: '/api/userTransfer', controller: 'api', action: 'userTransfer', note: '导出excel表格'},
                // {fid: '20005', title: '查看提现详情', url: '', controller: '', action: '', note: '查看提现详情'},
                // //充值统计
                // {fid: '20005', title: '查看充值统计列表', url: '', controller: '', action: '', note: '查看充值统计列表'},
                // {fid: '20005', title: '查看充值统计详情', url: '', controller: '', action: '', note: '查看充值统计详情'},
                // //服务订单统计
                // {fid: '20005', title: '查看服务订单统计列表', url: '', controller: '', action: '', note: '查看服务订单统计列表'},
                // {fid: '20005', title: '查看服务订单统计详情', url: '', controller: '', action: '', note: '查看服务订单统计详情'},
                // //查看通用设置
                // {fid: '20005', title: '查看通用设置列表', url: '', controller: '', action: '', note: '查看通用设置列表'},
                // {fid: '20005', title: '编辑充值设置', url: '', controller: '', action: '', note: '编辑充值设置'},
                // {fid: '20005', title: '编辑会籍卡设置', url: '', controller: '', action: '', note: '编辑会籍卡设置'},

            //运营管理
                // //协议列表
                // {fid: '20002', title: '查看协议列表', url: '', controller: '', action: '', note: '查看协议列表'},
                // {fid: '20002', title: '编辑协议', url: '', controller: '', action: '', note: '编辑协议'},
                // //文章列表
                // {fid: '20002', title: '查看文章列表', url: '', controller: '', action: '', note: '查看文章列表'},
                // {fid: '20002', title: '编辑文章', url: '', controller: '', action: '', note: '编辑文章'},
                // //轮播图列表
                // {fid: '20002', title: '查看轮播图列表', url: '', controller: '', action: '', note: '查看轮播图列表'},
                // {fid: '20002', title: '编辑轮播图', url: '', controller: '', action: '', note: '编辑轮播图'},
                // {fid: '20002', title: '新增轮播图', url: '', controller: '', action: '', note: '新增轮播图'},
                // //帮助中心
                // {fid: '20002', title: '查看帮助中心列表', url: '', controller: '', action: '', note: '查看帮助中心列表'},
                // {fid: '20002', title: '编辑帮助中心', url: '', controller: '', action: '', note: '编辑帮助中心'},
                // {fid: '20002', title: '新增帮助中心', url: '', controller: '', action: '', note: '新增帮助中心'},
                // {fid: '20002', title: '加入回收站', url: '', controller: '', action: '', note: '加入回收站'},
                // //回收站
                // {fid: '20002', title: '查看回收站列表', url: '', controller: '', action: '', note: '查看回收站列表'},
                // {fid: '20002', title: '恢复', url: '', controller: '', action: '', note: '恢复'},
                // {fid: '20002', title: '彻底删除', url: '', controller: '', action: '', note: '彻底删除'},

            //分润管理
                // {fid: '20008', title: '查看分润详情', url: '', controller: '', action: '', note: '查看分润详情'},
				// {fid: '20008', title: '新增分润', url: '', controller: '', action: '', note: '新增分润'},
				
			//小游戏
                // {fid: '20010', title: '查看小游戏模块', url: '', controller: '', action: '', note: '查看小游戏模块'},
                // {fid: '20010', title: '编辑虚拟人数', url: '', controller: '', action: '', note: '编辑早起打卡的虚拟人数'},
                // {fid: '20010', title: '配置早起打卡参数', url: '', controller: '', action: '', note: '配置早起打卡的参数'},

            //设置
                // //角色
                // {fid: '20001', title: '查看角色列表', url: '/api/getRoleList', controller: 'api', action: 'getRoleList', note: '查看角色列表'},
                // {fid: '20001', title: '新增角色', url: '/role/addRole', controller: 'role', action: 'addRole', note: '新增角色'},
                // {fid: '20001', title: '修改角色', url: '/role/editRole', controller: 'role', action: 'editRole', note: '修改角色'},
                // {fid: '20001', title: '删除角色', url: '/role/delRole', controller: 'role', action: 'delRole', note: '删除角色'},
                // //员工
                // {fid: '20001', title: '查看员工列表', url: '/api/getUsers', controller: 'api', action: 'getUsers', note: '查看员工列表'},
                // {fid: '20001', title: '新增员工', url: '/api/addUser', controller: 'api', action: 'addUser', note: '新增员工'},
                // {fid: '20001', title: '编辑员工', url: '/api/editUser', controller: 'api', action: 'editUser', note: '编辑员工'},
                // {fid: '20001', title: '删除员工', url: '', controller: '', action: '', note: '删除员工'},
                // {fid: '20001', title: '禁用员工', url: '', controller: '', action: '', note: '禁用员工'},
                // //修改密码
                // {fid: '20001', title: '修改员工密码', url: '/api/editUser', controller: 'api', action: 'editUser', note: '修改所有员工密码'},
                // //操作日志
                // {fid: '20001', title: '查看操作日志', url: '/api/getUserLog', controller: 'api', action: 'getUserLog', note: '查看操作日志'},
        ];
        var length = for_arr.length;
        // for (var i = 0; i < length; i++) {
        //     this.$store.dispatch("add_power", for_arr[i]).then( (res: any) => {
        //         console.log("新增权限", res);
        //         if (res.code == 0 || res.status == 1) {
                        
        //         }else {
        //             //失败提示
        //             this.$message({ message: res.msg, type: "error", duration: 2500 });
        //         };
        //     });
        // };


    };

    beforeRouteLeave (to: any, from: any, next: () => void): void {
        if (sessionStorage.getItem('add_form_data')) {
            this.$confirm("表单数据将会被全部清空，是否继续离开？", "提示", { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then( () => {
                sessionStorage.removeItem('show_license');
                sessionStorage.removeItem('head');
                sessionStorage.removeItem('show_store');
                sessionStorage.removeItem('checkbox_checked');
                sessionStorage.removeItem('add_form_data');
                next();
            }).catch(() => {
                next(false);
            });
        }else {
            next();
        };
    };

    //新增/修改角色
    add_role (ruleForm) {
        console.log(ruleForm);
        if (this.$route.query.RoleId) {
            this.$store.dispatch("revise_role", ruleForm).then( (res: any) => {
                console.log("修改角色", res);
                if (res.code == 0 || res.status == 1) {
                    sessionStorage.removeItem('head');
                    sessionStorage.removeItem('add_form_data');
                    //修改成功提示
                    this.$message({ message: '修改成功！', type: "success", duration: 1500 });
                    this.$router.push({ path: '/set/role/list' });
                }else {
                    //失败提示
                    this.$message({ message: res.msg, type: "error", duration: 2500 });
                };
            });
            // console.log('编辑修改角色');
        }else {
            this.$store.dispatch("add_role", ruleForm).then( (res: any) => {
                console.log("新增角色", res);
                if (res.code == 0 || res.status == 1) {
                    sessionStorage.removeItem('head');
                    sessionStorage.removeItem('add_form_data');
                    //新增成功提示
                    this.$message({ message: '新增成功！', type: "success", duration: 1500 });
                    this.$router.push({ path: '/set/role/list' });
                }else {
                    //失败提示
                    this.$message({ message: res.msg, type: "error", duration: 2500 });
                };
            });
        };
    };
}

</script>

<style lang="scss" scoped>

    @media screen and (min-width: 769px) {
        
    }
</style>