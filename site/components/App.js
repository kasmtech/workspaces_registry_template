import { useRouter } from 'next/router'

function App({ Component, pageProps, app }) {
    const router = useRouter()

    const viewexample = (app) => {
        router.push({
            pathname: '/addapp/[app]',
            query: { app: btoa(app.name)}
        })
    }
    
    return (
        <div onClick={() => viewexample(app)} className="w-[245px] h-[88px] transition-all relative cursor-pointer group flex p-2 items-center justify-center bg-slate-100/90 dark:bg-slate-900/90 shadow rounded hover:shadow-xl hover:bg-gradient-to-r hover:from-slate-900 hover:to-cyan-800 hover:text-white">
            <div className="w-full h-full">
                <div className="show-grid flex h-full items-center">
                    <div className="kasmcard-img flex h-full mx-4 items-center justify-center">
                        <img className="w-[50px] max-h-[66px]" src={ 'icons/' + app.image_src} />
                    </div>
                    <div className="kasmcard-detail settingPad">
                        <h5 className="text-base">{ app.friendly_name }</h5>
                        <p className="text-xs opacity-50">{ app.categories && app.categories[0] || 'Unknown' }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App