import React from 'react'
import { useForm } from 'react-hook-form'
import Container from '../../../component/Container'
import { firestore } from '../../../utils/firebase'
import { message } from 'antd'
import Router from 'next/router'
import { InputGroup, FormControl, Button, Table } from 'react-bootstrap'

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
                <Table>
                    <thead>
                        <tr className="table-success">
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
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    ชื่อผู้ส่ง
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl ref={register} name="name" type="text" />
                                        </InputGroup>
                                    </div>
                                    <div>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    เบอร์โทร
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl ref={register} name="tel" type="text" />
                                        </InputGroup>
                                    </div>
                                    <div>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    ที่อยู่
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl ref={register} name="address" type="text" />
                                        </InputGroup>
                                    </div>
                                    <div>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    รหัสไปรษณีย์
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl ref={register} name="postCode" type="text" />
                                        </InputGroup>
                                    </div>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
            <Container>
                <Table hover>
                    <thead>
                        <tr className="table-success">
                            <th>
                                บันทึกรายการ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Button type="submit" variant="info" size="lg" onClick={submit}>สร้างที่อยู่</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Create
