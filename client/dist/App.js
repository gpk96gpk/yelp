import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdatePage from './routes/UpdatePage';
import Home from './routes/Home';
import { RestaurantsContextProvider } from './context/RestaurantsContext';
const App = () => {
    return (React.createElement(RestaurantsContextProvider, null,
        React.createElement("div", { className: 'container' },
            React.createElement(Router, null,
                React.createElement(Routes, null,
                    React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
                    React.createElement(Route, { path: "/restaurants/:id/update", element: React.createElement(UpdatePage, null) }),
                    React.createElement(Route, { path: "/restaurants/:id", element: React.createElement(RestaurantDetailPage, null) }))))));
};
export default App;
//# sourceMappingURL=App.js.map