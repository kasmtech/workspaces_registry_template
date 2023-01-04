import { useState, useEffect } from 'react'
import Head from 'next/head'
import App from '../components/App'
import styles from '../styles/Home.module.css'

export default function Home({ searchText }) {

  const [apps, setApps] = useState(null)

  useEffect(() => {
    fetch('list.json')
      .then((res) => res.json())
      .then((apps) => {
        setApps(apps)
      })
  }, [])

  let filteredapps = apps && apps.apps && apps.apps.length > 0 ? [...apps.apps] : [];
  const lowerSearch = searchText && searchText.toLowerCase();
  if (searchText && searchText !== "") {
    filteredapps = filteredapps.filter((i) => {
      const category = (i.categories && i.categories.length > 0) ? i.categories.filter((i) =>
        i.toLowerCase().includes(lowerSearch)
      ) : [];
      return (
        i.name.toLowerCase().includes(lowerSearch) ||
        category.length > 0
      );
    });
  }


  return (
    <div className="">
      <Head>
        <title>Kasm Apps</title>
        <meta name="description" content="List of apps for Kasm Webspaces" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="p-20">
        <h1 className='flex text-2xl justify-center mb-10'>Applications: <span className=''>{apps && apps.appcount}</span></h1>
        <div className="flex flex-wrap gap-1 justify-center">
        {filteredapps && filteredapps.length > 0 && filteredapps.map(function (app, i) {
            return <App key={app.sha} app={app} />
          })}
          {filteredapps && filteredapps.length === 0 && (
            <p>No applications found {searchText !== '' && ('matching "' + searchText + '"')}</p>
          )}
        </div>


        <div className={styles.grid}>

        </div>
      </main>
    </div >
  )
}
