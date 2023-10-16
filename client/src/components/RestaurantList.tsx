import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
//imports StarRating component to get the star rating for each restaurant
import StarRating from './StarRating'
import { IRestaurantContextData, IRestaurant, ResponseDeleteResults } from '../types/restaurant'

//what are the props for this component?
// type IRestaurantListProps = {
//    restaurants: Array<{
//        id: number,
//        name: string,
//        location: string,
//        price_range: string,
//        average_rating: number,
//        count: number,
//    }>
// }

const RestaurantList = () => {
    // Deconstructs the restaurants and setRestaurants from the context
    const { restaurants, setRestaurants } = useContext<IRestaurantContextData>(RestaurantsContext)
    //uses the useNavigate hook to navigate to the update page
    let navigate = useNavigate()
    //creates a useEffect hook to fetch the data from the api when setRestaurants changes
    useEffect(() => {
        //async function that fetches the data from the api stores it in response variable
        const fetchData = async () => {
            try {
                //variable that stores the response from the api
                const response = await RestaurantFinder.get('/')
                //checks if setRestaurants is defined before executing the function
                if (setRestaurants) {
                    //takes response and sets the restaurants to the data from the api
                    setRestaurants(response.data.data.restaurants)
                }
            } catch (err) { }
        }
        //calls the fetchData function
        fetchData()   
    }, [setRestaurants])

    // Function that handles the delete button. It is an async function that
    // takes in a React MouseEvent and the id of the restaurant to be deleted.
    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        //prevents the default behavior of the event
        e.stopPropagation()
        try {
            //checks if setRestaurants and restaurants are defined before executing the function
            if (restaurants) {
                //filters out restaurant with matching id from setRestaurants array 
                const response: ResponseDeleteResults = await RestaurantFinder.delete(`/${id}`)
                if (response.data.status === "success") {
                    setRestaurants(restaurants.filter(restaurant => {
                        return restaurant.id !== Number(id)
                    }))
                }
            }
        } catch (err) {
            console.log(err)
        }
        navigate(0)
    }
    //function that handles the update button. It is an async function that takes in a React MouseEvent and the id of the restaurant to be updated.
    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        //prevents the default behavior of the event
        e.stopPropagation()
        //navigates to the update page with the id of the restaurant to be updated
        navigate(`/restaurants/${id}/update`, { state: { id } })
    }
    // Function that handles the restaurant select. It takes in the
    // id of the restaurant to be selected.
    const handleRestaurantSelect = (id: number) => {
        //navigates to restaurant page with matching id selected from props
        navigate(`/restaurants/${id}`, { state: { id } })
    }
    //function that renders the rating for each restaurant. It takes in the restaurant object.
    const renderRating = (restaurant: IRestaurant) => {
        //if restaurant.count is not defined return 0 reviews
        if (!restaurant.count) {
            return <span className="text-warning">0 reviews</span>
        }
        //returns the star rating and the number of reviews
        return (
            <>
                <StarRating rating={restaurant.id} />
                <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        )
    }
    //returns the html to be rendered in the restaurant list
    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead >
                    <tr >
                        <th className="bg-primary" scope='col'>Restaurant</th>
                        <th className="bg-primary" scope='col'>Location</th>
                        <th className="bg-primary" scope='col'>Price Range</th>
                        <th className="bg-primary" scope='col'>Ratings</th>
                        <th className="bg-primary" scope='col'>Edit</th>
                        <th className="bg-primary" scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* maps over the restaurants array and returns the html to be rendered for each restaurant */}
                    {restaurants && restaurants.map((restaurant) => {
                        return (
                            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{'$'.repeat(restaurant.price_range)}</td>
                                <td>{renderRating(restaurant)}</td>
                                <td><button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button> </td>
                                <td><button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                    })}
                    {/* <tr>
                        <td>McDonald's</td>
                        <td>New York</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td>
                            <button className="btn btn-warning">Update</button>
                        </td>
                        <td>
                            <button className="btn btn-danger">Delete</button>
                        </td>                
                    </tr>
                    <tr>
                        <td>McDonald's</td>
                        <td>New York</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td>
                            <button className="btn btn-warning">Update</button>
                        </td>
                        <td>
                            <button className="btn btn-danger">Delete</button>
                        </td>                
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}
//exports the RestaurantList component
export default RestaurantList