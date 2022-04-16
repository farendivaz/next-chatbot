import { useEffect, useState } from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import Navbar from '../../components/NavbarChatbot';
import Footer from '../../components/Footer';
import HeadElement from '../../components/Head';
import InferenceMachine from '../../components/InferenceMachine';

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
    <div className='lg:h-full md:h-screen h-full bg-blue-300 m-0 opensans'>

      <HeadElement text={`EyeScreening - Dashboard`}/>
      
      <div className='bg-blue-500 roboto text-center text-white w-full'>
        Hallo, {user.name}
      </div>
      
      <Navbar/>

      <main className='flex flex-row justify-center mt-3 mb-3'>
        <InferenceMachine/>
      </main>

      <Footer/>
    </div>
  )
}
