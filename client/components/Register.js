import React, {useState} from 'react'
import {View, Text, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native'
import styles from "../styles/stylesheet";
import axios from 'axios';

const {storeItem} = require("../dataManagement");

const Register = ({navigation}) => {
    const [err, setErr] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const submit = () => {
        if (password !== confirmPassword) {
            setErr("Password and confirm don't match")
        } else {
            axios.post("http://localhost:5000/auth/register", {
                userName: username,
                firstName: firstName,
                lastName: lastName,
                password: password
            }).then(res => res.data)
                .then(data =>
                    storeItem(data.accessToken, "TOKEN").then(r => {
                            navigator.geolocation.getCurrentPosition((location) => {
                                axios.post('http://localhost:5000/location/', {
                                    username: username,
                                    longitude: location.coords.longitude,
                                    latitude: location.coords.latitude
                                }).then(res => {
                                    navigation.replace("Splash")
                                }).catch(err => {
                                    console.log(err)
                                    Alert.alert("Error", "Network Error")
                                })
                            }, err => {
                                Alert.alert("Error", "Failed to get location")
                            })
                        }
                    )
                )
                .catch(err => {
                    Alert.alert("Error", "Try again")
                })
        }
    }
    return (
        <ScrollView>
            <View style={{flex: 2, alignItems: "stretch"}}>
                <View style={styles.form}>
                    <Text>{err}</Text>

                    <Text style={styles.label}>First Name</Text>
                    <TextInput style={styles.input}
                               placeholder="Enter First Name"
                               onChangeText={text => setFirstName(text)}
                               value={firstName}/>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput style={styles.input}
                               placeholder="Enter Last Name"
                               onChangeText={text => setLastName(text)}
                               value={lastName}/>
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
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={styles.input}
                               secureTextEntry={true}
                               placeholder="Confirm Password"
                               onChangeText={text => setConfirmPassword(text)}
                               value={confirmPassword}
                    />
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={submit}>
                        <Text style={styles.LoginButtonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
export default Register