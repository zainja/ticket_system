import React,{useState, useEffect} from "react";
import {View, Text} from "react-native";
import {Button} from "react-native-material-ui";
import TeamCard from "../Cards/TeamCard";

const {getJSON} = require("../../dataManagement");
const Teams = () => {
    const [teams, setTeams] = useState([])
    useEffect(() => {
        getJSON("Teams").then(data => {
            setTeams(data.teams)
        }).catch(err => setTeams([]))
    },[])

    if (teams !== null){
        const teamsList = teams.map(team => {
            return (
               <TeamCard key={teams.indexOf(team)} team={team}/>
            )
        })
        return (
            <View>
                {teamsList}
            </View>
        )
    }
    return (
        <View>
        </View>
    )
}
export default Teams