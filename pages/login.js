import React, { useEffect, useRef, useState } from 'react'
import { useFetch } from 'use-http'
import { auth, firebase } from '../utils/firebase'
import PhoneInput from 'react-phone-input-2'
import Container from '../component/Container'
import { useForm } from 'react-hook-form'
import { message } from 'antd'
import Router from 'next/router'

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    // const [otp, setOtp] = useState("")
    const [token, setToken] = useState("")
    const recaptchaRef = useRef()
    const [showInputOtpCode, setShowInputOtpCode] = useState(false)
    const { register, handleSubmit, errors } = useForm()

    const onSubmit = ({ otp }) => {
        console.log(otp)
        // setOtp(otp)
        signInWithPhone(otp)
    }

    const sendVerificationCode = () => {
        setShowInputOtpCode(true)
        const appVerifier = window.recaptchaVerifier;
        auth.signInWithPhoneNumber("+" + phoneNumber, appVerifier)
            .then(confirmationResult => {
                setToken(confirmationResult.verificationId)
            })
    }

    const signInWithPhone = (otp) => {
        const credential = firebase.auth.PhoneAuthProvider.credential(token, otp);
        auth.signInWithCredential(credential)
            .then(() => {
                console.log('success')
                message.success('Login success')
                Router.push('/')
            })
            .catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptchaRef.current);
        recaptchaVerifier.render().then(widgetId => {
            window.recaptchaWidgetId = widgetId;
        })
    }, [])

    const { post, request } = useFetch('https://cors-anywhere.herokuapp.com/https://business.shippop.dev/login/', { cachePolicy: "no-cache", headers: { "content-type": "application/x-www-form-urlencoded" } })

    return (
        <div className="wrap-login">
            <div className="login-container">
                <Container>
                    <div className="wrap-login-container">
                        <h1>เข้าสู่ระบบ</h1>
                        <div className="get-code">
                            <div>
                                <div className="get-phone">
                                    <label className="login-exclude">Phone Number</label>
                                    <PhoneInput
                                        country={'th'}
                                        value={phoneNumber}
                                        onChange={phone => setPhoneNumber(phone)}
                                    />
                                    <div ref={recaptchaRef}></div>
                                </div>
                                <button onClick={sendVerificationCode} style={{ margin: "5px 0 0 0" }} id="get-code-button">Get Code</button>
                                {
                                    showInputOtpCode &&
                                    <form className="login-button-login" onSubmit={handleSubmit(onSubmit)}>
                                        <div>
                                            <div>
                                                <label className="login-exclude" style={{ margin: "5px 0 0 0" }}>Verification Code</label>
                                            </div>
                                            <input
                                                name="otp"
                                                ref={register}
                                                type="text"
                                            />
                                        </div>
                                        <div>
                                            <button type="submit" style={{ margin: "5px 0 0 0" }}>Login/Register</button>
                                        </div>
                                    </form>
                                }
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Login
