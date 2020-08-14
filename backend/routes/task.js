const express = require('express')
const router = express.Router()
const taskOperations = require('../query/task')
const tokenAuth = require('../tokenAuth')
router.post("/", tokenAuth, async (req, res) => {
    const {taskName, startDate, endDate, teamName, description} = req.body
    try {
        await taskOperations.createTask(taskName, startDate, endDate, teamName, description)
        res.send("Correct")
    } catch (e) {
        res.status(400)
        res.send({"error": e})
    }
})
router.put("/:taskID", tokenAuth, async (req, res) => {
    const taskID = req.params.taskID
    const {teamMember} = req.body
    try {
        await taskOperations.assignTask(taskID, teamMember)
        res.send("Correct")

    } catch (e) {
        res.status(400)
        res.send({"error": e})
    }
})

router.delete("/delete-user/:taskID/:username", tokenAuth, async (req, res) => {
    const {taskID, username} = req.params
    try {
        await taskOperations.deleteUserFromTask(taskID, username)
        res.send("Correct")
    } catch (e) {
        res.status(400)
        res.send({error: e})
    }
})

router.put("/status/:taskID/", tokenAuth, async (req, res) => {
    const {taskID} = req.params
    const {status} = req.body

    try {
        await taskOperations.changeTaskStatus(taskID, status)
    } catch (e) {
        res.status(400)
        res.send({error: e})
    }
})

router.get("/all/:teamname", tokenAuth, async (req, res) => {
    const {teamname} = req.params
    try {
        const tasks = await taskOperations.getTeamTasks(teamname)
        await res.json(tasks)
    } catch (e) {
        res.status(404)
        res.send({error: e})
    }
})

router.get("/open/:teamname", tokenAuth, async (req, res) => {
    const {teamname} = req.params
    try {
        const tasks = await taskOperations.getOpenTasks(teamname)
        await res.json(tasks)
    } catch (e) {
        res.status(404)
        res.send({error: e})
    }
})
router.get("/getAllTasks", tokenAuth, async (req, res) => {
    const username = req.user
    try {
        const tasks = await taskOperations.getAllUserTasks(username)
        await res.send({tasks: tasks})
    } catch (e) {
        res.status(404)
        res.send({error: e})
    }
})
router.get("/users/:taskID", tokenAuth, async (req, res) => {
    const {taskID} = req.params
    try {
        const tasks = await taskOperations.getAssignedUsersForTask(taskID)
        await res.json(tasks)
    } catch (e) {
        res.status(404)
        res.send({error: e})
    }
})
router.get("/closed/:teamname", tokenAuth, async (req, res) => {
    const {teamname} = req.params
    try {
        const tasks = await taskOperations.getClosedTasks(teamname)
        await res.json(tasks)
    } catch (e) {
        res.status(404)
        res.send({error: e})
    }
})

router.delete("/:taskID", tokenAuth, async (req, res) => {
    const {taskID} = req.params
    try {
        await taskOperations.deleteTask(taskID)
        res.send(200)
    } catch (e) {
        res.status(404)
        res.send({error: e})
    }
})
router.delete("/userLeave/:teamName", tokenAuth, async (req, res) => {
    const username = req.user
    const teamName = req.params.teamName
    try {
        await taskOperations.deleteTasksAfterLeavingTeam(username, teamName)
        res.send(200)
    } catch (e) {
        res.send(500)
    }
})

router.get(`/possibleUsers/:taskID`, tokenAuth, async (req, res) => {
    const username = req.user
    const taskID = req.params.taskID
    try {
        const users = await taskOperations.getPossibleUsersToAddForTask(username, taskID)
        res.send({users: users})
    } catch (e) {
        res.send(e)
    }
})
router.post(`/report/:taskID`, tokenAuth, async (req, res) => {
    const username = req.user
    const taskID = req.params.taskID
    const report = req.body.report
    try {
        await taskOperations.submitReport(username, taskID, report)
        await res.send("Correct")
    } catch (e) {
        res.send(e)
    }
})

router.get(`/report/:taskID`, tokenAuth, async (req, res) => {
    console.log("ee")
    try {
        console.log("ew")
        const reports = await taskOperations.getReports(req.params.taskID)
        console.log("er")
        res.send({reports: reports})
    } catch (e) {
        res.send(e)
    }
})
module.exports = router