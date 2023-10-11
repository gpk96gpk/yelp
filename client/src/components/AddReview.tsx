import React, { useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

interface IParamId {
    id: string,
}



const AddReview = () => {
    const { id }:IParamId =  useParams()
    const navigate = useNavigate()
    // console.log(id)

    const [name, setName] = useState('')
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState('')


    //how to add typescript to the promise?
    
    const handleSubmitReview = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            // how to write typescript for this?

            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                rating
            })
            console.log(response)
            navigate(0)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='mb-2'>
            <form action="">
                <div className="row">
                    <div className="form-group col">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} type="text" name="" id="name" className="form-control" />
                    </div>
                    <div className="form-group col">
                        <label htmlFor="rating">Rating</label>
                        <select value={rating} onChange={e => setRating(e.target.value)} id="id" className="form-select w-100">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} id="Review" className='form-control'></textarea>
                </div>
                <button onClick={handleSubmitReview} className="mt-2 btn btn-primary">Submit</button>
            </form>
        </div>
  )
}

export default AddReview