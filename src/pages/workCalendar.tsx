/*
 * @Author       : Pear107
 * @Date         : 2023-04-04 15:08:11
 * @LastEditors  : Pear107
 * @LastEditTime : 2023-04-07 01:19:38
 * @FilePath     : \q-face-web\src\pages\workCalendar.tsx
 * @Description  : 头部注释
 */
import React, { ReactElement } from "react";
import {
  Calendar,
  Col,
  ConfigProvider,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import type { Dayjs } from "dayjs";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import zhCN from "antd/locale/zh_CN";

import IndexLayout from "@/layouts/indexLayout";

const WorkCalendar: {
  (): JSX.Element;
  getLayout(page: ReactElement): JSX.Element;
} = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Calendar
        onPanelChange={onPanelChange}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];
          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>
            );
          }

          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>
            );
          }
          return (
            <div style={{ padding: 8 }}>
              <Typography.Title level={4}>日程</Typography.Title>
              <Row gutter={8}>
                <Col>
                  <Radio.Group
                    size="middle"
                    onChange={(e) => onTypeChange(e.target.value)}
                    value={type}
                  >
                    <Radio.Button value="month">月</Radio.Button>
                    <Radio.Button value="year">年</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col>
                  <Select
                    size="middle"
                    dropdownMatchSelectWidth={false}
                    className="my-year-select"
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                  >
                    {options}
                  </Select>
                </Col>
                <Col>
                  <Select
                    size="middle"
                    dropdownMatchSelectWidth={false}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
            </div>
          );
        }}
      />
    </ConfigProvider>
  );
};

WorkCalendar.getLayout = function getLayout(page: ReactElement) {
  return <IndexLayout>{page}</IndexLayout>;
};

export default WorkCalendar;
