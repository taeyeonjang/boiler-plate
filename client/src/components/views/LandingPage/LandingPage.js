import React, {useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth'

function LandingPage() {
  
  const navigate = useNavigate();
  
    useEffect(() => {
      axios.get('/api/hello')
      .then(res => console.log(res))
    }, []);
    
    const onClick = () =>{
      axios.get('api/users/logout')
      .then(response => {
        if(response.data.success){
          navigate('/login')
        } else{
            alert('로그아웃하는데 에러가 발생하였습니다.')
          }
        })
  }
  return( 
  <div style={{
    display: 'flex', justifyContent: 'center', alignItems: 'center'
    , width: '100%', height :'100vh'
  }}>
    <h2>
      시작페이지
    </h2>
    <button onClick={onClick}>로그아웃</button>
  </div>
  
  )
}

export default Auth(LandingPage, null);
