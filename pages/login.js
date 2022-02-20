import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import HeadElement from '../components/Head';
import Link from 'next/link';

export default function Login() {
  // initial state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [send, setSend] = useState(false);
  // validation
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  // use router
  const router = useRouter();

  const loginHandler = async (e) => {
    // validation after button was click
    if (!email) { setEmailEmpty(true); }
    if (!password) { setPasswordEmpty(true); }
    e.preventDefault();
    // send data to server
    await axios.post('http://localhost:5000/api/login', 
      ({
        email,
        password,
      })
    )
    .then((response) => {
      setSend(true);
      // set token on local storage
      (localStorage.setItem('token', response.data.token));
      router.push('/crud-dashboard');
    })
    .catch((errorMessage) => {
      setErrorMessage(errorMessage.message);
    })
  }
  
  return (
    <div className="bg-blue-300 h-screen poppins" >

      <style jsx>{`
      `}</style>

      <HeadElement text={`Registration - Page`} />

      <div className='bg-blue-500 roboto text-center text-white w-full'>
        User Login
      </div>

      <nav
        style={{
          position:'-webkit-sticky',
          position:'sticky',
          top:'0px',
        }}
        className='bg-blue-300 flex justify-center m-0 py-1 px-0 top-0 shadow lg:space-x-4 md:space-x-3 sm:space-x-2 text-dark w-full z-10'
      >
        {[
          ['Home', '/'],
          ['Daftar', '/registration'],
          ['Masuk', '/login']
        ].map(([title, url, style], index) => (
          <Link href={url} key={index}>
            <a className="font-bold hover:bg-blue-100 no-underline roboto rounded-lg my-0 px-3 py-2 text-gray-900 hover:text-gray-900">
              {title}
            </a>
          </Link>
        ))}
      </nav>

      <main className='bg-blue-100 mx-auto mt-8 max-w-md lg:p-7 md:p-5 sm:p-3 rounded-xl shadow'>
          <h3 className='font-bold'>Login Pengguna</h3>
          <p>Silahkan login dengan isi data berikut.</p>
          <form onSubmit={''}>
            <div className='flex flex-col lg:my-3 md:my-3 sm:my-2'>
              <label>Email</label>
              <input 
                type='email' 
                className='bg-blue-50 border-2 border-blue-500 hover:border-blue-600 px-2 py-1 rounded text-black'
                value={email} 
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailEmpty(false);
                  setPasswordEmpty(false);
                  setSend(false);
                  setErrorMessage('');
                }}
                placeholder='Alamat Email'
              />
            </div>
            {emailEmpty === true && (
              <div className="border-2 border-red-300 bg-red-100 p-3 rounded">
                Email harus di isi
              </div>
            )}
            <div className='flex flex-col lg:my-3 md:my-3 sm:my-2'>
              <label>Password</label>
              <input 
                type='password'
                className='bg-blue-50 border-2 border-blue-500 hover:border-blue-600 px-2 py-1 rounded text-black'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setEmailEmpty(false);
                  setPasswordEmpty(false);
                  setSend(false);
                  setErrorMessage('');
                }} 
                placeholder='Masukkan Password'
              />
            </div>
            {passwordEmpty === true && (
              <div className="border-2 border-red-300 bg-red-100 p-3 rounded">
                Password harus di isi
              </div>
            )}
            <button 
              className='bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-200 text-white mx-auto lg:my-3 md:my-3 sm:my-2 px-4 py-2 rounded-full w-full'
              onClick={loginHandler} type='submit'
            >
              MASUK
            </button>
            {send === true && (
              <div className="alert alert-info my-2">
                Tunggu sebentar...
              </div>
            )}
            {errorMessage === 'Request failed with status code 409' && (
              <div className="border-2 border-red-300 bg-red-100 p-3 rounded my-2">
                Email terdaftar, tapi password salah.
              </div>
            )}
            {errorMessage === 'Request failed with status code 500' && (
              <div className="border-2 border-red-300 bg-red-100 p-3 rounded my-2">
                Maaf email tidak terdaftar.
              </div>
            )}
          </form>
          <hr className='my-2'/>
          <p>Belum punya akun?{' '}
            <Link href='/registration'>
              <a className='no-underline'>
                Daftar di sini
              </a>
            </Link>
          </p>
      </main>
    </div>
  )
}