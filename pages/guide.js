import { Accordion } from "react-bootstrap";
import HeadElement from "../components/Head";
import Navbar from "../components/NavbarChatbot";

const AccordionBootstrap = ({ eventKey, Title, Content }) => {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{Title}</Accordion.Header>
      <Accordion.Body>{Content}</Accordion.Body>
    </Accordion.Item>
  );
};

export default function Guide() {
  return (
    <div className="h-screen bg-blue-300 m-0 pb-5 poppins">
      <HeadElement text={`Chatbot - guide`} />

      <div className="bg-blue-500 roboto text-center text-white w-full">
        Expert System User Guide
      </div>

      <Navbar />

      <main className="flex flex-row justify-center mt-8 mb-4">
        <div
          className="border-2 border-white mx-auto mt-0 p-3 overflow-hidden rounded-lg shadow-lg"
          style={{ maxWidth: "700px", width: "99%" }}
        >
          <p
            className="my-1 font-bold text-blue-500"
            style={{ fontSize: "20px" }}
          >
            Panduan Penggunaan Chatbot Sistem Pakar Screening Penyakit Mata
          </p>
          <hr />
          <Accordion
            defaultActiveKey="0"
            className="border-2 border-white my-1 rounded"
          >
            <AccordionBootstrap
              eventKey={"0"}
              Title={<p className="font-bold m-0">Panduan Umum</p>}
              Content={
                <div>
                  <p className="my-1">
                    <span className="font-bold text-primary">Ketikkan : </span>
                    mulai, tes, test atau Screening pada input chat untuk{" "}
                    melakukan Screening penyakit mata atau klik tombol{" "}
                    <span className="font-bold text-blue-500">mulai</span>{" "}
                    berwarna biru.
                  </p>
                  <p className="my-1">
                    <span className="font-bold text-blue-500">Jawab </span>
                    setiap pertanyaan dengan{" "}
                    <span className="font-bold text-blue-500">
                      y (ya)
                    </span> atau{" "}
                    <span className="font-bold text-blue-500">t (tidak)</span>{" "}
                    atau klik tombol ya atau tidak yang berwarna biru.
                  </p>
                </div>
              }
            />
            <AccordionBootstrap
              eventKey={"1"}
              Title={<p className="fw-bold m-0">Pembimbing dan Validator</p>}
              Content={
                <div>
                  <p className="my-1">
                    Chatbot sistem pakar ini merupakan riset tugas akhir di
                    bawah bimbingan :
                  </p>
                  <p>
                    1.{" "}
                    <span className="fw-bold text-blue-600">
                      Bapak Ir. Nazrul Effendy, S. T, M. Eng, Ph.D., IPM
                    </span>{" "}
                    (Pembimbing Utama)
                  </p>
                  <p>
                    2.{" "}
                    <span className="fw-bold text-blue-600">
                      Bapak Nopriadi, S.T., M.Sc., Ph.D.
                    </span>{" "}
                    (Pembimbing Pendamping)
                  </p>
                  <p>
                    3.{" "}
                    <span className="fw-bold text-blue-600">
                      dr. Indra Tri Mahayana, Ph.D., Sp.M
                    </span>{" "}
                    (Validator Data Penyakit Mata dan Algoritma Sistem Pakar)
                  </p>
                </div>
              }
            />
            <AccordionBootstrap
              eventKey={"2"}
              Title={
                <p className="font-bold m-0">
                  Daftar Penyakit Mata yang Bisa di Screening
                </p>
              }
              Content={
                <div>
                  <p>
                    Untuk Screening pertama akan mengerucut ke salah satu
                    kesimpulan penyakit mata di bawah ini :
                  </p>
                  <p>
                    Kelompok penyakit mata 1 :{" "}
                    <span className="fw-bold text-blue-600 my-1">
                      Endoftalmitis, Keraritis, Panofthalmitis, Trombosis Sinus
                      Cavernosus, Uveitis Akut atau Glaukoma Sekunder/Akut
                    </span>
                  </p>
                  <p>
                    Kelompok penyakit mata 2 :{" "}
                    <span className="fw-bold text-blue-600 my-1">
                      Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah,
                      Konjungtivitis Alergi atau Konjungtivitis Kronis
                    </span>
                  </p>
                  <p>
                    Kelompok penyakit mata 3 :{" "}
                    <span className="fw-bold text-blue-600 my-1">
                      Episkelritis, Hordeolum, Keratokonjungtivitis Flikte
                      Nularis, Konjungtivitis Akut atau Pinguekulitis
                    </span>
                  </p>
                  <p>
                    Kelompok penyakit mata 4 :{" "}
                    <span className="fw-bold text-blue-600 my-1">
                      Abalsi Retina, Perdarahan Vitreus, Neuritis Optik,
                      Kelainan Vaskular Retina, Hifema Spontan, Keracunan
                      Metanol, Stroke Oksipitalis atau Malingering dan Histeria
                    </span>
                  </p>
                  <p>
                    Kelompok penyakit mata 5 :{" "}
                    <span className="fw-bold text-blue-600 my-1">
                      Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis
                      Posterior, Glaukoma Sudut Terbuka Primer, Retinopati
                      Diabetika & Hipertensi, Penyakit Macula, Papil Udema,
                      Amblyopia, Neuropati Optik atau Retinisi Pigmentosa
                    </span>
                  </p>
                  <p>
                    Kelompok penyakit mata 6 :{" "}
                    <span className="fw-bold text-blue-600 my-1">
                      Tumor, Strabismus atau Ophthalmopathy Thyroid
                    </span>
                  </p>
                  <p>
                    Kelompok penyakit mata 7 :{" "}
                    <span className="fw-bold text-blue-600 my-1">
                      Sindroma Mata Kering atau Uveitis Kronis
                    </span>
                  </p>
                  <p>
                    atau penyakit mata{" "}
                    <span className="fw-bold text-blue-600 my-1">
                      Perdarahan Subkonjungtiva
                    </span>{" "}
                    yang tidak termasuk kelompok penyakit mata manapun
                  </p>
                </div>
              }
            />
            <AccordionBootstrap
              eventKey={"3"}
              Title={<p className="font-bold m-0">Catatan</p>}
              Content={
                <div>
                  <p className="my-1">
                    Hasil Screening dari sistem pakar ini{" "}
                    <span className="font-bold text-blue-500">tidak bisa </span>
                    dijadikan sebagai keputusan akhir diagnosis penyakit mata
                    anda.
                  </p>
                  <p className="my-1">
                    Hasil Screening tersebut{" "}
                    <span className="font-bold text-blue-500">bisa </span>
                    anda gunakan untuk konsultasi dengan dokter spesialis mata
                    untuk diagnosis lebih lanjut.
                  </p>
                </div>
              }
            />
          </Accordion>
        </div>
      </main>
    </div>
  );
}
