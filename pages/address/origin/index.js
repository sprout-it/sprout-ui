import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { firestore } from '../../../utils/firebase'

const Address = () => {
    const [originData, setOriginData] = useState([])

    const createRoute = () => {
        Router.push('origin/create')
    }

    const getInitialData = async () => {
        const originAddress = await firestore.collection('sourceAddress').get()
        const setData = originAddress.docs.map(item => item.data())
        setOriginData(setData)
    }

    useEffect(() => {
        getInitialData()
    }, [])

    return (
        <div className="address-container">
            <div className="profile-header">
                <h1>ต้นทาง/ผู้จัดส่ง</h1>
                <button onClick={createRoute}>สร้างที่อยู่ใหม่</button>
            </div>
            <div className="address-table-wraper">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ชื่อผู้ส่ง</th>
                            <th>ที่อยู่</th>
                            <th>รหัสไปรษณีย์</th>
                        </tr>
                    </thead>
                    {/* <tr>
                        <td><input type="checkbox" /></td>
                        <td>Address</td>
                        <td>Address</td>
                        <td>Address</td>
                    </tr> */}
                    <tbody>
                        {
                            originData && originData.map((item, key) =>
                                <tr key={key}>
                                    <td><input type="checkbox" /></td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.tel}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Address
