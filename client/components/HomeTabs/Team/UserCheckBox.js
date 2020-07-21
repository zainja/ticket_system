import React, {useEffect, useState} from "react";
import CheckBox from "@react-native-community/checkbox";
import {Text, View} from "react-native";
import {Divider} from "react-native-elements";


const UserCheckBox = (props) => {
    const [checked, setChecked] = useState(false)
    useEffect(() => {
        if (checked)
            props.addUser(props.subtitle)
        else props.removeUser(props.subtitle)
    }, [checked])
    return (
        <View style={{flexDirection: "column"}}>
            <Text>
                {props.title + " " + props.subtitle}
            </Text>
            <CheckBox
                value={checked}
                onChange={() => {
                    setChecked(prevState => !prevState)
                }}
            />
            <Divider/>
        </View>
    )
}

export default UserCheckBox