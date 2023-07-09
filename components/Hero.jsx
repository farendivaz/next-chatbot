import React from "react";

const Hero = () => {
  return (
    <div className="w-11/12 flex justify-between items-center mx-auto">
      <div className="mb-24">
        <h1 className="text-6xl roboto font-bold">
          Temukan <span className="text-blue-600">Kesehatan Mata</span> dengan
          Ketepatan Ahli
        </h1>
        <p className="text-lg poppins">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          voluptates deleniti ipsam fuga accusamus voluptate earum voluptas sit
          velit id? Dignissimos numquam doloremque rerum et iste sequi at
          exercitationem veniam.
        </p>
        <button className="px-4 py-2 bg-blue-500 text-white text-lg rounded-lg mt-4 font-bold">
          Diagnosa
        </button>
      </div>
      <img src="doctors.svg" alt="DOCTORS" />
    </div>
  );
};

export default Hero;
