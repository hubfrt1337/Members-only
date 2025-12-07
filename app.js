const express = require('express');
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const bcrypt = require("bcryptjs")
const pool = require("./db/pool");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config()
const routes = require("./routes/routes")




// Use email as the usernameField since signup stores an email
passport.use(new LocalStrategy({ usernameField: 'email' }, async function verify(email, password, done) {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = rows[0];
        if (!user) {
            return done(null, false, { message: "Incorrect email" });
        }

        const match = await bcrypt.compare(password, user.password_hash);
        
        if(!match){
             return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser(async (userId, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
        const user = rows[0];
        return done(null, user);
    } catch (err) {
        return done(err);
    }
})

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set("view engine", "ejs")

app.use(session({
    store: new pgSession({
        pool: pool,
        tablename: "session"
    }),
    secret: "key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxage: 30 * 24 * 60 * 60 * 1000
    }

}));
// Initialize Passport and restore authentication state, if any.
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.user = req.user;
    next()
})




app.use(routes)
app.listen(3000)

