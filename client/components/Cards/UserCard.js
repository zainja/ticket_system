import React from "react";
import {Card, Text} from "react-native-elements";
const UserCard = (props) => {
    const {firstName, lastName, username} = props.user
    return (
        <Card>
            <Text h4 style={{fontWeight: "bold"}}>
                {firstName + " " + lastName}
            </Text>
            <Text h5>
                {username}
            </Text>
        </Card>
    )
}


export default UserCard