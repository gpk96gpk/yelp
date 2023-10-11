import React, { useState, useContext } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext)
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('Price Range')

    const handleSubmit = async (e) => {
        e.stopPropagation();
        try {
          const response = await RestaurantFinder.post("/", {
            name,
            location,
            price_range: priceRange,
          });
          console.log(response.data.data.restaurant)
          console.log(response)
          addRestaurants(response.data.data.restaurant)
        } catch (err) {}
      }
    return (
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

export default AddRestaurant