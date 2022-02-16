import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from  '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';

function LoginPage() {

  const dispatch = useDispatch();
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  let navigate = useNavigate();


  const onEmail=(e)=>{
    
    setEmail(e.currentTarget.value)

  }

  const onPassword=(e)=>{
    
    setPassword(e.currentTarget.value)

  }

  const onSubmit=(e)=>{
    
    e.preventDefault();

  let body={
    email: Email,
    password: Password
  }
//dispatch에 login user는 user action.js 에 함수명이네
  dispatch(loginUser(body))
  .then(response =>{
    if(response.payload.loginSuccess){
      navigate('/')
    }else{
      alert(response.payload.message)
    }
  })
  }
  return(
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height :'100vh'
    }}>
      <form style={{ display:'flex', flexDirection: 'column'}}
        onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmail} />
        <label>Password</label>
        <input type="current-password" vlaue={Password} onChange={onPassword} />

        <br/>
        <button type="submit">
          Login
        </button>
      </form>

    </div>
  )

}

export default Auth(LoginPage, false);
