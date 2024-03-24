import React from 'react';
//how to bring stars type out of this function?
const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(React.createElement("i", { key: i, className: "fa-solid fa-star text-warning" }));
        }
        else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(React.createElement("i", { key: i, className: "fa-solid fa-star-half-stroke text-warning" }));
        }
        else {
            stars.push(React.createElement("i", { key: i, className: "fa-regular fa-star text-warning" }));
        }
    }
    return (React.createElement(React.Fragment, null, stars));
};
export default StarRating;
//# sourceMappingURL=StarRating.js.map