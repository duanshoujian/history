import Message from '@arco-design/web-vue/es/message';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

console.log(import.meta.env)
// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:3000/api' : '/api', // 根据环境设置基础URL
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token 相关操作
const TOKEN_KEY = 'auth_token';

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      // 让每个请求携带token
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;

    // 这里可以根据后端的响应结构定制
    if (res.code === 200 || res.success) {
      return res;
    }

    // 处理特定的错误码
    if (res.code === 401) {
      // token 过期或未登录
      removeToken();
      Message.error('登录已过期，请重新登录');
      // TODO: 可以在这里添加重定向到登录页的逻辑
      return Promise.reject(new Error('未授权'));
    }

    // 其他错误
    Message.error(res.message || '请求失败');
    return Promise.reject(new Error(res.message || '请求失败'));
  },
  (error) => {
    console.error('Response error:', error);
    
    // 处理 HTTP 错误状态
    if (error.response) {
      switch (error.response.status) {
        case 401:
          removeToken();
          Message.error('登录已过期，请重新登录');
          // TODO: 可以在这里添加重定向到登录页的逻辑
          break;
        case 403:
          Message.error('没有权限访问');
          break;
        case 404:
          Message.error('请求的资源不存在');
          break;
        case 500:
          Message.error('服务器错误');
          break;
        default:
          Message.error('网络错误');
      }
    } else {
      Message.error('网络连接失败');
    }
    
    return Promise.reject(error);
  }
);

// 封装 GET 请求
export const get = <T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
  return service.get(url, { params, ...config }).then((res) => res.data);
};

// 封装 POST 请求
export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return service.post(url, data, config).then((res) => res.data);;
};

// 封装 PUT 请求
export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return service.put(url, data, config);
};

// 封装 DELETE 请求
export const del = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return service.delete(url, config);
};

export default service; 