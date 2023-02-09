/*
 * @Author       : Pear107
 * @Date         : 2023-01-27 06:13:10
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-02-06 23:13:24
 * @FilePath     : \q-face-web\tailwind.config.js
 * @Description  : tailwindcss 配置
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
};
