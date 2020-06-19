// required imports
const express = require('express')
const bcrypt = require('bcrypt')
const connection = require("../connection")

const saltRounds = 10
const router = express.Router();
// connection
const connectionWorked = connection.connect((err) => {
    return !err;

})
router.get("/", (req, res) => res.send("Worked"))

router.post("/register",(req, res) => {
    const {userName, firstName, lastName, password} = req.body
    let registerSet = {
        "username": userName,
        "first_name": firstName,
        "last_name": lastName,
        "encrypted_password": null
    }
    bcrypt.hash(password, saltRounds, (err, hash) => {
        registerSet["encrypted_password"] = hash
        connection.query("INSERT INTO users SET ?",registerSet,
            (err, result) =>{
                if (err){
                    res.send(err)
                    return
                }
                res.send(result)
            })
    })

})

module.exports = router