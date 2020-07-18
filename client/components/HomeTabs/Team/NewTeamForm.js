import React,{useState} from "react";
import styles from "../../../styles/stylesheet";
import axios from 'axios'
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import {selectToken} from "../../../features/tokenSlice";
import AuthHead from "../../../AuthHeader";
const NewTeamForm = (props) => {
    const selector = useSelector(selectToken)
    const [teamName, setTeamName] = useState("")
    const [err, setErr] = useState("")
    const submit = () => {
        axios.post("http://localhost/team/create", {
            teamName: teamName
        }, AuthHead(selector.token))
            .then(res => res.data)
            .catch(err => setErr("Couldn't post team") )
        props.onSubmit()
    }
    return (
        <View style={styles.form}>
                <Text>{err}</Text>
                <Text style={styles.label}>Team Name</Text>
                <TextInput style={styles.input}
                           placeholder="Enter team name"
                           onChangeText={text => setTeamName(text)}
                           value={username}/>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={submit}>
                    <Text style={styles.LoginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
    )
}
export default NewTeamForm