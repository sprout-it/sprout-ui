import React from 'react';
import NavigationBar from '../component/NavigationBar'
import '../styles/navgiationBar.css'
import '../styles/address.css'
import '../styles/globals.css'
import 'antd/dist/antd.css';

const MyApp = ({ Component, pageProps }) => {
  return <>
    <NavigationBar />
    <Component {...pageProps} />
  </>
}

export default MyApp
