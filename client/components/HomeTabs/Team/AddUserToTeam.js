import React from "react";
import {useSelector} from "react-redux";
import {selectToken} from "../../../features/tokenSlice";
import SearchForUsers from "../../SearchForUsers";


const AddUserToTeam = ({route, navigation}) => {

    const {teamName} = route.params
    const goBack = () => {
        navigation.goBack()
    }
    return(
        <SearchForUsers
            query={`team-users/${teamName.replace(/ /g,"&")}`}
            sendQuery={`team-users/${teamName.replace(/ /g,"&")}`}
            navigateBack={goBack}
        />
    )
}
export default AddUserToTeam