import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [validation, setValidation] = useState([]);
  const router = useRouter();

  const registerHandler = async (e) => {
    e.preventDefault();    
    const formData = new FormData();      //initialize formData
    //append data to formData
    formData.append('name', name);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('password', password);
    formData.append('password-confirmation', passwordConfirmation);
    //send data to server
    await axios.post('http://localhost:8000/api/register', formData)
    .then(() => {
      router.push('/');
    })
    .catch((error) => {
      setValidation(error.response.data);
    })
  };

  const toLoginPage = () => {
  };

  return (
    <div className="poppins" >
      <main className='flex flex-col my-3' style={{marginTop:'80px'}}>
        <h4 className='fw-bold text-center text-primary'>EyeScreening</h4>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-5px rounded shadow-sm">
              <div className="card-body">
                <h4 className="fw-bold">Daftar sebagai Pengguna Baru</h4>
                <hr/>
                  <form onSubmit={registerHandler}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Nama Panggilan</label>
                          <input type="text" className="form-control" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder="Masukkan Nama Panggilan"/>
                        </div>
                        {validation.name && (
                          <div className="alert alert-danger">
                            {validation.name[0]}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Alamat Email</label>
                          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email"/>
                        </div>
                        {validation.email && (
                          <div className="alert alert-danger">
                            {validation.email[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password"/>
                        </div>
                        {validation.password && (
                          <div className="alert alert-danger">
                            {validation.password[0]}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Konfirmasi Password</label>
                          <input type="password" className="form-control" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Masukkan Konfirmasi Password"/>
                        </div>
                      </div>
                    </div>
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary">DAFTAR</button>
                    </div>
                    <div className="mt-3">
                      <p>Sudah daftar? Silahkan masukkan akun anda dengan klik tombol berikut</p>
                    </div>
                    <div className="d-grid gap-2">
                      <button onClick={toLoginPage} className="btn btn-outline-primary">MASUK</button>
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

export default Register;