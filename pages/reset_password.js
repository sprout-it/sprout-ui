import React from 'react'
import { useForm } from 'react-hook-form'
const Reset_password = () => {
    const { register, handleSubmit, errors } = useForm(); // initialize the hook

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="reset-password">
            <h1>แก้ไขรหัสผ่าน</h1>
            <form className="reset-form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>รหัสผ่านเดิม</label>
                    <input type="password" />
                </div>
                <div>
                    <label>รหัสผ่านใหม่</label>
                    <input type="password" />
                    <p>รูปแบบรหัสผ่าน :</p>
                    <p>1.มีความยาวมากกว่า 6 หลักแต่ไม่เกิน 20 ตัวอักษร</p>
                    <p>2.ห้ามพิมพ์ภาษาไทยเเละห้ามมีช่างว่าง</p>
                    <p>3.ต้องใช้ตัวอักษรภาษาอังกฤษ (a-z,A-Z) ตัวอักขระ และตัวเลข(0-9) เท่านั้น</p>
                </div>
                <div>
                    <label>ยืนยันรหัสผ่านใหม่</label>
                    <input type="password" />
                </div>
            </form>
        </div>
    )
}

export default Reset_password
