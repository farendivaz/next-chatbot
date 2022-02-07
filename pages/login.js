import React, { useState } from 'react';
import HeadElement from '../components/Head';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidation, setEmailValidation] = useState(true);
  const [passwordValidation, setPasswordValidation] = useState(true);
  const [send, setSend] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const loginHandler = async (e) => {
    // validation after button was click
    if (!email) { setEmailValidation(false); }
    if (!password) { setPasswordValidation(false); }
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
      // set token on localStorage
      (localStorage.setItem('token', response.data.token));
      router.push('/crud-dashboard');
    })
    .catch((error) => {
      setError(error.message);
    })
  }
  
  return (
    <div className="bg-indigo-300 h-screen poppins" >

      <style jsx>{`
      `}</style>

      <HeadElement text={`Login - Page`} />

      <Navbar/>

      <main className='my-0'
        style={{paddingTop:'20px'}}
      >
        <div className='bg-indigo-200 border-2 mx-auto max-w-md p-3 rounded shadow-sm'>
          <h4 className='font-bold'>Login Admin</h4>
          <hr/>
          <form onSubmit={loginHandler}>
            <div className='flex flex-col my-2'>
              <label>Email</label>
              <input 
                type='email' 
                className='bg-indigo-50 border-2 border-indigo-500 hover:border-indigo-600 px-2 py-1 rounded text-black'
                value={email} 
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailValidation(true);
                  setPasswordValidation(true);
                  setSend(false);
                  setError('');
                }}
                placeholder='Alamat Email'
              />
            </div>
            {emailValidation === false && (
              <div className="alert bg-red-200">
                Email harus diisi
              </div>
            )}
            <div className='flex flex-col my-2'>
              <label>Password</label>
              <input 
                type='password'
                className='bg-indigo-50 border-2 border-indigo-500 hover:border-indigo-600 px-2 py-1 rounded text-black'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setEmailValidation(true);
                  setPasswordValidation(true);
                  setSend(false);
                  setError('');
                }} 
                placeholder='Masukkan Password'
              />
            </div>
            {passwordValidation === false && (
              <div className="alert bg-red-200">
                Password harus diisi
              </div>
            )}
            <hr/>
            <button 
              className='bg-indigo-500 hover:bg-indigo-600 focus:ring focus:ring-indigo-200 text-white mx-auto my-2 px-4 py-2 rounded w-full'
              onClick={loginHandler} type='submit'
            >
              MASUK
            </button>
            {send === true && (
              <div className="alert alert-info my-2">
                Tunggu sebentar...
              </div>
            )}
            {error === 'Request failed with status code 409' && (
              <div className="alert bg-red-200 my-2">
                Email terdaftar, tapi password salah.
              </div>
            )}
            {error === 'Request failed with status code 500' && (
              <div className="alert bg-red-200 my-2">
                Maaf email tidak terdaftar.
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  )
}