export default function Footer () {
  const year= new Date().getFullYear();
  return (
    <footer  className='bg-blue-300 mx-auto mt-3 px-8 py-2 text-center lg:text-lg md:text-lg sm:text-md w-full'>
      <p className="my-2 text-gray-600">
        Released under the{' '}
        <a href="https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt"
          target="_blank"
          className="text-gray-600 hover:text-black underline"
        >MIT License</a>
      </p>
      <p className='my-2 text-gray-600'>
        &copy; { year } - Mochamad Rafli Ramadhan
      </p>
      <p className='mx-auto mt-2 mb-1 text-gray-600'>
        Contact Developer
      </p>
      <div 
        className='my-1 mb-0 justify justify-row space-x-8'
        style={{'cursor': 'pointer'}}
      >
        <a href='https://www.github.com/mochamadrafli2018'
          className='text-gray-600 hover:text-black' target='_blank' rel='noreferrer'
        >
          <circle cx='15' cy='15' r='15' fill='#707092'/>
          <i className='bi-github fa-lg' role='img' aria-label='GitHub'></i>
        </a>
        <a href='https://www.instagram.com/rafli.r.rmdhn'
          className='text-gray-600 hover:text-black' target='_blank' rel='noreferrer'
        >
          <i className='bi-instagram' role='img' aria-label='Instagram'></i>
        </a>
        <a href='https://www.linkedin.com/in/mochamad-rafli-ramadhan'
          className='text-gray-600 hover:text-black' target='_blank' rel='noreferrer'
        >
          <i className='bi-linkedin' role='img' aria-label='Linkedin'></i>
        </a>
        <a href='http://wa.me/088227867544'
          className='text-gray-600 hover:text-black' target='_blank' rel='noreferrer'
        >
          <i className='bi bi-whatsapp' role='img' aria-label='Whatsup'></i>
        </a>
      </div>
    </footer>
  )
}