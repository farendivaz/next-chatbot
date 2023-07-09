import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
import Link from "next/link";

export default function Navbar() {
  // const router = useRouter();
  // const [tokenEmpty, setTokenEmpty] = useState(true);
  // useEffect(() => {
  //   //get token from local storage when browser reload
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     setTokenEmpty(true);
  //   } else {
  //     setTokenEmpty(false);
  //   }
  // }, []);

  // const [loading, setLoading] = useState(false);
  // const logoutHandler = () => {
  //   setLoading(true);
  //   // remove token, user_id and screening_result from localStorage
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user_id");
  //   localStorage.removeItem("screening_result");
  //   router.push("/login");
  // };

  return (
    // <nav
    //   style={{
    //     position:'-webkit-sticky',
    //     position:'sticky',
    //     top:'0px',
    //   }}
    //   className='bg-blue-300 flex justify-center m-0 py-1 px-0 top-0 shadow lg:space-x-4 md:space-x-3 sm:space-x-2 text-dark w-full z-10'
    // >
    //   {tokenEmpty === true && (
    //     <>
    //       {[
    //         ['Home', '/'],
    //         ['Panduan','/guide'],
    //         ['Register', '/register'],
    //         ['Masuk', '/login']
    //       ].map(([title, url], index) => (
    //         <Link href={url} key={index}>
    //           <a className="font-bold hover:bg-blue-100 no-underline roboto rounded-lg my-0 px-3 py-2 text-gray-900 hover:text-gray-900">
    //             {title}
    //           </a>
    //         </Link>
    //       ))}
    //     </>
    //   )}
    //   {tokenEmpty === false && (
    //     <>
    //       {[
    //         ['Home', `/dashboard/${localStorage.getItem('user_id')}`],
    //         ['Panduan','/guide'],
    //         ['UAT', '/uat'],
    //       ].map(([title, url], index) => (
    //         <Link href={url} key={index}>
    //           <a className="font-bold hover:bg-blue-100 no-underline roboto rounded-lg my-0 px-3 py-2 text-gray-900 hover:text-gray-900">
    //             {title}
    //             </a>
    //         </Link>
    //       ))}
    //       {loading === false && (
    //         <button
    //           className="font-bold bg-red-200 hover:bg-red-100 focus:bg-red-300 no-underline my-0 lg:px-3 md:px-3 px-2 py-2 rounded-lg"
    //           onClick={logoutHandler}
    //         >
    //           Keluar
    //         </button>
    //       )}
    //       {loading === true && (
    //         <button
    //           className="font-bold bg-red-200 hover:bg-red-100 focus:bg-red-300 no-underline my-0 lg:px-3 md:px-3 px-2 py-2 rounded-lg"
    //           onClick={logoutHandler}
    //         >
    //           <Spinner
    //             as="span"
    //             animation="grow"
    //             size="sm"
    //             role="status"
    //             aria-hidden="true"
    //             variant="danger"
    //           /> Keluar
    //         </button>
    //       )}
    //     </>
    //   )}
    // </nav>
    <nav className="w-11/12 mx-auto py-4 flex justify-between items-center ">
      <Link href="/">
        <img src="eye.svg" alt="SISTEM PAKAR" />
      </Link>
      <ul className="flex justify-center text-base gap-8 font-bold">
        <li className="p-2">
          <Link href="/">HOME</Link>
        </li>
        <li className="p-2">
          <Link href="/">ABOUT</Link>
        </li>
        <li className="bg-blue-600 rounded-lg text-white p-2">
          <Link href="/">LOGIN</Link>
        </li>
      </ul>
    </nav>
  );
}
