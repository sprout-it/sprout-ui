import React, { useState, useEffect, useRef } from 'react'
import { DownOutlined } from '@ant-design/icons';
import { TweenMax } from 'gsap'

const navigationList = [
    {
        name: 'รายการส่งของ',
        children: [
            {
                name: 'ดูรายการทั้งหมด'
            },
            {
                name: 'พิมพ์ใบจัดส่ง/ปะหน้า'
            },
            {
                name: 'สร้างรายการ'
            },
            {
                name: 'สร้างรายการจากไฟล์'
            },
            {
                name: 'รายการขนส่งที่เกิดปัญหา'
            }
        ]
    },
    {
        name: 'รายงานทางบัญชี',
        children: [
            {
                name: 'รายการค้างชำระ'
            },
            {
                name: 'รายงานใบเสร็จรับเงิน'
            },
            {
                name: 'รายงานความคุ้มครองพัสดุ'
            }
        ]
    },
    {
        name: 'ที่อยู่',
        children: [
            {
                name: 'ต้นทาง/ผู้จัดส่ง'
            }
        ]
    },
    {
        name: 'ตั้งค่า',
        children: [
            {
                name: 'ข้อมูลส่วนตัว'
            },
            {
                name: 'ข้อมูลราคาขนส่ง'
            },
            {
                name: 'แก้ไขรหัสผ่าน'
            },
            {
                name: 'ออกจากระบบ'
            }
        ]
    }
]

const NavigationBar = () => {
    const [navSelect, setNavSelect] = useState(null)
    const menuRef = useRef()
    const navRef = useRef()
    const handleNavSelect = (index) => {
        navSelect == index ? setNavSelect(null) : setNavSelect(index)
    }

    const hideNavSelect = (e) => {
        navSelect != null && navRef.current != e.target && setNavSelect(null)
    }

    useEffect(() => {
        navRef.current != null && TweenMax.from(navRef.current, .25, { height: 0 })
        // TweenMax.from(menuRef.current, 1, { opacity: 0 })
        document.addEventListener('click', hideNavSelect)
        return () => document.removeEventListener('click', hideNavSelect)
    }, [navSelect, navRef])

    return (
        <div className="navigationBar">
            {
                navigationList.map((navigation, index) => {
                    const { name, children } = navigation
                    return <div
                        className="navbar-menu"
                        key={index}
                        onClick={(e) => {
                            handleNavSelect(index)
                        }}
                    >
                        <div>{name}<DownOutlined /></div>
                        {
                            navSelect === index && <div
                                ref={navRef}
                                className="nav-select"
                            >
                                {
                                    children.map((child, indexChild) => {
                                        const { name } = child
                                        return <p ref={menuRef} className="text-nav" key={indexChild}>{name}</p>
                                    })
                                }
                            </div>
                        }
                    </div>
                })
            }

        </div>
    )
}

export default NavigationBar
