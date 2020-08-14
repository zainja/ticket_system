import React,{useState} from "react";
import {Button, View, Text, TextInput, Alert} from "react-native";
import styles from "../../../styles/stylesheet";
import axios from "axios"
import AuthHead from "../../../AuthHeader";
import {useSelector} from "react-redux";
import {selectToken} from "../../../features/tokenSlice";
import API from "../../../URL";
const ReportOnTask = ({navigation, route}) => {
    const [report, setReport] = useState("")
    const selector = useSelector(selectToken)
    const submitReport = () => {
        if (report === ""){
            Alert.alert("Error", "Cannot send an empty report")
            return
        }
        API.post(`task/report/${route.params.taskID}`,{
            report: report
        },AuthHead(selector.value))
            .then(res => Alert.alert("","report submitted"))
            .catch(err => Alert.alert("Error", "Report couldn't submit"))
    }
    return (
        <View style={{flexDirection: "column", alignItems: "stretch", justifyContent: "center", padding: 20}}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>
                Write Report
            </Text>
             <TextInput style={[styles.input, {height: "85%", marginTop: 10, marginBottom: 10}]}
                        multiline
                        scrollEnabled
                        textAlignVertical="top"
                        numberOfLines={20}
                        onChangeText={text => setReport(text)}
                        value={report}
                        placeholder="Submit report"
             />
            <Button title="Submit" onPress={submitReport}/>
        </View>
    )
}
export default ReportOnTask