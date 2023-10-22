import React, { useState, createContext } from 'react'
import { IRestaurant, IRestaurantContextData, ISetSelectedResponseResults } from '../types/restaurant'

// creates and exports RestaurantsContext
export const RestaurantsContext = createContext<IRestaurantContextData>({
    // sets default value for context as function returning values from set state function
    setRestaurants: function (value: React.SetStateAction<IRestaurant[]>): void {
        throw new Error('Function not implemented.')
    }
})

// creates and exports RestaurantsContextProvider that takes in props
export const RestaurantsContextProvider = (props: { children: React.ReactElement }) => {
    // sets restaurants and selectedRestaurant to useState
    const [restaurants, setRestaurants] = useState<IRestaurant[]>([])
    const [selectedRestaurant, setSelectedRestaurant] = useState<ISetSelectedResponseResults>()
    // creates a function that takes in a restaurant and adds it to the restaurants array
    const addRestaurants = (restaurant: IRestaurant) => {
        setRestaurants([...restaurants, restaurant])
    }
    // returns context that will create value of restaurants, setRestaurants, addRestaurants, 
    // selectedRestaurant, and setSelectedRestaurant
    return (
        <RestaurantsContext.Provider value={{ restaurants, setRestaurants, addRestaurants, selectedRestaurant, setSelectedRestaurant }}>
            {/* renders the children of the RestaurantsContextProvider */}
            {props.children}
        </RestaurantsContext.Provider>
    )
}
