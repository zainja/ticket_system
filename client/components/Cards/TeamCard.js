import React, {useState, useEffect} from "react";
import {TouchableOpacity, View} from "react-native";
import {Card, Text} from "react-native-elements";

const TeamCard = (props) => {
    const {teamname, user_status, onClick} = props.team
    return (
        <TouchableOpacity
            onPress={() =>{onClick(teamname)}}
        >
            <Card>
                <Text h4>
                    {teamname}
                </Text>
                <Text h5>
                    {user_status}
                </Text>
            </Card>
        </TouchableOpacity>
    )
}
export default TeamCard