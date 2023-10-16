import React, { useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
//import useNavigate and useParams from react-router-dom to get the id from the url and to navigate back to the home page after submitting the review
import { useNavigate, useParams } from 'react-router-dom'


//function to add a review to a restaurant
const AddReview = () => {
    //deconstructs the id from the url with type string
    const { id } = useParams<{id: string}>()
    const navigate = useNavigate()

    //creates set state hook to set the name, review text, and rating
    const [name, setName] = useState('')
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState('')


    
    //function to handle the submit button. It is async because it is sending a post request to the database we want to avoid database lag
    const handleSubmitReview = async (e: React.MouseEvent<HTMLButtonElement>) => {
        //prevents the default behavior of the event
        e.preventDefault()
        //try catch block to handle potential errors and sends a post request to the database with the name, review text, and rating.
        try {
            //creates response variable that is an axios response. It awaits the post request. The post request is sent to the base url with the id from params to addReview page.
            await RestaurantFinder.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                rating
            })
            //navigates back to the home page
            navigate(0)
        } catch (err) {
            console.log(err)
        }
    }
    //returns the html to be rendered in add review page
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

//exports AddReview component
export default AddReview