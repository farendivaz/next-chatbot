import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from '../components/Footer';
import HeadElement from '../components/Head';
import Navbar from '../components/Navbar';
import InferenceMachine from '../components/InferenceMachine';
import '../styles/Home.module.css';

export default function Home() {
  return (
    <div className='bg-blue-300 m-0 opensans'>

      <HeadElement text={`EyeScreening - Chatbot`}/>
      
      <div className='bg-blue-900 text-center text-white w-full'>
        Chatbot Expert System
      </div>
      
      <Navbar/>

      <main className='flex flex-row justify-center' style={{paddingTop:'20px'}}>
        <InferenceMachine/>
      </main>

      <Footer/>
    </div>
  )
}
