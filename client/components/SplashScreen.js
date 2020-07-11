import React, {useEffect, useState} from 'react'
import {View, Text} from 'react-native'
import styles from "../styles/stylesheet";
import AsyncStorage from "@react-native-community/async-storage";

const SplashScreen = (props) => {
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await AsyncStorage.getItem('TOKEN');
                if (token === null) {
                    console.log(token)
                    return Promise.resolve(false)
                } else {
                    return Promise.resolve(true)
                }
            } catch (e) {
                throw e
            }
        }
        setTimeout(() => {
            fetchToken().then(r => {
                if (r) {
                    props.navigation.replace("Main")
                } else {
                    props.navigation.replace("Login")
                }
            })

        }, 1500)


    }, [])
    return (
        <View style={[styles.container, styles.splash]}>
            <Text style={styles.splashFont}>Ticket System</Text>
        </View>
    )
}
export default SplashScreen