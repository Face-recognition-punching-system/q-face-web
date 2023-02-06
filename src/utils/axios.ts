/*
 * @Author       : Pear107
 * @Date         : 2023-02-05 15:10:54
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-02-05 16:23:45
 * @FilePath     : \q-face-web\src\utils\axios.ts
 * @Description  : 头部注释
 */
import axios, { AxiosResponse } from "axios";

let baseURL: string;
if (process.env.NODE_ENV === "production") {
  baseURL = "http://127.0.0.1:8888";
} else {
  baseURL = "http://127.0.0.1:8888";
}

// interceptor
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  (config) => {
    config.headers["Accept"] = "application/vnd.dpexpo.v1+json";
    config.headers["Content-Type"] = "application/json";
    config.baseURL = baseURL;
    config.timeout = 10000;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// get request
export function getAxios(url: string, data: { [key: string]: string }) {
  return new Promise((resolve, reject) => {
    axios(baseURL+url, {
      method: "GET",
      data,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// post request
export function postAxios(url: string, data: { [key: string]: string }) {
  return new Promise((resolve, reject) => {
    axios(baseURL+url, {
      method: "POST",
      data,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default axios;
