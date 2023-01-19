import { useState, useEffect } from 'react'
import Head from 'next/head'
import Workspace from '../components/Workspace'
import styles from '../styles/Home.module.css'

export default function Home({ searchText }) {

  const [workspaces, setWorkspaces] = useState(null)

  useEffect(() => {
    fetch('list.json')
      .then((res) => res.json())
      .then((workspaces) => {
        setWorkspaces(workspaces)
      })
  }, [])

  let filteredworkspaces = workspaces && workspaces.workspaces && workspaces.workspaces.length > 0 ? [...workspaces.workspaces] : [];
  const lowerSearch = searchText && searchText.toLowerCase();
  if (searchText && searchText !== "") {
    filteredworkspaces = filteredworkspaces.filter((i) => {
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
        <title>Kasm Workspaces</title>
        <meta name="description" content="List of workspaces for Kasm Webspaces" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="p-20">
        <h1 className='flex text-2xl justify-center mb-10'>Workspaces: <span className=''>{workspaces && workspaces.workspacecount}</span></h1>
        <div className="flex flex-wrap gap-1 justify-center">
        {filteredworkspaces && filteredworkspaces.length > 0 && filteredworkspaces.map(function (workspace, i) {
            return <Workspace key={workspace.sha} workspace={workspace} />
          })}
          {filteredworkspaces && filteredworkspaces.length === 0 && (
            <p>No workspaces found {searchText !== '' && ('matching "' + searchText + '"')}</p>
          )}
        </div>


        <div className={styles.grid}>

        </div>
      </main>
    </div >
  )
}
