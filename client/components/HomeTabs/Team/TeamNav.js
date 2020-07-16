import {createStackNavigator} from "@react-navigation/stack";
import TeamInfo from "./TeamInfo";
import React from "react";
import Teams from "./Teams";

const TeamStack = createStackNavigator();
const TeamsNav = ({route, navigation}) => {
    return (
        <TeamStack.Navigator>
            <TeamStack.Screen name="Teams" component={Teams}/>
            <TeamStack.Screen name="TeamInfo" component={TeamInfo}/>
        </TeamStack.Navigator>
    )

}
export default TeamsNav