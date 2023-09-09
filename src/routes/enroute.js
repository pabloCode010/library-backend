const authRouter = require("./auth.routes");

function enroute(app){
    app.use("/auth", authRouter);
}

module.exports = enroute;