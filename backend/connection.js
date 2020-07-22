// imports
const mysql = require('mysql')
require('dotenv').config()
console.log(process.env)
mysqlInfo = {
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
}
// connection set up
const connection = mysql.createConnection(mysqlInfo)
connection.connect()
module.exports = connection