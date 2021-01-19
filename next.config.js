module.exports = {
    i18n: {
        locales: ['en-US', 'fr', 'nl-NL'],
        defaultLocale: 'en-US',
    },
    exportPathMap: function () {
        return {
            '/': { page: '/' },
            '/address': { page: '/address' },
            '/courier_rate': { page: '/courier_rate' },
            '/login': { page: '/login' },
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