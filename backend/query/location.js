const connection = require('../connection')
require('dotenv').config()

exports.getUserLocation = (username) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT *
                          FROM user_location
                          WHERE username = ?`, [username], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}
exports.setUserLocation = (username, longitude, latitude) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO user_location (username, longitude, latitude)
                          VALUES (?, ?, ?)`,
            [username, longitude, latitude], (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}

exports.updateLocation = (username, longitude, latitude) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE user_location 
                                SET longitude=?, latitude=? 
                                WHERE username = ?`,
            [longitude, latitude, username],(err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}