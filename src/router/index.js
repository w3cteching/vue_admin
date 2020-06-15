import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


import Home from "../views/Home.vue";

//路由懒加载的写法  @===src
const Login=()=>import('@/views/login/index.vue')
const UserList=()=>import('@/views/userlist/index.vue')
const RoleList=()=>import('@/views/rolelist/index.vue')
const RightList=()=>import('@/views/rightlist/index.vue')


const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {//设置路由元数据
      Authorition: true
    },
    children: [
      { path: '', component: UserList},
      { path: '/rolelist', component: RoleList},
      { path: '/rightlist', component: RightList},
      
    ]
  },
  {
    path: '/login',
    name:'Login',
    component:Login
  }
];

const router = new VueRouter({
  routes
});

export default router;
