require('dotenv').config()
const express = require('express')
const db = require('./db')
const morgan = require('morgan')
const app = express()

app.use(express.json())


//Get all
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("select * from restaurants")
        console.log(results)
        res.status(200).json({
           status: "success",
           results: results.rows.length,
           data: {
               restaurants: results.rows,
           }
        })
    } catch {

    }
})

//Get a
app.get("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const results = await db.query(
            `select * from restaurants where id = $1`,
            [req.params.id]
        )

        res.status(200).json({
            status: "sucess",
            results: {
                restaurant: results.rows[0]
            }
        })
    } catch (err){
        console.log(err)
    }
})

//Create a
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body)

    try{
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
            [req.body.name, req.body.location, req.body.price_range]
        )
        console.log(results)
        res.status(201).json({
            status: "sucess",
            results: {
                restaurant: results.rows[0]
            }
        })
    } catch {

    }
})

//Update
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        )
        res.status(200).json({
            status: "sucess",
            results: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
    console.log(req.params)
    console.log(req.body)
})


//Delete
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = db.query(
            "DELETE FROM restaurants where id = $1",
            [req.params.id]
        )
        res.status(204).json({
            status: "sucess",
        })

    } catch (err) {
        console.log(err)
    }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`)
})