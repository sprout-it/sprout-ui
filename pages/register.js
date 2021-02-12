import React, { useState } from 'react'
import { auth } from '../utils/firebase'
import Container from '../component/Container'
import Router from 'next/router'
import { Button, Form } from 'react-bootstrap'
import { message } from 'antd'

const Register = () => {
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const handleSubmit = () => {
        const { email, password } = form
        auth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                if (res.user) {
                    message.success('สมัครสมาชิกแล้วระบบจะพาท่านไปยังหน้าเข้าสู่ระบบ')
                    Router.push('login')
                }
            })
            .catch(err => console.error(err))
    }

    const handleChange = (e) => {
        console.log(e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return <div className="register-container">
        <Container>
            <h1>Register</h1>
            <Form method="post" onSubmit={e => {
                e.preventDefault()
            }}>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control size="lg" type="text" name="email" onChange={handleChange} />
                    <Form.Label>Password</Form.Label>
                    <Form.Control size="lg" type="password" name="password" onChange={handleChange} />
                    <Button type="submit" onClick={handleSubmit}>Register</Button>
                </Form.Group>
            </Form>
        </Container>
    </div>
}

export default Register