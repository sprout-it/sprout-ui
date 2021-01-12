import React from 'react'
import { Input, Button } from 'antd';

const handleSearch = (e) => {
    console.log(e);
}

const Create = () => {
    return (
        <div className="create-container">
            <h1>สร้างรายการ</h1>
            <div className="create-box">
                <h2>ต้นทาง / ผู้จัดส่ง</h2>
                <label>ชื่อผู้ส่ง</label>
                <Input.Search className="create-input" required enterButton="สวัสดี" onSearch={handleSearch} />
                <label>เบอร์โทร</label>
                <Input type="text" />
                <label>ที่อยู่</label>
                <Input.TextArea type="text" />
                <label>รหัสไปรษณีย์</label>
                <Input type="text" />
            </div>
            <div className="create-box">
                <h2>ปลายทาง / ผู้รับ</h2>

            </div>
        </div>
    )
}

export default Create
