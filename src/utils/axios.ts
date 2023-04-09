import { Html } from "next/document";
/*
 * @Author       : Pear107
 * @Date         : 2023-02-05 15:10:54
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-04-05 22:36:12
 * @FilePath     : \q-face-web\src\utils\axios.ts
 * @Description  : 头部注释
 */
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosInstance,
} from "axios";
import { useSession } from "next-auth/react";

const host: string = "http://localhost:3000";
const instance: AxiosInstance = axios.create({
  headers: {
    Accept: "application/vnd.dpexpo.v1+json",
    Authorization: "",
    "Content-Type": "application/x-www-form-urlencoded",
  },
  baseURL: host + "/api-cpp",
});

export function getAxios(
  url: string,
  data: { [key: string]: string } | string
) {
  return new Promise((resolve, reject) => {
    instance(url, {
      method: "GET",
      data: data,
    })
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          reject(res.statusText);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function postAxios(
  path: string,
  data: { [key: string]: string } | string
) {
  return new Promise((resolve, reject) => {
    instance(path, {
      method: "POST",
      data: data,
    })
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          reject(res.statusText);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
