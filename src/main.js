import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import moment from 'moment'
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

import Axios from 'axios'
Vue.prototype.$http = Axios;

//推荐在封装的request请求中写，我这里是为了省事儿，写这里了
Axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1'



moment.locale('zh-cn')

//创建一个日期的全局过滤器
//Vue.filter('过滤器名',函数)
Vue.filter('date', function (t) {
   return moment(t).format("YYYY-MM-DD h:mm:ss a")
})


//引入reset   @===src
import '@/assets/css/reset.css'

//全局路由守卫
router.beforeEach((to, from, next) => {
  console.log('to:', to)
  const token = localStorage.getItem('token');
  if (to.meta.Authorition) {
    if (token) {
       next()
    } else {
      router.push({name:'Login'})
     }
  } else {
    next()
  }
  
})

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
