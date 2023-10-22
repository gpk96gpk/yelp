import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import { ResponseUpdateResults } from '../types/restaurant'

// function that handles the update page
function UpdateRestaurant(): React.ReactElement {
    let navigate = useNavigate()
    // gets the id from the url
    const { id } = useParams<{id: string}>()
    // sets the name, location, and price range of the restaurant
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    // creates a useEffect hook to fetch the data from the api when id changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: ResponseUpdateResults = await RestaurantFinder.get(`/${id}`)
                console.log(response.data.data.restaurant)
                setName(response.data.data.restaurant.name)
                setLocation(response.data.data.restaurant.location)
                setPriceRange(response.data.data.restaurant.price_range)
            } catch (err) {
                console.log('Error while getting restaurants', err);
                setErrorMsg('Data not available');
            }
        }
        fetchData()
    }, [id])

    // function that handles the submit button. It is an async function that takes in a React MouseEvent.
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // prevents the default behavior of the event
        e.preventDefault()
        // put request to update the restaurant matching the id
        await RestaurantFinder.put(`/${id}`, {
            // variable to be passed to put request and update the restaurant
            name,
            location,
            price_range: priceRange
        })
        // navigates back to the home page
        navigate('/')
    }
    // returns the html to be rendered in update restaurant page
    return (
        <div>
            <form action="" className="form-group">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} type="text" id="location" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input value={priceRange} onChange={e => setPriceRange(e.target.value)} type="number" id="price_range" className="form-control" />
                </div>
                <button onClick={handleSubmit} className="btn mt-sm-1 btn-primary">Submit</button>
            </form>
            {errorMsg && <p className="text-danger">{errorMsg}</p>}
        </div>
    )
}
// exports the UpdateRestaurant function
export default UpdateRestaurant