import React from 'react';
import { IStarRatingParams } from '../types/restaurant';

// creates StarRating component deconstructs rating as parameter
const StarRating = ({ rating }: IStarRatingParams) => {
    // creates an empty JSX element array stars
    const stars: JSX.Element[] = [];
    // for loop that loops through 5 times checking if i is less than or equal to rating
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<i key={i} className="fa-solid fa-star text-warning"></i>)
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<i key={i} className="fa-solid fa-star-half-stroke text-warning"></i>)
        } else {
            stars.push(<i key={i} className="fa-regular fa-star text-warning"></i>)
        }
    }
    return (
        <>
            {stars}
        </>
    )
}
// exports StarRating
export default StarRating