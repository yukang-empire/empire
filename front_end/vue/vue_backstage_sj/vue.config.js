const path = require('path');

module.exports = {
	//这些API可以查看vue-cli官网(https://cli.vuejs.org/zh/config)文档了解
	publicPath: '',
	assetsDir: 'static',
	productionSourceMap: false,
	lintOnSave: false,
	css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                data: `@import "~@/common/styles/global.scss";`
            }
        }
    }
};
