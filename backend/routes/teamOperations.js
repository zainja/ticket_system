require('dotenv').config()
const express = require('express')
const teamMemberOperations = require('../query/teamMemberOpeartions')
const router = express.Router();
const tokenAuth = require('../tokenAuth')

// get possible people to add to the team
router.get("/:teamName", tokenAuth, async (req, res) =>{
    let teamName = req.params.teamName.replace("&", " ")
    const username = req.user
    try {
        const users = await teamMemberOperations.getUsers(username, teamName)
        res.send({users: users})
    }catch (e) {
        res.sendStatus(400)
    }
})
// add team member
router.put("/:teamName", tokenAuth, async (req, res) =>{
    let teamName = req.params.teamName.replace("&", " ")
    const {teamMember} = req.body
    try {
        await teamMemberOperations.addMember(teamMember, teamName)
        res.sendStatus(200)
    }catch (e) {
        res.sendStatus(400)
    }
} )
router.post("/delete-member/:teamName", tokenAuth, async (req, res) => {
    let teamName = req.params.teamName.replace(/&/g, " ")
    const {teamMember} = req.body
    try {
        await teamMemberOperations.removeMember(teamName, teamMember)
        res.send("Correct")
    }catch (e) {
        res.status(400)
        res.send({error: e})
    }
})

router.get("/users/:teamName", tokenAuth, async (req, res) => {
    let teamName = req.params.teamName.replace("&", " ")
    try {
        const teamMembers = await teamMemberOperations.getTeamMembers(teamName)
        res.send({"teamMembers": teamMembers})
    }catch (e) {
        res.sendStatus(400)
    }
})

module.exports = router