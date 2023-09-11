export const notFound = (req: any, res: any, next: any) => {
    const error = new Error(`404 Not Found - ${req.originalUrl}`);
    res.status(404);

    console.error(error);
    next(error);
};

export const castErrorHandler = (err: any, req: any, res: any) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Resource not found.";
    }

    console.error(err);

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};