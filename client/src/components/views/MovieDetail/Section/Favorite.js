import React, { useEffect, useState } from 'react'
import axios from 'axios'
 

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;


    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime,
    }
    useEffect(() => {
        
        
        axios.post('/api/favorite/favoriteNumber', variables)
        
        .then(response => {

            setFavoriteNumber(response.data.favoriteNumber)
            
            if(response.data.success){
            } else {
                alert('숫자 정보를 가져오는데 실패했습니다.')
            }
        })

        axios.post('/api/favorite/favorited', variables)
        .then(response => {
            setFavorited(response.data.favorited)
            if(response.data.success){
            } else {
                alert('정보를 가져오는데 실패했습니다.')
            }
        })

       }, [])

    const onFavorite = () =>{
        
        // add for favorite 누르면 숫자가 바뀌어야한다..
        // 내가 즐겨찾기 저장한지 안한지 확인을 해야함

        if(Favorited){
            axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response =>{
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)
                }else{
                    alert('Favorite list에서 지우는것을 실패하였습니다.')
                }
            })

        } else {
            
            axios.post('/api/favorite/addFromFavorite', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)
                }else{
                    alert('즐겨찾기 추가를 실패하였습니다.')
                }
            })

        }
    }

  return (
    <div>
        <button onClick={onFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber} </button>
    </div>
  )
}

export default Favorite