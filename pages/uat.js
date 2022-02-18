import Footer from '../components/Footer';
import HeadElement from '../components/Head';
import Navbar from '../components/Navbar';

export default function FormTesting () {
  return (
    <div class='bg-blue-300 m-0 poppins'>

      <HeadElement text={`UAT - From`} />

      <div className='bg-blue-500 roboto text-center text-white w-full'>
        Expert System UAT Form
      </div>

      <Navbar/>

      <main className='border rounded shadow-sm mt-8 mb-3 mx-auto py-3 px-3'
        style={{maxWidth:'700px',width:'99%'}}
      >
        <iframe
          title='form UAT'
          src='https://docs.google.com/forms/d/e/1FAIpQLSfMfIO_wa6TJKg5SrgadHuwDWlnNFDpk1P-PX1_vwHjumbLVg/viewform?embedded=true'
          height='5000' 
          frameBorder='0'
          className='mx-auto w-full'
        >Loading…
        </iframe>
      </main>
      
      <Footer/>
    </div>
  )
}