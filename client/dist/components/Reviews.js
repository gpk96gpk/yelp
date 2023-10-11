import React from 'react';
import StarRating from './StarRating';
const Reviews = ({ reviews }) => {
    return (React.createElement("div", { className: 'row row-cols-3 mb-2' }, reviews.map((review) => {
        return (React.createElement("div", { key: review.id, className: "card text-white bg-primary mb-3 mr-4", style: { maxWidth: '30%' } },
            React.createElement("div", { className: "card-header d-flex justify-content-between" },
                React.createElement("span", null, review.name),
                React.createElement("span", null,
                    React.createElement(StarRating, { rating: review.rating }))),
            React.createElement("div", { className: "card-body" },
                React.createElement("p", { className: "card-text" }, review.review))));
    })));
};
export default Reviews;
//# sourceMappingURL=Reviews.js.map