import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectToken} from "../features/tokenSlice";
import axios from "axios";
import AuthHead from "../AuthHeader";
import {Alert, ScrollView, Text, TouchableOpacity, View} from "react-native";
import UserCheckBox from "./HomeTabs/Team/UserCheckBox";
import {Card, SearchBar} from "react-native-elements";
import styles from "../styles/stylesheet";

const SearchForUsers = (props) => {
    const {query, sendQuery, navigateBack} = props
    const selector = useSelector(selectToken)
    const [users, setUsers] = useState([])
    const [usersToBeAdded, setUsersToBeAdded] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        axios.get(query,
            AuthHead(selector.value)).then(res => res.data)
            .then(data => setUsers(data.users))
            .catch(err => Alert.alert("Connection Error", "Couldn't fetch users"))
    },[])

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
        usersToBeAdded.forEach(user => {
            axios.put(sendQuery, {
                teamMember: user
            }, AuthHead(selector.value)).catch(err => {
                alert(`Failed to add team member ${user}`)
            })
            setUsers(prevState => prevState.filter(member => member.username !== user))
        })
        Alert.alert(
            'Successful',
            "added users to the team",
            [
                {
                    text: "Go back",
                    onPress: () => {
                        navigateBack()
                    }
                }
            ]
        )
        setUsersToBeAdded([])
    }

    const userList = users.map(user =>
        <UserCheckBox
            key={users.indexOf(user)}
            title={`${user.first_name} ${user.last_name}`}
            subtitle={user.username}
            addUser={(userName) => setUsersToBeAdded(prevState => [...prevState, userName])}
            removeUser={userName => setUsersToBeAdded(prevState => prevState.filter(user => user !== userName))}
        />)
    const searchList = searchQuery.map(user =>
        <UserCheckBox
            key={users.indexOf(user)}
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
export default SearchForUsers