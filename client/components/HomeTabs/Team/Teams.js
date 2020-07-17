import React, {useState, useEffect, useContext} from "react";
import {ScrollView, View} from "react-native";
import TeamCard from "../../Cards/TeamCard";
import {Divider, Text} from "react-native-elements";
import styles from "../../../styles/stylesheet";

const {getJSON} = require("../../../dataManagement");
import {useSelector} from "react-redux";
import {selectToken} from "../../../features/tokenSlice";
import AuthHead from "../../../AuthHeader";
import axios from 'axios'

const Teams = (props) => {
    const selector = useSelector(selectToken)
    const {navigation} = props
    const teamInfo = (teamName) => {
        navigation.navigate("TeamInfo", {
            teamName: teamName,
            token: selector.value
        })
    }

    const [teams, setTeams] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/user/all', AuthHead(selector.value))
            .then(result => result.data)
            .then(data => {
                setTeams(data.teams)
            }).catch(err => setTeams([]))
    }, [])

    let teamList = []
    let teamPendingList = []
    teams.forEach(team => {
        if (team.user_status === 'pending') {
            teamPendingList.push(
                <TeamCard
                    key={teams.indexOf(team)}
                    team={team}
                    onClick={teamInfo}
                    status="pending"
                />)
        } else {
            teamList.push(<TeamCard key={teams.indexOf(team)}
                                    team={team}
                                    onClick={teamInfo}
                                    status="joined"
            />)
        }
    })
    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.sectionContainer}>
                <Text h4 style={{marginLeft: 15}}>Joined Teams</Text>
                {teamList.length === 0 ?
                    <Text h5 style={{marginLeft: 15}}>No Teams Joined</Text>
                    : teamList}
            </View>
            <Divider/>
            <View style={styles.sectionContainer}>
                <Text h4 style={{marginLeft: 15}}>Pending Teams</Text>
                {teamPendingList}
            </View>
        </ScrollView>
    )
}
export default Teams