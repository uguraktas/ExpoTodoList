import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "../screens/AuthStack/Login";

const Stack = createNativeStackNavigator();

export function AuthStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        </Stack.Navigator>
    );
}