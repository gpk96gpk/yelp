import React from 'react'
import Header from '../components/Header'
import AddRestaurant from '../components/AddRestaurant'
import RestaurantList from '../components/RestaurantList'
// functional component for home page
export function Home() {
  // returns header, add restaurant inputs, and list of all restaurants to be rendered
  return (
    <div>
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>)

}
// exports the Home component
export default Home