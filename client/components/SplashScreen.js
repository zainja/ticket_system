import React, {useEffect, useState} from 'react'
import {View, Text} from 'react-native'
import styles from "../styles/stylesheet";
import axios from 'axios'
import AuthHead from "../AuthHeader";
import {getItem} from "../dataManagement"

const {storeJSON} = require("../dataManagement");

const SplashScreen = (props) => {
    const [homeData, setHomeData] = useState({})
    useEffect(() => {
        getItem("TOKEN").then(
            token => {
                axios.all([
                    axios.get('http://localhost:5000/user/all', AuthHead(token)),
                    axios.get('http://localhost:5000/task/getAllTasks', AuthHead(token)),
                    axios.get('http://localhost:5000/team/all', AuthHead(token))
                ],).then(result => {
                    console.log(result[0].data)
                    storeJSON("Teams", result[0].data)
                    storeJSON("Tasks", result[1].data)
                    storeJSON("CreatedTeams", result[2].data)
                    props.navigation.replace("Main",{token: token})
                }).catch(err => console.log(err))
            }
        ).catch(err => props.navigation.replace("Login"))
    }, [])
    return (
        <View style={[styles.container, styles.splash]}>
            <Text style={styles.splashFont}>Ticket System</Text>
        </View>
    )
}
export default SplashScreen