import React, {useState, useEffect} from "react";
import {ScrollView, View} from "react-native";
import {Card, Divider, ListItem, Text} from "react-native-elements";
import styles from "../../../styles/stylesheet";
import {useSelector} from "react-redux";
import {selectToken} from "../../../features/tokenSlice";
import AuthHead from "../../../AuthHeader";
import axios from 'axios'
import TouchableOpacity from "react-native-web/src/exports/TouchableOpacity";
import {useFocusEffect} from "@react-navigation/native";

const Teams = (props) => {
    const selector = useSelector(selectToken)
    const {navigation} = props

    const teamInfo = (teamName, status) => {
        navigation.navigate("TeamInfo", {
            teamName: teamName,
            status: status,
            token: selector.value
        })
    }

    const [teams, setTeams] = useState([])
    useFocusEffect(React.useCallback(() => {
        console.log("pp")
        axios.get('http://localhost:5000/user/all', AuthHead(selector.value))
            .then(result => result.data)
            .then(data => {
                setTeams(data.teams)
            }).catch(err => setTeams([]))
    },[]))
    let teamList = []
    let teamPendingList = []
    teams.forEach(team => {
        if (team.user_status === 'pending') {
            teamPendingList.push(
                <ListItem
                    key={teams.indexOf(team)}
                    title={team.teamname}
                    titleStyle={{fontWeight: "bold", fontSize: 17}}
                    onPress={() => teamInfo(team.teamname, "pending")}
                    chevron
                />)
        } else {
            teamList.push(
                <ListItem key={teams.indexOf(team)}
                          title={team.teamname}
                          titleStyle={{fontWeight: "bold", fontSize: 17}}
                          onPress={() => teamInfo(team.teamname, "joined")}
                          chevron
                />
            )
        }
    })
    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.sectionContainer}>
                <Card title="Joined Teams">
                    {teamList}
                </Card>
            </View>
            <Divider/>
            <View style={styles.sectionContainer}>
                <Card title="Pending Teams">
                    {teamPendingList}

                </Card>
            </View>
        </ScrollView>
    )
}
export default Teams