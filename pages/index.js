import Footer from '../components/Footer';
import HeadElement from '../components/Head';
import Navbar from '../components/NavbarChatbot';
import InferenceMachine from '../components/InferenceMachine';
import '../styles/Home.module.css';

export default function Home() {
  return (
    <div className='lg:h-full md:h-screen h-full bg-blue-300 m-0 opensans'>

      <HeadElement text={`EyeScreening - Chatbot`}/>
      
      <div className='bg-blue-500 roboto text-center text-white w-full'>
        Chatbot Expert System
      </div>
      
      <Navbar/>

      <main className='flex flex-row justify-center mt-3 mb-3'>
        <InferenceMachine/>
      </main>

      <Footer/>
    </div>
  )
}
