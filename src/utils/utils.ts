/*
 * @Author       : Pear107
 * @Date         : 2023-05-09 04:08:42
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-05-09 04:21:21
 * @FilePath     : \q-face-web\src\utils\utils.ts
 * @Description  : 头部注释
 */
const formatDatetime = (
  datetime: string | number,
  type: "date" | "time" | "datetime"
) => {
  const dateObj = new Date(datetime);
  if (type == "date") {
    return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;
  } else if (type == "time") {
    return `${dateObj.getHours().toString().padStart(2, "0")}:${dateObj
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${dateObj.getSeconds().toString().padStart(2, "0")}`;
  } else {
    return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObj
      .getDate()
      .toString()
      .padStart(2, "0")} ${dateObj
      .getHours()
      .toString()
      .padStart(2, "0")}:${dateObj
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${dateObj.getSeconds().toString().padStart(2, "0")}`;
  }
};

export { formatDatetime };
