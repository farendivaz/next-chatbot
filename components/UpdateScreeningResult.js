import {useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

export default function UpdateScreeningResult() {
  // get user id from local storage
  localStorage.getItem('userId');
  // get url query
  const params = useParams();
  const [successUpdateScreeningResult, setSuccessUpdateScreeningResult] = useState("");
  const [errorUpdateScreeningResult, setErrorUpdateScreeningResult] = useState('');
  // get screening result from local storage
  screening_result = localStorage.getItem('screening_result');
  axios.put(`http://localhost:5000/${params.id}`,
    ({
      updatedScreeningResult: screening_result
    })
  )
  .then(response => {
    setUpdatedAt(response.data.message);
    setSuccessUpdateScreeningResult("Success update screening result");
  })
  .catch(error => setErrorUpdateScreeningResult(error.message));

  return [successUpdateScreeningResult, errorUpdateScreeningResult];
}