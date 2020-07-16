import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}

