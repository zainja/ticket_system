import React, {useEffect, useState} from 'react'
import {View, Text} from 'react-native'
import styles from "../styles/stylesheet";
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios'
import AuthHead from "../AuthHeader";
import {getItem} from "../dataManagement"
import {useDispatch} from "react-redux";
import {addToken} from "../features/tokenSlice";

const {storeJSON} = require("../dataManagement");

const SplashScreen = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        getItem("TOKEN").then(
            token => {
                console.log(token)
                axios.all([
                    axios.get('http://localhost:5000/user/all', AuthHead(token)),
                    axios.get('http://localhost:5000/task/getAllTasks', AuthHead(token)),
                    axios.get('http://localhost:5000/team/all', AuthHead(token))
                ],).then(result => {
                    storeJSON("Teams", result[0].data)
                    storeJSON("Tasks", result[1].data)
                    storeJSON("CreatedTeams", result[2].data)
                    dispatch(addToken({value: token}))
                    props.navigation.replace("Main")
                }).catch(err => props.navigation.replace("Login"))
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