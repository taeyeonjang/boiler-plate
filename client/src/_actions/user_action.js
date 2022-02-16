import axios from'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataTosubmit){

  const request = axios.post('/api/users/login', dataTosubmit)
  //서버에 요청
  .then(response =>response.data) 
  return {
      //서버에 요청한 데이터들을 reducer로 넘기는 작업
      type: LOGIN_USER,
      payload: request

  }
}


export function registerUser(dataToSubmit){
  const request = axios.post('api/users/register', dataToSubmit)
  .then(response => response.data)

  return{
    type: REGISTER_USER,
    payload: request
  }
}

export function auth(){
  const request = axios.get('api/users/auth')
  .then(response => response.data)

  return{
    type: AUTH_USER,
    payload: request
  }
}



// React Com`p  -> Action -> Reducer -> STORE ->  반복 