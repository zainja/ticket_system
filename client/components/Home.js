import React from 'react'
import {View, Text} from 'react-native'
import styles from "../styles/stylesheet";
import {StatusBar} from 'expo-status-bar';

const Home = () => {
    return (
        <View
            style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto"/>
        </View>
    )
}
export default Home