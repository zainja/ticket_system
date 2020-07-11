import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import SplashScreen from "./components/SplashScreen"
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
const Stack = createStackNavigator();
export default function App() {
    const [loading, setLoading] = useState(true)
    const [isUser, setIsUser] = useState(false)
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash"
                              options={{
                                  title: ''}}
                              component={SplashScreen}/>

                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Main" component={Home}/>
                <Stack.Screen name="Register" component={Register}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

