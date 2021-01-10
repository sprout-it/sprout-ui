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
                <Input.Search className="create-input" enterButton="สวัสดี" onSearch={handleSearch} />
                <Input type="text" />
                <Input.TextArea type="text" />
                <Input type="text" />
            </div>
            <div className="create-box">
                <h2>ปลายทาง / ผู้รับ</h2>

            </div>
        </div>
    )
}

export default Create
