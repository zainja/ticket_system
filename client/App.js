import {StatusBar} from 'expo-status-bar';
import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import styles from "./styles/stylesheet";
import SplashScreen from "./components/SplashScreen"
export default function App() {
    const [loading, setLoading] = useState(true)
    const [isUser, setIsUser] = useState(false)
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await AsyncStorage.getItem('TOKEN');
                if (token === null) {
                    setIsUser(false)
                }else {
                    setIsUser(true)
                }
            } catch (e) {
                setLoading(true)
            }
        }
        setTimeout(() => setLoading(false),2000)
        fetchToken()

    }, [])
    if (loading) {
        return <SplashScreen/>
    }
    return (
        <View
            style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto"/>
        </View>
    );
}

