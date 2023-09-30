function handler(error, req, res, next){
    // console.error(error);

    if (error.isBoom){
        const { statusCode } = error.output.payload;
        return res.status(statusCode).json(error.output.payload);
    }
    const statusCode = error.statusCode ? error.statusCode : 500;
    res.status(statusCode).json({statusCode,"error":"Unknown Error","message": error.message});
}

module.exports = handler;