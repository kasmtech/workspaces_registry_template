import { useState, useEffect } from 'react'
import Head from 'next/head'
import Workspace from '../components/Workspace'
import styles from '../styles/Home.module.css'

export default function Home({ searchText }) {

  const [workspaces, setWorkspaces] = useState(null)
  const [versions, setVersions] = useState(null)
  const [version, setVersion] = useState(null)

  useEffect(() => {
    let currentVersion = localStorage.getItem("version") || null
    fetch('list.json')
      .then((res) => res.json())
      .then((workspaces) => {
        let wsversions = []
        workspaces.workspaces.forEach((workspace) => {
          if(workspace.compatibility) {
            workspace.compatibility.forEach((v) => {
              const value = parseFloat(v)
              if(wsversions.indexOf(value) === -1) {
                wsversions.push(value)
              }
            })
          }
        })
        const sorted = wsversions.sort((a,b) => a-b).reverse()

        setVersions(sorted)
        if (currentVersion === null) {
          currentVersion = sorted[0]
          localStorage.setItem("version", currentVersion);
        }
        setVersion(currentVersion)
        setWorkspaces(workspaces)
      })
  }, [])

  const updateVersion = (version) => {
    localStorage.setItem("version", version);
    setVersion(version)
  }

  let filteredworkspaces = workspaces && workspaces.workspaces && workspaces.workspaces.length > 0 ? [...workspaces.workspaces] : [];
  filteredworkspaces = filteredworkspaces.filter((v) => v.compatibility.some((el) => el === version + '.x'))
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


      <main className="p-8 py-10 xl:px-20">
        <h1 className='flex flex-wrap-reverse uppercase tracking-widest justify-center mb-10 gap-5'>
        <span className='flex items-center text-lg bg-slate-100/90 rounded overflow-hidden shadow'>
            <span className='flex px-3 text-xs opacity-100'>Workspaces</span>
            <span className='text-white p-3 py-1 flex bg-[#2980b9]'>{workspaces && workspaces.workspacecount}</span>
          </span>
          <span className='flex items-center text-lg bg-slate-100/90 rounded overflow-hidden shadow'>
            <span className='flex px-3 text-xs opacity-100'>Kasm Version</span>
            <span className='text-white gap-3 p-3 py-1 flex items-center bg-[#2980b9]'>{versions && versions.map((v) => (
              <div className={'cursor-pointer ' + (+v === +version ? 'text-white' : 'text-white/50 text-xs')} key={v} onClick={() => updateVersion(v)}>{v}</div>
            ))}</span>
          </span>
        </h1>
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
