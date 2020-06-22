const express= require('express')
const router = express.Router()
const taskOperations = require('../query/task')
const tokenAuth = require('../tokenAuth')
router.post("/", tokenAuth, async (req, res) => {
    const {task_name, start_date, end_date, teamname} = req.body
    try {
        await taskOperations.createTask(task_name, start_date, end_date, teamname)
    }catch (e) {
        res.status(400)
        res.send({"error": e})
    }
})

router.put("/:taskID", tokenAuth, async (req, res) => {
    const taskID = req.params.taskID
    const {username} = req.body
    try {
        await taskOperations.assignTask(taskID, username)
    }catch (e) {
        res.status(400)
        res.send({"error": e})
    }
})

router.delete("/delete-user/:taskID/:username", tokenAuth, async (req, res) =>{
    const {taskID, username} = req.params
    try {
        await taskOperations.deleteUserFromTask(taskID, username)
    }catch (e) {
        res.status(400)
        res.send({error: e})
    }
})

router.put("/status/:taskID/", tokenAuth, async (req, res) =>{
    const {taskID} = req.params
    const {status} = req.body

    try {
        await taskOperations.changeTaskStatus(taskID, status)
    }catch (e) {
        res.status(400)
        res.send({error: e})
    }
})

router.get("/all/:teamname", tokenAuth, async (req, res) => {
    const {teamname} = req.params
    try {
        const tasks = await taskOperations.getTeamTasks(teamname)
        await res.json(tasks)
    }catch (e) {
        res.status(404)
        res.send({error: e})
    }
})

router.get("/open/:teamname", tokenAuth, async (req, res) => {
    const {teamname} = req.params
    try {
        const tasks = await taskOperations.getOpenTasks(teamname)
        await res.json(tasks)
    }catch (e) {
        res.status(404)
        res.send({error: e})
    }
})
router.get("/:username", tokenAuth, async (req, res) => {
    const {username} = req.params
    try {
        const tasks = await taskOperations.getAllUserTasks(username)
        await res.json(tasks)
    }catch (e) {
        res.status(404)
        res.send({error: e})
    }
})
router.get("/users/:taskID", tokenAuth, async (req, res) => {
    const {taskID} = req.params
    try {
        const tasks = await taskOperations.getAssignedUsersForTask(teamname)
        await res.json(tasks)
    }catch (e) {
        res.status(404)
        res.send({error: e})
    }
})
router.get("/closed/:teamname", tokenAuth, async (req, res) => {
    const {teamname} = req.params
    try {
        const tasks = await taskOperations.getClosedTasks(teamname)
        await res.json(tasks)
    }catch (e) {
        res.status(404)
        res.send({error: e})
    }
})

router.delete("/:taskID", tokenAuth, async (req, res) => {
    const {taskID} = req.params
    try {
        await taskOperations.deleteTask(teamname)
    }catch (e) {
        res.status(404)
        res.send({error: e})
    }
})

module.exports = router