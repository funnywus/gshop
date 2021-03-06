/**
 * 通过 mutations 间接更新 state的多个方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategories,
  reqShops,
  reqUserInfo,
  reqLogout
} from '../api'

export default {
  // 异步获取地址
  async getAddress ({ commit, state }) {
    // 发送异步 ajax 请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一个 mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },

  // 异步获取食品分类列表
  async getFoodCategories ({ commit }) {
    // 发送异步 ajax 请求
    const result = await reqFoodCategories()
    // 提交一个 mutation
    if (result.code === 0) {
      const categories = result.data
      commit(RECEIVE_CATEGORIES, {categories})
    }
  },

  // 异步获取商家列表
  async getShops ({ commit, state }) {
    // 发送异步 ajax 请求
    const latitude = state.latitude // 经度
    const longitude = state.longitude // 纬度
    const result = await reqShops({longitude, latitude})
    // 提交一个 mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },

  // 同步记录用户信息
  recordUser ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },

  // 异步获取用户信息
  async getUserInfo ({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },

  // 异步登出
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  }
}
