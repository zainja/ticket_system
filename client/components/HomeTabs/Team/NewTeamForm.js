import React,{useState} from "react";
import styles from "../../../styles/stylesheet";
import axios from 'axios'
import {Alert, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import {selectToken} from "../../../features/tokenSlice";
import AuthHead from "../../../AuthHeader";
import API from "../../../URL";
const NewTeamForm = (props) => {
    const selector = useSelector(selectToken)
    const [teamName, setTeamName] = useState("")
    const [err, setErr] = useState("")
    const submit = () => {
        API.post("team/create", {
            teamName: teamName
        }, AuthHead(selector.value))
            .then(res => Alert.alert("Team Created", "Congrats", [{
                text: "Go Back",
                onPress: props.navigation.goBack()
            }]))
            .catch(err => {
                Alert.alert("Failed", "Team name already exists",[{
                }])})
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