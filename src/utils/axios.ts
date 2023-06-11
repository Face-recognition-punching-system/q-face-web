/*
 * @Author       : Pear107
 * @Date         : 2023-02-05 15:10:54
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-05-11 20:44:02
 * @FilePath     : \q-face-web\src\utils\axios.ts
 * @Description  : 头部注释
 */
import axios, { AxiosInstance } from "axios";

const host: string = "http://127.0.0.1:3000";
const instance: AxiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    Authorization: "",
    "Content-Type": "application/json",
  },
  baseURL: host,
});

export function getAxios(
  url: string,
  data: { [key: string]: string | number }
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
  data: { [key: string]: string | number }
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
