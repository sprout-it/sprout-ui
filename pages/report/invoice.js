import React from 'react'
import Container from '../../component/Container'
import { Table } from 'react-bootstrap'
const Invoice = () => {
    return (
        <div className="invoice-container">
            <h1>รายการค้างชำระ</h1>
            <Container>
                <div className="table-wraper">
                    <Table striped hover>
                        <tr className="table-success">
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
                    </Table>
                </div>
            </Container>
        </div>
    )
}

export default Invoice
