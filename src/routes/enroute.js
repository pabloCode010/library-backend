const authRouter = require("./auth.routes");
//booksFiles
const booksRouter = require("./books.routes");

function enroute(app){
    app.use("/auth", authRouter);
    app.use("/books", booksRouter);
}

module.exports = enroute;