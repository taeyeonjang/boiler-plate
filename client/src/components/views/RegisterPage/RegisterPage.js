import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { registerUser } from  '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';

function RegisterPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("")

  const onEmail = (event) =>{
    setEmail(event.currentTarget.value)
  }

  const [Name, setName] = useState("")

  const onName = (event) =>{
    setName(event.currentTarget.value)
  }

  const [Password, setPassword] = useState("")

  const onPassword = (event) =>{
    setPassword(event.currentTarget.value)
  }
  const [CPassword, setCPassword] = useState("")

  const onCPassword = (event) =>{
    setCPassword(event.currentTarget.value)
  }

  const onSubmit =(e)=>{
    e.preventDefault();

    if(Password !== CPassword){
      return alert('비밀번호가 달라요')
    }

    let body ={
      email: Email,
      password: Password,
      name: Name
    }

    dispatch(registerUser(body))
    .then(response => {
      if(response.payload.success){
        navigate('/login')
      }
      else{
        alert('Failed to Sign up')
      }
    })
  }
  return (
  <div style={{
    display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height :'100vh'
  }}>
    <form style={{
      display:'flex', flexDirection:'column'
    }}
    onSubmit={onSubmit}>
      <label>Email</label>
      <input type="email" placeholder='minsu@naver.com' value={Email} onChange={onEmail}/>

      <label>Name</label>
      <input type="text" placeholder='god-il' value={Name} onChange={onName}/>

      <label>Password</label>
      <input type="password" value={Password} onChange={onPassword}/>
      
      <label>Confirm Password</label>
      <input type="password" value={CPassword} onChange ={onCPassword} />
    <br/>
      <button type="submit">
        회원가입
      </button>
    </form>
  </div>
  )}

export default Auth(RegisterPage, false);
