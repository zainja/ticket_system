import React, {useState} from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import styles from "../styles/stylesheet";

const Login = (props) => {
    const {navigation} = props
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const submit = () => {
    }
    return (
        <View style={{flex: 2, alignItems: "stretch"}}>
            <View style={styles.form}>
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input}
                           placeholder="Enter User Name"
                           onChange={text => setUsername(text)}
                           value={username}/>
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input}
                           secureTextEntry={true}
                           placeholder="Enter Password"
                           onChange={text => setPassword(text)}
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