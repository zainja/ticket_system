import React, {useEffect, useState} from 'react'
import {View, Text} from 'react-native'
import styles from "../styles/stylesheet";
import AsyncStorage from "@react-native-community/async-storage";
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
                ],).then(result => {
                    console.log(result.data)
                    result.data
                })
                    .then(data => {
                        storeJSON("HomeItems", data)
                        props.navigation.replace("Main")

                    }).catch(err => throw "error")
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