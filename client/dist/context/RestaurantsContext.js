import React, { useState, createContext } from 'react';
export const RestaurantsContext = createContext({});
export const RestaurantsContextProvider = (props) => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState();
    const addRestaurants = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);
        console.log(restaurants);
    };
    return (React.createElement(RestaurantsContext.Provider, { value: { restaurants, setRestaurants, addRestaurants, selectedRestaurant, setSelectedRestaurant } }, props.children));
};
//# sourceMappingURL=RestaurantsContext.js.map