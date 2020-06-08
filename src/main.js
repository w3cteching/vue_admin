import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

import Axios from 'axios'
Vue.prototype.$http = Axios;

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
