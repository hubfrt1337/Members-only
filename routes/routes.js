const express = require("express")
const routes = express.Router();
const pool = require("../db/pool");
const passport = require("passport")
const bcrypt = require("bcryptjs")

routes.get("/", async (req, res) => {
    console.log(req.user);
    const {rows} = await pool.query("SELECT users.first_name, users.last_name, messages.title, messages.body, messages.created_at FROM users INNER JOIN messages ON users.id = messages.user_id")
    console.log(rows)
    res.render("homePage", { user: req.user, message: rows });
})

routes.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
}));

routes.get("/signup", (req, res) => {
    res.render("signup")
})


routes.post("/signup" , async (req, res, next) => {
    try {
        const {firstname, lastname, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        await pool.query("INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4)", [firstname,lastname,email,hashedPassword])
        res.redirect('/')
    } catch (err) {
        return next(err)
    }
})

routes.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err){
        return next(err)
    }
    res.redirect("/")
    });
    
})

routes.post("/add-msg", async (req, res, next) => {
    try {
        const {userId, title, body} = req.body;
        await pool.query("INSERT INTO messages (user_id, title, body) VALUES ($1, $2, $3)", [userId, title, body])
        res.redirect("/");
    } catch (err) {
        return next(err)
    }
})
module.exports = routes;