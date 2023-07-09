import Footer from "../components/Footer";
import HeadElement from "../components/Head";
import Navbar from "../components/NavbarChatbot";
import InferenceMachine from "../components/InferenceMachine";
import "../styles/Home.module.css";
import Hero from "../components/Hero";
import Benefit from "../components/Benefit";

export default function Home() {
  return (
    <div className="bg-[#F3F7FF] h-full m-0 monomaniac">
      <HeadElement text={`EyeScreening - Chatbot`} />
      <Navbar />
      <Hero />
      <Benefit />
      <main className="flex flex-row justify-center mt-2 mb-2">
        {/* <InferenceMachine /> */}
      </main>
      <Footer />
    </div>
  );
}
