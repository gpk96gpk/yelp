import axios from 'axios'
//axios creates a base url for us to use to not have to repeat the same url over and over again
export default axios.create({
    //uses this baseURL because all urls will start with this
    baseURL: 'http://localhost:3000/api/v1/restaurants'
})