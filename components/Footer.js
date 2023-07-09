export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-blue-300 mx-auto mt-3 px-8 py-2 text-center lg:text-lg md:text-lg sm:text-md w-full">
      {/* <p className="my-2 text-gray-600">
        Released under the{" "}
        <a
          href="https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt"
          target="_blank"
          className="text-gray-600 hover:text-black underline"
        >
          MIT License
        </a>
      </p> */}
      <p className="my-2 text-gray-600">&copy; {year} - Copy right reserved</p>
    </footer>
  );
}
