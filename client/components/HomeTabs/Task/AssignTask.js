import React, {useEffect, useState} from "react";

import {Text} from "react-native";
import SearchForUsers from "../../SearchForUsers";

const AssignTask = ({navigation, route}) => {

    const {taskID} = route.params
    const goBack = () => {
        navigation.goBack()
    }
    return(
        <SearchForUsers
            query={`http://localhost:5000/task/possibleUsers/${taskID}`}
            sendQuery={`http://localhost:5000/task/${taskID}`}
            navigateBack={goBack}
        />
    )
}
export default AssignTask