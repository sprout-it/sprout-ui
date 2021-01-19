import React from 'react';
import NavigationBar from '../component/NavigationBar'
import Footer from '../component/Footer'
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
  return <>
    <NavigationBar />
    <Component {...pageProps} />
    <Footer />
  </>
}

export default App
