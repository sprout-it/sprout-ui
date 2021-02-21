import React, { useState, useEffect, useRef } from 'react'
import Container from '../../component/Container'
import { firestore } from '../../utils/firebase'
import useFetch from 'use-http'
import { Button, Table, Pagination } from 'react-bootstrap'

const { NEXT_PUBLIC_ENDPOINT_URL } = process.env
const { NEXT_PUBLIC_API_KEY } = process.env
const { NEXT_PUBLIC_PROXY } = process.env

const Purchase = () => {
    const [data, setData] = useState([])
    const orderRef = firestore.collection('order')
    const { post, loading, error, response } = useFetch(`${NEXT_PUBLIC_PROXY}${NEXT_PUBLIC_ENDPOINT_URL}/label`, { cachePolicy: "no-cache" })
    const downloadRef = useRef();
    const [printData, setPrintData] = useState()
    const getOrderValue = async (limit) => {
        const value = await orderRef.orderBy('created', 'desc').limit(2).get()
        const orderData = value.docs.map(item => item.data())
        setData(orderData)
    }

    const getPrint = async (e) => {
        const api_key = NEXT_PUBLIC_API_KEY
        const getDataPrint = await post('/', { api_key, purchase_id: 189791, type: "pdf" })
        // setPrintData(getDataPrint)
        console.log(getDataPrint)
        setPrintData(getDataPrint)
        // const url = window.URL.createObjectURL(new Blob([getDataPrint.pdf]))
        const link = document.createElement('a');
        link.href = "data:application/pdf;base64," + getDataPrint.pdf;
        link.download = "pdf.pdf"; //File name Here
        link.click(); //Downloaded file
        link.remove();
        console.log(link)
    }

    useEffect(() => {
        getOrderValue()
    }, [])

    return (
        <div className="purchase-container">
            <h1>รายการจากรหัสใบสั่งซื้อ</h1>
            <Container>
                <Table striped hover>
                    <thead>
                        <tr className="table-success">
                            <th></th>
                            <th>#</th>
                            <th>รหัสใบสั่งซื้อ</th>
                            <th>จำนวนรายชื่อ</th>
                            <th>วันที่สร้างรายการ</th>
                            <th>การดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data ? data.map((item, key) =>
                                <tr key={key}>
                                    <td><input type="checkbox" /></td>
                                    <td>{key + 1}</td>
                                    <td>{item.purchase_id}</td>
                                    <td>{Object.entries(item.from).length}</td>
                                    <td>{item.created}</td>
                                    <td>
                                        <Button variant="primary" className="btn-purchase" onClick={getPrint}>พิมพ์ใบปะหน้า</Button>
                                        <Button variant="info" ref={downloadRef} className="btn-purchase"><a href={printData} download>ใบจัดส่งสินค้า</a></Button>
                                        <Button variant="success" className="btn-purchase">ตรวจสอบใบสั่งซื้อ</Button>
                                    </td>
                                </tr>
                            ) : ""
                        }
                    </tbody>
                </Table>
                <Pagination style={{ margin: "auto" }}>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </Container>
        </div >
    )
}

export default Purchase
