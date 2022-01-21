import request from '@/utils/request'
import store  from '../store';

export const getCutRes = (file,tags) => {

    return request({
        method: 'GET',
        url: 'http://localhost:7788/Gsave/file/findAllFile',
        params: {
          pid:pid
        }
    })
  }
  export const deleteFile = (fid) => {
    return request({
      method: 'GET',
      url: 'http://localhost:7788/Gsave/file/deleteFile',
      params: {
        fid:fid
      }
    })
  }