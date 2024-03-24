import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from '../apis/RestaurantFinder'
import Reviews from '../components/Reviews'
import AddReview from '../components/AddReview'
import StarRating from '../components/StarRating'
import { IResponseResults, IRestaurantContextData } from '../types/restaurant'


// JSX element for restaurant detail page to store name and reviews of each restaurant
const RestaurantDetailPage = () => {
  // deconstructs the id from the params
  const { id } = useParams<{id: string}>()
  // deconstructs the selectedRestaurant and setSelectedRestaurant from the context to pass down values
  const { selectedRestaurant, setSelectedRestaurant } = useContext<IRestaurantContextData>(RestaurantsContext)

  // creates a useEffect hook that fetches the data from the api when the id and setSelectedRestaurant changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // variable that stores the response data for single restaurant from the api
        const response: IResponseResults = await RestaurantFinder.get(`/${id}`)
        // checks if setSelectedRestaurant is defined before executing the function
        if (setSelectedRestaurant) {
          // sets the selected restaurant to the data from the api
          setSelectedRestaurant(response)
        }

      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [id, selectedRestaurant, setSelectedRestaurant])
  
  // returns the html and JSX elements to be rendered in restaurant detail page
  // renders out name of restaurant, star rating, reviews, and add review inputs
  return (
    <>
      {selectedRestaurant && (
        <>
          <h1 className='display-1 text-center text-capitalize'>{selectedRestaurant.data.data.restaurant.name}</h1>
          <div className="text-center">
            <StarRating rating={selectedRestaurant.data.data.restaurant.average_rating} />
            <span className="text-warning ml-1">
              {selectedRestaurant.data.data.restaurant.count ? `(${selectedRestaurant.data.data.restaurant.count})` : "0"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.data.data.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </>
  )
}

// exports the RestaurantDetailPage component
export default RestaurantDetailPage