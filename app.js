const express = require('express');
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const crypto = require("crypto");
const { Pool } = require("pg");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config()
const routes = require("./routes/routes")


const pool = new Pool({
    host: "localhost",
    user: "Dell",
    password: "NaZ1337",
    database: "members_only",
    port: 5432
})

passport.use(new LocalStrategy(async function verify(username, password, done) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username])
    const user = rows[0]
    try {
        if (!user) {
            return done(null, false, { message: "incorrect username" })
        }
        if (user.password !== password) {
            return done(null, false, { message: "incorect password" })
        }
        return done(null, user)

    } catch (err) {
        return done(err)
    }
}));


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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


app.use(routes)
app.listen(3000)

