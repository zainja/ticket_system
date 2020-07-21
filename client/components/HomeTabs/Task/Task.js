import React, {useEffect, useState} from "react";
import {Button, View} from "react-native";
import {Card, ListItem, Text} from "react-native-elements";
import axios from 'axios'
import {useSelector} from "react-redux";
import {selectName} from "../../../features/userSlice";
import AuthHead from "../../../AuthHeader";
import {selectToken} from "../../../features/tokenSlice";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/MaterialIcons"

const Task = ({route, navigation}) => {
    const selector = useSelector(selectName)
    const tokenSelector = useSelector(selectToken)
    const {task, status} = route.params
    const [assignedUsers, setAssignedUsers] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:5000/task/users/${task.task_id}`, AuthHead(tokenSelector.value))
            .then(res => res.data)
            .then(data => {
                setAssignedUsers(data)
            })
    }, [])

    let isUserAssignedToTask = () => {
        assignedUsers.forEach(user => {
            if (user.username === selector.userName)
                return true
        })
        return false
    }
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
                              }}/>
                        : null
                }
            />)
    })
    return (
        <View>
            <Card>
                {assignedUsersList}
            </Card>
        </View>
    )
}
export default Task