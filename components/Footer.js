
export default function Footer () {
    const year= new Date().getFullYear();
    return (
        <footer 
            class='bg-dark footer-2-3 h-full poppins p-2 lg:px-15 md:px-15 sm:px-8 px-4 transition-all duration-500 linear'
        >
            <div 
                class='font-medium text-center text-gray-900 my-1 lg:mb-0 md:mb-0 space-x-8'
                style={{'cursor': 'pointer'}}
            >
                <a href='https://www.github.com/mochamadrafli2018' style={{fontSize:'20px'}}
                    className='text-gray-500 hover:text-white' target='_blank' rel='noreferrer'
                >
                    <circle cx='15' cy='15' r='15' fill='#707092'/>
                    <i className='bi-github fa-lg' role='img' aria-label='GitHub'></i>
                </a>
                <a href='https://www.instagram.com/rafli.r.rmdhn' style={{fontSize:'20px'}}
                    className='text-gray-500 hover:text-white' target='_blank' rel='noreferrer'
                >
                    <i className='bi-instagram' role='img' aria-label='Instagram'></i>
                </a>
                <a href='https://www.linkedin.com/in/mochamad-rafli-ramadhan' style={{fontSize:'20px'}}
                    className='text-gray-500 hover:text-white' target='_blank' rel='noreferrer'
                >
                    <i className='bi-linkedin' role='img' aria-label='Linkedin'></i>
                </a>
                <a href='http://wa.me/088227867544' style={{fontSize:'20px'}}
                    className='text-gray-500 hover:text-white' target='_blank' rel='noreferrer'
                >
                    <i class='bi bi-whatsapp' role='img' aria-label='Whatsup'></i>
                </a>
            </div>
            <p class='mx-auto text-center text-light'>
                &copy; { year } - Mochamad Rafli Ramadhan
            </p>
        </footer>
    )
}