import { MongoError } from "mongodb"

export const NormalizeError = (err) => {
    if (err instanceof MongoError) {
        return {
            message: err.errmsg,
            statusCode: 400
        }
    }
    return { message: "Internal server error", statusCode: 500 }
}