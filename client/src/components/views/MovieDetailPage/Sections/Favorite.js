import React, { useEffect, useState } from 'react'
import axios from 'axios';





function Favorite(props) {


const [FavoriteNumber, setFavoriteNumber]= useState(0)
const [Favorited, setFavorited] = useState(false)

const variable={
    userFrom: props.userFrom ,
    movieId: props.movieId , 
    movieTitle: props.movieInfo.original_title,
    movieImage: props.movieInfo.backdrop_path,
    movieRunTIme: props.movieInfo.runtime
}

 
    useEffect(()=>{

        
    axios.post('/api/favorite/favoriteNumber', variable)
        .then(response=>{
            if(response.data.success){

                setFavoriteNumber(response.data.FavoriteNumber)

            }else{
                alert('failed to get favoriteNumber')
            }
        
    })

    axios.post('/api/favorite/favorited', variable)
    .then(response =>{
        if(response.data.success){ 
            setFavorited(response.data.Favorited )

        }
        else{
            alert('failed to get Favorite Info')
        }
    })

},[])
    const onClickFavorite = () => {
         if(Favorited){
             //when already added
             axios.post('/api/favorite/removeFromFavorite',variable)
             .then(response=>{
                 if(response.data.success){
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)

                 }else{
                     alert('Failed to remove from Favorite')
                 }
             })

         }
         else{
             //when not adding yet
             axios.post('/api/favorite/addToFavorite', variable)
             .then(response=>{
                 if(response.data.success){
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)

                 }else{
                     alert('Failed to add to favorites')
                 }
             })
         }
         
    }

    return (
        <div>
              <button onClick={onClickFavorite}>{Favorited ? "remove from Favorite" : "Add to Favorite"}{FavoriteNumber}</button>
        </div>
    )
}

export default Favorite
 