import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from '../components/Navbar';

export default function FormTesting () {
  return (
    <div class='bg-blue-300 h-screen m-0 poppins'>

      <Head>
        <title>UAT - Form</title>
        <meta name='description' content='Generated by create next app' />
        <link rel="icon" href="https://clipground.com/images/programming-logo-clipart-5.jpg"></link>
      </Head>

      <Navbar/>

      <div className='border rounded shadow-sm mt-8 mb-3 mx-auto py-3 px-3'
        style={{paddingTop:'40px',maxWidth:'700px',width:'99%'}}
      >
        <iframe
          title='form UAT'
          src='https://docs.google.com/forms/d/e/1FAIpQLSfMfIO_wa6TJKg5SrgadHuwDWlnNFDpk1P-PX1_vwHjumbLVg/viewform?embedded=true'
          height='3150' 
          frameBorder='0'
          className='mx-auto w-100'
        >Loading…
        </iframe>
      </div>
      
    </div>
  )
}