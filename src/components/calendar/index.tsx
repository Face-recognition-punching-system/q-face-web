/*
 * @Author       : Pear107
 * @Date         : 2023-03-06 21:21:19
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-04-04 15:08:06
 * @FilePath     : \q-face-web\src\components\calendar\index.tsx
 * @Description  : 头部注释
 */
import React, { useEffect, useRef, useState } from "react";

import styles from "./index.module.less";

const week = [
  {
    label: "日",
    value: 0,
  },
  {
    label: "一",
    value: 1,
  },
  {
    label: "二",
    value: 2,
  },
  {
    label: "三",
    value: 3,
  },
  {
    label: "四",
    value: 4,
  },
  {
    label: "五",
    value: 5,
  },
  {
    label: "六",
    value: 6,
  },
];

const basic = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
};

const Calendar: React.FC = () => {
  const [day, setDay] = useState<
    { label: number; curr: boolean; check: boolean }[]
  >([]);
  const [select, setSelect] = useState<{
    day: number;
    month: number;
    year: number;
  }>({ day: 0, month: 0, year: 0 });
  const date = useRef({ year: basic.year, month: basic.month, day: basic.day });
  useEffect(() => {
    setSelect({ ...basic });
    Day(basic.year, basic.month, basic.day);
  }, []);

  const handlePrev = () => {
    console.log("prev");
    let month: number;
    let year: number;
    let day = select.day;
    if (Number(select.month) > 1) {
      month = select.month - 1;
      year = select.year;
      Day(year, month, day);
    }

    if (Number(select.month) === 1) {
      month = 12;
      year = select.year - 1;
      Day(year, month, day);
    }

    setSelect(() => {
      return { year: year, month: month, day: day };
    });
  };

  const handleNext = () => {
    console.log("next");
    let month: number;
    let year: number;
    let day = select.day;
    if (select.month < 12) {
      month = Number(select.month) + 1;
      year = select.year;
      setSelect(() => {
        return { year: year, month: month, day: day };
      });
      Day(year, month, day);
    }

    if (select.month == 12) {
      month = 1;
      year = Number(select.year) + 1;
      setSelect(() => {
        return { year: year, month: month, day: day };
      });
      Day(year, month, day);
    }
  };

  const Day = (year: number, month: number, day: number) => {
    let total;
    let prev;
    if (month !== 2) {
      if (month === 4 || month === 6 || month === 9 || month === 11) {
        total = 30;
        prev = 31;
      } else if (month === 1 || month === 8) {
        total = 31;
        prev = 31;
      } else if (month === 3) {
        total = 31;
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          prev = 29;
        } else {
          prev = 28;
        }
      } else {
        total = 31;
        prev = 30;
      }
    } else {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        total = 29;
        prev = 31;
      } else {
        total = 28;
        prev = 31;
      }
    }

    let firstDay = new Date(year, month - 1, 1);
    let week = firstDay.getDay();
    let dom: { label: number; curr: boolean; check: boolean }[] = [];
    if (week !== 0) {
      for (let i = 0; i < week; i++) {
        dom.push({ label: prev + i + 1 - week, curr: false, check: false });
      }
    }

    for (let i = 1; i <= total; i++) {
      let check = false;
      if (
        year == date.current.year &&
        month == date.current.month &&
        i == date.current.day
      ) {
        check = true;
      }

      dom.push({ label: i, curr: true, check: check });
    }

    for (let i = 1; i <= 42 - total - week; i++) {
      dom.push({ label: i, curr: false, check: false });
    }

    setDay(() => dom);
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.bar}>
        {/* <LeftOutlined onClick={handlePrev} /> */}
        <span>
          {select.year}年{select.month}月
        </span>
        {/* <RightOutlined onClick={handleNext} /> */}
      </div>
      <div className={styles.date}>
        {week.map((item) => {
          return (
            <span key={item.value} className={styles.week}>
              {item.label}
            </span>
          );
        })}
        {day.map((item, index) => {
          return (
            <div
              key={index}
              className={`${styles.day} ${item.curr ? `${styles.curr}` : ""} ${
                item.check ? `${styles.check}` : ""
              }`}
            >
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
