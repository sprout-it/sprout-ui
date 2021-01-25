import React, { useEffect, useContext } from 'react'
import GlobalState from '../utils/context'

const Logout = () => {
    const { signOut } = useContext(GlobalState)
    useEffect(() => signOut(), [])
    return (
        <div style={{ minHeight: "100vh" }}>
            กำลังออกจากระบบ
        </div>
    )
}

export default Logout
