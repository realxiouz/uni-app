import Vue from 'vue'
import App from './App'
import store from './store'
import '@/filter/index'
import './utils/index.css'

Vue.config.productionTip = false
Vue.prototype.$store = store

import { http } from '@/utils/request.js'
Vue.prototype.$http = http;
import 'static/foots/iconfont.css';

App.mpType = 'app';

const app = new Vue({
    ...App
})
app.$mount()
