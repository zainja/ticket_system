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

// TODO[1] check to better authorize it
router.post("/delete-team", tokenAuth, async (req, res) =>{
    const {teamName} = req.body
    try{
        await teamQueries.deleteTeam(teamName)
        res.sendStatus(200)
    }catch (e) {
        res.send(e)
    }
})

router.get("/all", tokenAuth, async (req, res) => {
    const teamLeader = req.user
    try {
        const result = await teamQueries.getTeams(teamLeader)
        res.json({"teams": result})
    }catch (e) {
        res.send(e)
    }
})
router.post("/edit-name", tokenAuth, async (req, res) => {
    try {
        await teamQueries.changeTeamName(req.body)
        res.sendStatus(200)
    }catch (e) {
        res.send(e)
    }
})

module.exports = router