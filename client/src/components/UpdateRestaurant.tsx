import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'

type UpdateRestaurantProps = {
    (props: (name: string, location: string, price_range: number) => JSX.Element): JSX.Element; 
}

interface UpdateRestaurantId {
    id: string,
}
// what is typescript type for navigate?
// type Navigate = 

type ResponseResults = {
    data: {
      results: {
        restaurant: {
          id: number,
          name: string,
          location: string,
          price_range: number,
          average_rating: number,
          count: number,
        },
        reviews: Array<{
          id: number,
          restaurant_id: number,
          name: string,
          review: string,
          rating: number,
        }>
      }
    }
    
  }
// How to set types for useState?


const UpdateRestaurant:UpdateRestaurantProps = (props) => {
    const {id}:UpdateRestaurantId = useParams()
    let navigate = useNavigate()
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('')
    
    useEffect(() => {
        const fetchData = async() => {
            const response:ResponseResults = await RestaurantFinder.get(`/${id}`)
            console.log(response.data.results.restaurant)
            setName(response.data.results.restaurant.name)
            setLocation(response.data.results.restaurant.location)
            setPriceRange(response.data.results.restaurant.price_range)
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        })
        console.log(updatedRestaurant)
        navigate('/')
    }

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
        </div>
  )
}

export default UpdateRestaurant