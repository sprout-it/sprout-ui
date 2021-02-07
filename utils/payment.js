const axios = require('axios');
const json = {
    amount: 20,
    orderId: 500,
    returnUri: "http://localhost:3000",
    email: "ex@mail.com",
    packages: [
        {
            id: 50,
            name: "helloWorld",
            amount: 20,
            products: [
                {
                    name: "hello",
                    quantity: 5,
                    price: 500,
                }
            ]
        }
    ],
    currency: "thb"
}

axios.post('https://payment.sproutstory.co/api/pay', json, {
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'multipart/form-data',
    }
})
    .then(res => console.log(res.data))
    .catch(err => console.error(err.message))
