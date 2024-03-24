var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useContext, useEffect } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
const RestaurantList = (props) => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    let navigate = useNavigate();
    useEffect(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield RestaurantFinder.get('/');
                console.log(response.data.data.restaurants);
                setRestaurants(response.data.data.restaurants);
            }
            catch (err) { }
        });
        fetchData();
    }, []);
    const handleDelete = (e, id) => __awaiter(void 0, void 0, void 0, function* () {
        e.stopPropagation();
        try {
            //const response = await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id;
            }));
        }
        catch (err) {
            console.log(err);
        }
    });
    const handleUpdate = (e, id) => {
        e.stopPropagation();
        navigate(`/restaurants/${id}/update`, { state: { id } });
    };
    const handleRestaurantSelect = (id) => {
        navigate(`/restaurants/${id}`, { state: { id } });
    };
    const renderRating = (restaurant) => {
        if (!restaurant.count) {
            return React.createElement("span", { className: "text-warning" }, "0 reviews");
        }
        return (React.createElement(React.Fragment, null,
            React.createElement(StarRating, { rating: restaurant.id }),
            React.createElement("span", { className: "text-warning ml-1" },
                "(",
                restaurant.count,
                ")")));
    };
    return (React.createElement("div", { className: "list-group" },
        React.createElement("table", { className: "table table-hover table-dark" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { className: "bg-primary", scope: 'col' }, "Restaurant"),
                    React.createElement("th", { className: "bg-primary", scope: 'col' }, "Location"),
                    React.createElement("th", { className: "bg-primary", scope: 'col' }, "Price Range"),
                    React.createElement("th", { className: "bg-primary", scope: 'col' }, "Ratings"),
                    React.createElement("th", { className: "bg-primary", scope: 'col' }, "Edit"),
                    React.createElement("th", { className: "bg-primary", scope: 'col' }, "Delete"))),
            React.createElement("tbody", null, restaurants && restaurants.map((restaurant) => {
                return (React.createElement("tr", { onClick: () => handleRestaurantSelect(restaurant.id), key: restaurant.id },
                    React.createElement("td", null, restaurant.name),
                    React.createElement("td", null, restaurant.location),
                    React.createElement("td", null, '$'.repeat(restaurant.price_range)),
                    React.createElement("td", null, renderRating(restaurant)),
                    React.createElement("td", null,
                        React.createElement("button", { onClick: (e) => handleUpdate(e, restaurant.id), className: "btn btn-warning" }, "Update"),
                        " "),
                    React.createElement("td", null,
                        React.createElement("button", { onClick: (e) => handleDelete(e, restaurant.id), className: "btn btn-danger" }, "Delete"))));
            })))));
};
export default RestaurantList;
//# sourceMappingURL=RestaurantList.js.map