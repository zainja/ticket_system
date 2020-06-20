// required imports
const express = require('express')
const bcrypt = require('bcrypt')
const authentication = require('../query/authentication')
const saltRounds = 10
const router = express.Router();
const hashPassword = (password, salt) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) reject(err)
            resolve(hash)
        })
    })
}


router.get("/", (req, res) => res.send("Worked"))

router.post("/register",async (req, res) => {
    const {userName, firstName, lastName, password} = req.body
    let registerSet = {
        "username": userName,
        "first_name": firstName,
        "last_name": lastName,
        "encrypted_password": null
    }
    try {
        registerSet["encrypted_password"] = await hashPassword(password, saltRounds)
        const result = await authentication.register(registerSet)
        res.send({"code" : 200})

    }catch (e) {
        res.send({"error": 500, "r": e})
    }

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