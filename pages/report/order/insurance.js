import React from 'react'
import moment from 'moment';
import { DatePicker, Select, Button } from 'antd';

const { RangePicker } = DatePicker;

const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

const Insurance = () => {
    const options1 = ["ทั้งหมด", "ชิปป๊อบประกันภัย", "ไปรษณีย์ไทย"]
    const options2 = ["ทั้งหมด", "ยืนยันแล้ว", "ระหว่างจัดส่ง", "สำเร็จ", "เกิดข้อผิดพลาด"]
    return (
        <div className="view-container">
            <h1>รายงานความคุ้มครองพัสดุ</h1>
            <label>เลือกวันที่</label>
            <RangePicker disabledDate={disabledDate} />
            <div>
                <label>
                    รหัสติดตามพัสดุ
                </label>
                <input type="text" placeholder="tracking" />
            </div>
            <div>
                <label>
                    เลือกความคุ้มครอง
                </label>
                <Select defaultValue={options1[0]}>
                    {
                        options1.map((item, key) => {
                            return <Select.Option key={key}>{item}</Select.Option>
                        })
                    }
                </Select>
            </div>
            <div>
                <label>
                    สถานะ
                </label>
                <Select defaultValue={options2[0]}>
                    {
                        options2.map((item, key) => {
                            return <Select.Option key={key}>{item}</Select.Option>
                        })
                    }
                </Select>
            </div>
            <Button type="primary">ค้นหา</Button>
            <div className="table-wraper">
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
            </div>
        </div>
    )
}

export default Insurance

