const path = require('path');

module.exports = {
	publicPath: '',
	assetsDir: 'static',
    productionSourceMap: false,
	lintOnSave: false,
	//公共的sass全局变量、占位符、mixin
	css: {
		loaderOptions: {
			// @/是src/的别名 末尾的;不能少
			scss: { prependData: `@import "~@/assets/style/global.scss";` }
		}
	}
}