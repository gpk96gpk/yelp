import React from 'react'
import UpdateRestaurant from '../components/UpdateRestaurant'
//functional component for update page
const UpdatePage = () => {
  return (
    //renders the update restaurant component
    <div>
      <h1 className='text-center'>Update Restaurant</h1>
      <UpdateRestaurant />
    </div>
  )
}
//exports the UpdatePage component
export default UpdatePage