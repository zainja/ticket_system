const mysql = require('mysql')
const connection = require('../connection')
// connection.connect((err) => {
//     if (err) console.log(err)
// })
// FROM THE team leader
// TODO[2] search how to make a search query
exports.searchUser = (name) => {
    return new Promise((resolve, reject) =>
        connection.query("SELECT username from users Where first_name = ? OR last_name = ?", name, (err, result) =>{
            if (err) reject(err)
            resolve(result)
        })
    )
}


exports.getUsers = (leader, team) => {
    return new Promise( (resolve, reject) => {
        connection.query("SELECT users.username From users LEFT JOIN user_team ON users.username = user_team.username AND user_team.teamname != ? WHERE users.username != ?",[team, leader], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}