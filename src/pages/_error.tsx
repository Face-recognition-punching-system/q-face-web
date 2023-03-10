/*
 * @Author       : Pear107
 * @Date         : 2023-01-27 06:41:35
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-02-06 22:39:23
 * @FilePath     : \q-face-web\src\pages\_error.tsx
 * @Description  : 头部注释
 */
import Error from "next/error";

export async function getServerSideProps() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const errorCode = res.ok ? false : res.status;
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
