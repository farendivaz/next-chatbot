import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Footer from '../components/Footer';
import HeadElement from '../components/Head';
import InferenceMachine from '../components/InferenceMachine';

export default function Crud() {
  const router = useRouter();
  useEffect(() => {
    //get token from local storage when browser reload
    const token = localStorage.getItem('token');
    if(!token) { 
      router.push('/login'); 
    }
    getUserData(token);
  }, []);

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

  const logoutHandler = () => {
    // remove token, user_id and screening_result from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('screening_result');
    router.push('/login');
  };

  // edit data by id
  const [successEditData, setSuccessEditData] = useState(false);
  const [errorEditData, setErrorEditData] = useState('');
  const editData = (id) => {
    axios.put(`http://localhost:5000/api/${id}`)
    .then(() => {
      setSuccessEditData(true);
      window.location.reload(); // refresh web app
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

  return (
    <div className='bg-blue-300 m-0 opensans'>

      <HeadElement text={`EyeScreening - Dashboard`}/>
      
      <div className='bg-blue-500 roboto text-center text-white w-full'>
        Hallo, {user.name}
      </div>
      
      <nav 
        style={{
          position:'-webkit-sticky',
          position:'sticky',
          top:'0px',
        }}
        className='bg-blue-300 flex justify-center m-0 py-1 px-0 top-0 shadow lg:space-x-4 md:space-x-3 sm:space-x-2 text-dark w-full z-10'
      >
        <Link href='/dashboard'>
          <a className="font-bold hover:bg-blue-100 no-underline roboto rounded-lg my-0 px-3 py-2 text-gray-900 hover:text-gray-900">
            Home
          </a>
        </Link>
        <Link href='/guide_copy'>
          <a className="font-bold hover:bg-blue-100 no-underline roboto rounded-lg my-0 px-3 py-2 text-gray-900 hover:text-gray-900">
            Panduan
          </a>
        </Link>
        <button 
          className="mr-auto font-bold bg-red-500 hover:bg-red-600 focus:bg-red-700 no-underline my-0 px-3 py-2 rounded-lg"
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
