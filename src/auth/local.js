const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const database = [{
    username: "AlgorithmXplorer",
    password: "89P4bL017",
    role: "admin"
}]; // datos iniciales para probar la funcionalidad

passport.use("sign-in",new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
},(req, username, password, done)=>{
    const user = database.find(user => user.username === username);
    if(!user){
        return done(null, false, req.flash("messageError", "Usuario No Encontrado"));
    }else if(user.password != password ){
        return done(null, false, req.flash("messageError", "Contraseña Incorrecta"));
    }
    done(null,user);
}));

passport.use("sign-up",new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
},(req, username, password, done)=>{
    const findUser = database.find(user => user.username === username);
    if(findUser){
        return done(null, false, req.flash("messageError", "Usuario No Disponible"));
    }
    const user = { username, password, "role": "user" };
    database.push(user);
    done(null,user);
}));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    const user = database.find(u => u.username === username);
    done(null, user);
});