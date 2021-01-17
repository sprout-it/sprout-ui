import React, { useEffect, useState } from 'react'
import useFetch from 'use-http'
import { useForm } from 'react-hook-form'
import { firestore, firebase } from '../../utils/firebase'
const { NEXT_PUBLIC_ENDPOINT_URL } = process.env

const Create = () => {
    const dataRef = firestore.collection('order')
    const { register, handleSubmit, errors } = useForm()
    const [dynamicTo, setDynamicTo] = useState([{}])
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
        const myPost = await post(convertForm)
        console.log(myPost)
        Object.values(myPost.data).map(async item => {
            await dataRef.add({
                ...item,
                purchase_id: myPost.purchase_id,
                total_price: myPost.total_price,
                created: date.toISOString().slice(0, 10)
            })
        })
    }

    const addMore = () => {
        let add = dynamicTo
        add.push({})
        setDynamicTo(add)
    }

    useEffect(() => {
        // dataRef.onSnapshot(snapshort => {
        //     snapshort.docChanges().forEach(doc => {
        //         if (doc.type == "")
        //             console.log(doc.doc.data())
        //     })
        // })
        // console.log(date.toISOString())
    }, [])

    return (
        <div className="create-container">
            <h1>สร้างรายการ</h1>
            <form className="create-box" onSubmit={handleSubmit(onSubmit)}>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <h2>ต้นทาง / ผู้จัดส่ง</h2>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div>
                                    <label>API KEY!</label>
                                    <input name="api_key" ref={register} type="text" />
                                </div>
                                <div>
                                    <label>email</label>
                                    <input name="email" ref={register} type="text" />
                                </div>
                                <div>
                                    <label>ชื่อ - นามสกุล</label>
                                    <input name={`from.name`} ref={register} />
                                </div>
                                <div>
                                    <label>ที่อยู่</label>
                                    <input name={`from.address`} ref={register} type="textArea" />
                                </div>
                                <div>
                                    <label>รหัสไปรษณีย์</label>
                                    <input name={`from.postcode`} ref={register} type="text" />
                                </div>
                                <div>
                                    <label>เบอร์โทร</label>
                                    <input name={`from.tel`} ref={register} type="text" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <h2>ปลายทาง / ผู้รับ</h2>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {dynamicTo.map((_item, key) =>
                                    <div key={key}>
                                        <div>
                                            <label>ชื่อ - นามสกุล</label>
                                            <input name={`data[${key}].to.name`} ref={register} />
                                        </div>
                                        <div>
                                            <label>ที่อยู่</label>
                                            <input name={`data[${key}].to.address`} ref={register} type="textArea" />
                                        </div>
                                        <div>
                                            <label>รหัสไปรษณีย์</label>
                                            <input name={`data[${key}].to.postcode`} ref={register} type="text" />
                                        </div>
                                        <div>
                                            <label>เบอร์โทร</label>
                                            <input name={`data[${key}].to.tel`} ref={register} type="text" />
                                        </div>

                                        <h2>พัสดุไปรษณีย์</h2>
                                        <div>
                                            <label>ชื่อ</label>
                                            <input name={`data[${key}].parcel.name`} ref={register} type="text" />
                                        </div>
                                        <div>
                                            <label>น้ำหนัก</label>
                                            <input name={`data[${key}].parcel.weight`} ref={register} type="text" />
                                        </div>
                                        <div>
                                            <label>ความกว้าง</label>
                                            <input name={`data[${key}].parcel.width`} ref={register} type="text" />
                                        </div>
                                        <div>
                                            <label>ความยาว</label>
                                            <input name={`data[${key}].parcel.length`} ref={register} type="text" />
                                        </div>
                                        <div>
                                            <label>ความสูง</label>
                                            <input name={`data[${key}].parcel.height`} ref={register} type="text" />
                                        </div>
                                        <div>
                                            <label>Courier Code</label>
                                            <select name={`data[${key}].courier_code`} ref={register} className="form-control">
                                                <option value="THP">ไปรษณีย์ไทย EMS</option>
                                                <option value="TP2">ไปรษณีย์ ลงทะเบียน</option>
                                                <option value="APF">Alphafast</option>
                                                <option value="KRY">Kerry Express</option>
                                                <option value="RSB">Rush Bike</option>
                                                <option value="SKT">Skootar</option>
                                                <option value="SCG">SCG Yamato Express</option>
                                                <option value="SCGC">SCG Yamato Express Chilled</option>
                                                <option value="SCGF">SCG Yamato Express Frozen</option>
                                                <option value="DHL">DHL</option>
                                                <option value="LLM">Lalamove</option>
                                                <option value="NKS">Niko Logistic</option>
                                                <option value="NJV">Ninjavan</option>
                                                <option value="CJE">CJ Logistics</option>
                                                <option value="FLE">Flash Express</option>
                                                <option value="JNTP">J&T Express Pickup </option>
                                                <option value="JNTD">J&T Express Dropoff </option>
                                                <option value="POM">Popman</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="text" onClick={addMore}>+</button>
                <input type="submit" value="Submit" />
            </form>
        </div >
    )
}

export default Create
