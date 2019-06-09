/*
包含 n 个接口函数的模块

函数的返回值: promise对象
*/
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

/**
 * 根据经纬度获取位置详情
*/
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)

/**
 * 获取食品分类列表
*/
export const reqFoodCategories = () => ajax(BASE_URL + '/index_category')

/**
 * 根据经纬度获取商铺列表
*/
export const reqShops = ({ longitude, latitude }) => ajax(`${BASE_URL}/shops`, { longitude, latitude })

/**
 * 根据经纬度和关键字搜索商铺列表
 * 获取 msite 商铺列表(根据query参数：经纬度)
 * 将经纬度两个数据作为一个参数对象传入
 * 也可以两个数据分别传入ajax， 然后再放入一个对象参数内， 如下面的手机号接口
*/
export const reqSearchShop = (geohash, keyword) => ajax(`${BASE_URL}/search_shops`, { geohash, keyword }, 'POST')

/**
 * 账号密码登陆
*/
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax(`${BASE_URL}/login_pwd`, { name, pwd, captcha }, 'POST')

/**
 * 获取短信验证码
*/
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode', { phone })

/**
 * 手机号验证码登陆
*/
export const reqSmsLogin = ({ phone, code }) => ajax(BASE_URL + '/login_sms', { phone, code }, 'POST')

/**
 *根据会话获取用户信息
*/
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')

/**
 * 用户登出
*/
export const reqLogout = () => ajax(BASE_URL + '/logout')
