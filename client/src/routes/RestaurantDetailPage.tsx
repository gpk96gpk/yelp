import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from '../apis/RestaurantFinder'
import Reviews from '../components/Reviews'
import AddReview from '../components/AddReview'
import StarRating from '../components/StarRating'

type RestaurantParams = {
  id: number,
}

type SelectedRestaurantContext = {
  selectedRestaurant: {
    restaurant: {
      id: number,
      name: string,
      location: string,
      price_range: number,
      average_rating: string,
      count: number,
    },
    reviews: Array<{
      id: number,
      restaurant_id: number,
      name: string,
      review: string,
      rating: number,
    }>
  },
  setSelectedRestaurant: (selectedRestaurant: number) => void
}

type ResponseResults = {
  data: {
    results: number
  }
}

const RestaurantDetailPage = () => {
  const {id} = useParams<RestaurantParams>()
  const {selectedRestaurant, setSelectedRestaurant} = useContext<SelectedRestaurantContext>(RestaurantsContext) 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResponseResults = await RestaurantFinder.get(`/${id}`)
        setSelectedRestaurant(response.data.results)
        
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [id, setSelectedRestaurant])

  return (
    <>
      {selectedRestaurant && (
        <>
          <h1 className='display-1 text-center text-capitalize'>{selectedRestaurant.restaurant.name}</h1>
          <div className="text-center">
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span className="text-warning ml-1">
              {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : "0"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews}/>
          </div>
          <AddReview />
        </>
      )}
    </>
  )
}

export default RestaurantDetailPage