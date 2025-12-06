const express = require("express")
const routes = express.Router();


routes.get("/", (req, res) => {
    res.render("homepage")
})

module.exports = routes