const mysql = require('mysql')
const connection = require('../connection')

exports.getUsers = (leader, team) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT DISTINCT username, first_name, last_name
                          FROM users
                          WHERE username NOT IN
                                (SELECT user_team.username
                                 FROM user_team
                                 WHERE user_team.teamname = ?)
                            AND username != ?`, [team, leader], (err, result) => {
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
        connection.query(`SELECT ut.username, ut.user_status, u.first_name, u.last_name, ul.latitude, ul.longitude
                          FROM user_team ut
                                   LEFT JOIN users u on ut.username = u.username
                                   LEFT JOIN user_location ul on u.username = ul.username
                          WHERE ut.teamname = ?`, [teamName], (err, result) => {
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