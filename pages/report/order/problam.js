import React, { useEffect, useState } from 'react'
import Container from '../../../component/Container'
import { firestore } from '../../../utils/firebase'
import useFetch from 'use-http'
const orderRef = firestore.collection('order')
const { NEXT_PUBLIC_ENDPOINT_URL } = process.env

const Problam = () => {
    const [data, setData] = useState([])
    const { post, loading, error, response } = useFetch(`https://cors-anywhere.herokuapp.com/${NEXT_PUBLIC_ENDPOINT_URL}/label`, { cachePolicy: "no-cache" })
    const getOrderValue = async (limit) => {
        const value = await orderRef.orderBy('created', 'desc').limit(2).get()
        const orderData = Promise.all(value.docs.map(async res => {
            const getStatus = await post('/', {
                api_key: "dv12294a1b9aec5fed19559e50eaebd7337db35333ab6efcb3d34fd5c6f9efefbbec81479eefa687801607938910",
                purchase_id: res.data().purchase_id,
                email: res.data().from.email
            })
            console.log(getStatus.purchase_status)
            return { ...res.data(), purchase_status: getStatus.purchase_status }
        }))
        // setData(await orderData)
    }

    const getPrint = async (data) => {
        const getDataPrint = await post('/', { ...data })
        console.log(getDataPrint)
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
                            <th>หมายเลข Tracking ขนส่ง</th>
                            <th>ชื่อปลายทาง</th>
                            <th>ที่อยู่ปลายทาง</th>
                            <th>วันที่จัดส่ง</th>
                            <th>ประเภทปัญหา</th>
                            <th>comment</th>
                            <th>feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length > 1 ? data.map((item, key) =>
                                <tr>
                                    <td><input type="checkbox" /></td>
                                    <td>{key + 1}</td>
                                    <td>{item.purchase_id}</td>
                                    <td>{Object.entries(item.from).length}</td>
                                    <td>{item.created}</td>
                                    <td>
                                        <button onClick={() => getPrint(item.purchase_id)}>พิมพ์ใบปะหน้า</button>
                                        <button>ใบจัดส่งสินค้า</button>
                                        <button>ตรวจสอบใบสั่งซื้อ</button>
                                    </td>
                                </tr>
                            ) : <tr>ไม่พบข้อมูล</tr>
                        }
                    </tbody>
                </table>
            </Container>
        </div>
    )
}

export default Problam
