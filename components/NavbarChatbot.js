import Link from 'next/link';

export default function Navbar() {
  return (
    <nav
      style={{
        position:'-webkit-sticky',
        position:'sticky',
        top:'0px',
      }}
      className='bg-blue-300 flex justify-center m-0 py-1 px-0 top-0 shadow lg:space-x-4 md:space-x-3 sm:space-x-2 text-dark w-full z-10'
    >
      {[
        ['Home', '/'],
        ['Panduan','/guide'],
        ['UAT', '/uat'],
        ['Login', '/login']
      ].map(([title, url], index) => (
        <Link href={url} key={index}>
          <a className="font-bold hover:bg-blue-100 no-underline roboto rounded-lg my-0 px-3 py-2 text-gray-900 hover:text-gray-900">
            {title}
          </a>
        </Link>
      ))}
    </nav>
  )
}