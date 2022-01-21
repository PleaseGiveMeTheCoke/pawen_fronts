import request from '@/utils/request'
import qs from 'qs'
import store  from '../store';

// 用户登录接口
export const login = data => {

  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    url: 'http://localhost:7788/Glogin/login/login',
    data: JSON.stringify(data)
  })
}
export const register = data => {

  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    url: 'http://localhost:7788/Glogin/login/register',
    data: JSON.stringify(data)
  })
}
export const getUserInfo = () => {
  
  return request({
    method: 'GET',
    url: 'http://localhost:7788/Glogin/login/getInfo',
    params: {
      username: store.state.user.username
    }
  })
}

