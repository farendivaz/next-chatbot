import Footer from '../components/Footer';
import HeadElement from '../components/Head';
import Navbar from '../components/NavbarChatbot';
import InferenceMachine from '../components/InferenceMachine';
import '../styles/Home.module.css';

export default function Home() {
  return (
    <div className='bg-blue-300 h-full m-0 poppins'>
      <HeadElement text={`EyeScreening - Chatbot`}/>
      <div className='bg-blue-500 roboto text-center text-white w-full'>
        Chatbot Expert System
      </div>
      <Navbar/>
      <main className='flex flex-row justify-center mt-2 mb-2'>
        <InferenceMachine/>
      </main>
      <Footer/>
    </div>
  )
}
