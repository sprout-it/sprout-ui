import React from 'react';
import NavigationBar from '../component/NavigationBar'
import '../styles/navgiationBar.css'
import '../styles/create.css'
import '../styles/address.css'
import '../styles/reset-password.css'
import '../styles/globals.css'
import 'antd/dist/antd.css';
import 'chart.js/dist/Chart.bundle.min.js'

const MyApp = ({ Component, pageProps }) => {
  return <>
    <NavigationBar />
    <Component {...pageProps} />
  </>
}

export default MyApp
