import React from 'react'
import Head from 'next/head'

import styles from '../styles/Layout.module.scss'
import 'antd/dist/antd.less'

import '../styles/globals.scss'

//This is layout component that contains head info, header, and footer for every page in the web
function MyApp({ Component, pageProps }) {
  //This state is used to note what type of this page, so that showing different titles
  const [pageType, setPageType] = React.useState('')
  return (
    <div className={styles.container}>
      <Head>
        <title>My Movie Web</title>
        <meta name="description" content="Generated create next app by Ivan Xu" />
        <link rel="icon" href="/favicon.ico?" />
      </Head>

      <header className={styles.header_wrapper}>
        {/* showing different titles depend on different page types */}
        <h1>{pageType === "home" ? 'Welcome to My Star War Movies World' : "Movie Detail"}</h1>
        <h2>{pageType === "home" ? '-- Created by Ivan Xu' : ""}</h2>
      </header>

      <Component {...pageProps} setPageType={setPageType} />

      <footer className={styles.footer_wrapper}>

        I Recommand Hiring Me for More Delicate Websites
      </footer>


    </div>

  )
}

export default MyApp
