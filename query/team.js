const mysql = require('mysql')
const connection = require('../connection')
require('dotenv').config()
connection.connect((err) => {
    if (err) console.log("error")
})

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

        connection.query("SELECT team_name FROM team WHERE team_leader=?", creatorUsername, (err, result) =>{
            if (err) reject(err)
            resolve(result)
        })
    })
}
exports.changeTeamName = (teamInfo) =>{
    const {oldTeamName, newTeamName} = teamInfo
    return new Promise((resolve, reject) => {
        connection.query("UPDATE team SET team_name=? Where team_name=oldTeamName", newTeamName,(err, result) =>{
            if (err) reject(err)
            resolve(result)
        } )
    })
}
exports.deleteTeam = (teamName) => {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM team WHERE team_name=?", teamName, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

exports.addMember = (member, teamName) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO user_team (username, team_name, user_status) VALUES (?,?, pending)", [teamName, member]
            ,(err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}
