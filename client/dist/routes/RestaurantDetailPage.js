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
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';
const RestaurantDetailPage = () => {
    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);
    useEffect(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield RestaurantFinder.get(`/${id}`);
                setSelectedRestaurant(response.data.results);
            }
            catch (err) {
                console.log(err);
            }
        });
        fetchData();
    }, [id, setSelectedRestaurant]);
    return (React.createElement(React.Fragment, null, selectedRestaurant && (React.createElement(React.Fragment, null,
        React.createElement("h1", { className: 'display-1 text-center text-capitalize' }, selectedRestaurant.restaurant.name),
        React.createElement("div", { className: "text-center" },
            React.createElement(StarRating, { rating: selectedRestaurant.restaurant.average_rating }),
            React.createElement("span", { className: "text-warning ml-1" }, selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : "0")),
        React.createElement("div", { className: "mt-3" },
            React.createElement(Reviews, { reviews: selectedRestaurant.reviews })),
        React.createElement(AddReview, null)))));
};
export default RestaurantDetailPage;
//# sourceMappingURL=RestaurantDetailPage.js.map