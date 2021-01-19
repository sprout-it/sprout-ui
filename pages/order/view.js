import React, { useEffect, useState } from 'react'
import { DatePicker, Select, Button } from 'antd';
import useFetch from 'use-http'
import { useCookies } from 'react-cookie';
import { firestore } from '../../utils/firebase'
import axios from 'axios'
const { NEXT_PUBLIC_ENDPOINT_URL } = process.env

const View = ({ orderData }) => {
    const options = ["ทั้งหมด", "ยืนยันแล้ว", "ระหว่างจัดส่ง", "สำเร็จ", "เกิดข้อผิดพลาด"]
    const [cookies, setCookie, removeCookie] = useCookies(['users']);
    const { post, loading, error, response } = useFetch(`https://cors-anywhere.herokuapp.com/${NEXT_PUBLIC_ENDPOINT_URL}/tracking_purchase/`, { cachePolicy: "no-cache" })
    const orderRef = firestore.collection('order')
    const date = new Date()
    const [data, setData] = useState(orderData)

    const nextPage = async (fieldValue) => {
        let nextPageData = []
        const getNextVal = await orderRef.orderBy('purchase_id', 'desc').startAfter(fieldValue).limit(2).get()
        getNextVal.forEach(res => {
            nextPageData.push(res.data())
        })
        setData(nextPageData)
    }

    const prevPage = async (fieldValue) => {
        let prevPageData = []
        const getPrevVal = await orderRef.orderBy('purchase_id', 'desc').endBefore(fieldValue).limitToLast(2).get()
        getPrevVal.forEach(res => {
            prevPageData.push(res.data())
        })
        setData(prevPageData)
    }

    useEffect(() => {
        // getOrderValue()
    }, [])

    return (
        <div className="view-container">
            <h1>ดูรายการทั้งหมด</h1>
            <div className="view-head">
                {/* <button onClick={() => {
                    if (data[1])
                        nextPage(data[1].purchase_id)
                }}>Next</button>
                <button onClick={() => {
                    if (data[1])
                        prevPage(data[1].purchase_id)
                }}>Previous</button> */}
                <label>เลือกวันที่</label>
                <span>
                    <input type="date" />
                    <span>ถึง</span>
                    <input type="date" />
                </span>
                {/* <RangePicker disabledDate={disabledDate} /> */}
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
                        {
                            data ? data.map((item, key) =>
                                <tr key={key}>
                                    {/* <td><input type="checkbox" /></td> */}
                                    <td>{key + 1}</td>
                                    <td>{item.tracking_code}</td>
                                    <td>{item.courier_tracking_code}</td>
                                    <td>{item.to.name}</td>
                                    <td>{item.created}</td>
                                    <td>{item.purchase_status}</td>
                                </tr>
                            ) : ""
                        }
                    </tbody>
                </table>
            </div>
            {/* {JSON.stringify(data)} */}
        </div>
    )
}

View.getInitialProps = async () => {
    const orderRef = firestore.collection('order')
    const value = await orderRef.orderBy('created', 'desc').limit(2).get()
    const orderData = Promise.all(value.docs.map(async res => {
        const getStatus = await axios.post(`https://cors-anywhere.herokuapp.com/${NEXT_PUBLIC_ENDPOINT_URL}/tracking_purchase`, {
            api_key: "dv12294a1b9aec5fed19559e50eaebd7337db35333ab6efcb3d34fd5c6f9efefbbec81479eefa687801607938910",
            purchase_id: res.data().purchase_id,
            email: res.data().from.email
        }, {
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                "X-Requested-With": "XMLHttpRequest"
            }
        })
        console.log(getStatus.data)
        return { ...res.data(), purchase_status: getStatus.data.purchase_status }
    }))
    // console.log(await orderData)
    return { orderData: await orderData }
}

export default View