import Vue from 'vue'
import App from './App'


//阿里图标
import "../static/fonts/iconfont.css"
//基础样式
import "./styles/base.css"

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
