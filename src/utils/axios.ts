import axios from 'axios'
import { ElMessage } from 'element-plus'
// @ts-ignore
import router from '@/router'
import { localGet } from './index'
// @ts-ignore
import config from '~/config'


// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
axios.defaults.baseURL = config[import.meta.env.MODE].baseUrl
// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
axios.defaults.withCredentials = true
// 请求头，headers 信息
// @ts-ignore
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// @ts-ignore
axios.defaults.headers['token'] = localGet('token') || ''
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器，内部根据返回值，重新组装，统一管理。
// @ts-ignore
axios.interceptors.response.use((res: HttpResult) => {
  if (typeof res.data !== 'object') {
    ElMessage.error('服务端异常！')
    return Promise.reject(res)
  }
  // @ts-ignore
  if (res.data.retcode != 200) {
    if (res.data.msg) {
      ElMessage.error(res.data.msg)
    }
    if (res.data.retcode == 402) {
      router.push({ path: '/login' })
    }
    return Promise.reject(res.data)
  }
  return res
}, error => {
  if (error.hasOwnProperty('response')) {
    ElMessage.error(error.response.data.message)
  } else {
    ElMessage.error('Network failure.')
  }
  return Promise.reject(error)
})

export default axios