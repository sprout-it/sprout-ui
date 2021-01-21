import React, { createContext } from 'react';
import NavigationBar from '../component/NavigationBar'
import Footer from '../component/Footer'
import GlobalState from '../utils/context'
import './styles/navgiationBar.css'
import './styles/create.css'
import './styles/view.css'
import './styles/chart.css'
import './styles/address.css'
import './styles/reset-password.css'
import './styles/globals.css'
import './styles/index.css'
import './styles/container.css'
import './styles/footer.css'
import 'antd/dist/antd.css';
import 'chart.js/dist/Chart.bundle.min.js'

const App = ({ Component, pageProps }) => {
  return <GlobalState.Provider value={{}}>
    <NavigationBar />
    <Component {...pageProps} />
    <Footer />
  </GlobalState.Provider>
}

export default App
