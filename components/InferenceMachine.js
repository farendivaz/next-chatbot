import { useEffect, useState } from 'react';
import axios from 'axios';
import AddChat from './AddChat';
import AddChat2 from './AddChat2';
import Compare from './Compare';
import ChatbotInterface from './ChatbotInterface';
import {prompts,replies,alternative,coronavirus,} from '../data/PromptsAndReplies';

const question = `Apa kamu mengalami gejala`;
const yesOrNo = `? <span class='border-3 border-blue-500 px-2 py-0 rounded-2xl'>ya/tidak</span>`;
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
  `${question} bentuk bola mata tenang atau normal atau tidak ada distorsi ${yesOrNo}` // gejala 11
];

const ruleBase = [
  [''],
  // Algorithm for Red Eyes 
  // consist of 7 + 5 + 1 + 6 = 19 diseases
  [s[0],s[1],s[3],'Endoftalmitis, Keraritis, Panofthalmitis, Thombosis Sinus Cavernosus, Uvetis Akut atau Glaukoma Sekunder/Akut'],
  [s[0],s[1],'dengan gejala mata merah dan penglihatan menurun tidak akut'],
  [s[0],s[6],'Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis'],
  [s[0],s[8],'Perdarahan Subkonjungtiva'],
  [s[0],s[9],'Alergi, Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah atau Konjungtivitis Kronis'],
  // Algorithm for Decreasing Eye Sight only for Normal Eye Color (Not Red)
  // consist of 8 + 3 + 11 = 22 diseases
  [s[1],s[3],s[11],'Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria'],
  [s[1],s[5],s[10],'Tumor, Strabismus atau Ophthalmopathy Thyroid'],
  [s[1],s[5],'Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa'],
  ['end of first screening'],
  // 16 specific eye disease out of 41 diseases
  // index = [10][0] -/ 2 diseases - Algorithm for 'Endoftalmitis, Keraritis, Panofthalmitis, Thombosis Sinus Cavernosus, Uvetis Akut atau Glaukoma Sekunder/Akut' yang perlu pemeriksaan fisik lebih lanjut untuk mengetahui tekanan mata'
  [s[6],g[1],g[12],g[25],g[26],'Keratitis Pungtata Superfisialis'],
  [s[6],g[59],'Endoftalmitis (Infecius atau Non-Infecius)'],
  [g[1],s[6],g[12],g[25],g[26],'Keratitis Pungtata Superfisialis'],
  [g[1],g[12],g[49],g[56],g[57],'Uveitis (akut atau posterior)'],
  [g[12],s[6],g[1],g[25],g[26],'Keratitis Pungtata Superfisialis'],
  [g[12],g[1],g[49],g[56],g[57],'Uveitis (akut atau posterior)'],
  [g[23],g[32],g[33],g[34],'Thombosis Sinus Kavernosus'],
  [g[25],s[6],g[1],g[12],g[26],'Keratitis Pungtata Superfisialis'],
  [g[26],s[6],g[1],g[12],g[25],'Keratitis Pungtata Superfisialis'],
  [g[32],g[23],g[33],g[34],'Thombosis Sinus Kavernosus'],
  [g[33],g[23],g[32],g[34],'Thombosis Sinus Kavernosus'],
  [g[34],g[23],g[32],g[33],'Thombosis Sinus Kavernosus'],
  [g[49],g[1],g[12],g[56],g[57],'Uveitis (akut atau posterior)'],
  [g[56],g[1],g[12],g[49],g[57],'Uveitis (akut atau posterior)'],
  [g[57],g[1],g[12],g[49],g[56],'Uveitis (akut atau posterior)'],
  [g[59],s[6],'Endoftalmitis (Infecius atau Non-Infecius)'],
  ['end of second screening'],
  // index = [27][0] - 3 diseases - Algorithm for 'Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis'
  [g[1],g[12],g[25],g[58],'Konjungtivitis'],
  [g[1],g[9],g[12],g[25],'Hordeolum'],
  [g[1],g[59],'Episkelritis (Nodular atau Diffuse)'],
  [g[9],g[1],g[12],g[25],'Hordeolum'],
  [g[12],g[1],g[25],g[58],'Konjungtivitis'],
  [g[12],g[1],g[9],g[25],'Hordeolum'],
  [g[25],g[1],g[9],g[12],'Hordeolum'],
  [g[25],g[1],g[12],g[58],'Konjungtivitis'],
  [g[58],g[1],g[12],g[25],'Konjungtivitis'],
  [g[59],g[1],'Episcleritis (Nodular atau Diffuse)'],
  ['end of second screening'],
  // index = [38][0] - 2 Diseases - Algortihm for 'Alergi, Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah atau Konjungtivitis Kronis'
  [g[1],g[3],g[7],g[8],g[10],g[25],'Blefaritis'],
  [g[3],g[1],g[7],g[8],g[10],g[25],'Blefaritis'],
  [g[7],g[1],g[3],g[8],g[10],g[25],'Blefaritis'],
  [g[8],g[1],g[3],g[7],g[10],g[25],'Blefaritis'],
  [g[10],g[1],g[3],g[7],g[8],g[25],'Blefaritis'],
  [g[10],g[25],g[27],g[28],'Konjungtivitis Alergi'],
  [g[25],g[1],g[3],g[7],g[8],g[10],'Blefaritis'],
  [g[25],g[10],g[27],g[28],'Konjungtivitis Alergi'],
  [g[27],g[10],g[25],g[28],'Konjungtivitis Alergi'],
  [g[28],g[10],g[25],g[27],'Konjungtivitis Alergi'],
  ['end of second screening'],
  // index = [49][0] - 2 Diseases - Algorithm for 'Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria'
  [g[17],g[46],'Abalsi Retina'],
  [g[35],g[36],'Optic Neuritis (Papillitis, Retrobulbar neuritis atau Neuroretinitis)'],
  [g[36],g[35],'Optic Neuritis (Papillitis, Retrobulbar neuritis atau Neuroretinitis)'],
  [g[46],g[17],'Abalsi Retina'],
  ['end of second screening'],
  // index = [54][0] - 4 diseases - Algortihm for 'Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa'
  [s[6],g[1],g[19],g[20],g[60],g[62],'Katarak'],
  [g[1],s[6],g[19],g[20],g[60],g[62],'Katarak'],
  [s[7],g[44],g[45],'Degenerasi Macula'],  
  [g[17],'Retinopati Diabetika'],
  [g[19],s[6],g[1],g[20],g[60],g[62],'Katarak'],
  [g[19],'Retinitis Pigmentosa'],
  [g[20],s[6],g[1],g[19],g[60],g[62],'Katarak'],
  [g[44],s[7],g[45],'Degenerasi Macula'],
  [g[45],s[7],g[44],'Degenerasi Macula'],
  [g[60],s[6],g[1],g[19],g[20],g[62],'Katarak'],
  [g[62],s[6],g[1],g[19],g[20],g[60],'Katarak'],
  ['end of second screening'],
];

export default function InferenceMachine () {
  const [input, setInput] = useState('')
  // handle when form input was change or type by user and also get user input with setInput
  const handleChange = (event) => {
    setInput(event.target.value)
  }
  // get bot reply after user input chat and button was clicked
  const handleSubmit = () => {
    Output(input)
    setInput('')    // return empty form after user press the button
  }
  // get bot reply after user input chat and enter was pressed
  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      Output(input)
      setInput('')  // return empty form after user press enter
    }
  }
  const handleStartScreening = () => {
    Output('skrining') // input = 'mulai'
    setInput('')       // return empty form after user press button
  }
  const handleNextScreening = () => {
    Output('lanjut') // input = 'lanjut'
    setInput('')     // return empty form after user press the button
    setinputNow('lanjut')
    setinputBefore(inputNow)
  }
  const handleYes = () => {
    Output('ya')    // input = 'ya'
    setInput('')    // return empty form after user press button
    setinputNow('ya')
    setinputBefore(inputNow)
  }
  const handleNo = () => {
    Output('tidak') // input = 'tidak'
    setInput('')    // return empty form after user press button
    setinputNow('tidak')
    setinputBefore(inputNow)
  }  
  // initialize state for screening system
  let [i,setI] = useState(0);
  let [j,setJ] = useState(0);
  let [right, setRight] = useState('');
  let [arrayPlusOne, setArrayPlusOne] = useState('');
  let [inputNow, setinputNow] = useState('');
  let [inputBefore, setinputBefore] = useState('');
  let [replyNow, setReplyNow] = useState('');
  let [replyBefore, setReplyBefore] = useState('');
  let [nextReply, setNextReply] = useState('');
  let [allYesReply, setAllYesReply] = useState([]);
  let [lastValue, setLastValue] = useState([]);
  let [lastValueSpecialCase, setlastValueSpecialCase] = useState([]);
  let [totalGejala, setTotalGejala] = useState([]);
  let [diagnoseResult, setDiagnoseResult] = useState('');
  let [ruleBaseBefore, setRuleBaseBefore] = useState('');

  function Screening(input) {
    // auto update screening result when screening result come up
    function UpdateScreeningResult() {
      // get user id and screening result from local storage
      const userId = localStorage.getItem("user_id");
      const screening_result = localStorage.getItem("screening_result");
      axios.put(`https://express-mongoose-validator.herokuapp.com/api/users/${userId}`,
        ({
          updatedScreeningResult: screening_result
        })
      )
    }
    let reply;
    if (input === 'mulai' || input === 'tes'|| input === 'test'  || input === 'skrining') {
      // re-empty
      setArrayPlusOne(''); setRight('');
      setDiagnoseResult('');setReplyNow(''); setLastValue([]); setlastValueSpecialCase('');
      setAllYesReply([]); setTotalGejala([]); setRuleBaseBefore('');
      setReplyBefore(input);
      // reply
      reply = ruleBase[1][0]; setI(1); setJ(0);
    }
    else if (input === 'lanjut') {
      setArrayPlusOne('');
      setRight('');
      if (replyBefore === 'mulai' || replyBefore === 'tes'|| replyBefore === 'test'  || replyBefore === 'skrining') {
        reply = 'Jawab <strong>ya/tidak</strong> terlebih dahulu.'
      }
      else {
        // re-empty
        setReplyNow(''); setLastValue([]);  setlastValueSpecialCase(''); setAllYesReply([]); 
        setTotalGejala([]); setReplyBefore('lanjut');
        if (ruleBaseBefore === 'Endoftalmitis, Keraritis, Panofthalmitis, Thombosis Sinus Cavernosus, Uvetis Akut atau Glaukoma Sekunder/Akut') {
          reply = ruleBase[10][0]; setI(10); setJ(0);
          setDiagnoseResult('');
        }
        if (ruleBaseBefore === 'dengan gejala mata merah dan penglihatan menurun tidak akut') {
          reply = diagnoseResult;
        }
        if (ruleBaseBefore === 'Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis') {
          reply = ruleBase[27][0]; setI(27); setJ(0); 
          setDiagnoseResult('');
        }
        if (ruleBaseBefore === 'Perdarahan Subkonjungtiva') {
          reply = `Silahkan konsultasikan penyakit mata <strong>Perdarahan Subkonjungtiva</strong> dengan dokter spesialis mata`;
          setDiagnoseResult(reply);
        }
        if (ruleBaseBefore === 'Alergi, Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah atau Konjungtivitis Kronis') {
          reply = ruleBase[38][0]; setI(38); setJ(0); 
          setDiagnoseResult('');
        }
        if (ruleBaseBefore === 'Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria') {
          reply = ruleBase[49][0]; setI(49); setJ(0); 
          setDiagnoseResult('');
        }
        if (ruleBaseBefore === 'Tumor, Strabismus atau Ophthalmopathy Thyroid') {
          reply = 'Diagnosis Tumor, Strabismus atau Ophthalmopathy Thyroid lebih lanjut perlu dilakukan dengan pemeriksaan oleh dokter spesialis mata';
          setDiagnoseResult(reply);
        }
        if (ruleBaseBefore === 'Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa') {
          reply = ruleBase[54][0]; setI(54); setJ(0); 
          setDiagnoseResult('');
        }
      }
    }
    // if (input !== 'mulai' || input !== 'tes'|| input !== 'test'  || input !== 'skrining' || input !== 'lanjut')
    else {
      // diagnose result is not '', return diagnose result.
      if (diagnoseResult !== '') {
        reply = diagnoseResult;
      }
      // diagnose result is ''
      else if (diagnoseResult === '') {
        if (
          replyBefore === 'mulai' || replyBefore === 'tes' || 
          replyBefore === 'test' || replyBefore === 'skrining' ||
          replyBefore === 'lanjut'
        ) {
          // the current value is ruleBase[i][j]
          if (input === 'y' || input === 'ya') {
            setNextReply(ruleBase[i][j+1]);
            // save all yes reply before the last value in [i] array
            setAllYesReply([...allYesReply, ruleBase[i][j]]);
            // make sure there is no same value in array
            allYesReply = [...new Set(allYesReply)];
            // get total sympthon
            setTotalGejala([...totalGejala, ruleBase[i].length-1])
            // get last value of the array
            setLastValue([...lastValue, ruleBase[i][ruleBase[i].length-1]]);
            // if ruleBase[i][j+1] is not last value in [i] array
            if (ruleBase[i][j+1] !== ruleBase[i][ruleBase[i].length - 1]) {
              reply = ruleBase[i][j+1]; 
              setI(i); setJ(j+1);
              setReplyNow(reply)
            }
            // if ruleBase[i][j+1] is the last value in [i] array
            else if (ruleBase[i][j+1] === ruleBase[i][ruleBase[i].length - 1]) {
              if (inputNow !== 'tidak') {
                if (
                  ruleBase[i][j+1] === 'Endoftalmitis, Keraritis, Panofthalmitis, Thombosis Sinus Cavernosus, Uvetis Akut atau Glaukoma Sekunder/Akut' ||
                  ruleBase[i][j+1] === 'Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis' ||
                  ruleBase[i][j+1] === 'Perdarahan Subkonjungtiva' ||
                  ruleBase[i][j+1] === 'Alergi, Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah atau Konjungtivitis Kronis' ||
                  ruleBase[i][j+1] === 'Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria' ||
                  ruleBase[i][j+1] === 'Tumor, Strabismus atau Ophthalmopathy Thyroid' ||
                  ruleBase[i][j+1] === 'Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa'
                ) {
                  reply = `Melalui skrining dicurigai kamu mengalami <strong>${totalGejala[totalGejala.length-1]} gejala</strong> dari penyakit mata <strong>${lastValue[lastValue.length-1]}</strong>. 
                  Ketik atau tekan lanjut untuk melanjutkan skrining kedua.`
                  setDiagnoseResult(reply); setI(i); setJ(j);
                  setRuleBaseBefore(ruleBase[i][j+1]); setReplyBefore('');
                  // set screening result on local storage
                  localStorage.setItem('screening_result', reply);
                  if(localStorage.getItem('token')) {
                    UpdateScreeningResult()
                  }
                }
                if (ruleBase[i][j+1] === 'dengan gejala mata merah dan penglihatan menurun tidak akut') {
                  reply =  `Kamu mengalami gejala mata merah dan penglihatan menurun/kabur secara tidak akut (tidak tiba-tiba) pada mata. 
                  Belum bisa dipastikan hasil skrining penyakit mata dari gejala-gejala tersebut. 
                  Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                  setDiagnoseResult(reply); setI(i); setJ(j);
                  setRuleBaseBefore(ruleBase[i][j+1]); setReplyBefore('');
                  // set screening result on local storage
                  localStorage.setItem('screening_result', reply);
                  if(localStorage.getItem('token')) {
                    UpdateScreeningResult()
                  }
                }
                if (
                  ruleBase[i][j+1] !== 'Endoftalmitis, Keraritis, Panofthalmitis, Thombosis Sinus Cavernosus, Uvetis Akut atau Glaukoma Sekunder/Akut' &&
                  ruleBase[i][j+1] !== 'Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis' &&
                  ruleBase[i][j+1] !== 'Perdarahan Subkonjungtiva' &&
                  ruleBase[i][j+1] !== 'Alergi, Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah atau Konjungtivitis Kronis' &&
                  ruleBase[i][j+1] !== 'Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria' &&
                  ruleBase[i][j+1] !== 'Tumor, Strabismus atau Ophthalmopathy Thyroid' &&
                  ruleBase[i][j+1] !== 'Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa'
                ) {
                  // 2nd screening
                  if (j === 0) {
                    reply = `Melalui skrining dicurigai kamu mengalami <strong>1 gejala</strong> dari penyakit mata <strong>${lastValue[lastValue.length-1]}</strong>. 
                    Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    setDiagnoseResult(reply); setI(i); setJ(j); setReplyBefore('');
                    // set screening result on local storage
                    localStorage.setItem('screening_result', reply);
                    if(localStorage.getItem('token')) {
                      UpdateScreeningResult()
                    }
                  }
                  else {
                    reply = `Melalui skrining dicurigai kamu mengalami <strong>${totalGejala[totalGejala.length-1]} gejala</strong> dari penyakit mata <strong>${lastValue[lastValue.length-1]}</strong>. 
                    Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    setDiagnoseResult(reply); setI(i); setJ(j); setReplyBefore('');
                    // set screening result on local storage
                    localStorage.setItem('screening_result', reply);
                    if(localStorage.getItem('token')) {
                      UpdateScreeningResult()
                    }
                  }
                }
              }
              if (inputNow === 'tidak') {
                if (
                  ruleBase[i][j+1] === 'Endoftalmitis, Keraritis, Panofthalmitis, Thombosis Sinus Cavernosus, Uvetis Akut atau Glaukoma Sekunder/Akut' ||
                  ruleBase[i][j+1] === 'Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis' ||
                  ruleBase[i][j+1] === 'Perdarahan Subkonjungtiva' ||
                  ruleBase[i][j+1] === 'Alergi, Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah atau Konjungtivitis Kronis' ||
                  ruleBase[i][j+1] === 'Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria' ||
                  ruleBase[i][j+1] === 'Tumor, Strabismus atau Ophthalmopathy Thyroid' ||
                  ruleBase[i][j+1] === 'Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa'
                ) {
                  reply = `Melalui skrining dicurigai kamu mengalami <strong>${totalGejala[totalGejala.length-1]} gejala</strong> dari penyakit mata <strong>${lastValueSpecialCase}</strong>. 
                  Ketik atau tekan lanjut untuk melanjutkan skrining kedua.`
                  setDiagnoseResult(reply); setI(i); setJ(j);
                  setRuleBaseBefore(ruleBase[i][j+1]); setReplyBefore('');
                  // set screening result on local storage
                  localStorage.setItem('screening_result', reply);
                  if(localStorage.getItem('token')) {
                    UpdateScreeningResult()
                  }
                }
                if (ruleBase[i][j+1] === 'dengan gejala mata merah dan penglihatan menurun tidak akut') {
                  reply =  `Kamu mengalami gejala mata merah dan penglihatan menurun/kabur secara tidak akut (tidak tiba-tiba) pada mata. 
                  Belum bisa dipastikan hasil skrining penyakit mata dari gejala-gejala tersebut. 
                  Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                  setDiagnoseResult(reply); setI(i); setJ(j);
                  setRuleBaseBefore(ruleBase[i][j+1]); setReplyBefore('');
                  // set screening result on local storage
                  localStorage.setItem('screening_result', reply);
                  if(localStorage.getItem('token')) {
                    UpdateScreeningResult()
                  }
                }
                if (
                  ruleBase[i][j+1] !== 'Endoftalmitis, Keraritis, Panofthalmitis, Thombosis Sinus Cavernosus, Uvetis Akut atau Glaukoma Sekunder/Akut' &&
                  ruleBase[i][j+1] !== 'Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis' &&
                  ruleBase[i][j+1] !== 'Perdarahan Subkonjungtiva' &&
                  ruleBase[i][j+1] !== 'Alergi, Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah atau Konjungtivitis Kronis' &&
                  ruleBase[i][j+1] !== 'Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria' &&
                  ruleBase[i][j+1] !== 'Tumor, Strabismus atau Ophthalmopathy Thyroid' &&
                  ruleBase[i][j+1] !== 'Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa'
                ) {
                  // 2nd screening
                  if (j === 0) {
                    reply = `Melalui skrining dicurigai kamu mengalami <strong>1 gejala</strong> dari penyakit mata <strong>${lastValueSpecialCase}</strong>. 
                    Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    setDiagnoseResult(reply); setI(i); setJ(j); setReplyBefore('');
                    // set screening result on local storage
                    localStorage.setItem('screening_result', reply);
                    if(localStorage.getItem('token')) {
                      UpdateScreeningResult()
                    }
                  }
                  else {
                    reply = `Melalui skrining dicurigai kamu mengalami <strong>${totalGejala[totalGejala.length-1]} gejala</strong> dari penyakit mata <strong>${lastValueSpecialCase}</strong>. 
                    Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    setDiagnoseResult(reply); setI(i); setJ(j); setReplyBefore('');
                    // set screening result on local storage
                    localStorage.setItem('screening_result', reply);
                    if(localStorage.getItem('token')) {
                      UpdateScreeningResult()
                    }
                  }
                }
              }
            }
          }
          else if (input === 't' || input === 'tidak') {
              // set total sympthon in the array and last value
              // let totalGejalaSpecialCase = ruleBase[i+1].length-1;
              if (j === 0) {
                let arr = [''];
                for (let x = i; x < ruleBase.length ; x++) {
                  arr.push(ruleBase[x][0]) // arr = [g[1],g[1],g[1],g[1],g[1],g[1],g[1],g[1],g[2],g[2],g[2],g[2],g[2],g[2],g[2],g[2],...]
                }
                // delete same values in array
                arr = [...new Set(arr)]
                // find value of ruleBase[i][j] index in newArr
                let findIndexInArray = arr.indexOf(ruleBase[i][j])
                // last value in ruleBase[i], case for only g[58] (works)
                if (arr[findIndexInArray+1] === undefined) {
                  reply = `Apa kamu yakin tidak mengalami gejala penyakit mata yang ditanyakan oleh bot? 
                  Silahkan ulangi skrining dengan tekan atau ketik mulai.`;
                  setDiagnoseResult(reply);
                }
                if (arr[findIndexInArray+1] !== undefined) {
                  // if user's eyes are not red (normal) and eye vision is normal
                  if (arr[findIndexInArray+1] === 'end of first screening') {
                    reply = `Apa kamu yakin tidak mengalami gejala <b>mata merah</b> atau <b>penglihatan menurun?</b> 
                    Silahkan ulangi skrining dengan tekan atau ketik mulai.`;
                    setDiagnoseResult(reply);
                  }
                  else if (arr[findIndexInArray+1] === 'end of second screening') {
                    reply = `Apa kamu yakin tidak mengalami gejala-gejala yang ditanyakan oleh bot? 
                    Silahkan ulangi skrining dengan tekan atau ketik mulai.`;
                    setDiagnoseResult(reply);
                  }
                  else if (
                    arr[findIndexInArray+1] !== 'end of first screening' || 
                    arr[findIndexInArray+1] !== 'end of second screening'
                    ) {         
                    reply = arr[findIndexInArray+1]
                    // find reply in ruleBase[i][0]
                    for (let x = i; x < ruleBase.length ; x++) {
                      if (ruleBase[x][0] === arr[findIndexInArray+1]) {
                        setI(x); setJ(0);
                        setlastValueSpecialCase(ruleBase[x][ruleBase[x].length-1]);
                        break
                      }
                    }
                  }
                }
              }
              else if (j === 1) { 
                // check if the value before is same (work)
                if (
                  ruleBase[i+1][j-1] !== undefined && 
                  ruleBase[i][j-1] === ruleBase[i+1][j-1]
                ) {
                  let arr = [''];
                  // push all value in the same j index
                  for (let x = i; x < ruleBase.length ; x++) {
                    if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                      arr.push(ruleBase[x][j])
                    }
                  }
                  // delete same values in array
                  arr = [...new Set(arr)]
                  // find value index in array
                  let findIndexInArray = arr.indexOf(ruleBase[i][j])
                  setArrayPlusOne(arr[findIndexInArray+1]);
                  if (arr[findIndexInArray+1] !== undefined) {
                    // if ruleBase[i+1][j] is the last value of ruleBase[i]
                    if (arr[findIndexInArray+1] === ruleBase[i+1][ruleBase[i+1].length-1]) {
                      if (arr[findIndexInArray+1] === 'dengan gejala mata merah dan penglihatan menurun tidak akut') {
                        reply =  `Kamu mengalami gejala mata merah dan penglihatan menurun/kabur secara tidak akut (tidak tiba-tiba) pada mata. 
                        Belum bisa dipastikan hasil skrining penyakit mata dari gejala-gejala tersebut. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        setDiagnoseResult(reply);
                        setRuleBaseBefore(arr[findIndexInArray+1]); setReplyBefore('');
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          UpdateScreeningResult()
                        }
                      }
                      else {
                        reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami <strong>${allYesReply.length} gejala</strong> dari penyakit mata antara <strong>${ruleBase[i+1][ruleBase[i+1].length-1]}</strong>. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        setDiagnoseResult(reply);
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          UpdateScreeningResult()
                        }
                      }
                    }
                    // if ruleBase[i+1][j] is not the last value
                    if (arr[findIndexInArray+1] !== ruleBase[i+1][ruleBase[i+1].length-1]) {
                      setRight('false');
                      reply = arr[findIndexInArray+1];
                      for (let x = i; x < ruleBase.length ; x++) {
                        if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                          if (ruleBase[x][j] === arr[findIndexInArray+1]) {
                            setI(x); setJ(j);
                            setlastValueSpecialCase(ruleBase[x][ruleBase[x].length-1]);
                            break
                          }
                        }
                      }
                    }
                  }
                  if (arr[findIndexInArray+1] === undefined) {
                    reply = `Kamu hanya menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa dipastikan penyakit mata yang tepat hanya dari 1 gejala tersebut. 
                    Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    setDiagnoseResult(reply);
                  }
                }
                // if ruleBase[i+1][j-1] === undefined || ruleBase[i][j-1] !== ruleBase[i+1][j-1]
                else {
                  reply = `Kamu hanya menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                  Belum bisa dipastikan penyakit mata yang tepat hanya dari 1 gejala tersebut. 
                  Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                  setDiagnoseResult(reply);
                }
              }
              else if (j === 2) { 
                // check if the two value before is same (work)
                if (
                  ruleBase[i+1][j-1] !== undefined &&
                  ruleBase[i+1][j-2] !== undefined &&
                  ruleBase[i][j-1] === ruleBase[i+1][j-1] && 
                  ruleBase[i][j-2] === ruleBase[i+1][j-2]
                ) {
                  let arr = [''];
                    // push all value in the same j index
                    for (let x = i; x < ruleBase.length ; x++) {
                      if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                        arr.push(ruleBase[x][j])
                      }
                    }
                  // delete same values in array
                  arr = [...new Set(arr)]
                  // find value index in array
                  let findIndexInArray = arr.indexOf(ruleBase[i][j])
                  if (arr[findIndexInArray+1] !== undefined) {
                    // if ruleBase[i+1][j] is the last value of ruleBase[i]
                    if (arr[findIndexInArray+1] === ruleBase[i+1][ruleBase[i+1].length-1]) {
                      if (arr[findIndexInArray+1] === 'dengan gejala mata merah dan penglihatan menurun tidak akut') {
                        reply =  `Kamu mengalami gejala mata merah dan penglihatan menurun/kabur secara tidak akut (tidak tiba-tiba) pada mata. 
                        Belum bisa dipastikan hasil skrining penyakit mata dari gejala-gejala tersebut. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        setDiagnoseResult(reply);
                        setRuleBaseBefore(arr[findIndexInArray+1]); setReplyBefore('');
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          UpdateScreeningResult()
                        }
                      }
                      else {
                        reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami <strong>${allYesReply.length} gejala</strong> dari penyakit mata antara <strong>${ruleBase[i+1][ruleBase[i+1].length-1]}</strong>. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        setDiagnoseResult(reply);
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          UpdateScreeningResult()
                        }
                      }
                    }
                    // if ruleBase[i+1][j] is not the last value of ruleBase[i]
                    if (arr[findIndexInArray+1] !== ruleBase[i+1][ruleBase[i+1].length-1]) {
                      reply = arr[findIndexInArray+1];
                      for (let x = i; x < ruleBase.length ; x++) {
                        if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                          if (ruleBase[x][j] === arr[findIndexInArray+1]) {
                            setI(x); setJ(j);
                            setlastValueSpecialCase(ruleBase[x][ruleBase[x].length-1]);
                            break
                          }
                        }
                      }
                    }
                  }
                  if (arr[findIndexInArray+1] === undefined) {
                    reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    setDiagnoseResult(reply);
                  }
                }
                // if ruleBase[i+1][j-1] === undefined || ruleBase[i+1][j-2] === undefined
                else {
                  reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                  Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                  Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                  setDiagnoseResult(reply);
                }
              }
              else if (j === 3) {
                if (
                  ruleBase[i+1][j-1] !== undefined &&
                  ruleBase[i+1][j-2] !== undefined &&
                  ruleBase[i+1][j-3] !== undefined &&
                  ruleBase[i][j-1] === ruleBase[i+1][j-1] &&
                  ruleBase[i][j-2] === ruleBase[i+1][j-2] && 
                  ruleBase[i][j-3] === ruleBase[i+1][j-3]
                ) {
                  let arr = [''];
                  // push all value in the same j index
                  for (let x = i; x < ruleBase.length ; x++) {
                    if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                      arr.push(ruleBase[x][j])
                    }
                  }
                  // delete same values in array
                  arr = [...new Set(arr)]
                  // find value index in array
                  let findIndexInArray = arr.indexOf(ruleBase[i][j])
                  if (arr[findIndexInArray+1] !== undefined) {
                    // if ruleBase[i+1][j] is the last value of ruleBase[i]
                    if (arr[findIndexInArray+1] === ruleBase[i+1][ruleBase[i+1].length-1]) {
                      if (arr[findIndexInArray+1] === 'dengan gejala mata merah dan penglihatan menurun tidak akut') {
                        reply =  `Kamu mengalami gejala mata merah dan penglihatan menurun/kabur secara tidak akut (tidak tiba-tiba) pada mata. 
                        Belum bisa dipastikan hasil skrining penyakit mata dari gejala-gejala tersebut. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        setDiagnoseResult(reply);
                        setRuleBaseBefore(arr[findIndexInArray+1]); setReplyBefore('');
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          UpdateScreeningResult()
                        }
                      }
                      else {
                        reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami <strong>${allYesReply.length} gejala</strong> dari penyakit mata antara <strong>${ruleBase[i+1][ruleBase[i+1].length-1]}</strong>. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        setDiagnoseResult(reply);
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          UpdateScreeningResult()
                        }
                      }
                    }
                    // if ruleBase[i+1][j] is not the last value of ruleBase[i]
                    if (arr[findIndexInArray+1] !== ruleBase[i+1][ruleBase[i+1].length-1]) {
                      reply = arr[findIndexInArray+1];
                      for (let x = i; x < ruleBase.length ; x++) {
                        if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                          if (ruleBase[x][j] === arr[findIndexInArray+1]) {
                            setI(x); setJ(j);
                            setlastValueSpecialCase(ruleBase[x][ruleBase[x].length-1]);
                            break
                          }
                        }
                      }
                    }
                  }
                  if (arr[findIndexInArray+1] === undefined) {
                    reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    setDiagnoseResult(reply);
                  } 
                }
                // if ruleBase[i+1][j-1] === undefined || 
                // ruleBase[i+1][j-2] === undefined ||
                // ruleBase[i+1][j-3] === undefined ||
                else {
                  reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                  Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                  Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                  setDiagnoseResult(reply);
                }
              }
              else if (j === 4) { // worked
                if (
                  ruleBase[i+1][j-1] !== undefined &&
                  ruleBase[i+1][j-2] !== undefined &&
                  ruleBase[i+1][j-3] !== undefined &&
                  ruleBase[i+1][j-4] !== undefined &&
                  ruleBase[i][j-1] === ruleBase[i+1][j-1] &&
                  ruleBase[i][j-2] === ruleBase[i+1][j-2] && 
                  ruleBase[i][j-3] === ruleBase[i+1][j-3] &&
                  ruleBase[i][j-4] === ruleBase[i+1][j-4]
                ) {
                  let arr = [''];
                  // push all value in the same j index
                  for (let x = i; x < ruleBase.length ; x++) {
                    if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                      arr.push(ruleBase[x][j])
                    }
                  }
                  // delete same values in array
                  arr = [...new Set(arr)]
                  // find value index in array
                  let findIndexInArray = arr.indexOf(ruleBase[i][j])
                  if (arr[findIndexInArray+1] !== undefined) {
                    // if ruleBase[i+1][j] is the last value of ruleBase[i]
                    if (arr[findIndexInArray+1] === ruleBase[i+1][ruleBase[i+1].length-1]) {
                      if (arr[findIndexInArray+1] === 'dengan gejala mata merah dan penglihatan menurun tidak akut') {
                        reply =  `Kamu mengalami gejala mata merah dan penglihatan menurun/kabur secara tidak akut (tidak tiba-tiba) pada mata. 
                        Belum bisa dipastikan hasil skrining penyakit mata dari gejala-gejala tersebut. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        setDiagnoseResult(reply);
                        setRuleBaseBefore(arr[findIndexInArray+1]); setReplyBefore('');
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          UpdateScreeningResult()
                        }
                      }
                      else {
                        reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami <strong>${allYesReply.length} gejala</strong> dari penyakit mata antara <strong>${ruleBase[i+1][ruleBase[i+1].length-1]}</strong>. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        setDiagnoseResult(reply);
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          UpdateScreeningResult()
                        }
                      }
                    }
                    // if ruleBase[i+1][j] is not the last value of ruleBase[i]
                    if (arr[findIndexInArray+1] !== ruleBase[i+1][ruleBase[i+1].length-1]) {
                      reply = arr[findIndexInArray+1];
                      for (let x = i; x < ruleBase.length ; x++) {
                        if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                          if (ruleBase[x][j] === arr[findIndexInArray+1]) {
                            setI(x); setJ(j);
                            setlastValueSpecialCase(ruleBase[x][ruleBase[x].length-1]);
                            break
                          }
                        }
                      }
                    }
                  }
                  if (arr[findIndexInArray+1] === undefined) {
                    reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    setDiagnoseResult(reply);
                  }
                }
                // if ruleBase[i+1][j-1] === undefined || 
                // ruleBase[i+1][j-2] === undefined ||
                // ruleBase[i+1][j-3] === undefined ||
                // ruleBase[i+1][j-4] === undefined ||
                else {
                  reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                  Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                  Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                  setDiagnoseResult(reply);
                }
              }
              else if (j === 5) {
                if (
                  ruleBase[i+1][j-1] !== undefined &&
                  ruleBase[i+1][j-2] !== undefined &&
                  ruleBase[i+1][j-3] !== undefined &&
                  ruleBase[i+1][j-4] !== undefined &&
                  ruleBase[i+1][j-5] !== undefined &&
                  ruleBase[i][j-1] === ruleBase[i+1][j-1] &&
                  ruleBase[i][j-2] === ruleBase[i+1][j-2] && 
                  ruleBase[i][j-3] === ruleBase[i+1][j-3] &&
                  ruleBase[i][j-4] === ruleBase[i+1][j-4] &&
                  ruleBase[i][j-5] === ruleBase[i+1][j-5]
                ) {
                  let arr = [''];
                  // push all value in the same j index
                  for (let x = i; x < ruleBase.length ; x++) {
                    if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                      arr.push(ruleBase[x][j])
                    }
                  }
                  // delete same values in array
                  arr = [...new Set(arr)]
                  // find value index in array
                  let findIndexInArray = arr.indexOf(ruleBase[i][j])
                  if (arr[findIndexInArray+1] !== undefined) {
                    // if ruleBase[i+1][j] is the last value of ruleBase[i]
                    if (arr[findIndexInArray+1] === ruleBase[i+1][ruleBase[i+1].length-1]) {
                      if (arr[findIndexInArray+1] === 'dengan gejala mata merah dan penglihatan menurun tidak akut') {
                        reply =  `Kamu mengalami gejala mata merah dan penglihatan menurun/kabur secara tidak akut (tidak tiba-tiba) pada mata. 
                        Belum bisa dipastikan hasil skrining penyakit mata dari gejala-gejala tersebut. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        setDiagnoseResult(reply);
                        setRuleBaseBefore(arr[findIndexInArray+1]); setReplyBefore('');
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          UpdateScreeningResult()
                        }
                      }
                      else {
                        reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami <strong>${allYesReply.length} gejala</strong> dari penyakit mata antara <strong>${ruleBase[i+1][ruleBase[i+1].length-1]}</strong>. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        setDiagnoseResult(reply);
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          UpdateScreeningResult()
                        }
                      }
                    }
                    // if ruleBase[i+1][j] is not the last value of ruleBase[i]
                    if (arr[findIndexInArray+1] !== ruleBase[i+1][ruleBase[i+1].length-1]) {
                      reply = arr[findIndexInArray+1];
                      for (let x = i; x < ruleBase.length ; x++) {
                        if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                          if (ruleBase[x][j] === arr[findIndexInArray+1]) {
                            setI(x); setJ(j);
                            setlastValueSpecialCase(ruleBase[x][ruleBase[x].length-1]);
                            break
                          }
                        }
                      }
                    }
                  }
                  if (arr[findIndexInArray+1] === undefined) {
                    reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    setDiagnoseResult(reply);
                  }
                }
                // if ruleBase[i+1][j-1] === undefined || 
                // ruleBase[i+1][j-2] === undefined ||
                // ruleBase[i+1][j-3] === undefined ||
                // ruleBase[i+1][j-4] === undefined ||
                // ruleBase[i+1][j-5] === undefined ||
                else {
                  reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                  Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                  Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                  setDiagnoseResult(reply);
                }
              }
              else if (j === 6) {
                if (
                  ruleBase[i+1][j-1] !== undefined &&
                  ruleBase[i+1][j-2] !== undefined &&
                  ruleBase[i+1][j-3] !== undefined &&
                  ruleBase[i+1][j-4] !== undefined &&
                  ruleBase[i+1][j-5] !== undefined &&
                  ruleBase[i+1][j-6] !== undefined &&
                  ruleBase[i][j-1] === ruleBase[i+1][j-1] &&
                  ruleBase[i][j-2] === ruleBase[i+1][j-2] && 
                  ruleBase[i][j-3] === ruleBase[i+1][j-3] &&
                  ruleBase[i][j-4] === ruleBase[i+1][j-4] &&
                  ruleBase[i][j-5] === ruleBase[i+1][j-5] &&
                  ruleBase[i][j-6] === ruleBase[i+1][j-6]
                ) {
                  let arr = [''];
                  // push all value in the same j index
                  for (let x = i; x < ruleBase.length ; x++) {
                    if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                      arr.push(ruleBase[x][j])
                    }
                  }
                  // delete same values in array
                  arr = [...new Set(arr)]
                  // find value index in array
                  let findIndexInArray = arr.indexOf(ruleBase[i][j])
                  if (arr[findIndexInArray+1] !== undefined) {
                    // if ruleBase[i+1][j] is the last value of ruleBase[i]
                    if (arr[findIndexInArray+1] === ruleBase[i+1][ruleBase[i+1].length-1]) {
                      if (arr[findIndexInArray+1] === 'dengan gejala mata merah dan penglihatan menurun tidak akut') {
                        reply =  `Kamu mengalami gejala mata merah dan penglihatan menurun/kabur secara tidak akut (tidak tiba-tiba) pada mata. 
                        Belum bisa dipastikan hasil skrining penyakit mata dari gejala-gejala tersebut. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        setDiagnoseResult(reply);
                        setRuleBaseBefore(arr[findIndexInArray+1]); setReplyBefore('');
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          UpdateScreeningResult()
                        }
                      }
                      else {
                        reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                        Melalui skrining dicurigai kamu mengalami <strong>${allYesReply.length} gejala</strong> dari penyakit mata antara <strong>${ruleBase[i+1][ruleBase[i+1].length-1]}</strong>. 
                        Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                        setDiagnoseResult(reply);
                        // set screening result on local storage
                        localStorage.setItem('screening_result', reply);
                        if(localStorage.getItem('token')) {
                          UpdateScreeningResult()
                        }
                      }
                    }
                    // if ruleBase[i+1][j] is not the last value of ruleBase[i]
                    if (arr[findIndexInArray+1] !== ruleBase[i+1][ruleBase[i+1].length-1]) {
                      reply = arr[findIndexInArray+1];
                      for (let x = i; x < ruleBase.length ; x++) {
                        if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                          if (ruleBase[x][j] === arr[findIndexInArray+1]) {
                            setI(x); setJ(j);
                            setlastValueSpecialCase(ruleBase[x][ruleBase[x].length-1]);
                            break
                          }
                        }
                      }
                    }
                  }
                  if (arr[findIndexInArray+1] === undefined) {
                    reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                    Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    setDiagnoseResult(reply);
                  }
                }
                // if ruleBase[i+1][j-1] === undefined || 
                // ruleBase[i+1][j-2] === undefined ||
                // ruleBase[i+1][j-3] === undefined ||
                // ruleBase[i+1][j-4] === undefined ||
                // ruleBase[i+1][j-5] === undefined ||
                // ruleBase[i+1][j-6] === undefined ||
                else {
                  reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                  Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                  Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                  setDiagnoseResult(reply);
                }
              }
              // for j > 6 
              else {
                let arr = [''];
                // push all value in the same j index
                for (let x = i; x < ruleBase.length ; x++) {
                  if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                    arr.push(ruleBase[x][j])
                  }
                }
                // delete same values in array
                arr = [...new Set(arr)]
                // find value index in array
                let findIndexInArray = arr.indexOf(ruleBase[i][j])
                if (arr[findIndexInArray+1] !== undefined) {
                  // if ruleBase[i+1][j] is the last value of ruleBase[i]
                  if (arr[findIndexInArray+1] === ruleBase[i+1][ruleBase[i+1].length-1]) {
                    if (arr[findIndexInArray+1] === 'dengan gejala mata merah dan penglihatan menurun tidak akut') {
                      reply =  `Kamu mengalami gejala mata merah dan penglihatan menurun/kabur secara tidak akut (tidak tiba-tiba) pada mata. 
                      Belum bisa dipastikan hasil skrining penyakit mata dari gejala-gejala tersebut. 
                      Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                      setDiagnoseResult(reply);
                      setRuleBaseBefore(arr[findIndexInArray+1]); setReplyBefore('');
                      // set screening result on local storage
                      localStorage.setItem('screening_result', reply);
                      if(localStorage.getItem('token')) {
                        UpdateScreeningResult()
                      }
                    }
                    else {
                      reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                      Melalui skrining dicurigai kamu mengalami <strong>${allYesReply.length} gejala</strong> dari penyakit mata antara <strong>${ruleBase[i+1][ruleBase[i+1].length-1]}</strong>. 
                      Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                      setDiagnoseResult(reply);
                      // set screening result on local storage
                      localStorage.setItem('screening_result', reply);
                      if(localStorage.getItem('token')) {
                        UpdateScreeningResult()
                      }
                    }
                  }
                  // if ruleBase[i+1][j] is not the last value of ruleBase[i]
                  if (arr[findIndexInArray+1] !== ruleBase[i+1][ruleBase[i+1].length-1]) {
                    reply = arr[findIndexInArray+1];
                    for (let x = i; x < ruleBase.length ; x++) {
                      if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                        if (ruleBase[x][j] === arr[findIndexInArray+1]) {
                          setI(x); setJ(j);
                          setlastValueSpecialCase(ruleBase[x][ruleBase[x].length-1]);
                          break
                        }
                      }
                    }
                  }
                }
                // for i === ruleBase.length
                if (arr[findIndexInArray+1] === undefined) {
                  reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                  Belum bisa ditentukan hasil skrining penyakit mata dengan gejala-gejala yang kamu jawab <strong>ya</strong>. 
                  Silahkan ulangi skrining atau konsultasikan gejala-gejala tersebut dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                  setDiagnoseResult(reply);
                }
              }
          }
        }
        // if user type or press 'y' / 't' / 'ya' / 'tidak', 
        // but not press 'mulai' / 'tes' / 'test' / 'skrining' / 'lanjut' before
        else {
          if (input === 'y' || input === 'ya' || input === 't' || input === 'tidak') {
            reply = `Ketik atau tekan <strong>mulai</strong> untuk skrining penyakit mata`
          }
        }
      }
    }
    return [reply];
  };

  function Output(input){
    let reply; 
    input = input
      .toLowerCase()            // replace all input text to lower case
      .replace(/[^\w\s]/gi, '') // replace unneccessary input from user
      .replace(/[\d]/gi, '')
      .replace(/ a /g, ' ')     // example : 'tell me a story' -> 'tell me story'
      .replace(/i feel /g, '')
      .replace(/whats/g, 'what is')
      .replace(/please /g, '')
      .replace(/ please/g, '')
      .replace(/r u/g, 'are you')
      .replace(/'/g, '')
      .trim();                  // remove whitespace from both sides of a string
    if (Compare(prompts, replies, input)) { 
      // Search for exact match in `prompts`
      reply = Compare(prompts, replies, input);
    } 
    else if (input.match(/terima kasih/gi)) {
      reply = 'Sama-sama'
    }
    // Check if input contains `coronavirus`
    else if (input.match(/(corona|covid|virus)/gi)) {
      reply = coronavirus[Math.floor(Math.random() * coronavirus.length)];
    }
    // Screening Eye Disease
    else if (input.match(/(y|ya|t|tidak|mulai|tes|test|skrining|lanjut)/gi)) {
      reply = Screening(input)[0];
    }
    // If all else fails: random alternative
    else {
      reply = alternative[Math.floor(Math.random() * alternative.length)];
    }
    // Add chat
    AddChat(input, reply);
  }
  
  // opening chat message will be appear when browser reload
  useEffect(() => {
    AddChat2('Halo, ini adalah bot EyeScreening');
    setTimeout(() => {
      AddChat2(`Untuk memulai skrining penyakit mata ketikan atau tekan tombol <strong>mulai</strong>.`);
    },1000);
  },[])

  return (
    <ChatbotInterface
      right={right}
      input = {input}
      inputNow = {inputNow}
      inputBefore = {inputBefore}
      i = {i}
      j = {j}
      arrayPlusOne = {arrayPlusOne}
      ruleBaseBefore = {ruleBaseBefore}
      ruleBaseILength = {ruleBase[i].length}
      ruleBaseLength = {ruleBase.length}
      replyBefore = {replyBefore}
      nextReply = {nextReply}
      replyNow = {replyNow}
      allYesReply = {allYesReply}
      lastValue = {lastValue}
      lastValueSpecialCase = {lastValueSpecialCase}
      totalGejala = {totalGejala}
      handleChange = {handleChange}
      handleEnter = {handleEnter}
      handleSubmit = {handleSubmit}
      handleNextScreening = {handleNextScreening}
      handleStartScreening = {handleStartScreening}
      handleYes = {handleYes}
      handleNo = {handleNo}
    />
  )
}