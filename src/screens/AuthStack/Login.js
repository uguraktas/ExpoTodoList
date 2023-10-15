import React from 'react';
import { View } from 'react-native';

import * as LocalAuthentication from 'expo-local-authentication'; 
import { Button } from '@rneui/themed'; 
import { useApp } from '../../contexts/AppContext'; 

const Login = ({ navigation }) => {
    const { setUserData } = useApp(); // Access the setUserData method from the app context

    const authenticate = async () => {
        try {
            const hasHardwareAsync = await LocalAuthentication.hasHardwareAsync(); // Check if the device has hardware for biometric authentication
            const isEnrolledAsync = await LocalAuthentication.isEnrolledAsync(); // Check if the user has enrolled their biometric credentials

            if (hasHardwareAsync && isEnrolledAsync) { // If the device has hardware and the user has enrolled their credentials
                const result = await LocalAuthentication.authenticateAsync(); // Prompt the user for biometric authentication
                if (result.success) {
                    setUserData(true); // If the authentication is successful, call the setUserData method from the app context to set the user data to true
                }
            } else {
                alert('Authentication is not available or no credentials enrolled.'); // Display an alert if authentication is not available or no credentials are enrolled
            }
        } catch (error) {
            console.error(error); 
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Button title="Authenticate" onPress={authenticate} /> 
        </View>
    );
};

export default Login;
