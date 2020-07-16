import React, {useState} from "react";
import {View, Text} from "react-native";

const {getJSON} = require("../../dataManagement");
const Tasks = () => {
    const [tasks, setTasks] = useState([])
    // useEffect(() => {
    //     getJSON("Tasks").then(result => {
    //     }).catch(err => console.log("empty"))
    // })
    return (
        <View>
            <Text>Tasks</Text>
        </View>
    )
}
export default Tasks