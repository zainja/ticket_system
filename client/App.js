import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import SplashScreen from "./components/SplashScreen"
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import store from './app/store'
import {Provider} from 'react-redux'
import TeamInfo from "./components/HomeTabs/Team/TeamInfo";
import AddUserToTeam from "./components/HomeTabs/Team/AddUserToTeam";
import TasksForTeams from "./components/HomeTabs/Team/TasksForTeams";
import NewTeamForm from "./components/HomeTabs/Team/NewTeamForm";
import Task from "./components/HomeTabs/Task/Task";
import AssignTask from "./components/HomeTabs/Task/AssignTask";
import ReportOnTask from "./components/HomeTabs/Task/ReportOnTask";

const Stack = createStackNavigator();
export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                >
                    <Stack.Screen name="Splash"
                                  options={{headerShown: false}}
                                  component={SplashScreen}/>

                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Main" component={Home}/>
                    <Stack.Screen name="Register" component={Register}/>
                    <Stack.Screen name="TeamInfo" component={TeamInfo}
                        options={{title: "Team"}}/>
                    <Stack.Screen name="Add Team Member" component={AddUserToTeam}/>
                    <Stack.Screen name="Add Task" component={TasksForTeams}/>
                    <Stack.Screen name="Create Team" component={NewTeamForm}/>
                    <Stack.Screen name="Task" component={Task}/>
                    <Stack.Screen name="Assign Task" component={AssignTask}/>
                    <Stack.Screen name="Report on Task" component={ReportOnTask}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

