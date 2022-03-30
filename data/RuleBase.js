const question = `Apa kamu mengalami gejala`;
const yesOrNo = `? <span className="border-3 border-blue-500 px-2 py-0 rounded-2xl">ya/tidak</span>`;
const g  = [
  [`index array number 0`],
  // question 1 - 5
  [`${question} mata peka terhadap cahaya (fotofobia) ${yesOrNo}`],
  [`${question} terdapat kotoran pada mata ${yesOrNo}`],
  [`${question} kelopak mata membengkak ${yesOrNo}`],
  [`${question} mata mengalami iritasi ${yesOrNo}`],
  [`${question} terjadi pembengkakan bundar pada kelopak mata dan tumbuh secara perlahan ${yesOrNo}`],
  // question 6 - 10
  [`${question} terbentuk daerah kemerahan/abu-abu di bawah kelopak mata ${yesOrNo}`],
  [`${question} bulu mata rontok ${yesOrNo}`],
  [`${question} mata sukar dibuka ketika bangun dipagi hari ${yesOrNo}`],
  [`${question} benjolan pada kelopak mata ${yesOrNo}`],
  [`${question} mata terasa panas ${yesOrNo}`],
  // qustion 11 - 15
  [`${question} mata seperti kelilipan ${yesOrNo}`],
  [`${question} mata berair ${yesOrNo}`],
  [`${question} nyeri pada tepi kelopak mata ${yesOrNo}`],
  [`${question} kornea mata tampak keruh ${yesOrNo}`],
  [`${question} konjungtiva meradang ${yesOrNo}`],
  // question 16 - 20
  [`${question} tampak bintik nanah berwarna kuning keputihan pada kornea mata ${yesOrNo}`],
  [`${question} terlihat bentuk-bentuk iregular yang melayang-layang atau kilatan cahaya pada mata ${yesOrNo}`],
  [`${question} hilangnya fungsi penglihatan pada salah satu mata, yang kemudian menyebar sejalan perkembangan ablasio ${yesOrNo}`],
  [`${question} kesulitan melihat di malam hari atau penglihatan menurun pada malam hari/ruang gelap ${yesOrNo}`],
  [`${question} penurunan ketajaman penglihatan bahkan di siang hari ${yesOrNo}`],
  // question 21 - 25
  [`${question} kemerahan pada skelra ${yesOrNo}`],
  [`${question} mata menonjol ${yesOrNo}`],
  [`${question} demam ${yesOrNo}`],
  [`${question} bola mata bengkak dan tampak berkabut ${yesOrNo}`],
  [`${question} mata terasa gatal ${yesOrNo}`],
  // question 26 - 30
  [`${question} mata terasa perih ${yesOrNo}`],
  [`${question} konjungtiva menjadi merah ${yesOrNo}`],
  [`${question} konjungtiva bengkak ${yesOrNo}`],
  [`${question} peradangan mata yang agak menonjol dan berwarna kuning ${yesOrNo}`],
  [`${question} mata nyeri bila ditekan ${yesOrNo}`],
  // question 31 - 35
  [`${question} gangguan penglihatan ${yesOrNo}`],
  [`${question} sakit kepala ${yesOrNo}`],
  [`${question} koma ${yesOrNo}`],
  [`${question} kejang ${yesOrNo}`],
  [`${question} sakit saat mata digerakkan ${yesOrNo}`],
  // question 36 - 40
  [`${question} kehilangan penglihatan ${yesOrNo}`],
  [`${question} nyeri di daerah sekitar kantong air mata ${yesOrNo}`],
  [`${question} mata mengeluarkan nanah ${yesOrNo}`],
  [`${question} pusing karena lelah ${yesOrNo}`],
  [`${question} mengalami mual dan muntah ${yesOrNo}`],
  // question 41 - 45
  [`${question} pupil melebar dan tidak mengecil jika diberi sinar yang terang ${yesOrNo}`],
  [`${question} sel batang retina sulit berdaptasi diruang yang remang-remang ${yesOrNo}`],
  [`${question} tidak dapat melihat pada lingkungan yang kurang bercahaya ${yesOrNo}`],
  [`${question} gangguan penglihatan pada salah satu mata ${yesOrNo}`],
  [`${question} garis mata lurus terlihat bergelombang ${yesOrNo}`],
  // question 46 - 50
  [`${question} mata tegang ${yesOrNo}`],
  [`${question} air mata berlebihan ${yesOrNo}`],
  [`${question} mata terasa kering ${yesOrNo}`],
  [`${question} benjolan pada mata bagian atas ${yesOrNo}`],
  [`${question} seperti ada benda asing di mata ${yesOrNo}`],
  // question 51 - 55
  [`${question} nyeri hebat pada mata ${yesOrNo}`],
  [`${question} mata merah tidak merata ${yesOrNo}`],
  [`${question} bercak merah tidak merata ${yesOrNo}`],
  [`${question} palpebra atau kelopak mata bengkak warna biru jingga ${yesOrNo}`],
  [`${question} rasa tidak nyaman pada mata ${yesOrNo}`],
  // question 56 - 60
  [`${question} mata meradang ${yesOrNo}`],
  [`${question} mata mempersempit atau perubahan bentuk ${yesOrNo}`],
  [`${question} berbentuk keropeng pada kelopak mata ketika bangun pada siang hari ${yesOrNo}`],
  [`${question} keluar air mata berlebihan (lakrimasi) ${yesOrNo}`],
  [`${question} penglihatan ganda pada salah satu sisi mata ${yesOrNo}`],
  // question 61 - 65
  [`${question} lensa mata membengkak ${yesOrNo}`],
  [`${question} sering ganti kacamata ${yesOrNo}`],
]
// list of general sympthon or gejala
const s = [
  `${question} mata merah pada mata ${yesOrNo}. Mata merah umumnya terjadi karena pelebaran pembuluh darah di mata.`, // gejala 0
  `${question} penglihatan menurun/kabur pada mata ${yesOrNo}`, // gejala 1
  `${question} penglihatan tidak menurun/tidak kabur pada mata ${yesOrNo}`, // gejala 2
  `${question} penglihatan menurun/kabur secara akut (tiba-tiba) pada mata ${yesOrNo}`, // gejala 3
  `${question} penglihatan menurun/kabur secara tidak akut (tidak tiba-tiba) pada mata ${yesOrNo}`, // gejala 4
  `${question} penglihatan menurun/kabur kronis (berlangung lama) pada mata ${yesOrNo}`, // gejala 5
  `${question} sakit/nyeri pada mata ${yesOrNo}`, // gejala 6
  `${question} tidak sakit/tidak nyeri pada mata ${yesOrNo}`, // gejala 7
  `${question} sakit/nyeri mendadak pada mata ${yesOrNo}`, // ? gejala 8
  `${question} sakit/nyeri pelan-pelan pada mata ${yesOrNo}`, // ? gejala 9
  `${question} distorsi bola mata (bentuk tidak teratur) pada mata ${yesOrNo}`, // gejala 10
  `${question} bentuk bola mata tenang atau normal ${yesOrNo}` // gejala 11
];

export const ruleBase = [
  [""],
  // Algorithm for Red Eyes 
  // consist of 7 + 5 + 1 + 6 = 19 diseases
  [s[0],s[1],s[3],"Endoftalmitis, Keraritis, Panofthalmitis,"],
  [s[0],s[1],s[4],"Anda mengalami gejala mata merah dan penglihatan menurun secara tidak akut. Belum bisa ditentukan penyakit mata anda"],
  [s[0],s[2],s[6],"Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis"],
  [s[0],s[2],s[7],s[8],"Perdarahan Subkonjungtiva"],
  [s[0],s[2],s[7],s[9],"Alergi, Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah atau Konjungtivitis Kronis"],
  // Algorithm for Decreasing Eye Sight only for Normal Eye Color (Not Red)
  // consist of 8 + 3 + 11 = 22 diseases
  [s[1],s[3],"Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria"],
  [s[1],s[5],s[10],"Tumor, Strabismus atau Ophthalmopathy Thyroid"],
  [s[1],s[5],s[11],"Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa"],
  ["end of first screening"],
  // 16 specific eye disease out of 41 diseases
  // index = [10][0] -/ 2 diseases - Algorithm for "Endoftalmitis, Keraritis, Panofthalmitis, Thombosis Sinus Cavernosus, Uveitis Akut atau Glaukoma Sekunder/Akut yang perlu pemeriksaan fisik lebih lanjut untuk mengetahui tekanan mata"
  [s[6],g[1],g[12],g[25],g[26],"Keratitis Pungtata Superfisialis"],
  [g[1],s[6],g[12],g[25],g[26],"Keratitis Pungtata Superfisialis"],
  [s[6],g[59],"Endoftalmitis (Infecius atau Non-Infecius)"],
  [g[1],g[12],g[49],g[56],g[57],"Uveitis (akut atau posterior)"],
  [g[12],s[6],g[1],g[25],g[26],"Keratitis Pungtata Superfisialis"],
  [g[12],g[1],g[49],g[56],g[57],"Uveitis (akut atau posterior)"],
  [g[23],g[32],g[33],g[34],"Thombosis Sinus Kavernosus"],
  [g[25],s[6],g[1],g[12],g[26],"Keratitis Pungtata Superfisialis"],
  [g[26],s[6],g[1],g[12],g[25],"Keratitis Pungtata Superfisialis"],
  [g[32],g[23],g[33],g[34],"Thombosis Sinus Kavernosus"],
  [g[33],g[23],g[32],g[34],"Thombosis Sinus Kavernosus"],
  [g[34],g[23],g[32],g[33],"Thombosis Sinus Kavernosus"],
  [g[49],g[1],g[12],g[56],g[57],"Uveitis (akut atau posterior)"],
  [g[56],g[1],g[12],g[49],g[57],"Uveitis (akut atau posterior)"],
  [g[57],g[1],g[12],g[49],g[56],"Uveitis (akut atau posterior)"],
  [g[59],s[6],"Endoftalmitis (Infecius atau Non-Infecius)"],
  ["end of second screening"],
  // index = [25][0] - 3 diseases - Algorithm for "Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis"
  [g[1],g[12],g[25],g[58],"Konjungtivitis"],
  [g[1],g[9],g[12],g[25],"Hordeolum"],
  [g[9],g[1],g[12],g[25],"Hordeolum"],
  [g[12],g[1],g[25],g[58],"Konjungtivitis"],
  [g[12],g[1],g[9],g[25],"Hordeolum"],
  [g[25],g[1],g[9],g[12],"Hordeolum"],
  [g[25],g[1],g[12],g[58],"Konjungtivitis"],
  [g[58],g[1],g[12],g[25],"Konjungtivitis"],
  [g[1],g[59],"Episkelritis (Nodular atau Diffuse)"],
  [g[59],g[1],"Episcleritis (Nodular atau Diffuse)"],
  ["end of second screening"],
  // index = [34][0] - 2 Diseases - Algortihm for "Alergi, Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah atau Konjungtivitis Kronis"
  [g[1],g[3],g[7],g[8],g[10],g[25],"Blefaritis"],
  [g[3],g[1],g[7],g[8],g[10],g[25],"Blefaritis"],
  [g[7],g[1],g[3],g[8],g[10],g[25],"Blefaritis"],
  [g[8],g[1],g[3],g[7],g[10],g[25],"Blefaritis"],
  [g[10],g[1],g[3],g[7],g[8],g[25],"Blefaritis"],
  [g[10],g[25],g[27],g[28],"Konjungtivitis Alergi"],
  [g[25],g[1],g[3],g[7],g[8],g[10],"Blefaritis"],
  [g[25],g[10],g[27],g[28],"Konjungtivitis Alergi"],
  [g[27],g[10],g[25],g[28],"Konjungtivitis Alergi"],
  [g[28],g[10],g[25],g[27],"Konjungtivitis Alergi"],
  ["end of second screening"],
  // index = [46][0] - 2 Diseases - Algorithm for "Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria"
  [g[17],g[46],"Abalsi Retina"],
  [g[46],g[17],"Abalsi Retina"],
  [g[35],g[36],"Optic Neuritis (Papillitis, Retrobulbar neuritis atau Neuroretinitis)"],
  [g[36],g[35],"Optic Neuritis (Papillitis, Retrobulbar neuritis atau Neuroretinitis)"],
  ["end of second screening"],
  // index = [51][0] - 4 diseases - Algortihm for "Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa"
  [s[6],g[1],g[19],g[20],g[60],g[62],"Katarak"],
  [g[1],s[6],g[19],g[20],g[60],g[62],"Katarak"],
  [g[19],s[6],g[1],g[20],g[60],g[62],"Katarak"],
  [g[20],s[6],g[1],g[19],g[60],g[62],"Katarak"],
  [g[60],s[6],g[1],g[19],g[20],g[62],"Katarak"],
  [g[62],s[6],g[1],g[19],g[20],g[60],"Katarak"],
  [g[19],"Retinitis Pigmentosa"],
  [g[17],"Retinopati Diabetika"],
  [s[7],g[44],g[45],"Degenerasi Macula"],
  [g[44],s[7],g[45],"Degenerasi Macula"],
  [g[45],s[7],g[44],"Degenerasi Macula"],
  ["end of second screening"],
];
