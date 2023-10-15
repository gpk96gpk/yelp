import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from '../apis/RestaurantFinder'
import Reviews from '../components/Reviews'
import AddReview from '../components/AddReview'
import StarRating from '../components/StarRating'
import { ResponseResults, IRestaurantContextData } from '../types/restaurant'


//functional component for restaurant detail page
const RestaurantDetailPage = () => {
  //deconstructs the id from the params
  const { id } = useParams<{id: string}>()
  //deconstructs the selectedRestaurant and setSelectedRestaurant from the context
  const { selectedRestaurant, setSelectedRestaurant } = useContext<IRestaurantContextData>(RestaurantsContext)

  //creates a useEffect hook that fetches the data from the api when the id and setSelectedRestaurant changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        //variable that stores the response from the api
        const response: ResponseResults = await RestaurantFinder.get(`/${id}`)
        //checks if setSelectedRestaurant is defined before executing the function
        if (setSelectedRestaurant) {
          //sets the selected restaurant to the data from the api
          setSelectedRestaurant(response.data.results.restaurant)
        }

      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [id, setSelectedRestaurant])
  //returns the html and jsx to be rendered in restaurant detail page
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
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </>
  )
}
//exports the RestaurantDetailPage component
export default RestaurantDetailPage