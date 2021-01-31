import React from 'react'
import { useForm } from 'react-hook-form'
import Container from '../../../component/Container'
import { firestore } from '../../../utils/firebase'
import { message } from 'antd'
import Router from 'next/router'

const Create = () => {
    const { register, getValues, errors } = useForm()

    const submit = async () => {
        const values = getValues()
        const addressRef = await firestore.collection('sourceAddress').add(values)
        message.success('เพิ่มที่อยู่เรียบร้อยแล้ว')
        Router.push('../origin')
    }

    return (
        <div className="address-create">
            <Container>
                <table>
                    <thead>
                        <tr>
                            <th>
                                ต้นทาง / ผู้จัดส่ง
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <form className="address-create-form">
                                    <div>
                                        <label>ชื่อผู้ส่ง</label>
                                        <input ref={register} name="name" type="text" />
                                    </div>
                                    <div>
                                        <label>เบอร์โทร</label>
                                        <input ref={register} name="tel" type="text" />
                                    </div>
                                    <div>
                                        <label>ที่อยู่</label>
                                        <input ref={register} name="address" type="text" />
                                    </div>
                                    <div>
                                        <label>รหัสไปรษณีย์</label>
                                        <input ref={register} name="postCode" type="text" />
                                    </div>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Container>
            <Container>
                <table>
                    <thead>
                        <tr>
                            <th>
                                บันทึกรายการ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <button type="submit" onClick={submit}>สร้างที่อยู่</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Container>
        </div>
    )
}

export default Create
