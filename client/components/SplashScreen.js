import React, {useEffect, useState} from 'react'
import {View, Text} from 'react-native'
import styles from "../styles/stylesheet";
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios'
import AuthHead from "../AuthHeader";

const SplashScreen = (props) => {
    const [homeData, setHomeData] = useState({})
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await AsyncStorage.getItem('TOKEN')
                if (token === null) {
                    console.log(token)
                    return Promise.reject("No token")
                } else {
                    return Promise.resolve(token)
                }
            } catch (e) {
                throw e
            }
        }
        fetchToken().then(token => {
            console.log(token)
            axios.all([
                axios.get('http://localhost:5000/user/all', AuthHead(token)),
            ],).then(responseArr => {
                setHomeData({
                    team: responseArr[0].data,
                })
                props.navigation.replace("Main", homeData)

            }).catch(err => console.log(err))
        }).catch(err => props.navigation.replace("Login"))


    }, [])
    return (
        <View style={[styles.container, styles.splash]}>
            <Text style={styles.splashFont}>Ticket System</Text>
        </View>
    )
}
export default SplashScreen