import React, { useEffect, useRef, useState } from 'react'
import { useFetch } from 'use-http'
import { auth, firebase } from '../utils/firebase'
import PhoneInput from 'react-phone-input-2'
import Container from '../component/Container'
import { useForm } from 'react-hook-form'

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [otp, setOtp] = useState("")
    const [token, setToken] = useState("")
    const recaptchaRef = useRef()
    const { register, handleSubmit, errors } = useForm()

    const onSubmit = (otp) => {
        setOtp(otp)
    }

    const sendVerificationCode = () => {
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        auth.signInWithPhoneNumber("+" + phoneNumber, appVerifier)
            .then(confirmationResult => {
                setToken(confirmationResult.verificationId)
            })
    }

    const signInWithPhone = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(token, otp);
        auth.signInWithCredential(credential)
            .then(() => {
                console.log('success')
                if (state) message.success('Login success')
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
        <div className="login-container">
            <Container>
                <div className="get-code">
                    <label className="login-exclude">Phone Number</label>
                    <div className="get-phone">
                        <PhoneInput
                            country={'th'}
                            value={phoneNumber}
                            onChange={phone => setPhoneNumber(phone)}
                        />
                        <div ref={recaptchaRef}></div>
                        <button onClick={sendVerificationCode}>Get Code</button>
                        <form className="login-button-login" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <input
                                    name="otp"
                                    ref={register}
                                    type="text"
                                />
                            </div>
                            <div>
                                <button type="submit" onClick={signInWithPhone}>Login/Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Login
