import React from 'react'
import moment from 'moment';
import { Select, Button } from 'antd';
import Container from '../../component/Container'

const Report = () => {
    const options = ["ทั้งหมด", "ยืนยันแล้ว", "ระหว่างจัดส่ง", "สำเร็จ", "เกิดข้อผิดพลาด"]
    return (
        <div className="view-container">
            <h1>รายงานทางบัญชี</h1>
            <Container>
                <span>
                    <label>เลือกวันที่</label>
                    <input type="date" />
                    <input type="date" />
                </span>
                <span>
                    <label>
                        ค้นหาข้อความ
                </label>
                    <input type="text" />
                    <Select defaultValue={options[0]}>
                        {
                            options.map((item, key) => {
                                return <Select.Option key={key}>{item}</Select.Option>
                            })
                        }
                    </Select>
                    <label>
                        จำนวนต่อหน้า
                </label>
                    <input type="text" />
                    <Button type="primary">ค้นหา</Button>
                </span>
            </Container>
            <div className="table-wraper">
                <Container>
                    <table>
                        <tr>
                            <th>#</th>
                            <th>No.</th>
                            <th>รหัส Tracking Code</th>
                            <th>ชื่อลูกค้า</th>
                            <th>วันที่สร้างรายการ</th>
                            <th>สถานะ</th>
                        </tr>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td>Address</td>
                            <td>Address</td>
                            <td>Address</td>
                            <td>Address</td>
                            <td>Address</td>
                        </tr>
                    </table>
                </Container>
            </div>
        </div>
    )
}

export default Report
