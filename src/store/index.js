import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用于在登录成功后保存用户信息 (初始值尝试读取本地存储)
    user: JSON.parse(window.localStorage.getItem('user') || null),
    userId: window.localStorage.getItem('userId') || -1 ,
    chooseData: window.localStorage.getItem('chooseData') || null,
    tags: window.localStorage.getItem('tages') || null
  },
  mutations: {
    // 存储用户数据
    setUser (state, payload) {
      // 将 payload 转换为对象后再进行存储
      
      console.log(typeof(payload))
      state.user = JSON.parse(payload);
      // 将 payload 数据添加到本地存储中
      
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
