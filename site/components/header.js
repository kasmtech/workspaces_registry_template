import Bubbles from '../components/Bubbles'
import Link from 'next/link'
import { useRouter } from "next/router";
import { NotificationManager } from 'react-notifications';

export default function Header({ searchText, changeSearch }) {

  const copyToClipboard = () => {
    var textField = document.createElement('textarea')
    textField.innerText = listUrl
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    NotificationManager.info('URL successfully copied to clipboard', 'Copy URL', 4000);
  }
  const listUrl = process.env.listUrl;
  const router = useRouter();

  return (
    <header className="relative font-light overflow-hidden bg-gradient-to-tr from-slate-900 to-cyan-800 p-8 xl:px-32 text-white gap-5 md:gap-0 flex flex-wrap justify-center items-center">
      <Bubbles />
      <div className='relative z-10'>
        <div className="text-3xl">{process.env.name}</div>
        <div className="text-sm uppercase w-full flex justify-between">
          <span className='opacity-70'>A</span>
          <span className='opacity-70'>p</span>
          <span className='opacity-70'>p</span>
          <span className='opacity-70'>l</span>
          <span className='opacity-70'>i</span>
          <span className='opacity-70'>c</span>
          <span className='opacity-70'>a</span>
          <span className='opacity-70'>t</span>
          <span className='opacity-70'>i</span>
          <span className='opacity-70'>o</span>
          <span className='opacity-70'>n</span>
          <span>&nbsp;</span>
          <span className='opacity-40'>D</span>
          <span className='opacity-40'>a</span>
          <span className='opacity-40'>t</span>
          <span className='opacity-40'>a</span>
          <span className='opacity-40'>b</span>
          <span className='opacity-40'>a</span>
          <span className='opacity-40'>s</span>
          <span className='opacity-40'>e</span>
        </div>
      </div>
      <nav className='relative z-10 mx-12'>
        <Link href="/" className={'p-4 inline-block rounded-full border border-solid' + (router.pathname == "/" ? ' border-white/30' : ' border-transparent')}>Library</Link>
        <Link href="/addapp" className={'p-4 inline-block rounded-full border border-solid' + (router.pathname.startsWith("/addapp") ? ' bg-black/10 border-white/30' : ' border-transparent')}>Add App</Link>
      </nav>
      <div className="grow flex justify-center relative z-10">
        <div className='bg-black/10 shadow border border-1 border-white/30 rounded flex w-full max-w-md'>
          <input
            name="search"
            className='bg-transparent shadow-inner text-lg font-light w-full p-4 placeholder:text-white/40'
            placeholder='Search for application'
            type="text"
            value={searchText}
            onChange={changeSearch}
          />

        </div>

      </div>
      <button className='p-4 relative z-10 px-5 bg-cyan-700 border-t border-white/20 border-solid hover:bg-slate-900 transition shadow-lg m-2 rounded items-center text-white/70 flex cursor-pointer' onClick={() => { copyToClipboard() }}>
        <span className="mr-3">App Registry Link</span>
        <svg style={{ height: '14px', fill: '#fff' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M224 0c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224zM64 160c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64H64V224h64V160H64z" /></svg>
      </button>
    </header >

  )
}