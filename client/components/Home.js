import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Tasks from "./HomeTabs/Tasks";
import AsyncStorage from '@react-native-community/async-storage';
import {Button, View} from "react-native";
import Teams from "./HomeTabs/Team/Teams";
const Tab = createMaterialTopTabNavigator();
const Home = ({route, navigation}) => {
    navigation.setOptions({
        headerRight: () => (
            <View style={{marginRight: 4}}>
                <Button title="Logout"
                        onPress={() =>
                        {
                            AsyncStorage.clear()
                            navigation.replace("Login")
                        }}/>
            </View>
        )
    })
    return (
        <Tab.Navigator>
            <Tab.Screen name="Teams" component={Teams}/>
            <Tab.Screen name="Tasks" component={Tasks}/>
        </Tab.Navigator>
    )
}
export default Home