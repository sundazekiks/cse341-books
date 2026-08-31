import express from 'express'

export const app = express()

// JSON request body middleware
app.use(express.json())

app.get("/", (req, res) => {
    return res.status(200).send("Server is healthy")
})

