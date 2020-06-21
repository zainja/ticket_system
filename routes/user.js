require('dotenv').config()
const express = require('express')
const router = express.Router();
const tokenAuth = require('../tokenAuth')
const userOperations = require('../query/userTeamOperations')

router.post("/accept", tokenAuth, async (req, res) =>{
    const username = req.user
    const {teamName} = req.body
    try {
        await  userOperations.acceptRequest(username, teamName)
    }catch (e) {
        res.sendStatus(500)
    }
}
)

router.get("/pending-teams", tokenAuth, async (req, res) => {
    const username = req.user
    try {
        const teams = await userOperations.getAllPendingRequests(username)
        res.send({teams: teams})
    }catch (e) {
        res.sendStatus(400)
    }
})

router.post("/leave", tokenAuth, async (req, res) =>{
    const username = req.user
    const {teamName} = req.body
    try {
        await leaveTeam(username, teamName)
    }catch (e) {
        res.send(400)
    }

})

router.get("/all", tokenAuth, async (req, res) =>{
    const username = req.body
    try {
        const teams = getAllTeamsUserIn(username)
        res.send({teams: teams})
    }catch (e) {
        res.send(500)
    }
})




module.exports = router