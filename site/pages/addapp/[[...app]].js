import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import { saveAs } from 'file-saver';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { useRouter } from 'next/router'
import allapps from '../../../public/list.json'


export async function getStaticPaths() {
  let paths = allapps.apps.map(app => ({
    params: {
      app: [btoa(app.name)]
    }
  }))
  paths.push({
    params: { app: null }
  })
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }) {
  const app = params.app
  return {
    // Passed to the page component as props
    props: { app: app ?? null },
  }
}

export default function AddApp({ app }) {

  function friendlyUrl(url) {
    // make the url lowercase         
    var encodedUrl = url.toString().toLowerCase();
    // replace & with and           
    encodedUrl = encodedUrl.split(/\&+/).join("-and-")
    // remove invalid characters 
    encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");
    // remove duplicates 
    encodedUrl = encodedUrl.split(/-+/).join("-");
    // trim leading & trailing characters 
    encodedUrl = encodedUrl.trim('-');
    return encodedUrl;
  }

  const downloadZip = () => {
    var JSZip = require("jszip");
    const zip = new JSZip()
    const folder = zip.folder(application.friendly_name)
    folder.file('app.json', JSON.stringify(application, null, 2))
    if (icon) {
      folder.file(application.image_src, icon.file)
    }
    else if (inlineImage) {
      const promise = fetch(inlineImage).then(response => response.blob())
      folder.file(application.image_src, promise)
    }
    zip.generateAsync({ type: "blob" })
      .then(function (content) {
        // Force down of the Zip file
        saveAs(content, friendlyUrl(application.friendly_name) + '.zip');
      });
  }

  const name = useRef(null);
  const friendly_name = useRef(null);
  const description = useRef(null);

  const [categories, setCategories] = useState(null)
  const [architecture, setArchitecture] = useState(null)
  const [icon, setIcon] = useState(null)
  const [ext, setExt] = useState('png')
  const [inlineImage, setInlineImage] = useState(null)

  const defaultState = {
    friendly_name: null,
    image_src: null,
    description: null,
    name: null,
    cores: 1,
    memory: 1024,
    gpu_count: 0,
    cpu_allocation_method: "Inherit",
    docker_registry: "https://index.docker.io/v1/",
    categories: [],
    require_gpu: false,
    enabled: true,
    image_type: 'Container',
  }

  const [application, setApplication] = useState(defaultState)

  const router = useRouter()
  // const { app } = router.query

  useEffect(() => {
    console.log(app)
    if(app === null) {
      description.current.value = ''
      name.current.value = ''
      friendly_name.current.value = ''
      setCategories(null)
      setArchitecture(null)
      setIcon(null)
      setApplication(defaultState)
    }
    else if (app && app[0]) {
      const appDetails = allapps.apps.find(el => el.name === atob(app[0]))
      delete appDetails['sha']
      description.current.value = appDetails.description
      name.current.value = appDetails.name
      friendly_name.current.value = appDetails.friendly_name
      if (appDetails.categories) {
        let catMap = []
        appDetails.categories.map((e) => catMap.push({
          label: e,
          value: e,
        }))
        setCategories(catMap)
      }
      if (appDetails.architecture) {
        let archMap = []
        appDetails.architecture.map((e) => archMap.push({
          label: e,
          value: e,
        }))
        setArchitecture(archMap)
      }

      setInlineImage('../../icons/' + appDetails.image_src)

      setApplication({
        ...application,
        ...appDetails
      })
    }
  }, [app])

  const displayApplication = () => {
    return {
      ...application,
      // categories: JSON.stringify(application.categories)
    }
  }

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#f1f5f9",
      borderRadius: '0.5rem',
      borderColor: "#94a3b8"
    }),
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: '#dde6f1',
      };
    }
  }

  useEffect(() => {
    if (application && application.friendly_name) {
      const updateapp = {
        ...application
      }
      updateapp.image_src = friendlyUrl(updateapp.friendly_name) + '.' + ext
      setApplication(updateapp)
    }
  }, [ext])

  const updateCategories = (items) => {
    const updateapp = {
      ...application
    }
    updateapp.categories = items.map(cat => cat.value)
    setApplication(updateapp)
    let catMap = []
    updateapp.categories.map((e) => catMap.push({
      label: e,
      value: e,
    }))
    setCategories(catMap)
  }

  const updateArchitecture = (items) => {
    const updateapp = {
      ...application
    }
    updateapp.architecture = items.map(arch => arch.value)
    setApplication(updateapp)
    let archMap = []
    updateapp.architecture.map((e) => archMap.push({
      label: e,
      value: e,
    }))
    setArchitecture(archMap)
  }


  const handleChange = (event) => {
    const updateapp = {
      ...application
    }
    updateapp[event.target.name] = event.target.value
    if (event.target.name === 'icon') {
      delete updateapp.icon
      setIcon({
        value: event.target.value,
        file: event.target.files[0]
      })
      setExt(event.target.value.substr(event.target.value.lastIndexOf('.') + 1))
      setInlineImage(null)
      // return
    }

    if (updateapp.friendly_name) {
      updateapp.image_src = friendlyUrl(updateapp.friendly_name) + '.' + ext
    }

    setApplication(updateapp)
  }

  const options = [
    { value: 'Browser', label: 'Browser' },
    { value: 'Communication', label: 'Communication' },
    { value: 'Desktop', label: 'Desktop' },
    { value: 'Development', label: 'Development' },
    { value: 'Games', label: 'Games' },
    { value: 'Multimedia', label: 'Multimedia' },
    { value: 'Office', label: 'Office' },
    { value: 'Privacy', label: 'Privacy' },
    { value: 'Productivity', label: 'Productivity' },
    { value: 'Remote Access', label: 'Remote Access' }
  ]

  return (
    <div className="">
      <Head>
        <title>Kasm Apps</title>
        <meta name="description" content="List of apps for Kasm Webspaces" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-col lg:flex-row w-full my-20 max-w-6xl text-sm rounded-xl overflow-hidden mx-auto'>
        <div className='w-full lg:w-1/2 p-16 bg-slate-300'>
          <h1 className='text-2xl font-medium mb-2'>Add Application</h1>
          <div className='flex flex-col'>
            <p className='mb-8 opacity-70'>This will help you generate the JSON file you need to upload to the App directory.</p>

            <label className='mb-2 font-medium'>Icon</label>
            <input type="file" name="icon" onChange={handleChange} className='mb-2 p-2 rounded-lg bg-slate-100 border border-solid border-slate-400' />
            <p className='mb-6 opacity-70'>Select the image to use, image will be renamed when it's downloaded.</p>

            <label className='mb-2 font-medium'>Friendly Name</label>
            <input ref={friendly_name} name="friendly_name" onChange={handleChange} className='mb-2 p-2 rounded-lg bg-slate-100 border border-solid border-slate-400' />
            <p className='mb-6 opacity-70'>This is the name that will show for users</p>

            <label className='mb-2 font-medium'>Categories</label>
            <CreatableSelect
              instanceId="1"
              name="categories"
              isMulti
              options={options}
              onChange={updateCategories}
              styles={customStyles}
              value={categories}
            />
            <p className='mb-6 mt-2 opacity-70'>You can select from the available option or create new ones.</p>

            <label className='mb-2 font-medium'>Description</label>
            <input ref={description} name="description" onChange={handleChange} className='mb-2 p-2 rounded-lg bg-slate-100 border border-solid border-slate-400' />
            <p className='mb-6 opacity-70'>A short description about the application</p>

            <label className='mb-2 font-medium'>Docker Image</label>
            <input ref={name} name="name" onChange={handleChange} className='mb-2 p-2 rounded-lg bg-slate-100 border border-solid border-slate-400' />
            <p className='mb-6 opacity-70'>The docker image to use, i.e. <code className='text-xs p-1 px-2 rounded bg-white/40'>kasmweb/filezilla:develop</code></p>

            <label className='mb-2 font-medium'>Architecture</label>
            <Select
              instanceId="2"
              name="architecture"
              isMulti
              options={[
                { value: 'amd64', label: 'amd64' },
                { value: 'arm64', label: 'arm64' },
              ]}
              onChange={updateArchitecture}
              styles={customStyles}
              value={architecture}
            />
            <p className='mb-6 mt-2 opacity-70'>You can select from the available option or create new ones.</p>

          </div>
        </div>
        <div className='w-full lg:w-1/2 p-16 bg-slate-100'>
          <App app={application} icon={icon} inlineImage={inlineImage} />
          <pre className='my-8 overflow-y-auto text-xs'>{JSON.stringify(displayApplication(), null, 2)}</pre>
          <button onClick={downloadZip} className='p-4 relative z-10 px-5 bg-cyan-700 border-t border-white/20 border-solid hover:bg-slate-900 transition m-2 rounded items-center text-white/70 flex cursor-pointer'>Download</button>
        </div>
      </div>
    </div>
  )

}


function App({ app, icon, inlineImage }) {

  const [showDescription, setShowDescription] = useState(false);

  let srcBlob = null

  if (icon) {
    const blob = new Blob([icon.file])
    srcBlob = URL.createObjectURL(blob);
    app.image_src = srcBlob
  }

  const installButton = () => {
    return <button className={"text-xs w-full p-4 py-1 rounded-lg flex justify-center items-center bg-blue-500 font-bold text-white"}>Install</button>
  }
  const editButton = () => {
    return <div className="text-xs text-color w-full p-4 py-1 rounded-lg bg-black/5 flex justify-center items-center">Edit</div>
  }
  const official = () => {
    return
  }

  const appExists = false

  return (
    <div className={"rounded-xl group w-full shadow max-w-xs relative overflow-hidden h-[100px] border border-solid flex flex-col justify-between bg-slate-300 border-slate-400/50"}>
      <div className={"absolute top-0 left-0 right-0 h-[200px] transition-all" + (showDescription ? ' -translate-y-1/2' : '')}>
        <div onClick={() => setShowDescription(true)} className={"h-[100px] p-4 relative overflow-hidden cursor-pointer"}>
          <img className="h-[90px] group-hover:scale-150 transition-all absolute left-2 top-1" src={app.image_src} onError={(e) => { 
            if ( inlineImage !== null) { e.target.src = inlineImage }}} alt={app.friendly_name} />
          <div className="flex-col pl-28">
            <div className="font-bold">{app.friendly_name || 'Friendly Name'}</div>
            <div className="text-xs mb-2 flex gap-2">{process.env.name || 'Unknown'} <span>{official()}</span></div>
            <div className=" h-8"></div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-slate-400/20 h-8 text-[10px] flex items-center justify-center">
            {app.architecture && app.architecture.map((arch, index) => (
              <span key={'arch' + index} className="p-2 py-0 m-[1px] inline-block rounded bg-slate-400/70">{arch}</span>
            ))}

            {app.categories.map((cat, index) => (
              <span key={'cat' + index} className="p-2 py-0 m-[1px] inline-block rounded bg-slate-300/90">{cat}</span>
            ))}
          </div>
          {appExists && appExists.enabled === true && appExists.available === false && (
            <div className="absolute inset-0 flex justify-center items-center bg-slate-600/70 text-white"><i className="fa fa-spinner fa-spin mr-3"></i> Installing</div>
          )}
        </div>
        <div className="h-[100px] text-xs relative p-2 pl-4 flex">
          <button className="absolute right-2 top-2 bg-slate-100 rounded-full flex justify-center items-center h-6 w-6" onClick={() => setShowDescription(false)}>
            <svg style={{ height: '14px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" /></svg>
          </button>
          <div className="flex flex-col flex-grow"><div className="font-bold">{app.friendly_name}</div> {app.description}</div>
          <div className="flex flex-col justify-end gap-1">
            {editButton()}
            {installButton()}
          </div>
        </div>
      </div>
    </div>
  )

}

