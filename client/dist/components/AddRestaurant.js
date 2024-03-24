var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState, useContext } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
const AddRestaurant = () => {
    const { addRestaurants } = useContext(RestaurantsContext);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('Price Range');
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.stopPropagation();
        try {
            const response = yield RestaurantFinder.post("/", {
                name,
                location,
                price_range: priceRange,
            });
            console.log(response.data.data.restaurant);
            console.log(response);
            if (addRestaurants) {
                addRestaurants(response.data.data.restaurant);
            }
        }
        catch (err) { }
    });
    return (React.createElement("div", { className: "mb-4" },
        React.createElement("form", { action: "" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col" },
                    React.createElement("input", { value: name, onChange: e => setName(e.target.value), type: "text", className: "form-control", placeholder: "name" })),
                React.createElement("div", { className: "col" },
                    React.createElement("input", { value: location, onChange: e => setLocation(e.target.value), type: "text", className: "form-control", placeholder: "location" })),
                React.createElement("div", { className: "col row container" },
                    React.createElement("select", { value: priceRange, onChange: e => setPriceRange(e.target.value), className: "col form-select mr-1" },
                        React.createElement("option", { disabled: true }, "Price Range"),
                        React.createElement("option", { value: "1" }, "$"),
                        React.createElement("option", { value: "2" }, "$$"),
                        React.createElement("option", { value: "3" }, "$$$"),
                        React.createElement("option", { value: "4" }, "$$$$"),
                        React.createElement("option", { value: "5" }, "$$$$$")),
                    React.createElement("button", { onClick: handleSubmit, type: "submit", className: "col-3 btn btn-primary" }, "Add"))))));
};
export default AddRestaurant;
//# sourceMappingURL=AddRestaurant.js.map