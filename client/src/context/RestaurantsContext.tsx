import React, { useState, createContext } from 'react'
import { IRestaurant, IRestaurantContextData } from '../types/restaurant'


export const RestaurantsContext = createContext<IRestaurantContextData>({})

export const RestaurantsContextProvider = (props) => {
    const [restaurants, setRestaurants] = useState<IRestaurant[]>([])
    const [selectedRestaurant, setSelectedRestaurant] = useState<IRestaurant>()

    const addRestaurants = (restaurant: IRestaurant) => {
        setRestaurants([...restaurants, restaurant])
        console.log(restaurants)
    }

    return (
        <RestaurantsContext.Provider value={{ restaurants, setRestaurants, addRestaurants, selectedRestaurant, setSelectedRestaurant }}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}
