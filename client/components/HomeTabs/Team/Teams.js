import React, {useState, useEffect, useContext} from "react";
import {ScrollView, View} from "react-native";
import TeamCard from "../../Cards/TeamCard";
import {Divider, Text} from "react-native-elements";
import styles from "../../../styles/stylesheet";
const {getJSON} = require("../../../dataManagement");


const Teams = (props) => {
    const {navigation} = props
    const teamInfo = (teamName) => {
    }

    const [teams, setTeams] = useState([])
    useEffect(() => {
        getJSON("Teams").then(data => {
            setTeams(data.teams)
        }).catch(err => setTeams([]))
    }, [])

    // if (teams !== null) {
    //     const teamsList = teams.map(team => {
    //         return (
    //             <TeamCard key={teams.indexOf(team)}
    //                       team={team}
    //                       onClick={teamInfo}
    //             />
    //         )
    //     })
    //
    //     return (
    //         <View>
    //             {teamsList}
    //         </View>
    //     )
    // }
    let teamList = []
    let teamPendingList = []
    teams.forEach(team => {
        if (team.user_status === 'pending') {
            teamPendingList.push(<TeamCard
                key={teams.indexOf(team)}
                team={team}
                onClick={teamInfo}
                status="pending"
            />)
        } else {
            teamList.push(<TeamCard key={teams.indexOf(team)}
                                    team={team}
                                    onClick={teamInfo}
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