// service统一出口
import WJRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

const wjRequest = new WJRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      // const token = ''
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }
      // console.log(config)
      return config;
    },
    requestInterceptorCatch: (err) => {
      // console.log('所有实例: 请求失败的拦截')
      return err;
    },
    responseInterceptor: (res) => {
      // console.log('所有实例: 响应成功的拦截')
      return res;
    },
    responseInterceptorCatch: (err) => {
      // console.log('所有实例: 响应失败的拦截')
      return err;
    },
  },
});

export default wjRequest;
