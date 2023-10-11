import React, { useState, createContext } from 'react'

export const RestaurantsContext = createContext()

export const RestaurantsContextProvider = (props) => {
    const [restaurants, setRestaurants] = useState([])
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)

    const addRestaurants = (restaurant) => {
        setRestaurants([...restaurants, restaurant]) 
        console.log(restaurants)
    }

    return (
        <RestaurantsContext.Provider value={{restaurants, setRestaurants, addRestaurants, selectedRestaurant, setSelectedRestaurant}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}
// create a context that takes in props for RestaurantsContext

// export function Restaurants ({ children }){
//     const [restaurants, setRestaurants] = useState([])

//     return (
//         <RestaurantsContext.Provider value={{restaurants, setRestaurants}}>
//             {children}
//         </RestaurantsContext.Provider>
//     )
// }