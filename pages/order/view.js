import React, { useEffect } from 'react'
import moment from 'moment';
import { DatePicker, Select, Button } from 'antd';
import useFetch from 'use-http'
import { useCookies } from 'react-cookie';
const { NEXT_PUBLIC_ENDPOINT_URL } = process.env
const { RangePicker } = DatePicker;

const View = () => {
    const options = ["ทั้งหมด", "ยืนยันแล้ว", "ระหว่างจัดส่ง", "สำเร็จ", "เกิดข้อผิดพลาด"]
    const [cookies, setCookie, removeCookie] = useCookies(['users']);
    const { post, loading, error, response } = useFetch(`https://cors-anywhere.herokuapp.com/${NEXT_PUBLIC_ENDPOINT_URL}/tracking`)
    const disabledDate = (current) => {
        return current && current < moment().endOf('day');
    }

    return (
        <div className="view-container">
            <h1>ดูรายการทั้งหมด</h1>
            <div className="view-head">
                <input onChange={(date) => console.log(date.target.dataset)} type="date" />
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
            </div>
            <div className="table-wraper">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>No.</th>
                            <th>รหัส Tracking Code</th>
                            <th>ชื่อลูกค้า</th>
                            <th>วันที่สร้างรายการ</th>
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
                            <td>Address</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default View