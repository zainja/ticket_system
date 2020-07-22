const connection = require('../connection')
require('dotenv').config()

exports.acceptRequest = (username, team ) => {
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

exports.leaveTeam = (username, team_name) => {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM user_team WHERE username = ? AND teamname = ?",
            [username, team_name],(err, result) => {
                if(err) reject(err)
                resolve(result)
            })
    })
}

exports.getAllTeamsUserIn = (userName) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT teamname, user_status FROM user_team WHERE username = ?", [userName], (err, result) =>
        {
            if (err) reject(err)
            resolve(result)
        })
    })
}