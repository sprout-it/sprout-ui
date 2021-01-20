import React from 'react'
import Container from '../../component/Container'

const Invoice = () => {
    return (
        <div>
            <h1>รายการค้างชำระ</h1>
            <Container>
                <div className="table-wraper">
                    <table>
                        <tr>
                            <th>#</th>
                            <th>เลขที่ใบแจ้งหนี้</th>
                            <th>เดือน</th>
                            <th>ประเภทใบแจ้งหนี้</th>
                            <th>วันที่ใบแจ้งหนี้</th>
                            <th>วันที่ครบกำหนด</th>
                            <th>ยอดเงินค้างชำระ</th>
                        </tr>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td>Address</td>
                            <td>Address</td>
                            <td>Address</td>
                            <td>Address</td>
                            <td>Address</td>
                            <td>Address</td>
                        </tr>
                    </table>
                </div>
            </Container>
        </div>
    )
}

export default Invoice
