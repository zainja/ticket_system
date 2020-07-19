import React, {useState, useEffect} from "react";
import {Button, ScrollView, View, TextInput, TouchableOpacity} from "react-native";
import {Card, Divider, ListItem, Text} from "react-native-elements";
import styles from "../../../styles/stylesheet";
import {useSelector} from "react-redux";
import {selectToken} from "../../../features/tokenSlice";
import AuthHead from "../../../AuthHeader";
import axios from 'axios'
import {useFocusEffect} from "@react-navigation/native";
import NewTeamForm from "./NewTeamForm";

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
    const [fillTeamForm, setFillTeamForm] = useState(false)
    const [userCreatedTeams, setUserCreatedTeams] = useState([])
    useFocusEffect(React.useCallback(() => {
        axios.all([axios.get('http://localhost:5000/user/all', AuthHead(selector.value)),
            axios.get('http://localhost:5000/team/all', AuthHead(selector.value))])
            .then(result => {
                setTeams(result[0].data.teams)
                setUserCreatedTeams(result[1].data.teams)
            }).catch(err => setTeams([]))
    }, []))
    let teamList = []
    let teamPendingList = []
    console.log(userCreatedTeams)

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
    let createdTeamsList = userCreatedTeams.map(team =>
        <ListItem key={userCreatedTeams.indexOf(team)}
                  title={team.team_name}
                  titleStyle={{fontWeight: "bold", fontSize: 17}}
                  onPress={() => teamInfo(team.team_name, "created")}
                  chevron
        />
    )
    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.sectionContainer}>
                <Card title="Joined Teams">
                    {(teamList.length === 0)? <Text>
                        No Teams
                    </Text>: teamList}
                </Card>
            </View>
            <Divider/>
            <View style={[styles.sectionContainer, {paddingBottom: 10}]}>
                <Card title="Pending Teams">
                    {(teamPendingList.length === 0)? <Text>
                        No Teams
                    </Text>: teamPendingList}
                </Card>
            </View>

            <View style={[styles.sectionContainer, {paddingBottom: 10}]}>
                <Card title="Created Teams">
                    {(createdTeamsList.length === 0)? <Text>
                        No Teams
                    </Text>: createdTeamsList}
                </Card>
            </View>
            {fillTeamForm ?
                <NewTeamForm/> :
                null}
            <TouchableOpacity
                style={[styles.loginButton, {marginRight: 12, marginLeft: 12, marginBottom: 10}]}
                onPress={() => setFillTeamForm((prev) => !prev)}>
                <Text style={styles.LoginButtonText}>
                    {fillTeamForm ? "Go back" : "Create new team!"}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
export default Teams