import React, {useEffect, useState} from 'react'
import {View, Text, Alert} from 'react-native'
import styles from "../styles/stylesheet";
import axios from 'axios'
import AuthHead from "../AuthHeader";
import {getItem} from "../dataManagement"
import {useDispatch} from "react-redux";
import {addToken} from "../features/tokenSlice";
import {setName} from "../features/userSlice";


const SplashScreen = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        getItem("TOKEN").then(
            token => {
                axios.get("http:localhost:5000/user/", AuthHead(token))
                    .then(result => result.data)
                    .then(data => {
                        dispatch(addToken({value: token}))
                        const user = {
                            firstName: data.user.first_name,
                            lastName: data.user.last_name,
                            userName: data.user.username
                        }
                        dispatch(setName(user))
                        axios.get('http://localhost:5000')
                        props.navigation.replace("Main")
                    }).catch(err => {Alert.alert("Fetch Error","Retry again")})
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