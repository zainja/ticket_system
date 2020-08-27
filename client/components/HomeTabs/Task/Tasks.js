import React, {useState} from "react";
import {View, Text, Alert} from "react-native";
import {Card, ListItem} from "react-native-elements";
import {useFocusEffect} from "@react-navigation/native";
import axios from 'axios'
import AuthHead from "../../../AuthHeader";
import {useSelector} from "react-redux";
import {selectToken} from "../../../features/tokenSlice";
import API from "../../../URL";
import {useInterval} from "../../../hooks/useInterval";

const {getJSON} = require("../../../dataManagement");
const Tasks = ({navigation}) => {
    const selector = useSelector(selectToken)
    const [tasks, setTasks] = useState([])
    useInterval(() => {
            API.get("task/getAllTasks", AuthHead(selector.value))
                .then(res => {
                    return res.data
                })
                .then(data => setTasks(data.tasks))
                .catch(err => Alert.alert("Error", "Couldn't load tasks"))
        }
        , 1000)

    const taskCards = tasks.map(task => {
        const startDate = new Date(task.start_date)
        const endDate = new Date(task.end_date)
        const startDateFormat = `${startDate.toLocaleString()}`
        const endDateFormat = `${endDate.toLocaleString()}`
        return <ListItem
            key={tasks.indexOf(task)}
            title={task.task_name}
            onPress={() => {
                navigation.navigate("Task", {task: task, status: "member"})
            }
            }
            subtitle={`start date: ${startDateFormat} \nend date: ${endDateFormat} \nstatus: ${task.status}`}
        />
    })
    return (
        <View>
            <Card title="Tasks from all teams">
                {taskCards}
            </Card>
        </View>
    )
}
export default Tasks