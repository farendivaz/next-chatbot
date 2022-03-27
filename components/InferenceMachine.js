import { useEffect, useState } from "react";
// import array
import {prompts,replies,alternative,coronavirus} from "../data/PromptsAndReplies";
import {ruleBase} from "../data/RuleBase";
// import component
import axios from "axios";
import AddChat from "./AddChat";
import AddChat2 from "./AddChat2";
import Compare from "./Compare";
import ChatbotInterface from "./ChatbotInterface";

export default function InferenceMachine () {
  const [input, setInput] = useState("")
  // handle when form input was change or type by user and also get user input with setInput
  const handleChange = (event) => {
    setInput(event.target.value)
  }
  // get bot reply after user input chat and button was clicked
  const handleSubmit = () => {
    Output(input)
    setInput("")       // return empty form after user press the button
  }
  // get bot reply after user input chat and enter was pressed
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      Output(input)
      setInput("")     // return empty form after user press enter
    }
  }
  const handleStartScreening = () => {
    Output("skrining") // input = "mulai"
    setInput("")       // return empty form after user press button
  }
  const handleNextScreening = () => {
    Output("lanjut")   // input = "lanjut"
    setInput("")       // return empty form after user press the button
  }
  const handleYes = () => {
    Output("ya")       // input = "ya"
    setInput("")       // return empty form after user press button
  }
  const handleNo = () => {
    Output("tidak")    // input = "tidak"
    setInput("")       // return empty form after user press button
  }  

  // initialize state for screening system
  let [i,setI] = useState(0);
  let [j,setJ] = useState(0);
  let [replyNow, setReplyNow] = useState("");
  let [replyBefore, setReplyBefore] = useState("");
  let [allYesReply, setAllYesReply] = useState([]);
  let [lastValue, setLastValue] = useState([]);
  let [totalGejala, setTotalGejala] = useState([]);
  let [diagnoseResult, setDiagnoseResult] = useState("");
  let [ruleBaseBefore, setRuleBaseBefore] = useState("");

  function Screening(input) {
    // auto update screening result when screening result come up
    function UpdateScreeningResult() {
      // get user id and screening result from local storage
      const userId = localStorage.getItem("user_id");
      const screening_result = localStorage.getItem("screening_result");
      axios.put(`http://localhost:5000/api/users/${userId}`,
        ({
          updatedScreeningResult: screening_result
        })
      )
    }
    let reply;
    if (input === "mulai" || input === "tes"|| input === "test"  || input === "skrining") {
      // re-empty
      setDiagnoseResult("");setReplyNow(""); setLastValue([]); 
      setAllYesReply([]); setTotalGejala([]); setRuleBaseBefore("");
      setReplyBefore(input);
      // reply
      reply = ruleBase[1][0]; 
      setI(1); setJ(0);
    }
    else if (input === "lanjut") {
      if (replyBefore === "mulai" || replyBefore === "tes"|| replyBefore === "test"  || replyBefore === "skrining") {
        reply = "Jawab <strong>ya/tidak</strong> terlebih dahulu."
      }
      else {
        // re-empty
        setReplyNow(""); setLastValue([]); setAllYesReply([]); 
        setTotalGejala([]); setReplyBefore("lanjut");
        if (ruleBaseBefore === "Endoftalmitis, Keraritis, Panofthalmitis,") {
          reply = ruleBase[10][0]; setI(10); setJ(0);
          setDiagnoseResult("");
        }
        if (ruleBaseBefore === "Anda mengalami gejala mata merah dan penglihatan menurun") {
          reply = diagnoseResult;
        }
        if (ruleBaseBefore === "Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis") {
          reply = ruleBase[25][0]; setI(25); setJ(0); 
          setDiagnoseResult("");
        }
        if (ruleBaseBefore === "Perdarahan Subkonjungtiva") {
          reply = `Silahkan konsultasikan penyakit mata <strong>Perdarahan Subkonjungtiva</strong> dengan dokter spesialis mata`;
          setDiagnoseResult(reply);
        }
        if (ruleBaseBefore === "Alergi, Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah atau Konjungtivitis Kronis") {
          reply = ruleBase[34][0]; setI(34); setJ(0); 
          setDiagnoseResult("");
        }
        if (ruleBaseBefore === "Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria") {
          reply = ruleBase[46][0]; setI(46); setJ(0); 
          setDiagnoseResult("");
        }
        if (ruleBaseBefore === "Tumor, Strabismus atau Ophthalmopathy Thyroid") {
          reply = "Diagnosis Tumor, Strabismus atau Ophthalmopathy Thyroid lebih lanjut perlu dilakukan dengan pemeriksaan oleh dokter spesialis mata";
          setDiagnoseResult(reply);
        }
        if (ruleBaseBefore === "Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa") {
          reply = ruleBase[51][0]; setI(51); setJ(0); 
          setDiagnoseResult(reply);
        }
      }
    }
    else {
      // diagnose result is not empty, return diagnose result.
      if (diagnoseResult !== "") {
        reply = diagnoseResult;
      }
      else if (diagnoseResult === "") {
        if (
          replyBefore === "mulai" || replyBefore === "tes" || 
          replyBefore === "test" || replyBefore === "skrining" ||
          replyBefore === "lanjut"
        ) {
          // the current value is ruleBase[i][j]
          if (input === "y" || input === "ya") {
            // save all yes reply before the last value in [i] array
            setAllYesReply([...allYesReply, ruleBase[i][j]]);
            // make sure there is no same value in array
            allYesReply = [...new Set(allYesReply)];
            // if ruleBase[i][j+1] is not last value in [i] array
            if (ruleBase[i][j+1] !== ruleBase[i][ruleBase[i].length - 1]) {
              reply = ruleBase[i][j+1]; 
              setI(i); setJ(j+1);
              setReplyNow(reply)
              // get total sympthon and last value of the array
              setTotalGejala([...totalGejala, ruleBase[i].length-1])
              setLastValue([...lastValue, ruleBase[i][ruleBase[i].length-1]]);
            }
            // if ruleBase[i][j+1] is the last value in [i] array
            else if (ruleBase[i][j+1] === ruleBase[i][ruleBase[i].length - 1]) {
              if (
                ruleBase[i][j+1] === "Glaukoma Sekunder atau Akut" ||
                ruleBase[i][j+1] === "Endoftalmitis, Keraritis, Panofthalmitis," ||
                ruleBase[i][j+1] === "Anda mengalami gejala mata merah dan penglihatan menurun" ||
                ruleBase[i][j+1] === "Episkelritis, Hordeolum, Keratokonjungtivitis Flikte Nularis, Konjungtivitis Akut atau Oinguekulitis" ||
                ruleBase[i][j+1] === "Perdarahan Subkonjungtiva" ||
                ruleBase[i][j+1] === "Alergi, Blefaritis, Hemangioma, Iritasi, Gangguan Pembuluh Darah atau Konjungtivitis Kronis" ||
                ruleBase[i][j+1] === "Abalsi Retina, Perdarahan Vitreus, Neuritis Optik, Kelainan Vaskular Retina, Hifema Spontan, Keracunan Metanol, Stroke Oksipitalis atau Malingering dan Histeria" ||
                ruleBase[i][j+1] === "Tumor, Strabismus atau Ophthalmopathy Thyroid" ||
                ruleBase[i][j+1] === "Sikatrik Kornea, Kelainan Refraksi, Katarak, Uveitis Posterior, Glaukoma Sudut Terbuka Primer, Retinopati Diabetika & Hipertensi, Penyakit Macula, Papil Udema, Amblyopia, Neuropati Optik atau Retinisi Pigmentosa"
              ) {
                reply = `Melalui skrining dicurigai kamu mengalami <strong>${totalGejala[totalGejala.length-1]} gejala</strong> dari penyakit mata <strong>${lastValue[lastValue.length-1]}</strong>. 
                Ketik atau tekan lanjut untuk melanjutkan skrining kedua.`
                setDiagnoseResult(reply); setI(i); setJ(j);
                setRuleBaseBefore(ruleBase[i][j+1]); setReplyBefore("");
                // set screening result on local storage
                localStorage.setItem("screening_result", lastValue[lastValue.length-1]);
                if(localStorage.getItem('token')) { 
                  UpdateScreeningResult();
                }                
              }
              else {
                reply = `Melalui skrining dicurigai kamu mengalami <strong>${totalGejala[totalGejala.length-1]} gejala</strong> dari penyakit mata <strong>${lastValue[lastValue.length-1]}</strong>. 
                Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                setDiagnoseResult(reply); setI(i); setJ(j); setReplyBefore("");
                // set screening result on local storage
                localStorage.setItem("screening_result", lastValue[lastValue.length-1]);
                if(localStorage.getItem('token')) { 
                  UpdateScreeningResult();
                }
              }
            }
          }
          else if (input === "t" || input === "tidak") {
              // set total sympthon in the array and last value
              // let totalGejalaSpecialCase = ruleBase[i+1].length-1;
              let LastValueSpecialCase = ruleBase[i+1][ruleBase[i+1].length-1];
              if (j === 0) {
                let arr = [""];
                for (let x = 0; x < ruleBase.length ; x++) {
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
                else if (arr[findIndexInArray+1] !== undefined) {
                  // if user"s eyes are not red (normal) and eye vision is normal
                  if (arr[findIndexInArray+1] === "end of first screening") {
                    reply = `Apa kamu yakin tidak mengalami gejala <b>mata merah</b> atau <b>penglihatan menurun?</b> 
                    Silahkan ulangi skrining dengan tekan atau ketik mulai.`;
                    setDiagnoseResult(reply);
                  }
                  else if (arr[findIndexInArray+1] === "end of second screening") {
                    reply = `Apa kamu yakin tidak mengalami gejala-gejala yang ditanyakan oleh bot? 
                    Silahkan ulangi skrining dengan tekan atau ketik mulai.`;
                    setDiagnoseResult(reply);
                  }
                  else if (
                    arr[findIndexInArray+1] !== "end of first screening" || 
                    arr[findIndexInArray+1] !== "end of second screening"
                    ) {         
                    reply = arr[findIndexInArray+1]
                    // find reply in ruleBase[i][0]
                    for (let x = 0; x < ruleBase.length ; x++) {
                      if (ruleBase[x][0] === arr[findIndexInArray+1]) {
                        setI(x); setJ(0);
                        break
                      }
                    }
                  }
                }
              }
              else if (j === 1) { 
                let arr = [""];
                // push all value in the same j index
                for (let x = 0; x < ruleBase.length ; x++) {
                  if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                    arr.push(ruleBase[x][j])
                  }
                }
                // delete same values in array
                arr = [...new Set(arr)]
                // find value index in array
                let findIndexInArray = arr.indexOf(ruleBase[i][j])
                // if ruleBase[i+1][j] is the last value of ruleBase[i], case g[24]
                if (arr[findIndexInArray+1] !== undefined && arr[findIndexInArray+1] === ruleBase[i+1][ruleBase[i+1].length-1]) {
                  reply = `Kamu hanya menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                  Belum bisa dipastikan penyakit mata yang tepat hanya dari 1 gejala tersebut. 
                  Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                  setDiagnoseResult(reply);
                }
                // if ruleBase[i+1][ruleBase[i+1].length-1]) is the last value
                if (arr[findIndexInArray+1] !== undefined && arr[findIndexInArray+1] !== ruleBase[i+1][ruleBase[i+1].length-1]) {
                  reply = arr[findIndexInArray+1];
                  for (let x = 0; x < ruleBase.length ; x++) {
                    if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                      if (ruleBase[x][j] === arr[findIndexInArray+1]) {
                        setI(x); setJ(j);
                        break
                      }
                    }
                  }
                }
                // case ruleBase[57][1] and rulaBase[110][1]
                // if i === ruleBase.length, case for g[58], g[14]
                if (arr[findIndexInArray+1] === undefined) {
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
                  let arr = [""];
                    // push all value in the same j index
                    for (let x = 0; x < ruleBase.length ; x++) {
                      if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                        arr.push(ruleBase[x][j])
                      }
                    }
                  // delete same values in array
                  arr = [...new Set(arr)]
                  // find value index in array
                  let findIndexInArray = arr.indexOf(ruleBase[i][j])
                  // if ruleBase[i+1][j] is the last value of ruleBase[i]
                  if (arr[findIndexInArray+1] !== undefined && arr[findIndexInArray+1] === ruleBase[i+1][ruleBase[i+1].length-1]){
                    reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Melalui skrining dicurigai kamu mengalami <strong>${allYesReply.length} gejala</strong> dari penyakit mata bernama <strong>${LastValueSpecialCase}</strong>. 
                    Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    setDiagnoseResult(reply);
                    // set screening result on local storage
                    localStorage.setItem("screening_result", LastValueSpecialCase);
                    if(localStorage.getItem('token')) { 
                      UpdateScreeningResult();
                    }
                  }
                  // if ruleBase[i+1][j] is not the last value of ruleBase[i]
                  if (arr[findIndexInArray+1] !== undefined && arr[findIndexInArray+1] !== ruleBase[i+1][ruleBase[i+1].length-1]) {
                    reply = arr[findIndexInArray+1];
                    for (let x = 0; x < ruleBase.length ; x++) {
                      if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                        if (ruleBase[x][j] === arr[findIndexInArray+1]) {
                          setI(x); setJ(j);
                          break
                        }
                      }
                    }
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
                  let arr = [""];
                  // push all value in the same j index
                  for (let x = 0; x < ruleBase.length ; x++) {
                    if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                      arr.push(ruleBase[x][j])
                    }
                  }
                  // delete same values in array
                  arr = [...new Set(arr)]
                  // find value index in array
                  let findIndexInArray = arr.indexOf(ruleBase[i][j])
                  // if ruleBase[i+1][j] is the last value of ruleBase[i]
                  if (arr[findIndexInArray+1] !== undefined && arr[findIndexInArray+1] === ruleBase[i+1][ruleBase[i+1].length-1]) {
                    reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Melalui skrining dicurigai kamu mengalami <strong>${allYesReply.length} gejala</strong> dari penyakit mata bernama <strong>${LastValueSpecialCase}</strong>. 
                    Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    setDiagnoseResult(reply);
                    // set screening result on local storage
                    localStorage.setItem("screening_result", LastValueSpecialCase);
                    if(localStorage.getItem('token')) { 
                      UpdateScreeningResult();
                    }
                  }
                  // if ruleBase[i+1][j] is not the last value of ruleBase[i]
                  if (arr[findIndexInArray+1] !== undefined && arr[findIndexInArray+1] !== ruleBase[i+1][ruleBase[i+1].length-1]) {
                    reply = arr[findIndexInArray+1];
                    for (let x = 0; x < ruleBase.length ; x++) {
                      if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                        if (ruleBase[x][j] === arr[findIndexInArray+1]) {
                          setI(x); setJ(j);
                          break
                        }
                      }
                    }
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
                  let arr = [""];
                  // push all value in the same j index
                  for (let x = 0; x < ruleBase.length ; x++) {
                    if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                      arr.push(ruleBase[x][j])
                    }
                  }
                  // delete same values in array
                  arr = [...new Set(arr)]
                  // find value index in array
                  let findIndexInArray = arr.indexOf(ruleBase[i][j])
                  // if ruleBase[i+1][j] is the last value of ruleBase[i]
                  if (arr[findIndexInArray+1] !== undefined && arr[findIndexInArray+1] === ruleBase[i+1][ruleBase[i+1].length-1]){
                    reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Melalui skrining dicurigai kamu mengalami <strong>${allYesReply.length} gejala</strong> dari penyakit mata bernama <strong>${LastValueSpecialCase}</strong>. 
                    Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    setDiagnoseResult(reply);
                    // set screening result on local storage
                    localStorage.setItem("screening_result", LastValueSpecialCase);
                    if(localStorage.getItem('token')) { 
                      UpdateScreeningResult();
                    }
                  }
                  // if ruleBase[i+1][j] is not the last value of ruleBase[i]
                  if (arr[findIndexInArray+1] !== undefined && arr[findIndexInArray+1] !== ruleBase[i+1][ruleBase[i+1].length-1]) {
                    reply = arr[findIndexInArray+1];
                    for (let x = 0; x < ruleBase.length ; x++) {
                      if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                        if (ruleBase[x][j] === arr[findIndexInArray+1]) {
                          setI(x); setJ(j);
                          break
                        }
                      }
                    }
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
                  let arr = [""];
                  // push all value in the same j index
                  for (let x = 0; x < ruleBase.length ; x++) {
                    if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                      arr.push(ruleBase[x][j])
                    }
                  }
                  // delete same values in array
                  arr = [...new Set(arr)]
                  // find value index in array
                  let findIndexInArray = arr.indexOf(ruleBase[i][j])
                  // if ruleBase[i+1][j] is the last value of ruleBase[i]
                  if (arr[findIndexInArray+1] !== undefined && arr[findIndexInArray+1] === ruleBase[i+1][ruleBase[i+1].length-1]){
                    reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Melalui skrining dicurigai kamu mengalami <strong>${allYesReply.length} gejala</strong> dari penyakit mata bernama <strong>${LastValueSpecialCase}</strong>. 
                    Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    setDiagnoseResult(reply);
                    // set screening result on local storage
                    localStorage.setItem("screening_result", LastValueSpecialCase);
                    if(localStorage.getItem('token')) { 
                      UpdateScreeningResult();
                    }
                  }
                  // if ruleBase[i+1][j] is not the last value of ruleBase[i]
                  if (arr[findIndexInArray+1] !== undefined && arr[findIndexInArray+1] !== ruleBase[i+1][ruleBase[i+1].length-1]) {
                    reply = arr[findIndexInArray+1];
                    for (let x = 0; x < ruleBase.length ; x++) {
                      if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                        if (ruleBase[x][j] === arr[findIndexInArray+1]) {
                          setI(x); setJ(j);
                          break
                        }
                      }
                    }
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
                  let arr = [""];
                  // push all value in the same j index
                  for (let x = 0; x < ruleBase.length ; x++) {
                    if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                      arr.push(ruleBase[x][j])
                    }
                  }
                  // delete same values in array
                  arr = [...new Set(arr)]
                  // find value index in array
                  let findIndexInArray = arr.indexOf(ruleBase[i][j])
                  // if ruleBase[i+1][j] is the last value of ruleBase[i]
                  if (arr[findIndexInArray+1] !== undefined && arr[findIndexInArray+1] === ruleBase[i+1][ruleBase[i+1].length-1]){
                    reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                    Melalui skrining dicurigai kamu mengalami <strong>${allYesReply.length} gejala</strong> dari penyakit mata bernama <strong>${LastValueSpecialCase}</strong>. 
                    Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                    setDiagnoseResult(reply);
                    // set screening result on local storage
                    localStorage.setItem("screening_result", LastValueSpecialCase);
                    if(localStorage.getItem('token')) { 
                      UpdateScreeningResult();
                    }
                  }
                  // if ruleBase[i+1][j] is not the last value of ruleBase[i]
                  if (arr[findIndexInArray+1] !== undefined && arr[findIndexInArray+1] !== ruleBase[i+1][ruleBase[i+1].length-1]) {
                    reply = arr[findIndexInArray+1];
                    for (let x = 0; x < ruleBase.length ; x++) {
                      if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                        if (ruleBase[x][j] === arr[findIndexInArray+1]) {
                          setI(x); setJ(j);
                          break
                        }
                      }
                    }
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
                let arr = [""];
                // push all value in the same j index
                for (let x = 0; x < ruleBase.length ; x++) {
                  if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                    arr.push(ruleBase[x][j])
                  }
                }
                // delete same values in array
                arr = [...new Set(arr)]
                // find value index in array
                let findIndexInArray = arr.indexOf(ruleBase[i][j])
                // if ruleBase[i+1][j] is the last value of ruleBase[i]
                if (arr[findIndexInArray+1] !== undefined && arr[findIndexInArray+1] === ruleBase[i+1][ruleBase[i+1].length-1]){
                  reply = `Kamu menjawab <strong>ya</strong> untuk ${allYesReply.length} pertanyaan yang ditanyakan oleh bot. 
                  Melalui skrining dicurigai kamu mengalami <strong>${allYesReply.length} gejala</strong> dari penyakit mata bernama <strong>${LastValueSpecialCase}</strong>. 
                  Silahkan konsultasikan hasil skrining ini dengan dokter spesialis mata terdekat untuk informasi lebih lanjut.`
                  setDiagnoseResult(reply);
                  // set screening result on local storage
                  localStorage.setItem("screening_result", LastValueSpecialCase);
                  if(localStorage.getItem('token')) { 
                    UpdateScreeningResult();
                  }
                }
                // if ruleBase[i+1][j] is not the last value of ruleBase[i]
                if (arr[findIndexInArray+1] !== undefined && arr[findIndexInArray+1] !== ruleBase[i+1][ruleBase[i+1].length-1]) {
                  reply = arr[findIndexInArray+1];
                  for (let x = 0; x < ruleBase.length ; x++) {
                    if (ruleBase[x][j-1] === ruleBase[i][j-1]) {
                      if (ruleBase[x][j] === arr[findIndexInArray+1]) {
                        setI(x); setJ(j);
                        break
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
        // if user type or press "y" / "t" / "ya" / "tidak", 
        // but not press "mulai" / "tes" / "test" / "skrining" / "lanjut" before
        else {
          if (input === "y" || input === "ya" || input === "t" || input === "tidak") {
            reply = `Ketik atau tekan <strong>mulai</strong> untuk skrining penyakit mata`
          }
        }
      }
    }
    return [reply];
  }

  // Output of the chatbot after receiving input from user
  function Output(input){
    let reply; 
    input = input
      .toLowerCase()            // replace all input text to lower case
      .replace(/[^\w\s]/gi, "") // replace unneccessary input from user
      .replace(/[\d]/gi, "")
      .replace(/ a /g, " ")     // example : "tell me a story" -> "tell me story"
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .replace(/r u/g, "are you")
      .replace(/"/g, "")
      .trim();                  // remove whitespace from both sides of a string
    if (Compare(prompts, replies, input)) { 
      // Search for exact match in `prompts`
      reply = Compare(prompts, replies, input);
    } 
    else if (input.match(/terima kasih/gi)) {
      reply = "Sama-sama"
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
    AddChat2("Halo, ini adalah bot EyeScreening");
    setTimeout(() => {
      AddChat2(`Untuk memulai skrining penyakit mata ketikan atau tekan tombol <strong>mulai</strong>.`);
    },1000);
  },[])
 
  return (
    <ChatbotInterface
      input = {input}
      i = {i}
      j = {j}
      ruleBaseBefore = {ruleBaseBefore}
      ruleBaseILength = {ruleBase[i].length}
      ruleBaseLength = {ruleBase.length}
      replyBefore = {replyBefore}
      replyNow = {replyNow}
      allYesReply = {allYesReply}
      lastValue = {lastValue}
      handleChange = {handleChange}
      handleEnter = {handleEnter}
      handleSubmit = {handleSubmit}
      handleStartScreening = {handleStartScreening}
      handleNextScreening = {handleNextScreening}
      handleYes = {handleYes}
      handleNo = {handleNo}
    />
  )
}