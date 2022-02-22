import React from 'react';

function MainImage(props) {

    return(
        
            <div style={{
            backgroundImage: `url(${props.image})`,
                height: '500px',
                backgroundSize: '100%, cover',
                backgroundPosition: 'center, center',
                width: '100%',
                position: 'relative'
        }}>
           
            <div>
                <div style={{ position: 'absolute', maxWidth: '500px', bottom: '7rem', marginLeft: '2rem'}}>
                    <h2 style={{color: 'white'}}> {props.title} </h2>
                    <p style={{ color: 'white', fontSzie: '1rem'}}> {props.text}</p>

                </div>
            </div>
           
        </div>


    )
}

export default MainImage