import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function FormTesting () {
  return (
    <div>
      <nav
        style={{position:'fixed'}}
        className='bg-blue-200 flex justify-center m-0 py-1 px-0 top-0 shadow-sm space-x-3 text-dark w-100 z-10'
      >
        {[
          ['Home', '/',1],
          ['Panduan','/guide',2],
          ['UAT', '/uat',3],
          ['Dashboard', 'https://react-eyechatbot.vercel.app',4],
        ].map(([title, url, id]) => (
          <Link href={url} key={id}>
            <a className="font-bold hover:bg-blue-100 no-underline roboto rounded-lg my-0 px-3 py-2 text-gray-700 hover:text-gray-900">
              {title}
            </a>
          </Link>
        ))}
      </nav>

      <div 
        className='poppins border rounded shadow-sm mt-8 mb-3 mx-auto py-3 px-3 max-w-screen-md max-h-full'
        style={{marginTop:'70px'}}
      >
        <iframe
          title='form UAT'
          src='https://docs.google.com/forms/d/e/1FAIpQLSfMfIO_wa6TJKg5SrgadHuwDWlnNFDpk1P-PX1_vwHjumbLVg/viewform?embedded=true'
          height='3150' 
          frameborder='0'
          className='mx-auto w-100'
        >Loading…
        </iframe>
      </div>
      <Footer styleFooter={{position:'relative'}}/>
    </div>
  )
}