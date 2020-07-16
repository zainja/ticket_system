import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Tasks from "./HomeTabs/Tasks";
import TeamsNav from "./HomeTabs/Team/TeamNav";

const Tab = createMaterialTopTabNavigator();
const Home = ({route, navigation}) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="TeamsNav" component={TeamsNav}/>
            <Tab.Screen name="Tasks" component={Tasks}/>
        </Tab.Navigator>
    )
}
export default Home