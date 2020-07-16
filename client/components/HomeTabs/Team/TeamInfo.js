import React, {useEffect, useState} from "react";
import AuthHead from "../../../AuthHeader";
import axios from 'axios'
import UserCard from "../../Cards/UserCard";

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
            setTeamMembers(responseArray[0].teamMembers)
            setTeamTasks(responseArray[1])
        }).catch(err => {
            console.log(err)
        })
    }, [])
    const teamMembersCards = teamMembers.map(team =>{
        const user = {firstName: team.first_name, lastName: team.last_name, username: team.username}
        return <UserCard key={teamMembers.indexOf(team)} user={user}/>
    })
    const taskCards = teamTasks.map(task => {

    })
}
export default TeamInfo