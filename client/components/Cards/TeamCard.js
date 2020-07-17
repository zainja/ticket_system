import React, {useState, useEffect} from "react";
import {TouchableOpacity, View} from "react-native";
import {Button, Card, Text} from "react-native-elements";

const TeamCard = (props) => {
    const {navigation} = props
    const {teamname, user_status} = props.team
    return (
        <TouchableOpacity
            onPress={() => {
                props.onClick(teamname)
            }}
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