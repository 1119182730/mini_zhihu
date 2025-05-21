import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface RequestConfig extends AxiosRequestConfig {
  showError?: boolean; // 是否显示错误提示
}

interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
}

class Http {
  private instance: AxiosInstance;
  private static instance: Http;

  private constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): Http {
    if (!Http.instance) {
      Http.instance = new Http();
    }
    return Http.instance;
  }

  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 从 localStorage 获取 token
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        const { data } = response;
        // 这里可以根据后端的响应结构进行调整
        if (data.code === 200) {
          return data;
        }
        // 处理业务错误
        this.handleBusinessError(data);
        return Promise.reject(data);
      },
      (error) => {
        // 处理 HTTP 错误
        this.handleHttpError(error);
        return Promise.reject(error);
      }
    );
  }

  private handleBusinessError(error: ResponseData) {
    // 这里可以添加错误提示，比如使用 Element Plus 的 Message
    console.error("Business Error:", error.message);
  }

  private handleHttpError(error: any) {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
          // 未授权，跳转到登录页
          // router.push('/login')
          break;
        case 403:
          console.error("没有权限访问该资源");
          break;
        case 404:
          console.error("请求的资源不存在");
          break;
        case 500:
          console.error("服务器错误");
          break;
        default:
          console.error("未知错误");
      }
    } else if (error.request) {
      console.error("网络错误，请检查网络连接");
    } else {
      console.error("请求配置错误:", error.message);
    }
  }

  public async get<T = any>(
    url: string,
    params?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.instance.get(url, { params, ...config });
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config);
  }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.instance.put(url, data, config);
  }

  public async delete<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<T> {
    return this.instance.delete(url, config);
  }

  public async patch<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.instance.patch(url, data, config);
  }
}

export const http = Http.getInstance();
