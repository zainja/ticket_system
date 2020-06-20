require('dotenv').config()
const express = require('express')
const teamQueries = require('../query/team')
const router = express.Router();
const tokenAuth = require('../tokenAuth')
router.post("/create-team/", tokenAuth, async (req, res) => {
    const username = req.user
    const {teamName} = req.body
    const teamObj = {
        "team_name": teamName,
        "team_leader": username
    }
    try{
        await teamQueries.createTeam(teamObj)
        res.sendStatus(200)
    }catch (e) {
        res.send(e)
    }


} )

module.exports = router