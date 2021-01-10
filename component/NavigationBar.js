import React, { useState, useEffect, useRef } from 'react'
import { DownOutlined } from '@ant-design/icons';
import { TweenMax } from 'gsap'
import Link from 'next/link'

const navigationList = [
    {
        name: 'รายการส่งของ',
        children: [
            {
                name: 'ดูรายการทั้งหมด',
                url: "/order/view"
            },
            {
                name: 'พิมพ์ใบจัดส่ง/ปะหน้า',
                url: "/order/purchase"
            },
            {
                name: 'สร้างรายการ',
                url: "/order/create"
            },
            {
                name: 'สร้างรายการจากไฟล์',
                url: "/order/upload"
            },
            {
                name: 'รายการขนส่งที่เกิดปัญหา',
                url: "/report/order/problam"
            }
        ]
    },
    {
        name: 'รายงานทางบัญชี',
        children: [
            {
                name: 'รายงานทางบัญชี',
                url: "/report"
            },
            {
                name: 'รายการค้างชำระ',
                url: "/report/invoice"
            },
            {
                name: 'รายงานใบเสร็จรับเงิน',
                url: "/report/receipt"
            },
            {
                name: 'รายงานความคุ้มครองพัสดุ',
                url: "/report/order/insurance"
            }
        ]
    },
    {
        name: 'ที่อยู่',
        children: [
            {
                name: 'ต้นทาง/ผู้จัดส่ง',
                url: "/address"
            }
        ]
    },
    {
        name: 'ตั้งค่า',
        children: [
            {
                name: 'ข้อมูลส่วนตัว',
                url: "/profile"
            },
            {
                name: 'ข้อมูลราคาขนส่ง',
                url: "/courier_rate"
            },
            {
                name: 'แก้ไขรหัสผ่าน',
                url: "/reset_password"
            },
            {
                name: 'ออกจากระบบ',
                url: "/logout"
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
                                        const { name, url } = child
                                        return <Link href={url}>
                                            <a ref={menuRef} className="text-nav" key={indexChild}>{name}</a>
                                        </Link>
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
