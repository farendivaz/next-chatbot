import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import HeadElement from '../components/Head';
import Navbar from '../components/NavbarChatbot';
import Link from 'next/link';

export default function Register() {
  // initial state
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [gender, setGender] = useState('male');
  const [role, setRole] = useState('member');
  // sending and error sending
  const [send, setSend] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // validation
  const [nameEmpty, setNameEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordIsTooShort, setPasswordIsTooShort] = useState(false);
  const [passwordConfirmationEmpty, setPasswordConfirmationEmpty] = useState(false);
  const [passwordConfirmationMatch, setPasswordConfirmationMatch] = useState(true);
  const [isCheck, setIsCheck] = useState(true);
  // use router
  const router = useRouter();

  const registerHandler = async (e) => {
    if (nameEmpty === false && emailEmpty === false && passwordEmpty === false) {
      e.preventDefault();
      await axios.post('http://localhost:5000/api/register', 
        ({ name: name, email: email, password: password, gender: gender, role: role })
      ).then((response) => {
        setSend(true);
        // set token on local storage
        localStorage.setItem('token', response.data.token);
        // set user id on local storage
        localStorage.setItem('user_id', response.data.user.id);
        // redirect to dashboard (auto sign in after register)
        router.push(`/dashboard/${response.data.user.id}`);
      }).catch((error) => {
        setErrorMessage(error.message);
      })
    }
  }
  
  return (
    <div className="lg:h-full md:h-screen h-screen bg-blue-300 pb-9 poppins" >

      <style jsx>{`
      `}</style>

      <HeadElement text={`Login - Page`} />

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
          {send === true && (
            <div className="border-2 border-red-300 bg-red-100 my-2 p-3 rounded my-2">
              Tunggu sebentar...
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