require('dotenv').config()
const express = require('express')
const teamMemberOperations = require('../query/teamMemberOpeartions')
const router = express.Router();
const tokenAuth = require('../tokenAuth')

router.post("/get-all-users", tokenAuth, async (req, res) =>{
    const {teamName} = req.body
    const username = req.user
    try {
        const users = await teamMemberOperations.getUsers(username, teamName)
        res.send({users: users})
    }catch (e) {
        res.sendStatus(400)
    }
})
module.exports = router