import React from 'react'
import StarRating from './StarRating'

interface IReview {
    ({ reviews }: { reviews: Array<{
        id: number,
        restaurant_id: number,
        name: string,
        review: string,
        rating: number,
    }> }): JSX.Element;
}

const Reviews:IReview = ({ reviews }) => {
  return (
    <div className='row row-cols-3 mb-2'>
        {reviews.map((review) => {
            return (
                <div key={review.id} className="card text-white bg-primary mb-3 mr-4" style={{maxWidth: '30%'}}>
                    <div className="card-header d-flex justify-content-between">
                        <span>{review.name}</span>
                        <span><StarRating rating={review.rating}/></span>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{review.review}</p>
                    </div>
                </div>
            )
        })}
        {/* <div className="card text-white bg-primary mb-3 mr-4" style={{maxWidth: '30%'}}>
            <div className="card-header d-flex justify-content-between">
                <span>JOAN</span>
                <span><StarRating rating={3}/></span>
            </div>
            <div className="card-body">
                <p className="card-text">What fun lil time we had</p>
            </div>
        </div>
        <div className="card text-white bg-primary mb-3 mr-4" style={{maxWidth: '30%'}}>
            <div className="card-header d-flex justify-content-between">
                <span>JOAN</span>
                <span><StarRating rating={3}/></span>
            </div>
            <div className="card-body">
                <p className="card-text">What fun lil time we had</p>
            </div>
        </div>
        <div className="card text-white bg-primary mb-3 mr-4" style={{maxWidth: '30%'}}>
            <div className="card-header d-flex justify-content-between">
                <span>JOAN</span>
                <span><StarRating rating={3}/></span>
            </div>
            <div className="card-body">
                <p className="card-text">What fun lil time we had</p>
            </div>
        </div> */}
    </div>
  )
}

export default Reviews