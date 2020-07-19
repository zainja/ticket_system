import React, {useEffect, useState} from "react";
import AuthHead from "../../../AuthHeader";
import axios from 'axios'
import {Button, ScrollView, View} from "react-native";
import {Card, ListItem, Text} from "react-native-elements";
import {useFocusEffect} from "@react-navigation/native";

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
            console.log(err)
        })
    }, []))
    const acceptRequest = () => {
        axios.post("http://localhost:5000/user/accept", {
            teamName: teamName
        }, AuthHead(token))
            .then(res => {
                navigation.navigate("Teams")
            })
            .catch(err => console.log("Failed to join"))
    }

    const leaveTeam = () => {
        axios.all(
            [axios.post("http://localhost:5000/user/leave", {teamName: teamName},
                AuthHead(token)),
                axios.delete(`http://localhost:5000/task/userLeave/${teamName}`, AuthHead(token))])
            .then(res => {
                    console.log("eeee")
                    navigation.goBack()
                }
            ).catch(err => console.log(err.response))
    }
    const teamMemberCards = teamMembers.map(team => {
        const user = {firstName: team.first_name, lastName: team.last_name, username: team.username}
        return <ListItem
            key={teamMembers.indexOf(team)}
            title={user.firstName + " " + user.lastName}
            subtitle={user.username}
            bottomDivider
            user={user}/>
    })
    const taskCards = teamTasks.map(task => {
        return <ListItem
            key={teamTasks.indexOf(task)}
            title={task.task_name}
            subtitle={`start date: ${task.start_date} \nend date: ${task.end_date} \nstatus: ${task.status}`}
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
                </Card>
            </View>
            {status === "joined" ? <Button title="Leave the team" onPress={leaveTeam}/> : null}
        </ScrollView>
    )
}
export default TeamInfo