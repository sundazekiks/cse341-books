export class AppError extends Error {
    message;
    code;


    constructor(_message, _code,) {
        super(_message)

        this.code = _code
        this.message = _message
    }

    getErrRes() {
        return {
            message: this.message,
            code: this.code
        };
    }
}