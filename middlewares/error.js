
export class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal erver Error !!!";
    err.statusCode = parseInt( err.statusCode) || 502;

    return res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}