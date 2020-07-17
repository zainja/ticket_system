import React, {useEffect, useState} from "react";
import AuthHead from "../../../AuthHeader";
import axios from 'axios'
import UserCard from "../../Cards/UserCard";
import {ScrollView, View} from "react-native";
import {Text} from "react-native-elements";

const TeamInfo = ({route}) => {
    const {teamName, token} = route.params
    const [teamMembers, setTeamMembers] = useState([])
    const [teamTasks, setTeamTasks] = useState([])

    useEffect(() => {
        const teamToSend = teamName.replace(/ /g, '&')
        axios.all([
                axios.get(`http://localhost:5000/team-users/users/${teamToSend}`, AuthHead(token)),
                axios.get(`http://localhost:5000/task/all/${teamToSend}`, AuthHead(token))
            ]
        ).then(responseArray => {
            setTeamMembers(responseArray[0].data.teamMembers)
            setTeamTasks(responseArray[1])
        }).catch(err => {
            console.log(err)
        })
    }, [])
    const teamMemberCards = teamMembers.map(team => {
        const user = {firstName: team.first_name, lastName: team.last_name, username: team.username}
        return <UserCard key={teamMembers.indexOf(team)} user={user}/>})
    return(
        <View>
            <Text h2>{teamName}</Text>
            <ScrollView>
                {teamMemberCards}
            </ScrollView>
        </View>
    )
}
export default TeamInfo