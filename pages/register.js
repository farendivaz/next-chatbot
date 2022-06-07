import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import HeadElement from '../components/Head';
import Navbar from '../components/NavbarChatbot';
import Link from 'next/link';

export default function Register() {
  // use router
  const router = useRouter();
  useEffect(() => {
    //get token and user id from local storage when browser reload
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    // if user already login, this register page can not be accessed
    if(token && userId) {
      router.push(`/dashboard/${userId}`);
      // set alert on local storage and show it on dashboard page
      localStorage.setItem('alert',true)
    }
  }, []);

  // initial state
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [gender, setGender] = useState('male');
  const [role, setRole] = useState('member');
  const [isLoading, setIsLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // validation
  const [nameEmpty, setNameEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordIsTooShort, setPasswordIsTooShort] = useState(false);
  const [passwordConfirmationEmpty, setPasswordConfirmationEmpty] = useState(false);
  const [passwordConfirmationMatch, setPasswordConfirmationMatch] = useState(true);
  const [isCheck, setIsCheck] = useState(true);

  const registerHandler = async (e) => {
    // to avoid reload after button was clicked
    e.preventDefault();

    if (!name) {
      setNameEmpty(true)
    } if (!email) {
      setEmailEmpty(true)
    } if (!password) {
      setPasswordEmpty(true)
    } if (!name && !password) {
      setNameEmpty(true)
      setPasswordEmpty(true)
    } if (!email && !password) {
      setEmailEmpty(true)
      setPasswordEmpty(true)
    } if (!email && !password) {
      setEmailEmpty(true)
      setPasswordEmpty(true)
    } if (!name && !email && !password) {
      setNameEmpty(true)
      setEmailEmpty(true)
      setPasswordEmpty(true)
    } 
    if (name && email && password) {
      setIsSend(false);
      setIsLoading(true);

      await axios.post('https://express-mongoose-validator.herokuapp.com/api/register', 
        ({ 
          name: name, 
          email: email, 
          password: password, 
          gender: gender, 
          role: role 
        })
      ).then((response) => {
        setIsLoading(false);
        setIsSend(true);
        // set token and user id on local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user.id);
        // redirect to dashboard (auto sign in after register)
        router.push(`/dashboard/${response.data.user.id}`);
      }).catch((error) => {
        setIsLoading(false);
        setErrorMessage(error.message);
      })
    }
  }
  
  return (
    <div className="lg:h-full md:h-screen h-screen bg-blue-300 pb-9 poppins" >

      <HeadElement text={`Register - Page`} />

      <div className='bg-blue-500 roboto text-center text-white w-full'>
        Registrasi User
      </div>

      <Navbar/>

      <main className='bg-blue-100 mx-auto max-w-md mt-8 lg:p-7 md:p-5 p-3 rounded-xl shadow'>
        <h3 className='font-bold'>Registrasi Pengguna Baru</h3>
        <p>Mohon isi data berikut dengan benar.</p>
        <form onSubmit={''}>
          <div className='flex flex-col lg:my-3 md:my-3 my-2'>
            <label>Nama Lengkap</label>
            <input type="text"
              className='bg-blue-50 border-2 border-blue-500 hover:border-blue-600 px-2 py-1 rounded text-black'
              value={name} 
              onChange={(e) => {
                setName(e.target.value);
                setIsLoading(false);
                setIsSend(false);
                setErrorMessage('');
                if (e.target.value === '') { setNameEmpty(true); }
                if (e.target.value !== '') { setNameEmpty(false); }
              }}
              placeholder='Nama Lengkap'
            />
          </div>
          {/* Validation */}
          {nameEmpty === true && (
            <div className="border-2 border-red-300 bg-red-100 my-2 p-3 rounded text-black">
              Nama harus di isi
            </div>
          )}

          <div className='flex flex-col lg:my-3 md:my-3 my-2'>
            <label>Email</label>
            <input 
              type='email' 
              className='bg-blue-50 border-2 border-blue-500 hover:border-blue-600 px-2 py-1 rounded text-black'
              value={email} 
              onChange={(e) => {
                setEmail(e.target.value);
                setIsLoading(false);
                setIsSend(false);
                setErrorMessage('');
                if (e.target.value === '') { setEmailEmpty(true); }
                if (e.target.value !== '') { setEmailEmpty(false); }
              }}
              placeholder='Alamat Email'
            />
          </div>
          {/* Validation */}
          {emailEmpty === true && (
            <div className="border-2 border-red-300 bg-red-100 my-2 p-3 rounded text-black">
              Email harus di isi
            </div>
          )}

          <div className='flex flex-col lg:my-3 md:my-3 my-2'>
            <label>Password</label>
            <input 
              type='password'
              className='bg-blue-50 border-2 border-blue-500 hover:border-blue-600 px-2 py-1 rounded text-black'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsLoading(false);
                setIsSend(false);
                setErrorMessage('');
                if (e.target.value === '') { 
                  setPasswordEmpty(true);
                  setPasswordIsTooShort(false);
                }
                if (e.target.value !== '' && e.target.value.length < 8) { 
                  setPasswordEmpty(false); 
                  setPasswordIsTooShort(true);
                }
                if (e.target.value !== '' && e.target.value.length >= 8) { 
                  setPasswordEmpty(false); 
                  setPasswordIsTooShort(false);
                }
              }} 
              placeholder='Masukkan Password'
            />
          </div>
          {/* Validation */}
          {passwordEmpty === true && (
            <div className="border-2 border-red-300 bg-red-100 my-2 p-3 rounded text-black">
              Password harus di isi
            </div>
          )}
          {passwordIsTooShort === true && (
            <div className="border-2 border-red-300 bg-red-100 my-2 p-3 rounded text-black">
              Password terlalu pendek (minimal 8 karakter)
            </div>
          )}

          <div className='flex flex-col lg:my-3 md:my-3 my-2'>
            <label>Konfirmasi Password</label>
            <input 
              type='password'
              className='bg-blue-50 border-2 border-blue-500 hover:border-blue-600 px-2 py-1 rounded text-black'
              value={passwordConfirmation}
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
                setIsLoading(false);
                setIsSend(false);
                setErrorMessage('');
                if (e.target.value === '') {
                  setPasswordConfirmationEmpty(true);
                  setPasswordConfirmationMatch(true);
                }
                if (e.target.value !== '' && e.target.value !== password) {
                  setPasswordConfirmationEmpty(false);
                  setPasswordConfirmationMatch(false);
                }
                if (e.target.value !== '' && e.target.value === password) {
                  setPasswordConfirmationEmpty(false);
                  setPasswordConfirmationMatch(true);
                }
              }} 
              placeholder='Konfirmasi Password'
            />
          </div>
          {/* Validation */}
          {passwordConfirmationEmpty === true && (
            <div className="border-2 border-red-300 bg-red-100 my-2 p-3 rounded p-3">
              Konfirmasi password harus di isi
            </div>
          )}
          {passwordConfirmationMatch === false && (
            <div className="border-2 border-red-300 bg-red-100 my-2 p-3 rounded p-3">
              Password tidak sama
            </div>
          )}

          <div className='flex flex-col lg:my-3 md:my-3 my-2'>
            <label className="form-label">Jenis kelamin</label>
            <select 
              className='bg-blue-50 border-2 border-blue-500 hover:border-blue-600 px-2 py-2 rounded text-black'
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                setIsLoading(false);
                setIsSend(false);
                setErrorMessage('');
              }}
            >
              <option value='male'>Laki-laki</option>
              <option value='female'>Perempuan</option>
            </select>
          </div>

          <div className='flex flex-col lg:my-3 md:my-3 my-2'>
            <label>
            <input 
              type="checkbox"
              value={isCheck}
              defaultChecked={isCheck}
              onChange={() => {
                setIsCheck(!isCheck);
                setIsLoading(false);
                setIsSend(false);
                setErrorMessage('');
                if (isCheck === true) {setRole('')}
                if (isCheck === false) {setRole('member')}
              }}
            />
              {' '}Saya mendaftar sebagai pengguna baru
            </label>
          </div>
          {/* Validation */}
          {isCheck === false && (
            <div className="border-2 border-red-300 bg-red-100 my-2 p-3 rounded p-3">
              Klik pernyataan di atas
            </div>
          )}
          
          <button
            className='bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-200 text-white mx-auto lg:my-3 md:my-3 my-2 px-4 py-2 rounded-full w-full'
            onClick={registerHandler} type='submit'
          >
            DAFTAR
          </button>
          {/* Validation */}
          {isLoading === true && (
            <div className="border-2 border-blue-300 bg-blue-100 my-2 p-3 rounded my-2">
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                variant="primary"
              /> Tunggu sebentar...
            </div>
          )}
          {isSend === true && (
            <div className="border-2 border-blue-300 bg-blue-100 my-2 p-3 rounded my-2">
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                variant="primary"
              /> Sedang mengirim data...
            </div>
          )}
          {errorMessage === 'Request failed with status code 409' && (
            <div className="border-2 border-red-300 bg-red-100 my-2 p-3 rounded my-2">
              Email sudah terdaftar, silahkan masuk{' '} 
              <Link href='/login'>
                <a className='no-underline'>
                  di sini
                </a>
              </Link>.
            </div>
          )}
          {errorMessage === 'Request failed with status code 500' && (
            <div className="border-2 border-red-300 bg-red-100 my-2 p-3 rounded my-2">
              Pendaftaran gagal, coba cek apakah masih ada yang kosong.
            </div>
          )}

        </form>

        <hr className='my-2'/>
        <p>Sudah punya akun?{' '}
          <Link href='/login'>
            <a className='no-underline'>
              Masuk di sini
            </a>
          </Link>
        </p>
      </main>

    </div>
  )
}