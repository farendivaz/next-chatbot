import {Accordion} from 'react-bootstrap';
import HeadElement from '../components/Head';
import Navbar from '../components/NavbarChatbot';

const AccordionBootstrap = ({eventKey,Title,Text}) => {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{Title}</Accordion.Header>
      <Accordion.Body>{Text}</Accordion.Body>
    </Accordion.Item>
  )
}

export default function Guide () {
  return(
    <div className='h-screen bg-blue-300 m-0 pb-5 poppins'>

      <HeadElement text={`Chatbot - guide`}/>

      <div className='bg-blue-500 roboto text-center text-white w-full'>
        Expert System User Guide
      </div>

      <Navbar/>

      <main className='flex flex-row justify-center mt-8 mb-4'>
        <div 
          className='border-2 border-white mx-auto mt-0 p-3 overflow-hidden rounded-lg shadow-lg'
          style={{maxWidth:'700px',width:'99%'}}
        >
          <p className='my-1 font-bold text-blue-500 text-black' style={{fontSize:'20px'}}>
            Panduan Penggunaan Chatbot Sistem Pakar Skrining Penyakit Mata
          </p>
          <hr/>
          <Accordion defaultActiveKey='0' className='border-2 border-white my-1 rounded'>
            <AccordionBootstrap 
              eventKey={"0"}
              Title = {(<p className='font-bold m-0'>Panduan Umum</p>)}
              Text = {(
                <div>
                  <p className='my-1'>
                    <span className='font-bold text-primary'>Ketikkan : </span>
                    mulai,  tes,  test atau skrining pada input chat untuk{' '}
                    melakukan skrining penyakit mata atau klik tombol{' '}
                    <span className='font-bold text-blue-500'>mulai</span> berwarna biru.
                  </p>
                  <p className='my-1'>
                    <span className='font-bold text-blue-500'>Jawab </span>
                    setiap pertanyaan dengan{' '}
                    <span className='font-bold text-blue-500'>y (ya)</span> atau{' '}
                    <span className='font-bold text-blue-500'>t (tidak)</span> atau{' '}
                    klik tombol ya atau tidak yang berwarna biru.
                  </p>
                </div>
              )}
            />
            <AccordionBootstrap 
              eventKey={"1"}
              Title = {(<p className='font-bold m-0'>Daftar Penyakit Mata yang Bisa di Skrining</p>)}
              Text = {(
                <div className='font-bold text-black'>
                  <p className='my-1'>1.) Ulkus Kornea</p>
                  <p className='my-1'>2.) Keratokonus</p>
                  <p className='my-1'>3.) Kalazion</p>
                  <p className='my-1'>4.) Blefaritis</p>
                  <p className='my-1'>5.) Hordeolum (Stye)</p>
                  <p className='my-1'>6.) Konjungtivitis</p>
                  <p className='my-1'>7.) Trakoma</p>
                  <p className='my-1'>8.) Abalso Retina</p>
                  <p className='my-1'>9.) Retinopati Diabetikum</p>
                  <p className='my-1'>10.) Glaukoma</p>
                  <p className='my-1'>11.) Katarak</p>
                  <p className='my-1'>12.) Uveitis</p>
                  <p className='my-1'>13.) Selulitis Orbitalis</p>
                  <p className='my-1'>14.) Eksoftalmus</p>
                  <p className='my-1'>15.) Keratitis Pungtata Superfisialis</p>
                  <p className='my-1'>16.) Alergi Mata Merah</p>
                  <p className='my-1'>17.) Endoftalmitis</p>
                  <p className='my-1'>18.) Trombosis Sinus Kavernosus</p>
                  <p className='my-1'>19.) Optic Neuritis</p>
                  <p className='my-1'>20.) Dakrioritis</p>
                  <p className='my-1'>21.) Degenerasi Makula</p>
                  <p className='my-1'>22.) Episkleritis</p>
                  <p className='my-1'>23.) Infeksi Herpes Simpleks Kornea</p>
                  <p className='my-1'>24.) Infeksi Herpes Zoster Kornea</p>
                  <p className='my-1'>25.) Keratitis Ulserativa Perifer</p>
                  <p className='my-1'>26.) Degenerasi Makula</p>
                  <p className='my-1'>27.) Skleritis</p>
                </div>
              )}
            />
            <AccordionBootstrap 
              eventKey={"2"}
              Title = {(<p className='font-bold m-0'>Catatan</p>)}
              Text = {(
                <div>
                  <p className='my-1'>
                    Hasil skrining dari sistem pakar ini <span className='font-bold text-blue-500'>tidak bisa </span>
                    dijadikan sebagai keputusan akhir diagnosis penyakit mata anda.
                  </p>
                  <p className='my-1'>
                    Hasil skrining tersebut <span className='font-bold text-blue-500'>bisa </span>
                    anda gunakan untuk konsultasi dengan dokter spesialis mata untuk diagnosis lebih lanjut.
                  </p>
                </div>
              )}
            />
          </Accordion>
        </div>
      </main>
    </div>
  )
};