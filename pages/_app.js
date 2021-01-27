import React, { useEffect, useState } from 'react';
import { auth } from '../utils/firebase'
import Router from 'next/router'
import NavigationBar from '../component/NavigationBar'
import Footer from '../component/Footer'
import GlobalState from '../utils/context'
import { message } from 'antd'
import './styles/navgiationBar.css'
import './styles/create.css'
import './styles/report.css'
import './styles/view.css'
import './styles/chart.css'
import './styles/address.css'
import './styles/reset-password.css'
import './styles/globals.css'
import './styles/index.css'
import './styles/container.css'
import './styles/footer.css'
import './styles/login.css'
import 'antd/dist/antd.css';
import 'react-phone-input-2/lib/high-res.css'
import 'chart.js/dist/Chart.bundle.min.js'

const App = ({ Component, pageProps }) => {
  const [user, setUser] = useState()

  const checkUserLogin = () => {
    if (!auth.currentUser)
      Router.push('login')
  }

  const signOut = () => {
    auth.signOut()
    message.success('Logout success')
  }

  useEffect(() => {
    auth.onAuthStateChanged(state => {
      if (state) {
        setUser(state)
      } else {
        setUser(null)
        Router.push('login')
      }
    })

  }, [])

  return <GlobalState.Provider value={{
    checkUserLogin,
    user,
    signOut
  }}>
    <NavigationBar />
    <Component {...pageProps} />
    <Footer />
  </GlobalState.Provider>
}

export default App
