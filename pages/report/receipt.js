import React from 'react'
import { Tabs, Button } from 'antd';
const { TabPane } = Tabs;
import Container from '../../component/Container'

const Receipt = () => {
    return (
        <div>
            <h1>รายงานใบเสร็จรับเงิน</h1>
            <Container>
                <Tabs defaultActiveKey="1" type="card" size='large'>
                    <TabPane tab="ใบเสร็จรับเงิน" key="1">
                        <label>เลือกวันที่</label>
                        <span>
                            <label>เลือกวันที่</label>
                            <input type="date" />
                            <input type="date" />
                        </span>
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
                        <span>
                            <label>เลือกวันที่</label>
                            <input type="date" />
                            <span>ถึง</span>
                            <input type="date" />
                        </span>
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
            </Container>
        </div>
    )
}

export default Receipt
