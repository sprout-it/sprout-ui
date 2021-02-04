import React, { useEffect, useState, useRef } from 'react'
import useFetch from 'use-http'
import { useForm } from 'react-hook-form'
import { firestore } from '../../utils/firebase'
import Container from '../../component/Container'
import { InputGroup, FormControl, Button, Table, DropdownButton, Dropdown } from 'react-bootstrap'

const { NEXT_PUBLIC_ENDPOINT_URL } = process.env
const { NEXT_PUBLIC_API_KEY } = process.env

const Create = () => {
    const dataRef = firestore.collection('order')
    const { register, handleSubmit, errors, getValues } = useForm()
    const [dynamicTo, setDynamicTo] = useState([{ showMore: false }])
    const [update, setUpdate] = useState(0)
    const { post, loading, error, response } = useFetch(`https://cors-anywhere.herokuapp.com/${NEXT_PUBLIC_ENDPOINT_URL}/booking/`, { cachePolicy: 'no-cache', })
    const date = new Date()

    const onSubmit = async data => {
        let convertForm = data
        convertForm.data.forEach((_item, key) => {
            convertForm.data[key].from = {
                name: convertForm.from.name,
                address: convertForm.from.address,
                postcode: convertForm.from.postcode,
                tel: convertForm.from.tel
            }
        })
        delete convertForm.from
        const myPost = await post({
            ...convertForm,
            api_key: NEXT_PUBLIC_API_KEY,
        })
        Object.values(myPost.data).map(async item => {
            await dataRef.add({
                ...item,
                purchase_id: myPost.purchase_id,
                total_price: myPost.total_price,
                created: date.toISOString().slice(0, 10)
            })
        })
    }

    const addMore = (key) => {
        let add = dynamicTo
        if (add.length - 1 == key) {
            add.push({ showMore: false })
            setDynamicTo(add)
            setUpdate(Math.random())
        }
    }

    const showMore = (key) => {
        const tempDyn = dynamicTo
        tempDyn[key].showMore = !tempDyn[key].showMore
        setDynamicTo(tempDyn)
        setUpdate(Math.random())
    }

    const removeLastDest = () => {
        let pop = dynamicTo
        if (dynamicTo.length >= 1) {
            pop.pop()
            console.log(pop)
            setDynamicTo(pop)
            setUpdate(Math.random())
        }
    }

    return (
        <div className="create-container">
            <h1>สร้างรายการ</h1>
            <form className="create-box" onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <Table>
                        <thead>
                            <tr className="table-success">
                                <th>
                                    <h2>ต้นทาง / ผู้จัดส่ง</h2>
                                    <Button onClick={() => console.log(getValues())}>Show</Button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="create-header-content">
                                    {/* <div>
                                        <label>API KEY!</label>
                                        <input name="api_key" ref={register} type="text" />
                                    </div> */}
                                    <div>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    email
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl name="email" ref={register} type="text" />
                                        </InputGroup>
                                    </div>
                                    <div>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    ชื่อ - นามสกุล
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl name={`from.name`} ref={register} />
                                        </InputGroup>
                                    </div>
                                    <div>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    ที่อยู่
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl name={`from.address`} ref={register} type="text" />
                                        </InputGroup>
                                    </div>
                                    <div>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    รหัสไปรษณีย์
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl name={`from.postcode`} ref={register} type="text" />
                                        </InputGroup>
                                    </div>
                                    <div>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    เบอร์โทร
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl name={`from.tel`} ref={register} type="text" />
                                        </InputGroup>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
                <Container>
                    <Table>
                        <thead>
                            <tr className="table-success">
                                <th>
                                    <h2>ปลายทาง / ผู้รับ</h2>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="create-body-content">
                                    {dynamicTo.map((item, key) =>
                                        <div className="create-border-destination" key={key}>
                                            {dynamicTo.length - 1 == key && key != 0 && <div className="remove" onClick={removeLastDest}>-</div>}
                                            <div>
                                                <div>
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>
                                                                ชื่อ - นามสกุล
                                                            </InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <FormControl onInput={() => addMore(key)} name={`data[${key}].to.name`} ref={register} />
                                                    </InputGroup>
                                                </div>
                                                <div>
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>
                                                                ที่อยู่
                                                            </InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <FormControl onInput={() => addMore(key)} name={`data[${key}].to.address`} ref={register} type="textArea" />
                                                    </InputGroup>
                                                </div>
                                                <div>
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>
                                                                รหัสไปรษณีย์
                                                            </InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <FormControl onInput={() => addMore(key)} name={`data[${key}].to.postcode`} ref={register} type="text" />
                                                    </InputGroup>
                                                </div>
                                                <div>
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>
                                                                เบอร์โทร
                                                            </InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <FormControl onInput={() => addMore(key)} name={`data[${key}].to.tel`} ref={register} type="text" />
                                                    </InputGroup>
                                                </div>
                                            </div>
                                            {/* <h2>พัสดุไปรษณีย์ </h2> */}
                                            {
                                                item.showMore && <div>
                                                    <div>
                                                        <InputGroup>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text>
                                                                    ชื่อ
                                                            </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <FormControl name={`data[${key}].parcel.name`} ref={register} type="text" />
                                                        </InputGroup>
                                                    </div>
                                                    <div>
                                                        <InputGroup>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text>
                                                                    น้ำหนัก
                                                            </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <FormControl name={`data[${key}].parcel.weight`} ref={register} type="text" />
                                                        </InputGroup>
                                                    </div>
                                                    <div>
                                                        <InputGroup>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text>
                                                                    ความกว้าง
                                                            </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <FormControl name={`data[${key}].parcel.width`} ref={register} type="text" />
                                                        </InputGroup>
                                                    </div>
                                                    <div>
                                                        <InputGroup>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text>
                                                                    ความยาว
                                                            </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <FormControl name={`data[${key}].parcel.length`} ref={register} type="text" />
                                                        </InputGroup>
                                                    </div>
                                                    <div>
                                                        <InputGroup>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text>
                                                                    ความสูง
                                                            </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <FormControl name={`data[${key}].parcel.height`} ref={register} type="text" />
                                                        </InputGroup>
                                                    </div>
                                                    <div>
                                                        <InputGroup>
                                                            <DropdownButton
                                                                as={InputGroup.Append}
                                                                variant="outline-secondary"
                                                                title="Courier Code"
                                                                id="input-group-dropdown-2"
                                                                name={`data[${key}].courier_code`}
                                                                ref={register}
                                                                defaultValue="THP"
                                                            >
                                                                <Dropdown.Item value="THP">ไปรษณีย์ไทย EMS</Dropdown.Item>
                                                                <Dropdown.Item value="TP2">ไปรษณีย์ ลงทะเบียน</Dropdown.Item>
                                                                <Dropdown.Item value="APF">Alphafast</Dropdown.Item>
                                                                <Dropdown.Item value="KRY">Kerry Express</Dropdown.Item>
                                                                <Dropdown.Item value="RSB">Rush Bike</Dropdown.Item>
                                                                <Dropdown.Item value="SKT">Skootar</Dropdown.Item>
                                                                <Dropdown.Item value="SCG">SCG Yamato Express</Dropdown.Item>
                                                                <Dropdown.Item value="SCGC">SCG Yamato Express Chilled</Dropdown.Item>
                                                                <Dropdown.Item value="SCGF">SCG Yamato Express Frozen</Dropdown.Item>
                                                                <Dropdown.Item value="DHL">DHL</Dropdown.Item>
                                                                <Dropdown.Item value="LLM">Lalamove</Dropdown.Item>
                                                                <Dropdown.Item value="NKS">Niko Logistic</Dropdown.Item>
                                                                <Dropdown.Item value="NJV">Ninjavan</Dropdown.Item>
                                                                <Dropdown.Item value="CJE">CJ Logistics</Dropdown.Item>
                                                                <Dropdown.Item value="FLE">Flash Express</Dropdown.Item>
                                                                <Dropdown.Item value="JNTP">J&T Express Pickup </Dropdown.Item>
                                                                <Dropdown.Item value="JNTD">J&T Express Dropoff </Dropdown.Item>
                                                                <Dropdown.Item value="POM">Popman</Dropdown.Item>
                                                            </DropdownButton>
                                                            <Dropdown.Divider />
                                                            <FormControl />
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                            }
                                            <div onClick={() => showMore(key)}>
                                                <div type="button" className="showMore">{item.showMore ? "-" : "+"}</div>
                                                <label>{item.showMore ? "แสดงน้อยลง" : "แสดงเพิ่มเติม"}</label>
                                            </div>
                                        </div>
                                    )}
                                    <button type="submit">สร้างรายการส่งของ</button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </form>
        </div >
    )
}

export default Create
