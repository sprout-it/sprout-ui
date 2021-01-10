import React from 'react'
import { Tabs, Button, DatePicker } from 'antd';
import moment from 'moment';
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

const Receipt = () => {
    return (
        <div>
            <h1>รายงานใบเสร็จรับเงิน</h1>
            <Tabs defaultActiveKey="1" type="card" size='large'>
                <TabPane tab="ใบเสร็จรับเงิน" key="1">
                    <label>เลือกวันที่</label>
                    <RangePicker disabledDate={disabledDate} />
                    <Button>ค้นหา</Button>
                    <div className="table-wraper">
                        <table>
                            <tr>
                                <th>#</th>
                                <th>วันที่ใบเสร็จ</th>
                                <th>เลขที่ใบเสร็จรับเงิน</th>
                                <th>เลขที่ใบแจ้งหนี้</th>
                                <th>ยอดเงิน</th>
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
                </TabPane>
                <TabPane tab="ใบเสร็จรับเงิน (ประกันเสริม)" key="2">
                    <label>เลือกวันที่</label>
                    <RangePicker disabledDate={disabledDate} />
                    <Button>ค้นหา</Button>
                    <div className="table-wraper">
                        <table>
                            <tr>
                                <th>#</th>
                                <th>วันที่ออกใบเสร็จ</th>
                                <th>เลขที่ใบเสร็จ</th>
                                <th>เลขที่ใบแจ้งหนี้</th>
                                <th>ภาษีมูลค่าเพิ่ม</th>
                                <th>ค่าประกันสินค้า</th>
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
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Receipt
