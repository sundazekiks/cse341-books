import { app } from "./app.js";
import { connect } from "./db/mongo.js";

const PORT = process.env["PORT"] || 5000;


async function StartServer() {
    try {
        // connect to database
        await connect()

        app.listen(PORT, () => {
            console.log(`Server running on PORT: ${PORT}`)
        })
    } catch (err) {
        console.error(`Having trouble starting server: @${err}`)
    }
}

await StartServer();