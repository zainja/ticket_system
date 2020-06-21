const mysql = require('mysql')
const connection = require('../connection')
require('dotenv').config()
connection.connect((err) => {
    if (err) console.log("error")
})

exports.changeStatus = (username, team ) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE user_team SET user_status = 'accepted' WHERE username = ? AND teamname = ?",
            [username, team], (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}
exports.getAllPendingRequests = (username) => {
    return new Promise(((resolve, reject) => {
        connection.query("SELECT teamname FROM user_team WHERE username = ? AND user_status='pending'",
            [username],(err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    }))
}