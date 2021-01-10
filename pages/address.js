import React from 'react'

const Address = () => {
    return (
        <div className="address-container">
            <div className="table-wraper">
                <table>
                    <tr>
                        <th>#</th>
                        <th>ชื่อผู้ส่ง</th>
                        <th>ที่อยู่</th>
                        <th>รหัสไปรษณีย์</th>
                    </tr>
                    <tr>
                        <td><input type="checkbox" /></td>
                        <td>Address</td>
                        <td>Address</td>
                        <td>Address</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Address
