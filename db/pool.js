const {Pool} = require("pg")

module.exports = new Pool({
    host: "localhost",
    user: "Dell",
    database: "members_only",
    password: "NaZ1337",
    port: 5432
})