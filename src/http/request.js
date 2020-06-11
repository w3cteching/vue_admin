//axios的二次封装，主要处理请求和响应拦截
import axios from 'axios'

import { Message } from 'element-ui'

const service = axios.create({
    //默认访问基地址
    baseURL:`https://www.liulongbin.top:8888/api/private/v1`,
    timeout:3000, //请求延迟时间
});

//请求拦截
service.interceptors.request.use(function (config) {
    // 请求前处理，例如：处理请求头headers
    //获取token,有的接口不需要token，例如：登录，有的需要token,要做判断处理
    if (config.url !== 'login') {
      
        const token = localStorage.getItem('token')
        console.log('token:',token)
      //配置头信息，在封装的request请求中去写
       config.headers["Authorization"] = token;
    }

    //......
    return config;
  }, function (error) {
    // 报错返回
    return Promise.reject(error);
  });


//响应拦截
service.interceptors.response.use(function (response) {
    //成功返回 对状态码进行统一处理  例如：200，400，500 单独判断处理各种情况
    
    //解构赋值
    if (response.data.data && response.data.meta) {
        var { data: res, meta: { msg, status } } = response.data;
       
        var { token } = res;

        // if (status === 400) {
        //     //登录失败提示
        //     Message({
        //       message: msg,
        //       type: "error"
        //     });
    
        //  Promise.reject(msg)
          
        // }
      
    
        if (status === 200) {
            console.log('msg::',msg)
          //1.存token  cookie,localStorage,sessionStorage
          token && localStorage.setItem("token", token); //二次封装 set() get(),remove()
    
          //2.跳转到后台首页
         // this.$router.push({ name: "Home" });
    
          //3.登录成功提示
          Message({
            message:msg,
            type: "success"
          });
            
            return {
                flag: 2,  //自定义状态
                msg:msg,
                result:res,
          };
        } else {
            Message({
                message: msg,
                type: "error"
              });
      
           Promise.reject(msg)
        }

    } else {
        
        Message({
            message:'参数有误，请检查',
            type: "error"
        });
        
       return {
           msg: msg,
           flag:1 
       }
            
     }
   
   
  }, function (error) {
    //返回报错处理
    //return Promise.reject(error);
    //console.log('报错处理')
    Message({
        message:'接口请求有误，请检查',
        type: "error"
    });
        
});
  
export default service;


