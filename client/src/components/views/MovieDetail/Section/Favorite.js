import React, { useEffect } from 'react'
import axios from 'axios'

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtimes

    useEffect(() => {
        
        let variables = {
            userFrom,
            movieId
        }
        axios.post('/api/favoirte/favoriteNumber', variables)
        
        .then(response => {
            console.log(response.data)
            if(response.data.success){
                
            } else {
                alert('숫자 정보를 가져오는데 실패했습니다.')
            }
        })
    
      
    }, [])
    

  return (
    <div>
        <button>Favorite</button>
    </div>
  )
}

export default Favorite