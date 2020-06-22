require('dotenv').config()
const express = require('express')
const teamQueries = require('../query/team')
const teamMemberOperations = require('../query/teamMemberOpeartions')
const router = express.Router();
const tokenAuth = require('../tokenAuth')
router.post("/create/", tokenAuth, async (req, res) => {
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
        res.status(409).send(e)
    }

} )


router.delete("/:teamName", tokenAuth, async (req, res) =>{
    let teamName = req.params.teamName.replace("&", " ")

    try{
        await teamQueries.deleteTeam(teamName)
        res.sendStatus(200)
    }catch (e) {
        res.send(e)
    }
})
// get all teams the user created
router.get("/all", tokenAuth, async (req, res) => {
    const teamLeader = req.user
    try {
        const result = await teamQueries.getTeams(teamLeader)
        res.json({"teams": result})
    }catch (e) {
        res.status(404).send(e)
    }
})

// changing the name of a team
router.put("/:teamName", tokenAuth, async (req, res) => {
    try {
        let teamName = req.params.teamName.replace("&", " ")
        const {oldTeamName} = req.body
        await teamQueries.changeTeamName(oldTeamName, newTeamName)
        res.sendStatus(200)
    }catch (e) {
        res.send(e)
    }
})

router.put("/add-member/:teamName", tokenAuth, async (req, res) =>{
    let teamName = req.params.teamName.replace("&", " ")
    const {teamMember} = req.body
    try {
        await teamQueries.addMember(teamMember, teamName)
        res.sendStatus(200)
    }catch (e) {
        res.sendStatus(400)
    }
} )

router.get("/users/:teamName", tokenAuth, async (req, res) => {
    let teamName = req.params.teamName.replace("&", " ")
    try {
        const teamMembers = await teamQueries.getTeamMembers(teamName)
        res.send({"teamMembers": teamMembers})
    }catch (e) {
        res.sendStatus(400)
    }
})
module.exports = router