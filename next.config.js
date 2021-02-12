const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withLess = require('@zeit/next-less')
module.exports = {
    withCSS: () => (withLess(withImages(withSass({
        env: {
            ANY_ENV_KEY: "ANY_ENV_VARIABLE"
        }
    })))),
    exportPathMap: () => {
        return {
            '/': { page: '/' },
            '/address/origin': { page: '/address/origin' },
            '/address/origin/create': { page: '/address/origin/create' },
            '/courier_rate': { page: '/courier_rate' },
            '/login': { page: '/login' },
            '/register': { page: '/register' },
            '/profile': { page: '/profile' },
            '/reset_password': { page: '/reset_password' },
            '/order/view': { page: '/order/view' },
            '/order/create': { page: '/order/create' },
            '/order/purchase': { page: '/order/purchase' },
            '/order/upload': { page: '/order/upload' },
            '/report': { page: '/report' },
            '/report/invoice': { page: '/report/invoice' },
            '/report/receipt': { page: '/report/receipt' },
            '/report/order/insurance': { page: '/report/order/insurance' },
            '/report/order/problam': { page: '/report/order/problam' },
        }
    }
}

