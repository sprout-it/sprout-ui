import React from 'react'
import { Input } from 'antd';
import { useForm } from 'react-hook-form'
import { Button } from 'antd'
const handleSearch = (e) => {
    console.log(e);
}

const Create = () => {
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => console.log(data);
    return (
        <div className="create-container">
            <h1>สร้างรายการ</h1>
            <form className="create-box" onSubmit={handleSubmit(onSubmit)}>
                <h2>ต้นทาง / ผู้จัดส่ง</h2>
                <label>ชื่อผู้ส่ง</label>
                <input name="search" ref={register} className="create-input" required enterButton="สวัสดี" onSearch={handleSearch} />
                <label>เบอร์โทร</label>
                <input ref={register} type="text" />
                <label>ที่อยู่</label>
                <input name="address" ref={register} type="textArea" />
                <label>รหัสไปรษณีย์</label>
                <input name="address.zipcode" ref={register} type="text" />
                <input type="submit" value="Submit" />
            </form>
            <div className="create-box">
                <h2>ปลายทาง / ผู้รับ</h2>

            </div>
        </div>
    )
}

export default Create
