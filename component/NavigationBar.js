import React, { useState, useEffect, useRef, useContext, createRef } from 'react'
import { TweenMax } from 'gsap'
import Link from 'next/link'
import GlobalState from '../utils/context'
import Image from 'next/image'
import { Overlay, Popover, Accordion, Card, ListGroup } from 'react-bootstrap'

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
            {
                name: 'ออกจากระบบ',
                url: "/logout"
            }
        ]
    }
]

const navigationListNotAuthenticated = [
    {
        name: 'ลงชื่อเข้าใช้',
        icon: "user.svg",
        children: [
            {
                name: 'ข้อมูลราคาขนส่ง',
                url: "/courier_rate"
            },
            {
                name: 'ลงชื่อเข้าใช้',
                url: "/login"
            }
        ]
    }
]

const NavigationBar = () => {
    const { user } = useContext(GlobalState)
    const [target, setTarget] = useState(null)
    const [show, setShow] = useState(true)
    const [dynamicChildren, setDynamicChildren] = useState([])
    const navRef = useRef()
    const mobileNavRef = useRef()
    const hamMenuRef = useRef()

    const handleNavSelect = (event, children) => {
        // dynamicChildren[0] != children[0] ? setShow(true) : setShow(true)
        event.target == target ? setShow(!show) : setShow(true)
        setTarget(event.target)
        setDynamicChildren(children)
    }

    const hideNavSelect = (e) => {
        // setShow(false)
        // target == e.target && setShow(false)
        !navRef.current.contains(e.target) && setShow(false)
    }

    const hideMobileNav = e => {
        if (!mobileNavRef.current.contains(e.target) && !hamMenuRef.current.contains(e.target)) {
            mobileNavRef.current.style.display = "none"
            if (window.screen.width < 768) hamMenuRef.current.style.display = "flex"
        }
    }

    const showMobileNav = () => {
        mobileNavRef.current.style.display = "flex"
        hamMenuRef.current.style.display = "none"
    }

    const toggleMobileNav = () => {
        hamMenuRef.current.style.display = "flex"
        mobileNavRef.current.style.display = "none"
    }

    useEffect(() => {
        // TweenMax.from(menuRef.current, 1, { opacity: 0 })
        document.addEventListener('click', hideNavSelect)
        document.addEventListener('click', hideMobileNav)
        return () => {
            document.removeEventListener('click', hideNavSelect)
            document.removeEventListener('click', hideMobileNav)
        }
    }, [])

    return (
        <div>
            <div className="nav-desktop-container" ref={navRef}>
                {
                    user && <Link href='/'>
                        <a className="main">
                            หน้าแรก
                        </a>
                    </Link>
                }

                {
                    user && navigationListAuthenticated.map((navigation, index) => {
                        const { name } = navigation
                        return <div
                            className="navbar-menu"
                            key={index}
                            onClick={e => handleNavSelect(e, navigation.children)}
                        >
                            <Image style={{ marginRight: 5 }} src={navigation.icon ? "/" + navigation.icon : "/"} width={20} height={20} alt="packages" />
                            <p>{name}</p>
                            <Image src="/down-arrow.svg" width={10} height={10} alt="down-arrow" />
                        </div>
                    })
                }

                {
                    !user && navigationListNotAuthenticated.map((navigation, index) => {
                        const { name } = navigation
                        return <div
                            className="navbar-menu"
                            key={index}
                            onClick={e => handleNavSelect(e, navigation.children)}
                        >
                            <Image style={{ marginRight: 5 }} src={navigation.icon ? "/" + navigation.icon : "/"} width={20} height={20} alt="packages" />
                            <p>{name}</p>
                            <Image src="/down-arrow.svg" width={10} height={10} alt="down-arrow" />
                        </div>
                    })
                }

                {
                    user && navigationListAuthenticated.map(navigation => {
                        return <Overlay
                            key={navigation.name}
                            show={show}
                            target={target}
                            placement="bottom"
                            container={navRef.current}
                            // containerPadding={20}
                            className="nav-select"
                        >
                            <Popover id="popover-contained">
                                <Popover.Content>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        {
                                            dynamicChildren && dynamicChildren.map((child, indexChild) => {
                                                const { name, url } = child
                                                return <Link key={indexChild} href={url}>
                                                    <a className="text-nav">{name}</a>
                                                </Link>
                                            })
                                        }
                                    </div>
                                </Popover.Content>
                            </Popover>
                        </Overlay>
                    })
                }
                {
                    !user && navigationListNotAuthenticated.map(navigation => {
                        return <Overlay
                            key={navigation.name}
                            show={show}
                            target={target}
                            placement="bottom"
                            container={navRef.current}
                            // containerPadding={20}
                            className="nav-select"
                        >
                            <Popover id="popover-contained">
                                <Popover.Content>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        {
                                            dynamicChildren && dynamicChildren.map((child, indexChild) => {
                                                const { name, url } = child
                                                return <Link key={indexChild} href={url}>
                                                    <a className="text-nav">{name}</a>
                                                </Link>
                                            })
                                        }
                                    </div>
                                </Popover.Content>
                            </Popover>
                        </Overlay>
                    })
                }
            </div>

            <div onClick={showMobileNav} className="ham-menu" ref={hamMenuRef}>
                <Image src="/menu-button-of-three-horizontal-lines.svg" width={50} height={50} />
            </div>
            <Accordion defaultActiveKey="0" onClick={hideMobileNav} className="nav-mobile-container" ref={mobileNavRef}>
                <Card onClick={toggleMobileNav}>
                    <ListGroup id="nav-mobile-close">
                        <ListGroup.Item id="nav-mobile-close-img">
                            <Image src="/close-cross-in-circular-outlined-interface-button.svg" width={20} height={20} />
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                {user && <Card>
                    <ListGroup>
                        <Link href='/'>
                            <ListGroup.Item style={{ background: "#cae9c3" }}>
                                <Image src="/home.svg" width={20} height={20} />
                                <a style={{ marginLeft: 5, textDecoration: "none" }} className="main">หน้าแรก</a>
                            </ListGroup.Item>
                        </Link>
                    </ListGroup>
                </Card>
                }
                {
                    user && navigationListAuthenticated.map((navigation, index) => {
                        const { name } = navigation
                        return <Card className={index}>
                            <Accordion.Toggle as={Card.Header} eventKey={index.toString()} className="mobile-nav-menu">
                                <Image style={{ marginRight: 5 }} src={navigation.icon ? "/" + navigation.icon : "/"} width={20} height={20} alt="packages" />
                                <p>{name}</p>
                                <Image src="/down-arrow.svg" width={10} height={10} alt="down-arrow" />
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={index.toString()}>
                                <ListGroup className="mobile-list-url">
                                    {navigation.children.map((item, key) => {
                                        const { name, url } = item
                                        return <ListGroup.Item key={item.name} onClick={toggleMobileNav}>
                                            <Link key={key} href={url}>
                                                <a className="mobile-text-nav">{name}</a>
                                            </Link>
                                        </ListGroup.Item>
                                    })}
                                </ListGroup>
                            </Accordion.Collapse>
                        </Card>
                    })
                }
                {
                    !user && navigationListNotAuthenticated.map((navigation, index) => {
                        const { name } = navigation
                        return <Card className={index}>
                            <Accordion.Toggle as={Card.Header} eventKey={index.toString()} className="mobile-nav-menu">
                                <Image style={{ marginRight: 5 }} src={navigation.icon ? "/" + navigation.icon : "/"} width={20} height={20} alt="packages" />
                                <p>{name}</p>
                                <Image src="/down-arrow.svg" width={10} height={10} alt="down-arrow" />
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={index.toString()}>
                                <ListGroup className="mobile-list-url">
                                    {navigation.children.map((item, key) => {
                                        const { name, url } = item
                                        return <ListGroup.Item key={key} onClick={toggleMobileNav}>
                                            <Link key={key} href={url}>
                                                <a className="mobile-text-nav">{name}</a>
                                            </Link>
                                        </ListGroup.Item>
                                    })}
                                </ListGroup>
                            </Accordion.Collapse>
                        </Card>
                    })
                }
            </Accordion>
        </div>
    )
}

export default NavigationBar