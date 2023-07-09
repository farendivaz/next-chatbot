import React from "react";

const Benefit = () => {
  return (
    <div className="bg-white py-16">
      <h2 className="text-center text-3xl font-bold mb-16 underline decoration-wavy underline-offset-[20px] decoration-blue-600">
        Keunggulan Sistem Pakar Kami
      </h2>
      <div className="flex justify-evenly items-center">
        <div className="p-4 flex flex-col justify-center items-center bg-[#F3F7FF] rounded-md">
          <img src="akurasi.svg" alt="AKURASI" />
          <h3 className="font-bold text-lg">Akurasi Tinggi</h3>
          <p className="text-sm text-center w-64 p-2">
            Didukung oleh algoritma canggih dan data terpercaya, sistem kami
            memberikan diagnosis dengan tingkat akurasi yang tinggi, membantu
            Anda mendapatkan informasi yang akurat tentang masalah mata Anda.
          </p>
        </div>
        <div className="p-4 flex flex-col justify-center items-center bg-[#F3F7FF] rounded-md">
          <img src="user.svg" alt="USER" />
          <h3 className="font-bold text-lg">Penggunaan Yang Mudah</h3>
          <p className="text-sm text-center w-64 p-2">
            Antarmuka kami dirancang dengan sederhana dan ramah pengguna,
            sehingga Anda dapat dengan mudah mengisi informasi mengenai gejala
            mata yang Anda alami dan mendapatkan hasil dengan cepat.
          </p>
        </div>
        <div className="p-4 flex flex-col justify-center items-center bg-[#F3F7FF] rounded-md">
          <img src="inform.svg" alt="INFORM" />
          <h3 className="font-bold text-lg">Penggunaan Yang Mudah</h3>
          <p className="text-sm text-center w-64 p-2">
            Sistem kami didukung oleh pengetahuan dari para ahli mata terkemuka
            dan data medis terverifikasi, sehingga Anda dapat yakin bahwa
            informasi yang kami berikan dapat diandalkan.
          </p>
        </div>
        <div className="p-4 flex flex-col justify-center items-center bg-[#F3F7FF] rounded-md">
          <img src="privacy.svg" alt="PRIV" />
          <h3 className="font-bold text-lg">Privasi Terjamin</h3>
          <p className="text-sm text-center w-64 p-2">
            Privasi Anda adalah prioritas utama kami. Informasi yang Anda
            berikan akan dijaga kerahasiaannya dan tidak akan digunakan untuk
            tujuan lain selain analisis medis dan dapat diandalkan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Benefit;
