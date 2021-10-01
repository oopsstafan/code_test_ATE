import React from 'react'
import '../styles/globals.css'
import styles from '../styles/Home.module.scss'
import Head from 'next/head'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'

import store from '../redux/store'


function MyApp({ Component, pageProps }) {
  const [pageType, setPageType] = React.useState('')
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <Head>
          <title>My Movie Web</title>
          <meta name="description" content="Generated create next app by Ivan Xu" />
          <link rel="icon" href="/favicon.ico?" />
        </Head>

        <header className={styles.header_wrapper}>
          <h1>{pageType === "home" ? 'Welcome to My Star War Movie World' : "This is Movie Detail Page"}</h1>
          <h2>{pageType === "home" ? '-- Created by Ivan Xu' : ""}</h2>
        </header>

        <Component {...pageProps} setPageType={setPageType} />

        <footer className={styles.footer_wrapper}>
          I Recommand Hiring Me for More Delicate Websites
        </footer>


      </div>
    </Provider>

  )
}

export default MyApp
