import React, { useState } from 'react'
import { Select, Button } from 'antd';
import Container from '../../component/Container'
import { firestore } from '../../utils/firebase'
import { Table } from 'react-bootstrap'

const Report = () => {
    const options = ["ทั้งหมด", "ยืนยันแล้ว", "ระหว่างจัดส่ง", "สำเร็จ", "เกิดข้อผิดพลาด"]
    const [report, setReport] = useState()
    const getInitialReport = async () => {
        const report = await firestore.collection(`report`).orderBy(`created`, 'desc').limit(2).get()
        setReport(report)
    }
    return (
        <div className="order-container">
            <h1>รายงานทางบัญชี</h1>
            <Container>
                <span>
                    <label>เลือกวันที่</label>
                    <input type="date" />
                    <span style={{ background: "#0f0f0f0f" }}>ถึง</span>
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

            <Container>
                <Table striped hover>
                    <thead>
                        <tr className="table-success">
                            <th>#</th>
                            <th>No.</th>
                            <th>รหัส Tracking Code</th>
                            <th>ชื่อลูกค้า</th>
                            <th>วันที่สร้างรายการ</th>
                            <th>สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            report && report.map((item, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.trackingCode}</td>
                                    <td>{item.name}</td>
                                    <td>{item.created}</td>
                                    <td>{item.status}</td>
                                </tr>
                            })
                        }
                        <td><input type="checkbox" /></td>
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Report
