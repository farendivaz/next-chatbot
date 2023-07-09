import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import HeadElement from "../components/Head";
import Navbar from "../components/NavbarChatbot";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    // if user already login, this login page can not be accessed
    if (token && userId) {
      router.push(`/dashboard/${userId}`);
    }
  }, []);

  // initial state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);
  // validation
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordIsTooShort, setPasswordIsTooShort] = useState(false);

  const loginHandler = async (e) => {
    // to avoid reload after button was clicked
    e.preventDefault();

    if (!email) {
      setEmailEmpty(true);
    }
    if (!password) {
      setPasswordEmpty(true);
    }
    if (!email && !password) {
      setEmailEmpty(true);
      setPasswordEmpty(true);
    }
    if (email && password) {
      setIsSend(false);
      setIsLoading(true);
      // send data to server
      await axios
        .post(`https://express-mongoose-validator.herokuapp.com/api/login`, {
          email,
          password,
        })
        .then((response) => {
          setIsLoading(false);
          setIsSend(true);
          // set token and user id on local storage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user_id", response.data.user.id);
          // redirect to dashboard
          router.push(`/dashboard/${response.data.user.id}`);
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <div className="bg-blue-300 h-screen poppins">
      <HeadElement text={`Login - Page`} />

      <div className="bg-blue-500 roboto text-center text-white w-full">
        User Login
      </div>

      <Navbar />

      <main className="bg-blue-100 mx-auto mt-8 max-w-md lg:p-7 md:p-5 p-3 rounded-xl shadow">
        <h3 className="font-bold">Login Pengguna</h3>
        <p>Silahkan login dengan isi data berikut.</p>
        <form onSubmit={""}>
          <div className="flex flex-col lg:my-3 md:my-3 my-2">
            <label>Email</label>
            <input
              type="email"
              className="bg-blue-50 border-2 border-blue-500 hover:border-blue-600 px-2 py-1 rounded text-black"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsLoading(false);
                setErrorMessage("");
                if (e.target.value === "") {
                  setEmailEmpty(true);
                }
                if (e.target.value !== "") {
                  setEmailEmpty(false);
                }
              }}
              placeholder="Alamat Email"
            />
          </div>
          {/* Validation */}
          {emailEmpty === true && (
            <div className="border-2 border-red-300 bg-red-100 p-3 rounded text-black">
              Email harus di isi
            </div>
          )}

          <div className="flex flex-col lg:my-3 md:my-3 my-2">
            <label>Password</label>
            <input
              type="password"
              className="bg-blue-50 border-2 border-blue-500 hover:border-blue-600 px-2 py-1 rounded text-black"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsLoading(false);
                setErrorMessage("");
                if (e.target.value === "") {
                  setPasswordEmpty(true);
                  setPasswordIsTooShort(false);
                }
                if (e.target.value !== "" && e.target.value.length < 8) {
                  setPasswordEmpty(false);
                  setPasswordIsTooShort(true);
                }
                if (e.target.value !== "" && e.target.value.length >= 8) {
                  setPasswordEmpty(false);
                  setPasswordIsTooShort(false);
                }
              }}
              placeholder="Masukkan Password"
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

          <button
            className="bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-200 text-white mx-auto lg:my-3 md:my-3 my-2 px-4 py-2 rounded-full w-full"
            onClick={loginHandler}
            type="submit"
          >
            MASUK
          </button>
          {/* Validation */}
          {isLoading === true && (
            <div className="border-2 border-blue-300 bg-blue-100 p-3 rounded my-2">
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                variant="primary"
              />{" "}
              Tunggu sebentar...
            </div>
          )}
          {isSend === true && (
            <div className="border-2 border-blue-300 bg-blue-100 p-3 rounded my-2">
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                variant="primary"
              />{" "}
              Sedang mengirim data...
            </div>
          )}
          {errorMessage === "Request failed with status code 404" && (
            <div className="border-2 border-red-300 bg-red-100 p-3 rounded my-2">
              Email tidak terdaftar, silahkan daftar{" "}
              <Link href="/register">
                <a className="no-underline">di sini.</a>
              </Link>
              ..
            </div>
          )}
          {errorMessage === "Request failed with status code 401" && (
            <div className="border-2 border-red-300 bg-red-100 p-3 rounded my-2">
              Email terdaftar, tapi password salah.
            </div>
          )}
        </form>
        <hr className="my-2" />
        <p>
          Belum punya akun?{" "}
          <Link href="/register">
            <a className="no-underline">Daftar di sini</a>
          </Link>
        </p>
      </main>
    </div>
  );
}
