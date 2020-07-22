const connection = require('../connection')
require('dotenv').config()


exports.createTeam = (teamObj) => {

    return new Promise((resolve, reject) => {

        connection.query("INSERT INTO team SET ?", teamObj,(err, result) =>{
            if (err) reject(err)
            resolve(result)
        } )
    })
}

exports.getTeamsUserCreated = (creatorUsername) => {
    return new Promise((resolve, reject) => {

        connection.query("SELECT team_name FROM team WHERE team_leader = ?", [creatorUsername], (err, result) =>{
            if (err) reject(err)
            resolve(result)
        })
    })
}
exports.changeTeamName = (oldTeamName, newTeamName) =>{
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE team SET team_name = ? Where team_name = ?`, [newTeamName, oldTeamName],(err, result) =>{
            if (err) reject(err)
            resolve(result)
        } )
    })
}
exports.deleteTeam = (teamName) => {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM team WHERE team_name = ?", [teamName], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}