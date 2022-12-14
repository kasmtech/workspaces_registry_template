// components/layout.js

import Header from './header'
import Footer from './footer'

export default function Layout({ children, searchText, changeSearch }) {
  return (
    <>
      <Header searchText={searchText} changeSearch={changeSearch} />
      <main>{children}</main>
      <Footer />
    </>
  )
}