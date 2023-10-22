import React from 'react'
import StarRating from './StarRating'
import { IReview } from '../types/restaurant'

// JSX element to show reviews deconstructs reviews from props
const Reviews: IReview = ({ reviews }) => {
    // return a div with a map function that maps over reviews and returns a div with a card for each review
    return (
        <div className='row row-cols-3 mb-2'>
            {reviews.map((review) => {
                return (
                    <div key={review.id} className="card text-white bg-primary mb-3 mr-4" style={{ maxWidth: '30%' }}>
                        <div className="card-header d-flex justify-content-between">
                            <span>{review.name}</span>
                            <span><StarRating rating={review.rating} /></span>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{review.review}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
// exports Reviews
export default Reviews