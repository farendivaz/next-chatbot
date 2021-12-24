import React, {useEffect, useRef} from 'react';
import SendIcon from '@mui/icons-material/Send';

export default function ChatbotInterfaceCopy({
    input,i,j,
    handleChange,
    handleEnter,
    handleSubmit,
    handleMulai,
    handleYa,
    handleTidak,
    lastValue,ruleBaseLength,ruleBaseILength,totalGejala
  }) {

  // create a ref 
  const messageEl = useRef(null);
  // https://www.cluemediator.com/auto-scroll-to-the-bottom-in-a-react-chat-application 
  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

  return (
    <div className='border-2 mx-auto mb-2 max-w-3xl overflow-hidden p-0 rounded-xl hover:border-blue-500 shadow-lg w-full'>
      <div className='mx-0 mb-0 w-100 rounded shadow-hover-primary'>
        <h4 className='bg-primary mb-0 p-1 w-100 opensans rounded-top text-center text-light text-xl'>
          Chat Bot Sistem Pakar
        </h4>
        <div 
          id='messages' 
          className='bg-chat h-96 max-h-96 mx-0 px-2 py-1 w-100 overflow-y-scroll' 
          ref={messageEl}
        >
          {/*Chat will be append in here*/}
        </div>
        <div className='flex p-2 w-100'>
          <input 
            id='input' 
            type='text'
            className='border-2 border-sky-500 hover:border-blue-600 ml-auto px-3 py-2 rounded-full w-4/5'
            value={input}
            placeholder='Ketik respon kamu ...'
            onChange={handleChange}
            onKeyPress={handleEnter}
          />
          <button 
            type='submit' 
            value='Submit' 
            onClick={handleSubmit}
            className='bg-blue-600 hover:bg-blue-800 mx-1 py-2 rounded-full w-1/5'
          >
            <span className="mx-auto text-white text-lg"><SendIcon/></span>
          </button>
        </div>
      </div>
      <div className='flex p-1 mx-1'>
        <div className='d-grid gap-2 p-1 w-1/3'>
          <button 
            type='submit' 
            value='Submit' 
            onClick={handleMulai} 
            className='bg-blue-600 hover:bg-blue-800 py-2 rounded-full text-white'
          >
            skrining
          </button>
        </div>
        <div className='d-grid gap-2 p-1 w-1/3'>
          <button 
            type='submit' 
            value='Submit' 
            onClick={handleYa} 
            className='bg-blue-600 hover:bg-blue-800 py-2 rounded-full text-white'
          >
            ya
          </button>
        </div>
        <div className='d-grid gap-2 p-1 w-1/3'>
          <button 
            type='submit' 
            value='Submit' 
            onClick={handleTidak} 
            className='bg-blue-600 hover:bg-blue-800 py-2 rounded-full text-white'
          >
            tidak
          </button>
        </div>
      </div>
      {/*
      <div className='my-1 mx-2'>[ i ][ j ] : [{i}][{j}]</div>
      <div className='my-1 mx-2'>ruleBase[ i ].Length : {ruleBaseILength}</div>
      <div className='my-1 mx-2'>ruleBase.length : {ruleBaseLength}</div>
      <div className='my-1 mx-2'>lastValue : {lastValue}</div>
      <div className='my-1 mx-2'>totalGejala : {totalGejala}</div>
      */}
    </div>
  )
}