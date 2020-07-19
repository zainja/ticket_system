import React, {useEffect, useState} from "react";
import {CheckBox} from "react-native-elements";

const UserCheckBox = (props) => {
    const [checked, setChecked] = useState(false)
    useEffect(() => {
        if (checked)
            props.addUser(props.subtitle)
        else props.removeUser(props.subtitle)
    },[checked])
    return (
        <CheckBox checked={checked}
                  title={`${props.title}\n${props.subtitle}`}
                  titleStyle={{fontWeight: "bold", fontSize: 17}}
                  onPress={() => {
                      setChecked(prevState => !prevState)
                  }}
        />
    )
}

export default UserCheckBox