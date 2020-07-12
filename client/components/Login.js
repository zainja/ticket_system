import React, {useState} from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import styles from "../styles/stylesheet";
import axios from 'axios'

const {storeItem} = require("../dataManagement");

const Login = (props) => {
    const {navigation} = props
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const submit = () => {
        if (username !== "" && password !== ""){
            const details = {userName: username, password: password}
            axios.post("http://localhost:5000/auth/login", details)
                .then(res => res.data)
                .then(data => {
                    storeItem(data.accessToken, "TOKEN").then(r => navigation.replace("Splash"))
                }).catch(err => setErr("Incorrect username or password"))
        }
    }
    return (
        <View style={{flex: 2, alignItems: "stretch"}}>
            <View style={styles.form}>
                <Text>{err}</Text>
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input}
                           placeholder="Enter User Name"
                           onChangeText={text => setUsername(text)}
                           value={username}/>
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input}
                           secureTextEntry={true}
                           placeholder="Enter Password"
                           onChangeText={text => setPassword(text)}
                           value={password}
                />
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={submit}>
                    <Text style={styles.LoginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={{padding: 20, alignItems: "center"}}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Register")
                    }}
                >
                    <Text style={{fontSize: 15, color: "grey"}}>
                        Don't have an account? Register
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Login