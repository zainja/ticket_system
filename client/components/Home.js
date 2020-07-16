import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Teams from "./HomeTabs/Teams";
import Tasks from "./HomeTabs/Tasks";
import {ThemeProvider} from "react-native-elements";
import {useDispatch, useSelector} from "react-redux";
import {selectToken} from "../features/tokenSlice";
import TeamsNav from "./HomeTabs/Team/TeamNav";
import AsyncStorage from '@react-native-community/async-storage';
import {Button, View} from "react-native";
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
            <Tab.Screen name="TeamsNav" component={TeamsNav}/>
            <Tab.Screen name="Tasks" component={Tasks}/>
        </Tab.Navigator>
    )
}
export default Home