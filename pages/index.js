import React, { useEffect, useState, useRef } from 'react'
import dynamic from "next/dynamic";
import Container from '../component/Container'
import { Spin } from 'antd'
import gsap from 'gsap'

const Chart = dynamic(
  () => import("../component/Chart"),
  { ssr: false }
);

const Index = () => {
  const fixedRef = useRef()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // setTimeout(() => setLoading(false), 5000)
  }, [])

  return (
    <div className="App">
      {/* <Spin spinning={loading}> */}
      <Container>
        <div className="index-name">
          ทดสอบ
            </div>
      </Container>
      <Container>
        <div className="index-chart">
          <form>
            <div className="select">เลือกช่วงวันที่ต้องการ</div>
            <div className="index-input-datarange">
              <input type="date" name="datetime-start" placeholder="yyyy-mm-dd" />
              <span className="input-group-addon">ถึง</span>
              <input type="date" name="datetime-end" placeholder="yyyy-mm-dd" />
              <button className="btn btn-info btn-search-summary btn-search" data-search="summary" data-mode="get">แสดงข้อมูล</button>
            </div>
          </form>
        </div>
      </Container>

      <Container>
        <div className="index-map">
          <Chart />
        </div>
      </Container>

      <Container>
        <div className="index-top-ten">

        </div>
      </Container>

      <Container>
        <div className="index-table-wraper">
          <table>
            <thead ref={fixedRef}>
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
              <tr>
                <td><input type="checkbox" /></td>
                <td>Address</td>
                <td>Address</td>
                <td>Address</td>
                <td>Address</td>
              </tr>
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
      {/* </Spin> */}
    </div>
  )
}

export default Index
