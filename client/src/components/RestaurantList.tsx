import React, { useContext, useEffect } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating'
import { IRestaurantListProps, IRestaurantContextData } from '../types/restaurant'

const RestaurantList = (props) => {
    const { restaurants, setRestaurants }: IRestaurantListProps = useContext<IRestaurantContextData>(RestaurantsContext)
    let navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get('/')
                console.log(response.data.data.restaurants)
                if (setRestaurants) {
                    setRestaurants(response.data.data.restaurants)
                }
            } catch (err) { }
        }
        fetchData()
    }, [setRestaurants])

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            //const response = await RestaurantFinder.delete(`/${id}`)
            if (setRestaurants && restaurants) {
                setRestaurants(restaurants.filter(restaurant => {
                    return restaurant.id !== id
                }))
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation()
        navigate(`/restaurants/${id}/update`, { state: { id } })
    }

    const handleRestaurantSelect = (id) => {
        navigate(`/restaurants/${id}`, { state: { id } })
    }

    const renderRating = (restaurant) => {
        if (!restaurant.count) {
            return <span className="text-warning">0 reviews</span>
        }
        return (
            <>
                <StarRating rating={restaurant.id} />
                <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        )
    }

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
                        <td>mcdonalds</td>
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
                        <td>mcdonalds</td>
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

export default RestaurantList