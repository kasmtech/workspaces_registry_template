import '../styles/globals.css'
import Layout from '../components/layout'
import { useState, useEffect } from 'react'


function MyApp({ Component, pageProps }) {
  const [searchText, setSearchText] = useState('')

  const changeSearch = event => {
    setSearchText(event.target.value)
  }

  return (
    <Layout searchText={searchText} changeSearch={changeSearch}>
      <Component searchText={searchText} {...pageProps} />
    </Layout>
  )
}

export default MyApp
