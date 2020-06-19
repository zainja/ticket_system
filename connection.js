// imports
const mysql = require('mysql')
const config =  require('./config')

// connection set up
const connection = mysql.createConnection(config)

module.exports = connection