
const path = require('path');

module.exports = {
    //字段介绍可查看api文档 https://cli.vuejs.org/zh/config
    publicPath: "",
    assetsDir: "static",
    productionSourceMap: false,
    lintOnSave: false,
    //向所有sass样式传入共享的全局变量、占位符、mixin
    css: {
        loaderOptions: {
            // @/ 是 src/ 的别名
            sass: { data: `@import "~@/assets/style/global.scss";` }
        }
    }
}