import React, { useEffect } from 'react'
import moment from 'moment';
import { DatePicker } from 'antd';
import dynamic from "next/dynamic";

const Chart = dynamic(
  () => import("../component/Chart"),
  { ssr: false }
);
const { RangePicker } = DatePicker;

const disabledDate = (current) => {
  return current && current < moment().endOf('day');
}

const Index = () => {

  return (
    <div>
      <div className="App">
        <div className="index-name">
          hello my mame
        </div>
        <div className="index-chart">
          <RangePicker disabledDate={disabledDate} />
        </div>
        <div className="index-map">
          <Chart />
        </div>
        <div className="index-top-ten">

        </div>
        <div className="index-package-list">
          <div className="index-table-wraper">
            <table>
              <tr>
                <th>รหัส Tracking Code</th>
                <th>รหัสติดตามพัสดุจากขนส่ง</th>
                <th>ที่อยู่ปลายทาง</th>
                <th>วันที่จัดส่ง</th>
                <th>สถานะ</th>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Address</td>
                <td>Address</td>
                <td>Address</td>
                <td>Address</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
