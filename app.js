import express from 'express'
import books from './route/book.route.js'
export const app = express()
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };


// JSON request body middleware
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use("/books", books)

app.get("/", (req, res) => {
    return res.status(200).send("Server is healthy")
})

