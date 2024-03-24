// entry point for the server contains port

require('dotenv').config()
const path = require('path');

// express is used to create the server and manage requests
const express = require('express')
// cors is used to allow cross origin resource sharing to prevent cors errors
const cors = require('cors')
// db is used to send queries to the postgresql database
const db = require('./db')
// morgan is used to log requests but isn't being used in test version of app
const morgan = require('morgan')
const app = express()

app.use(cors())
app.use(express.json())

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });


// Get all
// get request to get all restaurants from the database
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("select * from restaurants")
        const restaurantsRatingData = await db.query(
            // parameterized query to prevent sql injection
            "SELECT * FROM restaurants LEFT JOIN ( SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id ) reviews ON restaurants.id = reviews.restaurant_id;")

        res.status(200).json({
            status: "success",
            results: restaurantsRatingData.rows.length,
            data: {
                restaurants: restaurantsRatingData.rows,
            },
        })
    } catch {

    }
})

// Get a
// get request to get a specific restaurant from the database
app.get("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const restaurant = await db.query(
            `SELECT * FROM restaurants LEFT JOIN ( SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id ) reviews ON restaurants.id = reviews.restaurant_id where id = $1`,
            [req.params.id]
        )

        const reviews = await db.query(
            `select * from reviews where restaurant_id = $1`,
            [req.params.id]
        )

        res.status(200).json({
            status: "success",
            results: {
                restaurant: restaurant.rows[0].length,
                reviews: reviews.rows.length
            },
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// Create a
// post request to create a restaurant in the database
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body)

    try {
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
            [req.body.name, req.body.location, req.body.price_range]
        )
        console.log(results)
        res.status(201).json({
            status: "success",
            results: results.rows[0].length,
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {

    }
})

// Update
// put request to update a restaurant in the database
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        )
        res.status(200).json({
            status: "success",
            results: results.rows[0].length,
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
        //response status and response buddy
        res.status(400).json({
            status: "error",
            message: "There was an error updating the restaurant"
        })
    }
    console.log(req.params);
    console.log(req.body);
})


// Delete
// delete request to delete a restaurant in the database
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query(
            "DELETE FROM restaurants where id = $1",
            [req.params.id]
        )
        res.status(200).json({
            status: "success",
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "error",
            message: "There was an error deleting the restaurant"
        })
    }
})


// Add Review
// post request to add a review to a restaurant in the database
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {

    try {
        const newReview = await db.query(
            'INSERT INTO reviews (name, review, rating, restaurant_id) values($1, $2, $3, $4) returning *;',
            [req.body.name, req.body.review, req.body.rating, req.params.id]
        )
        res.status(201).json({
            status: "success",
            results: newReview.rows.length,
            data: {
                review: newReview.rows[0],
            },

        })
    } catch (err) {
        console.log(err)
    }
})

// response for default route to prevent errors
app.get("/", async (req, res) => {
    res.status(200).json({ status: 'success'})
});

// process.env.PORT is used to get the port from the .env file 
// or 3001 if it doesn't exist
const PORT = process.env.PORT || 3001
// app.listen is used to start the server on the port from the .env file
app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`)
})