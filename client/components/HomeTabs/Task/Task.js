import React, {useEffect, useState} from "react";
import {Alert, Button, ScrollView, View} from "react-native";
import {Card, ListItem, Text} from "react-native-elements";
import axios from 'axios'
import {useSelector} from "react-redux";
import {selectName} from "../../../features/userSlice";
import AuthHead from "../../../AuthHeader";
import {selectToken} from "../../../features/tokenSlice";
import Icon from "react-native-vector-icons/MaterialIcons"
import {useFocusEffect} from "@react-navigation/native";

const Task = ({route, navigation}) => {
    const selector = useSelector(selectName)
    const tokenSelector = useSelector(selectToken)
    const {task, status} = route.params
    const [assignedUsers, setAssignedUsers] = useState([])
    const [taskReports, setTaskReports] = useState([])
    const deleteUser = (username) => {
        axios.delete(`http://localhost:5000/task/delete-user/${task.task_id}/${username}`,
            AuthHead(tokenSelector.value)).then(res => {
            Alert.alert("", "Removed user")
        }).catch(err => {
            Alert.alert("Error", "Failed to remove user")
        })
        setAssignedUsers((prevState) => prevState.filter(user => user.username !== username))

    }
    useFocusEffect(React.useCallback(() => {
        console.log(AuthHead(tokenSelector.value))
        axios.all([
            axios.get(`http://localhost:5000/task/users/${task.task_id}`, AuthHead(tokenSelector.value)),
            axios.get(`http://localhost:5000/task/report/${task.task_id}`, AuthHead(tokenSelector.value))
        ]).then(resArray => {
            console.log("resArray")
            setAssignedUsers(resArray[0].data)
            setTaskReports(resArray[1].data.reports)

        }).catch(err => Alert.alert("Error", "Fetch error"))
    }, []))

    let isUserAssignedToTask = () => {
        assignedUsers.forEach(user => {

            if (user.username == selector.username) {
                return true
            }
        })
        return false
    }
    const taskReportsList = taskReports.map(report => {
        return (<ListItem key={taskReports.indexOf(report)}
                          title={"Author" + " " + report.author}
                          rightTitle={"Date" + " " + report.date}
                          subtitle={"description" + " " + report.report}
        />)
    })
    const assignedUsersList = assignedUsers.map((user) => {
        return (
            <ListItem
                key={assignedUsers.indexOf(user)}
                title={user.first_name + " " + user.last_name}
                subtitle={user.username}
                rightIcon={
                    status === "owner" ?
                        <Icon name="delete"
                              color="red"
                              size={30}
                              onPress={() => {
                                  deleteUser(user.username)
                              }}/>
                        : null
                }
            />)
    })
    return (
        <ScrollView style={{flexDirection: "column"}}>
            <View style={{paddingLeft: 16, marginTop: 10, flexDirection: "column"}}>
                <Text h2>
                    {task.task_name}
                </Text>
                <Text>
                    start date: {new Date(task.start_date).toLocaleString()}
                </Text>
                <Text>
                    end date: {new Date(task.end_date).toLocaleString()}
                </Text>

            </View>
            <Card title="Description">
                <Text style={{fontSize: 17}}>
                    {task.description}
                </Text>
            </Card>
            <Card
                title="Assigned Users">
                {assignedUsersList}

            </Card>
            <View style={{
                padding: 15, alignSelf: "center", flexGrow: 1,
                flexDirection: "column"
            }}>
                {(status === "owner" && task.status === "open") ?
                    <Button title="Assign users to task" onPress={() => {
                        navigation.navigate("Assign Task", {taskID: task.task_id})
                    }}/> :
                    <Button title="Report on task"
                            onPress={() => {
                                if (isUserAssignedToTask()) {
                                    navigation.navigate("Report on Task", {taskID: task.task_id})
                                }else{
                                    alert("You are not assigned to task")
                                }
                            }}/>
                }
            </View>
            <View style={{padding: 15, marginTop: 10, marginBottom: 10}}>
                <Card>
                    {taskReportsList}
                </Card>
            </View>
        </ScrollView>
    )
}
export default Task