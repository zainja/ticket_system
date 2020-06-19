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
                    res.status(500)
                    return
                }
                res.send(result)
            })
    })

})

router.post("/login",  (req, res) => {
    const {userName, password} = req.body
    connection.query("SELECT * FROM users WHERE username=?", userName, (err, result) => {
        if (err){
            res.send({"code": 400, "failed": err})
        }else {
            if (result.length > 0){
                console.log(result)
                let comparison = null
                bcrypt.compare(password, result[0].encrypted_password,(err, result) =>
                {
                    if (err){
                        console.log(err)
                    }
                    if (result){
                        res.send({"code": 200, "success": "login worked" })
                    }else {
                        res.send({"code": 204, "success": "wrong password"})
                    }
                })
            }else {
                res.send({"code": 206, "success": "user not found"})
            }
        }
    })
})

module.exports = router