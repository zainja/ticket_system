import React, {useEffect} from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Teams from "./HomeTabs/Teams";
import Tasks from "./HomeTabs/Tasks";
const Tab = createMaterialTopTabNavigator();
const Home = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen name={"Teams"} component={Teams}/>
            <Tab.Screen name="Tasks" component={Tasks}/>
        </Tab.Navigator>
    )
}
export default Home