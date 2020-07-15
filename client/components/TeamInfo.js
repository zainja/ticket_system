import React, {useEffect, useState} from "react";
import AuthHead from "../AuthHeader";
import axios from 'axios'

const TeamInfo = (props) => {
    const {teamName, token} = props
    const [teamMembers, setTeamMembers] = useState([])
    const [teamTasks, setTeamTasks] = useState([])

    useEffect(() => {
        const teamToSend = teamName.replace(/ /g, '&')
        axios.all([
                axios.get(`http://localhost:5000/team-users/users/${teamToSend}`, AuthHead(token)),
                axios.get(`http://localhost:5000/task/all/${teamToSend}`, AuthHead(token))
            ]
        ).then(responseArray => {
            // TODO link it to cards
            console.log(responseArray)
        })
    }, [])

}
export default TeamInfo