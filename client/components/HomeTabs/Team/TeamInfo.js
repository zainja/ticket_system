import React, {useEffect, useState} from "react";
import AuthHead from "../../../AuthHeader";
import axios from 'axios'
import {Alert, Button, ScrollView, View} from "react-native";
import {Card, ListItem, Text} from "react-native-elements";
import {useFocusEffect} from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const TeamInfo = ({route, navigation}) => {
    const {teamName, token, status} = route.params
    const [teamMembers, setTeamMembers] = useState([])
    const [teamTasks, setTeamTasks] = useState([])
    useFocusEffect(React.useCallback(() => {
        const teamToSend = teamName.replace(/ /g, '&')
        axios.all([
                axios.get(`http://localhost:5000/team-users/users/${teamToSend}`, AuthHead(token)),
                axios.get(`http://localhost:5000/task/all/${teamToSend}`, AuthHead(token))
            ]
        ).then(responseArray => {
            setTeamMembers(responseArray[0].data.teamMembers)
            setTeamTasks(responseArray[1].data)
        }).catch(err => {
            Alert.alert("Fetch Error", "Couldn't Connect to server",
                [
                    {
                        text: "Go back",
                        onPress: () => {
                            navigation.goBack()
                        }
                    }
                ])
        })
    }, []))
    const acceptRequest = () => {
        axios.post("http://localhost:5000/user/accept", {
            teamName: teamName
        }, AuthHead(token))
            .then(res => {
                navigation.navigate("Teams")
            })
            .catch(err => Alert.alert("Error", "Failed to join team"))
    }

    const leaveTeam = () => {
        axios.all(
            [axios.post("http://localhost:5000/user/leave", {teamName: teamName},
                AuthHead(token)),
                axios.delete(`http://localhost:5000/task/userLeave/${teamName}`, AuthHead(token))])
            .then(res => {
                    navigation.goBack()
                }
            ).catch(err => Alert.alert("Error","Failed to leave"))
    }

    const deleteTeam = () => {
        const teamToBeDeleted = teamName.replace(/ /g, "&")
        Alert.alert(`Delete Team ${teamName}`,
            "If you delete the team members will be sacked automatically, Tasks will be discarded",
            [
                {
                    text: "Confirm",
                    onPress: () => {
                        axios.delete(`http://localhost:5000/team/${teamToBeDeleted}`, AuthHead(token))
                            .then(res => navigation.goBack())
                            .catch(err => Alert.alert("Failed to delete", "Try later"))
                    }
                }, {
                text: "Cancel",
                style: "cancel"
            }])
    }

    const deleteMember = (teamMember) => {
        const deleteMemberTeam = teamName.replace(/ /g, "&")
        axios.all(
            [axios.post(`http://localhost:5000/team-users/delete-member/${deleteMemberTeam}`,
                {teamMember: teamMember}, AuthHead(token)),
                axios.delete(`http://localhost:5000/task/userLeave/${teamName}`, AuthHead(token))])
            .then(res => {
                Alert.alert("", "user deleted")
            })
            .catch(err => {
                Alert.alert("Error", "user cannot be deleted")
            })
        teamMembers.filter(member => member.username !== teamMember)
    }
    const teamMemberCards = teamMembers.map(member => {
        const user = {firstName: member.first_name,
            lastName: member.last_name,
            username: member.username, userStatus: member.user_status,
            longitude: member.longitude !== null ? member.longitude : 0,
            latitude: member.latitude !== null ? member.latitude : 0,
        }
        return <ListItem
            key={teamMembers.indexOf(member)}
            title={user.firstName + " " + user.lastName}
            subtitle={user.username}
            rightTitle={user.userStatus}
            rightIcon={
                status === "owner" ?
                    <Icon name="delete"
                          color="red"
                          size={30}
                          onPress={() => {
                              deleteMember(user.username)
                          }}/>
                    : null
            }
            onPress={() => {
                navigation.navigate("Map",{
                    teamMember: user.firstName + " " + user.lastName,
                    longitude: user.longitude,
                    latitude: user.latitude
                })
            }}
            bottomDivider
        />
    })
    const taskCards = teamTasks.map(task => {
        const startDate = new Date(task.start_date)
        const endDate = new Date(task.end_date)
        const startDateFormat = `${startDate.toLocaleString()}`
        const endDateFormat = `${endDate.toLocaleString()}`
        return <ListItem
            key={teamTasks.indexOf(task)}
            title={task.task_name}
            onPress={() => {
                navigation.navigate("Task", {task: task, status: status})
                }
            }
            subtitle={`start date: ${startDateFormat} \nend date: ${endDateFormat} \nstatus: ${task.status}`}
        />
    })
    const pendingTeam =
        <View style={{flexDirection: "column"}}>
            <View style={{flexDirection: "row", justifyContent: "center", marginBottom: 10}}>
                <Text style={{fontWeight: "bold"}}> You are not part of the team accept or reject the offer</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "stretch"}}>
                <Button title="Accept" onPress={acceptRequest}/>
                <Button title="Reject" onPress={leaveTeam}/>
            </View>
        </View>
    return (
        <ScrollView>
            <View style={{padding: 20}}>
                <Text h2>{teamName}</Text>
            </View>
            {status === "pending" ? pendingTeam : null}
            <Card title="Team Members">
                <ScrollView>
                    {teamMemberCards}
                </ScrollView>
                {status === "owner" ? <Button title="Add Members" onPress={
                    () => {
                        navigation.navigate("Add Team Member", {
                            teamName: teamName
                        })
                    }
                }/> : null}
            </Card>
            <View style={{paddingBottom: 10}}>
                <Card title="tasks">
                    <ScrollView>
                        {taskCards}
                    </ScrollView>
                    {status === "owner" ? <Button title="Add Task" onPress={
                        () => {
                            navigation.navigate("Add Task", {
                                teamName: teamName
                            })
                        }
                    }/> : null}
                </Card>
            </View>
            {status === "joined" ? <Button title="Leave the team" onPress={leaveTeam}/> : null}
            {status === "owner" ? <Button title={"Delete Team"} onPress={deleteTeam}/> : null}
        </ScrollView>
    )
}
export default TeamInfo