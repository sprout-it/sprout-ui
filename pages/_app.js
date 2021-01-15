import React, { useEffect } from 'react';
import NavigationBar from '../component/NavigationBar'
import globalState from '../utils/context'
import '../styles/navgiationBar.css'
import '../styles/create.css'
import '../styles/view.css'
import '../styles/address.css'
import '../styles/reset-password.css'
import '../styles/globals.css'
import 'antd/dist/antd.css';
import 'chart.js/dist/Chart.bundle.min.js'

const App = ({ Component, pageProps }) => {
  return <globalState.Provider value={{}}>
    <NavigationBar />
    <Component {...pageProps} />
  </globalState.Provider>
}

export default App
