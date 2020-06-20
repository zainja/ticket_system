const mysql = require('mysql')
const connection = require('../connection')
connection.connect()

exports.getUser = (name) => {
    return new Promise((resolve, reject) =>
        connection.query("SELECT username from users Where first_name = ? OR last_name = ?", name, (err, result) =>{
            if (err) reject(err)
            resolve(result)
        })
    )
}

exports.getUsers = (leader, team) => {
    return new Promise( (resolve, reject) => {
        connection.query("SELECT username From users" +
            " LEFT JOIN user_team ON users.username = test.user_team.username\n" +
            "AND user_team.teamname != ? WHERE test.users.username != ?",[team, leader], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}