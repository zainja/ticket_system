const connection = require('../connection')
require('dotenv').config()
// connection.connect((err) => {
//     if (err) console.log("error")
// })

exports.createTeam = (teamObj) => {

    return new Promise((resolve, reject) => {

        connection.query("INSERT INTO team SET ?", teamObj,(err, result) =>{
            if (err) reject(err)
            resolve(result)
        } )
    })
}

exports.getTeams = (creatorUsername) => {
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

exports.addMember = (member, teamName) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO user_team (username, teamname, user_status) VALUES ( ? , ? , 'pending')", [member, teamName]
            ,(err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}

exports.getTeamMembers = (teamName) =>{
    return new Promise((resolve, reject) => {
        connection.query("SELECT username FROM user_team WHERE teamname = ?", [teamName], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}