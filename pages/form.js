import {useState} from 'react';
import '../styles/Home.module.css';

export default function Form() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  let [result, setResult] = useState(0);
  let [resultError, setResultError] = useState('');

  const bmiCalculation = () => {
    if (height !== 0 && weight !== 0) {
      const bmi = (weight*10000)/(height*height);
      setResult(bmi.toFixed(2));
      setResultError('');
    }
    else {
      setResult(0);
      setResultError('. Input tidak boleh 0.');
    }
  }

  return (
    <div className='w-3/5 bg-white border-2 border-blue-400 hover:border-blue-500 mx-auto my-2 p-2 quicksand rounded-xl drop-shadow-2xl text-center text-left'>
      <h1 className='font-bold ml-2 text-xl text-blue-800 mb-2'>
        Input nilai berat badan dan tinggi badan kamu
      </h1>
      <label>Input berat badan</label>
      <input 
        type='text' 
        value={weight} 
        onChange={(e) => setWeight(e.target.value)}
        className='border-2 border-blue-400 mt-2 p-1 rounded text-pink-500' 
        placeholder='Berat badan..'
      />
      <span className='mr-2'> kg</span>
      <label>Input tinggi badan</label>
      <input 
        type='text' 
        value={height} 
        onChange={(e) => setHeight(e.target.value)}
        className='border-2 border-blue-400 mt-2 p-1 rounded text-pink-500' 
        placeholder='Tinggi badan..'
      />
      <span className='mr-2'> cm</span>
      <button 
        className='bg-indigo-500 hover:shadow-lg ml-2 px-3 py-2 rounded-full text-white'
        onClick={bmiCalculation}
      >
        Hitung BMI
      </button>
      <p className='my-3 font-bold'>Nilai BMI kamu adalah <span className='font-bold text-blue-500'>{result} {resultError}</span></p>
    </div>
  )
}