const express = require("express")
const routes = express.Router();
const pool = require("../db/pool");
const passport = require("passport")
const bcrypt = require("bcryptjs")

routes.get("/", (req, res) => {
    console.log(req.user);
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
module.exports = routes;