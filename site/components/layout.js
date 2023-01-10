// components/layout.js

import Header from './header'
import Footer from './footer'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

export default function Layout({ children, searchText, changeSearch }) {
  return (
    <>
      <Header searchText={searchText} changeSearch={changeSearch} />
      <main>{children}</main>
      <Footer />
      <NotificationContainer/>
    </>
  )
}