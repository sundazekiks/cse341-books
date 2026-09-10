import { MongoError } from "mongodb"
import { AppError } from "./custom_error.js"

export const NormalizeError = (err) => {
    if (err instanceof AppError) return err.getErrRes()

    if (err instanceof MongoError) {
        return {
            message: err.errmsg,
            code: 400
        }
    }
    return { message: "Internal server error", code: 500, addtional: err }
}