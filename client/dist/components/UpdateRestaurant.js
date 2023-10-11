var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
const UpdateRestaurant = (props) => {
    const { id } = useParams();
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');
    useEffect(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield RestaurantFinder.get(`/${id}`);
            console.log(response.data.results.restaurant);
            setName(response.data.results.restaurant.name);
            setLocation(response.data.results.restaurant.location);
            setPriceRange(response.data.results.restaurant.price_range);
        });
        fetchData();
    }, [id]);
    //add typescript to the event handler
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const updatedRestaurant = yield RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        });
        console.log(updatedRestaurant);
        navigate('/');
    });
    return (React.createElement("div", null,
        React.createElement("form", { action: "", className: "form-group" },
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "name" }, "Name"),
                React.createElement("input", { value: name, onChange: e => setName(e.target.value), type: "text", id: "name", className: "form-control" })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "location" }, "Location"),
                React.createElement("input", { value: location, onChange: e => setLocation(e.target.value), type: "text", id: "location", className: "form-control" })),
            React.createElement("div", { className: "form-group" },
                React.createElement("label", { htmlFor: "price_range" }, "Price Range"),
                React.createElement("input", { value: priceRange, onChange: e => setPriceRange(e.target.value), type: "number", id: "price_range", className: "form-control" })),
            React.createElement("button", { onClick: handleSubmit, className: "btn mt-sm-1 btn-primary" }, "Submit"))));
};
export default UpdateRestaurant;
//# sourceMappingURL=UpdateRestaurant.js.map