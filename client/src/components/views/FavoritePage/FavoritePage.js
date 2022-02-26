import React, { useEffect, useState } from 'react';
import Auth from '../../../hoc/auth';
import axios from 'axios';
import './favorite.css';
import {Popover} from 'antd';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {

  const [, setFavor] = useState([])

  useEffect(() => {
    //favorited된 영화를 가져와야하는데 id가 필요하다 그래서 앞에서했던 localstorage이용하여 id를 가져온다 (로그인한 정보 id)
    fetchRemoveMovie()

  }, [])
  

  const fetchRemoveMovie = () => {
    axios.post('/api/favorite/getFavoritedMovie', {userFrom: localStorage.getItem('userId')})
      
      .then(response =>{
        if(response.data.success){
          setFavor(response.data.favorites)
        } else{
          alert('영화정보를 가져오는데 실패 했습니다.')
        }
      })
  }

  const onRemove = (movieId, userFrom) => {
    const variables ={
      movieId,
      userFrom
    }

    axios.post('/api/favorite/removeFromFavorite', variables)
    .then(response => {
      if(response.data.success){
        fetchRemoveMovie()
      } else {
        alert('리스트에서 지우는데 실패했습니다.')
      }
    })
  }

  const renderCards =  Favor.map((favorite, index) =>{

    const content=(
      <div>
        {favorite.moviePost ?
        <img src={`${IMAGE_BASE_URL}w300${favorite.moviePost}`} /> : "no Image"}
        
      </div>
    )

      return <tr key={index}>
      <Popover content={content}title={`${favorite.movieTitle}`}>
      <td>{favorite.movieTitle}</td>
      </Popover>
      <td>{favorite.movieRunTime} mins</td>
      <td><button onClick={()=>onRemove(favorite.movieId, favorite.userFrom)}>Remove</button></td>
    </tr>
    })

  return (
    <div style={{width: '85%', margin: '3rem auto'}}>
    <h2> Favorite Movies </h2>
    <hr />

<table>
        <thead>
            <tr>
                <th>Movie Title</th>
                <th>Movie RunTime</th>
                <td>Remove from favorites </td>
            </tr>
        </thead>

        <tbody>

         {renderCards}

        </tbody>
 </table>
      </div>
  )
}

export default Auth(FavoritePage, true)