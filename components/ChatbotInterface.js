import React, { useEffect, useRef } from "react";
// import SendIcon from '@mui/icons-material/Send';

export default function ChatbotInterface({
  chatInput,
  handleChange,
  handleEnter,
  handleSubmit,
  handleNextScreening,
  handleStartScreening,
  handleYes,
  handleNo,
  messageLog,
}) {
  // create a ref
  const messagesEndRef = useRef(null); // empty chat

  const scrollToBottom = () => {
    /*
    scrollHeight: total container size.
    scrollTop: amount of scroll user has done.
    clientHeight: amount of container a user sees.
    */
    if (messagesEndRef) {
      messagesEndRef.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageLog]);

  return (
    <div className="border-2 border-blue-600 max-w-3xl rounded-xl shadow-lg w-full">
      <div className="mx-0 mb-0 w-100 rounded">
        <h4 className="bg-blue-600 mb-0 p-1 w-100 rounded-top text-center text-light text-xl">
          Chat Bot Sistem Pakar
        </h4>
        <div
          id="messages"
          className="bg-chat h-96 max-h-96 mx-0 px-2 py-1 w-100 overflow-y-scroll"
          ref={messagesEndRef}
        >
          {messageLog.map((item, index) => {
            // user chat
            if (item.sender === "user") {
              return (
                <p
                  key={index}
                  className="bg-blue-600 border-2 border-white my-1 ml-auto px-3 py-2 max-w-7xl rounded-l-3xl rounded-br-2xl text-light w-min"
                >
                  {item.message}
                </p>
              );
            }
            // bot chat
            else if (item.sender === "bot") {
              return (
                <div key={index}>
                  <i className="inline-block bi bi-robot bg-slate-100 border-2 border-blue-700 px-2 py-1 rounded-full text-dark text-xl"></i>
                  <p className="inline-block bg-slate-100 border-2 border-blue-700 ml-1 px-2 py-1 rounded-r-3xl rounded-tl-2xl text-dark w-4/5">
                    {item.message}
                  </p>
                </div>
              );
            }
          })}
          {/*Chat will be append in here*/}
        </div>
        <div className="flex p-1 w-100">
          <input
            id="chat-input"
            type="text"
            className="border-2 border-sky-500 hover:border-blue-600 ml-auto px-3 py-2 rounded-full w-4/5"
            value={chatInput}
            placeholder="Ketik respon kamu ..."
            onChange={handleChange}
            onKeyPress={handleEnter}
          />
          <button
            id="btn-submit"
            type="submit"
            value="Submit"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-800 mx-1 py-2 rounded-full w-1/5"
          >
            <span className="mx-auto text-white text-lg">Send</span>
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="d-grid gap-2 p-1 w-1/3">
          <button
            id="btn-start"
            type="submit"
            value="Submit"
            onClick={handleStartScreening}
            className="bg-blue-600 hover:bg-blue-800 py-2 rounded-full text-white"
          >
            Skrining
          </button>
        </div>
        <div className="d-grid gap-2 p-1 w-1/3">
          <button
            id="btn-next"
            type="submit"
            value="Submit"
            onClick={handleNextScreening}
            className="bg-blue-600 hover:bg-blue-800 py-2 rounded-full text-white"
          >
            Lanjut
          </button>
        </div>
        <div className="d-grid gap-2 p-1 w-1/3">
          <button
            id="btn-yes"
            type="submit"
            value="Submit"
            onClick={handleYes}
            className="bg-blue-600 hover:bg-blue-800 py-2 rounded-full text-white"
          >
            Ya
          </button>
        </div>
        <div className="d-grid gap-2 p-1 w-1/3">
          <button
            id="btn-no"
            type="submit"
            value="Submit"
            onClick={handleNo}
            className="bg-blue-600 hover:bg-blue-800 py-2 rounded-full text-white"
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
}
