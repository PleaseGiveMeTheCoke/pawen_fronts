import request from '@/utils/request'
import store  from '../store';

export const getPageFiles = data => {

    return request({
        method: 'GET',
        url: 'http://localhost:7788/Gsave/file/findPageFile',
        params:{
          pid:data.pid,
          name:data.name,
          desc:data.desc,
          typee:data.typee,
          page:data.page
        }
    })
  }
 

  export const  getResultFiles = data => {

    return request({
        method: 'GET',
        url: 'http://localhost:7788/Gsave/search/searchFile',
        params:{
          pid:data.pid,
          name:data.name,
          desc:data.desc,
          typee:data.typee,
          page:data.page
        }
    })
  }

  
  export const addDownLoad = (fid,download) => {

    return request({
        method: 'GET',
        url: 'http://localhost:7788/Gsave/search/addDownLoad',
        params:{
          fid:fid,
          download:download
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
  export const reportFile = (fid,pid) => {
    return request({
      method: 'GET',
      url: 'http://localhost:7788/Gsave/file/reportFile',
      params: {
        fid:fid,
        pid:pid
      }
    })
  }