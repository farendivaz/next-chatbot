import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Accordion} from 'react-bootstrap';
import Link from 'next/link';

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
    <div className='min-h-max pb-4 m-0' style={{paddingTop:'70px'}}>
      <nav
        style={{position:'fixed'}}
        className='bg-blue-200 flex justify-center m-0 py-1 px-0 top-0 shadow-sm space-x-3 text-dark w-100 z-10'
      >
        {[
          ['Home', '/',1],
          ['Panduan','/guide',2],
          ['UAT', '/uat',3],
          ['Dashboard', 'https://react-eyechatbot.vercel.app',4],
        ].map(([title, url, id]) => (
          <Link href={url} key={id}>
            <a className="font-bold hover:bg-blue-100 no-underline roboto rounded-lg my-0 px-3 py-2 text-gray-700 hover:text-gray-900">
              {title}
            </a>
          </Link>
        ))}
      </nav>

      <div 
        className='border-2 border-blue-300 hover:border-blue-600 mx-auto mt-0 mb-3 p-3 poppins overflow-hidden rounded-lg hover:shadow-lg' 
        style={{maxWidth:'700px',width:'99%'}}
      >
        <p className='my-1 font-bold text-blue-500 poppins' style={{fontSize:'20px'}}>
          Panduan Penggunaan Chatbot Sistem Pakar Skrining Penyakit Mata
        </p>
        <hr></hr>
        <Accordion defaultActiveKey='0' className='border-2 border-blue-300 my-1 rounded hover:border-blue-600'>
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
    </div>
  )
};