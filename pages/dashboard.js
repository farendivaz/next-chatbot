import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import HeadElement from '../components/Head';
import {useRouter} from 'next/router';

export default function Crud() {
  const router = useRouter();
  // authorization
  const [user, setUser] = useState('');
  const [errorGetUserData, setErrorGetUserData] = useState('');
  const getUserData = async (token) => {
    //set axios header with type Authorization + Bearer token
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`
    await axios.get('http://localhost:5000/api/verify')
    .then((response) => {
        setUser(response.data);
    })
    .catch((error) => { 
      setErrorGetUserData(error.message);
    })
  }

  // log out
  const logoutHandler = () => {
    //remove token from localStorage
    localStorage.removeItem('token');
    router.push('/login');
  };

  // edit data by id
  const [successEditData, setSuccessEditData] = useState(false);
  const [errorEditData, setErrorEditData] = useState('');
  const editData = (id) => {
    axios.put(`http://localhost:5000/api/${id}`)
    .then(() => {
      setSuccessEditData(true);
      // refresh web app
      window.location.reload();
    })
    .catch((err) => { 
      setSuccessEditData(false);
      setErrorEditData(err.message);
    })
  }

  // delete data by id
  const [successDeleteData, setSuccessDeleteData] = useState(false);
  const [errorDeleteData, setErrorDeleteData] = useState('');
  const deleteData = (id) => {
    axios.delete(`http://localhost:5000/api/${id}`)
    .then(() => {
      setSuccessDeleteData(true);
      // refresh web app
      window.location.reload();
    })
    .catch((err) => { 
      setSuccessDeleteData(false);
      setErrorDeleteData(err.message);
    })
  }

  // run function when browser reload
  useEffect(() => {
    setErrorGetUserData('');
    setSuccessAddNewData(false);
    setSuccessEditData(false);
    setSuccessDeleteData(false);
    setErrorGetUserData('');
    setErrorAddNewData('');
    setErrorEditData('');
    setErrorDeleteData('');
    //get token from local storage
    const token = localStorage.getItem('token');
    if(!token) { 
      router.push('/login'); 
    }
    getUserData(token);
  }, []);

  return (
    <div className='bg-blue-300 m-0 opensans'>

      <HeadElement text={`EyeScreening - Dashboard`}/>
      
      <div className='bg-blue-500 roboto text-center text-white w-full'>
        Chatbot Expert System
      </div>
      
      <nav 
        style={{
          position:'-webkit-sticky',
          position:'sticky',
          top:'0px',
        }}
        className='bg-blue-300 flex justify-center m-0 py-1 px-0 top-0 shadow lg:space-x-4 md:space-x-3 sm:space-x-2 text-dark w-full z-10'
      >
        <Link href='/dashboard' key={index}>
          <a className="font-bold hover:bg-blue-100 no-underline roboto rounded-lg my-0 px-3 py-2 text-gray-900 hover:text-gray-900">
            Home
          </a>
        </Link>
        <Link href='/guide_copy' key={index}>
          <a className="font-bold hover:bg-blue-100 no-underline roboto rounded-lg my-0 px-3 py-2 text-gray-900 hover:text-gray-900">
            Panduan
          </a>
        </Link>
        <button 
          class="mr-auto font-bold bg-red-500 hover:bg-red-600 focus:bg-red-700 no-underline my-0 px-3 py-2 rounded-lg"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </nav>

      <main className='flex flex-row justify-center mt-3 mb-3'>
        <InferenceMachine/>
      </main>

      <Footer/>
    </div>
  )
}
