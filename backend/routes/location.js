const express = require('express');
const location = require('../query/location')
const authToken = require('../tokenAuth')
const router = express.Router()

router.post('/',authToken, async (req, res) => {
    const {latitude, longitude} = req.body
    const user = req.user
    try {
        await location.setUserLocation(user, longitude, latitude)
        res.send("correct")
    }catch (e) {
        res.send(e)
    }
})

router.get('/:username', authToken, async (req, res) => {
    const username = req.params.username
    try {
        const location = location.getUserLocation(username)
        res.send({location: location})
    }catch (e) {
        res.send(e)
    }
})
router.put('/update', authToken, async (req, res) => {
    const {latitude, longitude} = req.body
    const user = req.user
    try {
        await location.updateLocation(user, longitude, latitude)
        res.send("correct")
    }catch (e) {
        res.send(e)
    }
})