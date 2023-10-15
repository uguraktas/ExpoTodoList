import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/AppStack/Home';

const Stack = createNativeStackNavigator();

export function AppStack() {

    return (
        <Stack.Navigator >
            <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        </Stack.Navigator>
    );
}