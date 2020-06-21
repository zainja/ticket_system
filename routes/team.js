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
        res.send({"code": 200, "error" : e})
    }


} )

// TODO[1] check to better authorize it
router.post("/delete-team", tokenAuth, async (req, res) =>{
    const {teamName} = req.body
    try{
        await teamQueries.deleteTeam(teamName)
        res.sendStatus(200)
    }catch (e) {
        res.send({"code": 200, "error" : e})
    }
})
// get all teams the user created
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
        const {oldTeamName, newTeamName} = req.body
        await teamQueries.changeTeamName(oldTeamName, newTeamName)
        res.sendStatus(200)
    }catch (e) {
        res.send(e)
    }
})

router.post("/add-member", tokenAuth, async (req, res) =>{
    const {teamName, teamMember} = req.body
    try {
        await teamQueries.addMember(teamMember, teamName)
        res.sendStatus(200)
    }catch (e) {
        res.send(e)
    }
} )

router.post("/get-members", tokenAuth, async (req, res) => {
    const {teamName} = req.body
    try {
        const teamMembers = await teamQueries.getTeamMembers(teamName)
        res.send({"teamMembers": teamMembers})
    }catch (e) {
        res.sendStatus(500)
    }
})
module.exports = router