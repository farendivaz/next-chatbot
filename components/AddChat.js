export default function AddChat(input, reply) {
     const messagesContainer = document.getElementById('messages')
     // create element for user reply
     const userDiv = document.createElement('div')
           userDiv.id = ''
           userDiv.className = 'bg-blue-600 border-2 border-white my-1 ml-auto px-3 py-2 max-w-7xl rounded-l-3xl rounded-br-2xl text-light w-min'
           userDiv.innerHTML = `Mengirim`
     // add userDiv to messagesContainer
     messagesContainer.appendChild(userDiv)
     // Fake delay to seem 'real'
     setTimeout(() => {
         userDiv.innerHTML = `${input}`
     }, 200)
     // create div element for bot reply
     const botDiv = document.createElement('div')
           botDiv.id = ''
           botDiv.className = 'my-1 mr-auto w-full'
     // create bot image element
     const botImg = document.createElement('i')
           botImg.className = 'inline-block bi bi-robot bg-slate-100 border-2 border-blue-700 px-2 py-1 rounded-full text-dark text-xl'
           botDiv.appendChild(botImg)   
     // create text element
     const botText = document.createElement('p')
           botText.className = 'inline-block bg-slate-100 border-2 border-blue-700 ml-1 px-2 py-1 rounded-r-3xl rounded-tl-2xl text-dark w-4/5'
           botText.innerHTML = `Mengetik...`
           botDiv.appendChild(botText)
     // add botDiv to messagesContainer
     messagesContainer.appendChild(botDiv)
     // Fake delay to seem 'real'
     setTimeout(() => {
       botText.innerHTML = `${reply}`
     }, 300)
}