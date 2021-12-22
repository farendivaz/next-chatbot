export default function AddChatWhenBrowserReload(text) {
    const messagesContainer = document.getElementById('messages')
    // create div element for bot reply
    const botDiv = document.createElement('div')
          botDiv.id = ''
          botDiv.className = 'my-1 mr-auto w-full'
    // create bot image element
    const botImg = document.createElement('i')
          botImg.className = 'inline-block bi bi-robot bg-slate-100 border-2 border-blue-700 px-2 py-1 rounded-full text-dark text-xl'
    // create text element
    const botText = document.createElement('p')
          botText.className = 'inline-block bg-slate-100 border-2 border-blue-700 ml-1 px-2 py-1 rounded-r-3xl rounded-tl-2xl text-dark w-max max-w-md'
          botText.innerHTML = `Mengetik...`
    botDiv.appendChild(botImg) 
    botDiv.appendChild(botText)
    // add botDiv to messagesContainer
    messagesContainer.appendChild(botDiv)
    // Fake delay to seem 'real'
    setTimeout(() => {
      botText.innerHTML = `${text}`
    },500)
}