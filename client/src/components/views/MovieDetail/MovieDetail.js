import React, { useEffect, useState } from 'react';
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import { useParams } from 'react-router-dom';
import MainImage from '../LandingPage/Sections/MainImgae';
import MovieInfo from './Section/MovieInfo';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
import Favorite from './Section/Favorite';

function MovieDetail() {
  
  let {movieId} = useParams()
  
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ViewToggle, setViewToggle] = useState(false)

    const actorViewToggle = () => {
      setViewToggle(!ViewToggle)
    }


    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
           .then(response => response.json())
           .then(response => {
                setMovie(response)
           })

        fetch(endpointCrew)
           .then(response => response.json())
           .then(response =>{
            setCasts(response.cast)
           })

    }, [])
    

    
    
  return (
    <div>
  
    {Movie.backdrop_path &&
    <MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />
    }

    

    <div style={{ width: '85%', margin : '1rem auto'}}>

    <div style ={{ display: 'flex', justifyContent: 'flex-end'}}>
      <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}  />
    </div>

    <MovieInfo movie ={Movie}/>
    <br />

    <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
        <button onClick={actorViewToggle}> Toggle Actor View</button>   
     </div>

    {ViewToggle &&
     <Row gutter={[16, 16]}>
        {Casts && Casts.map((casts, index)=>(
          <React.Fragment key={index}>
              <GridCards image={casts.profile_path ? `${IMAGE_BASE_URL}w500${casts.profile_path}` : null}
                          characterName={casts.name}/>
          </React.Fragment>
        ))}
      </Row>
    }
    </div>

    </div>
  )
}

export default MovieDetail