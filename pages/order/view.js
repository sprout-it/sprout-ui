import React, { useEffect, useState } from 'react'
import { Select, Button, Spin } from 'antd';
import useFetch from 'use-http'
import { useCookies } from 'react-cookie';
import { firestore } from '../../utils/firebase'
import Container from '../../component/Container'
import { DateFromTo } from '../../component/MyComponent'
import { Table } from 'react-bootstrap'
const { NEXT_PUBLIC_ENDPOINT_URL } = process.env
const { NEXT_PUBLIC_API_KEY } = process.env
const { NEXT_PUBLIC_PROXY } = process.env

const View = () => {
    const options = ["ทั้งหมด", "ยืนยันแล้ว", "ระหว่างจัดส่ง", "สำเร็จ", "เกิดข้อผิดพลาด"]
    const [cookies, setCookie, removeCookie] = useCookies(['users']);
    const { post, loading, error, response } = useFetch(`${NEXT_PUBLIC_PROXY}${NEXT_PUBLIC_ENDPOINT_URL}/tracking_purchase/`, { cachePolicy: "no-cache" })
    const orderRef = firestore.collection('order')
    const date = new Date()
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getOrderValue = async (limit) => {
        setIsLoading(true)
        const value = await orderRef.orderBy('created', 'desc').limit(2).get()
        const orderData = Promise.all(value.docs.map(async res => {
            const getStatus = await post('/', {
                api_key: NEXT_PUBLIC_API_KEY,
                purchase_id: res.data().purchase_id,
                email: res.data().from.email
            })
            console.log(getStatus)
            return { ...res.data(), purchase_status: getStatus.purchase_status }
        }))
        setData(await orderData)
        setIsLoading(false)
    }

    const nextPage = async (fieldValue) => {
        setIsLoading(true)
        let nextPageData = []
        const getNextVal = await orderRef.orderBy('created', 'desc').startAfter(fieldValue).limit(2).get()
        getNextVal.forEach(res => {
            nextPageData.push(res.data())
        })
        setData(nextPageData)
        setIsLoading(false)
    }

    const prevPage = async (fieldValue) => {
        setIsLoading(true)
        let prevPageData = []
        const getPrevVal = await orderRef.orderBy('created', 'desc').endBefore(fieldValue).limitToLast(2).get()
        getPrevVal.forEach(res => {
            prevPageData.push(res.data())
        })
        setData(prevPageData)
        setIsLoading(false)
    }

    useEffect(() => {
        getOrderValue()
    }, [])

    return (
        <div className="view-container">
            <h1 style={{ textAlign: "center" }}>ดูรายการทั้งหมด</h1>
            <Container>
                <div className="view-head">
                    {/* <button onClick={() => {
                        if (data[1])
                            nextPage(data[1].created)
                    }}>Next</button>
                    <button onClick={() => {
                        if (data[1])
                            prevPage(data[1].created)
                    }}>Previous</button> */}
                    {/* <DateFromTo /> */}
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

                {/* <Spin spinning={isLoading} tip="Loading"> */}
                <div className="view-table-wraper">
                    <Table striped hover="true">
                        <thead>
                            <tr bordered hover className="table-success">
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
                    </Table>
                </div>
                {/* </Spin> */}
            </Container>
        </div>
    )
}

export default View