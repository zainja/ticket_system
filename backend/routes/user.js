require('dotenv').config()
const express = require('express')
const router = express.Router();
const tokenAuth = require('../tokenAuth')
const userOperations = require('../query/userTeamOperations')
const {leaveTeam} = require("../query/userTeamOperations");
const {getAllTeamsUserIn} = require("../query/userTeamOperations");
const {login} = require("../query/authentication")
router.post("/accept", tokenAuth, async (req, res) =>{
    const username = req.user
    const {teamName} = req.body
    try {
        await userOperations.acceptRequest(username, teamName)
        res.send(200)
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
        res.send("left")
    }catch (e) {
        res.send(400)
    }

})

router.get("/all", tokenAuth, async (req, res) =>{
    const username = req.user
    try {
        const teams = await getAllTeamsUserIn(username)
        res.send({teams: teams})
    }catch (e) {
        res.status(404).send(e)
    }
})
router.get('/', tokenAuth, async (req, res) => {
    const username = req.user
    try{
        const user = await login(username)
        await res.send({user: user[0]})
    }catch (e) {
        res.status(404).send(e)
    }
})



module.exports = router