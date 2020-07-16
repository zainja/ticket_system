import React from "react";
import {TouchableOpacity} from "react-native";
import {Card, Text} from "react-native-elements";
import TeamCard from "./TeamCard";

const TaskCard = (props) => {
    const {taskName,
        status,
        startDate,
        endDate,
        createdAt} = props.task
    return (
        <TouchableOpacity
            onPress={() =>{props.onClick(taskName)}}
        >
            <Card>
                <Text h4 style={{fontWeight: "bold"}}>
                    {taskName}
                </Text>
                <Text h5>
                    {status}
                </Text>
                <Text h5>
                    Duration: from {startDate} to {endDate}
                </Text>
                <Text h5>
                    Created At: {createdAt}
                </Text>
            </Card>
        </TouchableOpacity>
    )
}
export default TeamCard