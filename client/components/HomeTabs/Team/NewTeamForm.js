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
        axios.post("http://localhost:5000/team/create", {
            teamName: teamName
        }, AuthHead(selector.value))
            .then(res => setErr("Team Created"))
            .catch(err => {
                console.log(err)
                setErr("Couldn't post team")})
        // props.onSubmit()
    }
    return (
        <View style={styles.form}>
                <Text>{err}</Text>
                <Text style={styles.label}>Team Name</Text>
                <TextInput style={styles.input}
                           placeholder="Enter team name"
                           onChangeText={text => setTeamName(text)}
                           value={teamName}/>
                <TouchableOpacity
                    style={[styles.loginButton, {backgroundColor: "#4CAF50"}]}
                    onPress={submit}>
                    <Text style={styles.LoginButtonText}>Submit!</Text>
                </TouchableOpacity>
            </View>
    )
}
export default NewTeamForm