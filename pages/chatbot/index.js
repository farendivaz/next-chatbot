import React from "react";
import ChatbotInterface from "./ChatbotInterface";
import HeadElement from "./Head";
import InferenceMachine from "./InferenceMachine";
import NavbarChatbot from "../../components/NavbarChatbot";

const index = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <HeadElement text={`Eye Checking Chatbot`} />
      <NavbarChatbot />
      <InferenceMachine />
    </div>
  );
};

export default index;
