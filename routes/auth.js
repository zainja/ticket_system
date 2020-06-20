// required imports
require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const authentication = require('../query/authentication')
const jwt = require('jsonwebtoken')
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
const comparePasswords = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if(err) reject(err)
            resolve(result)
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
        const token = jwt.sign(userName, process.env.ACCESS_TOKEN_SECRET)
        res.send({accessToken: token})

    }catch (e) {
        res.send({"error": 500, "r": e})
    }

})

router.post("/login",  async (req, res) => {
    const {userName, password} = req.body
    try {
        const result = await authentication.login(userName)
        if (result.length > 0){
            if(await comparePasswords(password, result[0].encrypted_password)){
                const token = jwt.sign(userName, process.env.ACCESS_TOKEN_SECRET)
                res.json({accessToken: token})
            }else {
                res.send({"code": 206, "result": "incorrect password"})
            }
        }
        else {
            res.send("user not found")
        }
    }catch (e) {
        res.code(500)
    }


})

module.exports = router