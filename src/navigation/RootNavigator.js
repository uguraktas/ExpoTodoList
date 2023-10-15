import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthNavigation';
import { AppStack } from './AppNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useApp } from '../contexts/AppContext';

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {

    const {  getUserData } = useApp();

    return (
        <NavigationContainer >
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {getUserData ? (
                    <RootStack.Screen name="App" component={AppStack} />
                ) : (
                    <RootStack.Screen name="Auth" component={AuthStack} />
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
