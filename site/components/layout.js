// components/layout.js

import Header from './header'
import Footer from './footer'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

export default function Layout({ children, searchText, changeSearch }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header searchText={searchText} changeSearch={changeSearch} />
      <main className="grow">{children}</main>
      <Footer />
      <NotificationContainer/>
    </div>
  )
}