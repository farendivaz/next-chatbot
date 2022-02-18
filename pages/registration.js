import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import HeadElement from '../components/Head';
import Link from 'next/link';

export default function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [gender, setGender] = useState('male');
  const [checkRole, setCheckRole] = useState('');
  const [nameEmpty, setNameEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordConfirmationEmpty, setPasswordConfirmationEmpty] = useState(false);
  const [passwordConfirmationMatch, setPasswordConfirmationMatch] = useState(false);
  const [genderEmpty, setGenderEmpty] = useState(false);
  const [roleNotChecked, setRoleNotChecked] = useState(false);
  const [send, setSend] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const loginHandler = async (e) => {
    // validation after button was click
    if (!name) { setNameEmpty(true); }
    if (!email) { setEmailEmpty(true); }
    if (!password) { setPasswordEmpty(true); }
    if (!passwordConfirmationEmpty) { setPasswordConfirmationEmpty(true); }
    if (passwordConfirmation !== password) { setPasswordConfirmationMatch(true); }
    if (!gender) { setGenderEmpty(true); }
    if (!checkRole) { setRoleNotChecked(true); }
    e.preventDefault();
    // send data to server
    await axios.post('http://localhost:5000/api/registration', 
      ({
        name,
        email,
        password,
        gender,
        role: checkRole,
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
    <div className="bg-blue-300 pb-9 poppins" >

      <style jsx>{`
      `}</style>

      <HeadElement text={`Login - Page`} />

      <div className='bg-blue-500 roboto text-center text-white w-full'>
        Admin Login
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
        ].map(([title, url], index) => (
          <Link href={url} key={index}>
            <a className="font-bold hover:bg-blue-100 no-underline roboto rounded-lg my-0 px-3 py-2 text-gray-900 hover:text-gray-900">
              {title}
            </a>
          </Link>
        ))}
      </nav>

      <main className='bg-blue-100 mx-auto max-w-md mt-8 lg:p-7 md:p-5 sm:p-3 rounded-xl shadow'>
        {/*form*/}
          <h3 className='font-bold'>Registrasi Pengguna Baru</h3>
          <p>Mohon isi data berikut dengan benar.</p>
          <form onSubmit={loginHandler}>
            <div className='flex flex-col lg:my-3 md:my-3 sm:my-2'>
              <label>Nama Lengkap</label>
              <input type="text"
                className='bg-blue-50 border-2 border-blue-500 hover:border-blue-600 px-2 py-1 rounded text-black'
                value={name} 
                onChange={(e) => {
                  setName(e.target.value);
                  setNameEmpty(false);
                  setEmailEmpty(false);
                  setPasswordEmpty(false);
                  setPasswordConfirmationEmpty(false);
                  setPasswordConfirmationMatch(false);
                  setGenderEmpty(false);
                  setRoleNotChecked(false);
                  setSend(false);
                  setError('');
                }}
                placeholder='Nama Lengkap'
              />
            </div>
            {nameEmpty === true && (
              <div className="border-2 border-red-300 bg-red-100 p-3 rounded">
                Nama harus diisi
              </div>
            )}
            <div className='flex flex-col lg:my-3 md:my-3 sm:my-2'>
              <label>Email</label>
              <input 
                type='email' 
                className='bg-blue-50 border-2 border-blue-500 hover:border-blue-600 px-2 py-1 rounded text-black'
                value={email} 
                onChange={(e) => {
                  setEmail(e.target.value);
                  setNameEmpty(false);
                  setEmailEmpty(false);
                  setPasswordEmpty(false);
                  setPasswordConfirmationEmpty(false);
                  setPasswordConfirmationMatch(false);
                  setGenderEmpty(false);
                  setRoleNotChecked(false);
                  setSend(false);
                  setError('');
                }}
                placeholder='Alamat Email'
              />
            </div>
            {emailEmpty === true && (
              <div className="border-2 border-red-300 bg-red-100 p-3 rounded">
                Email harus diisi
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
                  setNameEmpty(false);
                  setEmailEmpty(false);
                  setPasswordEmpty(false);
                  setPasswordConfirmationEmpty(false);
                  setPasswordConfirmationMatch(false);
                  setGenderEmpty(false);
                  setRoleNotChecked(false);
                  setSend(false);
                  setError('');
                }} 
                placeholder='Masukkan Password'
              />
            </div>
            {passwordEmpty === true && (
              <div className="border-2 border-red-300 bg-red-100 p-3 rounded">
                Password harus diisi
              </div>
            )}
            <div className='flex flex-col lg:my-3 md:my-3 sm:my-2'>
              <label>Konfirmasi Password</label>
              <input 
                type='password'
                className='bg-blue-50 border-2 border-blue-500 hover:border-blue-600 px-2 py-1 rounded text-black'
                value={passwordConfirmation}
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                  setNameEmpty(false);
                  setEmailEmpty(false);
                  setPasswordEmpty(false);
                  setPasswordConfirmationEmpty(false);
                  setPasswordConfirmationMatch(false);
                  setGenderEmpty(false);
                  setRoleNotChecked(false);
                  setSend(false);
                  setError('');
                }} 
                placeholder='Konfirmasi Password'
              />
            </div>
            {passwordConfirmationEmpty === true && (
              <div className="border-2 border-red-300 bg-red-100 p-3 rounded p-3">
                Konfirmasi password harus di isi
              </div>
            )}
            {passwordConfirmationMatch === true && (
              <div className="border-2 border-red-300 bg-red-100 p-3 rounded p-3">
                Password tidak sama
              </div>
            )}
            <div className='flex flex-col lg:my-3 md:my-3 sm:my-3'>
              <label className="form-label">Jenis kelamin</label>
              <select 
                className='bg-blue-50 border-2 border-blue-500 hover:border-blue-600 px-2 py-2 rounded text-black'
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setNameEmpty(false);
                  setEmailEmpty(false);
                  setPasswordEmpty(false);
                  setPasswordConfirmationEmpty(false);
                  setPasswordConfirmationMatch(false);
                  setGenderEmpty(false);
                  setRoleNotChecked(false);
                  setSend(false);
                  setError('');
                }}
              >
                <option value='male'>Laki-laki</option>
                <option value='female'>Perempuan</option>
              </select>
            </div>
            <div className='flex flex-col lg:my-3 md:my-3 sm:my-3'>
              <label>
              <input 
                type="checkbox" 
                value={checkRole}
                onChange={() => {
                  setCheckRole('user')
                  setNameEmpty(false);
                  setEmailEmpty(false);
                  setPasswordEmpty(false);
                  setPasswordConfirmationEmpty(false);
                  setPasswordConfirmationMatch(false);
                  setGenderEmpty(false);
                  setRoleNotChecked(false);
                  setSend(false);
                  setError('');
                }}
              />
                {' '}Saya mendaftar sebagai pengguna
              </label>
            </div>
            {roleNotChecked === true && (
              <div className="border-2 border-red-300 bg-red-100 p-3 rounded p-3">
                Klik pernyataan di atas
              </div>
            )}
            <button
              className='bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-200 text-white mx-auto lg:my-3 md:my-3 px-4 py-2 rounded-full w-full'
              onClick={loginHandler} type='submit'
            >
              MASUK
            </button>
            {send === true && (
              <div className="alert-info my-2">
                Tunggu sebentar...
              </div>
            )}
            {error === 'Request failed with status code 409' && (
              <div className="border-2 border-red-300 bg-red-100 p-3 rounded my-2">
                Email terdaftar, tapi password salah.
              </div>
            )}
            {error === 'Request failed with status code 500' && (
              <div className="border-2 border-red-300 bg-red-100 p-3 rounded my-2">
                Maaf email tidak terdaftar.
              </div>
            )}
          </form>
          <hr/>
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