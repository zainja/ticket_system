const mysql = require('mysql')
const connection = require('../connection')

exports.getUsers = (leader, team) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT DISTINCT username, first_name, last_name
                          FROM users
                          WHERE username NOT IN
                        (SELECT user_team.username 
                        FROM user_team 
                        WHERE user_team.teamname=?)
                        AND username !=?`, [team, leader], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}


exports.addMember = (member, teamName) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO user_team (username, teamname, user_status) VALUES ( ? , ? , 'pending')", [member, teamName]
            , (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}

exports.getTeamMembers = (teamName) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT *
                          FROM user_team
                                   LEFT JOIN users
                                             ON user_team.username = users.username
                          WHERE teamname = ?`, [teamName], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

exports.removeMember = (teamname, member) => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE
                          FROM user_team
                          WHERE teamname = ?
                            AND username = ?`, [teamname, member], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}