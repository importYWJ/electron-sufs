import type { AxiosRequestConfig, AxiosResponse } from "axios";

// 接口定义拦截器类型
export interface WJRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface WJRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: WJRequestInterceptors<T>;
  showLoading?: boolean;
}
