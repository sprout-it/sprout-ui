import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import Container from '../component/Container'
import { Spin } from 'antd'

const Chart = dynamic(
  () => import("../component/Chart"),
  { ssr: false }
);

const Index = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 5000)
  }, [])

  return (
    <Spin spinning={loading}>
      <div>
        <div className="App">
          <Container>
            <div className="index-name">
              hello my mame
            </div>
          </Container>
          <Container>
            <div className="index-chart">
              <form method="post" action="">
                <div className="col-md-2">เลือกช่วงวันที่ต้องการ</div>
                <div className="col-md-4 picker-container">
                  <div className="index-input-datarange">
                    <input type="text" name="datetime-start" placeholder="yyyy-mm-dd" />
                    <span className="input-group-addon">ถึง</span>
                    <input type="text" name="datetime-end" placeholder="yyyy-mm-dd" />
                  </div>
                </div>
                <div className="col-md-2">
                  <button className="btn btn-info btn-search-summary btn-search" data-search="summary" data-mode="get">แสดงข้อมูล</button>
                </div>
              </form>
            </div>
          </Container>
          <div className="index-map">
            <Chart />
          </div>
          <div className="index-top-ten">

          </div>
          <Container>
            <div className="index-table-wraper">
              <table>
                <thead>
                  <tr>
                    <th>รหัส Tracking Code</th>
                    <th>รหัสติดตามพัสดุจากขนส่ง</th>
                    <th>ที่อยู่ปลายทาง</th>
                    <th>วันที่จัดส่ง</th>
                    <th>สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input type="checkbox" /></td>
                    <td>Address</td>
                    <td>Address</td>
                    <td>Address</td>
                    <td>Address</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Container>
        </div>
      </div>
    </Spin>
  )
}

export default Index
