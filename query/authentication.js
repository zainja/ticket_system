const mysql = require('mysql')
const connection = require('../connection')

connection.connect((err) => {
    console.log(err)
})
exports.register = (usersSet) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO USERS SET ?",
            usersSet,(err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}

exports.login = (userInfo) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM users WHERE username=?", userInfo,
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}