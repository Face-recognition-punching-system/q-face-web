/*
 * @Author       : Pear107
 * @Date         : 2023-01-27 06:41:35
 * @LastEditors  : Pear107
<<<<<<< HEAD:src/pages/_error.tsx
 * @LastEditTime : 2023-02-01 06:14:47
 * @FilePath     : \q-face-web\src\pages\_error.tsx
=======
 * @LastEditTime : 2023-01-27 06:41:40
 * @FilePath     : \q-face-web\src\pages\_error.js
>>>>>>> 80ee4a84fc3579c6e27c241dc17199ffb52842f5:src/pages/_error.js
 * @Description  : 头部注释
 */
import Error from "next/error";

export async function getServerSideProps() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const errorCode = res.ok ? false : res.statusCode;
  const json = await res.json();

  return {
    props: { errorCode, stars: json.stargazers_count },
  };
}

export default function Page({ errorCode, stars }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return <div>Next stars: {stars}</div>;
}
