import React from 'react'
import moment from 'moment';
import { DatePicker, Select, Button } from 'antd';

const { RangePicker } = DatePicker;

const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

const View = () => {
    const options = ["ทั้งหมด", "ยืนยันแล้ว", "ระหว่างจัดส่ง", "สำเร็จ", "เกิดข้อผิดพลาด"]
    return (
        <div className="view-container">
            <h1>ดูรายการทั้งหมด</h1>
            <label>เลือกวันที่</label>
            <RangePicker disabledDate={disabledDate} />
            <div>
                <label>
                    ค้นหาข้อความ
                </label>
                <input type="text" />
            </div>
            <div>
                <Select defaultValue={options[0]}>
                    {
                        options.map((item, key) => {
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

export default View
