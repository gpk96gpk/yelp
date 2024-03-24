//imports react methods and useState and useContext hooks from react
import React, { useState, useContext } from 'react'
//imports axios from restaurant finder to have base url
import RestaurantFinder from '../apis/RestaurantFinder'
//imports RestaurantsContext the context can pass logic down to children in order to avoid prop drilling
import { RestaurantsContext } from '../context/RestaurantsContext'
//imports the types to used in this component
import { IAddRestaurantProps, IAddRestaurantResponseResults } from '../types/restaurant'

//JSX element that adds restaurant with name location and price range to the database and restaurant list
const AddRestaurant = () => {
    //deconstructs addRestaurants from the context and adds the props types
    const { addRestaurants }: IAddRestaurantProps = useContext(RestaurantsContext)
    //sets state for name and adds string inference type to useState. Use state default value is an 
    //empty string
    const [name, setName] = useState<string>('')
    //sets state for location. Uses state default value is an empty string
    const [location, setLocation] = useState('')
    //sets state for price range. Uses state default value is an empty string
    const [priceRange, setPriceRange] = useState('Price Range')

    //function that handles the submit button. It is an async function that takes in a React MouseEvent.
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        //prevents the default behavior of the event
        e.stopPropagation();
        //try catch block to handle potential errors and sends a post request to the database 
        //with the name, location, and price range.
        try {
            //creates response variable that is an axios response with the type of 
            //IAddRestaurantResponseResults. It awaits the post request. The post request is sent to the base url with the name, location, and price range.
            const response: IAddRestaurantResponseResults = await RestaurantFinder.post("/", {
                //variable to be passed to post request
                name,
                location,
                price_range: priceRange,
            });
            //checks if addRestaurants is defined before executing the function
            if (addRestaurants) {
                addRestaurants(response.data.data.restaurant)
            }
        } catch (err) { }
    }
    return (
        //html to be rendered when restaurant is added
        <div className="mb-4">
            <form action="">
                <div className="row">
                    <div className="col">
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="name"
                        />
                    </div>
                    <div className="col">
                        <input
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="location"
                        />
                    </div>
                    <div className="col row container">
                        <select
                            value={priceRange}
                            onChange={e => setPriceRange(e.target.value)}
                            className="col form-select mr-1"
                        >
                            <option disabled >Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="col-3 btn btn-primary"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

//exports AddRestaurant to be used in other components
export default AddRestaurant