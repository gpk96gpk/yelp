import React from 'react';


interface IStarRatingParams {
    rating: number,
}

//how to bring stars type out of this function?

const StarRating = ({ rating }: IStarRatingParams) => {
    const stars: JSX.Element[] = [];

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

export default StarRating