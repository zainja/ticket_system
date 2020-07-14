import React,{useState, useEffect} from "react";
import {View, Text} from "react-native";
import TeamCard from "../Cards/TeamCard";

const {getJSON} = require("../../dataManagement");
const Teams = () => {

    const teamInfo= (teamName) => {

    }

    const [teams, setTeams] = useState([])
    useEffect(() => {
        getJSON("Teams").then(data => {
            setTeams(data.teams)
        }).catch(err => setTeams([]))
    },[])

    if (teams !== null){
        const teamsList = teams.map(team => {
            return (
               <TeamCard key={teams.indexOf(team)}
                         team={team}
               onClick={teamInfo()}
               />
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