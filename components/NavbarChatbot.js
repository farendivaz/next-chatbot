import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();
  const [tokenEmpty, setTokenEmpty] = useState(true);
  useEffect(() => {
    //get token from local storage when browser reload
    const token = localStorage.getItem('token');
    if(!token) { 
      setTokenEmpty(true);
    }
    else {
      setTokenEmpty(false);
    }
  }, []);

  const logoutHandler = () => {
    // remove token, user_id and screening_result from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('screening_result');
    router.push('/login');
  };

  return (
    <nav
      style={{
        position:'-webkit-sticky',
        position:'sticky',
        top:'0px',
      }}
      className='bg-blue-300 flex justify-center m-0 py-1 px-0 top-0 shadow lg:space-x-4 md:space-x-3 sm:space-x-2 text-dark w-full z-10'
    >
      {tokenEmpty === true && (
        <>
          {[
            ['Home', '/'],
            ['Panduan','/guide'],
            ['Register', '/register'],
            ['Masuk', '/login']
          ].map(([title, url], index) => (
            <Link href={url} key={index}>
              <a className="font-bold hover:bg-blue-100 no-underline roboto rounded-lg my-0 px-3 py-2 text-gray-900 hover:text-gray-900">
                {title}
                </a>
            </Link>
          ))}
        </>
      )}
      {tokenEmpty === false && (
        <>
          {[
            ['Home', '/dashboard'],
            ['Panduan','/guide'],
            ['UAT', '/uat'],
          ].map(([title, url], index) => (
            <Link href={url} key={index}>
              <a className="font-bold hover:bg-blue-100 no-underline roboto rounded-lg my-0 px-3 py-2 text-gray-900 hover:text-gray-900">
                {title}
                </a>
            </Link>
          ))}
          <button 
            className="font-bold bg-red-200 hover:bg-red-100 focus:bg-red-300 no-underline my-0 lg:px-3 md:px-3 px-2 py-2 rounded-lg"
            onClick={logoutHandler}
          >
            Keluar
          </button>
        </>
      )}
    </nav>
  )
}