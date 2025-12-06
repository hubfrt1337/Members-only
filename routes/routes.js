const express = require("express")
const routes = express.Router();
const pool = require("../db/pool");
const e = require("express");
const passport = require("passport")

routes.get("/", (req, res) => {
    res.render("homePage", { user: req.user });
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
        await pool.query("INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4)", [firstname,lastname,email,password])
        res.redirect('/')
    } catch (err) {
        return next(err)
    }
})
module.exports = routes;