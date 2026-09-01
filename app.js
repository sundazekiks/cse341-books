import express from 'express'
import books from './route/book.route.js'
export const app = express()

// JSON request body middleware
app.use(express.json())

// routes
app.use("/books", books)

app.get("/", (req, res) => {
    return res.status(200).send("Server is healthy")
})

