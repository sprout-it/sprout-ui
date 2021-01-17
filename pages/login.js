import React from 'react'
import { useFetch } from 'use-http'

const Login = () => {
    const { post, request } = useFetch('https://cors-anywhere.herokuapp.com/https://business.shippop.dev/login/', { cachePolicy: "no-cache", headers: { "content-type": "application/x-www-form-urlencoded" } })
    return (
        <div>
            <button onClick={async () => {
                const data = await post('/', { email: "josh@imtgroupco.com", password: "123467" })
                console.log(data)
                console.log(request.data)
            }}>
                {/* <input type="text" name="email" />
                <input type="text" name="password" /> */}
                send
            </button>
        </div>
    )
}

export default Login
