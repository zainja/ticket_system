import React, {useState, useEffect} from "react";
import {Card, CheckBox, ListItem, SearchBar} from 'react-native-elements';
import axios from 'axios'
import AuthHead from "../../../AuthHeader";
import {useSelector} from "react-redux";
import {selectToken} from "../../../features/tokenSlice";
import {Text, TouchableOpacity, View, Alert} from "react-native";
import {ScrollView} from "react-native";
import UserCheckBox from "./UserCheckBox";
import styles from "../../../styles/stylesheet";
import {useFocusEffect} from "@react-navigation/native";


const AddUserToTeam = ({route, navigation}) => {

    const selector = useSelector(selectToken)
    const {teamName} = route.params
    const [users, setUsers] = useState([])
    const [usersToBeAdded, setUsersToBeAdded] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
    const [search, setSearch] = useState("")
    console.log(usersToBeAdded)
    useFocusEffect(React.useCallback(() => {
        axios.get(`http://localhost:5000/team-users/${teamName}`,
            AuthHead(selector.value)).then(res => res.data)
            .then(data => setUsers(data.users))
            .catch(err => navigation.goBack())
    }, []))

    useEffect(() => {
        if (search !== "") {
            setSearchQuery(users.filter((user) => {
                let fullName = user.first_name + user.last_name
                fullName = fullName.replace(/ /g, "").toLowerCase()
                const cleanSearch = search.replace(/ /g, "").toLowerCase()
                return (
                    fullName.includes(cleanSearch)
                    || user.username.includes(cleanSearch)
                )
            }))
        }
    }, [search])

    function addUsers() {
        const team = teamName.replace(/ /g, "&")
        usersToBeAdded.forEach(user => {
            axios.put(`http://localhost:5000/team-users/${team}`, {
                teamMember: user
            }, AuthHead(selector.value)).catch(err => {
                alert(`Failed to add team member ${user}`)
            })
            setUsers(prevState => prevState.filter(member => member.username !== user))
            setUsers(prevState => prevState.filter(member => member.username !== user))
        })
        Alert.alert(
            'Successful',
            "added users to the team",
        )
        setUsersToBeAdded([])
    }

    const userList = users.map(user =>
        <UserCheckBox
            key={users.username}
            title={`${user.first_name} ${user.last_name}`}
            subtitle={user.username}
            addUser={(userName) => setUsersToBeAdded(prevState => [...prevState, userName])}
            removeUser={userName => setUsersToBeAdded(prevState => prevState.filter(user => user !== userName))}
        />)
    const searchList = searchQuery.map(user =>
        <UserCheckBox
            key={users.username}
            title={`${user.first_name} ${user.last_name}`}
            subtitle={user.username}
            addUser={(userName) => setUsersToBeAdded(prevState => [...prevState, userName])
            }
            removeUser={userName => setUsersToBeAdded(prevState => prevState.filter(user => user !== userName))}
        />)
    return (
        <View>
            <SearchBar
                placeholder="Search for user..."
                onChangeText={(text) => setSearch(text)}
                value={search}
            />
            <ScrollView>

                <Card>
                    {(search === "") ? userList : searchList}
                </Card>
            </ScrollView>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={addUsers}>
                <Text style={styles.LoginButtonText}>Add Users</Text>
            </TouchableOpacity>
        </View>
    )
}
export default AddUserToTeam