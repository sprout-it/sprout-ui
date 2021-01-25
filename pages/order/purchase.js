import React, { useState, useEffect, useRef } from 'react'
import Container from '../../component/Container'
import { firestore } from '../../utils/firebase'
import { Button } from 'antd'
import useFetch from 'use-http'
import { useReactToPrint } from 'react-to-print';

const { NEXT_PUBLIC_ENDPOINT_URL } = process.env

const Purchase = () => {
    const [data, setData] = useState([])
    const orderRef = firestore.collection('order')
    const { post, loading, error, response } = useFetch(`https://cors-anywhere.herokuapp.com/${NEXT_PUBLIC_ENDPOINT_URL}/label`, { cachePolicy: "no-cache" })
    const downloadRef = useRef();
    const [printData, setPrintData] = useState()
    const print = useReactToPrint({ content: () => componentRef.current })
    const getOrderValue = async (limit) => {
        const value = await orderRef.orderBy('created', 'desc').limit(2).get()
        const orderData = value.docs.map(item => item.data())
        setData(orderData)
    }

    const getPrint = async (e) => {
        const api_key = "dv12294a1b9aec5fed19559e50eaebd7337db35333ab6efcb3d34fd5c6f9efefbbec81479eefa687801607938910"
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
        <div>
            <h1>รายการจากรหัสใบสั่งซื้อ</h1>
            <Container>
                <table>
                    <thead>
                        <tr>
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
                                        <Button type="ghost" onClick={getPrint}>พิมพ์ใบปะหน้า</Button>
                                        <Button ref={downloadRef} type="ghost"><a href={printData} download>ใบจัดส่งสินค้า</a></Button>
                                        <Button type="ghost">ตรวจสอบใบสั่งซื้อ</Button>
                                    </td>
                                </tr>
                            ) : ""
                        }
                    </tbody>
                </table>
            </Container>
        </div >
    )
}

export default Purchase
