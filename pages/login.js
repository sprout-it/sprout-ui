import React, { useState } from 'react'
import { auth } from '../utils/firebase'
import Container from '../component/Container'
import Router from 'next/router'
import { Button, Form } from 'react-bootstrap'
import { message } from 'antd'

const Login = () => {
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const handleSubmit = () => {
        const { email, password } = form
        auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                if (res.user) {
                    message.success('ท่านเข้าสู่ระบบแล้ว')
                    Router.push('/')
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
            <h1>Login</h1>
            <Form method="post" onSubmit={e => {
                e.preventDefault()
            }}>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control size="lg" type="text" name="email" onChange={handleChange} />
                    <Form.Label>Password</Form.Label>
                    <Form.Control size="lg" type="password" name="password" onChange={handleChange} />
                    <Button style={{ marginTop: 5 }} type="submit" onClick={handleSubmit}>Login</Button>
                </Form.Group>
            </Form>
            <div style={{ textAlign: 'center' }}>
                <h2 >สมัครสมาชิก</h2>
                <Button variant="success" style={{ marginTop: 5, marginBottom: 5 }} onClick={() => Router.push('/register')}>Register</Button>
                <h6 >หากท่านยังไม่ได้เป็นสมาชิก</h6>
            </div>
        </Container>
    </div>
}

export default Login