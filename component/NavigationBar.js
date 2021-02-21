import React, { useContext } from 'react'
import { TweenMax } from 'gsap'
import Link from 'next/link'
import GlobalState from '../utils/context'
import Image from 'next/image'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

const navigationListAuthenticated = [
    {
        name: 'รายการส่งของ',
        icon: "supplies.svg",
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
            // {
            //     name: 'สร้างรายการจากไฟล์',
            //     url: "/order/upload"
            // },
            // {
            //     name: 'รายการขนส่งที่เกิดปัญหา',
            //     url: "/report/order/problam"
            // }
        ],
    },
    // {
    //     name: 'รายงานทางบัญชี',
    //     icon: "bill.svg",
    //     children: [
    //         {
    //             name: 'รายงานทางบัญชี',
    //             url: "/report"
    //         },
    //         {
    //             name: 'รายการค้างชำระ',
    //             url: "/report/invoice"
    //         },
    //         {
    //             name: 'รายงานใบเสร็จรับเงิน',
    //             url: "/report/receipt"
    //         },
    //         // {
    //         //     name: 'รายงานความคุ้มครองพัสดุ',
    //         //     url: "/report/order/insurance"
    //         // }
    //     ]
    // },
    {
        name: 'ที่อยู่',
        icon: "address.svg",
        children: [
            {
                name: 'ต้นทาง/ผู้จัดส่ง',
                url: "/address/origin"
            }
        ]
    },
    {
        name: 'ตั้งค่า',
        icon: "settings.svg",
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
            // {
            //     name: 'ออกจากระบบ',
            //     url: "/logout"
            // }
        ]
    }
]

const NavigationBar = () => {
    const { user } = useContext(GlobalState)
    return <>
        {
            user &&
            <Navbar collapseOnSelect expand="lg" style={{ background: "rgb(195, 230, 203)" }} >
                <Link href="/">
                    <Navbar.Brand>
                        <a>Home</a>
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                        {
                            navigationListAuthenticated.map(item =>
                                <div style={{ display: 'flex' }}>
                                    <Image
                                        style={{ marginRight: 5 }}
                                        src={item.icon ? "/" + item.icon : "/"}
                                        width={20}
                                        height={20}
                                        alt="packages"
                                    />
                                    <div
                                        key={item.name}
                                        style={{
                                            display: 'flex',
                                            marginRight: 5,
                                            marginLeft: 5
                                        }}
                                    >
                                        <NavDropdown title={item.name}>
                                            {
                                                item.children.map(child =>
                                                    <Link
                                                        key={child.url}
                                                        href={child.url}
                                                    >
                                                        <NavDropdown.Item
                                                            href={child.url}
                                                        >
                                                            {child.name}
                                                        </NavDropdown.Item>
                                                    </Link>
                                                )
                                            }
                                        </NavDropdown>
                                    </div>
                                </div>
                            )
                        }
                    </Nav>
                    <Nav>
                        <Nav.Link href="/logout">
                            <Image
                                style={{ marginRight: 5 }}
                                src='/logout.svg'
                                width={20}
                                height={20}
                                alt="packages"
                            />
                        ออกจากระบบ
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        }

        {
            !user &&
            <Navbar collapseOnSelect expand="lg" style={{ background: "rgb(195, 230, 203)" }} >
                <Nav className="mr-auto"></Nav>
                <Nav>
                    <Nav.Link href="/logout">
                        <Image
                            style={{ marginRight: 5 }}
                            src='/user.svg'
                            width={20}
                            height={20}
                            alt="packages"
                        />
                        เข้าสู่ระบบ
                    </Nav.Link>
                </Nav>
            </Navbar>
        }
    </>
}

export const getStaticProps = () => {
    return { props: "" }
}

export default NavigationBar