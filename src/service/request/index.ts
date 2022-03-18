import axios from "axios";
import type { AxiosInstance } from "axios";
import type { WJRequestInterceptors, WJRequestConfig } from "./type";
import { ElLoading } from "element-plus";
import { LoadingInstance } from "element-plus/lib/components/loading/src/loading";
import "element-plus/theme-chalk/el-loading.css";

const DEAFULT_LOADING = true;

class WJRequest {
  instance: AxiosInstance;
  interceptors?: WJRequestInterceptors;
  loading?: LoadingInstance;
  showLoading: boolean;
  constructor(config: WJRequestConfig) {
    this.instance = axios.create(config);
    this.showLoading = config.showLoading ?? DEAFULT_LOADING;
    this.interceptors = config.interceptors;
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    // 添加全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局拦截器: 请求成功拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据...",
            background: "rgba(0, 0, 0, 0.6)",
            fullscreen: true,
          });
        }
        return config;
      },
      (err) => {
        // console.log('全局拦截器: 请求失败拦截')
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局拦截器: 响应成功拦截')
        // setTimeout(() => {
        //   this?.loading?.close()
        // }, 3000)
        this?.loading?.close();
        const data: any = res.data;
        if (data.returnCode === "-1001") {
          console.log("请求失败~, 错误信息");
        } else {
          return data;
        }
        // // 错误码形式一
        // const data = res.data
        // if (data.returnCode === '-1001') {
        //   console.log('请求失败~，错误信息')
        // } else {
        //   return data
        // }
      },
      (err) => {
        // console.log('全局拦截器: 响应失败拦截')
        if (err.response.status === 404) {
          console.log("404的错误~");
          // 错误码形式二
          if (err.response.status === 404) {
            console.log("404的错误");
          }
          return err;
        }
        return err;
      }
    );
  }
  request<T>(config: WJRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1. 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 2. 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1. 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 2. 将showLoading设置true, 以免影响下个请求
          this.showLoading = DEAFULT_LOADING;
          // 3. 将结果resolve返回出去
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEAFULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T = any>(config: WJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T = any>(config: WJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T = any>(config: WJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T = any>(config: WJRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default WJRequest;
