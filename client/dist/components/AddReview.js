var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useNavigate, useParams } from 'react-router-dom';
const AddReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // console.log(id)
    const [name, setName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState('');
    //how to add typescript to the promise?
    const handleSubmitReview = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            // how to write typescript for this?
            const response = yield RestaurantFinder.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                rating
            });
            console.log(response);
            navigate(0);
        }
        catch (err) {
            console.log(err);
        }
    });
    return (React.createElement("div", { className: 'mb-2' },
        React.createElement("form", { action: "" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "form-group col" },
                    React.createElement("label", { htmlFor: "name" }, "Name"),
                    React.createElement("input", { value: name, onChange: e => setName(e.target.value), type: "text", name: "", id: "name", className: "form-control" })),
                React.createElement("div", { className: "form-group col" },
                    React.createElement("label", { htmlFor: "rating" }, "Rating"),
                    React.createElement("select", { value: rating, onChange: e => setRating(e.target.value), id: "id", className: "form-select w-100" },
                        React.createElement("option", { disabled: true }, "Rating"),
                        React.createElement("option", { value: "1" }, "1"),
                        React.createElement("option", { value: "2" }, "2"),
                        React.createElement("option", { value: "3" }, "3"),
                        React.createElement("option", { value: "4" }, "4"),
                        React.createElement("option", { value: "5" }, "5")))),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "Review" }, "Review"),
                React.createElement("textarea", { value: reviewText, onChange: e => setReviewText(e.target.value), id: "Review", className: 'form-control' })),
            React.createElement("button", { onClick: handleSubmitReview, className: "mt-2 btn btn-primary" }, "Submit"))));
};
export default AddReview;
//# sourceMappingURL=AddReview.js.map