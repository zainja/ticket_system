import React,{useState, useEffect} from "react";
import {View} from "react-native";
import {Card, Text} from "react-native-elements";
const TeamCard = (props) => {
    const {teamname, user_status} = props.team
    return (
        <View>
            <Card>
                <Text h4>
                    {teamname}
                </Text>
                <Text h5>
                    {user_status}
                </Text>
            </Card>
        </View>
    )
}
export default TeamCard