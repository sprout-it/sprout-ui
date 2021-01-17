import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { DatePicker, Select, Button } from 'antd';
import useFetch from 'use-http'
import { useCookies } from 'react-cookie';
import { firestore } from '../../utils/firebase'
const { NEXT_PUBLIC_ENDPOINT_URL } = process.env
const { RangePicker } = DatePicker;
const View = () => {
    const options = ["ทั้งหมด", "ยืนยันแล้ว", "ระหว่างจัดส่ง", "สำเร็จ", "เกิดข้อผิดพลาด"]
    const [cookies, setCookie, removeCookie] = useCookies(['users']);
    const { post, loading, error, response } = useFetch(`https://cors-anywhere.herokuapp.com/${NEXT_PUBLIC_ENDPOINT_URL}/tracking_purchase/`, { cachePolicy: "no-cache" })
    const orderRef = firestore.collection('order')
    const date = new Date()
    const [data, setData] = useState([])

    const disabledDate = (current) => {
        return current && current < moment().endOf('day');
    }

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
        console.log(await orderData)
        setData(await orderData)
    }

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
        getOrderValue()
        orderRef.get().then(res => console.log(res.size))
    }, [])

    return (
        <div className="view-container">
            <h1>ดูรายการทั้งหมด</h1>
            <div className="view-head">
                <button onClick={() => {
                    if (data[1])
                        nextPage(data[1].purchase_id)
                }}>Next</button>
                <button onClick={() => {
                    if (data[1])
                        prevPage(data[1].purchase_id)
                }}>Previous</button>
                <label>เลือกวันที่</label>
                <input onChange={(date) => console.log(date.target.dataset)} type="date" />
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

export default View