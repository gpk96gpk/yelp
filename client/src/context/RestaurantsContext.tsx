import React, { useState, createContext } from 'react'
import { IRestaurant, IRestaurantContextData } from '../types/restaurant'

//creates and exports RestaurantsContext
export const RestaurantsContext = createContext<IRestaurantContextData>({})

//creates and exports RestaurantsContextProvider that takes in props
export const RestaurantsContextProvider = (props) => {
    //sets restaurants and selectedRestaurant to useState
    const [restaurants, setRestaurants] = useState<IRestaurant[]>([])
    const [selectedRestaurant, setSelectedRestaurant] = useState<IRestaurant>()
    //creates a function that takes in a restaurant and adds it to the restaurants array
    const addRestaurants = (restaurant: IRestaurant) => {
        setRestaurants([...restaurants, restaurant])
    }
    //returns RestaurantsContext.Provider with value of restaurants, setRestaurants, addRestaurants, selectedRestaurant, and setSelectedRestaurant
    return (
        <RestaurantsContext.Provider value={{ restaurants, setRestaurants, addRestaurants, selectedRestaurant, setSelectedRestaurant }}>
            {/* renders the children of the RestaurantsContextProvider */}
            {props.children}
        </RestaurantsContext.Provider>
    )
}
