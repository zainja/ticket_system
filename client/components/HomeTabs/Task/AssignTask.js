import React, {useState} from "react";
import {useSelector} from "react-redux";
import {selectToken} from "../../../features/tokenSlice";
import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";
import AuthHead from "../../../AuthHeader";

const AssignTask = ({navigation, route}) => {
    const {teamName} = route.params
    const selector = useSelector(selectToken)
    const [searchQuery, setSearchQuery] = useState([])
    const [search, setSearch] = useState("")

    useFocusEffect(React.useCallback(() => {
        axios.get(`http://localhost:5000/team-users/${teamName}`,
            AuthHead(selector.value)).then(res => res.data)
            .then(data => setUsers(data.users))
            .catch(err => navigation.goBack())
    }, []))
}
export default AssignTask