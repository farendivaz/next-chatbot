import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState([]);
  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();
    // initialize formData
    const formData = new FormData()
    // append data
    formData.append('email', email)
    formData.append('password', password)
    // push data to server
    await axios.post('http://localhost:8000/api/login', formData)
    .then((response) => {
      // set token on localStorage
      (localStorage.setItem('token', response.data.token))
      // redirect to dashboard
      router.push('/register')
    })
    .catch((error) => {
      // assign error to state 'validation'
      setValidation(error.response.data)
    })
  }
  
  // redirect to register page
  const toRegisterPageHandler = () => {
  };
  
  return (
    <div className="poppins" >
      <nav className="flex py-2 justify-center space-x-4 shadow-sm w-full">
        {[
          ['Home', '/'],
          ['Login','/login'],
          ['Register', '/register'],
          ['Dashboard', 'https://react-eyechatbot.vercel.app'],
        ].map(([title, url]) => (
          <a href={url} className="font-medium rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            {title}
          </a>
          ))
        }
      </nav>
      <main className='flex flex-col my-3' style={{marginTop:'80px'}}>
        <h4 className='fw-bold text-center text-primary'>EyeScreening</h4>
        <div className='row justify-content-center'>
          <div className='col-md-4'>
            <div className='card border-5px rounded shadow-sm'>
              <div className='card-body'>   
                <h4 className='fw-bold'>Login Terlebih Dahulu</h4>
                <hr/>
                  {validation.message && (
                    <div className='alert alert-danger'>{validation.message}</div>
                  )}
                <form onSubmit={loginHandler}>
                  <div className='mb-3'>
                    <label className='form-label'>Email</label>
                    <input 
                      type='email' 
                      className='form-control' 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Masukkan Alamat Email'
                    />
                  </div>
                  {validation.email && (
                    <div className='alert alert-danger'>{validation.email[0]}</div>
                  )}
                  <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input 
                      type='password' 
                      className='form-control' 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder='Masukkan Password'
                    />
                  </div>
                  {validation.password && (
                    <div className='alert alert-danger'>{validation.password[0]}</div>
                  )}          
                  <div className='d-grid gap-2'>
                    <button type='submit' className='btn btn-primary'>
                      MASUK
                    </button>
                  </div>
                  <div className='mt-3'>
                      <p>Belum punya akun? Daftar terlebih dahulu</p>
                  </div>
                  <div className='d-grid gap-2'>
                    <button onClick={toRegisterPageHandler} className='btn btn-outline-primary'>
                      DAFTAR
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}