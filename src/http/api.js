//引入request.js
import request from './request'

//针对不同的业务接口封装 例如：登录，用户列表，权限列表，商品列表。。。。
//接口重构处理
/**
 * 登录接口
 * @params {Objet} data {username:'用户名',password:密码}
 */


export function login(data) {
    return request({
        url: 'login',
        method: 'post',
        data
    })
}

/**
 * 用户列表接口
 */

export function getUser(params) {
    return request({
        url: 'users',
        method: 'get',
        params
    })
}

/**
 * 修改用户状态接口
 */

export function modifyUserStaus(user) {
    return request({
        url: `users/${user.id}/state/${user.mg_state}`,
        method: 'put'
    })
}

/**
 * 编辑用户信息
 */
export function editUserInfo(userid, data) {
    return request({
        url: `users/${userid}`,
        method: 'put',
        data
    })
}