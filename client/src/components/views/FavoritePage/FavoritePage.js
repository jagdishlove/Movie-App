import React, { useEffect, useState, useSelector } from 'react'
import { Typography, Popover, Button } from 'antd';
import axios from 'axios';
import './favorite.css';



const { Title } = Typography;

function FavoritePage() {
   

    const [Favorites, setFavorites] = useState([])
    const [Loading, setLoading] = useState(true)
    let variable = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
        fetchFavoredMovie()
    }, [])

    const fetchFavoredMovie = () => {
        axios.post('/api/favorite/getFavoredMovie', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.favorites)
                    setFavorites(response.data.favorites)
                    setLoading(false)
                } else {
                    alert('Failed to get subscription videos')
                }
            })
    }

    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId: movieId,
            userFrom: userFrom,
        }

        axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoredMovie()
                } else {
                    alert('Failed to Remove From Favorite')
                }
            })
    }


   

        

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Favorite Movies By Me </Title>
            <hr />
          
                   
                
                
                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie RunTime</th>
                            <th>Remove from favorites</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            
        </div>
    )
}

export default FavoritePage
